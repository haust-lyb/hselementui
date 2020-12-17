<template>
    <div>
        <h3>hs-hello</h3>
        <hs-hello msg="Welcome to Your Vue.js App"/>
        <hr>
        <h3>hs-dialog</h3>
        <el-button type="primary" @click="$refs.testdialog.show()">show dialog</el-button>
        <hs-dialog ref="testdialog" title="呵呵">
            <div>呵呵</div>
        </hs-dialog>
        <hr>
        <h3>hs-select</h3>
        <hs-select url="/getHsSelectOptions" v-model="hsselectvalue"></hs-select>
        <hr>
        <h3>hs-check-box-group</h3>
        <hs-checkboxgroup :local-data="hsCheckBoxGroupData" v-model="hsCheckBoxGroupDataValue"></hs-checkboxgroup>
        当前选择：{{hsCheckBoxGroupDataValue}}
    </div>
</template>

<script>
    import HsHello from './lib/hs-hello/HsHello'
    import HsDialog from './lib/hs-dialog/HsDialog'
    import HsSelect from './lib/hs-select/HsSelect'
    import HsCheckboxgroup from './lib/hs-checkboxgroup/HsCheckboxgroup'

    export default {
        name: 'App',
        components: {
            HsHello, HsDialog, HsSelect, HsCheckboxgroup
        },
        data() {
            return {
                hsselectvalue: "",
                hsCheckBoxGroupData: [
                    {name: "星期一", value: "1"},
                    {name: "星期二", value: "2"},
                    {name: "星期三", value: "3"},
                    {name: "星期四", value: "4"}
                ],
                hsCheckBoxGroupDataValue: "",
            }
        }
    }
</script>

<style>

</style>
