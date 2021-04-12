<template>
    <div class="big">
        <el-row>
            <div class="card">
                <el-col :xs="24" :lg="16" :md="16">
                    <div class="car-left">
                        <el-row>
                            <div>
                                <el-col :xs="4" :md="3" :lg="3">
                  <span class="card-img">
                    <img :src="userInfo.avatar" alt=""/>
                  </span>
                                </el-col>
                                <el-col :xs="20" :lg="12" :md="12">
                                    <div class="text">
                                        <h4>请开始您一天的工作吧！</h4>
                                        <p class="tips-text">
                                            <i class="el-icon-sunny el-icon"></i>
                                            <span>今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。</span>
                                        </p>
                                    </div>
                                </el-col>
                            </div>
                        </el-row>
                    </div>
                </el-col>
                <el-col :xs="24" :lg='8' :md="8">
                    <div class="car-right">
                        <el-row>
                            <el-col :span="6">
                                <div class="car-item">
                                    <span class="flow"><i class="el-icon-s-grid"></i></span>
                                    <span>今日执行任务 </span>
                                    <b>13260</b>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="car-item">
                                    <span class="user-number">
                                        <i class="el-icon-s-custom"></i>
                                    </span>
                                    <span>成功 </span>
                                    <b>8286</b>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="car-item">
                                    <span class="user-number">
                                        <i class="el-icon-position"></i>
                                    </span>
                                    <span>运行中 </span>
                                    <b>1022</b>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="car-item">
                                    <span class="feedback">
                                        <i class="el-icon-star-on"></i>
                                    </span>
                                    <span>失败 </span>
                                    <b>98</b>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </div>
        </el-row>
      <el-row>
        <el-col :span="12">
            <el-card shadow="hover" class="grid-content">
                <pie-chart :chart-data="pieData"></pie-chart>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="hover" class="grid-content">
                <line-chart :chart-data="lineData"></line-chart>
            </el-card>
        </el-col>
      </el-row>
        <el-row>
            <el-col :span="12">
                <el-card shadow="hover" class="grid-content">
                    <cluster-table></cluster-table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="grid-content">
                    <line-chart :chart-data="runningData" ></line-chart>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
        </el-row>
<!--        <div class="shadow">-->
<!--            <el-row :gutter="20">-->
<!--                <el-col-->
<!--                        :span="4"-->
<!--                        v-for="(card, key) in toolCards"-->
<!--                        :key="key"-->
<!--                        @click.native="toTarget(card.name)"-->
<!--                        :xs="8">-->
<!--                    <el-card shadow="hover" class="grid-content">-->
<!--                        <i :class="card.icon" :style="{ color: card.color }"></i>-->
<!--                        <p>{{ card.label }}</p>-->
<!--                    </el-card>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import LineChart from './component/LineChart'
    import BarChart from './component/BarChart'
    import PieChart from './component/PieChart'
    import ClusterTable from './component/ClusterTable'

    export default {
        name: "Dashboard",
        data() {
            return {
                toolCards: [
                    {
                        label: "用户管理",
                        icon: "el-icon el-icon-monitor",
                        name: "user",
                        color: "#ff9c6e",
                    },
                    {
                        label: "角色管理",
                        icon: "el-icon el-icon-setting",
                        name: "authority",
                        color: "#69c0ff",
                    },
                    {
                        label: "菜单管理",
                        icon: "el-icon el-icon-menu",
                        name: "menu",
                        color: "#b37feb",
                    },
                    {
                        label: "关于我们",
                        icon: "el-icon el-icon-user",
                        name: "about",
                        color: "#5cdbd3",
                    },
                ],
                lineData: {
                    title: {
                        text: '任务概况',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['昨天', '今天', '平均'],
                        top: 'bottom'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '13%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09','10', '11', '12', '13']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '昨天',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210,150, 232, 201, 154, 190, 330,220]
                        },
                        {
                            name: '今天',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '平均',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410,220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                },
                runningData: {
                    title: {
                        text: '运行中实例',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                            '06:00', '07:00', '08:00', '09:00']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [10, 20, 14, 18, 25, 17, 20,20,20,10],
                        type: 'line'
                    }]
                },
                pieData: {
                    title: {
                        text: '运行状态分布',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: '任务数',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: [
                                {value: 1048, name: '等待资源'},
                                {value: 735, name: '等待运行'},
                                {value: 580, name: '等待依赖'},
                                {value: 484, name: '运行中'},
                                {value: 300, name: '运行成功'}
                            ]
                        }
                    ]
                },
                clusterData: {
                    title: {
                        text: '集群状态',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c}'
                    },

                    series: [
                        {
                            name: 'master',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],
                            label: {
                                position: 'inner',
                                fontSize: 14
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1, name: 'master-100', selected: true},
                                {value: 1, name: 'master-101'},
                                {value: 1, name: 'master-102'}
                            ]
                        },
                        {
                            name: 'worker',
                            type: 'pie',
                            radius: ['45%', '60%'],
                            labelLine: {
                                length: 30,
                            },
                            label: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}}   ',
                                backgroundColor: '#F6F8FC',
                                borderColor: '#8C8D8E',
                                borderWidth: 1,
                                borderRadius: 4,

                                rich: {
                                    a: {
                                        color: '#6E7079',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#8C8D8E',
                                        width: '100%',
                                        borderWidth: 1,
                                        height: 0
                                    },
                                    b: {
                                        color: '#4C5058',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#fff',
                                        backgroundColor: '#4C5058',
                                        padding: [3, 4],
                                        borderRadius: 4
                                    }
                                }
                            },
                            data: [
                                {value: 1, name: 'node-100'},
                                {value: 1, name: 'node-101'},
                                {value: 1, name: 'node-102'},
                                {value: 1, name: 'node-103'},
                                {value: 1, name: 'node-104'},
                                {value: 1, name: 'node-105'},
                            ]
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters("user", ["userInfo"]),
        },
        components: {
            LineChart,
            BarChart,
            PieChart,
            ClusterTable
        },
        methods: {
            toTarget(name) {
                this.$router.push({name});
            },
        },
    };
</script>

<style lang="scss" scoped>
    .big {
        margin: 115px 15px 20px;
        padding-top: 0;
        background-color: rgb(243, 243, 243);
        padding-top: 15px;

        .top {
            width: 100%;
            height: 360px;
            margin-top: 20px;
            overflow: hidden;

            .chart-container {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #fff;
            }
        }

        .mid {
            width: 100%;
            height: 380px;

            .chart-wrapper {
                height: 340px;
                background: #fff;
                padding: 16px 16px 0;
                margin-bottom: 32px;
            }
        }

        .bottom {
            width: 100%;
            height: 300px;
            // margin: 20px 0;
            .el-row {
                margin-right: 4px !important;
            }

            .chart-player {
                width: 100%;
                height: 270px;
                padding: 10px;
                background-color: #fff;
            }
        }
        .el-table--border {
            margin-bottom: unset !important;
        }
    }
</style>
