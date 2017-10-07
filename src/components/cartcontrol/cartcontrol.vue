<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-removecircleoutline iconfont"
         v-show="food.count > 0"
         @click="decreaseCart"></div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-addcircle iconfont" @click="addCart"></div>
  </div>

</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
//        if (!event._constructed) {
//          return
//        }
        console.log('click')
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }

  }
</script>


<style lang="scss">
  .cartcontrol {
    font-size: 0;
    display: flex;
    .cart-decrease, .cart-increase {
      display: inline-block;
      padding: 0 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .cart-count {
      display: inline-block;
      width: 12px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    }
  }

</style>
