<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated style="background-color: #004e89">
      <q-toolbar class="q-ma-sm">
        <q-btn
          v-if="$q.screen.lt.md || $q.screen.lt.sm"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
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
            {{ user.user.firstName.charAt(0) + user.user.lastName.charAt(0) }}
          </q-avatar>
          <q-menu>
            <q-card class="flat no-shadow" style="width: 200px; height: 100px">
              <div class="row justify-center q-pt-xl">
                <q-btn @click="logout()" color="primary" label="Logout" />
              </div>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500">
      <q-scroll-area class="fit verti-line">
        <q-list padding class="menu-list">
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="md">
                <q-img src="../assets/bar-chart-outline.svg" />
              </q-icon>
            </q-item-section>

            <q-item-section class="text-font"> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="md">
                <q-img src="../assets/card-outline.svg" />
              </q-icon>
            </q-item-section>

            <q-item-section class="text-font"> Pay </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon class="text-dark" size="md">
                <q-img src="../assets/timer-outline.svg" />
              </q-icon>
            </q-item-section>

            <q-item-section class="text-font"> Time Management </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });
    function logout() {
      $q.localStorage.remove("user");
      window.location.reload();
    }
    return {
      drawer: ref(false),
      user,
      logout,
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
/* .q-item.active {
  color: #004e89;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
} */
</style>
