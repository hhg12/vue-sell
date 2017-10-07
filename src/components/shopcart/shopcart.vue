<template>
  <div class="shopcart">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{hasfood: totalCount > 0}">
            <i class="iconfont icon-shoppingcartblackshape" :class="{hasfood: totalCount > 0}"></i>
          </div>
          <div v-show="totalCount > 0" class="count">{{totalCount}}</div>
        </div>
        <div class="price" :class="{hasfood: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div v-if="totalPrice === 0" class="pay">￥{{minPrice}}起送</div>
        <div v-else-if="totalPrice < minPrice" class="pay">￥还差{{minPrice - totalPrice}}起送</div>
        <div v-else class="pay highlight" >去结算</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let price = 0
        this.selectFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      }
    }
  }
</script>


<style lang="scss">
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 10;
    background: #000;
    .content-wrapper {
      display: flex;
      width: 100%;
      /*height: 48px;*/
      .content-left {
        background: #141d27;
        flex: 1;
        .logo-wrapper {
          position: relative;
          bottom: 12px;
          display: inline-block;
          width: 58px;
          height: 58px;
          box-sizing: border-box;
          padding: 6px;
          margin: 0 12px;
          border-radius: 50%;
          background: #141d27;
          .logo {
            background: #2b343c;
            height: 100%;
            width: 100%;
            border-radius: 50%;
            text-align: center;
            &.hasfood {
              background: rgb(0, 160, 220);
            }
            .icon-shoppingcartblackshape {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.hasfood {
                color: rgb(255, 255, 255);
              }
            }
          }
          .count {
            position: absolute;
            right: 0;
            top: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: rgb(255, 255, 255);
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          color: #80858a;
          padding-right: 12px;
          margin: 12px 0;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          &.hasfood {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          line-height: 24px;
          vertical-align: top;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
          margin: 12px 0 0 12px;
        }
      }
      .content-right {
        width: 105px;
        flex: 0 0 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          background: #2b343c;
          font-size: 12px;
          &.highlight {
            color: #fff;
            background: green;
          }
        }
      }
    }

  }

</style>
