import HsHello from './HsHello.vue'

HsHello.install = function (Vue) {
    console.log(HsHello.name)
    Vue.component(HsHello.name, HsHello)
}

export default HsHello
