<template>
    <div>
        <div style="height: 40px">
            <span class="theme" style="float:right">
                <el-select v-model="theme" size="mini" @change="themeChange" placeholder="请选择主题">
                    <el-option
                            v-for="item in themeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </span>
        </div>
        <div ref="container" style="height:400px"></div>
    </div>
</template>
<script>
    import * as monaco from 'monaco-editor';
    export default {
        props:{
            codes:{
                type:String,
                default:function(){
                    return ''
                }
            },
            language:{
                type:String,
                default:function(){
                    return 'sql'
                }
            },
            editorOptions:{
                type:Object,
                default:function(){
                    return {
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
                        mouseWheelZoom: true
                    }
                }
            }
        },
        data(){
            return{
                themeOption:[
                    {
                        value:'vs',
                        label:'默认'
                    },
                    {
                        value:'hc-black',
                        label:'高亮'
                    },
                    {
                        value:'vs-dark',
                        label:'深色'
                    },
                ],
                theme:'vs-dark',
                codesCopy:null,
            }
        },
        mounted(){
            this.initEditor();
        },
        beforeDestroy() {
            this.editor && this.editor.dispose();
        },
        methods:{
            initEditor(){
                let self = this;
                self.$refs.container.innerHTML = '';
                self.monacoEditor = monaco.editor.create(self.$refs.container, {
                    value:self.codesCopy || self.codes,
                    language: self.language,
                    theme: self.theme,
                    ...self.editorOptions
                });
                self.$emit('onMounted',self.monacoEditor);//编辑器创建完成回调
                self.monacoEditor.onDidChangeModelContent(function(event){//编辑器内容changge事件
                    self.codesCopy = self.monacoEditor.getValue();
                    self.$emit('onCodeChange',self.monacoEditor.getValue(),event);
                });
            },
            themeChange(){
                this.initEditor();
            }
        }
    }
</script>
<style scoped>
    #container{
        height:100%;
        text-align: left;
    }
</style>
