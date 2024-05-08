import moment from "moment";

// console.log(obj.month())
function containsOnlyDigits(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const checkInputField = (inputLabel, value, inputDate) => {
  if (value.length === 0) {
    return "empty";
  } else {
    switch (inputLabel) {
      case "years":
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        if (value > currentYear || !containsOnlyDigits(value)) {
          return "invalid";
        }
        return "valid";
      case "months":
        if (value < 1 || value > 12 || !containsOnlyDigits(value)) {
          return "invalid";
        }
        return "valid";

      default:
        if (!containsOnlyDigits(value)) {
          return "invalid";
        }
        const date = moment(inputDate, "DD-MM-YYYY");
        return date.isValid() ? "valid" : "invalid";
    }
  }
};

export { checkInputField, containsOnlyDigits };
