var kuromoji = require("../src/kuromoji.js");
var jaCodeMap = require("jaCodeMap");

const dicPath = '../dict/';

kuromoji.builder({ dicPath }).build(function (err, tokenizer) {
  // tokenizer is ready

  var text = "Y!mobile、SoftBank, J:COM 戸建てに住む。おい、ふせよ。戸建アパート。ジェイコムショップセキチュー。ＤｏＣｏＭｏサービス。docomoサービス";

  text = jaCodeMap.auto(text).toLowerCase();
  console.log(text);

  var path = tokenizer.auto(text);
  console.log(path);
});
