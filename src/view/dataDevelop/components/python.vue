<template>
    <div>
        <el-button type="text" icon="el-icon-document-checked" style="font-size:20px"></el-button>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="Python版本">
                <el-select v-model="form.pythonVersion" placeholder="选择版本">
                    <el-option label="Python3" value="python3"></el-option>
                    <el-option label="Python2" value="python2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <MonacoEditor
                height="400"
                language="python"
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
        name: "python",
        components: {
            MonacoEditor
        },
        data() {
            return {
                form: {
                    name: '',
                    pythonVersion: 'python3',
                    type: [],
                    resource: '',
                    desc: ''
                },
                sql: '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n',
                monacoEditorOption
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
