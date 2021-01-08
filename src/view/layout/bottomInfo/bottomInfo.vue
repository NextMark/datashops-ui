<template>
  <div class="bottom-info">
    <div>
      <span>Copyright ©2020-2021 </span>
      <span>
      <a href="https://github.com/NextMark/datashops-ui">DataShops</a>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>数据梦工厂</span>
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
