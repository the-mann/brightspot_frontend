<template>
  <q-page class="row items-center justify-evenly">
    <q-card v-for="post in posts" :key="post.id" class="q-mb-md col-6">
      <q-card-section class="col justify-center">
        <div class="text-h5 text-capitalize text-italic text-bold col-4">{{ post.title }}</div>
        <div class="text-subtitle2 text-weight-regular">{{ post.subtitle }}</div>
        <div class="text-grey-8 text-weight-light">
          <span class="text-weight-regular">by {{ post.owner.first_name }} {{ post.owner.last_name }}</span>,
          {{ fromNow(new Date(post.created)) }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-grey-8 text-weight-light bg-grey-11 q-pa-sm">
          <vue-markdown :source="post.body" class="ellipsis-2-lines"></vue-markdown>
        </div>
        <q-btn
          class="q-mt-sm"
          color="white"
          text-color="blue"
          outline
          :to="'/blogpost/' + post.id"
          label="Read More"
          no-caps
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {api} from 'boot/axios';
import {BlogPost as BlogPostType} from 'src/generated/Api';
import VueMarkdown from 'vue-markdown-render';
import {ref} from 'vue';
import {fromNow} from '../generated/3177836';

let posts = ref<BlogPostType[]>([]);
api.blogposts.blogpostsList()
  .then((value) => posts.value = value.data)
  .catch((err) => console.log(err));
</script>
