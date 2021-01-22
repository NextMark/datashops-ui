<template>
    <div class="parent">
        <div class="left">
            <left-nav></left-nav>
        </div>
        <div class="right outerContainer">
            <div class="innerContent" v-show="showHome">
                <div style="text-align: center; padding-bottom: 20px">通过以下按钮创建作业</div>
                <div style="text-align: center">
                    <el-button icon="el-icon-plus">新建作业流</el-button>
                    <el-button icon="el-icon-plus">新建离线作业</el-button>
                </div>
            </div>
            <div class="innerContent" v-show="!showHome">
                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                    <el-tab-pane
                            v-for="(item, index) in editableTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name">
                        <hsql v-if="!showHome"></hsql>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>

    </div>
</template>

<script>
    import leftNav from "@/view/dataDevelop/components/leftNav";
    import hsql from "@/view/dataDevelop/components/hsql";

    export default {
        name: "dataDevelop",
        components: {
            leftNav,
            hsql
        },
        data() {
            return {
                editableTabsValue: '1',
                editableTabs: [{
                    title: 'hsql',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'shell',
                    name: '2',
                    content: 'Tab 2 content'
                }],
                tabIndex: 2,
                showHome: false
            }
        },
        methods: {
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
</script>

<style scoped>
    .parent {
        display: flex;
    }

    .left {
        width: 20%;
        flex: 1;
    }

    .right {
        width: 80%;
        flex: 6;
    }
</style>
