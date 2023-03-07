<template>
  <q-form class="q-ma-sm  q-gutter-md row  items-center" @submit="onSubmit">
    <q-input label="Username" outlined lazy-rules bg-color="white"
             :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="user.username"></q-input>
    <q-input filled label="Password" type="password" outlined lazy-rules bg-color="white"
             :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="user.password"></q-input>
    <q-btn type="submit" label="Login" color="green"></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import { Login, Token } from 'src/generated/Api';
import { reactive } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';

const user = reactive<Login>({ username: '', password: '' });


function onSubmit() {

  api.djRestAuth.djRestAuthLoginCreate(user)
    .then((resp: AxiosResponse<Token>) => api.setSecurityData(resp.data.key))
    .catch((err: AxiosError) => console.log(err))
}

</script>
