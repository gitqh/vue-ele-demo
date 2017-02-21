<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    <split></split>
    <ratingselect @select="refreshRatingType" @toggle="refreshToggle"
                  :select-type="selectType" :only-content="onlyContent"
                  :ratings="ratings"></ratingselect>
    <div class="rating-wrapper">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img width="28" height="28" :src="rating.avatar">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score" class="star"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate }}</div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl";

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
        .rank
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          font-size: 0
          margin-bottom: 8px
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
        .delivery-wrapper
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .delivery
            display: inline-block
            vertical-align: top
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        padding: 18px 0
        font-size: 0
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            margin-bottom: 4px
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .delivery
              display: inline-block
              vertical-align: top
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
              line-height: 12px
          .text
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .recommend
            line-height: 16px
            display: inline-block
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              color: rgb(147,153,159)
              background: #fff
              border-radius: 1px
          .time
            right: 0
            top: 0
            position: absolute
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px
</style>
<script type='text/ecmascript-6'>
  import star from '../star/star.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import split from '../split/split.vue';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      refreshRatingType (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      refreshToggle(toggle) {
        this.onlyContent = toggle;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    }
  };
</script>
