<template>
    <div>
        <el-form ref="form" :model="form"></el-form>
        <Editor
                style="margin-top: -30px"
                language="sql"
                :code="sql"
                @onMounted="onMounted"
                @onCodeChange="onCodeChange"/>
    </div>
</template>

<script>
    import sqlFormatter from 'sql-formatter'
    import { mapGetters } from "vuex";
    import Editor from './editor'

    export default {
        name: "hsql",
        components: {
            Editor
        },

        data() {
            return {
                form: {},
                sql: '-- Type your SQL! \n',
                defaultSql: '-- Type your SQL! \n'
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
        computed: {
            ...mapGetters("user", ["userInfo"])
        },
        mounted() {
            this.init(this.jobInfo)
        },
        methods: {
            formatSQL() {
                this.editor.getAction('editor.action.formatDocument').run();

                //this.editor.setValue(sqlFormatter.format(this.editor.getValue()))
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(sql, event) {
                this.sql = sql
            },
            init(jobInfo) {
                const data = JSON.parse(jobInfo.data)
                if (data) {
                    this.sql = data.sql
                }
                this.defaultSql += '-- Author: ' + this.userInfo.name + '\n'

                if (this.sql) {
                    this.editor.setValue(this.sql)
                } else {
                    this.sql = this.defaultSql
                    this.editor.setValue(this.defaultSql)
                }
            }
        }
    }
</script>

<style scoped>

</style>
