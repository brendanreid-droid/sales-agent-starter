const path = require("path");
const assert = require("assert");
const S = require("./sapia_deck.js");

const output = process.argv[2] || "sapia_deck_image-frame-smoke_v1.pptx";
const p = S.newDeck({ title: "Sapia.ai image frame smoke test" });

let failedInputMutations = 0;
const mutationProbe = {
  addShape: () => { failedInputMutations += 1; },
  addImage: () => { failedInputMutations += 1; },
};
assert.throws(() => S.imageFrame(mutationProbe, {
  x: 1,
  y: 1,
  w: 4,
  h: 3,
  path: path.join(__dirname, "../assets/does-not-exist.png"),
}));
assert.strictEqual(failedInputMutations, 0, "failed imageFrame input mutated the slide");

const contain = S.page(p, {
  right: "Image frame smoke test 01",
  chapterText: "Contain",
  title: "Square media stays square in a landscape frame.",
});
S.imageFrame(contain, {
  x: 1.25,
  y: 2.05,
  w: 10.83,
  h: 4.4,
  path: path.join(__dirname, "../assets/tick_pink.png"),
  fit: "contain",
  altText: "image-frame-regression-contain",
});

const cover = S.page(p, {
  right: "Image frame smoke test 02",
  chapterText: "Cover",
  title: "Wide media crops without distortion in a square frame.",
});
S.imageFrame(cover, {
  x: 4.46,
  y: 2.05,
  w: 4.4,
  h: 4.4,
  path: path.join(__dirname, "../assets/logo_black.png"),
  fit: "cover",
  altText: "image-frame-regression-cover",
});

p.writeFile({ fileName: output });
