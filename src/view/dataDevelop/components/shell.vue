<template>
    <div>
        <Editor
                style="margin-top: -30px"
                language="shell"
                :codes="value"
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

        data() {
            return {
                value: '#!/bin/bash\n',
            }
        },
        mounted() {
            const data = JSON.parse(this.jobInfo.data)
            if (data) {
                this.value = data.value
                this.editor.setValue(data.value)
            }
        },
        methods: {
            onMounted(editor) {
                this.editor = editor;
            },
            onCodeChange(value, event) {
                this.value = value
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
</style>
