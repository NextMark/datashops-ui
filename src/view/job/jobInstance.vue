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
            <el-table-column label="ID"
                             type="index" fixed="left"
                             width="40"></el-table-column>

            <el-table-column label="ID" prop="job.maskId" width="180"></el-table-column>

            <el-table-column label="名称" prop="job.name" width="180"></el-table-column>

            <el-table-column label="优先级" prop="job.priority" width="100"></el-table-column>

            <el-table-column label="创建人" prop="job.owner" width="120"></el-table-column>
            <el-table-column label="作业类型" width="80">
                <template slot-scope="scope">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use :xlink:href="scope.row.job.type |getJobIcon"></use>
                    </svg>
                </template>
            </el-table-column>
            <el-table-column label="资源" prop="job.queueId" width="120"></el-table-column>

            <el-table-column label="调度周期" width="100">
                <template slot-scope="scope">{{scope.row.job.schedulingPeriod|formatSchedulingPeriod}}</template>
            </el-table-column>

            <el-table-column label="提交日期" width="180">
                <template slot-scope="scope">{{scope.row.submitTime}}</template>
            </el-table-column>
            <el-table-column label="执行日期" width="180">
                <template slot-scope="scope">{{scope.row.startTime}}</template>
            </el-table-column>
            <el-table-column label="结束日期" width="180">
                <template slot-scope="scope">{{scope.row.endTime}}</template>
            </el-table-column>
            <el-table-column label="按钮组" min-width="220" fixed="right">
                <template slot-scope="scope">
                    <el-button
                            class="table-button"
                            @click="updateWorkflowProcess(scope.row)"
                            size="small"
                            type="primary"
                    >手动执行</el-button>
                    <el-button
                            class="table-button"
                            @click="viewWorkflowProcess(scope.row)"
                            size="small"
                            type="warning"
                    >查看</el-button>
                    <el-popover placement="top" width="160" v-model="scope.row.visible">
                        <p>确定要删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteJobGraph(scope.row)">确定</el-button>
                        </div>
                        <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
                    </el-popover>
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
            getJobIcon
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
