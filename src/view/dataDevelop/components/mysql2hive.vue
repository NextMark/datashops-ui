<template>
    <div>
        <el-row style="text-align: center;">
            <span class="center-title">同步Mysql数据到Hive</span>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item>
                        <span>MySQL配置</span>
                    </el-form-item>
                    <el-form-item label="Mysql地址:" prop="hdfsPath">
                        <el-input v-model="form.mysqlAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名:" prop="hdfsPath">
                        <el-input v-model="form.mysqlUser"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="hdfsPath">
                        <el-input v-model="form.mysqlPass"></el-input>
                    </el-form-item>
                    <el-form-item label="库名:" prop="hdfsPath">
                        <el-input v-model="form.mysqlDb"></el-input>
                    </el-form-item>
                    <el-form-item label="表名:" prop="hdfsPath">
                        <el-input v-model="form.mysqlTable"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item>
                        <span>Hive配置</span>
                    </el-form-item>
                    <el-form-item label="库名:" prop="hdfsPath">
                        <el-input v-model="form.hiveDb"></el-input>
                    </el-form-item>
                    <el-form-item label="表名:" prop="hdfsPath">
                        <el-input v-model="form.hiveTable"></el-input>
                    </el-form-item>
                    <el-form-item label="map数:" prop="topic">
                        <el-input v-model="form.mapNum"></el-input>
                    </el-form-item>
                    <el-form-item label="字段分隔符:" prop="topic">
                        <el-input v-model="form.fieldsTerminated"></el-input>
                    </el-form-item>
                    <el-form-item label="分区字段:" prop="topic">
                        <el-input v-model="form.partitionKey"></el-input>
                    </el-form-item>
                    <el-form-item label="分区值:" prop="topic">
                        <el-input v-model="form.partitionValue"></el-input>
                    </el-form-item>

                </el-form>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mysql2hive",
        props: ['jobInfo'],
        watch: {
            jobInfo: {
                handler(val) {
                    this.init(val)
                }
            }
        },
        data() {
            return {
                form: {
                    type: 2,
                    mysqlAddress: '',
                    mysqlJdbc: '',
                    mysqlUser: '',
                    mysqlPass: '',
                    mysqlDb: '',
                    mysqlTable: '',
                    linesTerminated: '\\n',
                    fieldsTerminated: '\\0001',
                    mapNum: '1',
                    hiveDb: '',
                    hiveTable: '',
                    partitionKey: '',
                    partitionValue: ''
                }
            }
        },
        methods: {
            init(jobInfo) {
                this.jobInfoCopy = JSON.parse(JSON.stringify(jobInfo));
                if (this.jobInfoCopy.data) {
                    this.form = JSON.parse(this.jobInfoCopy.data)
                } else {
                    this.resetForm()
                }
            },

            resetForm() {
                this.form = {
                    type: 2,
                    mysqlAddress: '',
                    mysqlJdbc: '',
                    mysqlUser: '',
                    mysqlPass: '',
                    mysqlDb: '',
                    mysqlTable: '',
                    linesTerminated: '\\n',
                    fieldsTerminated: '\\0001',
                    mapNum: '1',
                    exportDir: ''
                }
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
