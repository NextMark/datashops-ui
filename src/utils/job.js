
export const schedulingPeriod = [
    { name: '分钟', value: 4 },
    { name: '小时', value: 3 },
    { name: '天', value: 2 },
    { name: '周', value: 1 },
    { name: '月', value: 0 }
];

export function formatSchedulingPeriod(period) {
    if (period === 0) {
        return '月'
    }
    if (period === 1) {
        return '周'
    }
    if (period === 2) {
        return '天'
    }
    if (period === 3) {
        return '小时'
    }
    if (period === 4) {
        return '分钟'
    }
}

export const week = [
    { name: '星期一', value: '1' },
    { name: '星期二', value: '2' },
    { name: '星期三', value: '3' },
    { name: '星期四', value: '4' },
    { name: '星期五', value: '5' },
    { name: '星期六', value: '6' },
    { name: '星期日', value: '7' }
];

export const date = [
    { name: '1号', value: '1' },
    { name: '2号', value: '2' },
    { name: '3号', value: '3' },
    { name: '4号', value: '4' },
    { name: '5号', value: '5' },
    { name: '6号', value: '6' },
    { name: '7号', value: '7' },
    { name: '8号', value: '8' },
    { name: '9号', value: '9' },
    { name: '10号', value: '10' },
    { name: '11号', value: '11' },
    { name: '12号', value: '12' },
    { name: '13号', value: '13' },
    { name: '14号', value: '14' },
    { name: '15号', value: '15' },
    { name: '16号', value: '16' },
    { name: '17号', value: '17' },
    { name: '18号', value: '18' },
    { name: '19号', value: '19' },
    { name: '20号', value: '20' },
    { name: '21号', value: '21' },
    { name: '22号', value: '22' },
    { name: '23号', value: '23' },
    { name: '24号', value: '24' },
    { name: '25号', value: '25' },
    { name: '26号', value: '26' },
    { name: '27号', value: '27' },
    { name: '28号', value: '28' },
    { name: '29号', value: '29' },
    { name: '30号', value: '30' },
    { name: '31号', value: '31' }
];

export const hours = [
    { name: '0', value: '0' },
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
    { name: '7', value: '7' },
    { name: '8', value: '8' },
    { name: '9', value: '9' },
    { name: '10', value: '10' },
    { name: '11', value: '11' },
    { name: '12', value: '12' },
    { name: '13', value: '13' },
    { name: '14', value: '14' },
    { name: '15', value: '15' },
    { name: '16', value: '16' },
    { name: '17', value: '17' },
    { name: '18', value: '18' },
    { name: '19', value: '19' },
    { name: '20', value: '20' },
    { name: '21', value: '21' },
    { name: '22', value: '22' },
    { name: '23', value: '23' }
];

export function getJobName(code) {
    switch (code) {
        case 0:
            return 'hsql'
        case 1:
            return 'shell'
        case 2:
            return 'spark'
        case 3:
            return 'flink'
        case 4:
            return 'click_house'
        case 5:
            return 'fsql'
        case 6:
            return 'mysql'
        default:
            return ''
    }
}

export function getJobIcon(code) {
    switch (code) {
        case 0:
            return '#el-icon-my-hive'
        case 1:
            return '#el-icon-my-bash'
        case 2:
            return '#el-icon-my-spark'
        case 3:
            return '#el-icon-my-flink'
        case 4:
            return '#el-icon-my-clickhouse'
        case 5:
            return '#el-icon-my-flink-sql'
        case 6:
            return '#el-icon-my-mysql'
        case 7:
            return '#el-icon-my-kafka'
        case 8:
            return '#el-icon-my-kafka'
        case 9:
            return '#el-icon-my-sqoop-import'
        case 10:
            return '#el-icon-my-sqoop-import'
        case 11:
            return '#el-icon-my-python'
        default:
            return ''
    }
}

export const options = [
    {
        value: '5',
        label: '5'
    }, {
        value: '10',
        label: '10'
    }, {
        value: '15',
        label: '15'
    }, {
        value: '20',
        label: '20'
    }, {
        value: '30',
        label: '30'
    }
]

export const dataSourceType = [
    { name: 'Hive', value: 0 },
    { name: 'MySQL', value: 1 },
    { name: 'ClickHouse', value: 2 },
    { name: 'PostgreSQL', value: 3 }
];
