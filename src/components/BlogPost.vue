<template>
  <div>
    <vue-markdown :source="data.body ?? 'loading'" :options="{}" />
  </div>
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import { BlogPost } from 'src/generated/Api';

defineProps<{
  data: BlogPost|undefined
}>();
</script>
