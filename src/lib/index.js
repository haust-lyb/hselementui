import HSUtil from "../utils/HSUtil"
import HsHello from "./hs-hello/HsHello";
import HsDialog from "./hs-dialog/HsDialog";
import HsSelect from "./hs-select/HsSelect";
import HsCheckboxgroup from "./hs-checkboxgroup/HsCheckboxgroup";

HSUtil.initHsUtil();
// 存储组件列表
const components = [
    HsHello,HsDialog,HsSelect,HsCheckboxgroup
]
const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    HsDialog,
    HsSelect,
    HsCheckboxGroup,
    HsHello
}
