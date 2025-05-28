const { faker } = require("@faker-js/faker");
const fs = require("fs");

const dummyObject = {};

for (let i = 1; i <= 10000; i++) {
  const propName =
    faker.word.sample() + faker.number.int({ min: 1000, max: 9999 });
  dummyObject[propName] = faker.person.fullName();
}

fs.writeFileSync(
  "fake-data.json",
  JSON.stringify(`const longObject = ${dummyObject};module.export =longObject`),
  "utf-8"
);
