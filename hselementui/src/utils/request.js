import axios from 'axios';
import qs from 'qs';
import {Loading} from 'element-ui';


const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000000,
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
});

let loadingInstance;
let loadingRequestCount = 0;


const showLoading = (config) => {
    if (config.showLoading == false) {
        return
    }
    if (loadingRequestCount === 0) {
        loadingInstance = Loading.service({
            body: true,
            fullscreen: true,
            text: "加载中..."
        });
    }
    loadingRequestCount++
}

const hideLoading = (config) => {
    // this.hsConsoleInfo("关闭loading")
    if (config.showLoading == false) {
        return;
    }
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingRequestCount === 0) {
        HSUtil.getDefVue().$nextTick(() => {//以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
        });
    }
}

// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

service.interceptors.request.use(
    config => {
        showLoading(config);
        config.headers = {'content-type': 'application/x-www-form-urlencoded'};
        config.data = qs.stringify(config.data);
        config.headers.token = sessionStorage.getItem('ms_token');
        return config;
    },
    error => {
        HSUtil.getDefVue.hsConsoleError("requestError:" + error);
        return Promise.reject();
    }
);


service.interceptors.response.use(
    response => {
        //如果短时间内有大量请求 这里setTimeout可以合并两百毫秒之内的请求统一做关闭 否则会出现大量的关闭和展示 影响性能
        setTimeout(() => {
            hideLoading(response.config)
        }, 200);
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        HSUtil.hsConsoleInfo("requestError:" + error);
        if (error == "Error: Request failed with status code 500") {
            HSUtil.hs_msg_error("服务器500错误");
        }
        if (error == "Error: Request failed with status code 404") {
            HSUtil.hs_msg_error("服务器404错误");
        }
        setTimeout(() => {
            hideLoading(error.response.config);
        }, 200);
        return Promise.reject();
    }
);

export default service;

