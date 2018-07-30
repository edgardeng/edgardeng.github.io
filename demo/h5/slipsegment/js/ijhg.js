!function () {
  !function (t, o) {
    function n(t, n) {
      this.$n = o(t), this.template = "", this.z = o.extend({}, i, n), this.s = [], this.sof = !1, this.vdp = !1, this.jnv = !1, this.bodyCls = "", this.$cursor = !1, this._defaults = i, this._name = e, this.init()
    }

    var e = "pageScroller", i = {
      a: 0,
      b: 0,
      c: .5,
      d: 400,
      e: "linear",
      f: "after",
      j: !1,
      k: "a",
      l: "seen",
      m: "active",
      o: "visible",
      p: function () {
      },
      q: function () {
      },
      r: function () {
      },
      s: !1
    };
    n.prototype = {
      init: function () {
        var n = this;
        o(t).load(function () {
          n.od(!0)
        }), o(t).on("scroll", o.proxy(this.pd, this)), o(t).on("resize", o.proxy(this.od, this)), o(t).on("hashchange", function () {
          n.jnv || n.hyd(n.hoj()), n.jnv = !1
        })
      }, hoj: function () {
        var oj = t.location.hash.replace("#", "").split("/"), n = oj.length ? oj[0] : !1;
        return n
      }, od: function (t) {
        var n = this;
        t = t || !1, n.s = [], o(n.z.k, n.$n).each(function (e, i) {
          var s = o(i), r = s.attr("href").replace("#", ""), a = o("[data-anchor='" + r + "']"), c = a.offset().top,
            l = c + a.outerHeight();
          n.s.push({s: r, t: c, b: l, i: s, el: a}), t && s.on("click", o.proxy(n.hyd, n))
        }), t && (n.hoj() && n.hyd(n.hoj()), this.pd()), this.dc()
      }, hyd: function (n) {
        var e = this, i = "string" == typeof n ? n : o(n.currentTarget).attr("href").replace("#", ""), s = e.jkl(i),
          r = s.el.offset().top - e.z.a;
        return r != o(t).scrollTop() && (e.sof = !0, "function" == typeof e.z.p && e.z.p(i, s.el, s.i), o("body,html").stop().animate({scrollTop: r}, e.z.d, e.z.e, o.proxy(e.oac, e)), "before" == e.z.f && e.dsm(i)), !1
      }, oac: function () {
        var t = this;
        t.sof = !1, "after" == t.z.f && t.dsm(!1), t.dsr(), "function" == typeof t.z.q && t.z.q(t.vdp.s, t.vdp.el, t.vdp.i)
      }, pd: function () {
        var t = this;
        t.sof || (t.dsm(!1), t.dsr())
      }, dsm: function (n) {
        var e, i, s = this;
        n ? i = s.jkl(n) : (e = o(t).scrollTop(), i = s.hdp(e)), i && i.s != s.vdp.s && (o(s.z.k, s.$n).removeClass("active"), i.i.addClass("active"), s.z.j && (history.hasOwnProperty("pushState") ? history.pushState(null, null, "#" + i.s) : location.hash = "#" + i.s, s.jnv = !0))
      }, dsr: function () {
        var n = this, e = o(t).scrollTop(), i = n.hdp(e);
        i && i.s != n.vdp.s && (n.vdp && n.vdp.el.removeClass(n.z.m).addClass(n.z.l), n.vdp = i, "function" == typeof n.z.r && n.z.r(n.vdp.s, n.vdp.el, n.vdp.i), i.el.addClass(n.z.m))
      }, hdp: function (n) {
        var e = this, i = o(t).height(), s = !1;
        for (var r in e.s) {
          var a = parseInt(r);
          e.s[a].t < n + i * e.z.c + e.z.b && (s = e.s[a]), e.s[a].t < n + i - 100 && e.s[a].t > n ? e.s[a].el.addClass(e.z.o) : e.s[a].el.removeClass(e.z.o)
        }
        return s
      }, jkl: function (t) {
        var ok = this;
        for (var n in ok.s) {
          var e = parseInt(n);
          if (ok.s[e].s == t)return ok.s[e]
        }
        return !1
      }, dc: function () {
        var n = this;
        if (n.z.s) {
          n.$cursor || (n.$cursor = o('<div class="jqps-dev--cursor" style="position: fixed; left: 0; right: 0; top: 0; border-bottom: 1px dotted red; z-index: 999; height: 0;"><div style="padding: 6px 10px; font-weight: bold; font-family: monospace; color: red;">PageScroller Cursor</div></div>').appendTo("body"));
          var e = o(t).height(), i = e * n.z.c + n.z.b;
          n.$cursor.css({top: i + "px"})
        }
      }
    }, o.fn[e] = function (t) {
      return this.each(function () {
        o.data(this, e) || o.data(this, e, new n(this, t))
      })
    }
  }(window, jQuery)
}();
$(function () {

  var bodyClass = '', $body = $('body'), opts = {
    a: 100, b: -100,
    e: 'easeOutCubic',
    r: function (s, e, l) {
      if (bodyClass) $body.removeClass(bodyClass);
      $body.addClass(s);
      bodyClass = s;
    }
  };

  $('.page-bulls, .amg-page-scroller').pageScroller(opts);

});