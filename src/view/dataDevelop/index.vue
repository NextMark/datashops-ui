<template>
    <div class="parent">
        <div class="left">
            <left-nav @add-new-job="addTab" @click-job="clickJob"></left-nav>
        </div>
        <div class="right outerContainer">
            <div class="innerContent" v-show="openedTabs.length === 0">
                <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                <div style="text-align: center">
                    <el-button icon="el-icon-plus" @click="addJobDialog = true">新建作业</el-button>
                </div>
            </div>
            <div class="innerContentTop" v-if="openedTabs.length > 0">

                <el-tabs v-model="jobActiveTab" closable @tab-remove="removeTab" type="border-card"
                         @tab-click="jobTabClick">
                    <el-tab-pane
                            v-for="(item, index) in openedTabs"
                            :key="index + item.name"
                            :label="item.title"
                            :name="item.name">
<!--                        <hsql v-if="item.type === 0" @add-hsql-nav="saveHsqlJob"-->
<!--                              :jobContext="jobInfo.jobContext">-->
<!--                        </hsql>-->
<!--                        <shell v-if="item.type === 1"></shell>-->
<!--                        <spark v-if="item.type === 2"></spark>-->
                    </el-tab-pane>
                    <component :is="currentView" :jobInfo="jobInfo"></component>

                </el-tabs>
            </div>
            <template>
                <div class="tabBox" v-show="openedTabs.length > 0">
                    <el-tabs v-model="activeName" tab-position="right" @tab-click="tabClick">
                        <el-tab-pane label="作业设置" name="jobSetting"></el-tab-pane>
                        <el-tab-pane label="依赖图" name="jobDag"></el-tab-pane>
                    </el-tabs>
                </div>
            </template>
        </div>
        <div>
            <el-dialog
                    title="新建作业"
                    width="50%"
                    :visible.sync="addJobDialog"
                    center>
                <el-row >
                    <el-col :span="4" :offset="5">
                        <el-row>
                            <span>数据开发</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-hive"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 0)">Hive SQL</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-bash"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 1)">Shell</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-spark"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 2)">Spark</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-clickhouse"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 4)">Click House</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-mysql"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 6)">MySQL</el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="4" :offset="6">
                        <el-row>
                            <span>数据集成</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-kafka"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 7)">Kafka2Hive</el-button>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-hive"></use>
                            </svg>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-kafka"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 8)">Kafka2HDFS</el-button>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-hdfs"></use>
                            </svg>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-hive"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 9)">Hive2MySQL</el-button>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-mysql"></use>
                            </svg>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-mysql"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 10)">MySQL2Hive</el-button>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-hive"></use>
                            </svg>
                        </el-row>
                    </el-col>
                </el-row>
                <el-dialog
                        width="30%"
                        :title="dialogTitle"
                        :visible.sync="jobNameVisible"
                        append-to-body>
                    <el-row>
                        <el-col :span="19">
                            <el-input v-model="newJob.name" maxlength="30">
                                <template slot="prepend">作业名</template>
                            </el-input>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button type="primary" @click="setJobName">新建</el-button>
                        </el-col>
                    </el-row>

                </el-dialog>
            </el-dialog>
        </div>
        <el-drawer
                title="作业组配置"
                :visible.sync="jobSetting"
                size="60%"
                direction="rtl">
            <job-setting ref="jobSettingForm" :job-info="jobInfo"></job-setting>
        </el-drawer>
    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/components/leftNav";
    import hsql from "@/view/dataDevelop/components/hsql";
    import shell from "@/view/dataDevelop/components/shell";
    import spark from "@/view/dataDevelop/components/spark";
    import jobSetting from '@/view/dataDevelop/components/jobSetting'

    import { mapGetters } from "vuex";


    import { getJobName } from '@/utils/job';
    import {
        getJobByMaskId,
        addNewJob
    } from "@/api/job";


    export default {
        name: "dataDevelop",
        components: {
            leftNav,
            hsql,
            shell,
            spark,
            jobSetting
        },
        computed: {
            ...mapGetters("user", ["userInfo"]),
            currentView() {
                return 'hsql';
            }
        },
        data() {
            return {
                jobActiveTab: '1',
                openedTabs: [],
                tabIndex: 2,
                addJobDialog: false,
                jobNameVisible: false,
                jobSetting: false,
                activeName: '',
                jobInfo: {},
                dialogTitle: '新建作业名称',
                newJob: {
                    name: '',
                    type: 0
                },
                jobList: []
            }
        },
        methods: {
            jobTabClick(tab) {
                const index = this.jobList.findIndex(job => job.id.toString() === tab.name)
                this.jobInfo = this.jobList[index]
            },
            tabClick(tab) {
                if(tab.name === 'jobSetting'){
                    // 触发‘配置管理’事件
                    this.activeName = 'jobSetting'
                    this.jobSetting = true
                }else{
                    // 触发‘用户管理’事件
                    this.activeName = 'jobSetting'
                    this.jobSetting = true
                }
            },
            addTab() {
                this.addJobDialog = true
            },
            createNewJob(type, value) {
                this.newJob = {}
                this.dialogTitle = '新建' + getJobName(value) + '作业'
                this.jobNameVisible = true
                this.newJob.type = value
            },
            async setJobName() {
                this.openedTabs.push({
                    title: this.newJob.name,
                    name: this.newJob.name,
                    type: this.newJob.type
                });
                this.jobActiveTab = this.newJob.name;
                this.addJobDialog = false
                this.jobNameVisible = false
                const res = await addNewJob({name: this.newJob.name, type: this.newJob.type, owner: this.userInfo.name,
                    projectId: 1})
                this.jobInfo = res.data
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
                this.jobList = this.jobList.filter(tab => tab.name !== targetName);

                const index = this.jobList.findIndex(j => j.id.toString() === this.jobActiveTab)
                this.jobInfo = this.jobList[index]
            },
            saveHsqlJob() {
                console.log('aaa')
            },
            async clickJob(job) {
                var res = this.openedTabs.some(item=>{
                    if(item.name === job.id.toString()){
                        return true
                    }
                })
                if (!res) {
                    const res = await getJobByMaskId({maskId: job.maskId})
                    this.openedTabs.push({
                        title: job.name,
                        name: res.data.id.toString(),
                        type: job.type
                    });
                    this.jobInfo = res.data
                    this.jobList.push(this.jobInfo)
                } else {
                    const index = this.jobList.findIndex(j => j.id.toString() === job.id.toString())
                    this.jobInfo = this.jobList[index]
                }
                this.jobActiveTab = job.id.toString()
            }
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
</style>
