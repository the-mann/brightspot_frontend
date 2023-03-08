<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-1 text-black">
        <q-toolbar-title>
          <img class="q-mt-sm" src="~assets/brightspot-logo-200px.svg" alt="Brightspot">
        </q-toolbar-title>
        <django-login></django-login>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

import DjangoLogin from 'components/DjangoLogin.vue';
</script>
