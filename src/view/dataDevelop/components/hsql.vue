<template>
    <div>
        <el-row>
            <el-button type="text" icon="el-icon-document-checked" style="font-size:20px" @click="save"></el-button>
            <el-button type="text" icon="el-icon-video-play" style="font-size:20px"></el-button>
            <el-button type="text" icon="el-icon-video-pause" style="font-size:20px"></el-button>
            <el-button type="text" icon="el-icon-set-up" style="font-size:20px"></el-button>
        </el-row>
        <MonacoEditor
                height="400"
                language="sql"
                theme="vs-dark"
                :code="code"
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

    export default {
        name: "hsql",
        components: {
            MonacoEditor
        },
        data() {
            return {
                code: '-- Type your SQL! \n',
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
            this.code += '-- Author: ' + this.userInfo.name + '\n'
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
            save(name) {
                this.$bus.emit("save-hsql-job", this.name)
            }
        }
    }
</script>

<style scoped>

</style>
