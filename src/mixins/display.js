import Constants from "../utils/Constants.js"
export const display = {
  filters: {
    displayUnit: function (unit) {
      switch (unit) {
        case Constants.PIECE:
          return "Stück"
        case Constants.WEIGHT:
          return "kg"
        default:
          return "k/A"
      }
    }
  }
}
