<template>
  <div style="height:80vh">
    <iframe width="100%" height="100%" :src="'https://mrhj.gitee.io/form-generator/#/'" frameborder="0"></iframe>
  </div>
</template>

<script>
var path = process.env.VUE_APP_BASE_API
export default {
    name:"FormGenerator",
    data(){
      return{
        basePath:path
      }
    },
};
</script>

<style lang="scss">
</style>
