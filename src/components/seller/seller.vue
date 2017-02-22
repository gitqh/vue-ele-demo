<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <spanicon class="icon" iconSize="4" :index="seller.supports[index].type"></spanicon>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <div class="content">
          <ul>
            <li v-for="item in seller.infos" class="item border-1px">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl";

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        padding: 18px 18px
        .title
          margin: 8px 0
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .desc
          font-size: 0
          border-1px(rgba(7,17,27,0.1))
          padding-bottom: 18px
          .star
            vertical-align: top
            display: inline-block
            margin-right: 8px
          .text
            margin-right: 12px
            vertical-align: top
            display: inline-block
            font-size: 10px
            color: rgb(77,85,93)
            line-height: 18px
        .remark
          display: flex
          padding-top: 18px
          .block
            flex: 1
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            &:last-child
              border: none
            h2
              margin-top: 18px
              margin-bottom: 4px
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 10px
            .content
              font-size: 10px
              color:rgb(7,17,27)
              line-height: 24px
              .stress
                font-size: 24px
                font-weight: 200
        .favorite
          position: absolute
          width: 50px
          right: 11px
          top: 18px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 4px
            font-size: 24px
            color: #d4d6d9
            line-height: 24px
            &.active
              color: rgb(240,20,20)
          .text
            font-size: 10px
            color: rgb(77,85,93)
            line-height: 10px
      .bulletin
        padding: 18px 18px 0 18px
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .content-wrapper
          border-1px(rgba(7,17,27,0.1))
          padding: 0 12px 16px 12px
          .content
            font-size: 12px
            font-weight: 200
            line-height: 24px
            color: rgb(240,20,20)
        .supports
          .support-item
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border-none()
            .text
              font-size: 12px
              font-weight: 200
              color: rgb(7,17,27)
              line-height: 16px
      .pics
        padding: 18px
        .title
          margin-bottom: 12px
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .pic-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              width: 120px
              height: 90px
            &:last-child
              margin-right: 0
      .info
        margin: 18px 18px 0 18px
        color: rgb(7,17,27)
        .title
          border-1px(rgba(7,17,27,0.1))
          padding-bottom: 12px
          font-size: 14px
          line-height: 14px
        .content
          .item
            padding: 16px 12px
            font-size: 12px
            font-weight: 200
            line-height:16px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border-none()
</style>
<script type='text/ecmascript-6'>
  import star from '../star/star.vue';
  import BScroll from 'better-scroll';
  import spanicon from '../spanicon/spanicon.vue';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  import split from '../split/split.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    components: {
      star,
      spanicon,
      split
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    }
  };
</script>
