<template>
  <q-page class="body">
    <div v-if="!$q.screen.sm || !$q.screen.sm" class="display-web">
      <TodayComponent />
      <div class="row q-ml-xl">
        <h5 class="cs-header">Create Schedule</h5>
      </div>
      <div class="subcontent">
        <q-card class="q-ml-xl q-pa-md q-mr-xl">
          <div class="q-ml-lg" style="width: 100%; max-width: 500px">
            <q-input outlined v-model="text" label="Search Employee Name">
              <template v-slot:prepend> <q-icon name="search" /> </template
            ></q-input>
          </div>
          <div class="row justify-between items-center">
            <div
              class="q-ml-xl q-my-lg"
              style="
                color: #000;
                font-family: Inter;
                font-size: 24px;
                font-style: normal;
                font-weight: 900;
                line-height: normal;
              "
            >
              {{ currentMonthYear }}
            </div>
            <NavigationBar @today="onToday" @prev="onPrev" @next="onNext" />
          </div>
          <div class="row justify-around">
            <QCalendarMonth
              style="width: 100% !important; max-width: 600px !important"
              ref="calendarRef"
              v-model="selectedDate"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              :day-min-height="40"
              animated
              @change="onChange"
              @moved="onMoved"
              @click-date="onClickDate"
              @click-day="onClickDay"
              @click-workweek="onClickWorkweek"
              @click-head-workweek="onClickHeadWorkweek"
              @click-head-day="onClickHeadDay"
            />
            <div>
              <div>
                <div class="punch-text">Punch In Time</div>
                <div class="time-picker-spinner">
                  <div class="row column items-center">
                    <span @click="incrementHours"
                      ><q-icon class="text-h4" name="mdi-chevron-up"
                    /></span>
                    <input
                      type="text"
                      v-model="hours"
                      @input="updateTime"
                      placeholder="HH"
                      maxlength="2"
                    />
                    <span @click="decrementHours"
                      ><q-icon class="text-h4" name="mdi-chevron-down"
                    /></span>
                  </div>
                  <span class="q-mr-lg q-ml-lg">:</span>
                  <div class="row column items-center">
                    <span @click="incrementMinutes"
                      ><q-icon class="text-h4" name="mdi-chevron-up"
                    /></span>
                    <input
                      type="text"
                      v-model="minutes"
                      @input="updateTime"
                      placeholder="MM"
                      maxlength="2"
                    />
                    <span @click="decrementMinutes"
                      ><q-icon class="text-h4" name="mdi-chevron-down"
                    /></span>
                  </div>
                  <div>
                    <q-select
                      class="no-icon"
                      v-model="period"
                      :options="periodOptions"
                      emit-value
                      map-options
                      use-input
                      style="width: 100%; max-width: 40px"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="punch-text">Punch Out Time</div>
                <div class="time-picker-spinner">
                  <div class="row column items-center">
                    <span @click="incrementHours"
                      ><q-icon class="text-h4" name="mdi-chevron-up"
                    /></span>
                    <input
                      type="text"
                      v-model="hours"
                      @input="updateTime"
                      placeholder="HH"
                      maxlength="2"
                    />
                    <span @click="decrementHours"
                      ><q-icon class="text-h4" name="mdi-chevron-down"
                    /></span>
                  </div>
                  <span class="q-mr-lg q-ml-lg">:</span>
                  <div class="row column items-center">
                    <span @click="incrementMinutes"
                      ><q-icon class="text-h4" name="mdi-chevron-up"
                    /></span>
                    <input
                      type="text"
                      v-model="minutes"
                      @input="updateTime"
                      placeholder="MM"
                      maxlength="2"
                    />
                    <span @click="decrementMinutes"
                      ><q-icon class="text-h4" name="mdi-chevron-down"
                    /></span>
                  </div>
                  <div>
                    <q-select
                      class="no-icon"
                      v-model="period"
                      :options="periodOptions"
                      emit-value
                      map-options
                      use-input
                      style="width: 100%; max-width: 40px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<style src="@quasar/quasar-ui-qcalendar/dist/QCalendarDay.min.css"></style>
