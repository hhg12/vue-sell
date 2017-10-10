<template>
  <div class="food">

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
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  display: none;
}

</style>
