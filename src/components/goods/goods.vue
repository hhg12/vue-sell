<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            :class="{current:currentIndex === index}"
            @click="selectMenu(index)">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list-hook">
          <h1 class="name">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span><span
                  class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <!--<span class="old" >￥28</span>-->
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:add="_drop"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods"
              :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice" ref="shopcart"></shopcart>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  const ERR_OK = 0
  export default {
    props: ['seller'],
    components: {
      shopcart, cartcontrol
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
//          console.log(response.data)
        }
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _drop () {
        this.$refs.shopcart.drop(event.target)
      },
      selectMenu (index) {
//        console.log(index)
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3, click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      }
    }

  }
</script>


<style lang="scss">
  @import "../../common/sass/mixin.scss";

  .goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 68px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      background: #f3f5f7;
      .menu-item {
        padding: 0 12px;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #ffffff;
          font-weight: 700;
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-top: 1px;
          margin-right: 2px;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          &.decrease {
            @include bg-img('decrease_3')
          }
          &.discount {
            @include bg-img('discount_3')
          }
          &.guarantee {
            @include bg-img('guarantee_3')
          }
          &.invoice {
            @include bg-img('invoice_3')
          }
          &.special {
            @include bg-img('special_3')
          }
        }
        .text {
          line-height: 14px;
          font-size: 12px;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      h1.name {
        height: 26px;
        line-height: 26px;
        padding-left: 14px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            color: rgb(7, 17, 27);
            margin: 2px 0 8px;
          }
          .description, .extra {
            font-size: 10px;
            line-height: 12px;
            color: rgb(147, 153, 159);
            margin-bottom: 8px;
          }
          .extra {
            margin-bottom: 0;
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
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }

      }
    }
  }

</style>
