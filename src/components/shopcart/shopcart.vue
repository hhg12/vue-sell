<template>
  <div class="shopcart" @click="toggleList">
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
        <div v-else class="pay highlight">去结算</div>
      </div>
    </div>
    <div class="ball-container">
      <!--<transition-group name="drop"-->
      <!--v-on:before-enter="beforeEnter"-->
      <!--v-on:enter="enter"-->
      <!--v-on:after-enter="afterEnter">-->
      <div v-for="ball in balls" class="ball" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
      <!--</transition-group>-->
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <div class="empty">清空</div>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <div class="name">{{food.name}}</div>
              <div class="price">￥{{food.price * food.count}}</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

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
    components: {
      cartcontrol
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
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
      },
      listShow () {
        if (!this.totalCount) {
          return
        }
        let show = !this.fold
        return show
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22 )
            el.style.display = ''
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) {
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        ball.show = true
        el.style.display = 'none'
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
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
    .ball-container {
      /*未完*/
      .ball {
        display: none;
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.5s;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.5s;
        }
      }
    }
    .shopcart-list {
      &.fold-enter-active, &.fold-leave-active {
        transition: all .3s;
      }
      &.fold-enter, &.fold-leave-to {
        transform: translateY(-48px);
      }
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
      transform: translateY(-100%);
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27)
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220)
        }
      }
    }
  }

</style>
