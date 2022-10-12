/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const btnNet = document.getElementById("btn-net");
const btnFetch = document.getElementById("btn-fetch");
const btnAxios = document.getElementById("btn-axios");
const todoList = document.getElementById("todoList");

btnNet.addEventListener("click", async function () {
  await window.indexBrindge.doSomething();
});
btnFetch.addEventListener("click", async function () {
  const result = await window.indexBrindge.doSomethingFetch();
  const data = JSON.parse(result);
  todoList.innerText = data.activity;
});
btnAxios.addEventListener("click", async function () {
  const result = await window.indexBrindge.doSomethingAxios();
  todoList.innerText = result.activity;
});
