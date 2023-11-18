<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated style="background-color: #004e89">
      <q-toolbar class="q-ma-sm">
        <q-btn
          class="burger-btn"
          v-if="$q.screen.lt.md || $q.screen.lt.sm"
          flat
          @click="drawer = !drawer"
          round
          dense
          size="md"
        >
          <q-icon name="menu" style="font-size: 30px"></q-icon>
        </q-btn>
        <q-toolbar-title class="q-mr-md">
          <q-img
            clickable
            src="../assets/tkm-logo.svg"
            style="cursor: pointer; width: 152px; height: 36px"
          />
        </q-toolbar-title>
        <q-btn class="q-mr-md" round flat>
          <q-avatar
            text-color="white"
            style="background-color: #3baacf !important"
          >
            {{ userDashboard.employee_fname + userDashboard.employee_lname }}
          </q-avatar>
          <q-menu>
            <q-card class="flat no-shadow" style="width: 200px; height: 100px">
              <div class="row justify-center q-pt-sm">
                <q-btn
                  @click="logout()"
                  icon="settings"
                  label="Manage Account"
                />
                <q-btn
                  @click="logout()"
                  icon="logout"
                  label="Sign-Out"
                  class="q-mt-sm"
                />
              </div>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="custom-drawer"
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="768"
    >
      <q-scroll-area class="fit verti-line">
        <q-list padding class="menu-list">
          <router-link
            style="text-decoration: none"
            to="/dashboard"
            active-class="active"
          >
            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/bar-chart-outline.svg" />
                </q-icon>
              </q-item-section>

              <q-item-section class="text-font nav-title">
                Dashboard
              </q-item-section>
            </q-item>
          </router-link>

          <router-link
            style="text-decoration: none"
            to="/pay"
            active-class="active"
          >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/card-outline.svg" />
                </q-icon>
              </q-item-section>

              <q-item-section class="text-font"> Pay </q-item-section>
            </q-item>
          </router-link>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon class="text-dark" size="md">
                <q-img src="../assets/timer-outline.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-font" @click="toggleSubList">
              Time Management
            </q-item-section>
          </q-item>
          <q-list
            align="center"
            v-if="showSubList"
            padding
            class="sub-list q-mr-lg"
          >
            <q-item clickable v-ripple to="/punch-in-out" active-class="active">
              <q-item-section> Punch In/Out</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/schedule" active-class="active">
              <q-item-section> Schedule </q-item-section>
            </q-item>
          </q-list>
        </q-list>
      </q-scroll-area>
      <q-img src="../assets/dashboad-buttom-logo.png" class="drawer-logo" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const showSubList = ref(false);
    const userDashboard = ref([]);
    const app = getCurrentInstance().appContext.config.globalProperties;

    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });
    async function getuserDashboard() {
      const config = {
        method: "get",
        url: "http://54.173.81.133:3001/api/v1/users/dashboard",
      };
      try {
        const response = await app.$axios(config);
        userDashboard.value = response.data;
      } catch (error) {
        console.error("Error", error);
      }
    }

    function logout() {
      $q.localStorage.remove("user");
      window.location.reload();
    }
    const toggleSubList = () => {
      showSubList.value = !showSubList.value;
    };
    onMounted(() => {
      getuserDashboard();
    });
    return {
      drawer: ref($q.screen.sm ? false : true),
      user,
      logout,
      showSubList,
      toggleSubList,
      userDashboard,
      getuserDashboard,
    };
  },
};
</script>

<style scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
.verti-line {
  border: 2px solid #fafafa;
  background: var(--labels-primary, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.q-item.q-router-link--active,
.q-item--active {
  color: #004e89;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.q-item {
  color: #000;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
/* Add this CSS to remove the underline */
router-link {
  text-decoration: none !important;
}
.nav-title {
  text-decoration: none !important;
}
.sub-list {
  margin-left: 40px; /* Adjust the indentation as needed */
}
.custom-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.drawer-logo {
  position: absolute;
  bottom: -30px; /* Adjust as necessary */
  transform: translateX(-50%);
  max-height: 133px;
  left: 10%;
  max-width: 133px;
}
i.q-icon.notranslate.material-icons {
  font-size: 30px;
}
</style>
