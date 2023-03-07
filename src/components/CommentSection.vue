<template>
  <div class="row">
    <div class="q-pa-md q-gutter-sm col-3">
      <q-tree
        :nodes="comments ?? []"
        node-key="id"
        label-key="body"
        children-key="comments"
        default-expand-all
        >

        <template v-slot:default-header="prop">
          <div class="row items-center">
            <q-icon :name="prop.node.icon || 'account_circle'" :color="getRandUVAColor()" size="28px" class="q-mr-sm" />
            <div class="text-weight-bold">{{ prop.node.owner.first_name }} {{ prop.node.owner.last_name }} - <span class="text-weight-light">{{ fromNow(new Date(prop.node.created)) }}</span></div>
          </div>
        </template>

        <template v-slot:default-body="prop">
          <div class="row q-pl-lg">
            <p class="text-weight-regular text-black">{{prop.node.body}}</p>
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
    <!--    <comment-section v-for="comment in comments" :comments="comment.replies" v-bind:key="comment.id" />-->
  </div>
</template>

<script setup lang="ts">
import { Comment } from '../generated/Api';
import { toRefs } from 'vue';
import { fromNow } from 'src/generated/3177836'
import { api } from 'boot/axios';
const props = defineProps<{
  comments: Comment[]
}>();

const { comments } = toRefs(props);

function getRandUVAColor() {
  const list = ['orange', 'blue']
  return list[Math.floor((Math.random()*list.length))];

}

function submitReply(node: Comment & {newreply: string}) {
  api.comments.commentsCreate({
    body: node.newreply,
    blogpost: node.blogpost,
    parent_comment: node.id
  })
  emit('reply')
}

const emit = defineEmits<{
  (event: 'reply'): void
}>()

</script>
