@@ -0,0 +1,146 @@
<template>
  <div>
    <div class="row page-container">
      <div class="col-5 q-pa-sm">
        <img
          src="../assets/logo.png"
          style="widt: 225px; height: 59px"
          class="q-ma-sm"
        />
        <div style="margin-left: 100px" class="row">
          <div class="col-10">
            <h3 readonly>Login</h3>
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
                style="margin-top: -5px; color: #545563"
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
import { ref } from "vue";

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

const onSubmit = () => {
  if (
    email.value === "edquiban.erick@gmail.com" &&
    password.value === "mmddyyyy"
  ) {
    console.log("success");
  } else {
    console.log("wrong pass");
  }
};

const onReset = () => {
  email.value = null;
  password.value = null;
  accept.value = false;
};
</script>

<style scoped>
.with-background-image {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh; /* 100% of viewport height */
}
span {
  color: #545563;
}
.login-btn {
  background-color: #004e89;
  color: white;
  width: 350px;
  height: 50px;
  border-radius: 8px;
}
h3 {
  color: #545563;
}
input {
  color: #545563;
}
</style>
