<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-removecircleoutline iconfont" v-show="food.count > 0"></div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-addcircle iconfont"></div>
  </div>

</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    }
  }
</script>


<style lang="scss">
  .cartcontrol {
    font-size: 0;
    .cart-decrease, .cart-increase {
      display: inline-block;
      padding: 0 6px;
      line-height: 24px;
      font-size: 24px;
    }
    .cart-count {
      display: inline-block;
    }
    .cart-increase {
      color: rgb(0, 160, 220)
    }
  }

</style>
