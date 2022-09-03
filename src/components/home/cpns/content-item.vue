<template>
  <div class="content-item">
    {{ content?.name }}
    <el-button
      class="content-item-copybtn"
      circle
      size="small"
      @click="copyContentItemBtn"
      :data-clipboard-text="content?.content"
      ><el-icon color="#409EFF"><CopyDocument /></el-icon
    ></el-button>
    <el-button
      class="content-item-editbtn"
      circle
      size="small"
      @click="changeContentItem(content?.name)"
      ><el-icon color="#85ce61"><Edit /></el-icon
    ></el-button>
    <el-button
      class="content-item-deletebtn"
      circle
      size="small"
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
          for (let i = groupContent.length - 1; i >= 0; i--) {
            if (groupContent[i].Content?.content == delContentItemContent) {
              delTrxId = groupContent[i].TrxId
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
  .content-item:hover {
    background-color: rgb(100, 172, 179);
  }
  margin: auto;
  width: 60%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  position: relative;
  .content-item-copybtn {
    position: absolute;
    left: 100%;
  }
  .content-item-editbtn {
    position: absolute;
    left: 90%;
  }
  .content-item-deletebtn {
    position: absolute;
    left: 105%;
  }
}

.content-item:hover {
  background-color: rgb(216, 238, 240);
}
// .content-item {
//   width: 100%;
//   height: 100%;
//   appearance: none;
//   background-color: #f8f5f5;
//   border-radius: 40em;
//   border-style: none;
//   box-shadow: #adcfff 0 -12px 6px inset;
//   box-sizing: border-box;
//   color: #000000;
//   cursor: pointer;
//   display: inline-block;
//   font-family: -apple-system, sans-serif;
//   font-size: 1.2rem;
//   font-weight: 700;
//   letter-spacing: -0.24px;
//   margin: 0;
//   outline: none;
//   padding: 1rem 1.3rem;
//   quotes: auto;
// <el-icon><CopyDocument /></el-icon>
//   text-align: center;
//   text-decoration: none;
//   transition: all 0.15s;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .content-item:hover {
//   background-color: #ffc229;
//   box-shadow: #ff6314 0 -6px 8px inset;
//   transform: scale(1.125);
// }

// .content-item:active {
//   transform: scale(1.025);
// }

// @media (min-width: 768px) {
//   .content-item {
//     font-size: 1.5rem;
//     padding: 0.75rem 2rem;
//   }
// }
</style>
