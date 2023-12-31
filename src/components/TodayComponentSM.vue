<template>
  <div class="row items-center">
    <div class="col-6">
      <div class="q-mt-lg text-greeting q-ml-lg">{{ greeting }}</div>
      <div class="name q-ml-lg">
        {{ userDashboard.employee_fname }} {{ userDashboard.employee_lname }}
      </div>
    </div>
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-0 col-xs-0"></div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div class="dateNow row items-center q-mt-sm">
        <q-icon
          v-if="greeting === 'Good morning' || greeting === 'Good afternoon'"
          class="text-dark q-ml-sm"
          size="sm"
        >
          <img src="~assets/sun.svg" />
        </q-icon>
        <q-icon
          v-if="greeting === 'Good evening'"
          size="sm"
          name="mdi-weather-night"
        />
        <div class="date-formatted q-ml-sm">
          <span class="colored-day">{{ dayOfWeek }}</span
          >, {{ formattedDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const greeting = ref("Good morning");
    const formattedDate = ref(getFormattedDate());
    const dayOfWeek = ref(getDayOfWeek());
    const userDashboard = ref([]);
    const app = getCurrentInstance().appContext.config.globalProperties;

    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const initials = days.map((day) => day.charAt(0));

    const reorderedInitials = [...initials.slice(1), initials[0]];

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

    function getFormattedDate() {
      const date = new Date();
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    }
    async function getuserDashboard() {
      const config = {
        method: "get",
        url: "http://54.173.81.133:3001/api/v1/users/dashboard",
      };
      try {
        const response = await app.$axios(config);
        userDashboard.value = response.data;

        console.log("response SM", response);
      } catch (error) {
        console.error("Error", error);
      }
    }

    function getDayOfWeek() {
      const date = new Date();
      const options = {
        weekday: "long",
      };
      return date.toLocaleString("en-US", options);
    }

    const intervalId = setInterval(() => {
      formattedDate.value = getFormattedDate();
      dayOfWeek.value = getDayOfWeek();
      updateGreeting();
    }, 1000);

    onMounted(() => {
      updateGreeting();
      getuserDashboard();
    });
    return {
      formattedDate,
      greeting,
      dayOfWeek,
      reorderedInitials,
      user,
      userDashboard,
      getuserDashboard,
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
.name {
  color: #004e89;
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
  /* max-width: 370px; */
  height: 40px;
  inline-size: fit-content;
  padding-right: 15px;
}
.date-formatted {
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.colored-day {
  color: #004e89;
}
</style>
