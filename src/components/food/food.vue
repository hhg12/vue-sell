<template>
  <transition name="fade">
    <div class="food" v-show="showFlag" ref="food">
      <div>
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift iconfont"></i>
            </div>
          </div>
          <div class="content-detail">
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
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="buy-hide">
            <div class="buy" @click="addFirst" v-show="!food.count">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect :ratings="food.ratings" :select-type="selectType"
                        :only-content="onlyContent" :desc="desc"></ratingSelect>
        </div>
      </div>
    </div>
  </transition>


</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import split from '../split/split.vue'
  import ratingSelect from '../ratingSelect/ratingSelect.vue'

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartcontrol, split, ratingSelect
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      addFirst () {
        this.$set(this.food, 'count', 1)
      },
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.foodScroll.refresh()
          }
        })
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
    .food-content {
      position: relative;
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
      .content-detail {
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 14px;
          margin-bottom: 8px;
        }
        .detail {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin-bottom: 18px;
          .sellCount {
            margin-right: 12px;
          }
        }
        .price {
          height: 24px;
          line-height: 24px;
          font-size: 0;
          font-weight: 700;
          .now {
            font-size: 14px;
            color: red;
            margin-right: 8px;
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        width: 74px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        box-sizing: border-box;
        border-radius: 12px;
        background: rgb(0, 160, 220);
        font-size: 10px;
        color: #fff;
      }
      .buy-hide-enter-active, .buy-hide-leave-active {
        transition: all 0.3s;
      }
      .buy-hide-enter, .buy-hide-leave-to {
        opacity: 0;
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        padding: 0 8px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

    }
  }

</style>
