<template>
  <div class="sellers">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <div class="text">({{seller.ratingCount}})</div>
          <div class="text">{{seller.sellCount}}</div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
    </div>

  </div>

</template>

<script>
  import star from '../star/star.vue'
  import split from '../split/split.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,split
    }
  }
</script>


<style lang="scss">
  @import "../../common/sass/mixin";

  .sellers {
    position: absolute;
    top: 174px;
    bottom: 68px;
    width: 100%;
    overflow: hidden;
    .overview {
      padding: 0 18px;
      .title {
        margin-bottom: 8px;
        padding-top: 18px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27)
      }
      .desc {
        display: flex;
        padding-bottom: 12px;
        line-height: 18px;
        @include border-1px(rgba(7, 17, 27, 0.2));
        .star {
          margin-right: 8px;
        }
        .text {
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding: 18px 0;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
    }
  }

</style>
