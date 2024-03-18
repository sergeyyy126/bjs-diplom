'use strict';

const logout = new LogoutButton();

// Выход из личного кабинета
logout.action = () => {
    ApiConnector.logout(responseBody => {
        if (responseBody.success === true) location.reload();
    });
}

// Получение информации о пользователе
ApiConnector.current(responseBody => {
    if (responseBody.success === true) {
        ProfileWidget.showProfile(responseBody.data);
    }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

getExchangeRate();
setInterval(getExchangeRate, 60000);

function getExchangeRate() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

// Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Деньги добавлены');
        } else {
            moneyManager.setMessage(false, 'Не удалось добавить деньги');
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Конвертация успешно выполнена.');
        } else {
            moneyManager.setMessage(false, 'Не удалось конвертировать деньги!');
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Деньги успешно переведены');
        } else {
            moneyManager.setMessage(false, 'Не удалось перевести деньги! Проверьте счет.');
        }
    });
}

// Работа с избранным

const widget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success === true) {
      widget.clearTable();
      widget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
});

widget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            widget.clearTable();
            widget.fillTable(response.data);
        } else {
            moneyManager.setMessage(false, 'Не удалось добавить пользователя');
        }
    });
}

widget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            widget.clearTable();
            widget.fillTable(response.data);
        } else {
            moneyManager.setMessage(false, 'Не удалось добавить пользователя');
        }
    });
}
