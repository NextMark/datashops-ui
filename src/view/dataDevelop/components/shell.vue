<template>
    <div>
        <div id="container" class="monaco-editor" ref="editor" style="height: 400px"></div>
    </div>
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import { monacoEditorOption } from '@/utils/constants';
    import * as monaco from 'monaco-editor'


    export default {
        name: "shell",
        components: {
            MonacoEditor
        },
        props: ['jobInfo'],

        data() {
            return {
                editor: null,

                value: '#!/bin/bash\n',
                monacoEditorOption,
            }
        },
        mounted() {
            monacoEditorOption.language = "shell"
            this.initEditor()
            const data = JSON.parse(this.jobInfo.data)
            if (data) {
                this.value = data.value
                this.editor.setValue(data.value)
            }
        },
        methods: {
            initEditor() {
                this.editor = monaco.editor.create(document.getElementById('container'), monacoEditorOption)
            },
            onSubmit() {
                console.log('submit!');
            },
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(editor) {
                this.value = editor.getValue()
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
