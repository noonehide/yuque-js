<!--
 * @Author: 水冰淼
 * @Date: 2021-11-01 15:06:48
 * @LastEditTime: 2021-11-01 15:43:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-vite\src\App.vue
-->
<template>
  <div id="app">
    {{title}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: "hello Vite"
    }
  }
}
</script>

<style>
  #app {
    color: red;
    font-weight: 400;
  }
</style>