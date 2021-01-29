<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-body">
                <el-form :model="jobInfo" ref="dataForm" label-width="150px">
                    <el-divider content-position="left">基础属性</el-divider>
                    <el-form-item label="名称">
                        <el-col :span="8">
                            <el-input v-model="jobInfoCopy.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-col :span="8">
                            <el-input type="textarea" v-model="jobInfoCopy.description"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="创建人">
                        <span>{{jobInfoCopy.owner}}</span>
                    </el-form-item>
                    <el-form-item label="资源组">
                        <el-select v-model="jobInfoCopy.queueId" placeholder="请选择资源组">
                            <el-option label="默认队列" value="1"></el-option>
                            <el-option label="队列二" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider content-position="left">时间属性</el-divider>
                    <el-form-item label="调度状态">
                        <el-switch
                                v-model="jobInfoCopy.schedulerStatus"
                                active-color="#13ce66"
                                inactive-color="#BFBFBF"
                                :active-value=1
                                :inactive-value=0
                                @change='handleSchedulerStatus'>
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="重试次数">
                        <el-input-number v-model="jobInfoCopy.retryTimes" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="重试间隔">
                        <el-input-number v-model="jobInfoCopy.retryInterval" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="生效时间">
                        <el-date-picker
                                v-model="validRange"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="调度周期">
                        <el-select v-model="jobInfoCopy.schedulingPeriod" placeholder="请选择调度周期" style="width:25%">
                            <el-option
                                    v-for="item in schedulingPeriod"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="每周" v-if="jobInfoCopy.schedulingPeriod === 1">
                        <el-select v-model="timeConfig.weeks" multiple style="width:25%">
                            <el-option
                                    v-for="item in week"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="每月" v-if="jobInfoCopy.schedulingPeriod === 0">
                        <el-select v-model="timeConfig.days" multiple style="width:25%">
                            <el-option
                                    v-for="item in date"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="jobInfoCopy.schedulingPeriod === 3">
                        <div>
                            <el-radio v-model="timeConfig.type" label="1" >
                                开始时间
                                <el-time-picker
                                        v-model="timeConfig.hourBegin"
                                        :picker-options="{
                                    format: 'HH:mm'
                                }"
                                        style="width:25%"
                                        value-format="HH:mm"
                                        format="HH:mm"
                                        placeholder="选择时间">
                                </el-time-picker>
                                时间间隔
                                <el-input v-model="timeConfig.hourPeriod" style="width: 20%"></el-input>
                                结束时间
                                <el-time-picker
                                        v-model="timeConfig.hourEnd"
                                        :picker-options="{
                                    format: 'HH'
                                }"
                                        style="width:25%"
                                        value-format="HH"
                                        format="HH"
                                        placeholder="选择时间">
                                </el-time-picker>
                            </el-radio>
                        </div>
                        <div>
                            <el-radio v-model="timeConfig.type" label="2" >
                                指定时间
                                <el-select v-model="timeConfig.hours" multiple style="width:100%">
                                    <el-option
                                            v-for="item in hours"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-radio>
                        </div>
                    </el-form-item>


                    <el-form-item label="调度时间"
                                  v-if="jobInfoCopy.schedulingPeriod !== 3 && jobInfoCopy.schedulingPeriod !== 4">
                        <el-time-picker
                                v-model="hourMinute"
                                :picker-options="{
                                    format: 'HH:mm'
                                }"
                                style="width:25%"
                                value-format="HH:mm"
                                format="HH:mm"
                                placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="开始时间" v-if="jobInfoCopy.schedulingPeriod === 4">
                        <el-time-picker
                                v-model="timeConfig.minuteBegin"
                                :picker-options="{
                                    format: 'HH'
                                }"
                                style="width:25%"
                                value-format="HH"
                                format="HH"
                                placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="间隔" v-if="jobInfoCopy.schedulingPeriod === 4">
                        <el-select
                                v-model="timeConfig.period"
                                filterable
                                allow-create
                                default-first-option
                                placeholder="选择间隔时间">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结束时间" v-if="jobInfoCopy.schedulingPeriod === 4">
                        <el-time-picker
                                v-model="timeConfig.minuteEnd"
                                :picker-options="{
                                    format: 'HH'
                                }"
                                style="width:25%"
                                value-format="HH"
                                format="HH"
                                placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="cron表达式">
                        <span>{{jobInfoCopy.cronExpression}}</span>
                    </el-form-item>
                    <el-form-item label="超时时间">
                        <el-col :span="4">
                            <el-input v-model="jobInfoCopy.timeout">
                                <template slot="append">s</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-divider content-position="left">调度依赖</el-divider>
                    <el-form-item>
                        <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-plus"
                                @click="handleAddDependency">添加依赖</el-button>
                    </el-form-item>
                    <el-form-item label="依赖上游任务">
                        <el-table
                                :data="dependency"
                                style="width: 100%">
                            <el-table-column
                                    label="名称"
                                    prop="name">
                                <template slot="header">
                                    <el-input
                                            v-model="searchInfo.name"
                                            size="mini"
                                            placeholder="关键字搜索"/>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="类型"
                                    width="70">
                                <template slot-scope="scope">
                                    <svg class="icon-1-5" aria-hidden="true">
                                        <use :xlink:href="scope.row.type |getJobIcon"></use>
                                    </svg>
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
                                    <el-input v-model="scope.row.offset"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="80">
                                <template slot-scope="scope">
                                    <el-button
                                            type="text"
                                            size="mini">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
