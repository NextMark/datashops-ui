<template>
    <div>
        <el-row style="float: right">
            <el-button type="text" icon="el-icon-plus" style="font-size:20px"></el-button>
            <el-button type="text" icon="el-icon-refresh" style="font-size:20px"></el-button>
        </el-row>
        <el-input placeholder="请输入内容">
            <template slot="prepend">搜索</template>
        </el-input>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">作业</span>
                </template>
                <el-menu-item index="1-2-1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">作业aa</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">HSQL</span>
                </template>
                <el-menu-item index="1-2-1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">作业aa</span>
                    </template>
                </el-menu-item>
            </el-submenu>
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
