/**
 * Created by dengxixi on 2018/7/25.
 */

function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r !== null) {
    return decodeURI(r[2]);
  }
  return null; //返回参数值
}

let page = getUrlParam('article');
if (!page) {
  page = "ME"
}

let converter = new showdown.Converter({extensions: function() {
  function htmlunencode(text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    );
  }
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        // use new shodown's regexp engine to conditionally parse codeblocks
        var left  = '<pre><code\\b[^>]*>',
          right = '</code></pre>',
          flags = 'g',
          replacement = function (wholeMatch, match, left, right) {
            // unescape match to prevent double escaping
            match = htmlunencode(match);
            return left + hljs.highlightAuto(match).value + right;
          };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
}()});

$.get(page + ".md", function(text) {
  let html      = converter.makeHtml(text);
  $('#content').html(html);
});
hljs.initHighlightingOnLoad();