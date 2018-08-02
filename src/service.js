import data from "./data";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const popularCities = [
  data[random(5, data.length - 1)],
  data[random(5, data.length - 1)],
  data[random(5, data.length - 1)]
];

let randomDelay = () =>
  new Promise(resolve => setTimeout(resolve, random(200, 800)));

export async function find(query, take = 5, page = 0, errorIsPossible = false) {
  await randomDelay();

  if (errorIsPossible && random(0, 30) > 25)
    throw Error("Something went wrong");

  if (typeof query === "string") {
    const result = data.filter(v =>
      v.City.toLowerCase().includes(query.toString().toLowerCase())
    );
    return { data: result.slice(take * page, take), totalCount: result.length };
  } else if (!query) return { data, totalCount: data.length };
  else throw Error("Wrong query");
}

export async function popular() {
  await randomDelay();
  return popularCities;
}

export async function findFrom50(query) {
  let source = data.slice(0, 50);
  if (typeof query === "string") {
    return source.filter(v =>
      v.City.toLowerCase().includes(query.toString().toLowerCase())
    );
  } else if (!query) return source;
  else throw Error("Wrong query");
}
