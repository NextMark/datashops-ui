<template>
    <div>
        <div style="height: 40px" v-if="showThemeSelect">
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
        <div :id="editorId" ref="container" :style="'height:' + height"></div>
    </div>
</template>
<script>
    // import * as monaco from 'monaco-editor';
    export default {
        props:{
            readOnly: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            editorId: {
                type:String,
                default:function(){
                    return 'editor'
                }
            },
            showThemeSelect: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            height: {
                type:String,
                default:function(){
                    return '400px'
                }
            },
            code:{
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
                        fontSize: 14,
                        renderLineHighlight: 'none',
                        scrollBeyondLastLine: false,
                        disableLayerHinting: true,
                        overviewRulerBorder: true,
                        fixedOverflowWidgets: true,
                        scrollbar: {
                            verticalSliderSize: 12,
                            horizontalScrollbarSize: 12,
                            useShadows: true
                        },
                        selectOnLineNumbers: true,
                        autoIndent: true,
                        smoothScrolling: true,
                        snippetSuggestions: 'top',
                        automaticLayout: true,
                        autoClosingBrackets: true,
                        acceptSuggestionOnEnter: 'on',
                        colorDecorators: true,
                        cursorStyle: 'line',
                        useTabStops: false,
                        dragAndDrop: true,
                        formatOnPaste: true,
                        formatOnType: true,
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
                editor: null
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
                //self.$refs.container.innerHTML = '';
                self.editor = window.monaco.editor.create(document.getElementById(this.editorId), {
                    value:self.codesCopy || self.code,
                    language: self.language,
                    theme: self.theme,
                    readOnly: self.readOnly,
                    ...self.editorOptions
                });
                self.$emit('onMounted',self.editor);
                self.editor.onDidChangeModelContent(function(event){
                    self.codesCopy = self.editor.getValue();
                    self.$emit('onCodeChange',self.editor.getValue(),event);
                });
            },
            themeChange(){
                let self = this
                self.editor.updateOptions({theme: self.theme})
            }
        }
    }
</script>
<style scoped>
    /*#container1{*/
    /*    height:100%;*/
    /*    text-align: left;*/
    /*}*/
</style>
