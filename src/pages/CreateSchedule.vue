<template>
  <q-page class="body">
    <div v-if="!$q.screen.sm || !$q.screen.sm" class="display-web">
      <TodayComponent />
      <div class="row q-ml-xl">
        <h5 class="cs-header">Create Schedule</h5>
      </div>
      <div class="subcontent">
        <NavigationBar @today="onToday" @prev="onPrev" @next="onNext" />
        <q-card class="q-ml-xl q-pa-md" style="max-width: 1120px; width: 100%">
          <div class="q-ml-lg" style="width: 100%; max-width: 500px">
            <q-input outlined v-model="text" label="Search Employee Name">
              <template v-slot:prepend> <q-icon name="search" /> </template
            ></q-input>
          </div>
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
          <QCalendarMonth
            ref="calendarRef"
            v-model="selectedDate"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            :day-min-height="40"
            animated
            bordered
            @change="onChange"
            @moved="onMoved"
            @click-date="onClickDate"
            @click-day="onClickDay"
            @click-workweek="onClickWorkweek"
            @click-head-workweek="onClickHeadWorkweek"
            @click-head-day="onClickHeadDay"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<style src="@quasar/quasar-ui-qcalendar/dist/QCalendarDay.min.css"></style>
<script>
import { ref } from "vue";
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
</style>
