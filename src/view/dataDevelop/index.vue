<template>
    <div class="parent">
        <div class="left">
            <left-nav></left-nav>
        </div>
        <div class="right outerContainer">
                <div class="innerContent">
                    <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                    <div style="text-align: center">
                        <el-button icon="el-icon-plus">新建作业流</el-button>
                        <el-button icon="el-icon-plus">新建离线作业</el-button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/leftNav";

    export default {
        name: "dataDevelop",
        components: { leftNav }
    }
</script>

<style scoped>
    .parent{
        display:flex;
    }
    .left{
        width:20%;
        flex:1;
    }
    .right{
        width:80%;
        flex:6;
    }
</style>
