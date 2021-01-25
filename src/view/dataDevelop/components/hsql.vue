<template>
    <div>
        <el-row>
            <el-tooltip class="item" effect="dark" content="保存作业" placement="top-start">
                <el-button type="text" icon="el-icon-document-checked" style="font-size:20px" @click="save"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="执行" placement="top-start">
                <el-button type="text" icon="el-icon-video-play" style="font-size:20px"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="停止" placement="top-start">
                <el-button type="text" icon="el-icon-video-pause" style="font-size:20px"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="格式化" placement="top-start">
                <el-button type="text" icon="el-icon-set-up" style="font-size:20px" @click="formatSQL"></el-button>
            </el-tooltip>
        </el-row>
        <MonacoEditor
                height="400"
                language="sql"
                theme="vs-dark"
                :code="sql"
                :editorOptions="options"
                @mounted="onMounted"
                @codeChange="onCodeChange">
        </MonacoEditor>

    </div>
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import sqlFormatter from 'sql-formatter'
    import { mapGetters } from "vuex";
    import {
        saveHiveSql
    } from "@/api/job";

    export default {
        name: "hsql",
        components: {
            MonacoEditor
        },
        props: ['jobInfo'],
        data() {
            return {
                sql: '-- Type your SQL! \n',
                options: {
                    selectOnLineNumbers: true,
                    autoIndent: true,
                    smoothScrolling: true,
                    snippetSuggestions: 'top',
                    automaticLayout: true,
                    autoClosingBrackets: true,
                    acceptSuggestionOnEnter: 'on',
                    colorDecorators: true,
                    dragAndDrop: true,
                    formatOnPaste: true,
                    formatOnType: true,
                    fontSize: 20,
                    mouseWheelZoom: true
                },
                name: 'test'
            }
        },
        computed: {
            ...mapGetters("user", ["userInfo"])
        },
        created() {
            this.sql += '-- Author: ' + this.userInfo.name + '\n'
        },
        methods: {
            formatSQL() {
                this.editor.setValue(sqlFormatter.format(this.editor.getValue()))
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(editor) {
            },
            async save(name) {
                console.log(this.jobInfo)
                if (this.jobInfo.maskId) {
                    await saveHiveSql({maskId: this.jobInfo.maskId, sql: this.editor.getValue()})
                    this.$message.success({
                        message: '作业保存成功',
                        center: true
                    });
                } else {
                    this.$message.error({
                        message: '请设置作业基本信息',
                        center: true
                    });
                    //this.$bus.emit("add-hsql-nav", this.name)
                }
            }
        }
    }
</script>

<style scoped>

</style>
