<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}件</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <price v-bind:nowPrice="food.price" v-bind:oldPrice="food.oldPrice?food.oldPrice:0"></price>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">
            加入购物车
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  .food
    position: fixed
    width: 100%
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height:10px
        font-size: 0
        height: 10px
        .sell-count, .rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      boxsizing: border-box
      font-size: 10px
      border-radius: 12px
      color: #fff
      background: rgb(0,160,220)
      opacity: 1
      &.fade-enter, &.fade-leave-active
        opacity: 0
        z-index: -1
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.2s
</style>
<script type='text/ecmascript-6'>
  import price from '../price/price.vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      console.log(this.food.oldPrice);
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      price,
      cartcontrol
    }
  };
</script>
