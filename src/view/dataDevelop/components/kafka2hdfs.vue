<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-form ref="form" :model="form" :rules="kafka2hdfsRules" label-width="120px">
                    <el-form-item label="类型:">
                        <span>Kafka</span>
                    </el-form-item>
                    <el-form-item label="kafka地址:" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="topic:" prop="topic">
                        <el-input v-model="form.topic"></el-input>
                    </el-form-item>
                    <el-form-item label="消费起始位置:" prop="position">
                        <el-radio-group v-model="form.position">
                            <el-radio label="最新"></el-radio>
                            <el-radio label="最初"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form ref="form" :model="form" :rules="kafka2hdfsRules" label-width="100px">
                    <el-form-item label="类型:">
                        <span>HDFS</span>
                    </el-form-item>
                    <el-form-item label="hdfs路径:" prop="hdfsPath">
                        <el-input v-model="form.hdfsPath"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { kafka2hdfsRules } from '@/utils/constants';

    export default {
        name: "kafka2hdfs",
        data() {
            return {
                form: {
                    address: '',
                    topic: '',
                    position: '',
                    hdfsPath: '',
                },
                kafka2hdfsRules
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
