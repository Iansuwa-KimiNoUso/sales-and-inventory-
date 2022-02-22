<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sales and Inventory </q-toolbar-title>

        <div>v1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Directories </q-item-label>

        <SideNavigation
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideNavigation from "src/components/SideNavigation.vue";

const linksList = [
  {
    title: "Home",
    caption: "Manage user roles and permissions",
    icon: "home",
    path: "/"
  },
  {
    title: "User management",
    caption: "Manage user roles and permissions",
    icon: "people",
    path: "/user-management"
  },
  {
    title: "Inventory Management",
    caption: "Manage stocks and supplies",
    icon: "inventory",
    path: "/inventory-management"
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    SideNavigation,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
