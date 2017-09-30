<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}} </span>
        </div>

      </div>
      <div class="support-count">
        <span v-if="seller.supports" class="count">{{seller.supports.length}}个</span>
        <i class="icon sell-icon icon-keyboard_arrow_right "></i>
      </div>

    </div>
    <div class="bulletin-wrapper">

    </div>
  </div>


</template>

<script>
  export default {
    name: 'header',
    props: ['seller'],
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="scss">
  @import "../../common/sass/mixin.scss";


  .header {
    color: #fff;
    background: #ccc;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 32px;
            height: 18px;
            vertical-align: top;
            @include bg-img('brand');
            background-repeat: no-repeat;
            background-size: 32px 18px;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
          }
        }
        .description {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
        }
        .supports {
          .icon {
            display: inline-block;
            margin-right: 4px;
            width: 12px;
            height: 12px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            &.decrease {
              @include bg-img('decrease_1');
            }
            & .discount {
              @include bg-img('discount_1');
            }
            & .guarantee {
              @include bg-img('guarantee_1');
            }
            & .invoice {
              @include bg-img('invoice_1');
            }
            & .special {
              @include bg-img('special_1');
            }
          }
          .text {
            vertical-align: top;
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        border-radius: 12px;
        height: 24px;
        line-height: 24px;
        background: rgba(0,0,0,0.2);
        text-align: center;
        .count {
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          margin-left: 2px;
          vertical-align: top;
        }
      }
    }
  }

</style>
