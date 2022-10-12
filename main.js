// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { net } = require("electron");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const api = require("./src/service/api");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),

      enableRemoteModule: true,
      nodeIntegration: true, // ATENÇÃO AQUI - attention here - that's why your node_module works or not
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle("doSomething", async () => {
  const request = net.request("https://www.boredapi.com/api/activity");
  request.on("response", (response) => {
    const data = [];
    response.on("data", (chunk) => {
      data.push(chunk);
      // console.log("Buffer", chunk);
    });
    response.on("end", async () => {
      const json = Buffer.concat(data).toString();
      mainWindow.webContents.send("gotData", json);
    });
  });
  request.end();
});

ipcMain.handle("doSomethingFetch", async () => {
  const response = await fetch("https://www.boredapi.com/api/activity");
  const body = await response.text();
  return body;
});

ipcMain.handle("doSomethingAxios", async () => {
  const response = await api.get("/activity");
  return response.data;
});
