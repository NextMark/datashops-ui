<template>
  <div class="bottom-info">
    <div>
      <span>Copyright ©2020-2021 DataShops</span>

      <el-divider direction="vertical"></el-divider>
      <el-link :underline="false" type="primary" href="https://www.datashops.cn" target="_blank">数据工厂</el-link>
    </div>
  </div>
</template>
<script>
export default {
    name:"BottomInfo"
}
</script>
<style lang="scss">
.bottom-info {
  color: #888;
  height: 30px;
  line-height: 12px;
  a {
    color: #888;
  }
  div {
    display: flex;
    justify-content: center;
    span{
      margin: 0 3px;
    }
  }
}
</style>
