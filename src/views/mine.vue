<template>
    <div class="mine-wraper">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="mine-header">
            <span class="name">似懂非懂分</span>
            <img src="../assets/img/user.jpg" class="avatar-b" alt="avator">
        </div>
        <div class="mine-opration">
            <div class="opration-item">
                <span class="key">垃圾币</span>
                <span class="key">5000</span>
            </div>
            <div class="opration-item" @click="handleRouter('public')">
                <span class="key">已发布</span>
                <div class="item">
                    <span class="keyvalue">3</span>
                    <img src="../assets/img/arrow-right.png" width="9px" height="15px" alt="">
                </div>
            </div>
            <div class="opration-item" @click="handleRouter('hasRead')">
                <span class="key">已阅读</span>
                <div class="item">
                    <span class="keyvalue">50</span>
                    <img src="../assets/img/arrow-right.png" width="9px" height="15px" alt="">
                </div>
            </div>
        </div>
        <x-button class="public-btn" type="primary" @click.native="handlePub">发布</x-button>

    </div>
</template>

<script>
    import '../assets/scss/mine.scss'
    import {XButton, ButtonTab, ButtonTabItem} from 'vux'

    export default {
        name: "mine",
        components: {XButton, ButtonTab, ButtonTabItem},
        data() {
            return {
                tabIndex: 0,
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            handleRouter(name) {
               this.$router.push({
                   name:'Article',
                   params:name,
               })
            },
            handlePub(){
                this.$router.push('Public')
            },
        },
    }
</script>
