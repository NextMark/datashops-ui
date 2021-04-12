<template>
    <div class="parent">
        <div class="left">
            <el-row>
                <el-popover
                        placement="right"
                        width="80">
                    <el-row style="padding:0 0">
                        <el-button style="font-size: 12px" type="text">新建HSQL</el-button>
                    </el-row>
                    <el-row style="padding:0 0">
                        <el-button style="font-size: 12px" type="text">新建Shell</el-button>
                    </el-row>
                    <el-row style="padding:0 0">
                        <el-button style="font-size: 12px" type="text">新建Python</el-button>
                    </el-row>
                    <el-button slot="reference" type="text" icon="el-icon-plus" style="font-size:20px" @click="clickAdd"></el-button>
                </el-popover>
<!--                <el-tooltip class="item" effect="dark" content="添加临时查询" placement="top-start">-->
<!--                    <el-button type="text" icon="el-icon-plus" style="font-size:20px" @click="clickAdd"></el-button>-->
<!--                </el-tooltip>-->
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
                        <span slot="title" class="pad-left-10">hql</span>
                    </template>
                    <el-menu-item :index="'1' + index" v-for="(data, index) in hiveList" v-bind:key="data.id"
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

            <el-menu default-active="1" class="el-menu-vertical-demo"
                     :collapse="isCollapse" style="width: 200px">
                <el-submenu index="1" >
                    <template slot="title">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use xlink:href="#el-icon-my-folder-open"></use>
                        </svg>
                        <span slot="title" class="pad-left-10">shell</span>
                    </template>
                    <el-menu-item :index="'1' + index" v-for="(data, index) in shellList" v-bind:key="data.id"
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

            <el-menu default-active="1" class="el-menu-vertical-demo"
                     :collapse="isCollapse" style="width: 200px">
                <el-submenu index="1" >
                    <template slot="title">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use xlink:href="#el-icon-my-folder-open"></use>
                        </svg>
                        <span slot="title" class="pad-left-10">python</span>
                    </template>
                    <el-menu-item :index="'1' + index" v-for="(data, index) in pythonList" v-bind:key="data.id"
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
        <div class="right outerContainer" style="overflow: auto">
            <div class="innerContent" v-show="openedTabs.length === 0">
                <div style="text-align: center">
                    <el-button icon="el-icon-plus">新建临时作业</el-button>
                </div>
            </div>
            <div class="innerContentTop" v-if="openedTabs.length > 0" style="overflow: auto">
                <el-tabs v-model="jobActiveTab" closable @tab-remove="removeTab" type="border-card"
                         @tab-click="jobTabClick">
                    <el-tab-pane
                            v-for="(item, index) in openedTabs"
                            :key="index + item.name"
                            :label="item.title"
                            :name="item.name">
                        <span slot="label">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use :xlink:href="item.type |getJobIcon"></use>
                            </svg>
                            <span slot="title" class="pad-left-10">{{item.title}}</span>
                        </span>
                    </el-tab-pane>
                    <el-tooltip class="item" effect="dark"
                                content="立即运行">
                        <el-button type="text" style="font-size:15px" @click="runJob(jobInfo.id)">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-bofang"></use>
                            </svg>
                        </el-button>
                    </el-tooltip>
                    <Editor
                            :showThemeSelect="false"
                            style="padding-top: 3px"
                            language="sql"
                            :value="value"
                            @onMounted="onMounted"
                            @onCodeChange="onCodeChange"/>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getJobByMaskId,
        getJobList,
        runJob,
    } from "@/api/job";
    import infoList from "@/mixins/infoList";
    import { mapGetters } from "vuex";
    import { getJobIcon } from '@/utils/job';
    import Editor from '../dataDevelop/components/editor'

    export default {
        name: "temporaryQuery",
        components: {
            Editor
        },
        mixins: [infoList],

        computed: {
        },
        async created() {
            await this.getTableData(1, 100);
            for (let i = 0; i < this.tableData.length; i++) {
                const job = this.tableData[i]
                if (job.type === 0 ) {
                    this.hiveList.push({
                        id: job.id,
                        name: job.name,
                        type: job.type,
                        maskId: job.maskId
                    })
                }
                if (job.type === 1) {
                    this.shellList.push({
                        id: job.id,
                        name: job.name,
                        type: job.type,
                        maskId: job.maskId
                    })
                }
                if (job.type === 11) {
                    this.pythonList.push({
                        id: job.id,
                        name: job.name,
                        type: job.type,
                        maskId: job.maskId
                    })
                }
            }
        },
        data() {
            return {
                listApi: getJobList,
                openedTabs: [],
                jobActiveTab: '1',
                isCollapse: false,
                integrationList: [],
                jobInfo: {},
                jobList: [],
                hiveList: [],
                shellList: [],
                pythonList: [],
                openedJobList: [],
                value: '',
                editor: null
            };
        },
        filters: {
            getJobIcon
        },
        methods: {
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value) {
                this.value = value
            },
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            clickAdd() {
            },
            refresh() {
            },
            initEditor(jobInfo) {
                const data = JSON.parse(jobInfo.data)
                if (data) {
                    this.value = data.value
                    console.log(data.value)
                    this.editor.setValue(data.value)
                } else {
                    this.value = ''
                    this.editor.setValue(this.value)
                }
            },
            async clickJob(job) {
                var res = this.openedTabs.some(item=>{
                    if(item.name === job.id.toString()){
                        return true
                    }
                })
                if (!res) {
                    const res = await getJobByMaskId({maskId: job.maskId})
                    if (res.code === 1000) {
                        this.openedTabs.push({
                            title: job.name,
                            name: res.data.id.toString(),
                            type: job.type
                        });
                        this.jobInfo = res.data
                        this.initEditor(this.jobInfo)
                        this.openedJobList.push(this.jobInfo)
                    }
                } else {
                    const index = this.openedJobList.findIndex(j => j.id.toString() === job.id.toString())
                    this.jobInfo = this.openedJobList[index]
                }
                this.jobActiveTab = job.id.toString()
            },
            async runJob(id) {
                const res = await runJob({id: id, operator: this.userInfo.name});
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "作业执行成功",
                        center: true
                    });
                }
            },
            removeTab(targetName) {
                let tabs = this.openedTabs;
                let activeName = this.jobActiveTab;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.jobActiveTab = activeName;
                this.openedTabs = tabs.filter(tab => tab.name !== targetName);
                this.openedJobList = this.openedJobList.filter(tab => tab.name !== targetName);

                const index = this.openedJobList.findIndex(j => j.id.toString() === this.jobActiveTab)
                this.jobInfo = this.openedJobList[index]
            },
            jobTabClick(tab) {
                const index = this.openedJobList.findIndex(job => job.id.toString() === tab.name)
                this.jobInfo = this.openedJobList[index]
            },
        }
    }
</script>

<style lang="scss">
    :focus {
        outline: 0;
    }
    .parent {
        display: flex;
    }

    .left {
        width: 30%;
        flex: 1;
    }

    .right {
        width: 80%;
        flex: 6;
    }
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
    .el-button--text {
        color: unset !important;
    }
    .el-button {
        font-weight: unset !important;
    }
    .el-tabs__header {
        margin-bottom: 0 !important;
    }
    .el-tabs--border-card>.el-tabs__content {
        padding-top: 0;
    }

    .tabBox {
        height: 100%;
        .el-tabs--right {
            height: auto !important;

            .el-tabs__item {
                width: 20px !important;
                line-height: 16px;
                height: auto;
                padding: 0 20px 0 10px;
                word-wrap: break-word;
                white-space: pre-line;
                margin-bottom: 20px;
            }
        }
    }

    .right-setting {
        text-align: center;
        letter-spacing: 10px;
        width: 35px;
        margin-bottom: 25px;
        margin-left: 12px;
        cursor: pointer
    }

    .center-title {
        font-weight: 500;
        font-size: 16px;
    }

    .el-popover {
        min-width: unset !important;
    }
</style>
