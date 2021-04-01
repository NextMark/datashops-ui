<template>
    <div>
        <Editor
                style="margin-top: -30px"
                language="sql"
                :code="value"
                @onMounted="onMounted"
                @onCodeChange="onCodeChange"/>
    </div>
</template>

<script>
    import Editor from './editor'
    import sqlFormatter from 'sql-formatter'
    import { mapGetters } from "vuex";

    export default {
        name: "clickhouse",
        props: ['jobInfo'],
        components: {
            Editor
        },
        watch:{
            jobInfo: {
                handler(val) {
                    this.value = JSON.parse(val.data).value;
                    console.log('this.sql')
                    if (this.editor) {
                        if (this.value) {
                            this.editor.setValue(this.value)
                        } else {
                            this.editor.setValue(this.defaultSql)
                        }
                    }
                }
            }
        },
        computed: {
            ...mapGetters("user", ["userInfo"])
        },
        data() {
            return {
                value: '-- Type your SQL! \n',
                defaultSql: '-- Type your SQL! \n'
            }
        },
        mounted() {
            const data = JSON.parse(this.jobInfo.data)
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
        },
        methods: {
            formatSQL() {
                this.editor.setValue(sqlFormatter.format(this.editor.getValue()))
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value, event) {
                this.value = value
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
