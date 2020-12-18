import HsDialog from './HsDialog.vue'

HsDialog.install = function (Vue) {
    console.log(HsDialog.name)
    Vue.component(HsDialog.name, HsDialog)
}

export default HsDialog
