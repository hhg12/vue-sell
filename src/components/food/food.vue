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
                        :only-content="onlyContent" :desc="desc"
                        @select="selected" @toggle="toggleContent"></ratingSelect>
          <div class="ratings-wrapper">
            <ul v-show="food.ratings ">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username }}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-iconfontthumbsup':rating.rateType === 0,'icon-thumbsdown':rating.rateType === 1}"
                        class="iconfont"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
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
  import {formatDate} from '../../common/js/date.js'

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
      selected (type) {
        this.selectType = type
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      },
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
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>


<style lang="scss">
  @import "../../common/sass/mixin";

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
      .ratings-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .user {
            position: absolute;
            top: 18px;
            right: 0;
            display: flex;
            align-items: center;
            font-size: 0;
            line-height: 12px;
            .name {
              margin-right: 6px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            font-weight: 700;
            color: rgb(7, 17, 27);
            .icon-thumbsdown, .icon-iconfontthumbsup {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
              color: rgb(0, 160, 220);
            }
            .icon-thumbsdown {
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

</style>
