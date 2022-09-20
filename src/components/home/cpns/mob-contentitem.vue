<template>
  <div class="content-item">
    <p>
      {{ content?.name }}
    </p>
    <el-button
      class="content-item-copybtn"
      circle
      @click="copyContentItemBtn"
      :data-clipboard-text="content?.content"
      ><el-icon color="#409EFF"><CopyDocument /></el-icon
    ></el-button>
    <el-button
      class="content-item-editbtn"
      circle
      @click="changeContentItem(content?.name)"
    >
      <el-icon color="#85ce61"><Edit /></el-icon
    ></el-button>
    <el-button
      class="content-item-deletebtn"
      circle
      @click="delContentItem(content?.content, content?.name)"
      ><el-icon color="#F56C6C"><Delete /></el-icon
    ></el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'
import { delGroupContent } from '@/service/content/delcontent'
import { useStore } from '@/store'
import { getGroupContent } from '@/service/content/getcontent'

export default defineComponent({
  props: {
    content: {
      type: Object,
      require: true
    }
  },
  emits: ['changeContentItem'],
  setup(props, { emit }) {
    const store = useStore()
    const copyContentItemBtn = () => {
      const clipboard = new Clipboard('.content-item-copybtn')
      clipboard.on('success', () => {
        ElMessage({
          center: true,
          message: '复制成功',
          type: 'success'
        })
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        // 不支持复制
        ElMessage.error('Oops, this is a error message.')
        // 释放内存
        clipboard.destroy()
      })
    }

    const changeContentItem = (changeContentItemName: string) => {
      emit('changeContentItem', changeContentItemName)
    }

    const delContentItem = (
      delContentItemContent: string,
      delContentItemName: string
    ) => {
      const selectedGroupid = computed(() => store.state.main.groupId)
      let delTrxId: string | undefined = ''
      getGroupContent(selectedGroupid.value)
        .then((groupContent) => {
          for (let i = groupContent.data.length - 1; i >= 0; i--) {
            if (
              groupContent.data[i].Content?.content == delContentItemContent
            ) {
              delTrxId = groupContent.data[i].TrxId
            }
          }
        })
        .then(() => {
          console.log('delTrxId ' + delTrxId)

          console.log(
            delTrxId + ' ' + selectedGroupid.value + ' ' + delContentItemName
          )
          delGroupContent(delTrxId, selectedGroupid.value, delContentItemName)
          setTimeout(() => {
            store.dispatch(
              'main/handleGroupIdAction',
              selectedGroupid.value.toString()
            )
          }, 20000)
        })
    }

    return {
      copyContentItemBtn,
      delContentItem,
      changeContentItem
    }
  }
})
</script>

<style scoped lang="less">
.content-item {
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  position: relative;
  .content-item-copybtn {
    position: absolute;
    top: 20%;
    right: 25%;
  }
  .content-item-editbtn {
    position: absolute;
    top: 20%;
    right: 15%;
  }
  .content-item-deletebtn {
    position: absolute;
    top: 20%;
    right: 5%;
  }
}
</style>
