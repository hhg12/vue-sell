<template>
  <div class="shopcart">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="iconfont icon-shoppingcartblackshape"></i>
          </div>
        </div>
        <div class="price">$0</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <dic class="content-right">

      </dic>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
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
            .icon-shoppingcartblackshape {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
            }
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
      }
    }

  }

</style>
