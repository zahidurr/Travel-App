import deleteHandleSubmit from "../client/js/deleteHandleSubmit";

describe('Test, the function "deleteHandleSubmit()" should exist', () => {
  test("It should return true", async () => {
    expect(deleteHandleSubmit).toBeDefined();
  });
});

describe('Test, the function "deleteHandleSubmit()" should be a function', () => {
  test("It should return true", async () => {
    expect(typeof deleteHandleSubmit).toBe("function");
  });
});
