<template>
  <div class="row justify-center">
    <div class="col-8">
      <div class="text-h2 text-capitalize text-italic text-bold col-4">{{ data.title }}</div>
      <div class="text-h5 text-weight-regular">{{ data.subtitle }}</div>
      <hr class="text-weight-light">
      <div class="text-subtitle1 text-grey-8 text-weight-light">
<!--        <span class="text-weight-regular">by {{ data.owner.first_name ?? '' }} {{ data.owner.last_name ?? '' }}</span>,-->
        {{ fromNow(new Date(data.created)) }}
      </div>
    </div>
    <div class="col-8">
      <vue-markdown :source="data.body ?? 'loading'" :options="{}" />
      <q-separator color="grey" class="col-6" inset />

    </div>
  </div>
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import { BlogPost } from 'src/generated/Api';
import {fromNow} from '../generated/3177836';

defineProps<{
  data: BlogPost
}>();
</script>
