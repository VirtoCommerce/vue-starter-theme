<template>
  <div
    class="sf-bottom-navigation-item"
    :class="{
      'is-active': isActive,
      'is-floating': isFloating,
      center: !icon || !label,
    }"
    v-on="$listeners">
    <slot name="icon" v-bind="{ icon, iconActive, iconSize, isFloating }">
      <SfCircleIcon
        v-if="isFloating"
        :icon="icon"
        icon-color="white"
        icon-size="28px"
        :aria-label="label"></SfCircleIcon>
      <SfButton
        v-else-if="icon"
        class="sf-button--pure sf-bottom-navigation-item__icon"
        :aria-label="label">
        <SfIcon :icon="currentIcon" :size="iconSize"></SfIcon>
      </SfButton>
    </slot>
    <slot name="label" v-bind="{ label }">
      <div
        v-if="label"
        class="sf-bottom-navigation-item__label"
        :class="{
          'has-margin': icon,
        }">
        {{ label }}
      </div>
    </slot>
  </div>
</template>
<script>
import { focus } from "../../../../utilities/directives";
import SfButton from "../../../atoms/SfButton/SfButton.vue";
import SfCircleIcon from "../../../atoms/SfCircleIcon/SfCircleIcon.vue";
import SfIcon from "../../../atoms/SfIcon/SfIcon.vue";
export default {
  name: "SfBottomNavigationItem",
  directives: { focus },
  components: {
    SfCircleIcon,
    SfIcon,
    SfButton
  },
  props: {
    icon: {
      type: [String, Array],
      "default": ""
    },
    isActive: {
      type: Boolean,
      "default": false
    },
    iconActive: {
      type: String,
      "default": ""
    },
    label: {
      type: String,
      "default": ""
    },
    iconSize: {
      type: String,
      "default": "20px"
    },
    isFloating: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    currentIcon() {
      return this.isActive && this.iconActive ? this.iconActive : this.icon;
    }
  }
};
</script>
