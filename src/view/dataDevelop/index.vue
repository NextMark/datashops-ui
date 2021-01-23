<template>
    <div class="parent">
        <div class="left">
            <left-nav @add-new-job="addTab"></left-nav>
        </div>
        <div class="right outerContainer">
            <div class="innerContent" v-show="editableTabs.length === 0">
                <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                <div style="text-align: center">
                    <el-button icon="el-icon-plus" @click="addJobDialog = true">新建作业</el-button>
                </div>
            </div>
            <div class="innerContent" v-show="editableTabs.length > 0">
                <el-tabs v-model="editableTabsValue" closable @tab-remove="removeTab">
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
        </div>
        <div>
            <el-dialog
                    title="新建作业"
                    width="50%"
                    :visible.sync="addJobDialog"
                    center>
                <el-row>
                    <el-col :span="4" :offset="5">
                        <el-row>
                            <span>数据开发</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-button type="text" @click="createNewJob(1, 0)" style="margin-left: 10px">Hive SQL
                        </el-button>
                        <el-button type="text" @click="createNewJob(1, 1)">Shell</el-button>
                        <el-button type="text" @click="createNewJob(1, 2)">Spark</el-button>
                        <el-button type="text" @click="createNewJob(1, 4)">Click House</el-button>
                        <el-button type="text" @click="createNewJob(1, 6)">MySQL</el-button>
                    </el-col>
                    <el-col :span="4" :offset="6">
                        <el-row>
                            <span>数据集成</span>
                        </el-row>
                        <el-divider></el-divider>
                        <el-button type="text" @click="createNewJob(2)" style="margin-left: 10px">Kafka ->
                            Hive</el-button>
                        <el-button type="text" @click="createNewJob(2)">Kafka -> HDFS</el-button>
                        <el-button type="text" @click="createNewJob(2)">Hive -> MySQL</el-button>
                        <el-button type="text" @click="createNewJob(2)">MySQL -> Hive</el-button>

                    </el-col>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/components/leftNav";
    import hsql from "@/view/dataDevelop/components/hsql";
    import shell from "@/view/dataDevelop/components/shell";
    import spark from "@/view/dataDevelop/components/spark";

    import { getJobName } from '@/utils/job';


    export default {
        name: "dataDevelop",
        components: {
            leftNav,
            hsql,
            shell,
            spark
        },
        data() {
            return {
                editableTabsValue: '1',
                editableTabs: [],
                tabIndex: 2,
                addJobDialog: false
            }
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped lang="scss">
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
</style>
