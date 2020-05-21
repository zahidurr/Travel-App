import showNotification from "../client/js/errorHandel";

describe('Test, the function "showNotification()" should exist', () => {
  test("It should return true", async () => {
    expect(showNotification).toBeDefined();
  });
});
describe('Test, the function "showNotification()" should be a function', () => {
  test("It should be a function", async () => {
    expect(typeof showNotification).toBe("function");
  });
});
