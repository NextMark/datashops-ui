<template>
    <div>
        <el-form ref="form" label-width="100px">
            <el-form-item label="Python版本">
                <el-select v-model="version" placeholder="选择版本">
                    <el-option label="Python3" value="python3"></el-option>
                    <el-option label="Python2" value="python2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div id="container" class="monaco-editor" ref="editor" style="height: 400px"></div>

<!--        <MonacoEditor-->
<!--                height="400"-->
<!--                language="python"-->
<!--                theme="vs-dark"-->
<!--                :code="value"-->
<!--                :editorOptions="monacoEditorOption"-->
<!--                @mounted="onMounted"-->
<!--                @codeChange="onCodeChange">-->
<!--        </MonacoEditor>-->
    </div>
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import { monacoEditorOption } from '@/utils/constants';
    import * as monaco from 'monaco-editor'


    export default {
        name: "python",
        components: {
            MonacoEditor
        },
        props: ['jobInfo'],

        data() {
            return {
                version: 'python3',
                value: '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n',
                monacoEditorOption
            }
        },
        mounted() {
            monacoEditorOption.language = "python"

            this.initEditor();
            this.addAction();

            const data = JSON.parse(this.jobInfo.data)
            console.log(data)
            if (data) {
                this.version = data.version
                this.value = data.value
                this.monacoEditor.setValue(data.value)
            }
        },
        methods: {

            initEditor() {
                let that = this
                that.monacoEditor = monaco.editor.create(document.getElementById('container'), monacoEditorOption)
                that.monacoEditor.onDidChangeModelContent(function(event){//编辑器内容changge事件
                    that.value = that.monacoEditor.getValue();
                    that.$emit('onCodeChange',that.monacoEditor.getValue(),event);
                });
                //编辑器随窗口自适应
                window.addEventListener('resize',function(){
                    that.initEditor();
                })
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
            addAction() {
                // 格式化文档（右击菜单项 + 快捷键）
                // 保存（快捷键）
                this.save();
            },
            save() {
                let that = this

                this.monacoEditor.addCommand(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
                    () => {
                        console.log("save");
                        console.log(`总行数：${that.monacoEditor.getModel().getLineCount()}`);
                        console.log(`内容打印：${that.monacoEditor.getValue()}`);
                    }
                );
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
