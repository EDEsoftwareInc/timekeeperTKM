<template>
  <div>
    <div class="row page-container">
      <div class="col-5 q-pa-sm">
        <img
          src="~assets/logo.png"
          style="widt: 225px; height: 59px"
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
                <q-btn class="login-btn" no-caps label="Login" type="submit" />
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
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance } from "vue";
import login_success from "../provider/login_success.json";
import login_failed from "../provider/login_failed.json";

const app = getCurrentInstance().appContext.config.globalProperties;

const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const accept = ref(false);
const showPassword = ref(false);

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
  if (
    email.value === "edquiban.erick@gmail.com" &&
    password.value === "mmddyyyy"
  ) {
    const login_success_data = await login_success;
    const data = {
      login_success_data,
      user: {
        email: email.value,
        firstName: "Erick",
        lastName: "Edquiban",
        companyLogo: "~assets/logo.png",
      },
      banner: {
        imgUrl: "~assets/employee+benefits 1.png",
        title:
          "We prioritize our employees' health by offering competitive medical insurance plans, ensuring that you and your family receive top-notch care.",
        discreption: "Test Desc",
      },
    };
    try {
      $q.localStorage.set("user", data);
      app.$router.push({
        path: "/dashboard",
      });
    } catch (error) {
      console.error("Error saving user data to local storage:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  } else {
    const login_failed_data = await login_failed;
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      position: "top",
      message: login_failed_data.message,
    });
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
.with-background-image {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh; /* 100% of viewport height */
}

/* Media query for larger screens */
@media (min-width: 1750px) {
  .with-background-image {
    background-image: url("../assets/larger-bg.png"); /* Replace with a larger image */
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
</style>
