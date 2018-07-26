import { find } from "./service";

it("returns all cities", () => {
  return find().then(result => expect(result.length).toBe(5000));
});

it("return empty array", () => {
  find("abirvalg").then(result => {
    expect(result.length).toBe(0);
  });
});

it("returns single result", () => {
  find("г. Белинский").then(result => {
    expect(result.length).toBe(1);
    expect(result[0].Id).toBe(0);
    expect(result[0].City).toBe("г. Белинский");
  });
});

it("returns multiple results", () => {
  find("ант").then(result => expect(result.length).toBe(21));
});
