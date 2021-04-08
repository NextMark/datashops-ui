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
                :code="value"
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
                defaultValue: '',
                version: 'python3',
                value: '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n',
                editor: null
            }
        },
        mounted() {
            this.init(this.jobInfo)
        },
        watch:{
            jobInfo: {
                handler(val) {
                    this.init(val)
                }
            }
        },
        methods: {
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value) {
                this.value = value
            },
            saveEditor(){
                this.value = this.editor.getValue();
            },
            init(jobInfo) {
                this.defaultValue = '#！/usr/bin/env python\n# -*- coding:utf8 -*-\n'

                if (!jobInfo.data) {
                    this.value = this.defaultValue
                    this.editor.setValue(this.defaultValue)
                    return
                }
                const data = JSON.parse(jobInfo.data)
                if (data) {
                    this.value = data.value
                    this.version = data.version
                }

                if (this.value) {
                    this.editor.setValue(this.value)
                } else {
                    this.value = this.defaultValue
                    this.editor.setValue(this.defaultValue)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
