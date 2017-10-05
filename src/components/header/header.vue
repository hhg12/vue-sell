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
      <div class="support-count" @click="showDetail">
        <span v-if="seller.supports" class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-enter "></i>
      </div>

    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-brand"></span><span class="bulletin-title">{{seller.bulletin}}</span>
      <i class="iconfont icon-enter "></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" height="100%" width="100%">
    </div>
    <div class="detail" v-show="isDetailShow" transition="fade">
      <div class="detail-wrapper">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support" v-for="item in seller.supports">
              <span class="brand" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="bulletin">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin-main">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>


</template>

<script>
  import star from 'components/star/star'

  export default {
    name: 'header',
    props: ['seller'],
    data () {
      return {
        isDetailShow: false
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail: function () {
        this.isDetailShow = true
      },
      hideDetail: function () {
        this.isDetailShow = false
      }
    },
    components: {
      star
    }
  }
</script>

<style lang="scss">
  @import "../../common/sass/mixin.scss";

  .header {
    position: relative;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
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
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 10px;
          /*vertical-align: top;*/
        }
        .icon-enter {
          font-size: 10px;
          margin-left: 2px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      padding: 0 22px 0 12px;
      background: rgba(7, 17, 27, 0.2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .bulletin-brand {
        display: inline-block;
        width: 22px;
        height: 12px;
        margin-top: 8px;
        vertical-align: top;
        @include bg-img('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-title {
        font-size: 10px;
        line-height: 28px;
        margin: 0 4px;
      }
      .icon-enter {
        position: absolute;
        font-size: 10px;
        top: 8px;
        right: 12px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      /*transition: all 0.5s;*/
      /*&.fade-transition {*/
        /*opacity: 1;*/
        /*background: rgba(7, 17, 27, 0.8);*/
      /*}*/
      /*&.fade-entry, &.fade-leave {*/
        /*opacity: 0;*/
        /*background: rgba(7, 17, 27, 0);*/
      /*}*/
      .detail-wrapper {
        min-height: 100%;
        .detail-main {
          padding: 64px 0 80px;
          text-align: center;
          .name {
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px;
            align-items: center;
            .line {
              flex: 1;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .brand {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-img('decrease_2')
                }
                &.discount {
                  @include bg-img('discount_2')
                }
                &.guarantee {
                  @include bg-img('guarantee_2')
                }
                &.invoice {
                  @include bg-img('invoice_2')
                }
                &.special {
                  @include bg-img('special_2')
                }
              }
              .text {
                font-size: 12px;
                line-height: 12px;
              }
            }
          }
          .bulletin {
            display: flex;
            width: 80%;
            margin: 28px auto 24px;
            align-items: center;
            .line {
              flex: 1;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }
          .bulletin-main {
            width: 80%;
            margin: 0 auto;
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
            text-align: justify;
          }

        }
      }
      .detail-close {
        height: 32px;
        width: 32px;
        margin: -64px auto 0 auto;
        .icon-close {
          font-size: 32px;
        }
      }
    }
  }

</style>
