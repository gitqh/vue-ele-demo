<template>
  <div class="border-title">
    <div class="border-line"></div>
    <div class="border-text">{{content}}</div>
    <div class="border-line"></div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  .border-title
    display: flex
    width: 80%
    margin: 28px auto 24px auto;
    .border-line
      flex: 1
      color: rgba(255,255,255,0.2)
      border-bottom: 1px solid
      top: -6px
      position: relative
    .border-text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
</style>
<script type='text/ecmascript-6'>
  export default {
    props: ['content']
  };
</script>
