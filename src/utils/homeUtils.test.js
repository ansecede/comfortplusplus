const recCodeToTemp = require("./homeUtils.js");

test("Code 7 is equal to 20 C", () => {
  expect(recCodeToTemp(8)).toBe(21);
});
