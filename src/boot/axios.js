import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: "https://api.example.com" });

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  router.beforeEach(async (to, from, next) => {
    const user = LocalStorage.getItem("user");
    console.log("USER", user);
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !user) {
      next("/login"); // Redirect to the login page if authentication is required but the user is not authenticated.
    } else if (!requiresAuth && user) {
      next("/dashboard"); // Redirect to the dashboard if the user is authenticated but trying to access a non-authenticated route.
    } else {
      next(); // Continue navigation for all other cases.
    }
  });
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
