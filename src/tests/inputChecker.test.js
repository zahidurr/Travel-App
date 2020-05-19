import { checkForURL } from "../client/js/inputChecker";

describe('Test, the function "checkForURL()" should exist', () => {
  test("It should return true", async () => {
    expect(checkForURL).toBeDefined();
  });
});
describe('Test, the function "checkForURL()" should be a function', () => {
  test("It should be a function", async () => {
    expect(typeof checkForURL).toBe("function");
  });
});

describe('Test, the function "checkForURL()" for valid url', () => {
  var url = "https://edition.cnn.com/style/article/fashion-memes/index.html";
  test("It should return true", async () => {
    const response = checkForURL(url);
    expect(response).toBeDefined();
    expect(response).toBe(true);
  });
});
describe('Test "checkForURL()" for invalid url', () => {
  // I replaced 'https' with 'htpshttps' to make it invalid
  var url = "https:edition.cnn.com/style/article/fashion-memes/index.html";
  test("It should return false", async () => {
    const response = checkForURL(url);
    expect(response).toBeDefined();
    expect(response).toBe(false);
  });
});
