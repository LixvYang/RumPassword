import { Go } from './wasm_exec'
import quorumWasmUrl from './lib.wasm'

const init = async () => {
  const go = new Go();
  const r = await WebAssembly.instantiateStreaming(fetch(quorumWasmUrl), go.importObject);
  go.run(r.instance);
}

init();

export const startQuorum = async (bootstraps: Array<string>) => {
  await StartQuorum('password', bootstraps.join(','))
  console.log(GetNodeInfo())
  console.log('startQuorum over')
}
