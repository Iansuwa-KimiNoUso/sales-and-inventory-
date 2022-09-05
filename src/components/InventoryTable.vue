<template>
  <div class>
    <q-list bordered separator class="rounded-borders">
      <q-item dense class="bg-blue-6">
        <div class="row full-width">
          <div
            v-for="header in headers"
            :class="[header.class, 'text-bold text-white text-capitalize']"
            :key="header.value"
          >
            {{ header.value }}
          </div>
        </div>
      </q-item>
      <div v-if="!isFetchingItems">
        <q-item v-for="(item, index) in items" :key="index">
          <div class="row full-width items-center">
            <div
              v-for="(value, key, itemIndex) in item"
              :class="[
                headers[itemIndex].class,
                'text-bold text-grey-8 text-capitalize overflow-auto',
              ]"
              :key="key"
            >
              <div v-if="isText(key)">
                {{ value }}
              </div>
              <div v-else class="q-pr-lg">
                <q-img
                  fill
                  :src="value"
                  style="height: 140px; max-width: 200px"
                />
              </div>
            </div>
          </div>
        </q-item>
      </div>
      <q-item v-else class="justify-center">
        <q-circular-progress
          indeterminate
          show-value
          font-size="10px"
          class="q-ma-md"
          :value="value"
          size="80px"
          :thickness="0.25"
          color="primary"
          track-color="grey-3"
        >
          <q-avatar size="60px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </q-circular-progress>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import _axios from "src/axios/axios-wrapper";

export default defineComponent({
  name: "InventoryTable",
  data() {
    return {
      headers: [
        {
          value: "id",
          class: "col-1",
        },
        {
          value: "picture",
          class: "col-2",
        },
        {
          value: "name",
          class: "col-2",
        },
        {
          value: "description",
          class: "col",
        },
        {
          value: "price",
          class: "col-1",
        },
      ],
      items: [],

      isFetchingItems: false,
    };
  },

  async mounted() {
    await this.getItems();
  },

  methods: {
    async getItems() {
      this.isFetchingItems = true;

      try {
        const res = await _axios.get("/items", {});

        this.items = res.data;
      } catch (error) {
        console.log("error: ", error);
      }

      this.isFetchingItems = false;
    },

    isText: (key) => {
      return key !== "picture";
    },
  },

  computed: {},
});
</script>
<style lang=""></style>
