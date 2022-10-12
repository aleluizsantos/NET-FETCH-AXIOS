/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcMain, ipcRenderer } = require("electron");

let indexBridge = {
  doSomething: async (event) => {
    const result = await ipcRenderer.invoke("doSomething");
    return result;
  },
  doSomethingFetch: async () => {
    const result = await ipcRenderer.invoke("doSomethingFetch");
    return result;
  },
  doSomethingAxios: async () => {
    const result = await ipcRenderer.invoke("doSomethingAxios");
    return result;
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todoList");

  ipcRenderer.on("gotData", (event, json) => {
    const data = JSON.parse(json);
    todoList.innerText = data.activity;
  });
});

contextBridge.exposeInMainWorld("indexBrindge", indexBridge);
