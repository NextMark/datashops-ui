<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-body">
                <el-form :model="data" ref="dataForm" label-width="80px">
                    <el-divider content-position="left">基础属性</el-divider>
                    <el-form-item label="ID">
                        <el-input v-model="data.id"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="data.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="data.description"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-input v-model="data.groupId"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input v-model="data.owner" :disabled="true"></el-input>
                    </el-form-item>
                    <el-divider content-position="left">时间属性</el-divider>
                    <el-divider content-position="left">调度依赖</el-divider>
                    <el-divider content-position="left">资源属性</el-divider>
                    <el-form-item>
                        <el-button icon="el-icon-close">重置</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                visible: true,
                data: {}
            }
        },
        methods: {
            graphInit(data, id) {
                this.type = 'graph'
                this.data = data
            },
            save() {

            }
        }
    }
</script>
