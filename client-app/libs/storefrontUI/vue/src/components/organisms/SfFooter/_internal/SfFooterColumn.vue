<template>
  <div class="sf-footer-column">
    <button v-focus
            class="sf-footer-column__title"
            @click="toggle(title)">
      {{ title }}
      <div class="sf-footer-column__chevron">
        <SfChevron :class="{ 'sf-chevron--top': open }"></SfChevron>
      </div>
    </button>
    <transition name="sf-fade">
      <div v-if="open" class="sf-footer-column__content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import { focus } from "../../../../utilities/directives";
import SfChevron from "../../../atoms/SfChevron/SfChevron.vue";
export default {
  name: "SfFooterColumn",
  directives: { focus },
  components: { SfChevron },
  props: {
    title: {
      type: String,
      "default": ""
    }
  },
  computed: {
    open() {
      return this.$parent.isOpen.includes(this.title);
    }
  },
  mounted() {
    this.$parent.items.push(this.title);
  },
  methods: {
    toggle(payload) {
      this.$parent.toggle(payload);
    }
  }
};
</script>
