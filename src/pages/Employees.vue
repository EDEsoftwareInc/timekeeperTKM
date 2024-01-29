<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="body">
    <div v-if="!$q.screen.sm || !$q.screen.sm" class="display-web">
      <TodayComponent />
    </div>
    <div
      class="q-ml-xl q-mt-lg"
      style="display: flex; justify-content: space-between"
    >
      <div flex>
        <label class="text-h6 text-weight-bold">All Employee</label>
      </div>
      <div flex class="q-mr-xl">
        <q-btn
          icon="add"
          no-caps
          size="md"
          color="primary"
          label="Add Employee"
          @click="addEmployee()"
        />
      </div>
    </div>
    <q-dialog v-model="addEmployeeModal">
      <div style="width: 600px" class="my-card">
        <q-card>
          <q-card-section>
            <div class="text-h6 col">Add Employee</div>
          </q-card-section>
          <q-card-section>
            <q-input dense outlined label="First Name" />
          </q-card-section>
          <q-card-section>
            <q-input dense outlined label="Middle Name" />
          </q-card-section>
          <q-card-section>
            <q-input dense outlined label="Last Name" />
          </q-card-section>
          <q-card-actions row align="left">
            <q-btn label="Save" color="primary" v-close-popup />
            <q-btn flat label="Cancel" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        ref="tableRef"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
      >
        <template v-slot:top-left>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:prepend>
              <q-icon size="md" name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="getChipColor(props.row.status)"
              :text-color="getTextColor(props.row.status)"
              label
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
        <!-- New column for profile picture -->
        <template v-slot:body-cell-profilePicture="props">
          <q-td :props="props">
            <q-avatar>
              <img
                :src="props.row.profilePicture"
                alt="Profile Picture"
                style="width: 32px; height: 32px; border-radius: 50%"
              />
            </q-avatar>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TodayComponent from "src/components/TodayComponent.vue";

const columns = [
  {
    name: "profilePicture",
    align: "center",
    field: "profilePicture",
    format: (val) =>
      `<q-avatar><img src="${val}" alt="Profile Picture" style="width: 32px; height: 32px; border-radius: 50%;"></q-avatar>`,
  },
  {
    name: "profile",
    align: "left",
    label: "Profile",
    field: "profile",
    sortable: true,
  },
  {
    name: "desc",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "center",
  },
  {
    name: "department",
    label: "Department",
    field: "department",
    align: "center",
    sortable: true,
  },
  {
    name: "shift",
    label: "Shift",
    field: "shift",
    sortable: true,
    align: "center",
  },
  {
    name: "joining_date",
    label: "Joining Date",
    field: "joining_date",
    sortable: true,
  },
  { name: "role", label: "Role", field: "role", sortable: true },
];

const originalRows = [
  {
    id: "00001",
    profile: "Erick Edquiban",
    status: "Part-Time",
    department: "MIS",
    shift: "Night Shift",
    joining_date: "10/10/12023",
    role: "employee",
    profilePicture: "https://cdn.quasar.dev/img/boy-avatar.png",
  },
  {
    id: "00002",
    profile: "Jane Doe",
    status: "Full-Time",
    department: "FAD",
    shift: "Night Shift",
    joining_date: "10/10/12023",
    role: "employee",
    profilePicture: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    id: "00003",
    profile: "Juan Dela Cruz",
    status: "On-Contract",
    department: "MIS",
    shift: "Night Shift",
    joining_date: "10/10/12023",
    role: "employee",
    profilePicture: "https://cdn.quasar.dev/img/boy-avatar.png",
  },
];

const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const addEmployeeModal = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});
function addEmployee() {
  addEmployeeModal.value = !addEmployeeModal.value;
}
function getChipColor(status) {
  switch (status) {
    case "Full-time":
      return "green";
    case "Part-time":
      return "yellow";
    case "Regular":
      return "blue";
    default:
      return "gray";
  }
}

function getTextColor(status) {
  // Conditionally set text-color to black when the status is "Part-time"
  return status === "Part-time" ? "black" : "white";
}

// emulate ajax call
// SELECT * FROM ... WHERE...LIMIT...
async function fetchDataFromServer() {
  try {
    const response = await fetch("http://54.173.81.133:3001/api/v1/users");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from the server:", error);
    return [];
  }
}

// Function to convert API response to match the format of originalRows
function convertApiResponse(apiData) {
  return apiData.map((user) => ({
    id: user.employee_id.toString(),
    profile: user.full_name,
    status: user.status,
    department: user.department,
    shift: user.shift,
    joining_date: user.joining_date,
    role: user.role,
    profilePicture: user.profile_picture,
  }));
}