<script>
import { ref, watch } from "vue";
import {
  QCalendarMonth,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import NavigationBar from "../components/NavigationBar.vue";
import TodayComponent from "src/components/TodayComponent.vue";
export default {
  name: "MiniModeFirstDayMonday",
  components: {
    NavigationBar,
    QCalendarMonth,
    TodayComponent,
  },
  setup() {
    const calendarRef = ref(null);

    const selectedDate = ref(today());
    const currentMonthYear = ref("");

    const hours = ref(new Date().getHours() % 12 || 12);
    const minutes = ref(new Date().getMinutes());
    const period = ref(new Date().getHours() >= 12 ? "PM" : "AM");

    const updateTime = () => {
      // Handle the selected time change here
      const selectedTime = `${padZero(hours.value)}:${padZero(minutes.value)}`;
      console.log("Selected Time:", selectedTime);
    };

    const incrementHours = () => {
      hours.value = (hours.value % 12) + 1;
      updateTime();
    };

    const decrementHours = () => {
      hours.value = (hours.value - 1 + 12) % 12;
      if (hours.value === 0) {
        hours.value = 12;
      }
      updateTime();
    };

    const incrementMinutes = () => {
      minutes.value = (minutes.value % 60) + 1;
      updateTime();
    };

    const decrementMinutes = () => {
      minutes.value = (minutes.value - 1 + 60) % 60;
      if (minutes.value === 0) {
        minutes.value = 60;
      }
      updateTime();
    };

    // Helper function to pad single-digit numbers with a leading zero
    const padZero = (value) => {
      return String(value).padStart(2, "0");
    };

    // Watch for changes in hours and minutes and update the time
    watch([hours, minutes, period], updateTime);

    const onToday = () => {
      calendarRef.value.moveToToday();
    };

    const onPrev = () => {
      calendarRef.value.prev();
    };

    const onNext = () => {
      calendarRef.value.next();
    };

    const onMoved = (data) => {
      const movedDate = new Date(data.date);
      const options = { year: "numeric", month: "long" };
      currentMonthYear.value = movedDate.toLocaleDateString(
        data.locale,
        options
      );
      console.log("onMoved", data);
    };

    const onChange = (data) => {
      console.log("onChange", data);
      const currentMonthObj = data.days.find((day) => day.current);

      if (currentMonthObj) {
        const currentDate = new Date(currentMonthObj.date);
        const formattedMonth = currentDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
        });
        currentMonthYear.value = formattedMonth;
      } else {
        // console.error("Current month not found in the days array");
      }
    };

    const onClickDate = (data) => {
      console.log("onClickDate", data);
    };

    const onClickDay = (data) => {
      console.log("onClickDay", data);
    };

    const onClickWorkweek = (data) => {
      console.log("onClickWorkweek", data);
    };

    const onClickHeadDay = (data) => {
      console.log("onClickHeadDay", data);
    };

    const onClickHeadWorkweek = (data) => {
      console.log("onClickHeadWorkweek", data);
    };

    return {
      selectedDate,
      onToday,
      onPrev,
      onNext,
      onMoved,
      onChange,
      onClickDate,
      onClickDay,
      onClickWorkweek,
      onClickHeadDay,
      onClickHeadWorkweek,
      calendarRef,
      text: "",
      currentMonthYear,
      hours,
      minutes,
      updateTime,
      incrementHours,
      decrementHours,
      incrementMinutes,
      decrementMinutes,
      periodOptions: ["AM", "PM"],
      period,
    };
  },
};
</script>

<style>
.body {
  font-family: Inter;
}
.cs-header {
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
  letter-spacing: -0.34px;
}
.punch-text {
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.time-picker-spinner {
  display: flex;
  align-items: center;
}

.time-picker-spinner input {
  width: 40px;
  text-align: center;
  margin: 0 30px;
  padding: 5px;
}

.time-picker-spinner span {
  margin: 0 5px;
}

.no-icon i.q-icon.notranslate.material-icons {
  display: none;
}
</style>
