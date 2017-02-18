<template>
  <div class="price">
    <span class="now">￥{{nowPrice}}</span><span class="old" v-show="oldPrice">￥{{oldPrice}}</span>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  .price
    font-weight: 700
    line-height: 24px
    .now
      margin-right: 8px
      font-size: 14px
      color: rgb(240, 20, 20)
    .old
      text-decoration: line-through
      font-size: 10px
      color: rgb(147, 153, 159)
</style>
<script type='text/ecmascript-6'>
  export default {
    props: {
      nowPrice: {
        type: Number
      },
      oldPrice: {
        type: Number
      }
    }
  };
</script>
