import Vue from 'vue';
import request from './request';

var init = function () {
    console.log("window:" + window);
    console.log("HsUtil init");


    //常量定义
    //////////////////////////////////////////////////////////////////////////////////////////////////
    window.HS = {
        __RUNTIME__: 'debug',
        __LOGO__: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=963415507,2525511719&fm=26&gp=0.jpg",     //控制台展示logo

        //用于定义表单元素类型的字符串常量
        __CMP__Hide: 'hide',           // 不展示，用于存储数据
        __CMP__TextBox: 'textbox',     //普通文本框类型
        __CMP__DateTime: 'datetime',   //日期时间类型 年-月-日 时:分:秒
        __CMP__Date: 'date',           //日期时间类型 年-月-日
        __CMP__Select: 'select',       //下拉框类型
        __CMP_Upload: 'file',
        __CMP_Editor: 'editor',         //wang文本编辑器
        __CMP_UEditor: 'ueditor',       //ueditor文本编辑器

        //用于定义表单元素类型的字符串常量:简化写法
        cmp_Hide: 'hide',                        // 不展示，用于存储数据
        cmp_TextBox: 'textbox',                  //普通文本框类型
        cmp_DateTime: 'datetime',                //日期时间类型 年-月-日 时:分:秒
        cmp_Date: 'date',                        //日期时间类型 年-月-日
        cmp_Date_Time_Range: 'datetimerange',         // 日期时间带范围类型 年-月-日 时:分:秒
        cmp_Date_Day_Range: 'dateDayRange',         // 日期带范围 年-月-日
        cmp_Date_Range: 'dateRange',            // 日期带范围类型 年-月-日
        cmp_Time_Range: 'timeRange',            // 时间带范围类型 时分秒
        cmp_Select: 'select',                    //下拉框类型
        cmp_TextOnly: 'textOnly',               //只显示文字 不做value传值
        cmp_Upload: 'file',
        cmp_Editor: 'editor',                      //wang文本编辑器
        cmp_UEditor: 'ueditor',                    //ueditor文本编辑器
        cmp_CheckboxGroup: 'checkboxgroup',       //checkboxgrop

        //用于定义表单元素校验规则的字符串常量
        __VALIDATE__NOTEMPTY: 'notempty',           //非空判定
        __VALIDATE__PHONENUMBER: 'phonenumber',     //电话号码类型
        __VALIDATE__EMAIL: 'email',                 //邮件类型
        __VALIDATE_NOT_BEFORE_TODAY: 'not_before_today', // 不得早于今天

        //用于定义表单元素校验规则的字符串常量:简化写法
        validate_NOTEMPTY: 'notempty',           //非空判定
        validate_PHONENUMBER: 'phonenumber',     //电话号码类型
        validate_EMAIL: 'email',                 //邮件类型
        validate_NOT_BEFORE_TODAY: 'not_before_today', // 不得早于今天
    }
    // HSUtil 工具类
    //////////////////////////////////////////////////////////////////////////////////////////////////

    var HSUtil = {
        id: 1
    };

    HSUtil.generateId = function () {
        return '_uuid_' + new Date().getTime() + '_' + (++this.id);
    }

    HSUtil.getDefVue = () => {
        if (HSUtil.defVue == null || HSUtil.defVue == undefined) {
            HSUtil.defVue = new Vue();
        }
        return HSUtil.defVue;
    }

    HSUtil.hs_console_error = function (msg) {
        console.group("代码错误提示 发生时间：" + HSDate.formatDate2Str(new Date(), HSDate.__SIMPLEDATETIME));
        console.error(msg);
        console.groupEnd();
    }

    //普通的打印信息 一般用于开发时候打印某个变量之类的
    HSUtil.hsConsoleInfo = function (msg) {
        if (HS.__RUNTIME__ == 'debug') {
            // console.log("%c"+msg,"color:green;");
        }
    }

    //警告的打印信息 一般用于开发时候提醒某个编程的错误 比如某某参数格式不正确
    HSUtil.hsConsoleError = function (msg) {
        console.log("%c" + "!!!" + msg, "color:red;");
    }

    HSUtil.hsConfirm = function (ensureCallBack, options) {
        options = options || {};
        let title = options.title || '提示';
        let message = options.message || '您确定继续当前的操作吗？';
        ensureCallBack = ensureCallBack || function () {
        };
        let confirmButtonText = options.confirmButtonText || '确定';
        let cancelButtonText = options.cancelButtonText || '取消';
        let type = options.type || 'warning';
        HSUtil.getDefVue().$confirm(message, title, {
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            type: type
        }).then(() => {
            //确定后调用回调按钮
            ensureCallBack();
        }).catch(() => {
            //取消
        });
    }

    HSUtil.hs_msg_error = function (msg) {
        HSUtil.getDefVue().$message({
            type: "error",
            message: msg
        })
    }
    HSUtil.hs_msg_success = function (msg) {
        HSUtil.getDefVue().$message({
            type: "success",
            message: msg
        })
    }


    HSUtil.getUrlParam = function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }

    HSUtil.getCurrentDateDay = function () {
        let date = new Date();
        let month = date.getMonth() + 1;
        let dateStr = date.getFullYear() + "-" + month + "-" + date.getDate();
        return Date.parse(dateStr);
    }

    HSUtil.hs_show_oading = function (vueThis, target) {
        return vueThis.$loading({
            lock: true,
            text: 'Loading',
            fullscreen: false,
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255,1)',
            target: document.querySelector(target)
        });
    }

    HSUtil.randomUUID = function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    //判断空值
    HSUtil.isEmpty = function (obj) {
        if (obj === null || obj === undefined || obj === '') {
            return true;
        } else {
            //数组判空判断
            if (obj instanceof Array) {
                if (obj.length == 0) {
                    return true;
                } else {
                    return false;
                }
            }
            //值是boolean判空: string , number , function 可以使用typeof
            else if ((typeof obj) === 'boolean') {
                return false;
            } else {
                return false;
            }
        }
    }
    window.HSUtil = HSUtil;

    var HSRequest = {};
    HSRequest.url = function (url) {
        return url;
    }
    // 请求响应成功后 通过添加处理程序进行自定义处理 比如权限验证 以及登录超时的跳转
    // window.HSRequest.onSuccessHandler=function(res){return "continue";return "break";}
    HSRequest.execute = (url, data, successCallBack, options) => {

        options = options || {};
        options.showLoading = options.showLoading == null ? true : options.showLoading;
        options.showMessage = options.showMessage == null ? true : options.showMessage;
        options.errorCallback = options.errorCallback == null ? true : options.errorCallback;
        options.url = options.url || null;

        if (HSUtil.isEmpty(url)) {
            HSUtil.hs_console_error("HSRequest[execute]" + "url请求地址不可以为空");
            return;
        }
        request({
            showLoading: options.showLoading,
            url: url,
            method: 'post',
            data: data,
        }).then(res => {
            if (res instanceof Object) {
                HSRequest.onSuccessHandler = HSRequest.onSuccessHandler || function () {
                    return "continue";
                }
                if (HSRequest.onSuccessHandler(res) == "break") {
                    return;
                }
            }
            successCallBack(res);
        })
    }
    window.HSRequest = HSRequest;


    //***********日期时间格式化工具类 使用方式 https://www.npmjs.com/package/date-and-time**********
    const date = require('date-and-time');
    window.HSDate = {
        __SIMPLEDATETIME: "YYYY-MM-DD HH:mm:ss",
        __ONLYDATE: "YYYY-MM-DD"
    };
    window.HSDate.formatDate2Str = (dateObj, format) => {
        return date.format(dateObj, format);
    }
    window.HSDate.parseStr2Date = (dateStr, format) => {
        return date.parse(dateStr, format);
    }
    window.HSDate.getThirdDateTool = () => {
        return date;
    }

    //printLogo
    console.log("%c ", "background: url(" + HS.__LOGO__ + ") no-repeat center;padding-left:200px;padding-bottom: 200px");
}

// var init =function(){
//     console.log(window)
//     alert("wawa")
// }


export default {
    initHsUtil() {
        init();
    }
}
