<template>
    <div class="parent">
        <div class="left">
            <el-row>
                <el-tooltip class="item" effect="dark" content="添加临时查询" placement="top-start">
                    <el-button type="text" icon="el-icon-plus" style="font-size:20px"
                               @click="tmpQueryDia = true"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新" placement="top-start">
                    <el-button type="text" icon="el-icon-refresh" style="font-size:20px" @click="refresh"></el-button>
                </el-tooltip>
            </el-row>

            <el-menu default-active="1" class="el-menu-vertical-demo"
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
                    <el-button icon="el-icon-plus" @click="tmpQueryDia = true">新建临时查询</el-button>
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
                                content="保存">
                        <el-button type="text" style="font-size:15px" @click="save(jobInfo.id)">
                            <svg class="icon-1-5" aria-hidden="true">
                                <use xlink:href="#el-icon-my-baocun"></use>
                            </svg>
                        </el-button>
                    </el-tooltip>
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
                            :language="language"
                            :value="value"
                            @onMounted="onMounted"
                            @onCodeChange="onCodeChange"/>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeName" type="card" v-if="logVisible">
                        <el-tab-pane label="日志" name="log">
                            <Editor
                                    :readOnly="true"
                                    :editorId="logEditorId"
                                    :showThemeSelect="false"
                                    height="200px"
                                    style="padding-top: 3px"
                                    language="sql"
                                    value="log"
                            />
                        </el-tab-pane>
                        <el-tab-pane label="结果" name="result">
                            <el-table :data="list" border height="350">
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="50">
                                </el-table-column>
                                <el-table-column label="时间" width="80">
                                    <template slot-scope="scope">
                                        {{ scope.row.type}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="80">
                                    <template slot-scope="scope">
                                        {{ scope.row.status}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

                </el-tabs>
            </div>
        </div>
        <el-dialog title="临时查询" :visible.sync='tmpQueryDia' width="480px" center>
            <el-form :model="form" label-width="80px">
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="hql" :value="0"></el-option>
                        <el-option label="shell" :value="1"></el-option>
                        <el-option label="python" :value="11"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="tmpQueryDia = false">取消</el-button>
                <el-button type="primary" @click="clickAdd()">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addTmpQuery, getTmpQueryById, getTmpQueryList, update, runJob} from "@/api/tmpQuery";
    import infoList from "@/mixins/infoList";
    import {mapGetters} from "vuex";
    import {getJobIcon} from '@/utils/job';
    import lodash from 'lodash'

    import Editor from '../dataDevelop/components/editor'

    export default {
        name: "temporaryQuery",
        components: {
            Editor
        },
        mixins: [infoList],
        computed: {
            ...mapGetters("user", ["userInfo"])
        },

        data() {
            return {
                logVisible: false,
                activeName: 'log',
                list: [
                    {
                        type: 1,
                        status: 'running',
                    },
                    {
                        type: 2,
                        status: 'failed',
                    }
                ],
                logEditorId: 'eee',
                tmpQueryDia: false,
                listApi: getTmpQueryList,
                openedTabs: [],
                jobActiveTab: '1',
                isCollapse: false,
                integrationList: [],
                jobInfo: {},
                hiveList: [],
                shellList: [],
                pythonList: [],
                openedJobList: [],
                editor: null,
                value: '',
                language: 'sql',
                form: {
                    id: "",
                    name: "",
                    type: 0,
                    value: ''
                },
            };
        },
        mounted() {
            this.initLeft()
        },
        filters: {
            getJobIcon
        },
        methods: {
            async initLeft() {
                this.hiveList = []
                this.shellList = []
                this.pythonList = []
                await this.getTableData(1, 100);
                for (let i = 0; i < this.tableData.length; i++) {
                    const job = this.tableData[i]
                    if (job.type === 0 ) {
                        this.hiveList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            value: job.value
                        })
                    }
                    if (job.type === 1) {
                        this.shellList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            value: job.value
                        })
                    }
                    if (job.type === 11) {
                        this.pythonList.push({
                            id: job.id,
                            name: job.name,
                            type: job.type,
                            value: job.value
                        })
                    }
                }
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value) {
                this.value = value
            },
            async save(id) {
                const res = await update({id: id, value: this.value, owner: this.userInfo.name});
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "保存成功!"
                    });
                    this.openedJobList = lodash.unionBy([res.data], this.openedJobList, 'id')
                }
            },
            async clickAdd() {
                this.form.owner = this.userInfo.name
                const res = await addTmpQuery(this.form);
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "添加成功!"
                    });
                    this.tmpQueryDia = false
                    this.initLeft();
                }
            },
            refresh() {
                this.initLeft();
            },
            initEditor(jobInfo) {
                this.$nextTick(() => {
                    if (jobInfo.type === 0) {
                        this.language = 'sql'
                        this.changeModel('sql')
                    }
                    if (jobInfo.type === 1) {
                        this.language = 'shell'
                        this.changeModel('shell')
                    }
                    if (jobInfo.type === 11) {
                        this.language = 'python'
                        this.changeModel('python')
                    }
                    if (jobInfo.value) {
                        this.value = jobInfo.value
                        this.editor.setValue(jobInfo.value)
                    } else {
                        this.value = ''
                        this.editor.setValue(this.value)
                    }
                })
            },
            async clickJob(job) {
                var res = this.openedTabs.some(item=>{
                    if(item.name === job.id.toString()){
                        return true
                    }
                })
                if (!res) {
                    const res = await getTmpQueryById({id: job.id})
                    if (res.code === 1000) {
                        this.openedTabs.push({
                            title: job.name,
                            name: res.data.id.toString(),
                            type: job.type,
                            value: job.value
                        });
                        this.jobInfo = res.data
                        this.openedJobList.push(this.jobInfo)
                        this.initEditor(this.jobInfo)
                    }
                } else {
                    const index = this.openedJobList.findIndex(j => j.id.toString() === job.id.toString())
                    this.jobInfo = this.openedJobList[index]
                }
                this.initEditor(this.jobInfo)
                this.jobActiveTab = job.id.toString()
            },
            changeModel(language){
                var oldModel = this.editor.getModel();
                var value = this.editor.getValue();
                var newModel = window.monaco.editor.createModel(value,language);
                if(oldModel){
                    oldModel.dispose();
                }
                this.editor.setModel(newModel);
            },
            async runJob(id) {
                this.logVisible = true
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
                this.initEditor(this.jobInfo)
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
