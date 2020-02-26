import Constants from "../utils/Constants.js"
const DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

export const display = {
  name: "Display",
  methods: {
    displayProductUnit(unit) {
      return this.$options.filters.displayUnit(unit);
    }
  },
  filters: {
    displayUnit: function (unit) {
      switch (unit) {
        case Constants.PIECE:
          return "Stück"
        case Constants.WEIGHT:
          return "kg"
        case Constants.BUNDLE:
          return "Bund"
        default:
          return "k/A"
      }
    },
    displayDateTime: function (parseableDate) {
      if (parseableDate) {
        let date = new Date(parseableDate)
        let dateRepresentation = date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        return time + " " + dateRepresentation
      } else {
        return "error parsing time"
      }
    },
    displayDate: function (parseableDate) {
      if (parseableDate) {
        let date = new Date(parseableDate)
        let dateRepresentation = date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
        return dateRepresentation
      } else {
        return "error parsing time"
      }
    },
    displayDay: function(parseableDate) {
      if (parseableDate) {
        let date = new Date(parseableDate)
        return DAYS[date.getDay()]
      } else {
        return "error parsing time"
      }
    }
  }
}
