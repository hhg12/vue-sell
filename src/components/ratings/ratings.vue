<template>
  <div class="ratings">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right"></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>


<style lang="scss">
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        padding: 18px 0;
        text-align: center;
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          margin-bottom: 6px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
      }
    }

  }


</style>
