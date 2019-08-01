<template>
    <div class="mine-wraper">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="mine-header">
            <img src="../assets/img/user.jpg" class="avatar-b" alt="avator">
            <span class="name">似懂非懂分</span>
            <div class="price">
                <span class="desc">垃圾币</span>
                <img src="data:image/png;base64,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"
                     width="23px" height="23px" alt="">
                <span class="count">X22</span>
            </div>
        </div>
        <div class="mine-opration">
            <div class="btn-wrap">
                <x-button type="primary" @click.native="handlePub">发布</x-button>
            </div>
            <button-tab v-model="tabIndex">
                <button-tab-item @on-item-click="changeTab">已发布</button-tab-item>
                <button-tab-item @on-item-click="changeTab">已解锁</button-tab-item>
            </button-tab>
            <minelist ref="minelist"></minelist>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/mine.scss'
    import {XButton, ButtonTab, ButtonTabItem} from 'vux'
    import minelist from './minelist'

    export default {
        name: "mine",
        components: {XButton, ButtonTab, ButtonTabItem, minelist},
        data() {
            return {
                tabIndex: 0,
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            changeTab(val) {
                if (val === 1) {
                    this.$refs.minelist.getDeblocking()
                } else {
                    this.$refs.minelist.getPublic()
                }
            },
            handlePub(){
                this.$router.push('Add')
            },
        },
    }
</script>
