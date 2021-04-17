const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { electron } = require('process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences:{
      nodeIntegration: true
    }
  });
  const shell = require('electron').shell
  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
          {label:'Menu Principal',
            click(){
              openMainWindow(mainWindow.id)
            }
          }
          // ,
          //   {label:'Cerrar Ventana',
          //   role: 'close'
          // }
          ,
            {label: 'Menú Anterior',
              click(){
                navToPreviousWindow(mainWindow.id)
              }
              
          },
            {label:'Salir',
              click(){
                app.quit()
              }
            }
            ,
            {label:'Herramientas de desarrollador',
            role: 'toggleDevTools'
          }
        ]
    }
])
Menu.setApplicationMenu(menu); 

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ventanaPrincipal= null;

function openMainWindow(id) {
  
  ventanaPrincipal = BrowserWindow.fromId(id);
  openedWindowsArray = BrowserWindow.getAllWindows();
  openedWindowsArray.forEach(element => {
    if (element != ventanaPrincipal){
      element.close();
    }
  });
  ventanaPrincipal.focus();

}

function navToPreviousWindow(id){
  var idChildWindow = null;
  ventanaPrincipal = BrowserWindow.fromId(id);
  openedWindowsArray = BrowserWindow.getAllWindows();
  openedWindowsArray.forEach(element => {
    if (element != ventanaPrincipal){
      console.log("Id de los hijos"+ element.id)
      idChildWindow=element.id;
      ventanaHijo = BrowserWindow.fromId(idChildWindow);
      console.log("Puede ir atrás?"+ ventanaHijo.webContents.canGoBack());
      ventanaHijo.webContents.goBack();
    }else{
      console.log("Id de la principal"+ ventanaPrincipal.id)
    }
 

  });
}