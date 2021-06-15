<template>
    <div>
        <el-row>
            <el-col :span="9">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="名称:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="kafka地址:" prop="address">
                        <el-input v-model="form.kafkaServer"></el-input>
                    </el-form-item>
                    <el-form-item label="topic:" prop="topic">
                        <el-input v-model="form.topic"></el-input>
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
                    <el-form-item label="hdfs路径:" prop="hdfsPath">
                        <el-input v-model="form.hdfsPath"></el-input>
                    </el-form-item>
                    <el-form-item label="时间字段:" prop="timeField">
                        <el-input v-model="form.ts"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="9">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="并行度:">
                        <el-input v-model="form.parallelism"></el-input>
                    </el-form-item>
                    <el-form-item label="Slot数:">
                        <el-input v-model="form.taskSlotNum"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="JobManager内存:">
                        <el-input v-model="form.jobManagerMemory"></el-input>
                    </el-form-item>
                    <el-form-item label="TaskManager内存:">
                        <el-input v-model="form.taskManagerMemory"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { kafka2hdfsRules } from '@/utils/constants';
    import {getQueueList} from "@/api/resource";

    export default {
        name: "kafka2hdfs",
        data() {
            return {
                form: {
                    kafkaServer: '',
                    topic: '',
                    hdfsPath: '',
                    ts: '',
                    groupId: 'test',
                    checkpointPath: 'hdfs:///tmp/ds/checkpoint',
                    checkpointInterval: 2,
                    name: '',
                    taskSlotNum: 1,
                    parallelism: 1,
                    jobManagerMemory: '2048mb',
                    taskManagerMemory: '1024mb',
                    yarnQueue: ''
                },
                queue: [],
                kafka2hdfsRules
            }
        },
        props: ['jobInfo'],
        watch:{
            jobInfo: {
                handler(val) {
                    this.init(val)
                }
            }
        },
        created() {
            this.init(this.jobInfo)
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            async init(jobInfo) {
                this.jobInfoCopy = JSON.parse(JSON.stringify(jobInfo));
                if (this.jobInfoCopy.data) {
                    this.form = JSON.parse(this.jobInfoCopy.data)
                }
                const queue = await getQueueList({pageSize: 20, pageNum: 1});
                this.queue = queue.data.content
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
