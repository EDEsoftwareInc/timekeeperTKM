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
            style="cursor: pointer; width: 200px; height: 50px"
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
      :width="327"
      :breakpoint="768"
    >
      <q-scroll-area class="fit verti-line">
        <q-list padding class="menu-list">
          <router-link style="text-decoration: none" to="/dashboard">
            <q-item
              clickable
              v-ripple
              :active="link === 'dashboard'"
              @click="link = 'dashboard'"
              active-class="my-menu-link"
            >
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

          <router-link style="text-decoration: none" to="/">
            <q-item
              clickable
              v-ripple
              :active="link === 'pay'"
              @click="link = 'pay'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/card-outline.svg" />
                </q-icon>
              </q-item-section>
              <q-item-section class="text-font"> Pay </q-item-section>
            </q-item>
          </router-link>
          <q-item
            clickable
            v-ripple
            :active="link === 'time'"
            @click="link = 'time'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon class="text-dark" size="md">
                <q-img src="../assets/timer.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-font" @click="toggleSubList">
              Time Management
            </q-item-section>
          </q-item>
          <q-list v-if="showSubList" padding>
            <q-item
              clickable
              v-ripple
              to="/punch-in-out"
              :active="link === 'punch-in-out'"
              @click="link = 'punch-in-out'"
              active-class="my-menu-link"
            >
              <q-item-section class="q-ml-md" avatar>
                <q-icon class="text-dark" size="md"> </q-icon>
              </q-item-section>
              <q-item-section> Punch In/Out</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/schedule"
              :active="link === 'schedule'"
              @click="link = 'schedule'"
              active-class="my-menu-link"
            >
              <q-item-section class="q-ml-md" avatar>
                <q-icon class="text-dark" size="md"> </q-icon>
              </q-item-section>
              <q-item-section> Schedule </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/"
              :active="link === 'create-schedule'"
              @click="link = 'create-schedule'"
              active-class="my-menu-link"
            >
              <q-item-section class="q-ml-md" avatar>
                <q-icon class="text-dark" size="md"> </q-icon>
              </q-item-section>
              <q-item-section> Create Schedule </q-item-section>
            </q-item>
          </q-list>

          <router-link style="text-decoration: none" to="/">
            <q-item
              clickable
              v-ripple
              :active="link === 'employee'"
              @click="link = 'employee'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/icon_group.svg" />
                </q-icon>
              </q-item-section>

              <q-item-section class="text-font" @click="toggleSubListEmployee">
                Employee
              </q-item-section>
            </q-item>
            <q-list v-if="showSubListEmp" padding>
              <q-item
                clickable
                v-ripple
                to="/"
                :active="link === 'my-team'"
                @click="link = 'my-team'"
                active-class="my-menu-link"
              >
                <q-item-section class="q-ml-md" avatar>
                  <q-icon class="text-dark" size="md"> </q-icon>
                </q-item-section>
                <q-item-section> My Team</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                to="/"
                :active="link === 'all-employee'"
                @click="link = 'all-employee'"
                active-class="my-menu-link"
              >
                <q-item-section class="q-ml-md" avatar>
                  <q-icon class="text-dark" size="md"> </q-icon>
                </q-item-section>
                <q-item-section> All Employee </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                to="/"
                :active="link === 'org-chart'"
                @click="link = 'org-chart'"
                active-class="my-menu-link"
              >
                <q-item-section class="q-ml-md" avatar>
                  <q-icon class="text-dark" size="md"> </q-icon>
                </q-item-section>
                <q-item-section> Org Chart</q-item-section>
              </q-item>
            </q-list>
          </router-link>
          <router-link style="text-decoration: none" to="/">
            <q-item
              clickable
              v-ripple
              :active="link === 'task-arranger'"
              @click="link = 'task-arranger'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/icon_tasklist.svg" />
                </q-icon>
              </q-item-section>

              <q-item-section class="text-font"> Task Arranger </q-item-section>
            </q-item>
          </router-link>
          <router-link style="text-decoration: none" to="/">
            <q-item
              clickable
              :active="link === 'admin'"
              @click="link = 'admin'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon size="md">
                  <q-img src="../assets/icon_settings.svg" />
                </q-icon>
              </q-item-section>

              <q-item-section class="text-font"> Admin </q-item-section>
            </q-item>
          </router-link>
        </q-list>
        <q-img src="../assets/dashboad-buttom-logo.png" class="drawer-logo" />
      </q-scroll-area>
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
    const showSubListEmp = ref(false);
    const userDashboard = ref([]);
    const app = getCurrentInstance().appContext.config.globalProperties;
    // const linksList = [
    //   {
    //     title: "Dashboard",
    //     icon: "http://localhost:9000/src/assets/card-outline.svg",
    //     path: "/dashboard",
    //   },
    //   {
    //     title: "Pay",
    //     icon: "http://localhost:9000/src/assets/card-outline.svg",
    //     path: "/",
    // ];

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
      console.log("TESTS");
      showSubList.value = !showSubList.value;
    };

    const toggleSubListEmployee = () => {
      showSubListEmp.value = !showSubListEmp.value;
    };
    onMounted(() => {
      getuserDashboard();
    });
    return {
      drawer: ref($q.screen.sm ? false : true),
      user,
      logout,
      showSubList,
      link: ref("dashboard"),
      // linksList,
      toggleSubList,
      userDashboard,
      getuserDashboard,
      toggleSubListEmployee,
      showSubListEmp,
    };
  },
};
</script>
<style>
.my-menu-link {
  background-color: #3baacf;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  /* background: #26A69A; */
}
.verti-line {
  border: 2px solid #fafafa;
  background: var(--labels-primary, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
/*
.menu-list.q-item.q-item--active {
  color: #004e89;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
} */

.q-item {
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
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
  bottom: -10px; /* Adjust as necessary */
  transform: translateX(-50%);
  max-height: 133px;
  left: 10%;
  max-width: 133px;
}

i.q-icon.notranslate.material-icons {
  font-size: 30px;
}
</style>
