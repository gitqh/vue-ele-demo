<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{content}}</div>
    <div class="line"></div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  .title
    display: flex
    width: 80%
    margin: 28px auto 24px auto;
    .line
      flex: 1
      color: rgba(255,255,255,0.2)
      border-bottom: 1px solid
      top: -6px
      position: relative
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
</style>
<script type='text/ecmascript-6'>
  export default {
    props: ['content']
  };
</script>
