<template>
    <div>
        <el-row>
            <el-tooltip class="item" effect="dark" content="添加作业" placement="top-start">
                <el-button type="text" icon="el-icon-plus" style="font-size:20px" @click="clickAdd"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刷新" placement="top-start">
                <el-button type="text" icon="el-icon-refresh" style="font-size:20px" @click="refresh"></el-button>
            </el-tooltip>
        </el-row>

        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" style="width: 200px">
            <el-submenu index="1" >
                <template slot="title">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use xlink:href="#el-icon-my-folder-open"></use>
                    </svg>
                    <span slot="title" class="pad-left-10">数据开发</span>
                </template>
                <el-menu-item :index="'1' + index" v-for="(data, index) in jobList" v-bind:key="data.id"
                              @click="clickJob(data)">
                    <template slot="title">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use :xlink:href="data.type |getJobIcon"></use>
                        </svg>
                        <span slot="title" class="pad-left-10">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use xlink:href="#el-icon-my-folder-open"></use>
                    </svg>
                    <span slot="title" class="pad-left-10">数据集成</span>
                </template>
                <el-menu-item :index="'2' + index" v-for="(data, index) in integrationList" v-bind:key="data.id"
                              @click="clickJob(data)">
                    <template slot="title">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use :xlink:href="data.type |getJobIcon"></use>
                        </svg>
                        <span slot="title" class="pad-left-10">{{data.name}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use xlink:href="#el-icon-my-folder-open"></use>
                    </svg>
                    <span slot="title" class="pad-left-10">流式作业</span>
                </template>
                <el-menu-item :index="'3' + index" v-for="(data, index) in flowJobList" v-bind:key="data.id"
                              @click="clickJob(data)">
                    <template slot="title">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use :xlink:href="data.type |getJobIcon"></use>
                        </svg>
                        <span slot="title" class="pad-left-10">{{data.name}}</span>
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
    import { getJobIcon } from '@/utils/job';

    import infoList from "@/mixins/infoList";

    export default {
        name: "leftNav",
        mixins: [infoList],
        data() {
            return {
                listApi: getJobList,
                isCollapse: false,
                integrationList: [],
                jobList: [],
                flowJobList: []
            };
        },
        filters: {
            getJobIcon
        },
        mounted() {
            this.listenAddEvent()
        },
        async created() {
            this.init()
        },
        methods: {
            async init() {
                await this.getTableData(1, 100);
                for (let i = 0; i < this.tableData.length; i++) {
                    const job = this.tableData[i]
                    if (job.type === 9 || job.type === 10) {
                        this.integrationList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            maskId: job.maskId
                        })
                    } else if(job.type === 3 || job.type === 5 || job.type === 7 || job.type === 8) {
                        this.flowJobList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            maskId: job.maskId
                        })
                    } else {
                        this.jobList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            maskId: job.maskId
                        })
                    }
                }
            },
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            clickAdd() {
                this.$emit("add-new-job")
            },
            refresh() {
                this.jobList = []
                this.integrationList = []
                this.flowJobList = []
                this.init()
            },
            listenAddEvent() {
                const that = this
                this.$bus.on("add-hsql-nav", function(value) {
                    that.jobList.push({
                        name: value
                    })
                })
            },
            clickJob(data) {
                this.$emit("click-job", data)
            }
        }
    }
</script>

<style scoped>

</style>
