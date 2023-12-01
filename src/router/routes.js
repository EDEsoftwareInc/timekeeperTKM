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
      {
        path: "all-employees",
        component: () => import("src/pages/Employees.vue"),
      },
      {
        path: "create-sched",
        component: () => import("src/pages/CreateSchedule.vue"),
      },
      {
        path: "my-team",
        component: () => import("src/pages/MyTeam.vue"),
      },
      {
        path: "org-chart",
        component: () => import("src/pages/OrgChart.vue"),
      },
      {
        path: "task-arranger",
        component: () => import("src/pages/TaskArranger.vue"),
      },
      {
        path: "admin",
        component: () => import("src/pages/Admin.vue"),
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
