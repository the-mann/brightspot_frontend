<template>
  <div v-if="!loaded">
  </div>
  <div v-else-if="loggedIn" class="row q-gutter-sm">
    <span class="self-end">Welcome, {{ userDetails.first_name }}!</span> <q-btn flat square icon="logout" size="xs" @click="onLogout" class="self-center"></q-btn>
  </div>
  <div v-else>
    <q-form class="row q-gutter-sm q-ma-sm items-start" style="max-height: 70px" @submit="onSubmit">
      <q-input label="Username" standout lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="user.username"></q-input>
      <q-input label="Password" type="password" standout lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="user.password"></q-input>
      <q-btn icon="login" flat square size="lg" class="self-baseline" type="submit"></q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import {Login, Token, UserDetails} from 'src/generated/Api';
import {reactive, ref} from 'vue';
import { AxiosError, AxiosResponse } from 'axios';
import {useQuasar} from 'quasar';
// noinspection JSUnusedGlobalSymbols
const $q = useQuasar();
let user = reactive<Login>({ username: '', password: '' });

let loaded = ref(false);
let loggedIn = ref(false);
let userDetails = reactive<UserDetails>({email: '', pk: 0, username: ''});
function updateLoggedIn() {
  api.djRestAuth.djRestAuthUserRetrieve()
    .then((resp: AxiosResponse<UserDetails>) => {
      loggedIn.value = true;
      userDetails = resp.data;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((err: AxiosError) => loggedIn.value = false)
    .finally(() => loaded.value = true);
}
function onSubmit() {

  api.djRestAuth.djRestAuthLoginCreate(user)
    .then((resp: AxiosResponse<Token>) => {
      api.setSecurityData(resp.data.key);
      user = { username: '', password: '' };
    })
    .catch((err: AxiosError) => {
      $q.notify({
        type: 'negative', message: (err.response.data['non_field_errors']),
      });
    })
    .finally(() => updateLoggedIn());
}

function onLogout () {
  api.djRestAuth.djRestAuthLogoutCreate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((resp: AxiosResponse) => {
     // notify the user that we successfully logged out
      $q.notify({
        type: 'positive', message: 'Logged out successfully',
      });
    })
    .catch((err: AxiosError) => {
      $q.notify({
        type: 'negative', message: (err.response.data['non_field_errors']),
      });
    })
    .finally(() => updateLoggedIn());
}
updateLoggedIn();
</script>
