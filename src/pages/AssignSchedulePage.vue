<template>
  <q-page v-if="!$q.screen.sm" class="body">
    <div>
      <TodayComponent />
    </div>

    <div class="q-ml-xl q-mr-xl q-mt-lg">
      <div class="row justify-between items-center">
        <div class="text-h5">Employee's Schedule</div>
        <div>
          <q-btn
            class="btn-color text-capitalize"
            icon="add"
            label="Assign Schedule"
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
                <q-td key="employee_id">{{ props.row.employee_id }}</q-td>
                <q-td key="employees">{{ props.row.employees }}</q-td>
                <q-td key="shiftDescription">{{
                  props.row.shiftDescription
                }}</q-td>
                <q-td key="actions">
                  <div class="row justify-center" style="gap: 8px">
                    <q-btn
                      class="btn-color text-capitalize"
                      label="View Schedule"
                      @click="editSchedule(index)"
                      rounded
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
        <q-dialog v-model="createScheduleDialogVisible" persistent>
          <div style="width: 100%; max-width: 700px">
            <q-card class="q-pa-md">
              <div class="text-h5">Schedule Assignment</div>
              <q-card-section>
                <div class="q-gutter-md row justify-center column">
                  <div>
                    <q-select
                      outlined
                      v-model="newSchedule.employee"
                      label="Employee"
                      :options="employeeOptions"
                    />
                  </div>
                  <div>
                    <q-select
                      v-model="newSchedule.shiftDescription"
                      label="Shift Description"
                      outlined
                      :options="shifts"
                    />
                  </div>
                  <div class="self-center">
                    <q-date v-model="newSchedule.days" range multiple />
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  class="btn-color text-capitalize"
                  label="Submit"
                  @click="createSchedule"
                />
                <q-btn
                  class="text-capitalize"
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
    const shifts = ref(["Day", "Night"]);
    const employeeOptions = ref([]);
    const $q = useQuasar();
    const scheduleData = ref([]);
    const columns = [
      {
        name: "employee_id",
        label: "Employee Id",
        align: "left",
        field: "employee_id",
      },
      {
        name: "employees",
        label: "Employees",
        align: "left",
        field: "employees",
      },
      {
        name: "shiftDescription",
        label: "Shift Description",
        align: "left",
        field: "shiftDescription",
      },
      { name: "actions", label: "Action", align: "center", field: "actions" },
    ];
    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const createScheduleDialogVisible = ref(false);

    const newSchedule = ref({
      shiftDescription: "",
      in: "",
      out: "",
    });

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://54.173.81.133:3001/api/v1/users"
        );
        console.log(response.data);
        scheduleData.value = response.data.map((schedule, index) => ({
          employee_id: `000-${schedule.employee_id}`,
          employees: schedule.full_name,
          shiftDescription: schedule.shift,
          index: index, // Use index as the unique identifier
        }));
        console.log("scheduleData.value", scheduleData.value);
        employeeOptions.value = scheduleData.value.map((user, index) => ({
          value: user.employee_id,
          label: user.employees,
          index: index + 1,
        }));
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
        employees: newSchedule.value.employee.label,
        employee_id: newSchedule.value.employee.value,
        index: newSchedule.value.employee.index,
        days: newSchedule.value.days,
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
      fetchUsers();
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
      employeeOptions,
      shifts,
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
