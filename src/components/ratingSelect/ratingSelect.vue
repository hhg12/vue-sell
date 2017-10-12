<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
    </div>
    <div class="switch">
      <span class="icon-checkcircle iconfont"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意 '
          }
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "../../common/sass/mixin";

  .ratingSelect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7, 17, 27, 0.1))
    }
  }

</style>
