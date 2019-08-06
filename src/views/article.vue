<template>
    <div class="gc-article">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="article-list">
            <minelist :parentData="frompage" ref="minelistRef"></minelist>
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
                frompage:''
            }
        },
        created(){
            this.frompage = this.$router.currentRoute.params.name
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
