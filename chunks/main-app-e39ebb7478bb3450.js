(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[358], {
    2970: () => {
        "use strict";
        let e = Symbol("postMessageResponseTimeout")
          , t = 0;
        class n {
            destroy() {
                this.clear(),
                this.removeListeners.forEach(e => e())
            }
            isTimeout(t) {
                return t === e
            }
            post(n, o, i) {
                t++;
                let {timeout: r, origin: a="*"} = i || {};
                return this.client.postMessage({
                    data: o,
                    id: t,
                    type: n
                }, a),
                new Promise(n => {
                    this.waitRes.set(t, e => {
                        n(e)
                    }
                    ),
                    setTimeout( () => {
                        this.waitRes.delete(t),
                        n(e)
                    }
                    , r || this.baseTimeout)
                }
                )
            }
            on(e, t, n) {
                let {once: o, origin: i="*"} = n || {}
                  , r = async n => {
                    let r, {id: l, type: s, data: d} = n.data;
                    if (s === e) {
                        if (console.log(r = await t(d)),
                        l && i === n.origin || "*" === i) {
                            var c;
                            null == (c = n.source) || c.postMessage({
                                fromType: e,
                                id: l,
                                data: r
                            }, n.origin)
                        }
                        o && a()
                    }
                }
                ;
                window.addEventListener("message", r);
                let a = () => {
                    window.removeEventListener("message", r),
                    this.removeListeners.delete(a)
                }
                ;
                return this.removeListeners.add(a),
                a
            }
            emitResponse(e) {
                let {id: t, data: n} = e.data
                  , o = this.waitRes.get(t);
                o && o(n)
            }
            constructor(e, t) {
                this.waitRes = new Map,
                this.removeListeners = new Set,
                this.client = e,
                this.baseTimeout = (null == t ? void 0 : t.timeout) || 1e3;
                let n = this.emitResponse.bind(this);
                this.clear = () => {
                    window.removeEventListener("message", n)
                }
                ,
                window.addEventListener("message", n)
            }
        }
        let o = e => {
            let t = "";
            return t && e.startsWith(t) ? e.replaceAll(t, "") || "/" : e || "/"
        }
          , i = e => new Promise(t => setTimeout(t, e))
          , r = () => window.next.router
          , a = new n(window.parent)
          , l = async (e, t) => {
            await a.post("routeWillChange", {
                next: o(e)
            }, t)
        }
          , s = e => e.startsWith("http://") || e.startsWith("https://")
          , d = !1
          , c = new Proxy(WebSocket,{
            construct(e, t) {
                let[n,o] = t
                  , i = new e(n,o)
                  , r = i.onclose
                  , a = i.onopen;
                return i.onclose = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    console.log("closed"),
                    r && r.bind(this, ...t),
                    d = !0
                }
                ,
                i.onopen = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    a && a.bind(this, ...t),
                    d = !1
                }
                ,
                i
            }
        });
        class u {
            _domContentLoadedListener() {
                let e = () => {
                    console.log("DOMContentLoaded"),
                    this._client.post("DOMContentLoaded"),
                    document.removeEventListener("DOMContentLoaded", e)
                }
                ;
                "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : (console.log("DOMContentLoaded"),
                this._client.post("DOMContentLoaded"))
            }
            constructor() {
                this._client = new n(window.parent),
                this._domContentLoadedListener()
            }
        }
        let p = () => document.querySelector("nextjs-portal")
          , h = e => {
            if (!e)
                return null;
            let t = e.shadowRoot;
            return t || null
        }
          , w = e => e ? e.querySelector("[data-nextjs-toast='true']") : null
          , m = e => e ? e.querySelector('[data-nextjs-dialog-overlay="true"]') : null
          , f = e => !!e && null !== e.querySelector("[data-issues='true']")
          , g = e => {
            let t = e.querySelector('[data-nextjs-error-overlay-nav="true"]');
            return t ? t.querySelector("[data-nextjs-dialog-error-next]") : null
        }
          , v = e => (function(e) {
            if (!e)
                return "";
            let t = "";
            return !function e(n) {
                n && (n.nodeType === Node.TEXT_NODE && (t += n.textContent),
                n.childNodes.forEach(t => {
                    e(t)
                }
                ))
            }(e),
            t
        }
        )(e.querySelector("[data-nextjs-dialog-content='true']"))
          , b = async e => {
            let t = []
              , n = 0;
            for (; !(++n > 10); ) {
                let n = v(e);
                t.push(n);
                let o = g(e);
                if (!o)
                    break;
                if ("false" === o.getAttribute("aria-disabled"))
                    o.click(),
                    await i(100);
                else
                    break
            }
            return t
        }
          , y = ( (e, t) => {
            let n = null;
            return function() {
                for (var o = arguments.length, i = Array(o), r = 0; r < o; r++)
                    i[r] = arguments[r];
                n && clearTimeout(n),
                n = setTimeout( () => {
                    e(...i)
                }
                , t)
            }
        }
        )(async e => {
            let {errorDialog: t, postMessageClient: n, isCompileError: o} = e
              , i = await b(t);
            n.post("preview-error", {
                errorMessages: i,
                isCompileError: o
            })
        }
        , 300)
          , x = {
            colors: {
                text: "#5D5D5D",
                white: "#FFFFFF",
                border: "rgba(0, 10, 36, 0.08)"
            },
            font: {
                family: '"Geist"',
                weight: "600",
                size: {
                    normal: "14px",
                    button: "18px"
                },
                lineHeight: "20px"
            },
            button: {
                gradient: "linear-gradient(180deg, #A797FF 0%, #7057FF 100%)"
            },
            shadow: "0px 8px 12px 0px rgba(9, 10, 20, 0.06)",
            zIndex: "".concat(Number.MAX_SAFE_INTEGER)
        }
          , k = {
            readdyLogo: "https://public.readdy.ai/gen_page/readdy-logo.png",
            watermarkLogo: "https://public.readdy.ai/gen_page/watermark.png",
            readdyLink: "https://readdy.ai?ref=b",
            fontStylesheet: "https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap",
            posthogCDN: "https://cdn.jsdelivr.net/npm/posthog-js@1.96.1/dist/array.full.min.js"
        }
          , E = {
            close: "data:image/svg+xml,".concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D303D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')),
            generate: "data:image/svg+xml,".concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.87 4.94c.227-.71 1.21-.723 1.456-.02l1.177 3.378 3.101 1.013c.708.231.714 1.216.01 1.455l-3.183 1.082-1.105 3.17c-.245.704-1.23.69-1.455-.02l-.989-3.107-3.367-1.203c-.702-.25-.68-1.234.04-1.455l3.282-1.016 1.043-3.277Z" fill="#FFF"/><path fill-rule="evenodd" d="M12.238 1.3c.167-.667 1.1-.667 1.266 0l.388 1.551 1.55.388c.666.166.667 1.1 0 1.266l-1.55.388-.388 1.55c-.167.666-1.1.667-1.266 0l-.388-1.55-1.55-.388c-.667-.166-.667-1.1 0-1.266l1.55-.388.388-1.551Z" fill="#FFF"/></svg>'))
        }
          , _ = {
            en: {
                prefix: "This Website is Made with",
                suffix: ". You can also get one like this in minutes",
                button: "Get one for FREE"
            },
            zh: {
                prefix: "本网站来自",
                suffix: "。你也可以在几分钟内拥有同样的页面",
                button: "立即免费拥有"
            }
        }
          , L = () => {
            var e, t;
            return null != (t = null == (e = navigator.language) ? void 0 : e.toLowerCase().startsWith("zh")) && t
        }
          , C = () => L() ? _.zh : _.en
          , S = () => window.innerWidth > 768 && !("ontouchstart" in window)
          , T = () => {
            let e = window.location.hostname;
            return ["readdy.ai", "dev.readdy.ai", "localhost"].some(t => e === t || e.endsWith(".".concat(t)))
        }
        ;
        function F(e, t) {
            var n;
            null == (n = window.posthog) || n.capture(e, {
                ...t,
                version: 2
            })
        }
        function R(e, t) {
            Object.assign(e.style, t)
        }
        function D(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "0";
            R(e, {
                color: x.colors.text,
                fontFamily: x.font.family,
                fontSize: x.font.size.normal,
                lineHeight: x.font.lineHeight,
                fontWeight: x.font.weight,
                whiteSpace: "nowrap",
                marginRight: t
            })
        }
        function M(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "row";
            R(e, {
                display: "flex",
                flexDirection: t,
                alignItems: "center",
                justifyContent: "center"
            })
        }
        window.WebSocket = c,
        new n(window).on("checkWebSocket", () => d),
        function() {
            window.location.origin;
            let e = new n(window.parent);
            function t() {
                var t, n;
                let i = null != (n = null == (t = window.history.state) ? void 0 : t.index) ? n : 0
                  , r = window.history.length > i + 1
                  , a = window.location.pathname;
                e.post("updateNavigationState", {
                    canGoForward: r,
                    canGoBack: i > 0,
                    currentRoute: o(a)
                })
            }
            function i() {
                let t = new MutationObserver(t => {
                    t.forEach(t => {
                        ("childList" === t.type || "characterData" === t.type) && e.post("titleChanged", {
                            title: document.title
                        })
                    }
                    )
                }
                )
                  , n = document.querySelector("title");
                return e.post("titleChanged", {
                    title: document.title
                }),
                n && t.observe(n, {
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }),
                t
            }
            e.on("routeAction", async e => {
                let t = r()
                  , {action: n, route: o} = e;
                switch (n) {
                case "goForward":
                    t.forward();
                    break;
                case "goBack":
                    t.back();
                    break;
                case "refresh":
                    t.refresh();
                    break;
                case "goTo":
                    o && t.push(o);
                    break;
                default:
                    console.warn("Unknown action:", n)
                }
            }
            );
            let a = i();
            function l() {
                a.disconnect(),
                setTimeout( () => {
                    a = i()
                }
                , 100)
            }
            let s = window.history.pushState
              , d = window.history.replaceState
              , c = window.history.go
              , u = window.history.back
              , p = window.history.forward;
            window.history.pushState = function(e, n, o) {
                s.apply(this, arguments),
                t(),
                l()
            }
            ,
            window.history.replaceState = function(e, n, o) {
                d.apply(this, arguments),
                t(),
                l()
            }
            ,
            window.history.go = function(e) {
                c.apply(this, arguments),
                setTimeout( () => {
                    t(),
                    l()
                }
                , 100)
            }
            ,
            window.history.back = function() {
                u.apply(this, arguments),
                setTimeout( () => {
                    t(),
                    l()
                }
                , 100)
            }
            ,
            window.history.forward = function() {
                p.apply(this, arguments),
                setTimeout( () => {
                    t(),
                    l()
                }
                , 100)
            }
        }(),
        function() {
            let e = function() {
                let e = window.open;
                return window.open = function(t, n, o) {
                    if (t && "string" == typeof t && t.startsWith("#")) {
                        let e = document.querySelector(t);
                        return e && e.scrollIntoView({
                            behavior: "smooth"
                        }),
                        null
                    }
                    return e(t, "_blank", o),
                    null
                }
                ,
                () => {
                    window.open = e
                }
            }()
              , t = function() {
                let e = async e => {
                    let t = e.target.closest("a");
                    if (!t || "A" !== t.tagName)
                        return;
                    let n = t.getAttribute("href");
                    if (!(!n || ["#", "javascript:void(0)", ""].includes(n)) && !n.startsWith("#")) {
                        if (e.preventDefault(),
                        n.startsWith("/")) {
                            let e = r();
                            await l(n, {
                                timeout: 500
                            });
                            let t = o(n);
                            e.push(t);
                            return
                        }
                        window.open(t.href, "_blank")
                    }
                }
                ;
                return window.addEventListener("click", e, !0),
                () => {
                    window.removeEventListener("click", e, !0)
                }
            }()
              , n = function() {
                let e = () => {
                    let e = r()
                      , t = e.push;
                    e.push = async function(e, n, o) {
                        return s(e) ? (window.open(e, "_blank"),
                        Promise.resolve(!1)) : (await l(e, {
                            timeout: 500
                        }),
                        t.call(this, e, n, o))
                    }
                    ;
                    let n = e.replace;
                    e.replace = async function(e, t, o) {
                        return s(e) ? (window.open(e, "_blank"),
                        Promise.resolve(!1)) : (await l(e, {
                            timeout: 500
                        }),
                        n.call(this, e, t, o))
                    }
                }
                ;
                return window.addEventListener("load", e),
                () => {
                    window.removeEventListener("load", e)
                }
            }()
        }(),
        new u,
        function() {
            if (T())
                return;
            let e = "https://".concat("", "readdy.ai/api/public/user/is_free")
              , t = function() {
                let e = window.location.pathname.split("/").filter(Boolean)
                  , t = e.indexOf("preview");
                return -1 !== t && e.length > t + 1 ? e[t + 1] : null
            }();
            async function n(t) {
                try {
                    let n = await fetch("".concat(e, "?projectId=").concat(t), {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    return !(await n.json()).data.is_free
                } catch (e) {
                    return !0
                }
            }
            function o(e) {
                F(e),
                window.open(k.readdyLink, "_blank")
            }
            function i(e) {
                let t = document.createElement("div");
                t.id = "generate-button",
                R(t, {
                    padding: e ? "8px 16px" : "10px 20px",
                    background: x.button.gradient,
                    borderRadius: "999px",
                    border: "none",
                    gap: "6px",
                    cursor: "pointer",
                    marginLeft: e ? "12px" : "0",
                    whiteSpace: "nowrap",
                    width: e ? "auto" : "100%"
                }),
                M(t);
                let n = document.createElement("img");
                n.src = E.generate,
                R(n, {
                    width: "16px",
                    height: "16px",
                    flexShrink: "0"
                });
                let i = document.createElement("span");
                return i.textContent = C().button,
                R(i, {
                    color: x.colors.white,
                    fontFamily: x.font.family,
                    fontSize: x.font.size.button,
                    fontWeight: x.font.weight,
                    lineHeight: x.font.lineHeight
                }),
                t.append(n, i),
                t.addEventListener("click", e => {
                    e.stopPropagation(),
                    o("watermark_create_button_click")
                }
                ),
                t
            }
            function r() {
                let e = document.createElement("img");
                return e.src = k.watermarkLogo,
                R(e, {
                    width: "92px",
                    height: "auto",
                    paddingLeft: "8px",
                    flexShrink: "0"
                }),
                e
            }
            function a(e) {
                let t = document.getElementById("watermark");
                if (t || e)
                    e && t && t.remove();
                else {
                    var n;
                    document.body.appendChild(function() {
                        let e = S()
                          , t = document.createElement("div");
                        return t.id = "watermark",
                        R(t, {
                            zIndex: x.zIndex,
                            position: "fixed",
                            bottom: "24px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: e ? "fit-content" : "calc(100% - 32px)",
                            maxWidth: e ? "none" : "100%",
                            backgroundColor: x.colors.white,
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderRadius: e ? "999px" : "36px",
                            borderColor: x.colors.border,
                            padding: e ? "12px 20px" : "16px",
                            boxShadow: x.shadow,
                            cursor: "pointer"
                        }),
                        M(t, e ? "row" : "column"),
                        t.appendChild(function() {
                            let e = document.createElement("div");
                            e.id = "close-button",
                            R(e, {
                                position: "absolute",
                                top: "-12px",
                                right: "-12px",
                                width: "32px",
                                height: "32px",
                                backgroundColor: x.colors.white,
                                borderRadius: "50%",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: x.colors.border,
                                cursor: "pointer",
                                boxShadow: x.shadow
                            }),
                            M(e);
                            let t = document.createElement("img");
                            return t.src = E.close,
                            R(t, {
                                width: "16px",
                                height: "16px"
                            }),
                            e.appendChild(t),
                            e.addEventListener("click", e => {
                                var t;
                                e.stopPropagation(),
                                F("watermark_close_button_click"),
                                null == (t = document.getElementById("watermark")) || t.remove()
                            }
                            ),
                            e
                        }()),
                        e ? function(e) {
                            let t = C()
                              , n = document.createElement("div");
                            n.textContent = t.prefix,
                            D(n);
                            let o = r()
                              , a = document.createElement("div");
                            a.textContent = t.suffix,
                            D(a, "12px"),
                            e.append(n, o, a, i(!0))
                        }(t) : function(e) {
                            let t = C()
                              , n = document.createElement("div");
                            M(n),
                            n.style.marginBottom = "4px";
                            let o = document.createElement("div");
                            o.textContent = t.prefix,
                            D(o, "6px"),
                            n.append(o, r());
                            let a = document.createElement("div");
                            a.textContent = t.suffix,
                            D(a),
                            R(a, {
                                textAlign: "center",
                                marginBottom: "12px"
                            }),
                            e.append(n, a, i(!1))
                        }(t),
                        t.addEventListener("click", e => {
                            e.target.closest("#generate-button, #close-button") || o("watermark_create_button_click")
                        }
                        ),
                        t
                    }()),
                    null == (n = document.querySelector('link[rel="icon"]')) || n.remove();
                    let e = document.createElement("link");
                    e.type = "image/png",
                    e.rel = "icon",
                    e.href = k.readdyLogo,
                    document.head.appendChild(e);
                    let t = document.createElement("link");
                    t.rel = "stylesheet",
                    t.href = k.fontStylesheet,
                    document.head.appendChild(t),
                    function() {
                        if (window.posthog)
                            return;
                        let e = document.createElement("script");
                        e.src = k.posthogCDN,
                        e.async = !0,
                        e.onload = () => {
                            var e;
                            null == (e = window.posthog) || e.init("phc_V7JMHB0fVJGRu8UHyrsj6pSL1BS76P5zD8qCi7lrTTV", {
                                api_host: "https://us.i.posthog.com",
                                autocapture: !1,
                                capture_pageview: !1,
                                capture_pageleave: !1,
                                disable_session_recording: !0,
                                disable_scroll_properties: !0,
                                capture_performance: {
                                    web_vitals: !1
                                },
                                rageclick: !1,
                                loaded: function(e) {
                                    e.sessionRecording && e.sessionRecording.stopRecording()
                                }
                            })
                        }
                        ,
                        document.head.appendChild(e)
                    }()
                }
            }
            t ? n(t).then(a) : a(!1)
        }(),
        function() {
            let e = new n(window.parent)
              , t = null
              , o = null
              , i = null
              , r = !0
              , a = !1
              , l = new MutationObserver( () => {
                if (o = h(t = p()),
                t && o) {
                    let t = !1;
                    (i = new MutationObserver( () => {
                        if (!o)
                            return;
                        let n = w(o);
                        if (!n)
                            return;
                        f(o) ? (n.style.visibility = "visible",
                        r && (r = !1,
                        a = null !== m(o))) : n.style.visibility = "hidden";
                        let i = m(o);
                        if (!i) {
                            t = !1,
                            e.post("preview-error-hidden");
                            return
                        }
                        t || (t = !0,
                        y({
                            errorDialog: i,
                            postMessageClient: e,
                            isCompileError: a
                        }),
                        a = !1)
                    }
                    )).observe(o, {
                        childList: !0,
                        subtree: !0
                    }),
                    l.disconnect()
                }
            }
            );
            l.observe(document.body, {
                childList: !0,
                subtree: !0
            }),
            () => {
                l.disconnect(),
                null == i || i.disconnect()
            }
        }()
    }
    ,
    8455: (e, t, n) => {
        Promise.resolve().then(n.t.bind(n, 1959, 23)),
        Promise.resolve().then(n.t.bind(n, 7989, 23)),
        Promise.resolve().then(n.t.bind(n, 8785, 23)),
        Promise.resolve().then(n.t.bind(n, 3886, 23)),
        Promise.resolve().then(n.t.bind(n, 9766, 23)),
        Promise.resolve().then(n.t.bind(n, 5278, 23)),
        Promise.resolve().then(n.t.bind(n, 9390, 23)),
        Promise.resolve().then(n.t.bind(n, 8924, 23))
    }
    ,
    9393: () => {}
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [441, 493], () => (t(2970),
    t(1666),
    t(8455))),
    _N_E = e.O()
}
]);
