import { ElLoading } from 'element-plus'

export function RumLoading(isLock: boolean, ctx: string, time?: number) {
  const loading = ElLoading.service({
    lock: isLock,
    text: ctx,
    background: 'rgba(0, 0, 0, 0.5)'
  })
  setTimeout(() => {
    loading.close()
  }, time || 2000)
}
