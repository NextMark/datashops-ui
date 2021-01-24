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
                        <hsql v-if="item.type === 0" @save-hsql-job="saveHsqlJob"></hsql>
                        <shell v-if="item.type === 1"></shell>
                        <spark v-if="item.type === 2"></spark>
                    </el-tab-pane>
                </el-tabs>
            </div>
<!--            <div class="innerContentTop" style="width: 10px">-->
<!--                <div style="float: right;margin: 27px 5px 0">-->
<!--                    <el-button type="success" plain round icon="el-icon-setting"-->
<!--                               size="mini" @click="openJobSetting">作业设置-->
<!--                    </el-button>-->
<!--                    <el-button type="primary" plain round icon="el-icon-document" @click="openJobSetting"-->
<!--                               size="mini">DAG信息-->
<!--                    </el-button>-->
<!--                </div>-->
<!--            </div>-->
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
            </el-dialog>
        </div>
        <el-drawer
                title="作业组配置"
                :visible.sync="jobSetting"
                size="60%"
                direction="rtl">
            <job-setting ref="graphForm" queryId="1"></job-setting>
        </el-drawer>
    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/components/leftNav";
    import hsql from "@/view/dataDevelop/components/hsql";
    import shell from "@/view/dataDevelop/components/shell";
    import spark from "@/view/dataDevelop/components/spark";
    import jobSetting from '@/view/dataDevelop/components/jobSetting'

    import { getJobName } from '@/utils/job';


    export default {
        name: "dataDevelop",
        components: {
            leftNav,
            hsql,
            shell,
            spark,
            jobSetting
        },
        data() {
            return {
                editableTabsValue: '1',
                editableTabs: [],
                tabIndex: 2,
                addJobDialog: false,
                jobSetting: false,
                activeName: ''
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
            openJobSetting() {
                this.jobSetting = true
            },
            addTab() {
                this.addJobDialog = true
            },
            createNewJob(type, value) {
                const name = getJobName(value)
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: name + '_tmp',
                    name: newTabName,
                    type: value
                });
                this.editableTabsValue = newTabName;
                this.addJobDialog = false
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
                const job = {
                    name: 'hsql'
                }
            },
            clickJob(data) {
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
            }
        }
    }
</script>

<style lang="scss">
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
