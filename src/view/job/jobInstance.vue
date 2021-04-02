<template>
    <div>
        <div class="search-term">
            <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
                <el-form-item label="作业名">
                    <el-input placeholder="名称" v-model="searchInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="执行人">
                    <el-input placeholder="执行人" v-model="searchInfo.owner"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                border
                ref="multipleTable"
                stripe
                style="width: 100%"
                tooltip-effect="dark"
        >
            <el-table-column
                             type="index" fixed="left"
                             width="40"></el-table-column>

            <el-table-column label="ID" width="170">
                <template slot-scope="scope">
                    {{scope.row.instanceId}}
                </template>
            </el-table-column>
            <el-table-column label="类型" width="60">
                <template slot-scope="scope">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use :xlink:href="scope.row.job.type |getJobIcon"></use>
                    </svg>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="180">
                <template slot-scope="scope">
                    {{scope.row.job.name}}
                </template>
            </el-table-column>
            <el-table-column label="调度周期" width="80">
                <template slot-scope="scope">{{scope.row.job.schedulingPeriod|formatSchedulingPeriod}}</template>
            </el-table-column>
            <el-table-column label="基准时间" width="170">
                <template slot-scope="scope">{{scope.row.bizTime}}</template>
            </el-table-column>
            <el-table-column label="执行人" prop="operator" width="120"></el-table-column>

            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.state | statusFilter "
                            disable-transitions>{{scope.row.state | formatState}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="执行时长" width="130">
                <template slot-scope="scope">{{scope.row.startTime|runDuration(scope.row.endTime)}}</template>
            </el-table-column>


            <el-table-column label="提交日期" width="170">
                <template slot-scope="scope">{{scope.row.submitTime}}</template>
            </el-table-column>
            <el-table-column label="执行日期" width="170">
                <template slot-scope="scope">{{scope.row.startTime}}</template>
            </el-table-column>
            <el-table-column label="结束日期" width="170">
                <template slot-scope="scope">{{scope.row.endTime}}</template>
            </el-table-column>
            <el-table-column label="按钮组" min-width="240">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.state >= 5"
                            class="table-button"
                            @click="reRun(scope.row.id)"
                            size="small"
                            type="primary"
                    >重跑</el-button>
                    <el-button v-if="scope.row.state < 5"
                               class="table-button"
                               @click="cancel(scope.row.id)"
                               size="small"
                               type="danger"
                    >终止</el-button>
                    <el-button
                            class="table-button"
                            @click="viewLog(scope.row)"
                            size="small"
                            type="warning"
                    >日志</el-button>
                    <el-button
                            class="table-button"
                            @click="viewDag(scope.row)"
                            size="small"
                            type="success"
                    >DAG</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                :page-sizes="[10, 30, 50, 100]"
                :style="{ float: 'right', padding: '20px' }"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <el-drawer
                title="任务实例日志"
                :visible.sync="instanceLog"
                size="60%"
                direction="rtl">
            <el-button
                    icon="el-icon-refresh"
                    style="margin-left: 20px"
                    class="table-button"
                    @click="viewLog(selectedJob)"
                    size="small"
                    type="primary"
            >刷新</el-button>
            <Editor
                    style="margin-top: -30px"
                    language="sql"
                    :height="height"
                    :code="logContent"
                    @onMounted="onMounted"
                    @onCodeChange="onCodeChange"/>
        </el-drawer>
        <el-drawer
                title="任务执行状态图"
                :visible.sync="dagView"
                size="60%"
                direction="rtl">
            <el-button
                    icon="el-icon-refresh"
                    style="margin-left: 20px; margin-bottom: 10px"
                    class="table-button"
                    @click="viewDag(selectedJob)"
                    size="small"
                    type="primary"
            >刷新</el-button>
            <graph :jobGraph="jobGraph"></graph>
        </el-drawer>
    </div>
</template>

<script>
    import {
        getJobInstanceList,
        deleteJobGraph,
        reRunJob,
        cancelJob,
        getJobGraph
    } from "@/api/job";
    import {
        rollReadLog
    } from "@/api/log";
    import infoList from "@/mixins/infoList";

    import { formatSchedulingPeriod, getJobIcon } from '@/utils/job';
    import Editor from '../dataDevelop/components/editor'
    import graph from '@/view/dataDevelop/components/graph'

    import { mapGetters } from "vuex";

    var moment = require('moment');

    var skipLines = 0;

    export default {
        name: "JobGraph",
        mixins: [infoList],
        data() {
            return {
                listApi: getJobInstanceList,
                visible: false,
                dagView: false,
                instanceLog: false,
                multipleSelection: [],
                logContent: '',
                height: '80vh',
                selectedJob: {},
                jobGraph: {},
            };
        },
        computed: {
            ...mapGetters("user", ["userInfo"])
        },
        filters: {
            formatSchedulingPeriod,
            getJobIcon,
            formatState(state) {
                if (state === 0) {
                    return '已创建'
                }
                if (state === 1) {
                    return '等待资源'
                }
                if (state === 2) {
                    return '等待依赖'
                }
                if (state === 3) {
                    return '等待执行'
                }
                if (state === 4) {
                    return '执行中'
                }
                if (state === 5) {
                    return '成功'
                }
                if (state === 6) {
                    return '取消'
                }
                if (state === 7) {
                    return '失败'
                }
                if (state === 8) {
                    return '被杀'
                }

            },
            runDuration: function(start, end) {
                if (!start || !end) {
                    return 0
                }
                const dateDiff = moment(end).unix() - moment(start).unix()

                // if (dateDiff <= 1000) {
                //     return 0
                // }
                const dayDiff = Math.floor(dateDiff / (24 * 3600));
                const leave1 = dateDiff % (24 * 3600);
                const hours = Math.floor(leave1 / (3600));
                const leave2 = leave1 % 3600;
                const minutes = Math.floor(leave2 / 60);
                const leave3 = leave2 % 60;
                const seconds = Math.round(leave3);
                if (minutes === 0) {
                    return seconds + ' s'
                }
                if (hours === 0) {
                    return minutes + ' m ' + seconds + ' s'
                }
                if (dayDiff === 0) {
                    return hours + ' h ' + minutes + ' m ' + seconds + ' s'
                }
                return dayDiff + 'd ' + hours + ' h ' + minutes + ' m ' + seconds + ' s'
            },
            statusFilter(status) {
                const statusMap = {
                    0: '',
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                    5: 'success',
                    6: 'info',
                    7: 'danger',
                    8: 'warning'
                }
                return statusMap[status]
            }
        },
        components: {
            Editor,
            graph
        },
        methods: {
            //条件搜索前端看此方法
            onSubmit() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.getTableData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async deleteJobGraph(row) {
                this.visible = false;
                const res = await deleteJobGraph({ id: row.id });
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.getTableData();
                }
            },
            async reRun(id) {
                const res = await reRunJob({id: id, operator: this.userInfo.name});
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "重跑任务提交",
                        center: true
                    });
                }
                await this.getTableData();
            },
            async cancel(id) {
                const res = await cancelJob({id: id, operator: this.userInfo.name});
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "作业取消",
                        center: true
                    });
                }
                await this.getTableData();
            },
            async viewDag(row) {
                this.selectedJob = row
                this.jobGraph = {}
                this.dagView = true
                const res = await getJobGraph({id: row.jobId})
                if (res.code === 1000) {
                    this.jobGraph = res.data
                }
            },
            async viewLog(row) {
                if (this.selectedJob.id && row.id !== this.selectedJob.id) {
                    skipLines = 0
                    this.logContent = ''
                    this.editor.setValue(this.logContent)
                }
                this.selectedJob = row
                this.instanceLog = true

                const res = await rollReadLog({instanceId: row.instanceId, limit: 200, skipLines: skipLines})
                if (res.code === 1000) {
                    this.logContent += res.data
                    let len = res.data.split('\n').length
                    if (len >= 200) {
                        skipLines += len -1
                    }
                    this.editor.setValue(this.logContent)
                }
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value, event) {
                this.logContent = value
            },
        },
        async created() {
            await this.getTableData();
        }
    };
</script>

<style>
</style>
