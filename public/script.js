let ccNumberInput = document.querySelector(".cc-number-input"),
  ccNumberPattern = /^\d{0,16}$/g,
  ccNumberSeparator = " ",
  ccNumberInputOldValue,
  ccNumberInputOldCursor,
  ccExpiryInput = document.querySelector(".cc-expiry-input"),
  ccExpiryPattern = /^\d{0,4}$/g,
  ccExpirySeparator = "/",
  ccExpiryInputOldValue,
  ccExpiryInputOldCursor,
  ccCVCInput = document.querySelector(".cc-cvc-input"),
  ccCVCPattern = /^\d{0,3}$/g,
  cardTypeText = document.getElementById("card-type"),
  cardNiceTypeText = document.getElementById("nice-card-type"),
  isCardPotentiallyValidText = document.getElementById(
    "is-card-potentially-valid"
  ),
  isCardValidText = document.getElementById("is-card-valid"),
  mask = (value, limit, separator) => {
    var output = [];
    for (let i = 0; i < value.length; i++) {
      if (i !== 0 && i % limit === 0) {
        output.push(separator);
      }

      output.push(value[i]);
    }

    return output.join("");
  },
  unmask = (value) => value.replace(/[^\d]/g, ""),
  checkSeparator = (position, interval) =>
    Math.floor(position / (interval + 1)),
  ccNumberInputKeyDownHandler = (e) => {
    let el = e.target;
    ccNumberInputOldValue = el.value;
    ccNumberInputOldCursor = el.selectionEnd;
  },
  ccNumberInputInputHandler = (e) => {
    let el = e.target,
      newValue = unmask(el.value),
      newCursorPosition;

    if (newValue.match(ccNumberPattern)) {
      newValue = mask(newValue, 4, ccNumberSeparator);

      newCursorPosition =
        ccNumberInputOldCursor -
        checkSeparator(ccNumberInputOldCursor, 4) +
        checkSeparator(
          ccNumberInputOldCursor +
            (newValue.length - ccNumberInputOldValue.length),
          4
        ) +
        (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

      el.value = newValue !== "" ? newValue : "";
    } else {
      el.value = ccNumberInputOldValue;
      newCursorPosition = ccNumberInputOldCursor;
    }

    el.setSelectionRange(newCursorPosition, newCursorPosition);

    highlightCC(el.value);
  },
  highlightCC = (ccValue) => {
    let cardInfo = window.parseCreditCard(ccValue);

    cardTypeText.innerText = "???? ????????????????";
    cardNiceTypeText.innerText = "???? ????????????????";
    isCardPotentiallyValidText.innerText = "??????";
    isCardValidText.innerText = "??????";

    let ccCardType = "";

    console.log(cardInfo);

    if (cardInfo) {
      if (cardInfo.card !== null) {
        ccCardType = cardInfo.card.type !== null ? cardInfo.card.type : "";

        if (
          ccCardType !== "visa" &&
          ccCardType !== "mastercard" &&
          ccCardType !== "mir"
        ) {
          ccCardType = cardInfo.isPotentiallyValid ? 'generic' : '';
        }

        cardTypeText.innerText = cardInfo.card.type;
        cardNiceTypeText.innerText = cardInfo.card.niceType;
      }
      isCardPotentiallyValidText.innerText = cardInfo.isPotentiallyValid
        ? "????"
        : "??????";
      isCardValidText.innerText = cardInfo.isValid ? "????" : "??????";
    }
    let activeCC = document.querySelector(".cc-types__img--active"),
      newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

    if (activeCC) activeCC.classList.remove("cc-types__img--active");
    if (newActiveCC) newActiveCC.classList.add("cc-types__img--active");
  },
  ccExpiryInputKeyDownHandler = (e) => {
    let el = e.target;
    ccExpiryInputOldValue = el.value;
    ccExpiryInputOldCursor = el.selectionEnd;
  },
  ccExpiryInputInputHandler = (e) => {
    let el = e.target,
      newValue = el.value;

    newValue = unmask(newValue);
    if (newValue.match(ccExpiryPattern)) {
      newValue = mask(newValue, 2, ccExpirySeparator);
      el.value = newValue;
    } else {
      el.value = ccExpiryInputOldValue;
    }
  };

ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
ccNumberInput.addEventListener("input", ccNumberInputInputHandler);

ccExpiryInput.addEventListener("keydown", ccExpiryInputKeyDownHandler);
ccExpiryInput.addEventListener("input", ccExpiryInputInputHandler);
