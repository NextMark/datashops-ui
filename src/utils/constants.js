export const monacoEditorOption = {
    selectOnLineNumbers: true,
    autoIndent: true,
    smoothScrolling: true,
    snippetSuggestions: 'top',
    automaticLayout: true,
    autoClosingBrackets: true,
    acceptSuggestionOnEnter: 'on',
    colorDecorators: true,
    dragAndDrop: true,
    formatOnPaste: true,
    formatOnType: true,
    fontSize: 14,
    mouseWheelZoom: true,
}

export const kafka2hdfsRules = {
    address: [
        {required: true, message: '请输入kafka地址', trigger: 'blur'},
        {min: 8, max: 200, message: '长度在 8 到 200 个字符', trigger: 'change'}
    ],
    topic: [
        {required: true, message: '请填写topic名称', trigger: 'change'}
    ],
    position: [
        {required: true, message: '请选择消费位置', trigger: 'change'}
    ],
    hdfsPath: [
        {required: true, message: '请填写hdfs路径', trigger: 'change'}
    ]
}

export const flinkRules = {
    version: [
        { required: true, message: '请填写version名称', trigger: 'change' }
    ],
    yarnAppName: [
        { required: true, message: '请填写ynm名称', trigger: 'change' }
    ],
    taskManagerNum: [
        { required: true, message: 'yn', trigger: 'change' }
    ],
    taskSlotNum: [
        { required: true, message: 'ys', trigger: 'change' }
    ],
    parallelism: [
        { required: true, message: 'p', trigger: 'change' }
    ],
    jobManagerMemory: [
        { required: true, message: 'yjm', trigger: 'change' }
    ],
    taskManagerMemory: [
        { required: true, message: 'ytm', trigger: 'change' }
    ],
    className: [
        { required: true, message: 'c', trigger: 'change' }
    ],
    yarnQueue: [
        { required: true, message: 'tq', trigger: 'change' }
    ]
}

export const sparkRules = {
    name: [
        { required: true, message: 'name', trigger: 'change' }
    ],
    driverMemory: [
        { required: true, message: 'driverMemory', trigger: 'change' }
    ],
    executorMemory: [
        { required: true, message: 'yn', trigger: 'change' }
    ],
    className: [
        { required: true, message: 'ys', trigger: 'change' }
    ],
    queue: [
        { required: true, message: 'p', trigger: 'change' }
    ],
    executorCore: [
        { required: true, message: 'yjm', trigger: 'change' }
    ]
}
