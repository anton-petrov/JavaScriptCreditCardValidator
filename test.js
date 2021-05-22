var valid = require("card-validator");

var numberValidation = valid.number("4019728600418294");

if (!numberValidation.isPotentiallyValid) {
  console.log('invalid card')
}

if (numberValidation.card) {
  console.log(numberValidation.card.type);
  console.log(numberValidation.isValid);
}

console.log(numberValidation)

function getCreditCardInfo(cardNumber) {

}