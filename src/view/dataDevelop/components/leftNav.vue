<template>
    <div>
            <el-row>
                <el-button icon="el-icon-plus" size="mini" circle></el-button>
                <el-button icon="el-icon-refresh" size="mini" circle></el-button>
            </el-row>
            <el-input placeholder="请输入内容">
                <template slot="prepend">搜索</template>
            </el-input>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">作业</span>
                    </template>
                    <el-submenu index="1-4">
                        <span slot="title">作业汇总</span>
                        <el-menu-item index="1-4-1">新增日活</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">HSQL</span>
                </el-menu-item>
            </el-menu>
    </div>

</template>

<script>
    export default {
        name: "leftNav",
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>
