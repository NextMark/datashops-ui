<template>
    <div>
        <div class="search-term">
            <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="名称" v-model="searchInfo.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary">查询</el-button>
                </el-form-item>
                <el-button style="float: right" @click="openDialog()" type="primary">新增</el-button>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%"
                tooltip-effect="dark"
        >
            <el-table-column label="ID"
                    type="index" fixed="left"
                    width="40"></el-table-column>

            <el-table-column label="名称" width="280" prop="name"></el-table-column>
            <el-table-column label="类型" width="100">
                <template slot-scope="scope">{{scope.row.type|formatType}}</template>
            </el-table-column>
            <el-table-column label="地址" width="220" prop="host"></el-table-column>
            <el-table-column label="端口" width="100" prop="port"></el-table-column>
            <el-table-column label="用户名" width="140" prop="user"></el-table-column>
            <el-table-column label="密码" width="140" prop="password"></el-table-column>

            <el-table-column label="创建时间" width="160">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="修改时间" width="160">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-popover placement="top" width="160" :ref="`popover-${scope.$index}`">
                        <p>确定要删除吗</p>
                        <div style="text-align: right; margin: 0">
                            <el-button type="primary" size="mini" @click="deleteRow(scope.row)">确定</el-button>
                        </div>
                        <el-button type="danger" icon="el-icon-delete" size="small" slot="reference">删除</el-button>
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
        <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="类型" label-width="80px" prop="type">
                    <el-select v-model="form.type" placeholder="类型" @change="change">
                        <el-option
                                v-for="item in dataSourceType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" label-width="80px" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" label-width="80px" prop="host">
                    <el-input v-model="form.host">
                        <template slot="prepend" >{{dataSourcePrefix}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="端口" label-width="80px" prop="port">
                    <el-input v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="80px" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button @click="enterDialog" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addDataSource,
        deleteDataSource,
        getDataSourceList
    } from "@/api/resource"; //  此处请自行替换地址
    import infoList from "@/mixins/infoList";
    import { dataSourceType } from '@/utils/job';


    export default {
        name: "Project",
        mixins: [infoList],
        data() {
            return {
                dataSourceType,
                listApi: getDataSourceList,
                dialogFormVisible: false,
                visible: false,
                deleteVisible: false,
                multipleSelection: [],
                form: {
                    type: 0,
                    name: "",
                    port: 10000
                },
                dataSourcePrefix: "jdbc:hive2://"
            };
        },
        filters: {
            formatType(type) {
                switch (type) {
                    case 0:
                        return "Hive"
                    case 1:
                        return "MySQL"
                    case 2:
                        return "ClickHouse"
                    case 3:
                        return "PostgreSQL"
                }
            }
        },
        methods: {
            handleClose(index) {
                console.log(this.$refs[`popover-${index}`])
                this.$refs[`popover-` + index].doClose()
            },
            onSubmit() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.getTableData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            change(val) {
                switch (val) {
                    case 0:
                        this.dataSourcePrefix = "jdbc:hive2://"
                        this.form.port = 10000
                        break
                    case 1:
                        this.dataSourcePrefix = "jdbc:mysql://"
                        this.form.port = 3306
                        break
                    case 2:
                        this.dataSourcePrefix = "jdbc:clickhouse://"
                        this.form.port = 9000
                        break
                    case 3:
                        this.dataSourcePrefix = "jdbc:postgresql://"
                        this.form.port = 5432
                        break
                }
            },
            async deleteRow(row) {
                this.visible = false;
                const res = await deleteDataSource({ id: row.id });
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
            },
            initForm() {
                if (this.$refs.form) {
                    this.$refs.form.resetFields();
                }
                this.form = {
                    id: "",
                    name: ""
                };
            },
            closeDialog() {
                this.initForm();
                this.dialogFormVisible = false;
            },
            async enterDialog() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.form.host = this.dataSourcePrefix + this.form.host
                        const res = await addDataSource(this.form);
                        if (res.code === 1000) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.getTableData();
                        }
                        this.closeDialog();
                    }
                });
            }
        },
        async created() {
            await this.getTableData();
        }
    };
</script>

<style>
</style>
