<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>

</template>

<script>
  const length = 5
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'

  export default {
//    name: 'star',
    props: ['size', 'score'],
    computed: {
      starType: function () {
        return 'star-' + this.size
      },
      itemClasses: function () {
        let arr = []
        let score = Math.floor(this.score * 2) / 2
        let hasHalf = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          arr.push(CLS_ON)
        }
        if (hasHalf) {
          arr.push(CLS_HALF)
        }
        while (arr.length < length) {
          arr.push(CLS_OFF)
        }
//        console.log(arr)
        return arr
      }
    }
  }
</script>


<style lang="scss">
  @import '../../common/sass/mixin.scss';

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(star48_on);
        }
        &.off {
          @include bg-img(star48_off);
        }
        &.half {
          @include bg-img(star48_half);
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        background-size: 15px 15px;
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(star36_on);
        }
        &.off {
          @include bg-img(star36_off);
        }
        &.half {
          @include bg-img(star36_half);
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        background-size: 10px 10px;
        margin-right: 3px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(star24_on);
        }
        &.off {
          @include bg-img(star24_off);
        }
        &.half {
          @include bg-img(star24_half);
        }
      }
    }
  }

</style>
