<template>
  <q-page v-if="!$q.screen.sm">
    <TodayComponent />
    <!-- <div class="row">
      <div class="col-12">
        <div class="q-mt-lg text-greeting q-ml-xl">{{ greeting }}</div>
        <div class="name q-ml-xl">
          {{ user.user.firstName }} {{ user.user.lastName }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12"></div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
    <div class="row justify-center q-mt-lg q-mb-xl">
      <Carousel />
    </div>
    <div class="row items-center add-marginTop">
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <p class="weekly-sched q-ml-xl q-mb-none">Current Week Schedule</p>
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
        </div>
      </div>
      <q-dialog v-model="showShed">
        <q-card>
          <q-card-section>
            <span class="text-h5 shed-text">Schedule</span>
            <div class="sched-desc">
              Review upcoming work shifts that you are scheduled for over the
              next 14 day.
            </div>
            <label class="date-label q-mt-md">October 01-07</label>
            <q-card-actions
              class="shed-card row"
              v-for="(item, key) in attendance"
              :key="key"
            >
              <div class="day-date-shed q-mr-lg col-3">
                <q-label class="text-overline text-weight-bold"
                  >{{ key }} </q-label
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
      </q-dialog>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <q-btn
          unelevated
          class="btn-color-text q-px-md q-ml-xl"
          rounded
          label="Show Schedule"
          @click="showShed = true"
        />
      </div>
    </div>
    <div class="row marginLeftRightTop">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/time-outline.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">Latest Punch-Out</div>
            <div class="timer">08h 00m 00s</div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/timer-outline.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">Total Time Session</div>
            <div class="timer">48h 00m 00s</div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/Vector.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">PTO Balance</div>
            <div class="timer">50h 00m 00s</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-if="$q.screen.sm">
    <TodayComponentSM />
    <!-- <div class="row items-center">
      <div class="col-6">
        <div class="q-mt-lg text-greeting q-ml-lg">{{ greeting }}</div>
        <div class="name q-ml-lg">
          {{ user.user.firstName }} {{ user.user.lastName }}
        </div>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8"></div>
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
    </div> -->
    <div class="row justify-center q-mt-lg q-mb-xl">
      <Carousel />
    </div>
    <div class="row items-center add-marginTop">
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-xs-12">
        <p class="weekly-sched-tablet q-ml-xl q-mb-none">
          Current Week Schedule
        </p>
        <div class="row justify-between items-center">
          <div class="day-initials-tablet row">
            <div
              v-for="(initial, index) in reorderedInitials"
              :key="index"
              class="day-initial-tablet"
              :class="{
                'monday-color': index === 0,
                'tuesday-color': index === 1,
              }"
            >
              {{ initial }}
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="showShed">
        <q-card>
          <q-card-section>
            <span class="text-h5 shed-text">Schedule</span>
            <div class="sched-desc">
              Review upcoming work shifts that you are scheduled for over the
              next 14 day.
            </div>
            <label class="date-label q-mt-md">October 01-07</label>
            <q-card-actions
              class="shed-card row"
              v-for="(item, key) in attendance"
              :key="key"
            >
              <div class="day-date-shed q-mr-lg col-3">
                <q-label class="text-overline text-weight-bold"
                  >{{ key }} </q-label
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
      </q-dialog>
      <div
        class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12 d-flex justify-end"
      >
        <q-btn
          unelevated
          @click="showShed = true"
          class="btn-color-text-tablet"
          rounded
          label="Show Schedule"
        >
        </q-btn>
      </div>
    </div>

    <div class="row marginLeftRightTop">
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/time-outline.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">Latest Punch-Out</div>
            <div class="timer">08h 00m 00s</div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/timer-outline.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">Total Time Session</div>
            <div class="timer">48h 00m 00s</div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div class="grey-card">
          <q-icon size="xl">
            <q-img src="../assets/Vector.svg" />
          </q-icon>
          <div class="text-timerMargin">
            <div class="text-timer">PTO Balance</div>
            <div class="timer">50h 00m 00s</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Carousel from "src/components/CarouselComponent.vue";
import { useQuasar } from "quasar";
import attendance from "../provider/attendance.json";
import TodayComponentSM from "src/components/TodayComponentSM.vue";
import TodayComponent from "src/components/TodayComponent.vue";

export default {
  components: {
    Carousel,
    TodayComponent,
    TodayComponentSM,
  },
  setup() {
    const attendanceApi = attendance;
    const showShedModel = ref(false);
    const $q = useQuasar();
    const greeting = ref("Good morning");
    const formattedDate = ref(getFormattedDate());
    const dayOfWeek = ref(getDayOfWeek());

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

    const isSameWeek = (date1, date2) => {
      // Implement the logic to check if two dates fall in the same week
      // You can use date-fns or other date manipulation libraries for this
      return false; // Replace this with your logic
    };

    onMounted(() => {
      updateGreeting();
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      formattedDate,
      showShedModel,
      attendance,
      attendanceApi,
      showShed: ref(false),
      greeting,
      dayOfWeek,
      reorderedInitials,
      user,
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
.name {
  color: #004e89;
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
.colored-day {
  color: #004e89;
}
.weekly-sched {
  color: #000;
  font-family: Nunito;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.weekly-sched-tablet {
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}

.day-initials {
  display: flex;
  flex-direction: row; /* Display as a row */
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
  margin-left: 60px;
}

.day-initials-tablet {
  display: flex;
  flex-direction: row; /* Display as a row */
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
  margin-left: 60px;
}
.day-initial {
  color: #000;
  font-family: Nunito;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 10px;
}
.day-initial-tablet {
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
.btn-color-text {
  color: var(--labels-primary, #fff);
  text-align: center;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 225px;
  background: #094267 !important;
  text-transform: initial;
}
.btn-color-text-tablet {
  color: var(--labels-primary, #fff);
  text-align: center;
  font-family: Nunito;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 190px; /* Add unit, e.g., px */
  height: 35px; /* Add unit, e.g., px */
  background: #094267 !important;
  text-transform: initial;
  margin-left: auto;
}
.add-marginTop {
  margin-top: 90px;
  font-family: Nunito;
}
.grey-card {
  border-radius: 15px;
  background: #d9d9d9;
  margin-inline: auto;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-right: 20px;
}
.marginLeftRightTop {
  margin-left: 75px;
  margin-right: 75px;
  margin-top: 40px;
}
.text-timer {
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.timer {
  color: #000;
  font-family: Nunito;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.text-timerMargin {
  margin-left: 18px;
  font-family: Nunito;
}

/* Media query for tablet and smaller screens */
@media (max-width: 768px) {
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
