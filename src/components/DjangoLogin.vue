<template>
  <q-form class="q-ma-sm  q-gutter-md row  items-center" @submit="onSubmit">
    <q-input label="Username"  outlined  lazy-rules bg-color="white"
             :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="username"></q-input>
    <q-input filled label="Password" type="password" outlined  lazy-rules bg-color="white"
             :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="password"></q-input>
  <q-btn type="submit" label="Login" color="green"></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
</script>
