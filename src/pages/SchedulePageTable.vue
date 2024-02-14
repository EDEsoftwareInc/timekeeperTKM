<template>
  <q-page v-if="!$q.screen.sm" class="body">
    <div>
      <TodayComponent />
    </div>

    <div class="q-ml-xl q-mr-xl q-mt-lg">
      <div class="row justify-between items-center">
        <div class="text-h5">Schedule</div>
        <div>
          <q-btn
            class="btn-color text-capitalize"
            icon="add"
            label="Create Schedule"
            @click="showCreateScheduleDialog"
          />
        </div>
      </div>
      <div>
        <q-card>
          <q-table
            class="q-ma-lg"
            row-key="index"
            :rows="scheduleData"
            :columns="columns"
            v-model:pagination="pagination"
            :rows-per-page-options="[5, 10, 20]"
          >
            <template v-slot:top-left>
              <q-input
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="shiftDescription">{{
                  props.row.shiftDescription
                }}</q-td>
                <q-td key="inOut">{{ props.row.inOut }}</q-td>
                <q-td key="actions">
                  <div class="row justify-center" style="gap: 8px">
                    <q-btn
                      class="btn-color text-capitalize"
                      label="Edit"
                      @click="editSchedule(index)"
                      rounded
                    />
                    <q-btn
                      class="text-capitalize"
                      rounded
                      color="negative"
                      label="Delete"
                      @click="deleteSchedule(index)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
        <q-dialog v-model="createScheduleDialogVisible" persistent>
          <div style="width: 100%; max-width: 700px">
            <q-card class="q-pa-md q-gutter-md">
              <div class="text-h5">Create Schedule</div>
              <q-input
                v-model="newSchedule.shiftDescription"
                label="Shift Description"
              />
              <div class="q-gutter-sm row justify-center">
                <div>
                  <q-input
                    label="Shift Start"
                    filled
                    v-model="newSchedule.in"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="newSchedule.in">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div>
                  <q-input
                    label="Shift End"
                    filled
                    v-model="newSchedule.out"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="newSchedule.out">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <q-btn label="Create" color="primary" @click="createSchedule" />
              <q-btn
                label="Cancel"
                color="negative"
                @click="cancelCreateSchedule"
              />
            </q-card>
          </div>
        </q-dialog>
      </div>
    </div>
  </q-page>

  <q-page v-if="$q.screen.sm">
    <div><TodayComponentSM /></div>
    <div class="q-ml-xl q-mr-xl q-mt-lg">
      <div class="row justify-between items-center">
        <div class="text-h5">Schedule</div>
        <div>
          <q-btn
            class="btn-color text-capitalize"
            icon="add"
            label="Create Schedule"
          />
        </div>
      </div>
      <div>
        <q-card>
          <q-table
            class="q-ma-lg"
            row-key="index"
            :rows="pagedScheduleData"
            :columns="columns"
            v-model:pagination="pagination"
            :rows-per-page-options="[5, 10, 20]"
          >
            <template v-slot:top-left>
              <q-input
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="shiftDescription">{{
                  props.row.shiftDescription
                }}</q-td>
                <q-td key="inOut">{{ props.row.inOut }}</q-td>
                <q-td key="actions">
                  <div class="row justify-center" style="gap: 8px">
                    <q-btn
                      class="btn-color text-capitalize"
                      label="Edit"
                      @click="editSchedule(index)"
                      rounded
                    />
                    <q-btn
                      class="text-capitalize"
                      rounded
                      color="negative"
                      label="Delete"
                      @click="deleteSchedule(index)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import TodayComponent from "src/components/TodayComponent.vue";
import TodayComponentSM from "src/components/TodayComponentSM.vue";

export default {
  components: {
    TodayComponent,
    TodayComponentSM,
  },
  setup() {
    const $q = useQuasar();
    const scheduleData = ref([]);
    const columns = [
      {
        name: "shiftDescription",
        label: "Shift Description",
        align: "left",
        field: "shiftDescription",
      },
      { name: "inOut", label: "Time In/Out", align: "left", field: "inOut" },
      { name: "actions", label: "Action", align: "center", field: "actions" },
    ];
    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const createScheduleDialogVisible = ref(false);

    const newSchedule = ref({
      shiftDescription: "",
      in: "",
      out: "",
    });

    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "http://54.173.81.133:3001/api/v1/users/schedule"
        );
        console.log(response.data);
        scheduleData.value = response.data.map((schedule, index) => ({
          shiftDescription: getShiftDescription(schedule.in),
          inOut: `${schedule.in} - ${schedule.out}`,
          index: index, // Use index as the unique identifier
        }));
        console.log("scheduleData.value", scheduleData.value);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    const editSchedule = (index) => {
      // Handle edit schedule action
    };

    const deleteSchedule = (index) => {
      // Handle delete schedule action
    };

    const getShiftDescription = (time) => {
      const hour = parseInt(time.split(":")[0]);
      return hour >= 6 && hour < 18 ? "Day Shift" : "Night Shift";
    };

    const showCreateScheduleDialog = () => {
      createScheduleDialogVisible.value = true;
    };

    const createSchedule = () => {
      const newScheduleEntry = {
        shiftDescription: newSchedule.value.shiftDescription,
        inOut: `${newSchedule.value.in} - ${newSchedule.value.out}`,
      };
      const updatedScheduleData = [...scheduleData.value, newScheduleEntry];
      scheduleData.value = updatedScheduleData;

      createScheduleDialogVisible.value = false;

      $q.notify({
        type: "positive",
        message: "Schedule added successfully",
        position: "bottom",
        timeout: 2000,
      });

      newSchedule.value = {
        shiftDescription: "",
        in: "",
        out: "",
      };
    };

    const cancelCreateSchedule = () => {
      // Reset newSchedule object and close the dialog
      newSchedule.value = {
        shiftDescription: "",
        in: "",
        out: "",
      };
      createScheduleDialogVisible.value = false;
    };

    onMounted(() => {
      fetchSchedule();
    });

    return {
      scheduleData,
      columns,
      editSchedule,
      deleteSchedule,
      filter: ref(""),
      pagination,
      createScheduleDialogVisible,
      newSchedule,
      createSchedule,
      cancelCreateSchedule,
      showCreateScheduleDialog,
    };
  },
};
</script>

<style>
.body {
  font-family: Nunito;
}
.btn-color {
  background: #004e89 !important;
  color: #fff;
}
thead tr {
  background: #f5f5f5;
}
.q-table--horizontal-separator thead th:first-child {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom-width: 0px !important;
}

.q-table--horizontal-separator thead th:not(:first-child) {
  border-right: 1px solid #e0e0e0;
  border-bottom-width: 0px !important;
}
</style>
