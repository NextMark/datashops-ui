<template>
    <div>
        <el-form ref="form" :model="form" label-width="140px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="队列">
                        <el-select v-model="form.queueId" placeholder="请选择队列">
                            <el-option
                                    v-for="item in queue"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="Driver内存">
                        <el-input v-model="form.driverMemory"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="Executor内存">
                        <el-input v-model="form.executorMemory"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Executor核数">
                <el-input v-model="form.cores"></el-input>
            </el-form-item>
            <el-form-item label="类名">
                <el-input v-model="form.className"></el-input>
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

    export default {
        name: "spark",
        props: ['jobInfo'],
        data() {
            return {
                form: {
                    name: 'spark-submit',
                    cores: 1,
                    driverMemory: '2048mb',
                    executorMemory: '1024mb',
                    className: '',
                    queueId: 3
                },
                fileList: [
                    {
                        name: 'aaa.jar',
                        url: ''
                    }
                ],
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
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

<style scoped>

</style>
