<template>
  <div  :class="startType" class="span-icon">
  <!--<div  :class="startType">-->
    <span :class="classMap[index]" class="span-item"></span>
    <!--<span :class="decrease" class="span-icon"></span>-->
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl";
  .span-icon
    font-size: 0
    display: inline-block
    vertical-align: top
    .span-item
      background-repeat: no-repeat
      display: inline-block
    &.icon-1
      .span-item
        width: 12px
        height: 12px
        margin-right: 4px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-img('decrease_1')
        &.discount
          bg-img('discount_1')
        &.guarantee
          bg-img('guarantee_1')
        &.invoice
          bg-img('invoice_1')
        &.special
          bg-img('special_1')
    &.icon-2
      .span-item
        width: 16px
        height: 16px
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-img('decrease_2')
        &.discount
          bg-img('discount_2')
        &.guarantee
          bg-img('guarantee_2')
        &.invoice
          bg-img('invoice_2')
        &.special
          bg-img('special_2')
    &.icon-3
      .span-item
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-img('decrease_3')
        &.discount
          bg-img('discount_3')
        &.guarantee
          bg-img('guarantee_3')
        &.invoice
          bg-img('invoice_3')
        &.special
          bg-img('special_3')
    &.icon-4
      .span-item
        width: 16px
        height: 16px
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-img('decrease_4')
        &.discount
          bg-img('discount_4')
        &.guarantee
          bg-img('guarantee_4')
        &.invoice
          bg-img('invoice_4')
        &.special
          bg-img('special_4')
</style>
<script type='text/ecmascript-6'>
  export default {
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    props: {
      iconSize: {
        type: String
      },
      index: {
        type: Number
      }
    },
    computed: {
      startType() {
        return 'icon-' + this.iconSize;
      }
    }
  };
</script>
