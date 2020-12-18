import HsCheckboxgroup from './HsCheckboxgroup.vue'

HsCheckboxgroup.install = function (Vue) {
    console.log(HsCheckboxgroup.name)
    Vue.component(HsCheckboxgroup.name, HsCheckboxgroup)
}

export default HsCheckboxgroup
