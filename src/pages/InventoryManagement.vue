<template>
  <div class="q-pa-lg">
    <InventoryTable />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import InventoryTable from "components/InventoryTable.vue";

export default defineComponent({
  name: "InventoryManagement",
  components: {
    InventoryTable,
  },
});
</script>
<style lang=""></style>
