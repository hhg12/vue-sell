<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div class="title">服务态度</div>
            <star :size="36" :score="seller.serviceScore"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
            <star :size="36" :score="seller.foodScore"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect :ratings="ratings" :select-type="selectType"
                    :only-content="onlyContent" @select="selected"
                    @toggle="toggleContent"></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="icon-iconfontthumbsup iconfont"></span>
                <span v-for="text in rating.recommend" v-show="rating.recommend" class="text">{{text}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingSelect from '../ratingSelect/ratingSelect.vue'
  import { formatDate } from '../../common/js/date.js'
  import BScroll from 'better-scroll'

  const ALL = 2
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split, ratingSelect
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: false,
        ratings: []
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
//          console.log(response.data)
        }
      })
      this.$nextTick(() => {
//        console.log(this.$refs.ratings)
        this.ratingScroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selected (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
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

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        margin: 18px 0;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          margin-bottom: 6px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        margin: 18px 0 18px 24px;
        @media only screen and (max-width: 320px) {
          margin-left: 6px;
        }
        .score-wrapper {
          display: flex;
          line-height: 18px;
          font-size: 12px;
          .title {
            color: rgb(7, 17, 27);
          }
          .star {
            margin: 0 12px;
          }
          .score {
            color: rgb(255, 153, 0);
          }
        }
        .delivery-time {
          line-height: 18px;
          font-size: 12px;
          .title {
            margin-right: 12px;
            color: rgb(7, 17, 27);
          }
          .time {
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper {
      margin: 0 18px;
      .rating-item {
        position: relative;
        display: flex;
        padding: 18px 0;
        @include border-1px(rgba(7, 17, 27, 0.2));
        .avatar {
          flex: 0 0 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          color: rgb(7, 17, 27);
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
          }
          .star-wrapper {
            display: flex;
            margin-bottom: 6px;
            .delivery {
              margin-left: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 12px;
          }
          .recommend {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            line-heght: 16px;
            font-size: 0;
            .icon-iconfontthumbsup {
              margin: 0 8px 4px 0;
              font-size: 9px;
              color: rgb(0, 160, 220);
            }
            .text {
              margin: 0 8px 4px 0;
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              font-size: 9px;
              color: rgb(147, 153, 159);
            }
          }
          .time {
            position: absolute;
            top: 18px;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }


</style>
