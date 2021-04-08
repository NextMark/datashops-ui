<template>
    <div>
        <el-form ref="form" :model="form"></el-form>

        <Editor
                style="margin-top: -30px"
                language="shell"
                :code="value"
                @onMounted="onMounted"
                @onCodeChange="onCodeChange"/>
    </div>
</template>

<script>
    import Editor from './editor'


    export default {
        name: "shell",
        components: {
            Editor
        },
        props: ['jobInfo'],
        watch:{
            jobInfo: {
                handler(val) {
                    this.init(val)
                }
            }
        },
        data() {
            return {
                form: {},
                value: '#!/bin/bash\n',
            }
        },
        mounted() {
            this.init(this.jobInfo)
        },
        methods: {
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value) {
                this.value = value
            },
            init(jobInfo) {
                const data = JSON.parse(jobInfo.data)
                if (data) {
                    this.value = data.value
                    this.editor.setValue(data.value)
                } else {
                    this.value = '#!/bin/bash\n'
                    this.editor.setValue(this.value)
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
