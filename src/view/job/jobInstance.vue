<template>
    <div>
        <div class="search-term">
            <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input placeholder="名称" v-model="searchInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input placeholder="创建人" v-model="searchInfo.owner"></el-input>
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

            <el-table-column label="ID" prop="job.maskId" width="170"></el-table-column>

            <el-table-column label="名称" width="180">
                <template slot-scope="scope">
                    <router-link :to="{path: '/layout/dataDevelop', query:{id: scope.row.id}}">
                        {{scope.row.job.name}}
                    </router-link>
                </template>
            </el-table-column>

            <el-table-column label="创建人" prop="job.owner" width="120"></el-table-column>
            <el-table-column label="类型" width="60">
                <template slot-scope="scope">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use :xlink:href="scope.row.job.type |getJobIcon"></use>
                    </svg>
                </template>
            </el-table-column>
            <el-table-column label="资源" prop="job.queueId" width="100"></el-table-column>

            <el-table-column label="调度周期" width="80">
                <template slot-scope="scope">{{scope.row.job.schedulingPeriod|formatSchedulingPeriod}}</template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain>{{scope.row.state|formatState}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="执行时长" width="150">
                <template slot-scope="scope">{{scope.row.startTime|runDuration(scope.row.endTime)}}</template>
            </el-table-column>

            <el-table-column label="提交日期" width="160">
                <template slot-scope="scope">{{scope.row.submitTime}}</template>
            </el-table-column>
            <el-table-column label="执行日期" width="160">
                <template slot-scope="scope">{{scope.row.startTime}}</template>
            </el-table-column>
            <el-table-column label="结束日期" width="160">
                <template slot-scope="scope">{{scope.row.endTime}}</template>
            </el-table-column>
            <el-table-column label="按钮组">
                <template slot-scope="scope">
                    <el-button
                            class="table-button"
                            @click="updateWorkflowProcess(scope.row)"
                            size="small"
                            type="primary"
                    >重跑</el-button>
                    <el-button
                            class="table-button"
                            @click="viewWorkflowProcess(scope.row)"
                            size="small"
                            type="warning"
                    >日志</el-button>
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
    </div>
</template>

<script>
    import {
        getJobInstanceList,
    } from "@/api/job"; //  此处请自行替换地址
    import infoList from "@/mixins/infoList";

    import { formatSchedulingPeriod, getJobIcon } from '@/utils/job';
    var moment = require('moment');

    export default {
        name: "JobGraph",
        mixins: [infoList],
        data() {
            return {
                listApi: getJobInstanceList,
                dialogFormVisible: false,
                visible: false,
                deleteVisible: false,
                multipleSelection: []
            };
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
                    return '失败'
                }
                if (state === 7) {
                    return '被杀'
                }
            },
            runDuration: function(start, end) {
                if (!start || !end) {
                    return 0
                }
                const dateDiff = moment(end).unix() - moment(start).unix()
                if (dateDiff <= 1000) {
                    return 0
                }
                const dayDiff = Math.floor(dateDiff / (24 * 3600));
                const leave1 = dateDiff % (24 * 3600);
                const hours = Math.floor(leave1 / (3600));
                const leave2 = leave1 % 3600;
                const minutes = Math.floor(leave2 / 60);
                const leave3 = leave2 % 60;
                const seconds = Math.round(leave3);
                if (minutes === 0) {
                    return seconds + ' 秒'
                }
                if (hours === 0) {
                    return minutes + ' 分钟 ' + seconds + ' 秒'
                }
                if (dayDiff === 0) {
                    return hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒'
                }
                return dayDiff + '天 ' + hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒'
            },
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
            openDialog() {
                this.dialogFormVisible = true;
            }
        },
        async created() {
            await this.getTableData();
        }
    };
</script>

<style>
</style>
