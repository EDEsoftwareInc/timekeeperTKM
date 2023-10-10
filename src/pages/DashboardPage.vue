<template>
  <q-page>
    <div class="q-ml-xl q-mt-lg text-greeting">{{ greeting }}</div>
    <div class="row justify-end">
      <div class="dateNow row items-center justify-center">
        <q-icon class="text-dark" size="md">
          <img src="~assets/sun.svg" />
        </q-icon>
        <div>{{ formattedDate }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const greeting = ref("Good morning");

    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        greeting.value = "Good morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        greeting.value = "Good afternoon";
      } else {
        greeting.value = "Good evening";
      }
    };
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options);

    onMounted(() => {
      updateGreeting();
    });

    return {
      date: formattedDate,
      formattedDate,
      greeting,
    };
  },
};
</script>
<style>
.text-greeting {
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.dateNow {
  border-radius: 10px;
  background: #d9d9d9;
  width: 100%;
  max-width: 355px;
}
</style>
