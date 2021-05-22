var validator = require("card-validator");

window.parseCreditCard = function (cardNumber) {
    return validator.number(cardNumber);
};