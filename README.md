kuromoji.js
===========

[![Build Status](https://travis-ci.org/takuyaa/kuromoji.js.svg?branch=master)](https://travis-ci.org/takuyaa/kuromoji.js)
[![Coverage Status](https://coveralls.io/repos/github/takuyaa/kuromoji.js/badge.svg?branch=master)](https://coveralls.io/github/takuyaa/kuromoji.js?branch=master)
[![npm version](https://badge.fury.io/js/kuromoji.svg)](http://badge.fury.io/js/kuromoji)
[![Bower version](https://badge.fury.io/bo/kuromoji.svg)](http://badge.fury.io/bo/kuromoji)
[![dependencies](https://david-dm.org/takuyaa/kuromoji.js.svg)](https://david-dm.org/takuyaa/kuromoji.js)
[![Code Climate](https://codeclimate.com/github/takuyaa/kuromoji.js/badges/gpa.svg)](https://codeclimate.com/github/takuyaa/kuromoji.js)
[![Downloads](https://img.shields.io/npm/dm/kuromoji.svg)](https://www.npmjs.com/package/kuromoji)

JavaScript implementation of Japanese morphological analyzer.
This is a pure JavaScript porting of [Kuromoji](http://www.atilika.com/ja/products/kuromoji.html).

You can see how kuromoji.js works in [demo site](http://takuyaa.github.io/kuromoji.js/demo/tokenize.html).


Directory
---------

Directory tree is as follows:

    build/
      kuromoji.js -- JavaScript file for browser (Browserified)
    demo/         -- Demo
    dict/         -- Dictionaries for tokenizer (gzipped)
    example/      -- Examples to use in Node.js
    src/          -- JavaScript source
    test/         -- Unit test


Usage
-----

You can tokenize sentences with only 5 lines of code.
If you need working examples, you can see the files under the demo or example directory.


### Node.js

Install with npm package manager:

    npm install kuromoji

Load this library as follows:

    var kuromoji = require("kuromoji");

You can prepare tokenizer like this:

    kuromoji.builder({ dicPath: "path/to/dictionary/dir/" }).build(function (err, tokenizer) {
        // tokenizer is ready
        var path = tokenizer.tokenize("すもももももももものうち");
        console.log(path);
    });



### Browser

You only need the build/kuromoji.js and dict/*.dat.gz files

Install with Bower package manager:

    bower install kuromoji

Or you can use the kuromoji.js file and dictionary files from the GitHub repository.

In your HTML:

    <script src="url/to/kuromoji.js"></script>

In your JavaScript:

    kuromoji.builder({ dicPath: "/url/to/dictionary/dir/" }).build(function (err, tokenizer) {
        // tokenizer is ready
        var path = tokenizer.tokenize("すもももももももものうち");
        console.log(path);
    });


API
---

The function tokenize() returns an JSON array like this:

    [ {
        word_id: 509800,          // 辞書内での単語ID
        word_type: 'KNOWN',       // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
        word_position: 1,         // 単語の開始位置
        surface_form: '黒文字',    // 表層形
        pos: '名詞',               // 品詞
        pos_detail_1: '一般',      // 品詞細分類1
        pos_detail_2: '*',        // 品詞細分類2
        pos_detail_3: '*',        // 品詞細分類3
        conjugated_type: '*',     // 活用型
        conjugated_form: '*',     // 活用形
        basic_form: '黒文字',      // 基本形
        reading: 'クロモジ',       // 読み
        pronunciation: 'クロモジ'  // 発音
      } ]

(This is defined in src/util/IpadicFormatter.js)

See also [JSDoc page](https://takuyaa.github.io/kuromoji.js/jsdoc/) in details.

## 追加

関数: auto
 - 変換: 全角→半角
 - 変換: 大文字→小文字
 - 名詞のみ抽出

```
/**
 * 一般的な名詞を抽出するユーティリティ
 *
 * 未知語処理の定義
 * https://taku910.github.io/mecab/unk.html
 */
function map(array) {
  return array.reduce(function(memo, v) {
    memo[v] = true;
    return memo;
  }, {});
}
var automap = map(['一般', '固有名詞', '数', 'サ変接続', '形容動詞語幹', '副詞可能', 'アルファベット']);
var autostop = map(['、', "～", '？', ',', '.', "#", '-']);
Tokenizer.prototype.auto = function(text) {
  text = jaCodeMap.auto(text).toLowerCase();
  var tokens = this.tokenize(text);
  return Object.keys(tokens.reduce(function(memo, token) {
    if (automap[token.pos_detail_1]) {
      var key = (token.word_type === 'KNOWN') ? token.basic_form : token.surface_form;
      if (!autostop[key])
        memo[key] = true;
    }
    return memo;
  }, {}));
};

```

## カスタマイズ
### [0-9] の連続を1つの形態素とする

Noun.number.csv
```
NUMERIC,1295,1295,0,名詞,数,*,*,*,*,*
```

### [a-zA-Z] の連続を1つの形態素となりやすくする
```
ALPHA,1285,1285,4000,名詞,一般,*,*,*,*,*
ALPHA,1293,1293,4000,名詞,固有名詞,地域,一般,*,*,*
ALPHA,1292,1292,4000,名詞,固有名詞,組織,*,*,*,*
ALPHA,1289,1289,4000,名詞,固有名詞,人名,一般,*,*,*
ALPHA,1288,1288,4000,名詞,固有名詞,一般,*,*,*,*
ALPHA,3,3,4000,感動詞,*,*,*,*,*,*
```
