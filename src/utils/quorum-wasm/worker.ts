import { Go } from './wasm_exec'
import quorumWasmUrl from './lib.wasm'

declare global {
  function KeystoreBackupRaw(...p: Array<any>): Promise<any>;
  function KeystoreRestoreRaw(...p: Array<any>): Promise<any>;
  function IsQuorumRunning(...p: Array<any>): Promise<any>;
}

export const init = async () => {
  const go = new Go();
  if ('instantiateStreaming' in WebAssembly) {
    const r = await WebAssembly.instantiateStreaming(fetch(quorumWasmUrl), go.importObject);
    go.run(r.instance);
    globalThis.postMessage('inited');
  } else if ('instantiate' in WebAssembly) {
    const wasm = await fetch("lib.wasm");
    const r = await WebAssembly.instantiate(await wasm.arrayBuffer(), go.importObject);

    go.run(r.instance);
    globalThis.postMessage('inited');
  }
};

const shim = {
  'KeystoreBackupRaw': async (password: string) => {
    const keys: Array<string> = [];
    await new Promise<void>((rs) => {
      globalThis.KeystoreBackupRaw(
        password,
        (k: string) => keys.push(k),
        () => {
          console.log('done');
          rs();
        },
      );
    });
    return keys;
  },
};

declare const API_LOGGING: string;

globalThis.addEventListener('message', async (e) => {
  try {
    const data = e.data;
    const { method, args, id } = data;
    const wasmMethod = method in shim
      ? (shim as any)[method]
      : (globalThis as any)[method];

    if (!wasmMethod) {
      throw new Error(`method ${method} was not found`);
    }

    const promise = wasmMethod(...args);

    const result = await promise.then((res: any) => {
      const data = 'data' in res ? res.data : res;
      return { data };
    }, (error: any) => {
      console.error(error);
      return { error };
    });
    if (typeof API_LOGGING !== 'undefined' && API_LOGGING) {
      console.log(method, args, result);
    }
    globalThis.postMessage({
      ...result,
      id,
    });
  } catch (e) {
    console.error(e);
  }
});

init();

// export default async function () {
//   console.log("运行init")
//   if ('instantiateStreaming' in WebAssembly) {
//     const r = await WebAssembly.instantiateStreaming(fetch("lib.wasm"), Go.importObject);
//     Go.run(r.instance);
//     globalThis.postMessage('inited');
//   } else if ('instantiate' in WebAssembly) {
//     const wasm = await fetch("lib.wasm");
//     const r = await WebAssembly.instantiate(await wasm.arrayBuffer(), Go.importObject);

//     Go.run(r.instance);
//     globalThis.postMessage('inited');
//   }
//   console.log('启动wasm成功')
// }


