/**
 * Created by edgardeng on 2018/7/25.
 */

$(function(){
  $('#comment').click(function(){
    alert('暂时无效，待开发');
  });
})

let app = new Vue({
  el: '#app',
  data: {
    page: undefined,
    article: undefined,
    articleList: [],
    category: {},
    categories: []
  },
  mounted: function () {
    let article = this.getUrlParam('article');
    if (!article) {
      window.location.href="https://edgardeng.github.io"
    }
    this.article = article
    this.renderArticle()
    this.getCategories()
  },
  methods: {
    handleArticleClick: function (item) {
      window.location.href= "./index.html?article=" + encodeURI(item.page)
    },
    handleCateClick: function (item) {
      window.location.href= "./list.html?cate=" + item.page
    },
    getUrlParam: function (name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      let r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r !== null) {
        return decodeURI(r[2]);
      }
      return null; //返回参数值
    },
    renderArticle () {
      var converter = new showdown.Converter({
        tables: true,
        extensions: function () {
          function htmlUnencode(text) {
            return (
              text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
            )
          }
          return [
            {
              type: 'output',
              filter: function (text, converter, options) {
                // use new shodown's regexp engine to conditionally parse codeblocks
                var left = '<pre><code\\b[^>]*>',
                  right = '</code></pre>',
                  flags = 'g',
                  replacement = function (wholeMatch, match, left, right) {
                    // unescape match to prevent double escaping
                    match = htmlUnencode(match);
                    return left + hljs.highlightAuto(match).value + right;
                  };
                return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
              }
            }
          ]
        }()
      });
      $.get(this.article + ".md", function (text) {
        let html = converter.makeHtml(text);
        $('#content').html(html);
      });
      hljs.initHighlightingOnLoad();
    },
    getCategories () {
      let _self = this
      $.get("./category.json", function (data) {
        _self.categories = data
      })
    }
  }
})

