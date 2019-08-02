<template>
    <ul>
        <li
            v-for="(item,index) in list"
            :key="index"
            @click="checkDesc(item)"
            :class="{move:candelete.id==item.id}"
            @touchstart="touchStart(item)"
            @touchend="touchEnd(item)">
            {{item.title}}{{item.id}}
            <div class="del edit" @click.stop="editItem(item)">修改</div>
            <div class="del" @click.stop="deleteItem(item)">删除</div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: "minelist",
        data() {
            return {
                list: [{
                    id: 1,
                    title: '请左滑动删除我吧',
                    contents:[
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'1发开始的减肥开始疯狂上岛咖啡开始的房间看了世界仿佛都是开发建设的咖啡开始',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'1发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'1发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        }
                    ],
                }, {
                    id: 2,
                    title: '请左滑动删除我吧',
                    contents:[
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'2发开始的减肥开始疯狂上岛咖啡开始的房间看了世界仿佛都是开发建设的咖啡开始',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'2发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'2发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        }
                    ],
                }, {
                    id: 3,
                    title: '请左滑动删除我吧',
                    contents:[
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'3发开始的减肥开始疯狂上岛咖啡开始的房间看了世界仿佛都是开发建设的咖啡开始',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'3发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        },
                        {
                            id: Date.now(),
                            editModel:{
                                decs:'3发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房',
                                imgdata:'',
                            },
                        }
                    ],
                }],
                clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
                candelete: {}, // 滑动的item
            }
        },
        methods: {
            checkDesc(item){
                this.$router.push({
                    name:'Check',
                    params:item
                })
            },
            deleteItem(item) {
                console.log(item)
            },
            editItem(item){
                console.log(item)
            },
            touchStart(item) {
                let touchs = event.changedTouches[0];
                // 记录开始滑动的鼠标位置
                this.clientNum.x1 = touchs.pageX;
                this.candelete = {};
            },
            touchEnd(item) {
                let touchs = event.changedTouches[0];
                // 记录结束滑动的鼠标位置
                this.clientNum.x2 = touchs.pageX;
                this.candelete = {};
                // 判断滑动距离大于50，判定为滑动成功，否则失败
                if (
                    this.clientNum.x2 < this.clientNum.x1 &&
                    Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
                ) {
                    event.preventDefault();
                    this.candelete = item;
                } else if (
                    this.clientNum.x2 > this.clientNum.x1 &&
                    Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
                ) {
                    event.preventDefault();
                    this.candelete = {};
                }
            },
            getDeblocking() {
                console.log('解锁')
            },
            getPublic() {
                console.log('发布')
            },
        },

    }
</script>

<style scoped>
    li {
        background: #fdfdfd;
        border-bottom: 1px solid #e1e1e1;
        line-height: 40px;
        position: relative;
        transform: translateX(0);
        transition: all .3s; /*滑动效果更生动*/
        padding-left: 10px;
    }

    ul {
        overflow-x: hidden; /*隐藏ul x轴的滚动条*/
    }

    li.move {
        transform: translateX(-120px); /*滑动后x轴位移-60px,使其可见*/
    }

    .del {
        position: absolute;
        top: 0;
        right: -1px;
        z-index: 3;
        width: 60px;
        height: 100%;
        text-align: center;
        color: #fff;
        background-color: #ff5b45;
        transform: translateX(120px);
    }

    .edit {
        background-color: #43A345;
        right: 0px;
        transform: translateX(60px);
    }
</style>

