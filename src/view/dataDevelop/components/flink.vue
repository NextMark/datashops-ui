<template>
    <div>
        <el-row>
            <el-col :span="9">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="yarn任务名称" prop="yarnAppName">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="并行度" prop="parallelism">
                        <el-input v-model="form.parallelism"></el-input>
                    </el-form-item>
                    <el-form-item label="JobManager内存" prop="jobManagerMemory">
                        <el-input v-model="form.jobManagerMemory"></el-input>
                    </el-form-item>
                    <el-form-item label="类名" prop="className">
                        <el-input v-model="form.className"></el-input>
                    </el-form-item>
                    <el-form-item label="jar">
                        <el-upload
                                class="upload-demo"
                                action="http://localhost:8666/v1/res/uploadJar"
                                :data="{'jobId': jobInfo.id, 'type': 1, 'name': jobInfo.name}"
                                :headers="{'Authorization': token}"
                                :multiple="false"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :on-success="handleSuccess"
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jar文件，且不超过100Mb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="队列:">
                        <el-select v-model="form.yarnQueue" placeholder="请选择队列">
                            <el-option
                                    v-for="item in queue"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Slot数" prop="taskSlotNum">
                        <el-input v-model="form.taskSlotNum"></el-input>
                    </el-form-item>
                    <el-form-item label="TaskManager内存" prop="taskManagerMemory">
                        <el-input v-model="form.taskManagerMemory"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getQueueList} from "@/api/resource";
    import { flinkRules } from '@/utils/constants';
    import { store } from '@/store/index'


    export default {
        name: "flink",
        props: ['jobInfo'],
        watch:{
            jobInfo: {
                handler(val) {
                    this.init(val)
                }
            }
        },
        data() {
            return {
                token: store.getters['user/token'],
                flinkRules,
                flinkVersion: [{
                    value: '1.12.0',
                    label: '1.12.0'
                }],
                form: {
                    version: '1.12.0',
                    name: '',
                    taskSlotNum: 1,
                    parallelism: 1,
                    jobManagerMemory: '2048mb',
                    taskManagerMemory: '1024mb',
                    className: '',
                    yarnQueue: '',
                    extension: '',
                    fileName: '',
                    url: '',
                    size: ''
                },
                fileList: [],
                jobInfoCopy: {},
                queue: []
            }
        },
        methods: {
            async init(jobInfo) {
                this.jobInfoCopy = JSON.parse(JSON.stringify(jobInfo));
                if (this.jobInfoCopy.data) {
                    this.form = JSON.parse(this.jobInfoCopy.data)
                    if (this.form.fileName) {
                        this.fileList.push({
                            name: this.form.fileName,
                            url: this.form.url
                        })
                    }
                } else {
                    this.resetForm()
                    this.fileList = []
                }
                const queue = await getQueueList({pageSize: 20, pageNum: 1});
                this.queue = queue.data.content
            },
            resetForm() {
                this.form = {
                    version: '1.12.0',
                    yarnAppName: '',
                    taskSlotNum: 1,
                    parallelism: 1,
                    jobManagerMemory: '2048mb',
                    taskManagerMemory: '1024mb',
                    className: '',
                    yarnQueue: '',
                    extension: '',
                    fileName: '',
                    url: '',
                    size: ''
                }
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
            },
            handleSuccess(response, file, fileList) {
                this.form.fileName = response.data.name
                this.form.url = response.data.url
                this.form.size = response.data.size
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
