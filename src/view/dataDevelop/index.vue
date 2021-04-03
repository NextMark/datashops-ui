<template>
    <div class="parent">
        <div class="left">
            <left-nav ref="leftNav" @add-new-job="addTab" @click-job="clickJob"></left-nav>
        </div>
        <div class="right outerContainer" style="overflow: auto">
            <div class="innerContent" v-show="openedTabs.length === 0">
                <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                <div style="text-align: center">
                    <el-button icon="el-icon-plus" @click="addJobDialog = true">新建作业</el-button>
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
                    <el-tooltip class="item" effect="dark" content="保存作业">
                        <el-button type="text" style="font-size:15px" @click="save">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-baocun"></use>
                            </svg>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip v-if="jobInfo.type === 2 || jobInfo.type === 3 || jobInfo.type === 5 || jobInfo.type
                    === 9 || jobInfo.type === 10" class="item" effect="dark"
                                content="立即运行">
                        <el-button type="text" style="font-size:15px" @click="runJob(jobInfo.id)">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-bofang"></use>
                            </svg>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip v-if="jobInfo.type === 0" class="item" effect="dark" content="格式化"
                                placement="top-start">-->
                        <el-button type="text" style="font-size:15px" @click="format">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-wancheng"></use>
                            </svg>
                        </el-button>
                    </el-tooltip>
                    <component :is="currentView" :jobInfo="jobInfo" ref="jobForm" ></component>

                </el-tabs>
            </div>
            <template>
                <div class="tabBox" v-show="openedTabs.length > 0">
                    <div class="right-setting" v-if="jobInfo.type !== 2 && jobInfo.type !== 3">
                        <span @click="settingClick">调度设置</span>
                    </div>
                    <div class="right-setting">
                        <span @click="graphClick">依赖图</span>
                    </div>
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
                    <el-col :span="5" :offset="4">
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
                                <use xlink:href="#el-icon-my-python"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 11)">Python</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-spark"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 2)">Spark</el-button>
                        </el-row>
