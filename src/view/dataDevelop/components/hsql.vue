<template>
    <div>
        <div id="container" class="monaco-editor" ref="editor" style="height: 400px"></div>
    </div>
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import sqlFormatter from 'sql-formatter'
    import { mapGetters } from "vuex";
    import * as monaco from 'monaco-editor'

    import { monacoEditorOption } from '@/utils/constants';


    export default {
        name: "hsql",
        components: {
            MonacoEditor
        },

        data() {
            return {
                value: '-- Type your SQL! \n',
                monacoEditorOption,
                defaultSql: '-- Type your SQL! \n'
            }
        },
        props: ['jobInfo'],

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
        mounted() {
            monacoEditorOption.language = "sql"
            this.initEditor()
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
            initEditor() {
                this.editor = monaco.editor.create(document.getElementById('container'), monacoEditorOption)
            },
            formatSQL() {
                this.editor.setValue(sqlFormatter.format(this.editor.getValue()))
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(editor) {
                this.value = editor.getValue()
            },
            // async save() {
            //     if (this.jobInfo.maskId) {
            //         await saveHiveSql({maskId: this.jobInfo.maskId, sql: this.editor.getValue()})
            //         this.$message.success({
            //             message: '作业保存成功',
            //             center: true
            //         });
            //     } else {
            //         this.$message.error({
            //             message: '请设置作业基本信息',
            //             center: true
            //         });
            //         //this.$bus.emit("add-hsql-nav", this.name)
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>
