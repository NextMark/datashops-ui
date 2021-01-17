<template>
    <div class="flow-menu" ref="tool">
        <ul class="ef-node-menu-ul">
            <draggable @end="end" @start="move"
                       v-bind="draggableOptions">
                <li v-for="subMenu in jobTypes" class="ef-node-menu-li" :key="subMenu.id" :type="subMenu.type">
                    <svg class="iconfont" aria-hidden="true">
                        <use :xlink:href="'#' + subMenu.ico"></use>
                    </svg>
                </li>
            </draggable>
        </ul>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'

    var mousePosition = {
        left: -1,
        top: -1
    }

    export default {
        data() {
            return {
                activeNames: '1',
                draggableOptions: {
                    preventOnFilter: false,
                    sort: false,
                    disabled: false,
                    ghostClass: 'tt',
                    // 不使用H5原生的配置
                    forceFallback: true,
                    // 拖拽的时候样式
                    // fallbackClass: 'flow-node-draggable'
                },
                // 默认打开的左侧菜单的id
                jobTypes: [
                    {
                        id: '1',
                        type: 'hive',
                        name: 'Hive',
                        ico: 'el-icon-my-hive',
                    },
                    {
                        id: '2',
                        type: 'bash',
                        name: 'Bash',
                        ico: 'el-icon-my-bash',
                    },
                    {
                        id: '3',
                        type: 'spark',
                        name: 'Spark',
                        ico: 'el-icon-my-spark',
                    },
                    {
                        id: '4',
                        type: 'flink',
                        name: 'Flink',
                        ico: 'el-icon-my-flink',
                    },
                    {
                        id: '5',
                        type: 'fsql',
                        name: 'FSQL',
                        ico: 'el-icon-my-flink-sql',
                    },
                    {
                        id: '6',
                        type: 'mysql',
                        name: 'Mysql',
                        ico: 'el-icon-my-mysql',
                    },
                    {
                        id: '7',
                        type: 'click_house',
                        name: 'Click_House',
                        ico: 'el-icon-my-clickhouse',
                    }
                ],
                nodeMenu: {}
            }
        },
        components: {
            draggable
        },
        created() {
            /**
             * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
             * @param event
             */
            if (this.isFirefox()) {
                document.body.ondrop = function (event) {
                    // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
                    mousePosition.left = event.layerX
                    mousePosition.top = event.clientY - 50
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        },
        methods: {
            // 根据类型获取左侧菜单对象
            getMenuByType(type) {
                for (let i = 0; i < this.jobTypes.length; i++) {
                    let children = this.jobTypes[i];
                    if (children.type === type) {
                        return children
                    }
                }
            },
            // 拖拽开始时触发
            move(evt) {
                var type = evt.item.attributes.type.nodeValue
                this.nodeMenu = this.getMenuByType(type)
            },
            // 拖拽结束时触发
            end(evt) {
                this.nodeMenu.type = 1
                this.$emit('addNode', evt, this.nodeMenu, mousePosition)
            },
            // 是否是火狐浏览器
            isFirefox() {
                var userAgent = navigator.userAgent
                if (userAgent.indexOf("Firefox") > -1) {
                    return true
                }
                return false
            }
        }
    }
</script>
