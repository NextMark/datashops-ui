<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item>
                        <span>Hive</span>
                    </el-form-item>
                    <el-form-item label="Hive路径:" prop="address">
                        <el-input v-model="form.exportDir"></el-input>
                    </el-form-item>
                    <el-form-item label="map数:" prop="topic">
                        <el-input v-model="form.mapNum"></el-input>
                    </el-form-item>
                    <el-form-item label="字段分隔符:" prop="topic">
                        <el-input v-model="form.fieldsTerminated"></el-input>
                    </el-form-item>
                    <el-form-item label="行分隔符:" prop="topic">
                        <el-input v-model="form.linesTerminated"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item>
                        <span>MySQL</span>
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
                    <el-form-item label="库:" prop="hdfsPath">
                        <el-input v-model="form.mysqlDb"></el-input>
                    </el-form-item>
                    <el-form-item label="表:" prop="hdfsPath">
                        <el-input v-model="form.mysqlTable"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "hive2mysql",
        props: ['jobInfo'],

        data() {
            return {
                form: {
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
        methods: {
            init(jobInfo) {
                this.jobInfoCopy = JSON.parse(JSON.stringify(jobInfo));
                if (this.jobInfoCopy.data) {
                    this.form = JSON.parse(this.jobInfoCopy.data)
                }
            },
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
