<template>
  <transition name="fade">
    <div class="food" v-show="showFlag">
      <div class="content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift iconfont"></i>
          </div>
        </div>
        <div class="content-detial">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sellCount">月售{{food.sellCount}}份</span><span
            class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>


</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>


<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }

  .fade-enter, .fade-leave-to {
    transform: translate(100%, 0);
  }

  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    .content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            font-size: 20px;
            padding: 10px;
            color: #fff;
          }
        }
      }
    }
  }

</style>
