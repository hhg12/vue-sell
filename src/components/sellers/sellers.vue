<template>
  <div class="sellers" ref="sellers">
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
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="content border-1px">{{seller.bulletin}}</p>
        <ul class="supports">
          <li class="support border-1px" v-for="item in seller.supports">
            <span class="brand" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
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
  import BScroll from 'better-scroll'

  export default {
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted: function () {
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中
        this.scroll = new BScroll(this.$refs.sellers, {
          click: true
        })
      })
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split
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
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.2));
        .star {
          margin-right: 8px;
        }
        .text {
          margin-right: 12px;
          line-height: 18px;
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
    .bulletin {
      padding: 0 18px;
      .title {
        margin-bottom: 8px;
        padding-top: 18px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27)
      }
      .content {
        padding: 0 12px 16px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
        @include border-1px(rgba(7, 17, 27, 0.1));
      }
      .support {
        display: flex;
        padding: 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none()
        }
        .brand {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img('decrease_3');
          }
          &.discount {
            @include bg-img('discount_3');
          }
          &.invoice {
            @include bg-img('invoice_3');
          }
          &.guarantee {
            @include bg-img('guarantee_3');
          }
          &.special {
            @include bg-img('special_3');
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }

</style>