<!--                        <el-pagination-->
<!--                                :current-page="pageNum"-->
<!--                                :page-size="pageSize"-->
<!--                                :page-sizes="[10, 30, 50, 100]"-->
<!--                                :style="{ float: 'right', padding: '20px' }"-->
<!--                                :total="total"-->
<!--                                @current-change="handleCurrentChange"-->
<!--                                @size-change="handleSizeChange"-->
<!--                                layout="total, sizes, prev, pager, next, jumper"-->
<!--                        ></el-pagination>-->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-check" @click="modifyJob">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-drawer
                title="添加依赖"
                width="70%"
                :append-to-body="true"
                :visible.sync="addDependencyDialog"
                center>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="名称"
                        prop="name">
                    <template slot="header">
                        <el-input
                                v-model="searchInfo.name"
                                size="mini"
                                placeholder="关键字搜索"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="类型"
                        width="70">
                    <template slot-scope="scope">
                        <svg class="icon-1-5" aria-hidden="true">
                            <use :xlink:href="scope.row.type |getJobIcon"></use>
                        </svg>
                    </template>
                </el-table-column>
                <el-table-column
                        label="责任人"
                        prop="owner"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="偏移"
                        width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.offset"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="80">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="text"
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
        </el-drawer>
    </div>

</template>

