<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-body">
                <el-form :model="data" ref="dataForm" label-width="150px">
                    <el-divider content-position="left">基础属性</el-divider>
                    <el-form-item label="名称">
                        <el-col :span="8">
                            <el-input v-model="data.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-col :span="8">
                            <el-input type="textarea" v-model="data.description"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="创建人">
                        <span>{{data.owner}}</span>
                    </el-form-item>
                    <el-form-item label="资源组">
                        <el-select v-model="data.name" placeholder="请选择资源组">
                            <el-option label="队列一" value="queue1"></el-option>
                            <el-option label="队列二" value="queue2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider content-position="left">时间属性</el-divider>
                    <el-form-item label="重试">
                        <el-switch
                                v-model="data.retry"
                                active-color="#13ce66"
                                inactive-color="#BFBFBF"
                                :active-value=1
                                :inactive-value=0
                                @change='handleSchedulerStatus(scope.row)'>
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="重试次数">
                        <el-input-number v-model="data.retryTimes" @change="" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="重试间隔">
                        <el-input-number v-model="data.retryInterval" @change="" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="生效时间">
                        <el-col :span="6">
                            <el-date-picker type="date" placeholder="选择日期" v-model="data.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1" :offset="1">-</el-col>
                        <el-col :span="6">
                            <el-date-picker type="date" placeholder="选择日期" v-model="data.date2"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="调度周期">
                        <el-select v-model="data.schedulingPeriod" placeholder="请选择调度周期">
                            <el-option
                                    v-for="item in schedulingPeriod"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="每周">
                        <el-select v-model="data.schedulingPeriod" placeholder="请选择调度周期" >
                            <el-option
                                    v-for="item in week"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="每月">
                        <el-select v-model="data.schedulingPeriod" placeholder="请选择调度周期" >
                            <el-option
                                    v-for="item in date"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调度时间">
                        <el-time-picker
                                v-model="data.createTime"
                                :picker-options="{
                                    format: 'HH:mm'
                                }"
                                placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="cron表达式">
                        <span>{{data.cronExpression}}</span>
                    </el-form-item>
                    <el-form-item label="超时时间">
                        <el-col :span="4">
                            <el-input v-model="data.timeout">
                                <template slot="append">s</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-divider content-position="left">调度依赖</el-divider>
                    <el-form-item>
                        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="作业组" name="first">
                            </el-tab-pane>
                            <el-tab-pane label="作业" name="second"></el-tab-pane>
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        label="名称"
                                        prop="name">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="searchInfo.name"
                                                size="mini"
                                                placeholder="关键字搜索"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="责任人"
                                        prop="owner"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        label="偏移"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.offset ? 1 : 0"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="90">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                icon="el-icon-plus"
                                                @click="handleAdd(scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    :current-page="pageNum"
                                    :page-size="pageSize"
                                    :page-sizes="[10, 30, 50, 100]"
                                    :style="{ float: 'right', padding: '20px' }"
                                    :total="total"
                                    @current-change="handleCurrentChange"
                                    @size-change="handleSizeChange"
                                    layout="total, sizes, prev, pager, next, jumper"
                            ></el-pagination>
                        </el-tabs>
                    </el-form-item>

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
    import {
        getJobGraphList,
        getJobList,
        addJobToGraph
    } from "@/api/job";
    import infoList from "@/mixins/infoList";
    import { schedulingPeriod, week, date } from '@/utils/job';

    export default {
        mixins: [infoList],
        props: ['queryId'],
        data() {
            return {
                listApi: getJobGraphList,
                activeName: 'first',
                visible: true,
                data: {},
                schedulingPeriod,
                week,
                date
            }
        },
        methods: {
            async handleClick(tab, event) {
                if (tab.index === '1') {
                    this.listApi = getJobList
                    await this.getTableData()
                }
                if (tab.index === '0') {
                    this.listApi = getJobGraphList
                    await this.getTableData()
                }
            },
            async handleAdd(row) {
                let type = 1;
                if (this.activeName === 'first') {
                    type = 0;
                }
                await addJobToGraph({graphMaskId: this.queryId, jobMaskId: row.maskId, type: type})

            },
            graphInit(data, id) {
                this.type = 'graph'
                this.data = data
            },
            save() {

            }
        },
        async created() {
            await this.getTableData();
        }
    }
</script>

<style lang="scss">
    .el-drawer__body {
        overflow: auto;
    }

    .el-drawer__container ::-webkit-scrollbar{
        display: none;
    }
</style>
