<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="clickhouse">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "clickhouse",
        props: ['jobInfo'],

        data() {
            return {
                form: {
                    name: ''
                }
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
