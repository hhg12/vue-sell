<template>
  <div class="ratings">
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
    </div>
  </div>

</template>

<script>
  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    }
  }
</script>


<style lang="scss">
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

  }


</style>
