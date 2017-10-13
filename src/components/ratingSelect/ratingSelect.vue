<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive"
            :class="{active:selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive"
            :class="{active:selectType===0}" @click="select(0,$event)">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="negative block"
            :class="{active:selectType===1}" @click="select(1,$event)">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent">
      <span class="icon-checkcircle iconfont" :class="{active:onlyContent}"></span>
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
    },
    methods: {
      select (type, event) {
        console.log(111)
        this.selectType = type
        this.$emit('select', type)
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
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
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1))
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 2px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
        &.active {
          color: #fff;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.2);
      color: rgb(147, 153, 159);
      .icon-checkcircle {
        font-size: 24px;
        margin-right: 4px;
        &.active {
          color: #00c850;
        }
      }
      .text {
        font-size: 12px;
      }
    }
  }

</style>
