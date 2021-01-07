<template>
    <div>
        <flow-panel></flow-panel>
    </div>
</template>
<script>
    import {
        createWorkflowProcess,
        updateWorkflowProcess
    } from "@/api/workflowProcess";  //  此处请自行替换地址
    import FlowPanel from '@/components/ef/panel'

    export default {
        name: "jobGraphCreate",
        components: {
            FlowPanel
        },
        data() {
            return {
                visible: false,
                lang: "zh",
                done:false,
                demoData: {
                    nodes: [],
                    edges: []
                },
                wkType:"create",
                users: [],
                authorities: [],
                processModel:{
                    id: '',
                    name: '',
                    category: '',
                    clazz: 'process',
                    dataObjs: [],
                    signalDefs: [],
                    messageDefs: [],
                },
                groups: [],
                categorys: []
            };
        },
        methods: {
            async save() {
                this.visible = false;
                const obj = this.$refs["wfd"].graph.save()
                const processModel = this.$refs["wfd"].processModel
                processModel.edges = obj.edges
                processModel.nodes = JSON.parse(JSON.stringify(obj.nodes))
                processModel.nodes.map(item=>{
                    if(item.assignValue){
                        item.assignValue = ","+String(item.assignValue)+","
                    }
                })
                if(!processModel.id){
                    this.$message({
                        type:"error",
                        message:"流程id必填，点击空白处填写流程基本信息"
                    })
                    return
                }
                if(this.$route.query.type == 'edit'){
                    const res = await updateWorkflowProcess(processModel)
                    if(res.code === 1000){
                        this.$message({
                            type:"success",
                            message:"编辑成功"
                        })
                    }
                }else{
                    const res = await createWorkflowProcess(processModel)
                    if(res.code === 1000){
                        this.$message({
                            type:"success",
                            message:"创建成功"
                        })
                    }
                }
            },
            saveXML() {
                console.log(this.$refs["wfd"].graph.saveXML());
            },
            saveImg() {
                console.log(this.$refs["wfd"].graph.saveImg());
            },
            fmtAuthority(authorityList,list){
                authorityList.map(item => {
                    list.push({
                        id: item.authorityId,
                        name: item.authorityName
                    });
                    if(item.children){
                        this.fmtAuthority(item.children,list)
                    }
                });
            }
        },
        async created() {

        }
    };
</script>
