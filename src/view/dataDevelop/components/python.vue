<template>
    <div>
        <el-form ref="form" label-width="100px" :model="form">
            <el-form-item label="Python版本">
                <el-select v-model="version" placeholder="选择版本">
                    <el-option label="Python3" value="python3"></el-option>
                    <el-option label="Python2" value="python2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <Editor
                style="margin-top: -55px"
                language="python"
                :codes="value"
                @onMounted="onMounted"
                @onCodeChange="onCodeChange"/>
    </div>
</template>

<script>
    import Editor from './editor'

    export default {
        name: "python",
        props: ['jobInfo'],
        components: {
            Editor
        },

        data() {
            return {
                form: {},
                version: 'python3',
                value: '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n',
            }
        },
        mounted() {
            const data = JSON.parse(this.jobInfo.data)
            if (data) {
                this.version = data.version
                this.editor.setValue(data.value)
                this.value = data.value
            } else {
                this.version = 'python3'
                this.value = '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n'
            }
        },
        methods: {
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value, event) {
                this.value = value
            },
            saveEditor(){
                this.value = this.monacoEditor.getValue();
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
