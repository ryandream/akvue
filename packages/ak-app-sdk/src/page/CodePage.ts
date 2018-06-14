import { BasePage } from "ak-lib-web/src/basepage";
import Vue from "vue";
import { core, ioc, vue, util } from "ak-lib-sys/src";




@ioc.PlugIn({ BaseType: "IPage", RegName: "CodePage", Doc: "代码生成页面" })
@vue.com(`
  <Card>
     <row  slot="title"> 
     <RadioGroup v-model="vm.CodeType" size="large"  @on-change="vm.change()"  >
     <Radio label="com">
         <Icon type="social-apple"></Icon>
         <span>组件</span>
     </Radio>
     <Radio label="col">
         <Icon type="social-android"></Icon>
         <span>控件</span>
     </Radio>
     <Radio label="page">
         <Icon type="social-windows"></Icon>
         <span>页面</span>
     </Radio>
     <Radio label="reactpage">
     <Icon type="social-github"></Icon>
     <span>React页面</span>
 </Radio>
 </RadioGroup>
     <Input  v-model="vm.Name"  @on-change="vm.change()"   placeholder="Enter 名称..." ></Input>
     </row>
     <Card>
     <Input v-model="vm.Code" type="textarea" :rows="50" placeholder="Enter 代码..."></Input>
     </Card>
  </Card>
`)
export class CodePage extends BasePage {

    public Name: string = "";
    public Code: string = "";
    public CodeType: string = "";
    public Title: string = "代码生成";

    public MesgList = {
        List: [
            "code",
            "分成 分页，表格，按钮"
        ]
    }

    protected loadPage() {
        this.CodeType = this.P1 ? this.P1 : "com";
        this.Name = this.P2 ? this.P2 : "XXX";
        this.change();

    }

    change() {

        this.Code = codeDict[this.CodeType.toLocaleLowerCase()](this.Name);
    }


}



const _comFun = (XXX): string => {
    return `
  
    import { core ,ioc,vue } from "ak-lib-sys/src";
    import {BaseCom,IBaseComConfig} from "ak-lib-sys/src/com/BaseCom";

    export interface I${XXX}ComConfig extends IBaseComConfig{
   
    }

    @ioc.PlugIn({RegName:"${XXX}Col",BaseType:"BaseCom",CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}",Doc:"${XXX}组件插件"})

    @vue.com(\`<div>${XXX}Com</div>\`)
    export   class ${XXX}Com extends BaseCom {

      constructor (config?: I${XXX}ComConfig){
          super(config);
      }

    }
`;
}

const _colFun = (XXX): string => {
    return `
    import { core ,ioc,vue } from "ak-lib-sys/src";
    import {BaseCol,IBaseColConfig}  from "./BaseCol"
    
    export interface I${XXX}ColConfig extends IBaseColConfig{
       
    }
     
    @ioc.PlugIn({RegName:"${XXX}Col",BaseType:"BaseCol",Author:"zhengyukun",CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}",Doc:"${XXX}Col控件插件"})
    @vue.com(\`<div>${XXX}Col</div>\`)
    export   class ${XXX}Col extends BaseCol {
    
          constructor (config?: I${XXX}ColConfig){
              super(config);
          }
    
    }
`;
}


const _pageFun = (XXX): string => {
    return `  
   
    import { core, ioc, vue, util } from "ak-lib-sys/src";
    import { BasePage } from "ak-lib-web/src/basepage";

    @vue.com(\`<div>${XXX}Page</div>\`)
    @ioc.PlugIn({  RegName: "${XXX}Page", BaseType: "IPage", CreateDate:"${util.formatDate(new Date(), "yyyy-MM-dd")}", Doc: "${XXX}页面插件" })
    export class ${XXX}Page extends BasePage {
         
        public Title :string = "${XXX}";
        protected loadPage() {

        }

    }
`
}

const _reactPageFun = (XXX): string => {
    return `
   

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React, { Component } from "react";


export class ${XXX}PageReact extends BaseDomReact<${XXX}Page>{
    render() {
        return <div>
        ${XXX}React{new Date().toString()}
           
            </div>;
    }
}



@ioc.PlugIn({ RegName: "${XXX}Page", BaseType: "IPage", CreateDate: "2018-04-07", Doc: "${XXX}Page页面插件" })
export class ${XXX}Page extends BaseReactPage {

    public Title: string = "${XXX}Page";
    $ReactType: any = ${XXX}PageReact;
   
    protected loadPage() {

    }

}

   
   
   
   `
}

const codeDict = {
    com: _comFun,
    col: _colFun,
    page: _pageFun,
    reactpage: _reactPageFun
}