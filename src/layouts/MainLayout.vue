<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated style="background-color: #ffffff">
      <q-toolbar class="q-ma-sm">
        <!-- <q-btn
          class="burger-btn"
          v-if="$q.screen.lt.md || $q.screen.lt.sm"
          flat
          @click="drawer = !drawer"
          round
          dense
          size="md"
          style="color: #094267"
        >
          <q-icon name="menu" style="font-size: 30px"></q-icon>
        </q-btn>
        <q-btn
          class="burger-btn"
          v-else
          flat
          @click="drawer = !drawer"
          round
          dense
          size="md"
          style="color: #094267"
        >
          <q-icon name="menu" style="font-size: 30px"></q-icon>
        </q-btn> -->
        <q-toolbar-title class="q-mr-md">
          <q-img
            clickable
            src="~assets/logo.png"
            style="cursor: pointer; width: 270px; height: 65px"
          />
        </q-toolbar-title>
        <q-btn-dropdown round flat style="size: 15px" color="primary" no-caps>
          <template v-slot:label>
            <q-btn round flat>
              <q-avatar class="round-icon-name" text-color="white">
                {{
                  userDashboard?.employee_fname
                    ? userDashboard.employee_fname.charAt(0)
                    : ""
                }}
                {{
                  userDashboard?.employee_lname
                    ? userDashboard.employee_lname.charAt(0)
                    : ""
                }}</q-avatar
              >
            </q-btn>
          </template>

          <q-list style="min-width: 300px">
            <q-item class="q-pa-md">
              <q-item-section class="text-center">
                <q-item-label>
                  <q-avatar size="72px">
                    <q-icon
                      color="primary"
                      size="72px"
                      name="mdi-account-circle"
                    />
                  </q-avatar>
                  <div class="text-h6">
                    {{ userDashboard?.employee_fname }}
                    {{ userDashboard?.employee_lname }}
                  </div>
                  <div class="text-body2">
                    Employee ID: {{ userDashboard?.employee_fname }}
                    {{ userDashboard?.employee_lname }}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item clickable v-ripple v-close-popup>
              <q-item-section side>
                <q-icon name="mdi-account-outline"></q-icon>
              </q-item-section>
              <q-item-section clickable>
                <q-item-label> Manage account </q-item-label>
              </q-item-section>
            </q-item>

            <q-item @click="logout()" clickable v-ripple v-close-popup>
              <q-item-section side>
                <q-icon name="mdi-logout"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label> Log Out </q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense>
              <q-item-section>
                <q-item-label class="text-right">
                  Tkm version : 1.1.0
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="500"
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit verti-line">
        <q-list style="display: flex; flex-direction: column">
          <template v-for="(item, index) in user.role_features">
            <template v-if="!item.sublists">
              <router-link
                :to="item.route"
                style="text-decoration: none"
                :key="item.name"
              >
                <q-item
                  clickable
                  v-ripple
                  :active="link === item.name.toLowerCase()"
                  @click="link = item.name.toLowerCase()"
                  :class="{ 'my-menu-link': link === item.name.toLowerCase() }"
                >
                  <q-item-section avatar>
                    <q-icon class="material-symbols-outlined" size="lg">
                      <!-- <q-img
                        v-if="link === item.name.toLowerCase()"
                        :src="item.icon"
                      /> -->
                      <q-img :src="item.icon" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section class="text-font">
                    {{ item.name }}
                  </q-item-section>
                </q-item>
              </router-link>
            </template>
            <template v-else>
              <div :key="item.name">
                <!-- Main item -->
                <q-item
                  clickable
                  v-ripple
                  @click="toggleMenu(index)"
                  :class="{ 'my-menu-link': menuOpen[index] }"
                >
                  <q-item-section avatar>
                    <q-icon class="material-symbols-outlined" size="lg">
                      <!-- <q-img
                        v-if="link === item.name.toLowerCase()"
                        :src="item.icon"
                      /> -->
                      <q-img :src="item.icon" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section class="text-font">
                    {{ item.name }}
                  </q-item-section>
                  <q-item-section side>
                    <q-icon
                      :name="
                        menuOpen[index] ? 'arrow_drop_up' : 'arrow_drop_down'
                      "
                    ></q-icon>
                  </q-item-section>
                </q-item>

                <!-- Submenu -->
                <div v-if="menuOpen[index]">
                  <router-link
                    v-for="subItem in item.sublists"
                    :key="subItem.name"
                    :to="subItem.route"
                    style="text-decoration: none"
                  >
                    <q-item
                      clickable
                      v-ripple
                      :active="link === subItem.name.toLowerCase()"
                      @click="link = subItem.name.toLowerCase()"
                      active-class="my-menu-link"
                    >
                      <q-item-section avatar> </q-item-section>
                      <q-item-section class="text-font">
                        {{ subItem.name }}
                      </q-item-section>
                    </q-item>
                  </router-link>
                </div>
              </div>
            </template>
          </template>
        </q-list>

        <q-img src="../assets/dashboad-buttom-logo.png" class="drawer-logo" />
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          style="color: white; background-color: #094267"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
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
    const miniState = ref(false);
    const showSubList = ref(false);
    const showSubListEmp = ref(false);
    const userDashboard = ref([]);
    const app = getCurrentInstance().appContext.config.globalProperties;

    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });
    const menuOpen = ref(Array(user.value.role_features.length).fill(false));
    console.log("USER main", user);
    async function getuserDashboard() {
      const config = {
        method: "get",
        url: "http://54.173.81.133:3001/api/v1/users/dashboard",
      };
      try {
        const response = await app.$axios(config);
        userDashboard.value = response.data;
        console.log("userDashboard", userDashboard.value.employee_lname);
      } catch (error) {
        console.error("Error", error);
      }
    }
    const toggleMenu = (index) => {
      menuOpen.value[index] = !menuOpen.value[index];
    };

    function logout() {
      $q.localStorage.remove("user");
      window.location.reload();
    }
    const toggleSubList = () => {
      showSubList.value = !showSubList.value;
    };

    const toggleSubListEmployee = () => {
      showSubListEmp.value = !showSubListEmp.value;
    };
    onMounted(() => {
      getuserDashboard();
    });
    return {
      toggleMenu,
      drawer: ref($q.screen.sm ? false : true),
      user,
      logout,
      showSubList,
      link: ref("dashboard"),
      toggleSubList,
      userDashboard,
      getuserDashboard,
      toggleSubListEmployee,
      showSubListEmp,
      miniState,
      menuOpen,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
};
</script>
<style>
.my-menu-link {
  background-color: #004e89;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #ffffff !important;
}
.verti-line {
  border: 2px solid #fafafa;
  background: var(--labels-primary, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.q-item {
  color: #000;
  font-family: Inter;
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
.mild-shadow {
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  transition: box-shadow 0.4s;
}
.round-icon-name {
  background-color: #004e89;
  color: #ffffff;
}
</style>
