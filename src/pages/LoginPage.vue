<template>
  <div>
    <!--Laptop and PC view -->

    <div class="row page-container">
      <div
        class="col-5 q-pa-sm"
        style="background-color: transparent important!"
      >
        <img
          src="~assets/logo.png"
          style="widt: 225px; height: 70px"
          class="q-ma-sm"
        />
        <div style="margin-left: 100px" class="row">
          <div class="col-10">
            <p readonly>Login</p>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <span class="text-weight-medium">Email</span>
              <q-input
                v-model="email"
                placeholder="name@example.com"
                outlined
                type="email"
                lazy-rules
                standout
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    isValidEmail(val) ||
                    'Please input a valid email address',
                ]"
              />

              <span class="text-weight-medium" style="margin-top: 5px"
                >Password</span
              >
              <q-input
                v-model="password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                placeholder="min. 8 characters"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your password',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    @click="togglePasswordVisibility"
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                  />
                </template>
              </q-input>
              <q-checkbox
                size="xs"
                v-model="shape"
                val="xs"
                label="Keep me logged in"
                class="check-box"
              />
              <q-card-actions
                style="margin-top: 100px"
                vertical
                align="center"
                class="q-mt-lg"
              >
                <q-btn
                  class="login-btn"
                  no-caps
                  label="Login"
                  type="submit"
                  :disable="loading"
                >
                  <q-spinner-clock
                    class="q-ml-sm"
                    size=".5em"
                    v-if="loading"
                    color="white"
                  />
                </q-btn>
                <q-btn
                  no-caps
                  label="Forgot password"
                  type="submit"
                  flat
                  color="primary - color"
                  class="btn-forgot-password"
                />
              </q-card-actions>
            </q-form>
          </div>
        </div>
      </div>
      <div class="col-7 with-background-image"></div>
    </div>

    <!-- Mobile and Tablet view -->
    <div
      v-if="$q.screen.sm || $q.screen.lt.md || $q.screen.lt.xsm"
      class="bg-fullwidth"
    >
      <img
        src="~assets/logo.png"
        style="width: 225px; height: 59px"
        class="q-ma-sm"
      />
      <div class="row" align="center">
        <div class="col-12 q-px-xl">
          <p readonly>Login</p>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <span class="text-weight-medium">Email</span>
            <q-input
              v-model="email"
              placeholder="name@example.com"
              outlined
              type="email"
              lazy-rules
              standout
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  isValidEmail(val) ||
                  'Please input a valid email address',
              ]"
            />

            <span class="text-weight-medium" style="margin-top: 5px"
              >Password</span
            >
            <q-input
              v-model="password"
              outlined
              :type="showPassword ? 'text' : 'password'"
              placeholder="min. 8 characters"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your password',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  @click="togglePasswordVisibility"
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                />
              </template>
            </q-input>
            <q-checkbox
              size="xs"
              v-model="shape"
              val="xs"
              label="Keep me logged in"
              class="check-box"
            />
            <q-card-actions
              style="margin-top: 100px"
              vertical
              align="center"
              class="q-mt-lg"
            >
              <q-btn
                class="login-btn-tablet"
                no-caps
                label="Login"
                type="submit"
              >
                <q-spinner-clock
                  class="q-ml-sm"
                  size=".5em"
                  v-if="loading"
                  color="white"
                />
              </q-btn>
              <q-btn
                no-caps
                label="Forgot password"
                type="submit"
                flat
                color="primary - color"
                class="btn-forgot-password"
              />
            </q-card-actions>
          </q-form>
        </div>
      </div>
    </div>
    <!-- end of mobile and tablet view -->
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance } from "vue";
import login_success from "../provider/login_success.json";
import login_failed from "../provider/login_failed.json";

const app = getCurrentInstance().appContext.config.globalProperties;

const $q = useQuasar();
const loading = ref(false);
const email = ref(null);
const password = ref(null);
const accept = ref(false);
const showPassword = ref(false);
const tkmApi = ref("http://54.173.81.133:3001/api/v1/");

const shape = ref(["line"]);
const isValidEmail = (email) => {
  // Regular expression to validate an email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await app.$axios.post(
      "http://54.173.81.133:3001/api/v1/users/login",
      {
        username: email.value,
        password: password.value,
      }
    );
    const userData = response.data; // assuming the response contains data

    console.log("DATA", userData);

    // Check if the userData is not null or undefined
    if (userData !== null && userData !== undefined) {
      $q.localStorage.set("user", userData);
      loading.value = false;
      app.$router.push({
        path: "/dashboard",
      });
    } else {
      console.log("userData is null or undefined");
      // Handle the scenario where userData is null or undefined
    }
  } catch (error) {
    console.error("Error during the request:", error);
    // Handle the error (e.g., show an error message to the user)
  }
};

const onReset = () => {
  email.value = null;
  password.value = null;
  accept.value = false;
};
</script>

<style scoped>
/* Default styles for smaller screens */
@media (max-width: 1000px) {
  .page-container {
    display: none;
  }
}
.with-background-image {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh; /* 100% of viewport height */
}

/* Media query for larger screens */
@media (min-width: 1750px) and (min-height: 900px) {
  .with-background-image {
    background-image: url("../assets/larger-bg.svg"); /* Replace with a larger image */
    background-size: cover;
  }
}

@media (min-height: 1080px) {
  .with-background-image {
    background-image: url("../assets/larger-bg-fullscreen.svg"); /* Replace with a larger image */
    background-size: cover;
  }
}

span {
  color: #545563;
  font-family: "Nunito";
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
}
.login-btn {
  background-color: #004e89;
  color: white;
  width: 350px;
  height: 50px;
  border-radius: 8px;
  font-family: "Nunito";
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
}
.login-btn-tablet {
  background-color: #004e89;
  color: white;
  width: 299px;
  height: 50px;
  border-radius: 8px;
  font-family: "Nunito";
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
}
p {
  color: #2b2b43;
  font-family: "Nunito";
  font-size: 35px;
  margin-top: 100px;
  margin-bottom: 25px;
  font-weight: 400;
  line-height: 82px;
  letter-spacing: 0.1px;
}
input {
  color: #545563;
  font-family: "Nunito";
  margin-bottom: 15px;
}
.check-box {
  margin-top: -5px;
  color: #545563;
  font-family: "Nunito";
}
.btn-forgot-password {
  color: 3e75A1;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 18px;
}

.bg-fullwidth {
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-image: url("../assets/bg-tablet.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
}
</style>
