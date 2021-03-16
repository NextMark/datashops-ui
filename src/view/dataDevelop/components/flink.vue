<template>
    <div>
        <el-form ref="form" :model="form" :rules="flinkRules" label-width="140px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="flink版本" prop="version">
                        <el-select v-model="form.version" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in flinkVersion"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="队列" prop="yq">
                        <el-select v-model="form.yq" placeholder="请选择队列">
                            <el-option
                                    v-for="item in queue"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="yarn任务名称" prop="ynm">
                        <el-input v-model="form.ynm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="并行度" prop="p">
                        <el-input v-model="form.p"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="TaskManager数" prop="yn">
                        <el-input v-model="form.yn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="Slot数" prop="ys">
                        <el-input v-model="form.ys"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="JobManager内存" prop="yjm">
                        <el-input v-model="form.yjm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="TaskManager内存" prop="ytm">
                        <el-input v-model="form.ytm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="类名" prop="c">
                <el-input v-model="form.c"></el-input>
            </el-form-item>
            <el-form-item label="扩展参数">
                <el-input type="textarea" v-model="form.extension"></el-input>
            </el-form-item>
            <el-form-item label="jar">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jar文件，且不超过100Mb</div>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getQueueList} from "@/api/resource";
    import { flinkRules } from '@/utils/constants';


    export default {
        name: "flink",
        props: ['jobInfo'],

        data() {
            return {
                flinkRules,
                flinkVersion: [{
                    value: '1.12.0',
                    label: '1.12.0'
                }, {
                    value: '1.12.1',
                    label: '1.12.1'
                }, {
                    value: '1.12.2',
                    label: '1.12.2'
                }, {
                    value: '1.13.0',
                    label: '1.13.0'
                }],
                form: {
                    version: '1.12.0',
                    ynm: '',
                    yn: 1,
                    ys: 1,
                    p: 1,
                    yjm: '2048mb',
                    ytm: '1024mb',
                    c: '',
                    yq: '',
                    extension: ''
                },
                fileList: [
                    {
                        name: 'aaa.jar',
                        url: ''
                    }
                ],
                jobInfoCopy: {},
                queue: []
            }
        },
        methods: {
            async init(jobInfo) {
                this.jobInfoCopy = JSON.parse(JSON.stringify(jobInfo));
                if (this.jobInfoCopy.data) {
                    this.form = JSON.parse(this.jobInfoCopy.data)
                }
                const queue = await getQueueList({pageSize: 20, pageNum: 1});
                this.queue = queue.data.content
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        created() {
            this.init(this.jobInfo)
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
