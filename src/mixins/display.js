export const display = {
  filters: {
    displayUnit: function (unit) {
      switch (unit) {
          case "p":
            return "Stück"
          case "g":
            return "kg"
          default:
            return "k/A"
      }
    }
  }
}
