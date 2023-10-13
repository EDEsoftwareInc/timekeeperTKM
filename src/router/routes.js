const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "punch-in-out",
        component: () => import("pages/PunchInOut.vue"),
      },
      {
        path: "schedule",
        component: () => import("src/pages/SchedulePage.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: "/login", component: () => import("src/pages/LoginPage.vue") },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
