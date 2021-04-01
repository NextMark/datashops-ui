<template>
    <div>
        <el-form ref="form" :model="form"></el-form>
        <Editor
                style="margin-top: -30px"
                language="sql"
                :code="value"
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
                value: '-- Type your SQL! \n',
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
            onCodeChange(value, event) {
                this.value = value
            },
            init(jobInfo) {
                const data = JSON.parse(jobInfo.data)
                if (data) {
                    this.value = data.value
                }
                this.defaultSql += '-- Author: ' + this.userInfo.name + '\n'

                if (this.value) {
                    this.editor.setValue(this.value)
                } else {
                    this.value = this.defaultSql
                    this.editor.setValue(this.defaultSql)
                }
            }
        }
    }
</script>

<style scoped>

</style>
