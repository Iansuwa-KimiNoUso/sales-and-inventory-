import MainLayout from 'layouts/MainLayout.vue'
import InventoryManagement from 'pages/InventoryManagement'
import UserManagement from "pages/UserManagement";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/inventory-management",
    component: MainLayout,
    children: [{ path: "", component: InventoryManagement }],
  },
  {
    path: "/user-management",
    component: MainLayout,
    children: [{ path: "", component: UserManagement }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
