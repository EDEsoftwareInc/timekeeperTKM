<template>
  <q-page v-if="!$q.screen.sm" class="body">
    <TodayComponent />
    <!-- <div class="row" hidden>
      <div class="col-12">
        <div class="q-mt-lg text-greeting q-ml-lg">{{ greeting }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-7 q-ml-lg text-h6 name">{{ name }}</div>
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
    </div> -->
    <q-card>
      <q-card-section>
        <span class="text-h5 shed-text">Schedule</span>
        <div class="sched-desc">
          Review upcoming work shifts that you are scheduled for over the next
          14 day.
        </div>
        <label class="date-label q-mt-md">October 01-07</label>
        <q-card-actions
          class="shed-card row"
          v-for="(item, key) in attendance"
          :key="key"
        >
          <div class="day-date-shed q-mr-lg col-3">
            <q-label class="text-overline text-weight-bold">{{ key }} </q-label
            ><br />
            <q-label class="text-weight-medium">{{ item.day }}</q-label>
          </div>

          <div class="day-date-shed q-ml-lg col-3">
            <q-label class="text-overline label-sched">In </q-label><br />
            <q-label class="text-weight-medium"> {{ item.in }}</q-label>
          </div>
          <div class="day-date-shed q-ml-lg col-3">
            <q-label class="text-overline label-sched">Out</q-label><br />
            <q-label class="text-weight-medium"> {{ item.out }}</q-label>
          </div>

          <div class="day-date-shed q-ml-lg col-3">
            <q-label class="text-overline label-sched">Total</q-label><br />
            <q-label class="text-weight-medium"> 8 hours</q-label>
          </div>

          <!-- <q-item>In</q-item>
              <q-item class="text-overline">
                <br />
                {{ item.in }}
              </q-item>
              <q-item class="text-overline"
                >Out <br />
                {{ item.out }}</q-item
              >
              <q-item class="text-overline"
                >Total <br />
                8 hours</q-item
              > -->
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
  <q-page v-if="$q.screen.sm">
    <TodayComponentSM />
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useQuasar } from "quasar";
import TodayComponent from "src/components/TodayComponent.vue";
import TodayComponentSM from "src/components/TodayComponentSM.vue";
import attendance from "../provider/attendance.json";

export default {
  components: {
    TodayComponent,
    TodayComponentSM,
  },
  setup() {
    const greeting = ref("Good morning");
    const formattedDate = ref(getFormattedDate());
    const dayOfWeek = ref(getDayOfWeek());
    const name = ref("");
    const $q = useQuasar();
    const punch = ref(false);
    const yesterdayIn = ref("8:50 pm");
    const yesterdayOut = ref("6:50 am");
    const attendanceApi = attendance;

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

    const getFormattedDate1 = (year, month, day) => {
      const formattedMonth = String(month).padStart(2, "0");
      const formattedDay = String(day).padStart(2, "0");
      return `${year}/${formattedMonth}/${formattedDay}`;
    };
    const reorderedInitials = [...initials.slice(1), initials[0]];
    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });

    name.value = user.value.user.firstName + " " + user.value.user.lastName;

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
    const pucnhIn = () => {};

    onMounted(() => {
      updateGreeting();
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      attendanceApi,
      attendance,
      formattedDate,
      greeting,
      dayOfWeek,
      reorderedInitials,
      name,
      punch,
      pucnhIn,
      yesterdayIn,
      yesterdayOut,
      getFormattedDate1,
      year: 2023,
      month: 2,
      daysInMonth: 28, // Replace with the actual number of days in the month
      scheduleOfWork: [
        {
          date: "2023/02/13",
          chips: [
            { label: name.value, color: "red", textColor: "white" },
            { label: name.value, color: "blue", textColor: "white" },
          ],
        },
        {
          date: "2023/02/15",
          chips: [{ label: name.value, color: "green", textColor: "white" }],
        },
        {
          date: "2023/02/23",
          chips: [{ label: name.value, color: "orange", textColor: "black" }],
        },
        {
          date: "2023/02/25",
          chips: [{ label: name.value, color: "purple", textColor: "white" }],
        },
      ],
    };
  },
};
</script>

<style>
.body {
  font-family: Nunito;
}
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
/* .dateNow {
  border-radius: 10px;
  background: #d9d9d9;
  width: 100%;
  max-width: 440px;
  height: 40px;
} */

.name {
  color: #004e89;
}
.btn-punch-in {
  background-color: #004e89;
  height: 56px;
  width: 152px;
  color: #ffffff;
  border-radius: 50px;
}
.custom-calendar {
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
}
.calendar-day {
  border: 1px solid #e5e5e5;
  padding: 10px;
  width: calc(100% / 7 - 20px);
  box-sizing: border-box;
  border-radius: 5px;
  margin: 5px;
}
.day-label {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
}
.work-schedule {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.shed-card {
  border-bottom: 0.5px solid #545563;
  padding: 0px;
  margin: 0px;
  font-family: Nunito;
}
.day-date-shed {
  padding: 0px;
  margin: 0px;
  font-family: Nunito;
}
.label-sched {
  font-size: 12px;
  color: #545563;
  align-self: center;
  font-family: Nunito;
}
.shed-text {
  font-family: Nunito;
  font-weight: bold;
}
.sche-desc {
  font-family: Nunito;
}
.date-label {
  font-family: Nunito;
  font-weight: bold;
  font-size: medium;
}
</style>