<script>
    import {
        getJobList,
        modifySchedulerStatus,
        modifyJob,
        getJobDependency,
        addDependency
    } from "@/api/job";
    import infoList from "@/mixins/infoList";
    import { schedulingPeriod, week, date, options, hours, getJobName, getJobIcon } from '@/utils/job';
    var moment = require('moment');

    export default {
        mixins: [infoList],
        props: ['jobInfo'],
        filters: {
            getJobName,
            getJobIcon
        },
        data() {
            return {
                listApi: getJobList,
                activeName: 'first',
                visible: true,
                schedulingPeriod,
                week,
                date,
                timeConfig: {
                    hour: '',
                    minute: '',
                    days: '',
                    weeks: '',

                    // minute
                    minuteBegin: '',
                    period: '5',
                    minuteEnd: '',

                    // hour
                    type: '1',
                    hours: '',
                    hourBegin: '',
                    hourPeriod: '1',
                    hourMinute: '',
                    hourEnd: ''
                },
                hours,
                hourMinute: moment().subtract(0, 'days').format('HH:mm'),
                options,
                validRange: [],
                jobInfoCopy: {},
                addDependencyDialog: false,
                dependency: []
            }
        },
        methods: {
            handleAddDependency() {
                this.addDependencyDialog = true
                this.getTableData()
            },
            async handleAdd(row) {
                await addDependency({
                    sourceMaskId: row.maskId,
                    targetMaskId: this.jobInfo.maskId,
                    offset: row.offset
                })
                this.dependency.push({
                    name: row.name,
                    owner: row.owner,
                    offset: row.offset,
                    sourceMaskId: row.maskId,
                    type: row.type
                })
                this.$message({
                    type: "success",
                    message: "依赖添加成功"
                });
                this.addDependencyDialog = false
            },
            graphInit(data, id) {
                this.type = 'graph';
                this.data = data
            },
            async handleSchedulerStatus() {
                const res = await modifySchedulerStatus({maskId: this.jobInfoCopy.maskId, status: this.jobInfoCopy.schedulerStatus});
                if (res.code === 1000) {
                    this.$message({
                        type: "success",
                        message: "调度修改成功"
                    });
                }
            },
            async modifyJob() {
                const that = this
                let jobDto = that.jobInfoCopy
                let timeConfigDto = that.timeConfig

                let timeParams = {}
                // if (that.hourMinute) {
                //     const timeArrs = that.hourMinute.split(":")
                //     timeConfigDto.hour = timeArrs[0]
                //     timeConfigDto.minute = timeArrs[1]
                // }
                console.log(timeConfigDto)
                if (jobDto.schedulingPeriod === 0) {
                    const timeArrs = that.hourMinute.split(":")
                    timeParams.hour = timeArrs[0]
                    timeParams.minute = timeArrs[1]
                    timeParams.days = timeConfigDto.days.join()
                }
                if (jobDto.schedulingPeriod === 1) {
                    const timeArrs = that.hourMinute.split(":")
                    timeParams.hour = timeArrs[0]
                    timeParams.minute = timeArrs[1]
                    timeParams.weeks = timeConfigDto.weeks.join()
                }
                if (jobDto.schedulingPeriod === 2) {
                    const timeArrs = that.hourMinute.split(":")
                    timeParams.hour = timeArrs[0]
                    timeParams.minute = timeArrs[1]
                }
                if (jobDto.schedulingPeriod === 3) {
                    timeParams.type = timeConfigDto.type
                    timeParams.hours = timeConfigDto.hours.join()
                    timeParams.hourBegin = timeConfigDto.hourBegin
                    timeParams.hourMinute = timeConfigDto.hourMinute
                    timeParams.hourPeriod = timeConfigDto.hourPeriod
                    timeParams.hourEnd = timeConfigDto.hourEnd
                }
                if (jobDto.schedulingPeriod === 4) {
                    timeParams.minuteBegin = timeConfigDto.minuteBegin
                    timeParams.minuteEnd = timeConfigDto.minuteEnd
                    timeParams.period = timeConfigDto.period
                }

                jobDto.timeConfig = JSON.stringify(timeParams)
                jobDto.validStartDate = that.validRange[0]
                jobDto.validEndDate = that.validRange[1]
                const res = await modifyJob(jobDto);
                if (res.code === 1000) {
                    that.formatJob(res.data)
                    that.$message({
                        type: "success",
                        message: "作业修改成功",
                        center: true
                    });
                }
            },
            formatJob(jobInfo) {
                this.jobInfoCopy = jobInfo
                if (this.jobInfoCopy.validStartDate) {
                    this.validRange = [
                        this.jobInfoCopy.validStartDate,
                        this.jobInfoCopy.validEndDate
                    ]
                } else {
                    this.validRange = [
                        moment().subtract(0, 'days').format('YYYY-MM-DD'),
                        '9999-12-31'
                    ]
                }
                let timeConfig = JSON.parse(this.jobInfoCopy.timeConfig)

                if (timeConfig.weeks) {
                    this.timeConfig.weeks = timeConfig.weeks.split(',')
                }
                if (timeConfig.days) {
                    this.timeConfig.days = timeConfig.days.split(',')
                    console.log(this.timeConfig.days)
                }
                if (timeConfig.minuteBegin) {
                    this.timeConfig.minuteBegin = timeConfig.minuteBegin
                    this.timeConfig.period = timeConfig.period
                    this.timeConfig.minuteEnd = timeConfig.minuteEnd
                }
                if (this.jobInfoCopy.schedulingPeriod === 3) {
                    this.timeConfig.type = timeConfig.type
                    this.timeConfig.hours = timeConfig.hours.split(',')
                    this.timeConfig.hourBegin = timeConfig.hourBegin
                    this.timeConfig.hourPeriod = timeConfig.hourPeriod
                    this.timeConfig.hourMinute = timeConfig.hourMinute
                    this.timeConfig.hourEnd = timeConfig.hourEnd
                }
            }
        },
        async created() {
            this.formatJob(this.jobInfo)
            const res = await getJobDependency({maskId: this.jobInfo.maskId})
            this.dependency = res.data
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
