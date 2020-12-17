<template>
    <el-dialog class="hs-dialog"
               :close-on-click-modal="false"
               :title="title"
               :visible.sync="dialogVisible"
               :before-close="handleClose"
               :destroy-on-close="true">
        <slot ref="hsdialogslot"></slot>
    </el-dialog>
</template>

<script>

    export default {
        name: "hs-dialog",
        component:[],
        props: {
            title: ""
        },
        watch: {
            dialogVisible: function (value) {
                //坑 watch不能是箭头函数 否则！！！ this就不是vue对象了
                var that = this;
                if (value == false) {
                    //关闭回调
                    this.$emit("hsDialogClosed");
                } else {
                    //显示回调
                    this.$emit("hsDialogOpen");
                }
            }
        },
        created() {
            var that = this;
            //初始化默认值
            this.options = this.options || {};
            //弹出框标题
            this.options.title = this.options.title || '提示'
        },
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            handleClose() {
                this.$emit("beforeClose");
                this.dialogVisible = false;
            },
            close() {
                this.dialogVisible = false;
            },
            show() {
                this.dialogVisible = true;
                HSUtil.hs_msg_success("打开成功");
            },

        }
    }
</script>

<style lang="less" scoped>
    .hs-dialog {
        .el-dialog__body {
            padding: 20px 60px !important;
            /*padding: 0px !important;*/
        }
    }
</style>
