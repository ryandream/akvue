var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import React from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
const schema = {
    "title": "A registration form",
    "type": "object",
    "required": [
        "firstName",
        "lastName"
    ],
    "properties": {
        "password": {
            "type": "string",
            "title": "Password"
        },
        "lastName": {
            "type": "string",
            "title": "Last name"
        },
        "bio": {
            "type": "string",
            "title": "Bio"
        },
        "firstName": {
            "type": "string",
            "title": "First name"
        },
        "age": {
            "type": "integer",
            "title": "Age"
        }
    }
};
const log = (type) => console.log.bind(console, type);
function getElementsByClass(oParent, target) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var reg = new RegExp('\\b' + target + '\\b', 'i');
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (reg.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
let ReactPage = class ReactPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "React";
    }
    loadPage() {
    }
};
ReactPage = __decorate([
    vue.com(`<div><Card><div class="act-react" style="padding:auto;margin:auto;"></div></Card></div>`, {
        mounted() {
            // alert("ddddd123");
            //renderTest(this.$el,{compiler:"tsc",framework:"react"});
            const _dom = getElementsByClass(this.$el, "act-react");
            render((React.createElement(Form, { schema: schema, onChange: log("changed"), onSubmit: log("submitted"), onError: log("errors") })), _dom[0]);
        }
    }),
    ioc.PlugIn({ RegName: "ReactPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
], ReactPage);
export { ReactPage };