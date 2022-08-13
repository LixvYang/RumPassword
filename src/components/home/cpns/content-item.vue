<template>
  <div class="content-item">
    {{ content?.Content.name }}
    <el-button
      class="content-item-copybtn"
      circle
      size="small"
      @click="copyContentItemBtn(content?.Content.content)"
      :data-clipboard-text="content?.Content.content"
      ><el-icon color="#409EFF"><CopyDocument /></el-icon
    ></el-button>
    <el-button class="content-item-deletebtn" circle size="small"
      ><el-icon color="#F56C6C"><Delete /></el-icon
    ></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    content: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const getGroupContent = () => {
      console.log(props.content)
    }
    getGroupContent()

    const copyContentItemBtn = (content: string | undefined) => {
      console.log(content)
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
    return {
      copyContentItemBtn
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
  .content-item-copybtn {
    position: relative;
    left: 50%;
  }
  .content-item-deletebtn {
    position: relative;
    left: 50%;
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
