var kuromoji = require("../src/kuromoji.js");
var jaCodeMap = require("jaCodeMap");

const dicPath = '../dict/';

kuromoji.builder({ dicPath }).build(function (err, tokenizer) {
  // tokenizer is ready

  var text = "iPhoneを2019年に購入。K-OPとは？ haut exa-bugsは android. jj:com com 合い jcom Y!mobile、SoftBank, J:COM ";
  //戸建てに住む。おい、ふせよ。戸建アパート。ジェイコムショップセキチュー。ＤｏＣｏＭｏサービス。docomoサービス";

  text = jaCodeMap.auto(text).toLowerCase();
  console.log(text);

  var path = tokenizer.auto(text);
   // var path = tokenizer.tokenize(text);
  console.log(path);
});
