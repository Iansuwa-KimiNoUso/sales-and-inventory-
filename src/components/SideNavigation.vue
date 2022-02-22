<template>
  <q-item :to="path">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import router from "src/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideNavigation",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    path: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {

  }
});
</script>
