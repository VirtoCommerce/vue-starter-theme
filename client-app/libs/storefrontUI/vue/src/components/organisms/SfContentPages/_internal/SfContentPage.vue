<template>
  <div v-if="isActive" class="sf-content-page">
    <!-- @slot Custom page markup -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "SfContentPage",
  props: {
    /**
     * Page title
     */
    title: {
      type: String,
      "default": ""
    },
    /**
     * Page nav title
     */
    icon: {
      type: [String, Array],
      "default": ""
    }
  },
  inject: ["provided"],
  computed: {
    isActive() {
      return this.provided.active === this.title;
    }
  },
  mounted() {
    const item = {
      title: this.title,
      icon: this.icon
    };
    this.$parent.items.push(item);
  }
};
</script>
