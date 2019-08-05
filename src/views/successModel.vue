<template>
    <div class="success-model">
        <div class="view">
            <img src="../assets/img/success.png" width="90px" height="90px" alt="">
            <p class="text">恭喜你内容发布成功</p>
            <button @click="sure" class="btn know-btn">我知道了</button>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/theme.scss'
    export default {
        name: "successModel",
        methods:{
            sure(){
                this.$router.push('/')
            },
        },
    }
</script>

<style scoped lang="less">
    .success-model{
        .view{
            display: flex;
            flex-direction: column;
            align-items:center;
            margin-top: 100px;
            padding:0 20px;
            .text{
                margin:22px 0 51px;
                color:rgba(0,0,0,.9);
                font-size: 16px;
            }
            .know-btn{
                width: 100%;
                height:60px;
                background-color: #00C691;
                border-radius: 30px;
                color:#fff;
                font-size: 18px;
                box-shadow: 0 4px 16px 0 rgba(0,198,145,.38);
            }
        }
    }
</style>
