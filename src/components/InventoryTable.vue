<template>
  <div class="q-py-lg text-bold row justify-between full-width items-center">
    <div>INVENTORY MANAGEMENT</div>
    <div class="">
      <q-btn round icon="local_grocery_store">
        <q-badge v-if="cartItemsCount" color="orange" floating rounded>
          {{ cartItemsCount }}
        </q-badge>
        <q-popup-proxy v-model="showCart">
          <q-list>
            <q-item v-for="(value, index) in cartItems" :key="index">
              <q-item-section avatar>
                <q-avatar size="60px">
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-capitalize">
                  {{ value.name }}
                </q-item-label>
                <q-item-label caption> {{ value.description }} </q-item-label>
              </q-item-section>
              <q-item-section side> {{ value.price }} </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>
                  {{ totalText }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  label="checkout"
                  size="sm"
                  color="primary"
                  @click="showCart = !showCart"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </q-btn>
    </div>
  </div>
  <div>
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
      <q-list v-if="!isFetchingItems" separator bordered>
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
                  style="height: 60px; max-width: 120px"
                />
              </div>
            </div>
            <q-btn
              class="col-1"
              icon-right="local_grocery_store"
              label="Add to cart"
              color="primary"
              size="sm"
              @click="addToCart(item)"
            />
          </div>
        </q-item>
      </q-list>
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
        {
          value: "actions",
          class: "col-1 text-center",
        },
      ],
      items: [],
      cartItems: [],
      showCart: false,
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

    addToCart(value) {
      this.cartItems.push(value);
    },

    isText: (key) => {
      return key !== "picture";
    },
  },

  computed: {
    cartItemsCount: function () {
      return this.cartItems.length;
    },
    totalText: function () {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price;
      });
      return `Total: ${total}`;
    },
  },
});
</script>
<style lang=""></style>