<!--                        <el-row>-->
<!--                            <svg class="icon-1-5" aria-hidden="true">-->
<!--                                <use xlink:href="#el-icon-my-clickhouse"></use>-->
<!--                            </svg>-->
<!--                            <el-button type="text" @click="createNewJob(1, 4)">Click House</el-button>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <svg class="icon-1-5" aria-hidden="true">-->
<!--                                <use xlink:href="#el-icon-my-mysql"></use>-->
<!--                            </svg>-->
<!--                            <el-button type="text" @click="createNewJob(1, 6)">MySQL</el-button>-->
<!--                        </el-row>-->
                    </el-col>
                    <el-col :span="5" :offset="2">
                        <el-row>
                            <span>数据集成</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-sqoop-import"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 9)">Hive2MySQL</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-sqoop-import"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 10)">MySQL2Hive</el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="5" :offset="2">
                        <el-row>
                            <span>流式作业</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-flink"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(1, 3)">Flink</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-flink-sql"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 5)">Flink SQL</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-streaming"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 7)">Kafka2Hive</el-button>
                        </el-row>
                        <el-row>
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-streaming"></use>
                            </svg>
                            <el-button type="text" @click="createNewJob(2, 8)">Kafka2HDFS</el-button>
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
                            <el-button type="primary" @click="addJob">新建</el-button>
                        </el-col>
                    </el-row>

                </el-dialog>
            </el-dialog>
        </div>
        <el-drawer
                title="调度配置"
                :visible.sync="jobSettingDrawer"
                size="60%"
                direction="rtl">
            <job-setting ref="jobSettingForm" :job-info="jobInfo"></job-setting>
        </el-drawer>
        <el-drawer
                title="依赖图"
                :visible.sync="jobGraphDrawer"
                size="60%"
                direction="rtl">
            <graph :jobGraph="jobGraph"></graph>
        </el-drawer>
    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/components/leftNav";
    import hsql from "@/view/dataDevelop/components/hsql";
    import shell from "@/view/dataDevelop/components/shell";
    import spark from "@/view/dataDevelop/components/spark";
    import python from "@/view/dataDevelop/components/python";
    import mysql from "@/view/dataDevelop/components/mysql";
    import flink from "@/view/dataDevelop/components/flink";
    import clickhouse from "@/view/dataDevelop/components/clickhouse";
    import kafka2hdfs from "@/view/dataDevelop/components/kafka2hdfs";
    import kafka2hive from "@/view/dataDevelop/components/kafka2hive";
    import hive2mysql from "@/view/dataDevelop/components/hive2mysql";
    import mysql2hive from "@/view/dataDevelop/components/mysql2hive";
    import flinkSql from "@/view/dataDevelop/components/flinkSql";


    import jobSetting from '@/view/dataDevelop/components/jobSetting'

    import { mapGetters } from "vuex";
    import graph from '@/view/dataDevelop/components/graph'

    import { getJobName, getJobIcon } from '@/utils/job';
    import {
        getJobByMaskId,
        addNewJob,
        modifyJob,
        getJobGraph,
        runJob
    } from "@/api/job";


    export default {
        name: "dataDevelop",
        components: {
            leftNav,
            hsql,
            shell,
            spark,
            python,
            mysql,
            flink,
            clickhouse,
            jobSetting,
            kafka2hdfs,
            kafka2hive,
            graph,
            hive2mysql,
            mysql2hive,
            flinkSql
        },
        filters: {
            getJobIcon
        },
        computed: {
            ...mapGetters("user", ["userInfo"]),
            currentView() {
                if (this.jobInfo.type === 0) {
                    return 'hsql'
                }
                if (this.jobInfo.type === 1) {
                    return 'shell'
                }
                if (this.jobInfo.type === 2) {
                    return 'spark'
                }
                if (this.jobInfo.type === 3) {
                    return 'flink'
                }
                if (this.jobInfo.type === 5) {
                    return 'flinkSql'
                }
                if (this.jobInfo.type === 6) {
                    return 'mysql'
                }
                if (this.jobInfo.type === 11) {
                    return 'python'
                }
                if (this.jobInfo.type === 4) {
                    return 'clickhouse'
                }
                if (this.jobInfo.type === 8) {
                    return 'kafka2hdfs'
                }
                if (this.jobInfo.type === 7) {
                    return 'kafka2hive'
                }
                if (this.jobInfo.type === 9) {
                    return 'hive2mysql'
                }
                if (this.jobInfo.type === 10) {
                    return 'mysql2hive'
                }
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
                jobSettingDrawer: false,
                jobGraphDrawer: false,
                jobInfo: {},
                dialogTitle: '新建作业名称',
                newJob: {
                    name: '',
                    type: 0
                },
                jobList: [],
                jobGraph: {},
            }
        },
        methods: {
            jobTabClick(tab) {
                this.jobGraph = {}
                const index = this.jobList.findIndex(job => job.id.toString() === tab.name)
                this.jobInfo = this.jobList[index]
            },
            settingClick() {
                this.jobSettingDrawer = true
            },
            async graphClick() {
                this.jobGraph = {}
                this.jobGraphDrawer = true
                const dep = await getJobGraph({id: this.jobInfo.id})
                if (dep.code === 1000) {
                    this.jobGraph = dep.data
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
            async addJob() {
                this.openedTabs.push({
                    title: this.newJob.name,
                    name: this.newJob.name,
                    type: this.newJob.type
                });
                this.jobActiveTab = this.newJob.name;
                this.addJobDialog = false
                this.jobNameVisible = false
                const params = {
                    name: this.newJob.name,
                    type: this.newJob.type,
                    owner: this.userInfo.name,
                    projectId: 1,
                    hostSelector: 0
                }
                const res = await addNewJob(params)
                this.jobInfo = res.data
                this.$refs.leftNav.refresh()
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
                        this.jobList.push(this.jobInfo)
                    }


                } else {
                    const index = this.jobList.findIndex(j => j.id.toString() === job.id.toString())
                    this.jobInfo = this.jobList[index]
                }
                this.jobActiveTab = job.id.toString()
            },
            format() {
                this.$refs.jobForm.formatSQL()
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
            async save() {
                this.$refs.jobForm.$refs['form'].validate(async valid => {
                    if (valid) {
                        if (!this.$refs.jobSettingForm) {
                            const jobDto = this.jobInfo

                            // hive shell
                            if (jobDto.type === 0 || jobDto.type === 1 || jobDto.type === 5) {
                                jobDto.data = {
                                    value: this.$refs.jobForm.value
                                }
                                jobDto.data = JSON.stringify(jobDto.data)
                            }
                            // python
                            if (jobDto.type === 11) {
                                jobDto.data = {
                                    version: this.$refs.jobForm.version,
                                    value: this.$refs.jobForm.value
                                }
                                jobDto.data = JSON.stringify(jobDto.data)
                            }
                            // spark flink
                            if (jobDto.type === 2 || jobDto.type === 3) {
                                jobDto.data = this.$refs.jobForm.form
                                jobDto.data = JSON.stringify(jobDto.data)
                            }

                            // hive2mysql, mysql2hive
                            if (jobDto.type === 9 || jobDto.type === 10) {
                                jobDto.data = this.$refs.jobForm.form
                                var mysqlJdbc = "jdbc:mysql://ip:3306/db?useUnicode=true&characterEncoding=utf-8"
                                jobDto.data.mysqlJdbc = mysqlJdbc.replace("ip", jobDto.data.mysqlAddress).replace("db",
                                    jobDto.data.mysqlDb)

                                jobDto.data = JSON.stringify(jobDto.data)
                            }

                            await modifyJob(jobDto);
                            this.$message({
                                type: "success",
                                message: "作业修改成功",
                                center: true
                            });
                            return
                        }
                        const jobDto = this.$refs.jobSettingForm.jobInfoCopy
                        let timeConfigDto = this.$refs.jobSettingForm.timeConfig
                        const hourMinute = this.$refs.jobSettingForm.hourMinute
                        const validRange = this.$refs.jobSettingForm.validRange

                        let timeParams = {}
                        if (jobDto.schedulingPeriod === 0) {
                            const timeArrs = hourMinute.split(":")
                            timeParams.hour = timeArrs[0]
                            timeParams.minute = timeArrs[1]
                            timeParams.days = timeConfigDto.days.join()
                        }
                        if (jobDto.schedulingPeriod === 1) {
                            const timeArrs = hourMinute.split(":")
                            timeParams.hour = timeArrs[0]
                            timeParams.minute = timeArrs[1]
                            timeParams.weeks = timeConfigDto.weeks.join()
                        }
                        if (jobDto.schedulingPeriod === 2) {
                            const timeArrs = hourMinute.split(":")
                            timeParams.hour = timeArrs[0]
                            timeParams.minute = timeArrs[1]
                        }
                        if (jobDto.schedulingPeriod === 3) {
                            timeParams.type = timeConfigDto.type
                            timeParams.hours = timeConfigDto.hours.join()
                            timeParams.hourBegin = timeConfigDto.hourBegin.split(":")[0];
                            timeParams.hourPeriod = timeConfigDto.hourPeriod;
                            timeParams.hourMinute = timeConfigDto.hourBegin.split(":")[1];
                            timeParams.hourEnd = timeConfigDto.hourEnd
                        }
                        if (jobDto.schedulingPeriod === 4) {
                            timeParams.minuteBegin = timeConfigDto.minuteBegin
                            timeParams.minuteEnd = timeConfigDto.minuteEnd
                            timeParams.period = timeConfigDto.period
                        }

                        jobDto.timeConfig = JSON.stringify(timeParams)
                        jobDto.validStartDate = validRange[0]
                        jobDto.validEndDate = validRange[1]
                        //
                        if (jobDto.type === 11) {
                            jobDto.data = {
                                version: this.$refs.jobForm.version,
                                value: this.$refs.jobForm.value
                            }
                            jobDto.data = JSON.stringify(jobDto.data)
                        }
                        const res = await modifyJob(jobDto);
                        if (res.code === 1000) {
                            this.$refs.jobSettingForm.formatJob(res.data)
                            this.$refs.leftNav.refresh()
                            this.$message({
                                type: "success",
                                message: "作业修改成功",
                                center: true
                            });
                        }
                    }
                })
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
</style>
