<template>
    <div>
        <el-row>
            <el-tooltip class="item" effect="dark" content="添加作业" placement="top-start">
                <el-button type="text" icon="el-icon-plus" style="font-size:20px" @click="clickAdd"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刷新" placement="top-start">
                <el-button type="text" icon="el-icon-refresh" style="font-size:20px" @click="clickAdd"></el-button>
            </el-tooltip>
        </el-row>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" style="width: 200px">
            <el-submenu index="1" >
                <template slot="title">
                    <i :class="hsqlFolderOpen ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
                    <span slot="title">HSQL</span>
                </template>
                <el-menu-item index="1-1" v-for="data in hsqlList" v-bind:key="data.name">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i :class="shellFolderOpen ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
                    <span slot="title">Shell</span>
                </template>
                <el-menu-item index="2-1" v-for="data in shellList" v-bind:key="data.name">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i :class="sparkFolderOpen ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
                    <span slot="title">Spark</span>
                </template>
                <el-menu-item index="3-1" v-for="data in sparkList" v-bind:key="data.name">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i :class="integrationFolderOpen ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
                    <span slot="title">数据集成</span>
                </template>
                <el-menu-item index="4-1" v-for="data in integrationList" v-bind:key="data.name">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>

</template>

<script>
    import {
        getJobList
    } from "@/api/job";
    import infoList from "@/mixins/infoList";

    export default {
        name: "leftNav",
        mixins: [infoList],
        data() {
            return {
                listApi: getJobList,

                isCollapse: false,
                hsqlList: [],
                shellList: [],
                sparkList: [],
                integrationList: [],
                hsqlFolderOpen: false,
                shellFolderOpen: false,
                sparkFolderOpen: false,
                integrationFolderOpen: false
            };
        },
        mounted() {
            this.listenAddEvent()
        },
        async created() {
            await this.getTableData();
            console.log(this.tableData)
        },
        methods: {
            handleOpen(key, keyPath) {
                if (key === '1') {
                    this.hsqlFolderOpen = true
                }
                if (key === '2') {
                    this.shellFolderOpen = true
                }
                if (key === '3') {
                    this.sparkFolderOpen = true
                }
                if (key === '4') {
                    this.integrationFolderOpen = true
                }
            },
            handleClose(key, keyPath) {
                if (key === '1') {
                    this.hsqlFolderOpen = false
                }
                if (key === '2') {
                    this.shellFolderOpen = false
                }
                if (key === '3') {
                    this.sparkFolderOpen = false
                }
                if (key === '4') {
                    this.integrationFolderOpen = false
                }
            },
            clickAdd() {
                this.$emit("add-new-job")
            },
            listenAddEvent() {
                const that = this
                this.$bus.on("save-hsql-job", function(value) {
                    that.hsqlList.push({
                        name: value
                    })
                    console.log(that.hsqlList)
                })
            }
        }
    }
</script>

<style scoped>

</style>
