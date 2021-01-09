let dataB = {
    name: '流程B',
    nodeList: [
        {
            id: "1",
            name: '节点A-不可拖拽',
            type: 'task',
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success',
            viewOnly: true
        },
        {
            id: '2',
            type: 'task',
            name: '流程B-节点B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error'
        },
        {
            id: '3',
            name: '流程B-节点C',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',
            state: 'warning'
        }, {
            id: '4',
            name: '流程B-节点D',
            type: 'task',
            left: '723px',
            top: '215px',
            ico: 'el-icon-present',
            state: 'running'
        }
    ],
    lineList: [{
        from: "1",
        to: '2',
        label: '条件A'
    }, {
        from: "1",
        to: '3',
        label: '条件B'
    }, {
        from: '2',
        to: '4'
    }, {
        from: '3',
        to: '4'
    }
    ]
}

export function getDataB () {
    return dataB
}