async function fetchAndUpdateDataFromServer(
  startRow,
  count,
  filter,
  sortBy,
  descending
) {
  loading.value = true;

  try {
    // Fetch data from the server
    const apiData = await fetchDataFromServer();

    // Convert API response to match the format of originalRows
    const convertedData = convertApiResponse(apiData);

    // Apply filter if provided
    const data = filter
      ? convertedData.filter((row) =>
          row.profile.toLowerCase().includes(filter.toLowerCase())
        )
      : convertedData.slice();

    // Handle sorting
    if (sortBy) {
      const sortFn = (a, b) => {
        const valueA =
          typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
        const valueB =
          typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        return descending ? valueB - valueA : valueA - valueB;
      };
      data.sort(sortFn);
    }

    // Update local rows with the appropriate subset
    rows.value.splice(
      0,
      rows.value.length,
      ...data.slice(startRow, startRow + count)
    );

    // Update pagination information
    pagination.value.rowsNumber = data.length;
    pagination.value.page = 1;
    pagination.value.rowsPerPage = count;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  } catch (error) {
    console.error("Error updating data from the server:", error);
  } finally {
    loading.value = false;
  }
}

// Function to fetch data from the server and update the local rows
// async function fetchAndUpdateDataFromServer(startRow, count, filter, sortBy, descending) {
//   loading.value = true;

//   try {
//     // Fetch data from the server
//     const apiData = await fetchDataFromServer();

//     // Convert API response to match the format of originalRows
//     const convertedData = convertApiResponse(apiData);

//     // Apply filter if provided
//     const data = filter
//       ? convertedData.filter((row) => row.profile.toLowerCase().includes(filter.toLowerCase()))
//       : convertedData.slice();

//     // Handle sorting
//     if (sortBy) {
//       const sortFn = (a, b) => {
//         const valueA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
//         const valueB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
//         return descending ? valueB - valueA : valueA - valueB;
//       };
//       data.sort(sortFn);
//     }

//     // Update local rows with the appropriate subset
//     rows.value.splice(0, rows.value.length, ...data.slice(startRow, startRow + count));

//     // Update pagination information
//     pagination.value.rowsNumber = data.length;
//     pagination.value.page = 1;
//     pagination.value.rowsPerPage = count;
//     pagination.value.sortBy = sortBy;
//     pagination.value.descending = descending;
//   } catch (error) {
//     console.error('Error updating data from the server:', error);
//   } finally {
//     loading.value = false;
//   }
// }

// emulate 'SELECT count(*) FROM ...WHERE...'
function getRowsNumberCount(filter) {
  if (!filter) {
    return originalRows.length;
  }
  let count = 0;
  originalRows.forEach((prof) => {
    if (prof.profile.includes(filter)) {
      ++count;
    }
  });
  return count;
}

// function onRequest(props) {
//   const { page, rowsPerPage, sortBy, descending } = props.pagination;
//   const filter = props.filter;

//   loading.value = true;

//   // emulate server
//   setTimeout(() => {
//     // update rowsCount with the appropriate value
//     pagination.value.rowsNumber = getRowsNumberCount(filter);

//     // get all rows if "All" (0) is selected
//     const fetchCount =
//       rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

//     // calculate the starting row of data
//     const startRow = (page - 1) * rowsPerPage;

//     // fetch data from "server"
//     const returnedData = fetchFromServer(
//       startRow,
//       fetchCount,
//       filter,
//       sortBy,
//       descending
//     );

//     // clear out existing data and add new
//     rows.value.splice(0, rows.value.length, ...returnedData);

//     // don't forget to update the local pagination object
//     pagination.value.page = page;
//     pagination.value.rowsPerPage = rowsPerPage;
//     pagination.value.sortBy = sortBy;
//     pagination.value.descending = descending;

//     // ...and turn off the loading indicator
//     loading.value = false;
//   }, 1500);
// }

function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;

  // Fetch and update data from the server
  fetchAndUpdateDataFromServer(
    (page - 1) * rowsPerPage,
    rowsPerPage,
    filter,
    sortBy,
    descending
  );
}

onMounted(async () => {
  // get initial data from the server (1st page)
  await fetchAndUpdateDataFromServer(0, 10, "", "", false);
  tableRef.value.requestServerInteraction();
});
</script>
<style>
.q-item {
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.body {
  font-family: Inter;
  background-color: #eeeeee;
  font-size: medium;
  color: #000;
}
.q-table th {
  font-family: Inter;
  background-color: #eeeeee;
  font-size: medium;
}
</style>
