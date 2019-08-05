<template>
    <div class="gc-article">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="article-list">
            <minelist></minelist>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/article.scss'
    import minelist from './minelist'
    export default {
        name: "article",
        components:{
            minelist
        },
        data(){
            return{

            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
        },
    }
</script>
