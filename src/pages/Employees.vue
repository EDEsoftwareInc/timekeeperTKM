<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="body">
    <div v-if="!$q.screen.sm || !$q.screen.sm" class="display-web">
      <TodayComponent />
    </div>
  </q-page>
</template>

<script setup>
import TodayComponent from "src/components/TodayComponent.vue";
</script>