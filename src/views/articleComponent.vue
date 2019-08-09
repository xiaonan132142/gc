<template>
    <div class="gc-article">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="article-list">
            <minelist ref="minelistRef"></minelist>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/article.scss'
    import minelist from './minelist'
    export default {
        name: "articleComponent",
        components:{
            minelist
        },
        data(){
            return{

            }
        },
        mounted(){
            this.$refs.minelistRef.getlist()
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
        },
    }
</script>
