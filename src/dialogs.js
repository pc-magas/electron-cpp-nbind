const { dialog } = require('electron');

module.exports = function (mainWindow) {
  /**
  * A simple message Dialog
  * @param {string} title The title of the dialog
  * @param {string} message The message of the dialog
  */
  this.messageDialog = (title, message) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: title,
      message: message,
      buttons: ['OK'],
    });
  };

  /**
  * A simple error Dialog
  * @param {string} title The title of the dialog
  * @param {string} message The message of the dialog
  */
  this.errorDialog = (title, message) => {
    dialog.showErrorBox(title, message);
  };
};