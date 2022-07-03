<template>
  <div class="Bootstrap">
    <tempelete
      class="item"
      v-for="(boot, index) in form?.bootstraps"
      :key="boot.index"
    >
      <el-input
        placeholder="端口"
        type="textarea"
        v-if="form"
        v-model="form.bootstraps[index]"
        :autosize="{ minRows: 2, maxRows: 4 }"
      ></el-input>
      <el-button @click="deleteBootstrap(index)" type="danger" circle>
        <el-icon>
          <Delete />
        </el-icon>
      </el-button>
    </tempelete>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['deleteBootstrap'],
  props: {
    form: {
      type: Object
    }
  },
  setup(props, ctx) {
    const deleteBootstrap = (index: number) => {
      ctx.emit('deleteBootstrap', index)
    }

    return {
      deleteBootstrap
    }
  }
})
</script>

<style scoped lang="less">
.item {
  display: flex;
}
</style>
