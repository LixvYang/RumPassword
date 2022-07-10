<template>
  <div class="home">
    <h1>{{ groupId }}</h1>
    <h1>你好我是 RumHome</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    groupId: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props, { emit }) {
    return {}
  }
})
</script>

<style scoped></style>
