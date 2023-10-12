<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <div class="q-mt-lg text-greeting q-ml-xl">{{ greeting }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
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
    <div class="row justify-center q-mt-lg">
      <Carousel />
    </div>
    <div class="row q-mt-xl">
      <div class="col-1"></div>
      <div class="col-11">
        <p class="weekly-sched">Weekly Schedule</p>
        <div class="row justify-between items-center">
          <div class="day-initials row">
            <div
              v-for="(initial, index) in reorderedInitials"
              :key="index"
              class="day-initial"
              :class="{
                'monday-color': index === 0,
                'tuesday-color': index === 1,
              }"
            >
              {{ initial }}
            </div>
          </div>
          <div class="col-4">
            <q-btn
              unelevated
              size="md"
              class="btn-color-text q-px-md"
              icon="schedule"
              rounded
              label="Show Schedule"
              style="background: #094267 !important; text-transform: initial"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Carousel from "src/components/CarouselComponent.vue";

export default {
  components: {
    Carousel,
  },
  setup() {
    const greeting = ref("Good morning");
    const formattedDate = ref(getFormattedDate());
    const dayOfWeek = ref(getDayOfWeek());

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

    console.log("reorderedInitials", reorderedInitials);

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
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      formattedDate,
      greeting,
      dayOfWeek,
      reorderedInitials,
    };
  },
};
</script>

<style>
.date-formatted {
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
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
  height: 40px;
}
.colored-day {
  color: #004e89;
}
.weekly-sched {
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.day-initials {
  display: flex;
  flex-direction: row; /* Display as a row */
  justify-content: space-between;
  width: 100%;
  max-width: 150px; /* Adjust the width as needed */
}

.day-initial {
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 10px;
}
.monday-color {
  color: #004e89;
}

.tuesday-color {
  color: #004e89;
}
.btn-color-text {
  color: var(--labels-primary, #fff);
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
