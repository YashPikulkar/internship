<template>
  <q-layout view="lhh Lpr lFf">
    <!-- Fixed Header -->
    <q-header elevated class="header flex items-center justify-between q-px-md">
      <!-- Left Side Buttons -->
      <div class="auth-buttons flex items-center">
  <q-btn
  label="Log In"
  flat
  class="login-btn q-mr-sm"
  to="/login"
/>
]



      </div>

      <!-- Right Side (optional slot for nav/logo etc.) -->
      <div>
        <!-- Add right-side content here if needed -->
      </div>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.header {
  background-color: #fff;
  height: 57px;
  border-bottom: 1px solid #ccc;
}
.login-btn {
  border: 1px solid #ccc;
  color: black;
  background-color: white;
  border-radius: 12px;
  font-weight: bold;
  padding: 6px 18px;
}

.signup-btn {
  background-color: #071014;
  color: white;
  border-radius: 12px;
  font-weight: bold;
  padding: 6px 18px;
}

</style>
