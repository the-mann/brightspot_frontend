<template>
  <q-page padding>
    <blog-post :data="data"></blog-post>
    <comment-section :comments="data.comments" @reply="fetchBlogPost(id)"></comment-section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import BlogPost from 'components/BlogPost.vue';
import { BlogPost as BlogPostType } from 'src/generated/Api.js';
import { api } from 'boot/axios';
import { AxiosResponse } from 'axios';
import CommentSection from 'components/CommentSection.vue';

const props = defineProps<{
  id: string
}>();


const { id } = toRefs(props);

const data = ref<BlogPostType | object>({});

function fetchBlogPost(id: string) {
  api.blogposts.blogpostsRetrieve(Number.parseInt(id, 10))
    .then((value: AxiosResponse<BlogPostType>) => data.value = value.data)
    .catch((err) => data.value = {'body': `## ${err.message}`})
}

watch(id, (newId) => fetchBlogPost(newId));

fetchBlogPost(id.value);
</script>
