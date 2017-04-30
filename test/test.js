var kuromoji = require("../src/kuromoji.js");
var jaCodeMap = require("jaCodeMap");

const dicPath = '../dict/';

kuromoji.builder({ dicPath }).build(function (err, tokenizer) {
  // tokenizer is ready

  var text = "開成町 Twitter iPhoneを2019年に購入。K-OPとは？ haut exa-bugsは android. jj:com com 合い jcom Y!mobile、SoftBank, J:COM ";
  text = "開成町 Twitter"
  text = 'Twitter カバー エラー タブー メモリー メモ コンピューター　開成町   TEL 集合住宅 ファミリー世帯（親と子） SoftBank 600 SoftBank J:COM 1年～1年半 いいえ いいえ ガラケー                   '
  //戸建てに住む。おい、ふせよ。戸建アパート。ジェイコムショップセキチュー。ＤｏＣｏＭｏサービス。docomoサービス";

  text = jaCodeMap.auto(text).toLowerCase();
  console.log(text);

  var path = tokenizer.auto(text);
   // var path = tokenizer.tokenize(text);
  console.log(path);
});
