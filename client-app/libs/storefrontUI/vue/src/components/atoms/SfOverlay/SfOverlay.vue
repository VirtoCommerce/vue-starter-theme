<template>
  <transition :name="transition">
    <div
      v-if="visible"
      ref="overlay"
      class="sf-overlay"
      :class="[staticClass, className]"
      @click="$emit('click')"></div>
  </transition>
</template>
<script>
export default {
  name: "SfOverlay",
  props: {
    /**
     * Transition effect to apply when overlay visibility is changed
     */
    transition: {
      type: String,
      "default": "sf-fade"
    },
    /**
     * Visibility state
     */
    visible: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    staticClass() {
      return this.$vnode.data.staticClass;
    },
    className() {
      return this.$vnode.data.class;
    }
  }
};
</script>
<style lang="scss">
@import "assets/styles/scss/components/atoms/SfOverlay.scss";
</style>
