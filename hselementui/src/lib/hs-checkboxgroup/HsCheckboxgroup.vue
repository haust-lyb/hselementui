<template>

    <el-checkbox-group v-model="checkList">
        <template v-for="item in localData">
            <el-checkbox :label="'' + item.value" @change="onChange">{{item.name}}</el-checkbox>
        </template>
    </el-checkbox-group>

</template>

<script>
    export default {
        name: "hs-checkboxgroup",
        props: {
            localData: Array,
            value: String
        },
        data() {
            return {
                checkList: [],
            }
        },
        watch: {
            value: {
                deep: true,
                //处理外界值发生变化，内部状态更新
                handler(newValue, oldValue) {
                    console.log('HsCheckboxGroup - 监听value', newValue, oldValue)
                    this._setValue(newValue);
                }
            },
            checkList: {
                deep: true,
                handler(newValue, oldValue) {
                    console.log('HsCheckboxGroup - 监听checkList', newValue, oldValue)
                }
            }
        },
        created() {
            this._setValue(this.value);
        },
        methods: {
            _setValue(value) {
                console.log(value)
                if (this.value == null || this.value == undefined || this.value == '') {
                    this.checkList = [];
                } else {
                    this.checkList = value.split(",")
                }
            },
            onChange() {
                var tempStr = '';
                for (var i = 0; i < this.checkList.length; i++) {
                    if (i == (this.checkList.length - 1)) {
                        tempStr += this.checkList[i];
                    } else {
                        tempStr += this.checkList[i] + ',';
                    }
                }
                this.$emit('input', tempStr);
            }
        }
    }
</script>
