SCRIPTS = [
  {
    name: "Coptic",
    ranges: [
      [994, 1008],
      [11392, 11508],
      [11513, 11520],
    ],
    direction: "ltr",
    year: -200,
    living: false,
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet",
  },
  {
    name: "nam",
    ranges: [
      [994, 1008],
      [11392, 11508],
      [11513, 11520],
    ],
    direction: "ltr",
    year: -200,
    living: true,
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet",
  },
];

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let name = [];

name = map(SCRIPTS, (s) => s.name);
console.log(name);
