<template>
  <div class="sf-badge">
    <!--@slot Use this slot to place content inside the badge-->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "SfBadge"
};
</script>
<style lang="scss">
@import "assets/styles/scss/components/atoms/SfBadge.scss";
</style>
