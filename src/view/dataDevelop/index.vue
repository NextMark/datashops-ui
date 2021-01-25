<template>
    <div class="parent">
        <div class="left">
            <left-nav @add-new-job="addTab" @click-job="clickJob"></left-nav>
        </div>
        <div class="right outerContainer">
            <div class="innerContent" v-show="editableTabs.length === 0">
                <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                <div style="text-align: center">
                    <el-button icon="el-icon-plus" @click="addJobDialog = true">新建作业</el-button>
                </div>
            </div>
            <div class="innerContentTop" v-if="editableTabs.length > 0">

                <el-tabs v-model="editableTabsValue" closable @tab-remove="removeTab" type="border-card">
                    <el-tab-pane
                            v-for="(item, index) in editableTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name">
                        <hsql v-if="item.type === 0" @add-hsql-nav="saveHsqlJob" :job-info="jobInfo"></hsql>
                        <shell v-if="item.type === 1"></shell>
                        <spark v-if="item.type === 2"></spark>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <template>
                <div class="tabBox" v-show="editableTabs.length > 0">
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
                            <el-button type="text" @click="createNewJob(1, 0)">Hive SQL</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(1, 1)">Shell</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(1, 2)">Spark</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(1, 4)">Click House</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(1, 6)">MySQL</el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="4" :offset="6">
                        <el-row>
                            <span>数据集成</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-button type="text" @click="createNewJob(2)">Kafka2Hive</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(2)">Kafka2HDFS</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(2)">Hive2MySQL</el-button>
                        </el-row>
                        <el-row>
                            <el-button type="text" @click="createNewJob(2)">MySQL2Hive</el-button>
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
                            <el-input v-model="jobInfo.name" maxlength="30">
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
            ...mapGetters("user", ["userInfo"])
        },
        data() {
            return {
                editableTabsValue: '1',
                editableTabs: [],
                tabIndex: 2,
                addJobDialog: false,
                jobNameVisible: false,
                jobSetting: false,
                activeName: '',
                jobInfo: {},
                dialogTitle: '新建作业名称',
                newJobType: 0
            }
        },
        methods: {
            tabClick(tab, event) {
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
                this.dialogTitle = '新建' + getJobName(value) + '作业'
                this.jobNameVisible = true
                this.newJobType = value
            },
            async setJobName() {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: this.jobInfo.name,
                    name: newTabName,
                    type: this.newJobType
                });
                this.editableTabsValue = newTabName;
                this.addJobDialog = false
                this.jobNameVisible = false
                await addNewJob({name: this.jobInfo.name, type: this.newJobType, owner: this.userInfo.name, projectId: 1})
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
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

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            saveHsqlJob() {
                console.log('aaa')
                const job = {
                    name: 'hsql'
                }
            },
            async clickJob(data) {
                var res = this.editableTabs.some(item=>{
                    if(item.name === data.name){
                        return true
                    }
                })
                if (!res) {
                    this.editableTabs.push({
                        title: data.name,
                        name: data.name,
                        type: data.type
                    });
                }
                this.editableTabsValue = data.name
                const job = await getJobByMaskId({maskId: data.maskId})
                this.jobInfo = job.data
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
    .el-tabs__header {
        margin-bottom: 0 !important;
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
