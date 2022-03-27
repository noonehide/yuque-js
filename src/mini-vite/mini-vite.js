const Koa = require("koa");
const path = require("path");
const fs = require("fs");
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");
const crypto = require("crypto");

const app = new Koa();

/** 获取文件的最后修改时间 */
const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
};

/** 协商缓存判断返回304还是200 */
const ifUseCache = (ctx, url, ifNoneMatch, ifModifiedSince) => {
  let flag = false
  // 使用协商缓存
  ctx.set('Cache-Control', 'no-cache')
  // 设置过期时间在30000毫秒，也就是30秒后
  ctx.set("Expires", new Date(Date.now() + 30000));
  let filePath = url.includes(".vue") ? url : path.join(__dirname, url);
  if (url === "/") {
    filePath = path.join(__dirname, "./index.html");
  }
  // 获取文件的最后修改时间
  let fileLastModifiedTime = getFileUpdatedDate(filePath);
  console.log(fileLastModifiedTime, "lastTime");
  const buffer = fs.readFileSync(filePath, "utf-8");
  // 计算请求文件的md5值
  const hash = crypto.createHash("md5");
  hash.update(buffer, "utf-8");
  // 得到etag
  const etag = `${hash.digest("hex")}`;
  if (ifNoneMatch === etag) {
    ctx.status = 304;
    ctx.body = "";
    flag = true
  } else {
    // etag不一致 更新tag值，返回新的资源
    ctx.set("etag", etag);
    flag = false
  }

  if (!ifNoneMatch && ifModifiedSince === fileLastModifiedTime) {
    ctx.status = 304;
    ctx.body = "";
    flag = true
  } else {
    // 最后修改时间不一致，更新最后修改时间，返回新的资源
    ctx.set("Last-Modified", fileLastModifiedTime);
    flag = false
  }
  return flag
};

app.use(async (ctx) => {
  const { url, query } = ctx.request;
  const { "if-none-match": ifNoneMatch, "if-modified-since": ifModifiedSince } =
    ctx.request.headers;
  const home = fs.readFileSync("./index.html", "utf-8");
  // 1. 返回html
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = home;
  } else if (url.endsWith(".js")) {
    console.log(1);
    ctx.set("cache-control", "no-cache");
    // 判断是否从缓存读取
    const used = ifUseCache(ctx, url, ifNoneMatch, ifModifiedSince);
    if (used) {
      ctx.status = 304
      ctx.body = null
      return;
    }
    // 2. 返回js
    const filePath = path.join(__dirname, url); // 获取绝对路劲
    const file = fs.readFileSync(filePath, "utf-8");
    ctx.type = "application/javascript";
    // ctx.body = file
    // 裸模快替换成/@modules/包名，浏览器就会发起请求
    ctx.body = rewirteImport(file);
  } else if (url.startsWith("/@modules/")) {
    // 3. 返回裸模快引用的node_modules/包名/package.json.module引用的真实文件
    ctx.type = "application/javascript";
    /** 文件前缀 */
    const filePrefix = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@modules/", "")
    );
    /** 得到node_modules/包名/package.json 里面的moudule路劲 */
    console.log(filePrefix, "ttt");
    const module = require(filePrefix + "/package.json").module;
    const file = fs.readFileSync(filePrefix + "/" + module, "utf-8");
    // 如果里面还要import XXX 再继续替换
    ctx.body = rewirteImport(file);
    // 依赖使用强缓存
    ctx.set("cache-control", "max-age=31536000,immutable");
  } else if (url.includes(".vue")) {
    // 获得绝对路劲, url.slice(1)去掉第一个'/',并且只取？之前的路劲
    const filePath = path.resolve(__dirname, url.slice(1).split("?")[0]);
    const usedCache = ifUseCache(
      ctx,
      url.slice(1).split("?")[0],
      ifNoneMatch,
      ifModifiedSince
    );
    if (usedCache) {
      ctx.status = 304
      ctx.body = null
      return;
    }
    const { descriptor } = compilerSfc.parse(
      fs.readFileSync(filePath, "utf-8")
    );
    // 处理script
    if (!query.type) {
      // 获取script
      const scriptContent = descriptor.script.content;
      // export default {...}  --------> const __script = {...}
      const script = scriptContent.replace(
        "export default ",
        "const __script = "
      );
      // 返回App.vue解析结果
      ctx.type = "text/javascript";
      ctx.body = `
        ${rewirteImport(script)}
        // 如果有 style 就发送请求获取 style 的部分
        ${descriptor.styles.length ? `import "${url}?type=style"` : ""}
        // 发送请求获取template部分，这儿返回一个渲染函数
        import { render as __render } from '${url}?type=template'
        __script.render = __render
        export default __script
      `;
    } else if (query.type === "template") {
      const templateContent = descriptor.template.content;
      const render = compilerDom.compile(templateContent, {
        mode: "module",
      }).code;
      ctx.type = "application/javascript";
      ctx.body = rewirteImport(render);
    } else if (query.type === "style") {
      const styleBlock = descriptor.styles[0];
      ctx.type = "application/javascript";
      ctx.body = `
        const css = ${JSON.stringify(styleBlock.content)};
        updateStyle(css);
        export default css;
      `;
    }
  }
});

/**
 * @description: 裸模块替换, import xxx from "xxx" -----> import xxx from "/@modules/xxx"
 * @param {*} content
 * @return {*}
 */
function rewirteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, (s1, s2) => {
    // s1, 匹配部分， s2: 匹配分组内容
    if (s2.startsWith("./") || s2.startsWith("/") || s2.startsWith("../")) {
      // 相对路劲直接返回
      return s1;
    } else {
      return ` from "/@modules/${s2}"`;
    }
  });
}

app.listen(3000, function () {
  console.log("started vited");
});
