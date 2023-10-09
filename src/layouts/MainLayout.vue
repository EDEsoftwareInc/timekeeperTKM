<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated style="background-color: #004e89">
      <q-toolbar class="q-ma-xs">
        <q-btn
          v-if="$q.screen.lt.md || $q.screen.lt.sm"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title class="q-ml-md q-mr-md">
          <q-img
            clickable
            src="../assets/logo.png"
            style="width: 152px; height: 36px; cursor: pointer"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500">
      <q-scroll-area class="fit verti-line">
        <q-list padding class="menu-list">
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-img
                src="../assets/bar-chart-outline.png"
                style="width: 28px; height: 16px"
              />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-img
                src="../assets/card-outline.png"
                style="width: 28px; height: 23px"
              />
            </q-item-section>

            <q-item-section> Pay </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-img
                src="../assets/timer-outline.png"
                style="width: 28px; height: 25px"
              />
            </q-item-section>

            <q-item-section> Time Management </q-item-section>
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
import { ref } from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
.verti-line {
  border-right: 2px solid #fafafa;
}
</style>
