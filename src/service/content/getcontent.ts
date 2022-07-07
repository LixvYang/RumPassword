import { GroupContent } from "@/utils/quorum-wasm/types";
import rumrequest from "..";

export function getGroupContent(group_id: string | undefined) {
  return rumrequest.post<GroupContent>({
    baseURL: 'https://127.0.0.1:8002/app/api/v1/',
    url: `/group/${group_id}/content?num=20&reverse=true`
  })
}
