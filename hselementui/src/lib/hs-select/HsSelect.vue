<template>
    <el-select :value="value" @input="$emit('input', $event)">
        <el-option
                :key="selectOption.value"
                :label="selectOption.name"
                :value="selectOption.value"
                v-for="selectOption in selectOptions">
        </el-option>
    </el-select>
</template>

<script>
    import request from '../../utils/request';
    export default {
        name: "hs-select",
        props:{
            url:'',
            //v-model
            value:null,
        },
        created() {
            if (this.url == '' || this.url == null){
                HSUtil.hs_console_error("el-select 控件没有传入 url");
            }
            //加载远程数据
            request({
                url:this.url,
                method: 'post',
                data: {},
            }).then(res =>{
                this.selectOptions = res;
            })
        },
        data(){
            return {
                selectOptions:[],
                _name:this.name,
            }
        }
    }
</script>

<style scoped>

</style>
