import HsSelect from './HsSelect.vue'

HsSelect.install = function (Vue) {
    console.log(HsSelect.name)
    Vue.component(HsSelect.name, HsSelect)
}

export default HsSelect
