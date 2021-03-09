<template>
    <div>
        <MonacoEditor
                height="400"
                language="shell"
                theme="vs-dark"
                :code="sql"
                :editorOptions="monacoEditorOption"
                @mounted="onMounted"
                @codeChange="onCodeChange">
        </MonacoEditor>
    </div>
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import { monacoEditorOption } from '@/utils/constants';


    export default {
        name: "shell",
        components: {
            MonacoEditor
        },
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    type: [],
                    resource: '',
                    desc: ''
                },
                sql: '#!/bin/bash\n',
                monacoEditorOption,
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(editor) {
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
