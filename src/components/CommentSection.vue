<template>
  <div class="row">
    <div class="q-pa-md q-gutter-sm">
      <div v-if="comments.length > 0">
        <q-tree
          :nodes="comments ?? []"
          node-key="id"
          label-key="body"
          children-key="comments"
          default-expand-all
          ref="tree"
        >

          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon :name="prop.node.icon || 'account_circle'" :color="getRandUVAColor()" size="28px"
                      class="q-mr-sm"/>
              <div class="text-weight-bold">{{ prop.node.owner.first_name }} {{ prop.node.owner.last_name }} - <span
                class="text-weight-light">{{ fromNow(new Date(prop.node.created)) }}</span></div>
            </div>
          </template>

          <template v-slot:default-body="prop">
            <div class="row q-pl-lg">
              <p class="text-weight-regular text-black">{{ prop.node.body }}</p>
            </div>
            <div class="row inline">
              <q-form
                class="row inline q-gutter-md items-center"
              >
                <q-input
                  filled
                  v-model="prop.node.newreply"
                  :hint="'Your reply to ' + prop.node.owner.first_name + ' ' + prop.node.owner.last_name"
                  lazy-rules
                  label="Reply"
                  :rules="[ val => val && val.length > 0 || 'Please type something']">
                  <template v-slot:append>
                    <q-btn icon="reply" type="submit" @click="submitReply(prop.node)" flat/>
                  </template>
                </q-input>
              </q-form>
            </div>
          </template>
        </q-tree>
      </div>
      <q-form
        class="row inline q-gutter-md items-center q-mt-md">
        <q-input
          filled
          v-model="newBody"
          hint="I thought the article..."
          label="New Comment"
          lazy-rules

          :rules="[ val => val && val.length > 0 || 'Please type something']">
          <template v-slot:append>
            <q-btn icon="send" type="submit" @click="submitNewComment" flat/>
          </template>
        </q-input>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Comment} from '../generated/Api';
import {ref, toRefs} from 'vue';
import {fromNow} from 'src/generated/3177836'
import {api} from 'boot/axios';
import {QTree} from 'quasar';

const props = defineProps<{
  comments: Comment[],
  blogpost: string
}>();
const newBody = ref<string>('');
const tree = ref<QTree>();
const {comments, blogpost} = toRefs(props);

function getRandUVAColor() {
  const list = ['orange', 'blue']
  return list[Math.floor((Math.random() * list.length))];

}

function submitReply(node: Comment & { newreply: string }) {
  api.comments.commentsCreate({
    body: node.newreply,
    blogpost: Number.parseInt(blogpost.value),
    parent_comment: node.id
  })
  emit('reply')
  tree.value?.expandAll();
}

function submitNewComment() {
  api.comments.commentsCreate({
    body: newBody.value,
    blogpost: Number.parseInt(blogpost.value)
  })
  emit('reply')
  tree.value?.expandAll();
}

const emit = defineEmits<{
  (event: 'reply'): void
}>()

</script>
