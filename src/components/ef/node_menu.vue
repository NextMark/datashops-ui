<template>
    <div class="flow-menu" ref="tool">
        <div v-for="menu  in  menuList" :key="menu.id">
            <span class="ef-node-pmenu" @click="menu.open = !menu.open"><i :class="{'el-icon-caret-bottom': menu.open,'el-icon-caret-right': !menu.open}"></i>&nbsp;{{menu.name}}</span>
            <ul v-show="menu.open" class="ef-node-menu-ul">
                <draggable @end="end" @start="move" v-model="menu.children"
                           v-bind="draggableOptions">
                    <li v-for="subMenu in menu.children" class="ef-node-menu-li" :key="subMenu.id" :type="subMenu.type">
                        <i :class="subMenu.ico"></i> {{subMenu.name}}
                    </li>
                </draggable>
            </ul>
        </div>
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
                defaultOpeneds: ['1', '2', '3'],
                menuList: [
                    {
                        id: '1',
                        type: 'group',
                        name: 'SQL',
                        ico: 'el-icon-video-pause',
                        open: true,
                        children: [
                            {
                                id: '11',
                                type: 'end',
                                name: 'Hive SQL',
                                ico: 'el-icon-caret-right',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '12',
                                type: 'over',
                                name: 'MySQL',
                                ico: 'el-icon-shopping-cart-full',
                                // 自定义覆盖样式
                                style: {}
                            },
                            {
                                id: '13',
                                type: 'over',
                                name: 'ClickHouse',
                                ico: 'el-icon-edit',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
                    },
                    {
                        id: '2',
                        type: 'group',
                        name: 'Shell',
                        ico: 'el-icon-video-play',
                        open: true,
                        children: [
                            {
                                id: '21',
                                type: 'timer',
                                name: 'Shell',
                                ico: 'el-icon-time',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '22',
                                type: 'task',
                                name: 'Python',
                                ico: 'el-icon-odometer',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
                    },
                    {
                        id: '3',
                        type: 'group',
                        name: 'Flink',
                        ico: 'el-icon-video-play',
                        open: true,
                        children: [
                            {
                                id: '31',
                                type: 'timer',
                                name: 'Flink',
                                ico: 'el-icon-time',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '32',
                                type: 'task',
                                name: 'Spark',
                                ico: 'el-icon-odometer',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
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
                for (let i = 0; i < this.menuList.length; i++) {
                    let children = this.menuList[i].children;
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].type === type) {
                            return children[j]
                        }
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
