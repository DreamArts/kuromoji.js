var kuromoji = require("../src/kuromoji.js");

const dicPath = '../dict/';

kuromoji.builder({ dicPath }).build(function (err, tokenizer) {
  // tokenizer is ready
  var path = tokenizer.tokenize("戸建てに住む。戸建アパート");
  console.log(path);
});
