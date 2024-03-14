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
                      @click="showEditSchedule(props)"
                      rounded
                    />
                    <q-btn
                      class="text-capitalize"
                      rounded
                      color="negative"
                      label="Delete"
                      @click="confirmationDelete(props)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
        <q-dialog v-model="confirmationVisible">
          <q-card>
            <q-card-section>
              Are you sure you want to delete this schedule?
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Cancel" color="primary" @click="cancelDelete" />
              <q-btn
                label="Delete"
                color="negative"
                @click="confirmDelete(toBeDeleted.row)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="editDialogVisible" persistent>
          <div style="width: 100%; max-width: 700px">
            <q-card class="q-pa-md q-gutter-md">
              <div class="text-h5">Edit Schedule</div>
              <q-input
                v-model="editedSchedule.row.shiftDescription"
                label="Shift Description"
              />
              <div class="q-gutter-sm row justify-center">
                <div>
                  <q-input
                    label="Shift Start"
                    filled
                    v-model="editedSchedule.row.time_in"
                    mask="time"
                    :rules="['time']"
                    @input="formatTimeInput"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="editedSchedule.row.time_in"
                            @input="formatTimeInput"
                          >
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
                    v-model="editedSchedule.row.time_out"
                    mask="time"
                    :rules="['time']"
                    @input="formatTimeInput"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="editedSchedule.row.time_out"
                            @input="formatTimeInput"
                          >
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
              <q-card-actions align="right">
                <q-btn
                  label="Update"
                  color="primary"
                  @click="submitEditedSchedule(editedSchedule.row)"
                />
                <q-btn
                  label="Cancel"
                  color="negative"
                  @click="cancelEditSchedule"
                />
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>
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
              <q-card-actions align="right">
                <q-btn label="Create" color="primary" @click="createSchedule" />
                <q-btn
                  label="Cancel"
                  color="negative"
                  @click="cancelCreateSchedule"
                />
              </q-card-actions>
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
    const editDialogVisible = ref(false);
    const editedSchedule = ref(null);
    const confirmationVisible = ref(false);
    const toBeDeleted = ref(null);

    const newSchedule = ref({
      shiftDescription: "",
      in: "",
      out: "",
    });

    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "http://54.173.81.133:3001/api/v1/schedule"
        );
        scheduleData.value = response.data.map((schedule, index) => ({
          shiftDescription: schedule.schedule_name,
          inOut: `${schedule.time_in} - ${schedule.time_out}`,
          schedule_id: schedule.schedule_id,
          time_in: schedule.time_in,
          time_out: schedule.time_out,
          index: index, // Use index as the unique identifier
        }));
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
      return scheduleData.value;
    };

    const showEditSchedule = (schedule) => {
      editDialogVisible.value = true;
      editedSchedule.value = { ...schedule };
    };

    const confirmationDelete = (schedule) => {
      confirmationVisible.value = true;
      toBeDeleted.value = { ...schedule };
    };

    const showCreateScheduleDialog = () => {
      createScheduleDialogVisible.value = true;
    };

    const createSchedule = async () => {
      try {
        // Fetch existing schedule data from the API
        const existingScheduleResponse = await axios.get(
          "http://54.173.81.133:3001/api/v1/schedule"
        );
        const existingScheduleData = existingScheduleResponse.data;

        // Find the highest schedule_id
        let maxScheduleId = 0;
        existingScheduleData.forEach((schedule) => {
          if (schedule.schedule_id > maxScheduleId) {
            maxScheduleId = schedule.schedule_id;
          }
        });

        // Increment the highest schedule_id to get the next one
        const newScheduleId = maxScheduleId + 1;

        // Create a new schedule entry
        const newScheduleEntry = {
          schedule_id: 4,
          schedule_name: newSchedule.value.shiftDescription,
          time_in: formatTime(newSchedule.value.in),
          time_out: formatTime(newSchedule.value.out),
        };

        // Post the new schedule entry to the API
        const response = await axios.post(
          "http://54.173.81.133:3001/api/v1/schedule",
          newScheduleEntry
        );
        // If the API call is successful
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
        fetchSchedule();
      } catch (error) {
        // Handle errors if the API calls fail
        console.error("Error creating schedule:", error);
        $q.notify({
          type: "negative",
          message: "Failed to add schedule. Please try again.",
          position: "bottom",
          timeout: 2000,
        });
      }
    };

    const formatTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const amPm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
      return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
    };
    const formatTimeInput = (value) => {
      // Convert time format to HH:mm
      value = value.trim().toLowerCase();
      if (value.includes("am") || value.includes("pm")) {
        // Format: hh:mm am/pm
        const [time, period] = value.split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        const formattedHours = period === "pm" ? hours + 12 : hours;
        const formattedTime = `${formattedHours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        return formattedTime;
      }
      return value;
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

    const cancelDelete = () => {
      confirmationVisible.value = false;
    };

    const cancelEditSchedule = () => {
      editDialogVisible.value = false;
    };

    async function confirmDelete(schedule) {
      try {
        const response = await axios.delete(
          `http://54.173.81.133:3001/api/v1/schedule/${schedule.schedule_id}`
        );
        confirmationVisible.value = false;
        $q.notify({
          type: "positive",
          message: "Schedule deleted successfully",
          position: "bottom",
          timeout: 2000,
        });
        fetchSchedule();
      } catch (error) {
        console.error("Error creating schedule:", error);
        $q.notify({
          type: "negative",
          message: "Failed to add schedule. Please try again.",
          position: "bottom",
          timeout: 2000,
        });
      }
    }

    async function submitEditedSchedule(schedule) {
      try {
        const formatTimeIn =
          schedule.time_in &&
          !schedule.time_in.includes("am") &&
          !schedule.time_in.includes("pm")
            ? formatTime(schedule.time_in)
            : schedule.time_in;

        const formatTimeOut =
          schedule.time_out &&
          !schedule.time_out.includes("am") &&
          !schedule.time_out.includes("pm")
            ? formatTime(schedule.time_out)
            : schedule.time_out;

        const editedSchedule = {
          schedule_name: schedule.shiftDescription,
          time_in: formatTimeIn,
          time_out: formatTimeOut,
        };

        const response = await axios.put(
          `http://54.173.81.133:3001/api/v1/schedule/${schedule.schedule_id}`,
          editedSchedule
        );
        editDialogVisible.value = false;
        fetchSchedule();
        // Notify user about success
        $q.notify({
          type: "positive",
          message: "Schedule updated successfully",
          position: "bottom",
          timeout: 2000,
        });
      } catch (error) {
        // Notify user about error
        $q.notify({
          type: "negative",
          message: "Failed to update schedule. Please try again later.",
          position: "bottom",
          timeout: 2000,
        });
        console.error("Error updating schedule:", error);
      }
    }

    onMounted(() => {
      fetchSchedule();
    });

    return {
      scheduleData,
      columns,
      filter: ref(""),
      pagination,
      createScheduleDialogVisible,
      newSchedule,
      createSchedule,
      cancelCreateSchedule,
      showCreateScheduleDialog,
      cancelEditSchedule,
      editDialogVisible,
      showEditSchedule,
      editedSchedule,
      formatTimeInput,
      submitEditedSchedule,
      confirmationDelete,
      confirmationVisible,
      toBeDeleted,
      cancelDelete,
      confirmDelete,
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
