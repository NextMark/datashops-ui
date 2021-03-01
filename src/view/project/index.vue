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

            <el-table-column label="ID" prop="id" width="170"></el-table-column>

            <el-table-column label="名称" width="280" prop="name"></el-table-column>

            <el-table-column label="执行日期" width="160">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="结束日期" width="160">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
            </el-table-column>
            <el-table-column label="按钮组">
                <template slot-scope="scope">
                    <el-button
                            class="table-button"
                            @click="delete(scope.row)"
                            size="small"
                            type="danger"
                    >删除</el-button>
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
        addProject,
        deleteProject,
        getProjectList
    } from "@/api/resource"; //  此处请自行替换地址
    import infoList from "@/mixins/infoList";
    var moment = require('moment');

    export default {
        name: "Project",
        mixins: [infoList],
        data() {
            return {
                listApi: getProjectList,
                dialogFormVisible: false,
                visible: false,
                deleteVisible: false,
                multipleSelection: []
            };
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
            async delete(row) {
                this.visible = false;
                const res = await deleteProject({ id: row.id });
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
