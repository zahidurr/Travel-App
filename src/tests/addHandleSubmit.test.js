import { addHandleSubmit } from "../client/js/addHandleSubmit";

describe('Test, the function "addHandleSubmit()" should exist', () => {
  test("It should return true", async () => {
    expect(addHandleSubmit).toBeDefined();
  });
});

describe('Test, the function "addHandleSubmit()" should be a function', () => {
  test("It should return true", async () => {
    expect(typeof addHandleSubmit).toBe("function");
  });
});
