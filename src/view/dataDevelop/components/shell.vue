<template>
    <div>
        <el-row>
            <el-tooltip class="item" effect="dark" content="保存作业" placement="top-start">
                <el-button type="text" style="font-size:15px" @click="save">
                    <svg class="icon-1-5" aria-hidden="true">
                        <use xlink:href="#el-icon-my-baocun"></use>
                    </svg>
                </el-button>
            </el-tooltip>
        </el-row>
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
