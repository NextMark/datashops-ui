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

            <el-table-column label="名称" width="180" prop="name"></el-table-column>
            <el-table-column label="类型" width="100">
                <template slot-scope="scope">{{scope.row.type|formatType}}</template>
            </el-table-column>
            <el-table-column label="大小" width="120">
                <template slot-scope="scope">
                    {{scope.row.size}} kb
                </template>
            </el-table-column>
            <el-table-column label="地址" width="520" prop="url"></el-table-column>

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
                <el-form-item label="资源类型" label-width="80px" prop="name">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="7">jar</el-radio>
                        <el-radio :label="6">zip</el-radio>
                        <el-radio :label="5">file</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="资源名称" label-width="80px" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="资源文件" label-width="80px">
                    <el-upload
                            v-loading="loading"
                            class="upload-demo"
                            action="http://localhost:8666/v1/res/addResourceFile"
                            :data="{'type': form.type, 'name': form.name}"
                            :headers="{'Authorization': token}"
                            :multiple="false"
                            :on-progress="onProgress"
                            :before-upload="beforeUpload"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">文件不超过100Mb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
<!--            <div class="dialog-footer" slot="footer">-->
<!--                <el-button @click="closeDialog">取 消</el-button>-->
<!--                <el-button @click="enterDialog" type="primary">确 定</el-button>-->
<!--            </div>-->
        </el-dialog>
    </div>
</template>

<script>
    import {
        addResourceFile,
        getResourceFileList,
        deleteResourceFile
    } from "@/api/resource"; //  此处请自行替换地址
    import infoList from "@/mixins/infoList";
    import { store } from '@/store/index'



    export default {
        name: "resource",
        mixins: [infoList],
        data() {
            return {
                listApi: getResourceFileList,
                dialogFormVisible: false,
                visible: false,
                deleteVisible: false,
                loading: false,
                token: store.getters['user/token'],
                form: {
                    type: 7,
                    name: "",
                },
                fileList: []
            };
        },
        filters: {
            formatType(type) {
                switch (type) {
                    case 0:
                        return "spark jar"
                    case 1:
                        return "flink jar"
                    case 2:
                        return "udf"
                    case 3:
                        return "udaf"
                    case 4:
                        return "udtf"
                    case 5:
                        return "file"
                    case 6:
                        return "zip"
                    case 7:
                        return "jar"
                }
            }
        },
        methods: {
            handleClose(index) {
                this.$refs[`popover-` + index].doClose()
            },
            onSubmit() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.getTableData();
            },
            async deleteRow(row) {
                this.visible = false;
                const res = await deleteResourceFile({ id: row.id });
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
                        const res = await addResourceFile(this.form);
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
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            beforeUpload(file) {
                if (!this.form.name) {
                    this.$message({
                        type: "danger",
                        message: "请输入名称!"
                    });
                    return false
                }
            },
            onProgress() {
                this.loading = true
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSuccess(response, file, fileList) {
                this.loading = false
            }
        },
        async created() {
            await this.getTableData();
        }
    };
</script>

<style>
</style>
