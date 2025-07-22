<template>
  <q-layout view="lhh Lpr lFf">
    <!-- Fixed Header -->
    <q-header elevated class="header">
      <!-- Nav/Toolbar goes here -->
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
</style>
