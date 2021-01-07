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
                    type="index"
                    width="40"></el-table-column>

            <el-table-column label="名称" prop="name" width="180"></el-table-column>
            <el-table-column label="描述" prop="description" width="200"></el-table-column>

            <el-table-column label="优先级" prop="priority" width="100"></el-table-column>

            <el-table-column label="创建人" prop="owner" width="120"></el-table-column>
            <el-table-column label="调度周期" width="100">
                <template slot-scope="scope">{{scope.row.schedulingPeriod|formatSchedulingPeriod}}</template>
            </el-table-column>

            <el-table-column label="表达式" prop="cronExpression" width="150"></el-table-column>
            <el-table-column label="下次调度时间" width="180">
                <template slot-scope="scope">{{scope.row.nextTriggerTime}}</template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="调度状态" width="80">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.schedulerStatus"
                            active-color="#13ce66"
                            inactive-color="#BFBFBF"
                            :active-value=1
                            :inactive-value=0>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="按钮组">
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
                            <el-button type="primary" size="mini" @click="deleteWorkflowProcess(scope.row)">确定</el-button>
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
        getJobGraphList,
        deleteJobGraph
    } from "@/api/job"; //  此处请自行替换地址
    import infoList from "@/mixins/infoList";

    export default {
        name: "JobGraph",
        mixins: [infoList],
        data() {
            return {
                listApi: getJobGraphList,
                dialogFormVisible: false,
                visible: false,
                deleteVisible: false,
                multipleSelection: []
            };
        },
        filters: {
            formatSchedulingPeriod: function (period) {
                if (period === 0) {
                    return '月'
                }
                if (period === 1) {
                    return '周'
                }
                if (period === 2) {
                    return '天'
                }
                if (period === 3) {
                    return '小时'
                }
                if (period === 4) {
                    return '分钟'
                }
            }
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
            async onDelete() {
                const ids = [];
                this.multipleSelection &&
                this.multipleSelection.map(item => {
                    ids.push(item.id);
                });
                const res = await deleteJobGraph({ ids });
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    if (this.tableData.length == ids.length) {
                        this.pageNum--;
                    }
                    this.deleteVisible = false;
                    this.getTableData();
                }
            },
            async updateWorkflowProcess(row) {
                this.$router.push({
                    name: "jobGraphCreate",
                    query: {
                        id: row.id,
                        type: "edit"
                    }
                });
            },
            async viewWorkflowProcess(row) {
                this.$router.push({
                    name: "jobGraphCreate",
                    query: {
                        id: row.id,
                        type: "view"
                    }
                });
            },
            async deleteWorkflowProcess(row) {
                this.visible = false;
                const res = await deleteJobGraph({ id: row.id });
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    if (this.tableData.length == 1) {
                        this.pageNum--;
                    }
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
