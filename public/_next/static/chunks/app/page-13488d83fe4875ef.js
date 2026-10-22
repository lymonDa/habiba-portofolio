(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[974], {
    219: (e, t, a) => {
        "use strict";
        a.d(t, {
            default: () => r
        });
        var n = a(2115);
        function r() {
            return (0,
            n.useEffect)( () => {
                let e = window.matchMedia("(pointer: coarse)").matches
                  , t = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  , a = e ? .03 : .02
                  , n = 1 / 60
                  , r = e ? .012 : .01
                  , i = Array.from(document.querySelectorAll(".chapter"));
                if (!i.length)
                    return;
                if (t)
                    return void i.forEach(e => e.classList.add("is-static"));
                e && i.forEach(e => e.classList.add("is-touch"));
                let o = i.map(e => ({
                    el: e,
                    stage: e.querySelector(".stage"),
                    beats: Array.from(e.querySelectorAll(".beat")).map(e => ({
                        el: e,
                        from: parseFloat(e.dataset.from || "0") || 0,
                        to: e.dataset.to ? parseFloat(e.dataset.to) : 1,
                        parts: Array.from(e.children).filter(e => !e.classList.contains("chips")),
                        lines: Array.from(e.querySelectorAll(".line-in")),
                        chips: Array.from(e.querySelectorAll(".chips li"))
                    })),
                    src: e.dataset.video || "",
                    tIn: parseFloat(e.dataset.in || "0") || 0,
                    tOut: parseFloat(e.dataset.out || "0") || 0,
                    video: null,
                    current: 0
                }))
                  , s = !1
                  , l = new Promise(e => {
                    "complete" === document.readyState ? e() : window.addEventListener("load", () => e(), {
                        once: !0
                    })
                }
                ).then( () => new Promise(e => {
                    "requestIdleCallback" in window ? window.requestIdleCallback( () => e(), {
                        timeout: 1500
                    }) : setTimeout(e, 300)
                }
                ));
                async function d(t) {
                    if (!t || t.video || s || (await l,
                    t.video || !t.el.isConnected || s))
                        return;
                    let a = document.createElement("video");
                    a.muted = !0,
                    a.playsInline = !0,
                    a.preload = "auto",
                    a.disablePictureInPicture = !0,
                    a.tabIndex = -1,
                    a.setAttribute("aria-hidden", "true"),
                    a.src = t.src,
                    a.addEventListener("loadeddata", () => {
                        t.stage.classList.add("is-live")
                    }
                    , {
                        once: !0
                    });
                    let n = t.stage.querySelector(".veil");
                    n ? t.stage.insertBefore(a, n) : t.stage.appendChild(a),
                    t.video = a,
                    e && function(e, t) {
                        let a = () => {
                            e.video !== t || e.rolling || t.readyState >= 2 || (e.rolling = !0,
                            t.loop = !0,
                            t.play().catch( () => {
                                e.el.classList.add("is-static"),
                                c(e)
                            }
                            ))
                        }
                          , n = t.play();
                        n && n.then && n.then( () => {
                            e.rolling || t.pause()
                        }
                        ).catch(a),
                        setTimeout(a, 4e3)
                    }(t, a)
                }
                function c(e) {
                    e && e.video && (e.stage.classList.remove("is-live"),
                    e.video.removeAttribute("src"),
                    e.video.load(),
                    e.video.remove(),
                    e.video = null)
                }
                let h = e => o.find(t => t.el === e)
                  , m = new IntersectionObserver(e => e.forEach(e => e.isIntersecting && d(h(e.target))),{
                    rootMargin: "120% 0px"
                })
                  , u = new IntersectionObserver(e => e.forEach(e => !e.isIntersecting && c(h(e.target))),{
                    rootMargin: "260% 0px"
                });
                o.forEach(e => {
                    m.observe(e.el),
                    u.observe(e.el)
                }
                );
                let p = e => {
                    let t = e.getBoundingClientRect()
                      , a = t.height - window.innerHeight;
                    return a <= 0 ? 0 : Math.min(1, Math.max(0, -t.top / a))
                }
                  , g = e => Math.min(1, Math.max(0, e))
                  , f = e => 1 - Math.pow(1 - e, 3);
                function w(e, t, a) {
                    e.style.setProperty("--o", t.toFixed(3)),
                    e.style.setProperty("--o-inv", (1 - t).toFixed(3)),
                    e.style.setProperty("--dir", a ? "1" : "-1")
                }
                function y(e, t, a, n, r, i) {
                    let o = r ? 1 : g((t - .035 * a) / .1)
                      , s = i ? 1 : g((1 - t - (n - 1 - a) * .035) / .1);
                    w(e, f(Math.min(o, s)), s < 1)
                }
                let b = e => {
                    let t = e.currentTarget
                      , a = o[0];
                    if (!a)
                        return;
                    let n = parseFloat(t.dataset.progress || "0") || 0
                      , r = a.el.getBoundingClientRect().top + window.scrollY
                      , i = a.el.offsetHeight - window.innerHeight;
                    e.preventDefault(),
                    window.scrollTo({
                        top: r + i * Math.min(n + .02, 1),
                        behavior: "smooth"
                    })
                }
                  , v = Array.from(document.querySelectorAll("a[data-progress]"));
                v.forEach(e => e.addEventListener("click", b));
                let x = 0
                  , E = new Set
                  , C = new IntersectionObserver(e => {
                    e.forEach(e => e.isIntersecting ? E.add(e.target) : E.delete(e.target)),
                    E.size && !x && (x = requestAnimationFrame(k)),
                    !E.size && x && (cancelAnimationFrame(x),
                    x = 0)
                }
                );
                function k() {
                    if (!s) {
                        for (let i of o) {
                            var e, t;
                            let o = Math.max(0, (i.video && !i.rolling && (i.tOut || i.video.duration) || 0) - i.tIn);
                            !function(e, t) {
                                let i = p(e.el) - e.current
                                  , o = i * a;
                                if (t > 0) {
                                    let e = Math.abs(i) * t
                                      , a = r / t;
                                    e < n ? o = i : Math.abs(o) < a && (o = Math.sign(i) * Math.min(a, Math.abs(i)))
                                }
                                e.current += o
                            }(i, o);
                            let s = i.el.getBoundingClientRect();
                            s.top < .5 * window.innerHeight && s.bottom > .5 * window.innerHeight && (!function(e) {
                                for (let t of e.beats) {
                                    let a = t.to - t.from
                                      , n = a > 0 ? (e.current - t.from) / a : 0
                                      , r = n >= 0 && n <= 1
                                      , i = t.from <= 0
                                      , o = t.to >= 1
                                      , s = n < 0 && i || n > 1 && o;
                                    t.el.style.setProperty("--local", g(n).toFixed(3)),
                                    r ? (t.parts.forEach( (e, a) => y(e, n, a, t.parts.length, i, o)),
                                    t.lines.forEach( (e, a) => y(e, n, .8 * a, .8 * t.lines.length, i, o)),
                                    t.chips.forEach( (e, a) => y(e, n, 2 + a, 2 + t.chips.length, i, o))) : [...t.parts, ...t.lines, ...t.chips].forEach(e => w(e, +!!s, n > 1));
                                    let l = r ? Math.min(i ? 1 : g(n / .1), o ? 1 : g((1 - n) / .1)) : 0;
                                    t.el.classList.toggle("is-on", s || l > .5),
                                    t.el.classList.toggle("is-leaving", r && !o && 1 - n < .1 + .14)
                                }
                            }(i),
                            i.el.style.setProperty("--t", g(i.current).toFixed(4)),
                            o > 0 && i.video && (e = i.video,
                            t = i.tIn + i.current * o,
                            e && isFinite(e.duration) && !e.seeking && (Math.abs(e.currentTime - t) < n || (e.currentTime = t))))
                        }
                        x = requestAnimationFrame(k)
                    }
                }
                if (o.forEach(e => C.observe(e.el)),
                !window.matchMedia("(pointer: fine)").matches || t)
                    return () => {
                        s = !0,
                        v.forEach(e => e.removeEventListener("click", b)),
                        m.disconnect(),
                        u.disconnect(),
                        C.disconnect(),
                        x && cancelAnimationFrame(x)
                    }
                    ;
                let j = document.documentElement
                  , N = 0
                  , A = 0
                  , L = 0
                  , q = 0
                  , S = 0
                  , M = () => {
                    L += (N - L) * .08,
                    q += (A - q) * .08,
                    j.style.setProperty("--mx", L.toFixed(3)),
                    j.style.setProperty("--my", q.toFixed(3)),
                    S = Math.abs(N - L) + Math.abs(A - q) > .002 ? requestAnimationFrame(M) : 0
                }
                  , P = (e, t) => {
                    N = e,
                    A = t,
                    S || (S = requestAnimationFrame(M))
                }
                  , F = e => P(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1)
                  , I = () => P(0, 0);
                return window.addEventListener("pointermove", F, {
                    passive: !0
                }),
                document.addEventListener("mouseleave", I),
                () => {
                    s = !0,
                    window.removeEventListener("pointermove", F),
                    document.removeEventListener("mouseleave", I),
                    v.forEach(e => e.removeEventListener("click", b)),
                    m.disconnect(),
                    u.disconnect(),
                    C.disconnect(),
                    x && cancelAnimationFrame(x),
                    S && cancelAnimationFrame(S)
                }
            }
            , []),
            null
        }
    }
    ,
    642: (e, t, a) => {
        Promise.resolve().then(a.bind(a, 219)),
        Promise.resolve().then(a.bind(a, 6307)),
        Promise.resolve().then(a.bind(a, 1763)),
        Promise.resolve().then(a.bind(a, 9697)),
        Promise.resolve().then(a.bind(a, 8989))
    }
    ,
    1707: (e, t, a) => {
        "use strict";
        a.d(t, {
            Dc: () => n,
            R6: () => i,
            YE: () => r
        });
        let n = {
            email: "habeebaelsawaf@gmail.com",
            whatsapp: "https://wa.me/201026097403",
            linkedin: "https://www.linkedin.com/in/habeeba-yasser-95b5972a4",
            instagram: "https://www.instagram.com/habeeba.yasser"
        }
          , r = [{
            src: "/photos/event-hall.jpg",
            alt: "Warmly lit conference hall with students seated toward a glowing stage",
            caption: "IEEE PLUS 4th \xb7 Main hall",
            category: "Events",
            span: "tall"
        }, {
            src: "/photos/event-audience.jpg",
            alt: "Students listening during an engineering conference in warm light",
            caption: "IEEE PLUS 4th \xb7 Audience",
            category: "Events",
            span: "wide"
        }, {
            src: "/photos/workshop-cad.jpg",
            alt: "Hands working on a mechanical part during a workshop",
            caption: "SolidWorks workshop \xb7 Detail",
            category: "Workshops",
            span: "tall"
        }, {
            src: "/photos/workshop-workbench.jpg",
            alt: "Students gathered around a workbench during a technical workshop",
            caption: "Classic Control workshop \xb7 Day two",
            category: "Workshops"
        }, {
            src: "/photos/celebration-evening.jpg",
            alt: "Engagement celebration lit by strings of warm fairy lights",
            caption: "Engagement \xb7 Evening lights",
            category: "Engagements",
            span: "wide"
        }, {
            src: "/photos/celebration-detail.jpg",
            alt: "Detail of a celebration table with candles and flowers",
            caption: "Engagement \xb7 The small things",
            category: "Engagements"
        }, {
            src: "/photos/nature-nile.jpg",
            alt: "Sunrise over the Nile with silhouetted palms and minarets",
            caption: "Sunrise \xb7 The Nile bank",
            category: "Nature & Moments",
            span: "wide"
        }, {
            src: "/photos/nature-palms.jpg",
            alt: "Palm fronds backlit by a low golden sun",
            caption: "Golden hour \xb7 Palms",
            category: "Nature & Moments",
            span: "tall"
        }, {
            src: "/photos/product-stone.jpg",
            alt: "Handmade pottery vessels on a stone ledge in warm side light",
            caption: "Product \xb7 Clay study",
            category: "Products"
        }, {
            src: "/photos/product-detail.jpg",
            alt: "Glass of tea and dates on a dark wooden table in a sunbeam",
            caption: "Product \xb7 Late afternoon",
            category: "Products"
        }]
          , i = ["All", "Events", "Workshops", "Engagements", "Nature & Moments", "Products"]
    }
    ,
    1763: (e, t, a) => {
        "use strict";
        a.d(t, {
            default: () => o
        });
        var n = a(5155)
          , r = a(2115)
          , i = a(1707);
        function o() {
            let[e,t] = (0,
            r.useState)("All")
              , [a,o] = (0,
            r.useState)(null)
              , s = (0,
            r.useRef)(null)
              , l = (0,
            r.useMemo)( () => "All" === e ? i.YE : i.YE.filter(t => t.category === e), [e])
              , d = () => o(null)
              , c = e => o(t => null === t ? t : (t + e + l.length) % l.length);
            (0,
            r.useEffect)( () => {
                if (null === a)
                    return;
                let e = e => {
                    "Escape" === e.key && d(),
                    "ArrowRight" === e.key && c(1),
                    "ArrowLeft" === e.key && c(-1)
                }
                ;
                window.addEventListener("keydown", e);
                let t = document.body.style.overflow;
                return document.body.style.overflow = "hidden",
                () => {
                    window.removeEventListener("keydown", e),
                    document.body.style.overflow = t
                }
            }
            , [a, l.length]);
            let h = null === a ? null : l[a];
            return (0,
            n.jsxs)(n.Fragment, {
                children: [(0,
                n.jsxs)("div", {
                    className: "gallery-head",
                    children: [(0,
                    n.jsxs)("div", {
                        children: [(0,
                        n.jsx)("p", {
                            className: "stamp",
                            "data-reveal": !0,
                            children: "04 \xb7 Portfolio"
                        }), (0,
                        n.jsxs)("h2", {
                            "data-reveal": !0,
                            children: ["Moments, kept ", (0,
                            n.jsx)("em", {
                                className: "accent",
                                children: "on purpose"
                            }), "."]
                        })]
                    }), (0,
                    n.jsx)("p", {
                        className: "gallery-note",
                        "data-reveal": !0,
                        style: {
                            "--i": 1
                        },
                        children: "Sample frames — these placeholders are ready to be swapped for Habeeba’s own photographs."
                    })]
                }), (0,
                n.jsx)("div", {
                    className: "filter-bar",
                    role: "tablist",
                    "aria-label": "Photography categories",
                    "data-reveal": !0,
                    children: i.R6.map(a => (0,
                    n.jsx)("button", {
                        type: "button",
                        role: "tab",
                        "aria-selected": e === a,
                        className: e === a ? "is-active" : "",
                        onClick: () => t(a),
                        children: a
                    }, a))
                }), (0,
                n.jsx)("div", {
                    className: "mosaic",
                    children: l.map( (e, t) => (0,
                    n.jsxs)("figure", {
                        className: "tile".concat(e.span ? " tile--".concat(e.span) : ""),
                        "data-reveal": !0,
                        style: {
                            "--i": t % 4
                        },
                        onClick: () => o(t),
                        onKeyDown: e => {
                            ("Enter" === e.key || " " === e.key) && (e.preventDefault(),
                            o(t))
                        }
                        ,
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Open ".concat(e.caption),
                        children: [(0,
                        n.jsx)("img", {
                            src: e.src,
                            alt: e.alt,
                            loading: "lazy",
                            decoding: "async"
                        }), (0,
                        n.jsx)("figcaption", {
                            children: e.caption
                        })]
                    }, e.src))
                }), h && (0,
                n.jsxs)("div", {
                    className: "lightbox",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": h.caption,
                    onClick: d,
                    children: [(0,
                    n.jsx)("button", {
                        type: "button",
                        className: "lb-close",
                        "aria-label": "Close",
                        onClick: d,
                        children: (0,
                        n.jsx)("i", {
                            className: "ri-close-line",
                            "aria-hidden": "true"
                        })
                    }), (0,
                    n.jsx)("button", {
                        type: "button",
                        className: "lb-btn lb-prev",
                        "aria-label": "Previous photograph",
                        onClick: e => {
                            e.stopPropagation(),
                            c(-1)
                        }
                        ,
                        children: (0,
                        n.jsx)("i", {
                            className: "ri-arrow-left-s-line",
                            "aria-hidden": "true"
                        })
                    }), (0,
                    n.jsxs)("figure", {
                        onClick: e => e.stopPropagation(),
                        onTouchStart: e => {
                            s.current = e.touches[0].clientX
                        }
                        ,
                        onTouchEnd: e => {
                            if (null === s.current)
                                return;
                            let t = e.changedTouches[0].clientX - s.current;
                            Math.abs(t) > 50 && c(t < 0 ? 1 : -1),
                            s.current = null
                        }
                        ,
                        children: [(0,
                        n.jsx)("img", {
                            src: h.src,
                            alt: h.alt
                        }), (0,
                        n.jsxs)("figcaption", {
                            children: [(0,
                            n.jsx)("strong", {
                                children: h.caption
                            }), (0,
                            n.jsxs)("span", {
                                children: [h.category, " \xb7 ", (null != a ? a : 0) + 1, " / ", l.length]
                            })]
                        })]
                    }), (0,
                    n.jsx)("button", {
                        type: "button",
                        className: "lb-btn lb-next",
                        "aria-label": "Next photograph",
                        onClick: e => {
                            e.stopPropagation(),
                            c(1)
                        }
                        ,
                        children: (0,
                        n.jsx)("i", {
                            className: "ri-arrow-right-s-line",
                            "aria-hidden": "true"
                        })
                    })]
                })]
            })
        }
    }
    ,
    6307: (e, t, a) => {
        "use strict";
        a.d(t, {
            default: () => o
        });
        var n = a(5155)
          , r = a(2115)
          , i = a(1707);
        function o() {
            let[e,t] = (0,
            r.useState)("idle")
              , [a,o] = (0,
            r.useState)("");
            async function s(e) {
                e.preventDefault();
                let a = e.currentTarget
                  , n = new FormData(a);
                if (String(n.get("website_alt") || "").trim()) {
                    t("ok"),
                    a.reset();
                    return
                }
                n.delete("website_alt");
                let r = new URLSearchParams;
                n.forEach( (e, t) => r.append(t, String(e))),
                t("sending"),
                o("");
                try {
                    var s, l;
                    let e = await fetch("https://readdy.ai/api/form/dbd0sadnmk9u97k4lpb0", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: r.toString()
                    })
                      , n = await e.text()
                      , i = null;
                    try {
                        i = JSON.parse(n)
                    } catch (e) {
                        i = null
                    }
                    let d = (null == i || null == (s = i.meta) ? void 0 : s.message) || (null == i ? void 0 : i.message) || (null == i || null == (l = i.meta) ? void 0 : l.detail) || n;
                    e.ok && (null == i ? void 0 : i.code) === "OK" ? (t("ok"),
                    a.reset()) : (t("error"),
                    o(String(d || "Something went wrong — please try again.")))
                } catch (e) {
                    t("error"),
                    o("Couldn't reach the server. Try again, or email ".concat(i.Dc.email, " directly."))
                }
            }
            return (0,
            n.jsxs)("form", {
                className: "form-card",
                "data-readdy-form": !0,
                onSubmit: s,
                noValidate: !1,
                children: [(0,
                n.jsxs)("div", {
                    className: "form-row",
                    children: [(0,
                    n.jsxs)("div", {
                        className: "field",
                        children: [(0,
                        n.jsx)("label", {
                            htmlFor: "cf-name",
                            children: "Your name"
                        }), (0,
                        n.jsx)("input", {
                            id: "cf-name",
                            name: "name",
                            type: "text",
                            placeholder: "Full name",
                            required: !0,
                            maxLength: 80
                        })]
                    }), (0,
                    n.jsxs)("div", {
                        className: "field",
                        children: [(0,
                        n.jsx)("label", {
                            htmlFor: "cf-email",
                            children: "Email"
                        }), (0,
                        n.jsx)("input", {
                            id: "cf-email",
                            name: "email",
                            type: "email",
                            placeholder: "you@example.com",
                            required: !0,
                            maxLength: 120
                        })]
                    })]
                }), (0,
                n.jsxs)("div", {
                    className: "field",
                    children: [(0,
                    n.jsx)("label", {
                        htmlFor: "cf-message",
                        children: "What do you have in mind?"
                    }), (0,
                    n.jsx)("textarea", {
                        id: "cf-message",
                        name: "message",
                        placeholder: "A shoot, a collaboration, or a question about engineering…",
                        required: !0,
                        maxLength: 500
                    })]
                }), (0,
                n.jsxs)("div", {
                    className: "hp-field",
                    "aria-hidden": "true",
                    children: [(0,
                    n.jsx)("label", {
                        htmlFor: "cf-website-alt",
                        children: "Website"
                    }), (0,
                    n.jsx)("input", {
                        id: "cf-website-alt",
                        name: "website_alt",
                        type: "text",
                        tabIndex: -1,
                        autoComplete: "off",
                        readOnly: !0
                    })]
                }), (0,
                n.jsxs)("button", {
                    className: "form-submit",
                    type: "submit",
                    disabled: "sending" === e,
                    children: ["sending" === e ? "Sending…" : "Send the message", (0,
                    n.jsx)("i", {
                        className: "ri-send-plane-line",
                        "aria-hidden": "true"
                    })]
                }), "ok" === e && (0,
                n.jsx)("p", {
                    className: "form-msg ok",
                    role: "status",
                    children: "Thank you — your message arrived. I’ll reply as soon as I can."
                }), "error" === e && (0,
                n.jsx)("p", {
                    className: "form-msg err",
                    role: "alert",
                    children: a
                })]
            })
        }
    }
    ,
    8989: (e, t, a) => {
        "use strict";
        a.d(t, {
            default: () => l
        });
        var n = a(5155)
          , r = a(2115)
          , i = a(2619)
          , o = a.n(i);
        let s = [{
            label: "Home",
            href: "#home",
            progress: "0"
        }, {
            label: "About",
            href: "#about",
            progress: "0.2143"
        }, {
            label: "Photography",
            href: "#photography",
            progress: "0.4286"
        }, {
            label: "Experience",
            href: "#experience",
            progress: "0.6429"
        }, {
            label: "Engineering",
            href: "#engineering"
        }, {
            label: "Contact",
            href: "#contact-panel"
        }];
        function l() {
            let[e,t] = (0,
            r.useState)(!1)
              , [a,i] = (0,
            r.useState)(!1);
            return (0,
            r.useEffect)( () => {
                let e = () => t(window.scrollY > 24);
                return e(),
                window.addEventListener("scroll", e, {
                    passive: !0
                }),
                () => window.removeEventListener("scroll", e)
            }
            , []),
            (0,
            n.jsxs)(n.Fragment, {
                children: [(0,
                n.jsxs)("header", {
                    className: "nav".concat(e ? " is-solid" : ""),
                    children: [(0,
                    n.jsxs)(o(), {
                        href: "#home",
                        className: "nav-brand",
                        onClick: () => i(!1),
                        children: [(0,
                        n.jsx)("strong", {
                            children: "Habeeba Yasser"
                        }), (0,
                        n.jsx)("span", {
                            children: "Photography & Engineering"
                        })]
                    }), (0,
                    n.jsx)("nav", {
                        className: "nav-links",
                        "aria-label": "Main",
                        children: s.map(e => (0,
                        n.jsx)("a", {
                            href: e.href,
                            "data-progress": e.progress,
                            children: e.label
                        }, e.label))
                    }), (0,
                    n.jsxs)("a", {
                        className: "nav-cta",
                        href: "#contact-panel",
                        children: ["Let’s talk", (0,
                        n.jsx)("i", {
                            className: "ri-arrow-right-up-line",
                            "aria-hidden": "true"
                        })]
                    }), (0,
                    n.jsx)("button", {
                        type: "button",
                        className: "nav-burger",
                        "aria-label": a ? "Close menu" : "Open menu",
                        "aria-expanded": a,
                        onClick: () => i(e => !e),
                        children: (0,
                        n.jsx)("i", {
                            className: a ? "ri-close-line" : "ri-menu-3-line",
                            "aria-hidden": "true"
                        })
                    })]
                }), (0,
                n.jsxs)("div", {
                    className: "nav-drawer".concat(a ? " is-open" : ""),
                    children: [s.map(e => (0,
                    n.jsx)("a", {
                        href: e.href,
                        "data-progress": e.progress,
                        onClick: () => i(!1),
                        children: e.label
                    }, e.label)), (0,
                    n.jsx)("a", {
                        className: "nav-cta",
                        href: "#contact-panel",
                        onClick: () => i(!1),
                        children: "Let’s talk"
                    })]
                })]
            })
        }
    }
    ,
    9697: (e, t, a) => {
        "use strict";
        a.d(t, {
            default: () => r
        });
        var n = a(2115);
        function r() {
            return (0,
            n.useEffect)( () => {
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
                    return;
                let e = new IntersectionObserver(t => t.forEach(t => {
                    t.isIntersecting && (t.target.classList.add("is-in"),
                    e.unobserve(t.target))
                }
                ),{
                    rootMargin: "0px 0px -12% 0px"
                });
                Array.from(document.querySelectorAll("[data-reveal]")).forEach(t => {
                    let a = t.parentElement;
                    if (a) {
                        let e = Array.from(a.children).filter(e => e.hasAttribute("data-reveal"));
                        t.style.setProperty("--i", String(e.indexOf(t)))
                    }
                    e.observe(t)
                }
                );
                let t = Array.from(document.querySelectorAll("[data-parallax]"))
                  , a = 0
                  , n = () => {
                    a = 0;
                    let e = window.innerHeight;
                    for (let a of t) {
                        let t = a.getBoundingClientRect();
                        if (t.bottom < -e || t.top > 2 * e)
                            continue;
                        let n = (t.top + t.height / 2 - e / 2) / e
                          , r = parseFloat(a.dataset.parallax || "0.32");
                        a.classList.contains("panel-bg") && window.innerWidth < 780 && (r = Math.min(r, .22)),
                        a.style.setProperty("--py", "".concat((-(n * r) * e).toFixed(1), "px"))
                    }
                }
                  , r = e => {
                    let t = e instanceof HTMLVideoElement ? e.videoWidth : e.naturalWidth
                      , a = e instanceof HTMLVideoElement ? e.videoHeight : e.naturalHeight;
                    if (!t || !a)
                        return;
                    let n = e.getBoundingClientRect();
                    if (!n.width || !n.height)
                        return;
                    let r = Math.max(n.width / t, n.height / a)
                      , i = r <= 1.15 ? 0 : Math.min(1.6, Math.max(.4, (r - 1) * 1.2));
                    e.style.setProperty("--soften", "".concat(i.toFixed(2), "px"))
                }
                  , i = ".stage video, .plate, .panel-bg"
                  , o = () => Array.from(document.querySelectorAll(i)).forEach(r)
                  , s = e => {
                    let t = e.target;
                    t && t.matches && t.matches(i) && r(t)
                }
                  , l = e => {
                    let t = e.target;
                    t && t.matches && t.matches(i) && r(t)
                }
                ;
                document.addEventListener("load", s, !0),
                document.addEventListener("loadedmetadata", l, !0),
                window.addEventListener("resize", o),
                o();
                let d = Array.from(document.querySelectorAll("[data-words]")).map(e => {
                    let t = e => {
                        Array.from(e.childNodes).forEach(e => {
                            if (3 === e.nodeType) {
                                var a;
                                let t = e.textContent || ""
                                  , n = document.createDocumentFragment();
                                t.split(/(\s+)/).forEach(e => {
                                    if (!e)
                                        return;
                                    if (/^\s+$/.test(e))
                                        return void n.appendChild(document.createTextNode(e));
                                    let t = document.createElement("span");
                                    t.className = "w",
                                    t.textContent = e,
                                    n.appendChild(t)
                                }
                                ),
                                null == (a = e.parentNode) || a.replaceChild(n, e)
                            } else
                                1 === e.nodeType && t(e)
                        }
                        )
                    }
                    ;
                    return t(e),
                    {
                        section: e.closest("section") || e,
                        words: Array.from(e.querySelectorAll(".w"))
                    }
                }
                )
                  , c = () => {
                    let e = window.innerHeight;
                    for (let t of d) {
                        let a = t.section.getBoundingClientRect();
                        if (a.bottom < 0 || a.top > e)
                            continue;
                        let n = Math.min(1, Math.max(0, (.8 * e - a.top) / (a.height + .45 * e)))
                          , r = t.words.length;
                        t.words.forEach( (e, t) => {
                            e.style.setProperty("--lit", n * (r + 1) > t + 1 ? "1" : "0")
                        }
                        )
                    }
                }
                  , h = () => requestAnimationFrame(c)
                  , m = () => {
                    a || (a = requestAnimationFrame(n))
                }
                ;
                return window.addEventListener("scroll", h, {
                    passive: !0
                }),
                window.addEventListener("scroll", m, {
                    passive: !0
                }),
                window.addEventListener("resize", n),
                c(),
                n(),
                () => {
                    e.disconnect(),
                    document.removeEventListener("load", s, !0),
                    document.removeEventListener("loadedmetadata", l, !0),
                    window.removeEventListener("resize", o),
                    window.removeEventListener("scroll", h),
                    window.removeEventListener("scroll", m),
                    window.removeEventListener("resize", n),
                    a && cancelAnimationFrame(a)
                }
            }
            , []),
            null
        }
    }
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [619, 441, 493, 358], () => t(642)),
    _N_E = e.O()
}
]);
