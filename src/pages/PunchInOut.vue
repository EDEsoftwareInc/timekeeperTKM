<template>
  <q-page class="body">
    <div v-if="!$q.screen.sm || !$q.screen.sm" class="display-web">
      <TodayComponent />

      <div class="q-ma-lg">
        <q-btn
          v-if="!punch"
          @click="pucnhIn"
          no-caps
          class="btn-punch-in"
          label="Punch In"
        />
        <q-btn
          v-if="punch"
          @click="pucnhOut()"
          class="btn-punch-out"
          label="Punch-In"
        />
      </div>
      <div>
        <q-card class="yesterday q-pa-sm">
          <q-item>
            <q-item-section avatar align="center q-mb-sm">
              <img src="../assets/calendar-yesterday.png" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="yesterday-label">Yesterday</q-item-label>
              <q-item-label class="in-out"
                >{{ yesterdayIn }} <q-icon name="arrow_right_alt" />{{
                  yesterdayOut
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section align="right">
              <item-label
                ><q-img
                  class="refresh"
                  src="../assets/refresh-circle-sharp.png"
              /></item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <div v-else-if="$q.screen.md" class="display-tablet">
      <TodayComponentSM />
      <div class="q-ma-lg">
        <q-btn
          v-if="!punch"
          @click="pucnhIn"
          no-caps
          class="btn-punch-in-tablet"
          label="Punch In"
        />
        <q-btn
          v-if="punch"
          @click="pucnhOut()"
          class="btn-punch-out"
          label="Punch-In"
        />
      </div>
      <div>
        <q-card class="yesterday-tablet q-pb-lg">
          <q-item class="q-pt-md">
            <q-item-section avatar align="center q-mt-sm q-mb-md">
              <img src="../assets/calendar-yesterday-tablet.png" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="yesterday-label-tablet"
                >Yesterday</q-item-label
              >
              <q-item-label class="in-out-tablet"
                >{{ yesterdayIn }} <q-icon name="arrow_right_alt" />{{
                  yesterdayOut
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section align="right">
              <item-label
                ><q-img
                  class="refresh"
                  src="../assets/refresh-circle-sharp.png"
              /></item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <div v-else-if="$q.screen.sm" class="display-tablet">
      <TodayComponentSM />
      <div class="q-ma-lg">
        <q-btn
          v-if="!punch"
          @click="pucnhIn"
          no-caps
          class="btn-punch-in-tablet"
          label="Punch In"
        />
        <q-btn
          v-if="punch"
          @click="pucnhOut()"
          class="btn-punch-out"
          label="Punch-In"
        />
      </div>
      <div>
        <q-card class="yesterday-tablet">
          <q-item>
            <q-item-section avatar align="center\q-mt-sm q-mb-md">
              <img
                class="calendar-img"
                src="../assets/calendar-yesterday.png"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="yesterday-label-tablet"
                >Yesterday</q-item-label
              >
              <q-item-label class="in-out-tablet"
                >{{ yesterdayIn }} <q-icon name="arrow_right_alt" />{{
                  yesterdayOut
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section align="right">
              <item-label
                ><q-img
                  class="refresh"
                  src="../assets/refresh-circle-sharp.png"
              /></item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useQuasar } from "quasar";
import TodayComponentSM from "src/components/TodayComponentSM.vue";
import TodayComponent from "src/components/TodayComponent.vue";

export default {
  components: {
    TodayComponentSM,
    TodayComponent,
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
    const user = computed(() => {
      return $q.localStorage.getItem("user");
    });

    // name.value = user.value.user.firstName + " " + user.value.user.lastName;

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
      formattedDate,
      greeting,
      dayOfWeek,
      reorderedInitials,
      name,
      punch,
      pucnhIn,
      yesterdayIn,
      yesterdayOut,
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
.btn-punch-in-tablet {
  background-color: #004e89;
  height: 48px;
  width: 152px;
  color: #ffffff;
  border-radius: 50px;
  flex-shrink: 0;
  font-family: Nunito;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.btn-punch-out {
  background-color: #979797;
  height: 56px;
  width: 152px;
  color: #ffffff;
  border-radius: 50px;
}
.yesterday {
  width: 890px;
  height: 129px;
  border-radius: 25px;
  border: 0.1px;
  margin-left: 100px;
}
.yesterday-tablet {
  border-radius: 25px;
  border: 0.1px;
  margin-left: 40px;
  width: 659px;
  height: 122px;
  flex-shrink: 0;
  padding: 15;
}
.in-out {
  font-weight: 700;
  font-size: 25px;
}
.in-out-tablet {
  color: #000;
  font-family: Nunito;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.yesterday-label {
  font-weight: 700;
  font-size: 20px;
  color: #979797;
}
.yesterday-label-tablet {
  color: #979797;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.refresh {
  width: 50px;
  height: 47px;
}
/* .display-tablet {
  width: 659px;
  height: 122px;
  flex-shrink: 0;
} */
</style>
