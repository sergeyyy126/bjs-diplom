let userForm = new userForm();

userForm.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    const isSuccess = response.success;

    if (isSuccess) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }
  })
}

userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, response => {
    const isSuccess = response.success;

    if (isSuccess) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  })
}