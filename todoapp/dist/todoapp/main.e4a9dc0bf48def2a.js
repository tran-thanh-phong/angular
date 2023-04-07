"use strict";
(self.webpackChunktodoapp = self.webpackChunktodoapp || []).push([
  [179],
  {
    697: () => {
      function ae(e) {
        return "function" == typeof e;
      }
      function po(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ji = po(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function go(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class vt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ae(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ji ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  af(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ji ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ji(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) af(t);
            else {
              if (t instanceof vt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && go(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && go(n, t), t instanceof vt && t._removeParent(this);
        }
      }
      vt.EMPTY = (() => {
        const e = new vt();
        return (e.closed = !0), e;
      })();
      const rf = vt.EMPTY;
      function sf(e) {
        return (
          e instanceof vt ||
          (e && "closed" in e && ae(e.remove) && ae(e.add) && ae(e.unsubscribe))
        );
      }
      function af(e) {
        ae(e) ? e() : e.unsubscribe();
      }
      const zn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Bi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Bi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Bi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function lf(e) {
        Bi.setTimeout(() => {
          const { onUnhandledError: t } = zn;
          if (!t) throw e;
          t(e);
        });
      }
      function uf() {}
      const NC = Xa("C", void 0, void 0);
      function Xa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Gn = null;
      function $i(e) {
        if (zn.useDeprecatedSynchronousErrorHandling) {
          const t = !Gn;
          if ((t && (Gn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Gn;
            if (((Gn = null), n)) throw r;
          }
        } else e();
      }
      class Ja extends vt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), sf(t) && t.add(this))
              : (this.destination = VC);
        }
        static create(t, n, r) {
          return new mo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? tl(
                (function OC(e) {
                  return Xa("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? tl(
                (function RC(e) {
                  return Xa("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? tl(NC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const PC = Function.prototype.bind;
      function el(e, t) {
        return PC.call(e, t);
      }
      class kC {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ui(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ui(r);
            }
          else Ui(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ui(n);
            }
        }
      }
      class mo extends Ja {
        constructor(t, n, r) {
          let o;
          if ((super(), ae(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && zn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && el(t.next, i),
                  error: t.error && el(t.error, i),
                  complete: t.complete && el(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new kC(o);
        }
      }
      function Ui(e) {
        zn.useDeprecatedSynchronousErrorHandling
          ? (function FC(e) {
              zn.useDeprecatedSynchronousErrorHandling &&
                Gn &&
                ((Gn.errorThrown = !0), (Gn.error = e));
            })(e)
          : lf(e);
      }
      function tl(e, t) {
        const { onStoppedNotification: n } = zn;
        n && Bi.setTimeout(() => n(e, t));
      }
      const VC = {
          closed: !0,
          next: uf,
          error: function LC(e) {
            throw e;
          },
          complete: uf,
        },
        nl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Wn(e) {
        return e;
      }
      function cf(e) {
        return 0 === e.length
          ? Wn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let Se = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function $C(e) {
              return (
                (e && e instanceof Ja) ||
                ((function BC(e) {
                  return e && ae(e.next) && ae(e.error) && ae(e.complete);
                })(e) &&
                  sf(e))
              );
            })(n)
              ? n
              : new mo(n, r, o);
            return (
              $i(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = df(r))((o, i) => {
              const s = new mo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [nl]() {
            return this;
          }
          pipe(...n) {
            return cf(n)(this);
          }
          toPromise(n) {
            return new (n = df(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function df(e) {
        var t;
        return null !== (t = e ?? zn.Promise) && void 0 !== t ? t : Promise;
      }
      const UC = po(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let an = (() => {
        class e extends Se {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new ff(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new UC();
          }
          next(n) {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? rf
              : ((this.currentObservers = null),
                i.push(n),
                new vt(() => {
                  (this.currentObservers = null), go(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Se();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new ff(t, n)), e;
      })();
      class ff extends an {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : rf;
        }
      }
      function hf(e) {
        return ae(e?.lift);
      }
      function Pe(e) {
        return (t) => {
          if (hf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ne(e, t, n, r, o) {
        return new HC(e, t, n, r, o);
      }
      class HC extends Ja {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Y(e, t) {
        return Pe((n, r) => {
          let o = 0;
          n.subscribe(
            Ne(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function qn(e) {
        return this instanceof qn ? ((this.v = e), this) : new qn(e);
      }
      function qC(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function mf(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const yf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function vf(e) {
        return ae(e?.then);
      }
      function _f(e) {
        return ae(e[nl]);
      }
      function Df(e) {
        return Symbol.asyncIterator && ae(e?.[Symbol.asyncIterator]);
      }
      function Cf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const wf = (function YC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ef(e) {
        return ae(e?.[wf]);
      }
      function bf(e) {
        return (function WC(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, y) {
                  i.push([f, h, p, y]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof qn
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield qn(n.read());
              if (o) return yield qn(void 0);
              yield yield qn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Mf(e) {
        return ae(e?.getReader);
      }
      function _t(e) {
        if (e instanceof Se) return e;
        if (null != e) {
          if (_f(e))
            return (function QC(e) {
              return new Se((t) => {
                const n = e[nl]();
                if (ae(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (yf(e))
            return (function KC(e) {
              return new Se((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (vf(e))
            return (function XC(e) {
              return new Se((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, lf);
              });
            })(e);
          if (Df(e)) return Sf(e);
          if (Ef(e))
            return (function JC(e) {
              return new Se((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Mf(e))
            return (function e0(e) {
              return Sf(bf(e));
            })(e);
        }
        throw Cf(e);
      }
      function Sf(e) {
        return new Se((t) => {
          (function t0(e, t) {
            var n, r, o, i;
            return (function zC(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = qC(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function ln(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Le(e, t, n = 1 / 0) {
        return ae(t)
          ? Le((r, o) => Y((i, s) => t(r, i, o, s))(_t(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Pe((r, o) =>
              (function n0(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (y) => (u < r ? p(y) : l.push(y)),
                  p = (y) => {
                    i && t.next(y), u++;
                    let v = !1;
                    _t(n(y, c++)).subscribe(
                      Ne(
                        t,
                        (w) => {
                          o?.(w), i ? h(w) : t.next(w);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (u--; l.length && u < r; ) {
                                const w = l.shift();
                                s ? ln(t, s, () => p(w)) : p(w);
                              }
                              f();
                            } catch (w) {
                              t.error(w);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ne(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function fr(e = 1 / 0) {
        return Le(Wn, e);
      }
      const $t = new Se((e) => e.complete());
      function ol(e) {
        return e[e.length - 1];
      }
      function If(e) {
        return ae(ol(e)) ? e.pop() : void 0;
      }
      function yo(e) {
        return (function o0(e) {
          return e && ae(e.schedule);
        })(ol(e))
          ? e.pop()
          : void 0;
      }
      function Af(e, t = 0) {
        return Pe((n, r) => {
          n.subscribe(
            Ne(
              r,
              (o) => ln(r, e, () => r.next(o), t),
              () => ln(r, e, () => r.complete(), t),
              (o) => ln(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Tf(e, t = 0) {
        return Pe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function xf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Se((n) => {
          ln(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            ln(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ie(e, t) {
        return t
          ? (function f0(e, t) {
              if (null != e) {
                if (_f(e))
                  return (function a0(e, t) {
                    return _t(e).pipe(Tf(t), Af(t));
                  })(e, t);
                if (yf(e))
                  return (function u0(e, t) {
                    return new Se((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (vf(e))
                  return (function l0(e, t) {
                    return _t(e).pipe(Tf(t), Af(t));
                  })(e, t);
                if (Df(e)) return xf(e, t);
                if (Ef(e))
                  return (function c0(e, t) {
                    return new Se((n) => {
                      let r;
                      return (
                        ln(n, t, () => {
                          (r = e[wf]()),
                            ln(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ae(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Mf(e))
                  return (function d0(e, t) {
                    return xf(bf(e), t);
                  })(e, t);
              }
              throw Cf(e);
            })(e, t)
          : _t(e);
      }
      function il(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new mo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return _t(t(...n)).subscribe(r);
      }
      function oe(e) {
        for (let t in e) if (e[t] === oe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function sl(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function le(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(le).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function al(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const g0 = oe({ __forward_ref__: oe });
      function ue(e) {
        return (
          (e.__forward_ref__ = ue),
          (e.toString = function () {
            return le(this());
          }),
          e
        );
      }
      function R(e) {
        return ll(e) ? e() : e;
      }
      function ll(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(g0) &&
          e.__forward_ref__ === ue
        );
      }
      function ul(e) {
        return e && !!e.ɵproviders;
      }
      class E extends Error {
        constructor(t, n) {
          super(Hi(t, n)), (this.code = t);
        }
      }
      function Hi(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function zi(e, t) {
        throw new E(-201, !1);
      }
      function Dt(e, t) {
        null == e &&
          (function te(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function P(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Tt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Gi(e) {
        return Rf(e, Wi) || Rf(e, Ff);
      }
      function Rf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Of(e) {
        return e && (e.hasOwnProperty(cl) || e.hasOwnProperty(b0))
          ? e[cl]
          : null;
      }
      const Wi = oe({ ɵprov: oe }),
        cl = oe({ ɵinj: oe }),
        Ff = oe({ ngInjectableDef: oe }),
        b0 = oe({ ngInjectorDef: oe });
      var O = (() => (
        ((O = O || {})[(O.Default = 0)] = "Default"),
        (O[(O.Host = 1)] = "Host"),
        (O[(O.Self = 2)] = "Self"),
        (O[(O.SkipSelf = 4)] = "SkipSelf"),
        (O[(O.Optional = 8)] = "Optional"),
        O
      ))();
      let dl;
      function Ct(e) {
        const t = dl;
        return (dl = e), t;
      }
      function Pf(e, t, n) {
        const r = Gi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & O.Optional
          ? null
          : void 0 !== t
          ? t
          : void zi(le(e));
      }
      const de = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        vo = {},
        fl = "__NG_DI_FLAG__",
        qi = "ngTempTokenPath",
        S0 = "ngTokenPath",
        I0 = /\n/gm,
        A0 = "\u0275",
        kf = "__source";
      let _o;
      function hr(e) {
        const t = _o;
        return (_o = e), t;
      }
      function T0(e, t = O.Default) {
        if (void 0 === _o) throw new E(-203, !1);
        return null === _o
          ? Pf(e, void 0, t)
          : _o.get(e, t & O.Optional ? null : void 0, t);
      }
      function F(e, t = O.Default) {
        return (
          (function M0() {
            return dl;
          })() || T0
        )(R(e), t);
      }
      function Q(e, t = O.Default) {
        return F(e, Zi(t));
      }
      function Zi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function hl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = R(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new E(900, !1);
            let o,
              i = O.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = x0(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(F(o, i));
          } else t.push(F(r));
        }
        return t;
      }
      function Do(e, t) {
        return (e[fl] = t), (e.prototype[fl] = t), e;
      }
      function x0(e) {
        return e[fl];
      }
      function un(e) {
        return { toString: e }.toString();
      }
      var Ut = (() => (
          ((Ut = Ut || {})[(Ut.OnPush = 0)] = "OnPush"),
          (Ut[(Ut.Default = 1)] = "Default"),
          Ut
        ))(),
        Ht = (() => {
          return (
            ((e = Ht || (Ht = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Ht
          );
          var e;
        })();
      const cn = {},
        J = [],
        Yi = oe({ ɵcmp: oe }),
        pl = oe({ ɵdir: oe }),
        gl = oe({ ɵpipe: oe }),
        Vf = oe({ ɵmod: oe }),
        dn = oe({ ɵfac: oe }),
        Co = oe({ __NG_ELEMENT_ID__: oe });
      let O0 = 0;
      function fn(e) {
        return un(() => {
          const t = Bf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ut.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || Ht.Emulated,
              id: "c" + O0++,
              styles: e.styles || J,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          $f(n);
          const r = e.dependencies;
          return (n.directiveDefs = Qi(r, !1)), (n.pipeDefs = Qi(r, !0)), n;
        });
      }
      function P0(e) {
        return ne(e) || Ue(e);
      }
      function k0(e) {
        return null !== e;
      }
      function zt(e) {
        return un(() => ({
          type: e.type,
          bootstrap: e.bootstrap || J,
          declarations: e.declarations || J,
          imports: e.imports || J,
          exports: e.exports || J,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function jf(e, t) {
        if (null == e) return cn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function V(e) {
        return un(() => {
          const t = Bf(e);
          return $f(t), t;
        });
      }
      function ne(e) {
        return e[Yi] || null;
      }
      function Ue(e) {
        return e[pl] || null;
      }
      function nt(e) {
        return e[gl] || null;
      }
      function lt(e, t) {
        const n = e[Vf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${le(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Bf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || J,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: jf(e.inputs, t),
          outputs: jf(e.outputs),
        };
      }
      function $f(e) {
        e.features?.forEach((t) => t(e));
      }
      function Qi(e, t) {
        if (!e) return null;
        const n = t ? nt : P0;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(k0);
      }
      const hn = 0,
        I = 1,
        H = 2,
        _e = 3,
        xt = 4,
        Zn = 5,
        He = 6,
        gr = 7,
        Ce = 8,
        Ki = 9,
        Xi = 10,
        G = 11,
        ml = 12,
        wo = 13,
        Uf = 14,
        mr = 15,
        ze = 16,
        Eo = 17,
        yr = 18,
        Gt = 19,
        bo = 20,
        Hf = 21,
        fe = 22,
        yl = 1,
        zf = 2,
        Ji = 7,
        es = 8,
        vr = 9,
        Ye = 10;
      function ut(e) {
        return Array.isArray(e) && "object" == typeof e[yl];
      }
      function Nt(e) {
        return Array.isArray(e) && !0 === e[yl];
      }
      function vl(e) {
        return 0 != (4 & e.flags);
      }
      function Mo(e) {
        return e.componentOffset > -1;
      }
      function ts(e) {
        return 1 == (1 & e.flags);
      }
      function Rt(e) {
        return !!e.template;
      }
      function V0(e) {
        return 0 != (256 & e[H]);
      }
      function Yn(e, t) {
        return e.hasOwnProperty(dn) ? e[dn] : null;
      }
      class $0 {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ct() {
        return qf;
      }
      function qf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = H0), U0;
      }
      function U0() {
        const e = Yf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === cn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function H0(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Yf(e) ||
            (function z0(e, t) {
              return (e[Zf] = t);
            })(e, { previous: cn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new $0(l && l.currentValue, t, a === cn)), (e[r] = t);
      }
      ct.ngInherit = !0;
      const Zf = "__ngSimpleChanges__";
      function Yf(e) {
        return e[Zf] || null;
      }
      const wt = function (e, t, n) {},
        Qf = "svg";
      function Ve(e) {
        for (; Array.isArray(e); ) e = e[hn];
        return e;
      }
      function ns(e, t) {
        return Ve(t[e]);
      }
      function dt(e, t) {
        return Ve(t[e.index]);
      }
      function Xf(e, t) {
        return e.data[t];
      }
      function ft(e, t) {
        const n = t[e];
        return ut(n) ? n : n[hn];
      }
      function rs(e) {
        return 64 == (64 & e[H]);
      }
      function Tn(e, t) {
        return null == t ? null : e[t];
      }
      function Jf(e) {
        e[yr] = 0;
      }
      function Dl(e, t) {
        e[Zn] += t;
        let n = e,
          r = e[_e];
        for (
          ;
          null !== r && ((1 === t && 1 === n[Zn]) || (-1 === t && 0 === n[Zn]));

        )
          (r[Zn] += t), (n = r), (r = r[_e]);
      }
      const B = { lFrame: uh(null), bindingsEnabled: !0 };
      function th() {
        return B.bindingsEnabled;
      }
      function D() {
        return B.lFrame.lView;
      }
      function K() {
        return B.lFrame.tView;
      }
      function Wt(e) {
        return (B.lFrame.contextLView = e), e[Ce];
      }
      function qt(e) {
        return (B.lFrame.contextLView = null), e;
      }
      function je() {
        let e = nh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function nh() {
        return B.lFrame.currentTNode;
      }
      function Zt(e, t) {
        const n = B.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Cl() {
        return B.lFrame.isParent;
      }
      function wl() {
        B.lFrame.isParent = !1;
      }
      function pn() {
        return B.lFrame.bindingIndex;
      }
      function Dr() {
        return B.lFrame.bindingIndex++;
      }
      function gn(e) {
        const t = B.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function rw(e, t) {
        const n = B.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), El(t);
      }
      function El(e) {
        B.lFrame.currentDirectiveIndex = e;
      }
      function sh() {
        return B.lFrame.currentQueryIndex;
      }
      function Ml(e) {
        B.lFrame.currentQueryIndex = e;
      }
      function iw(e) {
        const t = e[I];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[He] : null;
      }
      function ah(e, t, n) {
        if (n & O.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & O.Host ||
              ((o = iw(i)), null === o || ((i = i[mr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (B.lFrame = lh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Sl(e) {
        const t = lh(),
          n = e[I];
        (B.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function lh() {
        const e = B.lFrame,
          t = null === e ? null : e.child;
        return null === t ? uh(e) : t;
      }
      function uh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function ch() {
        const e = B.lFrame;
        return (
          (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const dh = ch;
      function Il() {
        const e = ch();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ke() {
        return B.lFrame.selectedIndex;
      }
      function Qn(e) {
        B.lFrame.selectedIndex = e;
      }
      function he() {
        B.lFrame.currentNamespace = Qf;
      }
      function pe() {
        !(function uw() {
          B.lFrame.currentNamespace = null;
        })();
      }
      function os(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function is(e, t, n) {
        fh(e, t, 3, n);
      }
      function ss(e, t, n, r) {
        (3 & e[H]) === n && fh(e, t, n, r);
      }
      function Al(e, t) {
        let n = e[H];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[H] = n));
      }
      function fh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[yr] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[yr] += 65536),
              (a < i || -1 == i) &&
                (fw(e, n, t, l), (e[yr] = (4294901760 & e[yr]) + l + 2)),
              l++;
      }
      function fw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[H] >> 11 < e[yr] >> 16 && (3 & e[H]) === t) {
            (e[H] += 2048), wt(4, a, i);
            try {
              i.call(a);
            } finally {
              wt(5, a, i);
            }
          }
        } else {
          wt(4, a, i);
          try {
            i.call(a);
          } finally {
            wt(5, a, i);
          }
        }
      }
      const Cr = -1;
      class Io {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function xl(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            ph(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function hh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function ph(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ao(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  gh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function gh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function mh(e) {
        return e !== Cr;
      }
      function as(e) {
        return 32767 & e;
      }
      function ls(e, t) {
        let n = (function mw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[mr]), n--;
        return r;
      }
      let Nl = !0;
      function us(e) {
        const t = Nl;
        return (Nl = e), t;
      }
      const yh = 255,
        vh = 5;
      let yw = 0;
      const Yt = {};
      function cs(e, t) {
        const n = _h(e, t);
        if (-1 !== n) return n;
        const r = t[I];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Rl(r.data, e),
          Rl(t, null),
          Rl(r.blueprint, null));
        const o = Ol(e, t),
          i = e.injectorIndex;
        if (mh(o)) {
          const s = as(o),
            a = ls(o, t),
            l = a[I].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function Rl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function _h(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ol(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Sh(o)), null === r)) return Cr;
          if ((n++, (o = o[mr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Cr;
      }
      function Fl(e, t, n) {
        !(function vw(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Co) && (r = n[Co]),
            null == r && (r = n[Co] = yw++);
          const o = r & yh;
          t.data[e + (o >> vh)] |= 1 << o;
        })(e, t, n);
      }
      function Dh(e, t, n) {
        if (n & O.Optional || void 0 !== e) return e;
        zi();
      }
      function Ch(e, t, n, r) {
        if (
          (n & O.Optional && void 0 === r && (r = null),
          !(n & (O.Self | O.Host)))
        ) {
          const o = e[Ki],
            i = Ct(void 0);
          try {
            return o ? o.get(t, r, n & O.Optional) : Pf(t, r, n & O.Optional);
          } finally {
            Ct(i);
          }
        }
        return Dh(r, 0, n);
      }
      function wh(e, t, n, r = O.Default, o) {
        if (null !== e) {
          if (1024 & t[H]) {
            const s = (function Ew(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[H] && !(256 & s[H]);

              ) {
                const a = Eh(i, s, n, r | O.Self, Yt);
                if (a !== Yt) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[Hf];
                  if (u) {
                    const c = u.get(n, Yt, r);
                    if (c !== Yt) return c;
                  }
                  (l = Sh(s)), (s = s[mr]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, Yt);
            if (s !== Yt) return s;
          }
          const i = Eh(e, t, n, r, Yt);
          if (i !== Yt) return i;
        }
        return Ch(t, n, r, o);
      }
      function Eh(e, t, n, r, o) {
        const i = (function Cw(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Co) ? e[Co] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & yh : ww) : t;
        })(n);
        if ("function" == typeof i) {
          if (!ah(t, e, r)) return r & O.Host ? Dh(o, 0, r) : Ch(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & O.Optional) return s;
            zi();
          } finally {
            dh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = _h(e, t),
            l = Cr,
            u = r & O.Host ? t[ze][He] : null;
          for (
            (-1 === a || r & O.SkipSelf) &&
            ((l = -1 === a ? Ol(e, t) : t[a + 8]),
            l !== Cr && Mh(r, !1)
              ? ((s = t[I]), (a = as(l)), (t = ls(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[I];
            if (bh(i, a, c.data)) {
              const d = Dw(a, t, n, s, r, u);
              if (d !== Yt) return d;
            }
            (l = t[a + 8]),
              l !== Cr && Mh(r, t[I].data[a + 8] === u) && bh(i, a, t)
                ? ((s = c), (a = as(l)), (t = ls(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function Dw(e, t, n, r, o, i) {
        const s = t[I],
          a = s.data[e + 8],
          c = ds(
            a,
            s,
            n,
            null == r ? Mo(a) && Nl : r != s && 0 != (3 & a.type),
            o & O.Host && i === a
          );
        return null !== c ? Kn(t, s, c, a) : Yt;
      }
      function ds(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          l = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < l && n === p) || (h >= l && p.type === n)) return h;
        }
        if (o) {
          const h = s[l];
          if (h && Rt(h) && h.type === n) return l;
        }
        return null;
      }
      function Kn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function hw(e) {
            return e instanceof Io;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function m0(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new E(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function ee(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(i[n])
            );
          const a = us(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Ct(s.injectImpl) : null;
          ah(e, r, O.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function dw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = qf(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && Ct(l), us(a), (s.resolving = !1), dh();
          }
        }
        return o;
      }
      function bh(e, t, n) {
        return !!(n[t + (e >> vh)] & (1 << e));
      }
      function Mh(e, t) {
        return !(e & O.Self || (e & O.Host && t));
      }
      class wr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return wh(this._tNode, this._lView, t, Zi(r), n);
        }
      }
      function ww() {
        return new wr(je(), D());
      }
      function Be(e) {
        return un(() => {
          const t = e.prototype.constructor,
            n = t[dn] || Pl(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[dn] || Pl(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Pl(e) {
        return ll(e)
          ? () => {
              const t = Pl(R(e));
              return t && t();
            }
          : Yn(e);
      }
      function Sh(e) {
        const t = e[I],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[He] : null;
      }
      const br = "__parameters__";
      function Sr(e, t, n) {
        return un(() => {
          const r = (function kl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(br)
                ? l[br]
                : Object.defineProperty(l, br, { value: [] })[br];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class A {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = P({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Xn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Xn(n, t) : t(n)));
      }
      function Ah(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function hs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function No(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function ht(e, t, n) {
        let r = Ir(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Iw(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Vl(e, t) {
        const n = Ir(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Ir(e, t) {
        return (function Th(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Ro = Do(Sr("Optional"), 8),
        Oo = Do(Sr("SkipSelf"), 4);
      var rt = (() => (
        ((rt = rt || {})[(rt.Important = 1)] = "Important"),
        (rt[(rt.DashCase = 2)] = "DashCase"),
        rt
      ))();
      const zl = new Map();
      let Yw = 0;
      const Wl = "__ngContext__";
      function Ge(e, t) {
        ut(t)
          ? ((e[Wl] = t[bo]),
            (function Kw(e) {
              zl.set(e[bo], e);
            })(t))
          : (e[Wl] = t);
      }
      let ql;
      function Zl(e, t) {
        return ql(e, t);
      }
      function Lo(e) {
        const t = e[_e];
        return Nt(t) ? t[_e] : t;
      }
      function Yl(e) {
        return Yh(e[wo]);
      }
      function Ql(e) {
        return Yh(e[xt]);
      }
      function Yh(e) {
        for (; null !== e && !Nt(e); ) e = e[xt];
        return e;
      }
      function Tr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Nt(r) ? (i = r) : ut(r) && ((s = !0), (r = r[hn]));
          const a = Ve(r);
          0 === e && null !== n
            ? null == o
              ? tp(t, n, a)
              : Jn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Jn(t, n, a, o || null, !0)
            : 2 === e
            ? (function ru(e, t, n) {
                const r = ys(e, t);
                r &&
                  (function y1(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function D1(e, t, n, r, o) {
                const i = n[Ji];
                i !== Ve(n) && Tr(t, e, r, i, o);
                for (let a = Ye; a < n.length; a++) {
                  const l = n[a];
                  Vo(l[I], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Xl(e, t, n) {
        return e.createElement(t, n);
      }
      function Kh(e, t) {
        const n = e[vr],
          r = n.indexOf(t),
          o = t[_e];
        512 & t[H] && ((t[H] &= -513), Dl(o, -1)), n.splice(r, 1);
      }
      function Jl(e, t) {
        if (e.length <= Ye) return;
        const n = Ye + t,
          r = e[n];
        if (r) {
          const o = r[Eo];
          null !== o && o !== e && Kh(o, r), t > 0 && (e[n - 1][xt] = r[xt]);
          const i = hs(e, Ye + t);
          !(function u1(e, t) {
            Vo(e, t, t[G], 2, null, null), (t[hn] = null), (t[He] = null);
          })(r[I], r);
          const s = i[Gt];
          null !== s && s.detachView(i[I]),
            (r[_e] = null),
            (r[xt] = null),
            (r[H] &= -65);
        }
        return r;
      }
      function Xh(e, t) {
        if (!(128 & t[H])) {
          const n = t[G];
          n.destroyNode && Vo(e, t, n, 3, null, null),
            (function f1(e) {
              let t = e[wo];
              if (!t) return eu(e[I], e);
              for (; t; ) {
                let n = null;
                if (ut(t)) n = t[wo];
                else {
                  const r = t[Ye];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[xt] && t !== e; )
                    ut(t) && eu(t[I], t), (t = t[_e]);
                  null === t && (t = e), ut(t) && eu(t[I], t), (n = t && t[xt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function eu(e, t) {
        if (!(128 & t[H])) {
          (t[H] &= -65),
            (t[H] |= 128),
            (function m1(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Io)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        wt(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          wt(5, a, l);
                        }
                      }
                    else {
                      wt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        wt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function g1(e, t) {
              const n = e.cleanup,
                r = t[gr];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[gr] = null;
              }
            })(e, t),
            1 === t[I].type && t[G].destroy();
          const n = t[Eo];
          if (null !== n && Nt(t[_e])) {
            n !== t[_e] && Kh(n, t);
            const r = t[Gt];
            null !== r && r.detachView(e);
          }
          !(function Xw(e) {
            zl.delete(e[bo]);
          })(t);
        }
      }
      function Jh(e, t, n) {
        return (function ep(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[hn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Ht.None || i === Ht.Emulated) return null;
            }
            return dt(r, n);
          }
        })(e, t.parent, n);
      }
      function Jn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function tp(e, t, n) {
        e.appendChild(t, n);
      }
      function np(e, t, n, r, o) {
        null !== r ? Jn(e, t, n, r, o) : tp(e, t, n);
      }
      function ys(e, t) {
        return e.parentNode(t);
      }
      function rp(e, t, n) {
        return ip(e, t, n);
      }
      let tu,
        su,
        ip = function op(e, t, n) {
          return 40 & e.type ? dt(e, n) : null;
        };
      function vs(e, t, n, r) {
        const o = Jh(e, r, t),
          i = t[G],
          a = rp(r.parent || t[He], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) np(i, o, n[l], a, !1);
          else np(i, o, n, a, !1);
        void 0 !== tu && tu(i, r, t, n, o);
      }
      function _s(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return dt(t, e);
          if (4 & n) return nu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return _s(e, r);
            {
              const o = e[t.index];
              return Nt(o) ? nu(-1, o) : Ve(o);
            }
          }
          if (32 & n) return Zl(t, e)() || Ve(e[t.index]);
          {
            const r = ap(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : _s(Lo(e[ze]), r)
              : _s(e, t.next);
          }
        }
        return null;
      }
      function ap(e, t) {
        return null !== t ? e[ze][He].projection[t.projection] : null;
      }
      function nu(e, t) {
        const n = Ye + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[I].firstChild;
          if (null !== o) return _s(r, o);
        }
        return t[Ji];
      }
      function ou(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && Ge(Ve(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) ou(e, t, n.child, r, o, i, !1), Tr(t, e, o, a, i);
            else if (32 & l) {
              const u = Zl(n, r);
              let c;
              for (; (c = u()); ) Tr(t, e, o, c, i);
              Tr(t, e, o, a, i);
            } else 16 & l ? lp(e, t, r, n, o, i) : Tr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Vo(e, t, n, r, o, i) {
        ou(n, r, e.firstChild, t, o, i, !1);
      }
      function lp(e, t, n, r, o, i) {
        const s = n[ze],
          l = s[He].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Tr(t, e, o, l[u], i);
        else ou(e, t, l, s[_e], o, i, !0);
      }
      function up(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function cp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && xl(e, t, r),
          null !== o && up(e, t, o),
          null !== i &&
            (function w1(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class gp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function xn(e) {
        return e instanceof gp ? e.changingThisBreaksApplicationSecurity : e;
      }
      const Es = new A("ENVIRONMENT_INITIALIZER"),
        Mp = new A("INJECTOR", -1),
        Sp = new A("INJECTOR_DEF_TYPES");
      class Ip {
        get(t, n = vo) {
          if (n === vo) {
            const r = new Error(`NullInjectorError: No provider for ${le(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Y1(...e) {
        return { ɵproviders: Ap(0, e), ɵfromNgModule: !0 };
      }
      function Ap(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Xn(t, (i) => {
            const s = i;
            fu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Tp(o, n),
          n
        );
      }
      function Tp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          hu(o, (i) => {
            t.push(i);
          });
        }
      }
      function fu(e, t, n, r) {
        if (!(e = R(e))) return !1;
        let o = null,
          i = Of(e);
        const s = !i && ne(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = Of(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) fu(u, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                Xn(i.imports, (c) => {
                  fu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Tp(u, t);
            }
            if (!a) {
              const u = Yn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: u, deps: J },
                { provide: Sp, useValue: o, multi: !0 },
                { provide: Es, useValue: () => F(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              hu(l, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function hu(e, t) {
        for (let n of e)
          ul(n) && (n = n.ɵproviders), Array.isArray(n) ? hu(n, t) : t(n);
      }
      const Q1 = oe({ provide: String, useValue: oe });
      function pu(e) {
        return null !== e && "object" == typeof e && Q1 in e;
      }
      function er(e) {
        return "function" == typeof e;
      }
      const gu = new A("Set Injector scope."),
        bs = {},
        X1 = {};
      let mu;
      function Ms() {
        return void 0 === mu && (mu = new Ip()), mu;
      }
      class yn {}
      class Rp extends yn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            vu(t, (s) => this.processProvider(s)),
            this.records.set(Mp, Nr(void 0, this)),
            o.has("environment") && this.records.set(yn, Nr(void 0, this));
          const i = this.records.get(gu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Sp.multi, J, O.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = hr(this),
            r = Ct(void 0);
          try {
            return t();
          } finally {
            hr(n), Ct(r);
          }
        }
        get(t, n = vo, r = O.Default) {
          this.assertNotDestroyed(), (r = Zi(r));
          const o = hr(this),
            i = Ct(void 0);
          try {
            if (!(r & O.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function rE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof A)
                    );
                  })(t) && Gi(t);
                (a = l && this.injectableDefInScope(l) ? Nr(yu(t), bs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & O.Self ? Ms() : this.parent).get(
              t,
              (n = r & O.Optional && n === vo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[qi] = s[qi] || []).unshift(le(t)), o)) throw s;
              return (function N0(e, t, n, r) {
                const o = e[qi];
                throw (
                  (t[kf] && o.unshift(t[kf]),
                  (e.message = (function R0(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == A0
                        ? e.slice(2)
                        : e;
                    let o = le(t);
                    if (Array.isArray(t)) o = t.map(le).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : le(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      I0,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[S0] = o),
                  (e[qi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ct(i), hr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = hr(this),
            n = Ct(void 0);
          try {
            const r = this.get(Es.multi, J, O.Self);
            for (const o of r) o();
          } finally {
            hr(t), Ct(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(le(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new E(205, !1);
        }
        processProvider(t) {
          let n = er((t = R(t))) ? t : R(t && t.provide);
          const r = (function eE(e) {
            return pu(e) ? Nr(void 0, e.useValue) : Nr(Op(e), bs);
          })(t);
          if (er(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Nr(void 0, bs, !0)),
              (o.factory = () => hl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === bs && ((n.value = X1), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function nE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = R(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function yu(e) {
        const t = Gi(e),
          n = null !== t ? t.factory : Yn(e);
        if (null !== n) return n;
        if (e instanceof A) throw new E(204, !1);
        if (e instanceof Function)
          return (function J1(e) {
            const t = e.length;
            if (t > 0) throw (No(t, "?"), new E(204, !1));
            const n = (function w0(e) {
              const t = e && (e[Wi] || e[Ff]);
              return t
                ? ((function E0(e) {
                    if (e.hasOwnProperty("name")) return e.name;
                    ("" + e).match(/^function\s*([^\s(]+)/);
                  })(e),
                  t)
                : null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new E(204, !1);
      }
      function Op(e, t, n) {
        let r;
        if (er(e)) {
          const o = R(e);
          return Yn(o) || yu(o);
        }
        if (pu(e)) r = () => R(e.useValue);
        else if (
          (function Np(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...hl(e.deps || []));
        else if (
          (function xp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => F(R(e.useExisting));
        else {
          const o = R(e && (e.useClass || e.provide));
          if (
            !(function tE(e) {
              return !!e.deps;
            })(e)
          )
            return Yn(o) || yu(o);
          r = () => new o(...hl(e.deps));
        }
        return r;
      }
      function Nr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function vu(e, t) {
        for (const n of e)
          Array.isArray(n) ? vu(n, t) : n && ul(n) ? vu(n.ɵproviders, t) : t(n);
      }
      class oE {}
      class Fp {}
      class sE {
        resolveComponentFactory(t) {
          throw (function iE(e) {
            const t = Error(
              `No component factory found for ${le(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Uo = (() => {
        class e {}
        return (e.NULL = new sE()), e;
      })();
      function aE() {
        return Rr(je(), D());
      }
      function Rr(e, t) {
        return new pt(dt(e, t));
      }
      let pt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = aE), e;
      })();
      function lE(e) {
        return e instanceof pt ? e.nativeElement : e;
      }
      class kp {}
      let vn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function uE() {
                const e = D(),
                  n = ft(je().index, e);
                return (ut(n) ? n : e)[G];
              })()),
            e
          );
        })(),
        cE = (() => {
          class e {}
          return (
            (e.ɵprov = P({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ho {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const dE = new Ho("15.2.5"),
        _u = {},
        Du = "ngOriginalError";
      function Cu(e) {
        return e[Du];
      }
      class Or {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Cu(t);
          for (; n && Cu(n); ) n = Cu(n);
          return n || null;
        }
      }
      function _n(e) {
        return e instanceof Function ? e() : e;
      }
      function Vp(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const jp = "ng-template";
      function wE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Vp(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Bp(e) {
        return 4 === e.type && e.value !== jp;
      }
      function EE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : jp);
      }
      function bE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function IE(e) {
            for (let t = 0; t < e.length; t++) if (hh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !EE(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Ot(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!wE(e.attrs, u, n)) {
                    if (Ot(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = ME(8 & r ? "class" : l, o, Bp(e), n);
                if (-1 === d) {
                  if (Ot(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Vp(h, u, 0)) || (2 & r && u !== f)) {
                    if (Ot(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Ot(r) && !Ot(l)) return !1;
            if (s && Ot(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Ot(r) || s;
      }
      function Ot(e) {
        return 0 == (1 & e);
      }
      function ME(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function AE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function $p(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (bE(e, t[r], n)) return !0;
        return !1;
      }
      function TE(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Up(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function xE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Ot(s) && ((t += Up(i, o)), (o = "")),
              (r = s),
              (i = i || !Ot(r));
          n++;
        }
        return "" !== o && (t += Up(i, o)), t;
      }
      const $ = {};
      function q(e) {
        Hp(K(), D(), Ke() + e, !1);
      }
      function Hp(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[H])) {
            const i = e.preOrderCheckHooks;
            null !== i && is(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ss(t, i, 0, n);
          }
        Qn(n);
      }
      function qp(e, t = null, n = null, r) {
        const o = Zp(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Zp(e, t = null, n = null, r, o = new Set()) {
        const i = [n || J, Y1(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : le(e))),
          new Rp(i, t || Ms(), r || null, o)
        );
      }
      let Qt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return qp({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return qp({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = vo),
          (e.NULL = new Ip()),
          (e.ɵprov = P({ token: e, providedIn: "any", factory: () => F(Mp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function C(e, t = O.Default) {
        const n = D();
        return null === n ? F(e, t) : wh(je(), n, R(e), t);
      }
      function ng(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ml(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Is(e, t, n, r, o, i, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[hn] = o),
          (d[H] = 76 | r),
          (null !== c || (e && 1024 & e[H])) && (d[H] |= 1024),
          Jf(d),
          (d[_e] = d[mr] = e),
          (d[Ce] = n),
          (d[Xi] = s || (e && e[Xi])),
          (d[G] = a || (e && e[G])),
          (d[ml] = l || (e && e[ml]) || null),
          (d[Ki] = u || (e && e[Ki]) || null),
          (d[He] = i),
          (d[bo] = (function Qw() {
            return Yw++;
          })()),
          (d[Hf] = c),
          (d[ze] = 2 == t.type ? e[ze] : d),
          d
        );
      }
      function kr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Su(e, t, n, r, o) {
            const i = nh(),
              s = Cl(),
              l = (e.data[t] = (function nb(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && ((i.next = l), (l.prev = i))),
              l
            );
          })(e, t, n, r, o)),
            (function nw() {
              return B.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function So() {
            const e = B.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Zt(i, !0), i;
      }
      function zo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Iu(e, t, n) {
        Sl(t);
        try {
          const r = e.viewQuery;
          null !== r && Lu(1, r, n);
          const o = e.template;
          null !== o && rg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && ng(e, t),
            e.staticViewQueries && Lu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function JE(e, t) {
              for (let n = 0; n < t.length; n++) Cb(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[H] &= -5), Il();
        }
      }
      function As(e, t, n, r) {
        const o = t[H];
        if (128 != (128 & o)) {
          Sl(t);
          try {
            Jf(t),
              (function oh(e) {
                return (B.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && rg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && is(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && ss(t, u, 0, null), Al(t, 0);
            }
            if (
              ((function _b(e) {
                for (let t = Yl(e); null !== t; t = Ql(t)) {
                  if (!t[zf]) continue;
                  const n = t[vr];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[H] || Dl(o[_e], 1), (o[H] |= 512);
                  }
                }
              })(t),
              (function vb(e) {
                for (let t = Yl(e); null !== t; t = Ql(t))
                  for (let n = Ye; n < t.length; n++) {
                    const r = t[n],
                      o = r[I];
                    rs(r) && As(o, r, o.template, r[Ce]);
                  }
              })(t),
              null !== e.contentQueries && ng(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && is(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && ss(t, u, 1), Al(t, 1);
            }
            !(function KE(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Qn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      rw(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Qn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function XE(e, t) {
                for (let n = 0; n < t.length; n++) Db(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Lu(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && is(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && ss(t, u, 2), Al(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[H] &= -41),
              512 & t[H] && ((t[H] &= -513), Dl(t[_e], -1));
          } finally {
            Il();
          }
        }
      }
      function rg(e, t, n, r, o) {
        const i = Ke(),
          s = 2 & r;
        try {
          Qn(-1),
            s && t.length > fe && Hp(e, t, fe, !1),
            wt(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Qn(i), wt(s ? 3 : 1, o);
        }
      }
      function Au(e, t, n) {
        if (vl(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Tu(e, t, n) {
        th() &&
          ((function lb(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Mo(n) &&
              (function gb(e, t, n) {
                const r = dt(t, e),
                  o = og(n),
                  i = e[Xi],
                  s = Ts(
                    e,
                    Is(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || cs(n, t),
              Ge(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = Kn(t, e, a, n);
              Ge(u, t),
                null !== s && mb(0, a - o, u, l, 0, s),
                Rt(l) && (ft(n.index, t)[Ce] = Kn(t, e, a, n));
            }
          })(e, t, n, dt(n, t)),
          64 == (64 & n.flags) && cg(e, t, n));
      }
      function xu(e, t, n = dt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function og(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Nu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Nu(e, t, n, r, o, i, s, a, l, u) {
        const c = fe + r,
          d = c + o,
          f = (function eb(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : $);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[I] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function ig(e, t, n, r) {
        const o = fg(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && hg(e).push(r, o.length - 1));
      }
      function sg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? ag(n, t, o, i)
              : r.hasOwnProperty(o) && ag(n, t, r[o], i);
          }
        return n;
      }
      function ag(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function lg(e, t) {
        const n = ft(t, e);
        16 & n[H] || (n[H] |= 32);
      }
      function Ru(e, t, n, r) {
        if (th()) {
          const o = null === r ? null : { "": -1 },
            i = (function cb(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if ($p(t, s.selectors, !1))
                    if ((r || (r = []), Rt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Ou(e, t, a.length);
                      } else r.unshift(s), Ou(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && ug(e, t, n, s, o, a),
            o &&
              (function db(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new E(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = Ao(n.mergedAttrs, n.attrs);
      }
      function ug(e, t, n, r, o, i) {
        for (let u = 0; u < r.length; u++) Fl(cs(n, t), e, r[u].type);
        !(function hb(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = zo(e, t, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = Ao(n.mergedAttrs, c.hostAttrs)),
            pb(e, n, t, l, c),
            fb(l, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            l++;
        }
        !(function rb(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = sg(d.inputs, c, l, f ? f.inputs : null)),
              (u = sg(d.outputs, c, u, p));
            const y = null === l || null === s || Bp(t) ? null : yb(l, c, s);
            a.push(y);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = u);
        })(e, n, i);
      }
      function cg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function ow() {
            return B.lFrame.currentDirectiveIndex;
          })();
        try {
          Qn(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              u = t[a];
            El(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                ub(l, u);
          }
        } finally {
          Qn(-1), El(s);
        }
      }
      function ub(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Ou(e, t, n) {
        (t.componentOffset = n),
          (e.components || (e.components = [])).push(t.index);
      }
      function fb(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Rt(t) && (n[""] = e);
        }
      }
      function pb(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Yn(o.type)),
          s = new Io(i, Rt(o), C);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function sb(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function ab(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, zo(e, n, o.hostVars, $), o);
      }
      function mb(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function yb(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function dg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function Db(e, t) {
        const n = ft(t, e);
        if (rs(n)) {
          const r = n[I];
          48 & n[H] ? As(r, n, r.template, n[Ce]) : n[Zn] > 0 && Pu(n);
        }
      }
      function Pu(e) {
        for (let r = Yl(e); null !== r; r = Ql(r))
          for (let o = Ye; o < r.length; o++) {
            const i = r[o];
            if (rs(i))
              if (512 & i[H]) {
                const s = i[I];
                As(s, i, s.template, i[Ce]);
              } else i[Zn] > 0 && Pu(i);
          }
        const n = e[I].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = ft(n[r], e);
            rs(o) && o[Zn] > 0 && Pu(o);
          }
      }
      function Cb(e, t) {
        const n = ft(t, e),
          r = n[I];
        (function wb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Iu(r, n, n[Ce]);
      }
      function Ts(e, t) {
        return e[wo] ? (e[Uf][xt] = t) : (e[wo] = t), (e[Uf] = t), t;
      }
      function ku(e) {
        for (; e; ) {
          e[H] |= 32;
          const t = Lo(e);
          if (V0(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function xs(e, t, n, r = !0) {
        const o = t[Xi];
        o.begin && o.begin();
        try {
          As(e, t, e.template, n);
        } catch (s) {
          throw (r && gg(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Lu(e, t, n) {
        Ml(0), t(e, n);
      }
      function fg(e) {
        return e[gr] || (e[gr] = []);
      }
      function hg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function gg(e, t) {
        const n = e[Ki],
          r = n ? n.get(Or, null) : null;
        r && r.handleError(t);
      }
      function Vu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function Dn(e, t, n) {
        const r = ns(t, e);
        !(function Qh(e, t, n) {
          e.setValue(t, n);
        })(e[G], r, n);
      }
      function Ns(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = al(o, a))
              : 2 == i && (r = al(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Rs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Ve(i)), Nt(i)))
            for (let a = Ye; a < i.length; a++) {
              const l = i[a],
                u = l[I].firstChild;
              null !== u && Rs(l[I], l, u, r);
            }
          const s = n.type;
          if (8 & s) Rs(e, t, n.child, r);
          else if (32 & s) {
            const a = Zl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = ap(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Lo(t[ze]);
              Rs(l[I], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Go {
        get rootNodes() {
          const t = this._lView,
            n = t[I];
          return Rs(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Ce];
        }
        set context(t) {
          this._lView[Ce] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[H]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[_e];
            if (Nt(t)) {
              const n = t[es],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Jl(t, r), hs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Xh(this._lView[I], this._lView);
        }
        onDestroy(t) {
          ig(this._lView[I], this._lView, null, t);
        }
        markForCheck() {
          ku(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[H] &= -65;
        }
        reattach() {
          this._lView[H] |= 64;
        }
        detectChanges() {
          xs(this._lView[I], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new E(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function d1(e, t) {
              Vo(e, t, t[G], 2, null, null);
            })(this._lView[I], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new E(902, !1);
          this._appRef = t;
        }
      }
      class Eb extends Go {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          xs(t[I], t, t[Ce], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class mg extends Uo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ne(t);
          return new Wo(n, this.ngModule);
        }
      }
      function yg(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class Mb {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Zi(r);
          const o = this.injector.get(t, _u, r);
          return o !== _u || n === _u ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Wo extends Fp {
        get inputs() {
          return yg(this.componentDef.inputs);
        }
        get outputs() {
          return yg(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function NE(e) {
              return e.map(xE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof yn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new Mb(t, i) : t,
            a = s.get(kp, null);
          if (null === a) throw new E(407, !1);
          const l = s.get(cE, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function tb(e, t, n) {
                  return e.selectRootElement(t, n === Ht.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Xl(
                  u,
                  c,
                  (function bb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? Qf : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Nu(0, null, null, 1, 0, null, null, null, null, null),
            p = Is(null, h, null, f, null, null, a, u, l, s, null);
          let y, v;
          Sl(p);
          try {
            const w = this.componentDef;
            let S,
              _ = null;
            w.findHostDirectiveDefs
              ? ((S = []),
                (_ = new Map()),
                w.findHostDirectiveDefs(w, S, _),
                S.push(w))
              : (S = [w]);
            const L = (function Ib(e, t) {
                const n = e[I],
                  r = fe;
                return (e[r] = t), kr(n, r, 2, "#host", null);
              })(p, d),
              se = (function Ab(e, t, n, r, o, i, s, a) {
                const l = o[I];
                !(function Tb(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Ao(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ns(t, t.mergedAttrs, !0), null !== n && cp(r, n, t));
                })(r, e, t, s);
                const u = i.createRenderer(t, n),
                  c = Is(
                    o,
                    og(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    u,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && Ou(l, e, r.length - 1),
                  Ts(o, c),
                  (o[e.index] = c)
                );
              })(L, d, w, S, p, a, u);
            (v = Xf(h, fe)),
              d &&
                (function Nb(e, t, n, r) {
                  if (r) xl(e, n, ["ng-version", dE.full]);
                  else {
                    const { attrs: o, classes: i } = (function RE(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!Ot(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && xl(e, n, o),
                      i && i.length > 0 && up(e, n, i.join(" "));
                  }
                })(u, w, d, r),
              void 0 !== n &&
                (function Rb(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(v, this.ngContentSelectors, n),
              (y = (function xb(e, t, n, r, o, i) {
                const s = je(),
                  a = o[I],
                  l = dt(s, o);
                ug(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Ge(Kn(o, a, s.directiveStart + c, s), o);
                cg(a, o, s), l && Ge(l, o);
                const u = Kn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[Ce] = o[Ce] = u), null !== i))
                  for (const c of i) c(u, t);
                return Au(a, s, e), u;
              })(se, w, S, _, p, [Ob])),
              Iu(h, p, null);
          } finally {
            Il();
          }
          return new Sb(this.componentType, y, Rr(v, p), p, v);
        }
      }
      class Sb extends oE {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Eb(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Vu(i[I], i, o, t, n), lg(i, this._tNode.index);
          }
        }
        get injector() {
          return new wr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function Ob() {
        const e = je();
        os(D()[I], e);
      }
      function re(e) {
        let t = (function vg(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (Rt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new E(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = ju(e.inputs)),
                (s.declaredInputs = ju(e.declaredInputs)),
                (s.outputs = ju(e.outputs));
              const a = o.hostBindings;
              a && Lb(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && Pb(e, l),
                u && kb(e, u),
                sl(e.inputs, o.inputs),
                sl(e.declaredInputs, o.declaredInputs),
                sl(e.outputs, o.outputs),
                Rt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === re && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function Fb(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Ao(o.hostAttrs, (n = Ao(n, o.hostAttrs))));
          }
        })(r);
      }
      function ju(e) {
        return e === cn ? {} : e === J ? [] : e;
      }
      function Pb(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function kb(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function Lb(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function Os(e) {
        return (
          !!(function Bu(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function We(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function tr(e, t, n, r) {
        const o = We(e, t, n);
        return We(e, t + 1, r) || o;
      }
      function Ur(e, t, n, r, o, i, s, a, l, u, c, d) {
        const f = pn();
        let h = (function bt(e, t, n, r, o, i) {
          const s = tr(e, t, n, r);
          return tr(e, t + 2, o, i) || s;
        })(e, f, n, o, s, l);
        return (
          (h = We(e, f + 4, c) || h),
          gn(5),
          h ? t + j(n) + r + j(o) + i + j(s) + a + j(l) + u + j(c) + d : $
        );
      }
      function ke(e, t, n, r, o, i, s, a) {
        const l = D(),
          u = K(),
          c = e + fe,
          d = u.firstCreatePass
            ? (function qb(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = kr(t, e, 4, s || null, Tn(u, a));
                Ru(t, n, c, Tn(u, l)), os(t, c);
                const d = (c.tView = Nu(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        Zt(d, !1);
        const f = l[G].createComment("");
        vs(u, l, f, d),
          Ge(f, l),
          Ts(l, (l[c] = dg(f, l, f, d))),
          ts(d) && Tu(u, l, d),
          null != s && xu(l, d, a);
      }
      function en(e) {
        return (function _r(e, t) {
          return e[t];
        })(
          (function tw() {
            return B.lFrame.contextLView;
          })(),
          fe + e
        );
      }
      function ie(e, t, n) {
        const r = D();
        return (
          We(r, Dr(), t) &&
            (function gt(e, t, n, r, o, i, s, a) {
              const l = dt(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Vu(e, n, c, r, o), Mo(t) && lg(n, t.index))
                : 3 & t.type &&
                  ((r = (function ob(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(l, r, o));
            })(
              K(),
              (function ye() {
                const e = B.lFrame;
                return Xf(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[G],
              n,
              !1
            ),
          ie
        );
      }
      function $u(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Vu(e, n, t.inputs[s], s, r);
      }
      function g(e, t, n, r) {
        const o = D(),
          i = K(),
          s = fe + e,
          a = o[G],
          l = i.firstCreatePass
            ? (function Yb(e, t, n, r, o, i) {
                const s = t.consts,
                  l = kr(t, e, 2, r, Tn(s, o));
                return (
                  Ru(t, n, l, Tn(s, i)),
                  null !== l.attrs && Ns(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ns(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          u = (o[s] = Xl(
            a,
            t,
            (function cw() {
              return B.lFrame.currentNamespace;
            })()
          )),
          c = ts(l);
        return (
          Zt(l, !0),
          cp(a, u, l),
          32 != (32 & l.flags) && vs(i, o, u, l),
          0 ===
            (function Q0() {
              return B.lFrame.elementDepthCount;
            })() && Ge(u, o),
          (function K0() {
            B.lFrame.elementDepthCount++;
          })(),
          c && (Tu(i, o, l), Au(i, l, o)),
          null !== r && xu(o, l),
          g
        );
      }
      function m() {
        let e = je();
        Cl() ? wl() : ((e = e.parent), Zt(e, !1));
        const t = e;
        !(function X0() {
          B.lFrame.elementDepthCount--;
        })();
        const n = K();
        return (
          n.firstCreatePass && (os(n, e), vl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function pw(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            $u(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function gw(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            $u(n, t, D(), t.stylesWithoutHost, !1),
          m
        );
      }
      function T(e, t, n, r) {
        return g(e, t, n, r), m(), T;
      }
      function Zo(e, t, n) {
        const r = D(),
          o = K(),
          i = e + fe,
          s = o.firstCreatePass
            ? (function Qb(e, t, n, r, o) {
                const i = t.consts,
                  s = Tn(i, r),
                  a = kr(t, e, 8, "ng-container", s);
                return (
                  null !== s && Ns(a, s, !0),
                  Ru(t, n, a, Tn(i, o)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(i, o, r, t, n)
            : o.data[i];
        Zt(s, !0);
        const a = (r[i] = r[G].createComment(""));
        return (
          vs(o, r, a, s),
          Ge(a, r),
          ts(s) && (Tu(o, r, s), Au(o, s, r)),
          null != n && xu(r, s),
          Zo
        );
      }
      function Yo() {
        let e = je();
        const t = K();
        return (
          Cl() ? wl() : ((e = e.parent), Zt(e, !1)),
          t.firstCreatePass && (os(t, e), vl(e) && t.queries.elementEnd(e)),
          Yo
        );
      }
      function Ps() {
        return D();
      }
      function Qo(e) {
        return !!e && "function" == typeof e.then;
      }
      const Uu = function Rg(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function X(e, t, n, r) {
        const o = D(),
          i = K(),
          s = je();
        return (
          (function Fg(e, t, n, r, o, i, s) {
            const a = ts(r),
              u = e.firstCreatePass && hg(e),
              c = t[Ce],
              d = fg(t);
            let f = !0;
            if (3 & r.type || s) {
              const y = dt(r, t),
                v = s ? s(y) : y,
                w = d.length,
                S = s ? (L) => s(Ve(L[r.index])) : r.index;
              let _ = null;
              if (
                (!s &&
                  a &&
                  (_ = (function Kb(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[gr],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== _)
              )
                ((_.__ngLastListenerFn__ || _).__ngNextListenerFn__ = i),
                  (_.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = kg(r, t, c, i, !1);
                const L = n.listen(v, o, i);
                d.push(i, L), u && u.push(o, S, w, w + 1);
              }
            } else i = kg(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const y = p.length;
              if (y)
                for (let v = 0; v < y; v += 2) {
                  const se = t[p[v]][p[v + 1]].subscribe(i),
                    Me = d.length;
                  d.push(i, se), u && u.push(o, r.index, Me, -(Me + 1));
                }
            }
          })(i, o, o[G], s, e, t, r),
          X
        );
      }
      function Pg(e, t, n, r) {
        try {
          return wt(6, t, n), !1 !== n(r);
        } catch (o) {
          return gg(e, o), !1;
        } finally {
          wt(7, t, n);
        }
      }
      function kg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          ku(e.componentOffset > -1 ? ft(e.index, t) : t);
          let l = Pg(t, n, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = Pg(t, n, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Ko(e = 1) {
        return (function sw(e) {
          return (B.lFrame.contextLView = (function aw(e, t) {
            for (; e > 0; ) (t = t[mr]), e--;
            return t;
          })(e, B.lFrame.contextLView))[Ce];
        })(e);
      }
      function Xb(e, t) {
        let n = null;
        const r = (function SE(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let o = 0; o < t.length; o++) {
          const i = t[o];
          if ("*" !== i) {
            if (null === r ? $p(e, i, !0) : TE(r, i)) return o;
          } else n = o;
        }
        return n;
      }
      function Nn(e, t = 0, n) {
        const r = D(),
          o = K(),
          i = kr(o, fe + e, 16, null, n || null);
        null === i.projection && (i.projection = t),
          wl(),
          32 != (32 & i.flags) &&
            (function _1(e, t, n) {
              lp(t[G], 0, t, n, Jh(e, n, t), rp(n.parent || t[He], n, t));
            })(o, r, i);
      }
      function ks(e, t) {
        return (e << 17) | (t << 2);
      }
      function Rn(e) {
        return (e >> 17) & 32767;
      }
      function zu(e) {
        return 2 | e;
      }
      function nr(e) {
        return (131068 & e) >> 2;
      }
      function Gu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Wu(e) {
        return 1 | e;
      }
      function qg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Rn(i) : nr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          oM(e[a], t) && ((l = !0), (e[a + 1] = r ? Wu(c) : zu(c))),
            (a = r ? Rn(c) : nr(c));
        }
        l && (e[n + 1] = r ? zu(i) : Wu(i));
      }
      function oM(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Ir(e, t) >= 0)
        );
      }
      const Oe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Zg(e) {
        return e.substring(Oe.key, Oe.keyEnd);
      }
      function iM(e) {
        return e.substring(Oe.value, Oe.valueEnd);
      }
      function Qg(e, t) {
        const n = Oe.textEnd;
        let r = (Oe.key = Wr(e, t, n));
        return n === r
          ? -1
          : ((r = Oe.keyEnd =
              (function uM(e, t, n) {
                let r;
                for (
                  ;
                  t < n &&
                  (45 === (r = e.charCodeAt(t)) ||
                    95 === r ||
                    ((-33 & r) >= 65 && (-33 & r) <= 90) ||
                    (r >= 48 && r <= 57));

                )
                  t++;
                return t;
              })(e, r, n)),
            (r = Xg(e, r, n)),
            (r = Oe.value = Wr(e, r, n)),
            (r = Oe.valueEnd =
              (function cM(e, t, n) {
                let r = -1,
                  o = -1,
                  i = -1,
                  s = t,
                  a = s;
                for (; s < n; ) {
                  const l = e.charCodeAt(s++);
                  if (59 === l) return a;
                  34 === l || 39 === l
                    ? (a = s = Jg(e, l, s, n))
                    : t === s - 4 &&
                      85 === i &&
                      82 === o &&
                      76 === r &&
                      40 === l
                    ? (a = s = Jg(e, 41, s, n))
                    : l > 32 && (a = s),
                    (i = o),
                    (o = r),
                    (r = -33 & l);
                }
                return a;
              })(e, r, n)),
            Xg(e, r, n));
      }
      function Wr(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function Xg(e, t, n, r) {
        return (t = Wr(e, t, n)) < n && t++, t;
      }
      function Jg(e, t, n, r) {
        let o = -1,
          i = n;
        for (; i < r; ) {
          const s = e.charCodeAt(i++);
          if (s == t && 92 !== o) return i;
          o = 92 == s && 92 === o ? 0 : s;
        }
        throw new Error();
      }
      function Xo(e, t, n) {
        return Ft(e, t, n, !1), Xo;
      }
      function qr(e, t) {
        return Ft(e, t, null, !0), qr;
      }
      function Mt(e) {
        !(function Pt(e, t, n, r) {
          const o = K(),
            i = gn(2);
          o.firstUpdatePass && tm(o, null, i, r);
          const s = D();
          if (n !== $ && We(s, i, n)) {
            const a = o.data[Ke()];
            if (im(a, r) && !em(o, i)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = al(l, n || "")), $u(o, a, s, n, r);
            } else
              !(function vM(e, t, n, r, o, i, s, a) {
                o === $ && (o = J);
                let l = 0,
                  u = 0,
                  c = 0 < o.length ? o[0] : null,
                  d = 0 < i.length ? i[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = l < o.length ? o[l + 1] : void 0,
                    h = u < i.length ? i[u + 1] : void 0;
                  let y,
                    p = null;
                  c === d
                    ? ((l += 2), (u += 2), f !== h && ((p = d), (y = h)))
                    : null === d || (null !== c && c < d)
                    ? ((l += 2), (p = c))
                    : ((u += 2), (p = d), (y = h)),
                    null !== p && rm(e, t, n, r, p, y, s, a),
                    (c = l < o.length ? o[l] : null),
                    (d = u < i.length ? i[u] : null);
                }
              })(
                o,
                a,
                s,
                s[G],
                s[i + 1],
                (s[i + 1] = (function yM(e, t, n) {
                  if (null == n || "" === n) return J;
                  const r = [],
                    o = xn(n);
                  if (Array.isArray(o))
                    for (let i = 0; i < o.length; i++) e(r, o[i], !0);
                  else if ("object" == typeof o)
                    for (const i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
                  else "string" == typeof o && t(r, o);
                  return r;
                })(e, t, n)),
                r,
                i
              );
          }
        })(nm, dM, e, !1);
      }
      function dM(e, t) {
        for (
          let n = (function aM(e) {
            return (
              (function Kg(e) {
                (Oe.key = 0),
                  (Oe.keyEnd = 0),
                  (Oe.value = 0),
                  (Oe.valueEnd = 0),
                  (Oe.textEnd = e.length);
              })(e),
              Qg(e, Wr(e, 0, Oe.textEnd))
            );
          })(t);
          n >= 0;
          n = Qg(t, n)
        )
          nm(e, Zg(t), iM(t));
      }
      function Ft(e, t, n, r) {
        const o = D(),
          i = K(),
          s = gn(2);
        i.firstUpdatePass && tm(i, e, s, r),
          t !== $ &&
            We(o, s, t) &&
            rm(
              i,
              i.data[Ke()],
              o,
              o[G],
              e,
              (o[s + 1] = (function _M(e, t) {
                return (
                  null == e ||
                    "" === e ||
                    ("string" == typeof t
                      ? (e += t)
                      : "object" == typeof e && (e = le(xn(e)))),
                  e
                );
              })(t, n)),
              r,
              s
            );
      }
      function em(e, t) {
        return t >= e.expandoStartIndex;
      }
      function tm(e, t, n, r) {
        const o = e.data;
        if (null === o[n + 1]) {
          const i = o[Ke()],
            s = em(e, n);
          im(i, r) && null === t && !s && (t = !1),
            (t = (function hM(e, t, n, r) {
              const o = (function bl(e) {
                const t = B.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let i = r ? t.residualClasses : t.residualStyles;
              if (null === o)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = Jo((n = qu(null, e, t, n, r)), t.attrs, r)),
                  (i = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== o)
                  if (((n = qu(o, e, t, n, r)), null === i)) {
                    let l = (function pM(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== nr(r)) return e[Rn(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = qu(null, e, t, l[1], r)),
                      (l = Jo(l, t.attrs, r)),
                      (function gM(e, t, n, r) {
                        e[Rn(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    i = (function mM(e, t, n) {
                      let r;
                      const o = t.directiveEnd;
                      for (let i = 1 + t.directiveStylingLast; i < o; i++)
                        r = Jo(r, e[i].hostAttrs, n);
                      return Jo(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== i &&
                  (r ? (t.residualClasses = i) : (t.residualStyles = i)),
                n
              );
            })(o, i, t, r)),
            (function nM(e, t, n, r, o, i) {
              let s = i ? t.classBindings : t.styleBindings,
                a = Rn(s),
                l = nr(s);
              e[r] = n;
              let c,
                u = !1;
              if (
                (Array.isArray(n)
                  ? ((c = n[1]), (null === c || Ir(n, c) > 0) && (u = !0))
                  : (c = n),
                o)
              )
                if (0 !== l) {
                  const f = Rn(e[a + 1]);
                  (e[r + 1] = ks(f, a)),
                    0 !== f && (e[f + 1] = Gu(e[f + 1], r)),
                    (e[a + 1] = (function eM(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = ks(a, 0)),
                    0 !== a && (e[a + 1] = Gu(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = ks(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = Gu(e[l + 1], r)),
                  (l = r);
              u && (e[r + 1] = zu(e[r + 1])),
                qg(e, c, r, !0),
                qg(e, c, r, !1),
                (function rM(e, t, n, r, o) {
                  const i = o ? e.residualClasses : e.residualStyles;
                  null != i &&
                    "string" == typeof t &&
                    Ir(i, t) >= 0 &&
                    (n[r + 1] = Wu(n[r + 1]));
                })(t, c, e, r, i),
                (s = ks(a, l)),
                i ? (t.classBindings = s) : (t.styleBindings = s);
            })(o, i, t, n, s, r);
        }
      }
      function qu(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Jo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Jo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ht(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function nm(e, t, n) {
        ht(e, t, xn(n));
      }
      function rm(e, t, n, r, o, i, s, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          u = l[a + 1],
          c = (function tM(e) {
            return 1 == (1 & e);
          })(u)
            ? om(l, t, n, o, nr(u), s)
            : void 0;
        Ls(c) ||
          (Ls(i) ||
            ((function Jb(e) {
              return 2 == (2 & e);
            })(u) &&
              (i = om(l, null, n, o, a, s))),
          (function C1(e, t, n, r, o) {
            if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let i = -1 === r.indexOf("-") ? void 0 : rt.DashCase;
              null == o
                ? e.removeStyle(n, r, i)
                : ("string" == typeof o &&
                    o.endsWith("!important") &&
                    ((o = o.slice(0, -10)), (i |= rt.Important)),
                  e.setStyle(n, r, o, i));
            }
          })(r, s, ns(Ke(), n), o, i));
      }
      function om(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[o + 1];
          f === $ && (f = d ? J : void 0);
          let h = d ? Vl(f, r) : c === r ? f : void 0;
          if ((u && !Ls(h) && (h = Vl(l, r)), Ls(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Rn(p) : nr(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Vl(l, r));
        }
        return a;
      }
      function Ls(e) {
        return void 0 !== e;
      }
      function im(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function b(e, t = "") {
        const n = D(),
          r = K(),
          o = e + fe,
          i = r.firstCreatePass ? kr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Kl(e, t) {
            return e.createText(t);
          })(n[G], t));
        vs(r, n, s, i), Zt(i, !1);
      }
      function Zu(e) {
        return Zr("", e, ""), Zu;
      }
      function Zr(e, t, n) {
        const r = D(),
          o = (function Vr(e, t, n, r) {
            return We(e, Dr(), n) ? t + j(n) + r : $;
          })(r, e, t, n);
        return o !== $ && Dn(r, Ke(), o), Zr;
      }
      function ei(e, t, n, r, o) {
        const i = D(),
          s = (function jr(e, t, n, r, o, i) {
            const a = tr(e, pn(), n, o);
            return gn(2), a ? t + j(n) + r + j(o) + i : $;
          })(i, e, t, n, r, o);
        return s !== $ && Dn(i, Ke(), s), ei;
      }
      function Vs(e, t, n, r, o, i, s, a, l, u, c) {
        const d = D(),
          f = Ur(d, e, t, n, r, o, i, s, a, l, u, c);
        return f !== $ && Dn(d, Ke(), f), Vs;
      }
      const Qr = "en-US";
      let Mm = Qr;
      function Ku(e, t, n, r, o) {
        if (((e = R(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) Ku(e[i], t, n, r, o);
        else {
          const i = K(),
            s = D();
          let a = er(e) ? e : R(e.provide),
            l = Op(e);
          const u = je(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (er(e) || !e.multi) {
            const h = new Io(l, o, C),
              p = Ju(a, t, o ? c : c + f, d);
            -1 === p
              ? (Fl(cs(u, s), i, a),
                Xu(i, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Ju(a, t, c + f, d),
              p = Ju(a, t, c, c + f),
              v = p >= 0 && n[p];
            if ((o && !v) || (!o && !(h >= 0 && n[h]))) {
              Fl(cs(u, s), i, a);
              const w = (function LS(e, t, n, r, o) {
                const i = new Io(e, n, C);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Qm(i, o, r && !n),
                  i
                );
              })(o ? kS : PS, n.length, o, r, l);
              !o && v && (n[p].providerFactory = w),
                Xu(i, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(w),
                s.push(w);
            } else Xu(i, e, h > -1 ? h : p, Qm(n[o ? p : h], l, !o && r));
            !o && r && v && n[p].componentProviders++;
          }
        }
      }
      function Xu(e, t, n, r) {
        const o = er(t),
          i = (function K1(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? R(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function Qm(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Ju(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function PS(e, t, n, r) {
        return ec(this.multi, []);
      }
      function kS(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Kn(n, n[I], this.providerFactory.index, r);
          (i = a.slice(0, s)), ec(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), ec(o, i);
        return i;
      }
      function ec(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ge(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function FS(e, t, n) {
              const r = K();
              if (r.firstCreatePass) {
                const o = Rt(e);
                Ku(n, r.data, r.blueprint, o, !0),
                  Ku(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Kr {}
      class Km {}
      class Xm extends Kr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new mg(this));
          const r = lt(t);
          (this._bootstrapComponents = _n(r.bootstrap)),
            (this._r3Injector = Zp(
              t,
              n,
              [
                { provide: Kr, useValue: this },
                { provide: Uo, useValue: this.componentFactoryResolver },
              ],
              le(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class tc extends Km {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Xm(this.moduleType, t);
        }
      }
      class jS extends Kr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new mg(this)),
            (this.instance = null);
          const o = new Rp(
            [
              ...t,
              { provide: Kr, useValue: this },
              { provide: Uo, useValue: this.componentFactoryResolver },
            ],
            n || Ms(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Hs(e, t, n = null) {
        return new jS(e, t, n).injector;
      }
      let BS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Ap(0, n.type),
                o =
                  r.length > 0
                    ? Hs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "environment",
            factory: () => new e(F(yn)),
          })),
          e
        );
      })();
      function Jm(e) {
        e.getStandaloneInjector = (t) =>
          t.get(BS).getOrCreateStandaloneInjector(e);
      }
      function rc(e, t, n, r, o) {
        return (function ay(e, t, n, r, o, i, s) {
          const a = t + n;
          return tr(e, a, o, i)
            ? (function Xt(e, t, n) {
                return (e[t] = n);
              })(e, a + 2, s ? r.call(s, o, i) : r(o, i))
            : (function si(e, t) {
                const n = e[t];
                return n === $ ? void 0 : n;
              })(e, a + 2);
        })(
          D(),
          (function Qe() {
            const e = B.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r,
          o
        );
      }
      function oc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const me = class dI extends an {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = oc(i)), o && (o = oc(o)), s && (s = oc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof vt && t.add(a), a;
        }
      };
      function fI() {
        return this._results[Symbol.iterator]();
      }
      class ic {
        get changes() {
          return this._changes || (this._changes = new me());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = ic.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = fI);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = (function Et(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function Mw(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Cn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = gI), e;
      })();
      const hI = Cn,
        pI = class extends hI {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Is(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[Eo] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Gt];
            return (
              null !== s && (o[Gt] = s.createEmbeddedView(r)),
              Iu(r, o, t),
              new Go(o)
            );
          }
        };
      function gI() {
        return zs(je(), D());
      }
      function zs(e, t) {
        return 4 & e.type ? new pI(t, e, Rr(e, t)) : null;
      }
      let kt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = mI), e;
      })();
      function mI() {
        return hy(je(), D());
      }
      const yI = kt,
        dy = class extends yI {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Rr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new wr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ol(this._hostTNode, this._hostLView);
            if (mh(t)) {
              const n = ls(t, this._hostLView),
                r = as(t);
              return new wr(n[I].data[r + 8], n);
            }
            return new wr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = fy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ye;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function xo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Wo(ne(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(yn, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[I];
            if (
              (function Y0(e) {
                return Nt(e[_e]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[_e],
                  f = new dy(d, d[He], d[_e]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function h1(e, t, n, r) {
              const o = Ye + r,
                i = n.length;
              r > 0 && (n[o - 1][xt] = t),
                r < i - Ye
                  ? ((t[xt] = n[o]), Ah(n, Ye + r, t))
                  : (n.push(t), (t[xt] = null)),
                (t[_e] = n);
              const s = t[Eo];
              null !== s &&
                n !== s &&
                (function p1(e, t) {
                  const n = e[vr];
                  t[ze] !== t[_e][_e][ze] && (e[zf] = !0),
                    null === n ? (e[vr] = [t]) : n.push(t);
                })(s, t);
              const a = t[Gt];
              null !== a && a.insertView(e), (t[H] |= 64);
            })(o, r, s, i);
            const a = nu(i, s),
              l = r[G],
              u = ys(l, s[Ji]);
            return (
              null !== u &&
                (function c1(e, t, n, r, o, i) {
                  (r[hn] = o), (r[He] = t), Vo(e, r, n, 1, o, i);
                })(o, s[He], l, r, u, a),
              t.attachToViewContainerRef(),
              Ah(sc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = fy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Jl(this._lContainer, n);
            r && (hs(sc(this._lContainer), n), Xh(r[I], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Jl(this._lContainer, n);
            return r && null != hs(sc(this._lContainer), n) ? new Go(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function fy(e) {
        return e[es];
      }
      function sc(e) {
        return e[es] || (e[es] = []);
      }
      function hy(e, t) {
        let n;
        const r = t[e.index];
        if (Nt(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = Ve(r);
          else {
            const i = t[G];
            o = i.createComment("");
            const s = dt(e, t);
            Jn(
              i,
              ys(i, s),
              o,
              (function v1(e, t) {
                return e.nextSibling(t);
              })(i, s),
              !1
            );
          }
          (t[e.index] = n = dg(r, t, o, e)), Ts(t, n);
        }
        return new dy(n, e, t);
      }
      class ac {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new ac(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class lc {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new lc(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== _y(t, n).matches && this.queries[n].setDirty();
        }
      }
      class py {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class uc {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new uc(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class cc {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new cc(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, vI(n, i)),
                this.matchTNodeWithReadOption(t, n, ds(n, t, i, !1, !1));
            }
          else
            r === Cn
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, ds(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === pt || o === kt || (o === Cn && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = ds(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function vI(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function DI(e, t, n, r) {
        return -1 === n
          ? (function _I(e, t) {
              return 11 & e.type ? Rr(e, t) : 4 & e.type ? zs(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function CI(e, t, n) {
              return n === pt
                ? Rr(t, e)
                : n === Cn
                ? zs(t, e)
                : n === kt
                ? hy(t, e)
                : void 0;
            })(e, t, r)
          : Kn(e, e[I], n, t);
      }
      function gy(e, t, n, r) {
        const o = t[Gt].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const u = s[l];
            a.push(u < 0 ? null : DI(t, i[u], s[l + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function dc(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = gy(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const l = i[a];
            if (l > 0) r.push(s[a / 2]);
            else {
              const u = i[a + 1],
                c = t[-l];
              for (let d = Ye; d < c.length; d++) {
                const f = c[d];
                f[Eo] === f[_e] && dc(f[I], f, u, r);
              }
              if (null !== c[vr]) {
                const d = c[vr];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  dc(h[I], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function li(e) {
        const t = D(),
          n = K(),
          r = sh();
        Ml(r + 1);
        const o = _y(n, r);
        if (
          e.dirty &&
          (function Z0(e) {
            return 4 == (4 & e[H]);
          })(t) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? dc(n, t, r, []) : gy(n, t, o, r);
            e.reset(i, lE), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Gs(e, t, n) {
        const r = K();
        r.firstCreatePass &&
          ((function vy(e, t, n) {
            null === e.queries && (e.queries = new uc()),
              e.queries.track(new cc(t, n));
          })(r, new py(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function yy(e, t, n) {
            const r = new ic(4 == (4 & n));
            ig(e, t, r, r.destroy),
              null === t[Gt] && (t[Gt] = new lc()),
              t[Gt].queries.push(new ac(r));
          })(r, D(), t);
      }
      function ui() {
        return (function wI(e, t) {
          return e[Gt].queries[t].queryList;
        })(D(), sh());
      }
      function _y(e, t) {
        return e.queries.getByIndex(t);
      }
      function Dy(e, t) {
        return zs(e, t);
      }
      function qs(...e) {}
      const Zs = new A("Application Initializer");
      let Ys = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = qs),
              (this.reject = qs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Qo(i)) n.push(i);
                else if (Uu(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(Zs, 8));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const di = new A("AppId", {
        providedIn: "root",
        factory: function Vy() {
          return `${yc()}${yc()}${yc()}`;
        },
      });
      function yc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const jy = new A("Platform Initializer"),
        By = new A("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let HI = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const wn = new A("LocaleId", {
        providedIn: "root",
        factory: () =>
          Q(wn, O.Optional | O.SkipSelf) ||
          (function zI() {
            return (typeof $localize < "u" && $localize.locale) || Qr;
          })(),
      });
      class WI {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let $y = (() => {
        class e {
          compileModuleSync(n) {
            return new tc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = _n(lt(n).declarations).reduce((s, a) => {
                const l = ne(a);
                return l && s.push(new Wo(l)), s;
              }, []);
            return new WI(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const YI = (() => Promise.resolve(0))();
      function vc(e) {
        typeof Zone > "u"
          ? YI.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class we {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me(!1)),
            (this.onMicrotaskEmpty = new me(!1)),
            (this.onStable = new me(!1)),
            (this.onError = new me(!1)),
            typeof Zone > "u")
          )
            throw new E(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function QI() {
              let e = de.requestAnimationFrame,
                t = de.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function JI(e) {
              const t = () => {
                !(function XI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(de, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Dc(e),
                                (e.isCheckStableRunning = !0),
                                _c(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Dc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return zy(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Gy(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return zy(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Gy(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Dc(e),
                          _c(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!we.isInAngularZone()) throw new E(909, !1);
        }
        static assertNotInAngularZone() {
          if (we.isInAngularZone()) throw new E(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, KI, qs, qs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const KI = {};
      function _c(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Dc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function zy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Gy(e) {
        e._nesting--, _c(e);
      }
      class eA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me()),
            (this.onMicrotaskEmpty = new me()),
            (this.onStable = new me()),
            (this.onError = new me());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Wy = new A(""),
        Qs = new A("");
      let Ec,
        Cc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ec ||
                  ((function tA(e) {
                    Ec = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      we.assertNotInAngularZone(),
                        vc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                vc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(we), F(wc), F(Qs));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        wc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Ec?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const En = !1;
      let On = null;
      const qy = new A("AllowMultipleToken"),
        bc = new A("PlatformDestroyListeners"),
        Zy = new A("appBootstrapListener");
      class Yy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Ky(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new A(r);
        return (i = []) => {
          let s = Mc();
          if (!s || s.injector.get(qy, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function oA(e) {
                  if (On && !On.get(qy, !1)) throw new E(400, !1);
                  On = e;
                  const t = e.get(Jy);
                  (function Qy(e) {
                    const t = e.get(jy, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Xy(e = [], t) {
                    return Qt.create({
                      name: t,
                      providers: [
                        { provide: gu, useValue: "platform" },
                        { provide: bc, useValue: new Set([() => (On = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function sA(e) {
            const t = Mc();
            if (!t) throw new E(401, !1);
            return t;
          })();
        };
      }
      function Mc() {
        return On?.get(Jy) ?? null;
      }
      let Jy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function tv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new eA()
                      : ("zone.js" === e ? void 0 : e) || new we(t)),
                  n
                );
              })(
                r?.ngZone,
                (function ev(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: we, useValue: o }];
            return o.run(() => {
              const s = Qt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(Or, null);
              if (!l) throw new E(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Xs(this._modules, a), u.unsubscribe();
                  });
                }),
                (function nv(e, t, n) {
                  try {
                    const r = n();
                    return Qo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(Ys);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function Sm(e) {
                          Dt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Mm = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(wn, Qr) || Qr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = rv({}, r);
            return (function nA(e, t, n) {
              const r = new tc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ks);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new E(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new E(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(bc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(Qt));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function rv(e, t) {
        return Array.isArray(t) ? t.reduce(rv, e) : { ...e, ...t };
      }
      let Ks = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new Se((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Se((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    we.assertNotInAngularZone(),
                      vc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  we.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function h0(...e) {
              const t = yo(e),
                n = (function s0(e, t) {
                  return "number" == typeof ol(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? _t(r[0])
                  : fr(n)(Ie(r, t))
                : $t;
            })(
              i,
              s.pipe(
                (function p0(e = {}) {
                  const {
                    connector: t = () => new an(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      p = () => {
                        const y = s;
                        h(), y?.unsubscribe();
                      };
                    return Pe((y, v) => {
                      u++, !d && !c && f();
                      const w = (l = l ?? t());
                      v.add(() => {
                        u--, 0 === u && !d && !c && (a = il(p, o));
                      }),
                        w.subscribe(v),
                        !s &&
                          u > 0 &&
                          ((s = new mo({
                            next: (S) => w.next(S),
                            error: (S) => {
                              (d = !0), f(), (a = il(h, n, S)), w.error(S);
                            },
                            complete: () => {
                              (c = !0), f(), (a = il(h, r)), w.complete();
                            },
                          })),
                          _t(y).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof Fp;
            if (!this._injector.get(Ys).done) {
              !o &&
                (function pr(e) {
                  const t = ne(e) || Ue(e) || nt(e);
                  return null !== t && t.standalone;
                })(n);
              throw new E(405, En);
            }
            let s;
            (s = o ? n : this._injector.get(Uo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function rA(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Kr),
              u = s.create(Qt.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(Wy, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Xs(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new E(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Xs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Zy, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Xs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new E(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(we), F(yn), F(Or));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Xs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Js = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = lA), e;
      })();
      function lA(e) {
        return (function uA(e, t, n) {
          if (Mo(e) && !n) {
            const r = ft(e.index, t);
            return new Go(r, r);
          }
          return 47 & e.type ? new Go(t[ze], t) : null;
        })(je(), D(), 16 == (16 & e));
      }
      class lv {
        constructor() {}
        supports(t) {
          return Os(t);
        }
        create(t) {
          return new gA(t);
        }
      }
      const pA = (e, t) => t;
      class gA {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || pA);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < cv(r, o, i)) ? n : r,
              a = cv(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Os(t))) throw new E(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function zb(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new mA(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new uv()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new uv()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class mA {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class yA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class uv {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new yA()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function cv(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function fv() {
        return new na([new lv()]);
      }
      let na = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || fv()),
              deps: [[e, new Oo(), new Ro()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new E(901, !1);
          }
        }
        return (e.ɵprov = P({ token: e, providedIn: "root", factory: fv })), e;
      })();
      const wA = Ky(null, "core", []);
      let EA = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(Ks));
          }),
          (e.ɵmod = zt({ type: e })),
          (e.ɵinj = Tt({})),
          e
        );
      })();
      let xc = null;
      function bn() {
        return xc;
      }
      class SA {}
      const it = new A("DocumentToken");
      let Nc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function IA() {
                return F(pv);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const AA = new A("Location Initialized");
      let pv = (() => {
        class e extends Nc {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return bn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = bn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = bn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            gv() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            gv()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(it));
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function TA() {
                return new pv(F(it));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function gv() {
        return !!window.history.pushState;
      }
      function Rc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function mv(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Mn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let ir = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return Q(vv);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const yv = new A("appBaseHref");
      let vv = (() => {
          class e extends ir {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  Q(it).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Rc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Mn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Mn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Mn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(Nc), F(yv, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        xA = (() => {
          class e extends ir {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Rc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Mn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Mn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(Nc), F(yv, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Oc = (() => {
          class e {
            constructor(n) {
              (this._subject = new me()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function OA(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(mv(_v(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Mn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function RA(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, _v(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Mn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Mn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Mn),
            (e.joinWithSlash = Rc),
            (e.stripTrailingSlash = mv),
            (e.ɵfac = function (n) {
              return new (n || e)(F(ir));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function NA() {
                  return new Oc(F(ir));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function _v(e) {
        return e.replace(/\/index.html$/, "");
      }
      class _T {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let zc = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new _T(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Nv(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Nv(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(kt), C(Cn), C(na));
          }),
          (e.ɵdir = V({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Nv(e, t) {
        e.context.$implicit = t.item;
      }
      let fa = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new CT()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Rv("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Rv("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(kt), C(Cn));
          }),
          (e.ɵdir = V({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class CT {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Rv(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${le(t)}'.`
          );
      }
      class Gc {
        constructor(t, n) {
          (this._viewContainerRef = t),
            (this._templateRef = n),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let ha = (() => {
          class e {
            constructor() {
              (this._defaultViews = []),
                (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(n) {
              (this._ngSwitch = n),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(n) {
              this._defaultViews.push(n);
            }
            _matchCase(n) {
              const r = n == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              );
            }
            _updateDefaultCases(n) {
              if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
                this._defaultUsed = n;
                for (const r of this._defaultViews) r.enforceState(n);
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = V({
              type: e,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
              standalone: !0,
            })),
            e
          );
        })(),
        Ov = (() => {
          class e {
            constructor(n, r, o) {
              (this.ngSwitch = o), o._addCase(), (this._view = new Gc(n, r));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(kt), C(Cn), C(ha, 9));
            }),
            (e.ɵdir = V({
              type: e,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
              standalone: !0,
            })),
            e
          );
        })(),
        Fv = (() => {
          class e {
            constructor(n, r, o) {
              o._addDefault(new Gc(n, r));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(kt), C(Cn), C(ha, 9));
            }),
            (e.ɵdir = V({
              type: e,
              selectors: [["", "ngSwitchDefault", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        zT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = zt({ type: e })),
            (e.ɵinj = Tt({})),
            e
          );
        })();
      let ZT = (() => {
        class e {}
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new YT(F(it), window),
          })),
          e
        );
      })();
      class YT {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function QT(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Vv(this.window.history) ||
              Vv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Vv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class bx extends SA {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Qc extends bx {
        static makeCurrent() {
          !(function MA(e) {
            xc || (xc = e);
          })(new Qc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function Mx() {
            return (
              (mi = mi || document.querySelector("base")),
              mi ? mi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function Sx(e) {
                (ma = ma || document.createElement("a")),
                  ma.setAttribute("href", e);
                const t = ma.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          mi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function mT(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let ma,
        mi = null;
      const Hv = new A("TRANSITION_ID"),
        Ax = [
          {
            provide: Zs,
            useFactory: function Ix(e, t, n) {
              return () => {
                n.get(Ys).donePromise.then(() => {
                  const r = bn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Hv, it, Qt],
            multi: !0,
          },
        ];
      let xx = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ya = new A("EventManagerPlugins");
      let va = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(ya), F(we));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class zv {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = bn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Gv = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        yi = (() => {
          class e extends Gv {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(it));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Kc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Xc = /%COMP%/g,
        Zv = new A("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function Yv(e, t) {
        return t.flat(100).map((n) => n.replace(Xc, e));
      }
      function Qv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Jc = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ed(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Jv
                ? o.applyToHost(n)
                : o instanceof td && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case Ht.Emulated:
                  i = new Jv(s, a, r, this.appId, l);
                  break;
                case Ht.ShadowDom:
                  return new Lx(s, a, n, r);
                default:
                  i = new td(s, a, r, l);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(va), F(yi), F(di), F(Zv));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ed {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Kc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Xv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Xv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Kc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Kc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (rt.DashCase | rt.Important)
            ? t.style.setProperty(n, r, o & rt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & rt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Qv(r))
            : this.eventManager.addEventListener(t, n, Qv(r));
        }
      }
      function Xv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class Lx extends ed {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Yv(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class td extends ed {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = Yv(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Jv extends td {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function Fx(e) {
              return "_ngcontent-%COMP%".replace(Xc, e);
            })(s)),
            (this.hostAttr = (function Px(e) {
              return "_nghost-%COMP%".replace(Xc, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let Vx = (() => {
        class e extends zv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(it));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const e_ = ["alt", "control", "meta", "shift"],
        jx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Bx = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let $x = (() => {
        class e extends zv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => bn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              e_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = jx[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                e_.forEach((s) => {
                  s !== o && (0, Bx[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(it));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Gx = Ky(wA, "browser", [
          { provide: By, useValue: "browser" },
          {
            provide: jy,
            useValue: function Ux() {
              Qc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: it,
            useFactory: function zx() {
              return (
                (function S1(e) {
                  su = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        r_ = new A(""),
        o_ = [
          {
            provide: Qs,
            useClass: class Tx {
              addToWindow(t) {
                (de.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (de.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (de.getAllAngularRootElements = () => t.getAllRootElements()),
                  de.frameworkStabilizers || (de.frameworkStabilizers = []),
                  de.frameworkStabilizers.push((r) => {
                    const o = de.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? bn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Wy, useClass: Cc, deps: [we, wc, Qs] },
          { provide: Cc, useClass: Cc, deps: [we, wc, Qs] },
        ],
        i_ = [
          { provide: gu, useValue: "root" },
          {
            provide: Or,
            useFactory: function Hx() {
              return new Or();
            },
            deps: [],
          },
          { provide: ya, useClass: Vx, multi: !0, deps: [it, we, By] },
          { provide: ya, useClass: $x, multi: !0, deps: [it] },
          { provide: Jc, useClass: Jc, deps: [va, yi, di, Zv] },
          { provide: kp, useExisting: Jc },
          { provide: Gv, useExisting: yi },
          { provide: yi, useClass: yi, deps: [it] },
          { provide: va, useClass: va, deps: [ya, we] },
          { provide: class KT {}, useClass: xx, deps: [] },
          [],
        ];
      let Wx = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: di, useValue: n.appId },
                  { provide: Hv, useExisting: di },
                  Ax,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(r_, 12));
            }),
            (e.ɵmod = zt({ type: e })),
            (e.ɵinj = Tt({ providers: [...i_, ...o_], imports: [zT, EA] })),
            e
          );
        })(),
        s_ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(it));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Zx() {
                        return new s_(F(it));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      const { isArray: eN } = Array,
        { getPrototypeOf: tN, prototype: nN, keys: rN } = Object;
      function u_(e) {
        if (1 === e.length) {
          const t = e[0];
          if (eN(t)) return { args: t, keys: null };
          if (
            (function oN(e) {
              return e && "object" == typeof e && tN(e) === nN;
            })(t)
          ) {
            const n = rN(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: iN } = Array;
      function c_(e) {
        return Y((t) =>
          (function sN(e, t) {
            return iN(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function d_(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      let f_ = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(vn), C(pt));
            }),
            (e.ɵdir = V({ type: e })),
            e
          );
        })(),
        sr = (() => {
          class e extends f_ {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Be(e)))(r || e);
              };
            })()),
            (e.ɵdir = V({ type: e, features: [re] })),
            e
          );
        })();
      const nn = new A("NgValueAccessor"),
        uN = { provide: nn, useExisting: ue(() => _a), multi: !0 },
        dN = new A("CompositionEventMode");
      let _a = (() => {
        class e extends f_ {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function cN() {
                  const e = bn() ? bn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(vn), C(pt), C(dN, 8));
          }),
          (e.ɵdir = V({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                X("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ge([uN]), re],
          })),
          e
        );
      })();
      const fN = !1,
        qe = new A("NgValidators"),
        kn = new A("NgAsyncValidators");
      function E_(e) {
        return null != e;
      }
      function b_(e) {
        const t = Qo(e) ? Ie(e) : e;
        if (fN && !Uu(t)) {
          let n = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (n +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new E(-1101, n))
          );
        }
        return t;
      }
      function M_(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function S_(e, t) {
        return t.map((n) => n(e));
      }
      function I_(e) {
        return e.map((t) =>
          (function pN(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function od(e) {
        return null != e
          ? (function A_(e) {
              if (!e) return null;
              const t = e.filter(E_);
              return 0 == t.length
                ? null
                : function (n) {
                    return M_(S_(n, t));
                  };
            })(I_(e))
          : null;
      }
      function id(e) {
        return null != e
          ? (function T_(e) {
              if (!e) return null;
              const t = e.filter(E_);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function aN(...e) {
                      const t = If(e),
                        { args: n, keys: r } = u_(e),
                        o = new Se((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let l = s,
                            u = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            _t(n[c]).subscribe(
                              Ne(
                                i,
                                (f) => {
                                  d || ((d = !0), u--), (a[c] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (u || i.next(r ? d_(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(c_(t)) : o;
                    })(S_(n, t).map(b_)).pipe(Y(M_));
                  };
            })(I_(e))
          : null;
      }
      function x_(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function sd(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Ca(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function O_(e, t) {
        const n = sd(t);
        return (
          sd(e).forEach((o) => {
            Ca(n, o) || n.push(o);
          }),
          n
        );
      }
      function F_(e, t) {
        return sd(t).filter((n) => !Ca(e, n));
      }
      class P_ {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = od(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = id(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class et extends P_ {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Ln extends P_ {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class k_ {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let L_ = (() => {
        class e extends k_ {
          constructor(n) {
            super(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(Ln, 2));
          }),
          (e.ɵdir = V({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (n, r) {
              2 & n &&
                qr("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                  "ng-pristine",
                  r.isPristine
                )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                  "ng-invalid",
                  r.isInvalid
                )("ng-pending", r.isPending);
            },
            features: [re],
          })),
          e
        );
      })();
      const vi = "VALID",
        Ea = "INVALID",
        to = "PENDING",
        _i = "DISABLED";
      function ba(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class $_ {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === vi;
        }
        get invalid() {
          return this.status === Ea;
        }
        get pending() {
          return this.status == to;
        }
        get disabled() {
          return this.status === _i;
        }
        get enabled() {
          return this.status !== _i;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(O_(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(O_(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(F_(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(F_(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Ca(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Ca(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = to),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = _i),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = vi),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === vi || this.status === to) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? _i : vi;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = to), (this._hasOwnPendingAsyncValidator = !0);
            const n = b_(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new me()), (this.statusChanges = new me());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? _i
            : this.errors
            ? Ea
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(to)
            ? to
            : this._anyControlsHaveStatus(Ea)
            ? Ea
            : vi;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          ba(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function wN(e) {
              return Array.isArray(e) ? od(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function EN(e) {
              return Array.isArray(e) ? id(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      const no = new A("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Ma,
        }),
        Ma = "always";
      function Di(e, t, n = Ma) {
        (function hd(e, t) {
          const n = (function N_(e) {
            return e._rawValidators;
          })(e);
          null !== t.validator
            ? e.setValidators(x_(n, t.validator))
            : "function" == typeof n && e.setValidators([n]);
          const r = (function R_(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== t.asyncValidator
            ? e.setAsyncValidators(x_(r, t.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          Aa(t._rawValidators, o), Aa(t._rawAsyncValidators, o);
        })(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function SN(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && U_(e, t);
            });
          })(e, t),
          (function AN(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function IN(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && U_(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function MN(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Aa(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function U_(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function G_(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function W_(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const q_ = class extends $_ {
          constructor(t = null, n, r) {
            super(
              (function cd(e) {
                return (ba(e) ? e.validators : e) || null;
              })(n),
              (function dd(e, t) {
                return (ba(t) ? t.asyncValidators : e) || null;
              })(r, n)
            ),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              ba(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = W_(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            G_(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            G_(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            W_(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        kN = { provide: Ln, useExisting: ue(() => vd) },
        Q_ = (() => Promise.resolve())();
      let vd = (() => {
          class e extends Ln {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new q_()),
                (this._registered = !1),
                (this.update = new me()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function md(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === _a
                        ? (n = i)
                        : (function NN(e) {
                            return Object.getPrototypeOf(e.constructor) === sr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function gd(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Di(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              Q_.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function eo(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              Q_.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function Sa(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                C(et, 9),
                C(qe, 10),
                C(kn, 10),
                C(nn, 10),
                C(Js, 8),
                C(no, 8)
              );
            }),
            (e.ɵdir = V({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ge([kN]), re, ct],
            })),
            e
          );
        })(),
        X_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = zt({ type: e })),
            (e.ɵinj = Tt({})),
            e
          );
        })(),
        aR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = zt({ type: e })),
            (e.ɵinj = Tt({ imports: [X_] })),
            e
          );
        })(),
        uR = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: no, useValue: n.callSetDisabledState ?? Ma },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = zt({ type: e })),
            (e.ɵinj = Tt({ imports: [aR] })),
            e
          );
        })();
      function N(...e) {
        return Ie(e, yo(e));
      }
      class Bt extends an {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const xa = po(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function mD(...e) {
        const t = yo(e),
          n = If(e),
          { args: r, keys: o } = u_(e);
        if (0 === r.length) return Ie([], t);
        const i = new Se(
          (function cR(e, t, n = Wn) {
            return (r) => {
              yD(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    yD(
                      t,
                      () => {
                        const u = Ie(e[l], t);
                        let c = !1;
                        u.subscribe(
                          Ne(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => d_(o, s) : Wn)
        );
        return n ? i.pipe(c_(n)) : i;
      }
      function yD(e, t, n) {
        e ? ln(n, e, t) : t();
      }
      function Md(...e) {
        return (function dR() {
          return fr(1);
        })()(Ie(e, yo(e)));
      }
      function vD(e) {
        return new Se((t) => {
          _t(e()).subscribe(t);
        });
      }
      function wi(e, t) {
        const n = ae(e) ? e : () => e,
          r = (o) => o.error(n());
        return new Se(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Sd() {
        return Pe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ne(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class _D extends Se {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            hf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new vt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ne(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = vt.EMPTY));
          }
          return t;
        }
        refCount() {
          return Sd()(this);
        }
      }
      function rn(e, t) {
        return Pe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ne(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                _t(e(l, c)).subscribe(
                  (o = Ne(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ei(e) {
        return e <= 0
          ? () => $t
          : Pe((t, n) => {
              let r = 0;
              t.subscribe(
                Ne(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Vn(e, t) {
        return Pe((n, r) => {
          let o = 0;
          n.subscribe(Ne(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Na(e) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Ne(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function DD(e = hR) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Ne(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function hR() {
        return new xa();
      }
      function jn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Vn((o, i) => e(o, i, r)) : Wn,
            Ei(1),
            n ? Na(t) : DD(() => new xa())
          );
      }
      function lr(e, t) {
        return ae(t) ? Le(e, t, 1) : Le(e, 1);
      }
      function Ze(e, t, n) {
        const r = ae(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Pe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ne(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Wn;
      }
      function Bn(e) {
        return Pe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ne(n, void 0, void 0, (s) => {
              (i = _t(e(s, Bn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function CD(e, t) {
        return Pe(
          (function pR(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                l = t,
                u = 0;
              i.subscribe(
                Ne(
                  s,
                  (c) => {
                    const d = u++;
                    (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
                  },
                  o &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function Id(e) {
        return e <= 0
          ? () => $t
          : Pe((t, n) => {
              let r = [];
              t.subscribe(
                Ne(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function wD(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Vn((o, i) => e(o, i, r)) : Wn,
            Id(1),
            n ? Na(t) : DD(() => new xa())
          );
      }
      function Ad(e) {
        return Pe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const U = "primary",
        bi = Symbol("RouteTitle");
      class yR {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ro(e) {
        return new yR(e);
      }
      function vR(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function on(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !ED(e[o], t[o]))) return !1;
        return !0;
      }
      function ED(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function bD(e) {
        return Array.prototype.concat.apply([], e);
      }
      function MD(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function $e(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function $n(e) {
        return Uu(e) ? e : Qo(e) ? Ie(Promise.resolve(e)) : N(e);
      }
      const Ra = !1,
        DR = {
          exact: function AD(e, t, n) {
            if (
              !ur(e.segments, t.segments) ||
              !Oa(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !AD(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: TD,
        },
        SD = {
          exact: function CR(e, t) {
            return on(e, t);
          },
          subset: function wR(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => ED(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function ID(e, t, n) {
        return (
          DR[n.paths](e.root, t.root, n.matrixParams) &&
          SD[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function TD(e, t, n) {
        return xD(e, t, t.segments, n);
      }
      function xD(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!ur(o, n) || t.hasChildren() || !Oa(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!ur(e.segments, n) || !Oa(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !TD(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(ur(e.segments, o) && Oa(e.segments, o, r) && e.children[U]) &&
            xD(e.children[U], t, i, r)
          );
        }
      }
      function Oa(e, t, n) {
        return t.every((r, o) => SD[n](e[o].parameters, r.parameters));
      }
      class Un {
        constructor(t = new W([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ro(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return MR.serialize(this);
        }
      }
      class W {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            $e(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Fa(this);
        }
      }
      class Mi {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ro(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return OD(this);
        }
      }
      function ur(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Si = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return new Td();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Td {
        parse(t) {
          const n = new FR(t);
          return new Un(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Ii(t.root, !0)}`,
            r = (function AR(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Pa(n)}=${Pa(o)}`).join("&")
                    : `${Pa(n)}=${Pa(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function SR(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const MR = new Td();
      function Fa(e) {
        return e.segments.map((t) => OD(t)).join("/");
      }
      function Ii(e, t) {
        if (!e.hasChildren()) return Fa(e);
        if (t) {
          const n = e.children[U] ? Ii(e.children[U], !1) : "",
            r = [];
          return (
            $e(e.children, (o, i) => {
              i !== U && r.push(`${i}:${Ii(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function bR(e, t) {
            let n = [];
            return (
              $e(e.children, (r, o) => {
                o === U && (n = n.concat(t(r, o)));
              }),
              $e(e.children, (r, o) => {
                o !== U && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === U ? [Ii(e.children[U], !1)] : [`${o}:${Ii(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[U]
            ? `${Fa(e)}/${n[0]}`
            : `${Fa(e)}/(${n.join("//")})`;
        }
      }
      function ND(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Pa(e) {
        return ND(e).replace(/%3B/gi, ";");
      }
      function xd(e) {
        return ND(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ka(e) {
        return decodeURIComponent(e);
      }
      function RD(e) {
        return ka(e.replace(/\+/g, "%20"));
      }
      function OD(e) {
        return `${xd(e.path)}${(function IR(e) {
          return Object.keys(e)
            .map((t) => `;${xd(t)}=${xd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const TR = /^[^\/()?;=#]+/;
      function La(e) {
        const t = e.match(TR);
        return t ? t[0] : "";
      }
      const xR = /^[^=?&#]+/,
        RR = /^[^&#]+/;
      class FR {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new W([], {})
              : new W([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[U] = new W(t, n)),
            r
          );
        }
        parseSegment() {
          const t = La(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new E(4009, Ra);
          return this.capture(t), new Mi(ka(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = La(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = La(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[ka(n)] = ka(r);
        }
        parseQueryParam(t) {
          const n = (function NR(e) {
            const t = e.match(xR);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function OR(e) {
              const t = e.match(RR);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = RD(n),
            i = RD(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = La(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new E(4010, Ra);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = U);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[U] : new W([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new E(4011, Ra);
        }
      }
      function Nd(e) {
        return e.segments.length > 0 ? new W([], { [U]: e }) : e;
      }
      function Va(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Va(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function PR(e) {
          if (1 === e.numberOfChildren && e.children[U]) {
            const t = e.children[U];
            return new W(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new W(e.segments, t));
      }
      function cr(e) {
        return e instanceof Un;
      }
      const Rd = !1;
      function kR(e, t, n, r, o) {
        if (0 === n.length) return oo(t.root, t.root, t.root, r, o);
        const i = (function VD(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new LD(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  $e(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new LD(n, t, r);
        })(n);
        return i.toRoot()
          ? oo(t.root, t.root, new W([], {}), r, o)
          : (function s(l) {
              const u = (function VR(e, t, n, r) {
                  if (e.isAbsolute) return new io(t.root, !0, 0);
                  if (-1 === r) return new io(n, n === t.root, 0);
                  return (function jD(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new E(4005, Rd && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new io(r, !1, o - i);
                  })(n, r + (Ai(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? so(u.segmentGroup, u.index, i.commands)
                  : Od(u.segmentGroup, u.index, i.commands);
              return oo(t.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Ai(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ti(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function oo(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          $e(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : kD(e, t, n));
        const a = Nd(Va(s));
        return new Un(a, i, o);
      }
      function kD(e, t, n) {
        const r = {};
        return (
          $e(e.children, (o, i) => {
            r[i] = o === t ? n : kD(o, t, n);
          }),
          new W(e.segments, r)
        );
      }
      class LD {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Ai(r[0]))
          )
            throw new E(
              4003,
              Rd && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Ti);
          if (o && o !== MD(r))
            throw new E(4004, Rd && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class io {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Od(e, t, n) {
        if (
          (e || (e = new W([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return so(e, t, n);
        const r = (function BR(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Ti(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!$D(l, u, s)) return i;
                r += 2;
              } else {
                if (!$D(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new W(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[U] = new W(e.segments.slice(r.pathIndex), e.children)),
            so(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new W(e.segments, {})
          : r.match && !e.hasChildren()
          ? Fd(e, t, n)
          : r.match
          ? so(e, 0, o)
          : Fd(e, t, n);
      }
      function so(e, t, n) {
        if (0 === n.length) return new W(e.segments, {});
        {
          const r = (function jR(e) {
              return Ti(e[0]) ? e[0].outlets : { [U]: e };
            })(n),
            o = {};
          return !r[U] &&
            e.children[U] &&
            1 === e.numberOfChildren &&
            0 === e.children[U].segments.length
            ? so(e.children[U], t, n)
            : ($e(r, (i, s) => {
                "string" == typeof i && (i = [i]),
                  null !== i && (o[s] = Od(e.children[s], t, i));
              }),
              $e(e.children, (i, s) => {
                void 0 === r[s] && (o[s] = i);
              }),
              new W(e.segments, o));
        }
      }
      function Fd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Ti(i)) {
            const l = $R(i.outlets);
            return new W(r, l);
          }
          if (0 === o && Ai(n[0])) {
            r.push(new Mi(e.segments[t].path, BD(n[0]))), o++;
            continue;
          }
          const s = Ti(i) ? i.outlets[U] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Ai(a)
            ? (r.push(new Mi(s, BD(a))), (o += 2))
            : (r.push(new Mi(s, {})), o++);
        }
        return new W(r, {});
      }
      function $R(e) {
        const t = {};
        return (
          $e(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Fd(new W([], {}), 0, n));
          }),
          t
        );
      }
      function BD(e) {
        const t = {};
        return $e(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function $D(e, t, n) {
        return e == n.path && on(t, n.parameters);
      }
      const xi = "imperative";
      class sn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Pd extends sn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class dr extends sn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ja extends sn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ba extends sn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class kd extends sn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class UR extends sn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class HR extends sn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class zR extends sn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class GR extends sn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class WR extends sn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class qR {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class ZR {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class YR {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class QR {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class KR {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class XR {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class UD {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let tO = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return kR(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        rO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (t) {
                return tO.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class HD {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Ld(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Ld(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Vd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Vd(t, this._root).map((n) => n.value);
        }
      }
      function Ld(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Ld(e, n);
          if (r) return r;
        }
        return null;
      }
      function Vd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Vd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class In {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ao(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class zD extends HD {
        constructor(t, n) {
          super(t), (this.snapshot = n), jd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function GD(e, t) {
        const n = (function oO(e, t) {
            const s = new $a([], {}, {}, "", {}, U, t, null, e.root, -1, {});
            return new qD("", new In(s, []));
          })(e, t),
          r = new Bt([new Mi("", {})]),
          o = new Bt({}),
          i = new Bt({}),
          s = new Bt({}),
          a = new Bt(""),
          l = new lo(r, o, s, a, i, U, t, n.root);
        return (l.snapshot = n.root), new zD(new In(l, []), n);
      }
      class lo {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(Y((u) => u[bi])) ?? N(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Y((t) => ro(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Y((t) => ro(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function WD(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function iO(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class $a {
        get title() {
          return this.data?.[bi];
        }
        constructor(t, n, r, o, i, s, a, l, u, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ro(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ro(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class qD extends HD {
        constructor(t, n) {
          super(n), (this.url = t), jd(this, n);
        }
        toString() {
          return ZD(this._root);
        }
      }
      function jd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => jd(e, n));
      }
      function ZD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(ZD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Bd(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            on(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            on(t.params, n.params) || e.params.next(n.params),
            (function _R(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!on(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            on(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function $d(e, t) {
        const n =
          on(e.params, t.params) &&
          (function ER(e, t) {
            return (
              ur(e, t) && e.every((n, r) => on(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || $d(e.parent, t.parent))
        );
      }
      function Ni(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function aO(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ni(e, r, o);
              return Ni(e, r);
            });
          })(e, t, n);
          return new In(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ni(e, a))),
                s
              );
            }
          }
          const r = (function lO(e) {
              return new lo(
                new Bt(e.url),
                new Bt(e.params),
                new Bt(e.queryParams),
                new Bt(e.fragment),
                new Bt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ni(e, i));
          return new In(r, o);
        }
      }
      const Ud = "ngNavigationCancelingError";
      function YD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = cr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = QD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function QD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Ud] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function KD(e) {
        return XD(e) && cr(e.url);
      }
      function XD(e) {
        return e && e[Ud];
      }
      class uO {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ri()),
            (this.attachRef = null);
        }
      }
      let Ri = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new uO()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ua = !1;
      let Hd = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = U),
              (this.activateEvents = new me()),
              (this.deactivateEvents = new me()),
              (this.attachEvents = new me()),
              (this.detachEvents = new me()),
              (this.parentContexts = Q(Ri)),
              (this.location = Q(kt)),
              (this.changeDetector = Q(Js)),
              (this.environmentInjector = Q(yn));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new E(4012, Ua);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new E(4012, Ua);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new E(4012, Ua);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new E(4013, Ua);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new cO(n, a, o.injector);
            if (
              r &&
              (function dO(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = V({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [ct],
          })),
          e
        );
      })();
      class cO {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === lo
            ? this.route
            : t === Ri
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let zd = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Jm],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && T(0, "router-outlet");
            },
            dependencies: [Hd],
            encapsulation: 2,
          })),
          e
        );
      })();
      function JD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Hs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Wd(e) {
        const t = e.children && e.children.map(Wd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== U &&
            (n.component = zd),
          n
        );
      }
      function At(e) {
        return e.outlet || U;
      }
      function eC(e, t) {
        const n = e.filter((r) => At(r) === t);
        return n.push(...e.filter((r) => At(r) !== t)), n;
      }
      function Oi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class mO {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Bd(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = ao(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            $e(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = ao(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = ao(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = ao(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new XR(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new QR(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Bd(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Bd(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Oi(o.snapshot),
                l = a?.get(Uo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class tC {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ha {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function yO(e, t, n) {
        const r = e._root;
        return Fi(r, t ? t._root : null, n, [r.value]);
      }
      function uo(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function C0(e) {
              return null !== Gi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Fi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = ao(t);
        return (
          e.children.forEach((s) => {
            (function _O(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function DO(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !ur(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !ur(e.url, t.url) || !on(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !$d(e, t) || !on(e.queryParams, t.queryParams);
                    default:
                      return !$d(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new tC(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Fi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Ha(a.outlet.component, s));
              } else
                s && Pi(t, a, o),
                  o.canActivateChecks.push(new tC(r)),
                  Fi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          $e(i, (s, a) => Pi(s, n.getContext(a), o)),
          o
        );
      }
      function Pi(e, t, n) {
        const r = ao(e),
          o = e.value;
        $e(r, (i, s) => {
          Pi(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Ha(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function ki(e) {
        return "function" == typeof e;
      }
      function qd(e) {
        return e instanceof xa || "EmptyError" === e?.name;
      }
      const za = Symbol("INITIAL_VALUE");
      function co() {
        return rn((e) =>
          mD(
            e.map((t) =>
              t.pipe(
                Ei(1),
                (function fR(...e) {
                  const t = yo(e);
                  return Pe((n, r) => {
                    (t ? Md(e, n, t) : Md(e, n)).subscribe(r);
                  });
                })(za)
              )
            )
          ).pipe(
            Y((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === za) return za;
                  if (!1 === n || n instanceof Un) return n;
                }
              return !0;
            }),
            Vn((t) => t !== za),
            Ei(1)
          )
        );
      }
      function nC(e) {
        return (function jC(...e) {
          return cf(e);
        })(
          Ze((t) => {
            if (cr(t)) throw YD(0, t);
          }),
          Y((t) => !0 === t)
        );
      }
      const Zd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function rC(e, t, n, r, o) {
        const i = Yd(e, t, n);
        return i.matched
          ? (function LO(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? N(
                    o.map((s) => {
                      const a = uo(s, e);
                      return $n(
                        (function SO(e) {
                          return e && ki(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(co(), nC())
                : N(!0);
            })((r = JD(t, r)), t, n).pipe(Y((s) => (!0 === s ? i : { ...Zd })))
          : N(i);
      }
      function Yd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Zd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || vR)(n, e, t);
        if (!o) return { ...Zd };
        const i = {};
        $e(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Ga(e, t, n, r) {
        if (
          n.length > 0 &&
          (function BO(e, t, n) {
            return n.some((r) => Wa(e, t, r) && At(r) !== U);
          })(e, n, r)
        ) {
          const i = new W(
            t,
            (function jO(e, t, n, r) {
              const o = {};
              (o[U] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && At(i) !== U) {
                  const s = new W([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[At(i)] = s);
                }
              return o;
            })(e, t, r, new W(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function $O(e, t, n) {
            return n.some((r) => Wa(e, t, r));
          })(e, n, r)
        ) {
          const i = new W(
            e.segments,
            (function VO(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (Wa(e, n, s) && !o[At(s)]) {
                  const a = new W([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[At(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new W(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Wa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function oC(e, t, n, r) {
        return (
          !!(At(e) === r || (r !== U && Wa(t, n, e))) &&
          ("**" === e.path || Yd(t, e, n).matched)
        );
      }
      function iC(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const qa = !1;
      class Za {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class sC {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Li(e) {
        return wi(new Za(e));
      }
      function aC(e) {
        return wi(new sC(e));
      }
      class GO {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Ga(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new W(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, U)
            .pipe(
              Y((i) =>
                this.createUrlTree(
                  Va(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Bn((i) => {
                if (i instanceof sC)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Za ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, U)
            .pipe(
              Y((o) => this.createUrlTree(Va(o), t.queryParams, t.fragment))
            )
            .pipe(
              Bn((o) => {
                throw o instanceof Za ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new E(4002, qa);
        }
        createUrlTree(t, n, r) {
          const o = Nd(t);
          return new Un(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(Y((i) => new W([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ie(o).pipe(
            lr((i) => {
              const s = r.children[i],
                a = eC(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                Y((l) => ({ segment: l, outlet: i }))
              );
            }),
            CD((i, s) => ((i[s.outlet] = s.segment), i), {}),
            wD()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Ie(r).pipe(
            lr((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                Bn((u) => {
                  if (u instanceof Za) return N(null);
                  throw u;
                })
              )
            ),
            jn((a) => !!a),
            Bn((a, l) => {
              if (qd(a)) return iC(n, o, i) ? N(new W([], {})) : Li(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return oC(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Li(n)
            : Li(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? aC(i)
            : this.lineralizeSegments(r, i).pipe(
                Le((s) => {
                  const a = new W(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Yd(n, o, i);
          if (!a) return Li(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? aC(d)
            : this.lineralizeSegments(o, d).pipe(
                Le((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = JD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? N({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    Y(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new W(o, {})
                      )
                    )
                  )
                : N(new W(o, {})))
            : rC(n, r, o, t).pipe(
                rn(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Le((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Ga(
                                n,
                                a,
                                l,
                                f
                              ),
                              y = new W(h.segments, h.children);
                            if (0 === p.length && y.hasChildren())
                              return this.expandChildren(d, f, y).pipe(
                                Y((_) => new W(a, _))
                              );
                            if (0 === f.length && 0 === p.length)
                              return N(new W(a, {}));
                            const v = At(r) === i;
                            return this.expandSegment(
                              d,
                              y,
                              f,
                              p,
                              v ? U : i,
                              !0
                            ).pipe(
                              Y((S) => new W(a.concat(S.segments), S.children))
                            );
                          })
                        )
                      : Li(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? N({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? N({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function kO(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? N(!0)
                    : N(
                        o.map((s) => {
                          const a = uo(s, e);
                          return $n(
                            (function wO(e) {
                              return e && ki(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(co(), nC());
                })(t, n, r).pipe(
                  Le((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ze((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function HO(e) {
                          return wi(QD(qa, 3));
                        })()
                  )
                )
            : N({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return N(r);
            if (o.numberOfChildren > 1 || !o.children[U])
              return t.redirectTo, wi(new E(4e3, qa));
            o = o.children[U];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Un(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            $e(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            $e(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new W(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new E(4001, qa);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class qO {}
      class QO {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Ga(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            U
          ).pipe(
            Y((n) => {
              if (null === n) return null;
              const r = new $a(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  U,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new In(r, n),
                i = new qD(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = WD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return Ie(Object.keys(r.children)).pipe(
            lr((o) => {
              const i = r.children[o],
                s = eC(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            CD((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function gR(e, t = !1) {
              return Pe((n, r) => {
                let o = 0;
                n.subscribe(
                  Ne(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Na(null),
            wD(),
            Y((o) => {
              if (null === o) return null;
              const i = uC(o);
              return (
                (function KO(e) {
                  e.sort((t, n) =>
                    t.value.outlet === U
                      ? -1
                      : n.value.outlet === U
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return Ie(n).pipe(
            lr((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            jn((s) => !!s),
            Bn((s) => {
              if (qd(s)) return iC(r, o, i) ? N([]) : N(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !oC(n, r, o, i)) return N(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? MD(o).parameters : {},
              l = dC(r) + o.length;
            s = N({
              snapshot: new $a(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                fC(n),
                At(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                cC(r),
                l,
                hC(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = rC(r, n, o, t).pipe(
              Y(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = dC(r) + l.length;
                  return {
                    snapshot: new $a(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      fC(n),
                      At(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      cC(r),
                      d,
                      hC(n)
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            rn((a) => {
              if (null === a) return N(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function XO(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Ga(
                  r,
                  u,
                  c,
                  f.filter((v) => void 0 === v.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  Y((v) => (null === v ? null : [new In(l, v)]))
                );
              if (0 === f.length && 0 === p.length) return N([new In(l, [])]);
              const y = At(n) === i;
              return this.processSegment(d, f, h, p, y ? U : i).pipe(
                Y((v) => (null === v ? null : [new In(l, v)]))
              );
            })
          );
        }
      }
      function JO(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function uC(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!JO(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = uC(r.children);
          t.push(new In(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function cC(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function dC(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function fC(e) {
        return e.data || {};
      }
      function hC(e) {
        return e.resolve || {};
      }
      function pC(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Qd(e) {
        return rn((t) => {
          const n = e(t);
          return n ? Ie(n).pipe(Y(() => t)) : N(t);
        });
      }
      const fo = new A("ROUTES");
      let Kd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = Q($y));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return N(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = $n(n.loadComponent()).pipe(
                Y(mC),
                Ze((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Ad(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new _D(r, () => new an()).pipe(Sd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return N({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                Y((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = bD(l.get(fo, [], O.Self | O.Optional))));
                  return { routes: u.map(Wd), injector: l };
                }),
                Ad(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new _D(i, () => new an()).pipe(Sd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return $n(n()).pipe(
              Y(mC),
              Le((r) =>
                r instanceof Km || Array.isArray(r)
                  ? N(r)
                  : Ie(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function mC(e) {
        return (function aF(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Qa = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new an()),
              (this.configLoader = Q(Kd)),
              (this.environmentInjector = Q(yn)),
              (this.urlSerializer = Q(Si)),
              (this.rootContexts = Q(Ri)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => N(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new ZR(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new qR(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Bt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: xi,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Vn((r) => 0 !== r.id),
                Y((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                rn((r) => {
                  let o = !1,
                    i = !1;
                  return N(r).pipe(
                    Ze((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    rn((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Ba(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          yC(s.source) && (n.browserUrlTree = s.extractedUrl),
                          N(s).pipe(
                            rn((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Pd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? $t
                                  : Promise.resolve(c)
                              );
                            }),
                            (function WO(e, t, n, r) {
                              return rn((o) =>
                                (function zO(e, t, n, r, o) {
                                  return new GO(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  Y((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Ze((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function tF(e, t, n, r, o) {
                              return Le((i) =>
                                (function YO(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new QO(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      rn((a) =>
                                        null === a
                                          ? (function ZO(e) {
                                              return new Se((t) => t.error(e));
                                            })(new qO())
                                          : N(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(Y((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Ze((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new UR(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          y = new Pd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(y);
                        const v = GD(d, this.rootComponentType).snapshot;
                        return N(
                          (r = {
                            ...s,
                            targetSnapshot: v,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Ba(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                    }),
                    Ze((s) => {
                      const a = new HR(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    Y(
                      (s) =>
                        (r = {
                          ...s,
                          guards: yO(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function AO(e, t) {
                      return Le((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? N({ ...n, guardsResult: !0 })
                          : (function TO(e, t, n, r) {
                              return Ie(e).pipe(
                                Le((o) =>
                                  (function PO(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? N(
                                          i.map((a) => {
                                            const l = Oi(t) ?? o,
                                              u = uo(a, l);
                                            return $n(
                                              (function MO(e) {
                                                return e && ki(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    u(e, t, n, r)
                                                  )
                                            ).pipe(jn());
                                          })
                                        ).pipe(co())
                                      : N(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                jn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Le((a) =>
                                a &&
                                (function CO(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function xO(e, t, n, r) {
                                      return Ie(t).pipe(
                                        lr((o) =>
                                          Md(
                                            (function RO(e, t) {
                                              return (
                                                null !== e && t && t(new YR(e)),
                                                N(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function NO(e, t) {
                                              return (
                                                null !== e && t && t(new KR(e)),
                                                N(!0)
                                              );
                                            })(o.route, r),
                                            (function FO(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function vO(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    vD(() =>
                                                      N(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              Oi(s.node) ?? n,
                                                            c = uo(l, u);
                                                          return $n(
                                                            (function bO(e) {
                                                              return (
                                                                e &&
                                                                ki(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(jn());
                                                        })
                                                      ).pipe(co())
                                                    )
                                                  );
                                              return N(i).pipe(co());
                                            })(e, o.path, n),
                                            (function OO(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return N(!0);
                                              const o = r.map((i) =>
                                                vD(() => {
                                                  const s = Oi(t) ?? n,
                                                    a = uo(i, s);
                                                  return $n(
                                                    (function EO(e) {
                                                      return (
                                                        e && ki(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(jn());
                                                })
                                              );
                                              return N(o).pipe(co());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        jn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : N(a)
                              ),
                              Y((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Ze((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), cr(s.guardsResult))
                      )
                        throw YD(0, s.guardsResult);
                      const a = new zR(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    Vn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Qd((s) => {
                      if (s.guards.canActivateChecks.length)
                        return N(s).pipe(
                          Ze((a) => {
                            const l = new GR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          rn((a) => {
                            let l = !1;
                            return N(a).pipe(
                              (function nF(e, t) {
                                return Le((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return N(n);
                                  let i = 0;
                                  return Ie(o).pipe(
                                    lr((s) =>
                                      (function rF(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !pC(o) &&
                                            (i[bi] = o.title),
                                          (function oF(e, t, n, r) {
                                            const o = (function iF(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return N({});
                                            const i = {};
                                            return Ie(o).pipe(
                                              Le((s) =>
                                                (function sF(e, t, n, r) {
                                                  const o = Oi(t) ?? r,
                                                    i = uo(e, o);
                                                  return $n(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  jn(),
                                                  Ze((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Id(1),
                                              (function mR(e) {
                                                return Y(() => e);
                                              })(i),
                                              Bn((s) => (qd(s) ? $t : wi(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            Y(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = WD(e, n).resolve),
                                                o &&
                                                  pC(o) &&
                                                  (e.data[bi] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Ze(() => i++),
                                    Id(1),
                                    Le((s) => (i === o.length ? N(n) : $t))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ze({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Ze((a) => {
                            const l = new WR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Qd((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              Ze((c) => {
                                l.component = c;
                              }),
                              Y(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return mD(a(s.targetSnapshot.root)).pipe(Na(), Ei(1));
                    }),
                    Qd(() => this.afterPreactivation()),
                    Y((s) => {
                      const a = (function sO(e, t, n) {
                        const r = Ni(e, t._root, n ? n._root : void 0);
                        return new zD(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Ze((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      Y(
                        (r) => (
                          new mO(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Ze({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new dr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    Ad(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Bn((s) => {
                      if (((i = !0), XD(s))) {
                        KD(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new ja(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), KD(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || yC(r.source),
                            };
                          n.scheduleNavigation(l, xi, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new kd(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return $t;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new ja(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function yC(e) {
        return e !== xi;
      }
      let vC = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === U));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[bi];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return Q(lF);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        lF = (() => {
          class e extends vC {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(F(s_));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        uF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return Q(dF);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class cF {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let dF = (() => {
        class e extends cF {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = Be(e)))(r || e);
            };
          })()),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ka = new A("", { providedIn: "root", factory: () => ({}) });
      let hF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return Q(pF);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        pF = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function gF(e) {
        throw e;
      }
      function mF(e, t, n) {
        return t.parse("/");
      }
      const yF = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        vF = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let mt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = Q(HI)),
              (this.isNgZoneEnabled = !1),
              (this.options = Q(Ka, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || gF),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || mF),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = Q(hF)),
              (this.routeReuseStrategy = Q(uF)),
              (this.urlCreationStrategy = Q(rO)),
              (this.titleStrategy = Q(vC)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = bD(Q(fo, { optional: !0 }) ?? [])),
              (this.navigationTransitions = Q(Qa)),
              (this.urlSerializer = Q(Si)),
              (this.location = Q(Oc)),
              (this.isNgZoneEnabled =
                Q(we) instanceof we && we.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Un()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = GD(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = n.targetPageId);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), xi, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const l = { ...o };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (i.state = l);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(Wd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = l ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                c,
                u ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = cr(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, xi, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function _F(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n) throw new E(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...yF } : !1 === r ? { ...vF } : r), cr(n)))
              return ID(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return ID(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u, c;
            return (
              s
                ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                : (u = new Promise((d, f) => {
                    (a = d), (l = f);
                  })),
              (c =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : i.replaceUrl || i.skipLocationChange
                    ? this.browserPageId ?? 0
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: c,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  this.getCurrentNavigation()?.finalUrl) ||
              0 === o
                ? this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class _C {}
      let wF = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Vn((n) => n instanceof dr),
                lr(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Hs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Ie(o).pipe(fr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : N(null);
              const i = o.pipe(
                Le((s) =>
                  null === s
                    ? N(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ie([i, this.loader.loadComponent(r)]).pipe(fr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(mt), F($y), F(yn), F(_C), F(Kd));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ef = new A("");
      let DC = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Pd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof dr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof UD &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new UD(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function tg() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var yt = (() => (
        ((yt = yt || {})[(yt.COMPLETE = 0)] = "COMPLETE"),
        (yt[(yt.FAILED = 1)] = "FAILED"),
        (yt[(yt.REDIRECTING = 2)] = "REDIRECTING"),
        yt
      ))();
      const ho = !1;
      function Hn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const tf = new A("", { providedIn: "root", factory: () => !1 });
      function wC() {
        const e = Q(Qt);
        return (t) => {
          const n = e.get(Ks);
          if (t !== n.components[0]) return;
          const r = e.get(mt),
            o = e.get(EC);
          1 === e.get(nf) && r.initialNavigation(),
            e.get(bC, null, O.Optional)?.setUpPreloading(),
            e.get(ef, null, O.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.unsubscribe());
        };
      }
      const EC = new A(ho ? "bootstrap done indicator" : "", {
          factory: () => new an(),
        }),
        nf = new A(ho ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function IF() {
        let e = [];
        return (
          (e = ho
            ? [
                {
                  provide: Es,
                  multi: !0,
                  useFactory: () => {
                    const t = Q(mt);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function JR(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          Hn(1, e)
        );
      }
      const bC = new A(ho ? "router preloader" : "");
      function AF(e) {
        return Hn(0, [
          { provide: bC, useExisting: wF },
          { provide: _C, useExisting: e },
        ]);
      }
      const Vi = !1,
        MC = new A(
          Vi ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        TF = [
          Oc,
          { provide: Si, useClass: Td },
          mt,
          Ri,
          {
            provide: lo,
            useFactory: function CC(e) {
              return e.routerState.root;
            },
            deps: [mt],
          },
          Kd,
          Vi ? { provide: tf, useValue: !0 } : [],
        ];
      function xF() {
        return new Yy("Router", mt);
      }
      let SC = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                TF,
                Vi && r?.enableTracing ? IF().ɵproviders : [],
                { provide: fo, multi: !0, useValue: n },
                {
                  provide: MC,
                  useFactory: FF,
                  deps: [[mt, new Ro(), new Oo()]],
                },
                { provide: Ka, useValue: r || {} },
                r?.useHash
                  ? { provide: ir, useClass: xA }
                  : { provide: ir, useClass: vv },
                {
                  provide: ef,
                  useFactory: () => {
                    const e = Q(ZT),
                      t = Q(we),
                      n = Q(Ka),
                      r = Q(Qa),
                      o = Q(Si);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new DC(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? AF(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Yy, multi: !0, useFactory: xF },
                r?.initialNavigation ? PF(r) : [],
                [
                  { provide: IC, useFactory: wC },
                  { provide: Zy, multi: !0, useExisting: IC },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: fo, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(F(MC, 8));
          }),
          (e.ɵmod = zt({ type: e })),
          (e.ɵinj = Tt({ imports: [zd] })),
          e
        );
      })();
      function FF(e) {
        if (Vi && e)
          throw new E(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function PF(e) {
        return [
          "disabled" === e.initialNavigation
            ? Hn(3, [
                {
                  provide: Zs,
                  multi: !0,
                  useFactory: () => {
                    const t = Q(mt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: nf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Hn(2, [
                { provide: nf, useValue: 0 },
                {
                  provide: Zs,
                  multi: !0,
                  deps: [Qt],
                  useFactory: (t) => {
                    const n = t.get(AA, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(mt),
                              i = t.get(EC);
                            (function EF(e, t) {
                              e.events
                                .pipe(
                                  Vn(
                                    (n) =>
                                      n instanceof dr ||
                                      n instanceof ja ||
                                      n instanceof kd ||
                                      n instanceof Ba
                                  ),
                                  Y((n) =>
                                    n instanceof dr || n instanceof Ba
                                      ? yt.COMPLETE
                                      : n instanceof ja &&
                                        (0 === n.code || 1 === n.code)
                                      ? yt.REDIRECTING
                                      : yt.FAILED
                                  ),
                                  Vn((n) => n !== yt.REDIRECTING),
                                  Ei(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Qa).afterPreactivation = () => (
                                r(!0), i.closed ? N(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const IC = new A(Vi ? "Router Initializer" : ""),
        LF = [];
      let VF = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = zt({ type: e })),
          (e.ɵinj = Tt({ imports: [SC.forRoot(LF), SC] })),
          e
        );
      })();
      const jF = [
          [["", 8, "toogle-header"]],
          [["", 8, "toogle-header"]],
          [["label"]],
          [["label"]],
          "*",
          "*",
          "*",
        ],
        BF = [
          ".toogle-header",
          ".toogle-header",
          "label",
          "label",
          "*",
          "*",
          "*",
        ];
      let AC = (() => {
        class e {
          constructor() {
            (this.checked = !1), (this.checkedChange = new me());
          }
          ngOnInit() {}
          toggle() {
            (this.checked = !this.checked),
              this.checkedChange.emit(this.checked);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-toggle"]],
            inputs: { checked: "checked" },
            outputs: { checkedChange: "checkedChange" },
            ngContentSelectors: BF,
            decls: 35,
            vars: 2,
            consts: [
              ["tabindex", "0", 1, "toggle-wrapper", 3, "click"],
              [1, "toggle"],
              [1, "toggle-label"],
              [1, "toggle-content"],
            ],
            template: function (n, r) {
              1 & n &&
                ((function Lg(e) {
                  const t = D()[ze][He];
                  if (!t.projection) {
                    const r = (t.projection = No(e ? e.length : 1, null)),
                      o = r.slice();
                    let i = t.child;
                    for (; null !== i; ) {
                      const s = e ? Xb(i, e) : 0;
                      null !== s &&
                        (o[s] ? (o[s].projectionNext = i) : (r[s] = i),
                        (o[s] = i)),
                        (i = i.next);
                    }
                  }
                })(jF),
                g(0, "header")(1, "div"),
                b(2, "header 1 -> Will be generating..."),
                m(),
                Nn(3),
                m(),
                T(4, "br"),
                g(5, "header")(6, "div"),
                b(7, "header 2"),
                m(),
                Nn(8, 1),
                m(),
                g(9, "div", 0),
                X("click", function () {
                  return r.toggle();
                }),
                T(10, "div", 1),
                m(),
                g(11, "div", 2)(12, "div"),
                b(13, "Label only 1 -> Will be generating..."),
                m(),
                Nn(14, 2),
                m(),
                T(15, "br"),
                g(16, "div", 2)(17, "div"),
                b(18, "Label only 2"),
                m(),
                Nn(19, 3),
                m(),
                T(20, "br"),
                g(21, "div", 3)(22, "div"),
                b(23, "content 0"),
                m(),
                Nn(24, 4),
                m(),
                T(25, "br"),
                g(26, "div", 3)(27, "div"),
                b(28, "content 1"),
                m(),
                Nn(29, 5),
                m(),
                T(30, "br"),
                g(31, "div", 3)(32, "div"),
                b(33, "content 2 -> Will be generating..."),
                m(),
                Nn(34, 6),
                m()),
                2 & n && (q(9), qr("checked", r.checked));
            },
            styles: [
              ".toggle-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;width:100px;height:100px;border-radius:50%;background-color:#fe4551;box-shadow:0 20px 20px #fe45514d}.toggle-wrapper[_ngcontent-%COMP%]:active{width:95px;height:95px;box-shadow:0 15px 15px #fe455180}.toggle-wrapper[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]{height:17px;width:17px}.toggle[_ngcontent-%COMP%]{transition:all .2s ease-in-out;height:20px;width:20px;background-color:transparent;border:10px solid #fff;border-radius:50%;cursor:pointer;animation:red .7s linear forwards}.toggle-wrapper.checked[_ngcontent-%COMP%]{background-color:#48e98a;box-shadow:0 20px 20px #48e98a4d}.toggle-wrapper.checked[_ngcontent-%COMP%]:active{box-shadow:0 15px 15px #48e98a80}.toggle-wrapper.checked[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]{width:0;background-color:#fff;border-color:transparent;border-radius:30px;animation:green .7s linear forwards!important}",
            ],
          })),
          e
        );
      })();
      function $F(e, t) {
        1 & e && (g(0, "div"), b(1, "You can see this 13+ film."), m());
      }
      function UF(e, t) {
        1 & e &&
          (Zo(0), g(1, "p"), b(2, "You cannot see this 13+ film."), m(), Yo());
      }
      function HF(e, t) {
        1 & e && (g(0, "div"), b(1, "You can see this 13+ film."), m());
      }
      function zF(e, t) {
        1 & e && (g(0, "p"), b(1, "You cannot see this 13+ film."), m());
      }
      function GF(e, t) {
        1 & e && (g(0, "p"), b(1, "You cannot see this 13+ film."), m());
      }
      let WF = (() => {
        class e {
          constructor() {
            this.user = { name: "Pi", age: 12 };
          }
          sayHi(n) {
            alert("Hi " + n + "! You have clicked on the button!");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-hello"]],
            decls: 19,
            vars: 11,
            consts: [
              ["type", "text", 3, "value"],
              [3, "click"],
              ["type", "text", 3, "ngModel", "ngModelChange"],
              [4, "ngIf"],
              [4, "ngIf", "ngIfElse"],
              ["noPG13", ""],
              [3, "ngIf", "ngIfElse"],
            ],
            template: function (n, r) {
              if (
                (1 & n &&
                  (g(0, "p"),
                  b(1),
                  m(),
                  g(2, "p"),
                  b(3),
                  m(),
                  g(4, "p"),
                  b(5, "Please input your name:"),
                  m(),
                  T(6, "input", 0),
                  g(7, "button", 1),
                  X("click", function () {
                    return r.sayHi(r.user.name);
                  }),
                  b(8, "Say Hi!"),
                  m(),
                  T(9, "br"),
                  g(10, "input", 2),
                  X("ngModelChange", function (i) {
                    return (r.user.name = i);
                  }),
                  m(),
                  T(11, "br"),
                  g(12, "input", 2),
                  X("ngModelChange", function (i) {
                    return (r.user.name = i);
                  }),
                  m(),
                  ke(13, $F, 2, 0, "div", 3),
                  ke(14, UF, 3, 0, "ng-container", 3),
                  ke(15, HF, 2, 0, "div", 4),
                  ke(16, zF, 2, 0, "ng-template", null, 5, Dy),
                  ke(18, GF, 2, 0, "ng-template", 6)),
                2 & n)
              ) {
                const o = en(17);
                q(1),
                  Zr("Hello ", r.user.name, "!"),
                  q(2),
                  Zr("Your age is ", r.user.age, "."),
                  q(3),
                  ie("value", r.user.name),
                  q(4),
                  ie("ngModel", r.user.name),
                  q(2),
                  ie("ngModel", r.user.name),
                  q(1),
                  ie("ngIf", r.user.age >= 13),
                  q(1),
                  ie("ngIf", r.user.age < 13),
                  q(1),
                  ie("ngIf", r.user.age >= 13)("ngIfElse", o),
                  q(3),
                  ie("ngIf", r.user.age >= 13)("ngIfElse", o);
              }
            },
            dependencies: [fa, _a, L_, vd],
          })),
          e
        );
      })();
      function qF(e, t) {
        if (
          (1 & e &&
            (g(0, "tr")(1, "td"),
            b(2),
            m(),
            g(3, "td"),
            b(4),
            m(),
            g(5, "td"),
            b(6),
            m()()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.index,
            o = t.count;
          qr("is-odd", t.odd),
            q(2),
            Zu(n.id),
            q(1),
            Xo("font-size", n.fontSize),
            q(1),
            ei("", n.firstName, " ", n.lastName, ""),
            q(2),
            ei("", r + 1, "/", o, "");
        }
      }
      function ZF(e, t) {
        if ((1 & e && (g(0, "div"), b(1), m()), 2 & e)) {
          const n = t.$implicit,
            r = t.index,
            o = t.count;
          q(1),
            Vs(
              " (",
              r,
              ")/(",
              o,
              "): ",
              n.id,
              " - ",
              n.firstName,
              " ",
              n.lastName,
              " "
            );
        }
      }
      function YF(e, t) {
        if ((1 & e && (Zo(0), g(1, "p"), b(2), m(), Yo()), 2 & e)) {
          const n = Ko(),
            r = n.index,
            o = n.count,
            i = n.$implicit;
          q(2),
            Vs(
              " (",
              r,
              ")/(",
              o,
              "): ",
              i.id,
              " - ",
              i.firstName,
              "",
              i.lastName,
              " "
            );
        }
      }
      function QF(e, t) {
        if (
          (1 & e && (g(0, "div"), ke(1, YF, 3, 5, "ng-container", 3), m()),
          2 & e)
        ) {
          const n = t.even;
          q(1), ie("ngIf", n);
        }
      }
      let KF = (() => {
        class e {
          constructor() {
            this.authors = [
              {
                id: 1,
                firstName: "Flora",
                lastName: "Twell",
                email: "ftwell0@phoca.cz",
                gender: "Female",
                ipAddress: "99.180.237.33",
                fontSize: "15px",
              },
              {
                id: 2,
                firstName: "Priscella",
                lastName: "Signe",
                email: "psigne1@berkeley.edu",
                gender: "Female",
                ipAddress: "183.243.228.65",
                fontSize: "13px",
              },
              {
                id: 3,
                firstName: "Flora",
                lastName: "Twell",
                email: "ftwell0@phoca.cz",
                gender: "Female",
                ipAddress: "99.180.237.33",
                fontSize: "12px",
              },
              {
                id: 4,
                firstName: "Priscella",
                lastName: "Signe",
                email: "psigne1@berkeley.edu",
                gender: "Female",
                ipAddress: "183.243.228.65",
                fontSize: "10px",
              },
            ];
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-bookstore"]],
            decls: 18,
            vars: 3,
            consts: [
              [3, "is-odd", 4, "ngFor", "ngForOf"],
              ["ngFor", "", 3, "ngForOf"],
              [4, "ngFor", "ngForOf"],
              [4, "ngIf"],
            ],
            template: function (n, r) {
              1 & n &&
                (g(0, "p"),
                b(
                  1,
                  "-------------------------- ngFor ------------------------"
                ),
                m(),
                g(2, "table")(3, "thead")(4, "td"),
                b(5, "Id"),
                m(),
                g(6, "td"),
                b(7, "Name"),
                m(),
                g(8, "td"),
                b(9, "Notes"),
                m()(),
                g(10, "tbody"),
                ke(11, qF, 7, 9, "tr", 0),
                m()(),
                g(12, "p"),
                b(
                  13,
                  "-------------------------- ng-template + ngForOf ------------------------"
                ),
                m(),
                ke(14, ZF, 2, 5, "ng-template", 1),
                g(15, "p"),
                b(
                  16,
                  "-------------------------- ngFor + ngIf + local variable ------------------------"
                ),
                m(),
                ke(17, QF, 2, 1, "div", 2)),
                2 & n &&
                  (q(11),
                  ie("ngForOf", r.authors),
                  q(3),
                  ie("ngForOf", r.authors),
                  q(3),
                  ie("ngForOf", r.authors));
            },
            dependencies: [zc, fa],
            styles: [
              "tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:solid 1px black}tr.is-odd[_ngcontent-%COMP%]{background-color:#7fffd4}",
            ],
          })),
          e
        );
      })();
      const TC = function (e, t) {
        return { backgroundColor: e, width: t };
      };
      let XF = (() => {
        class e {
          get progress2() {
            return this.$progess2;
          }
          set progress2(n) {
            let r = n;
            r < 0 ? (r = 0) : r > 100 && (r = 100), (this.$progess2 = r);
          }
          ngOnInit() {
            console.log("ngOnInit", this.progress);
          }
          ngOnChanges(n) {
            if (
              (console.log("ngOnChanges", n),
              "progress" in n && console.log("progress", n.progress),
              "progress" in n && "number" != typeof n.progress.currentValue)
            ) {
              const r = Number(n.progress.currentValue);
              n.progress.currentValue = Number.isNaN(r) ? 0 : r;
            }
          }
          constructor() {
            (this.backgroundColor = ""),
              (this.progressColor = ""),
              (this.progress = 0),
              (this.$progess2 = 0),
              console.log("constructor", this.progress);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-progress-bar"]],
            inputs: {
              backgroundColor: "backgroundColor",
              progressColor: "progressColor",
              progress: "progress",
              progress2: "progress2",
            },
            features: [ct],
            decls: 4,
            vars: 14,
            consts: [
              [1, "progress-bar-container"],
              [1, "progress"],
            ],
            template: function (n, r) {
              1 & n &&
                (g(0, "div", 0),
                T(1, "div", 1),
                m(),
                g(2, "div", 0),
                T(3, "div", 1),
                m()),
                2 & n &&
                  (Xo("background-color", r.backgroundColor),
                  q(1),
                  Mt(rc(8, TC, r.progressColor, r.progress + "%")),
                  q(1),
                  Xo("background-color", r.backgroundColor),
                  q(1),
                  Mt(rc(11, TC, r.progressColor, r.progress2 + "%")));
            },
            styles: [
              ".progress-bar-container[_ngcontent-%COMP%], .progress[_ngcontent-%COMP%]{height:20px}.progress-bar-container[_ngcontent-%COMP%]{width:200px}",
            ],
          })),
          e
        );
      })();
      const xC = [
        {
          id: 1,
          firstName: "P",
          lastName: "T",
          email: "p@t.c",
          gender: "Male",
          ipAddress: "1.1.1.1",
        },
        {
          id: 2,
          firstName: "P2",
          lastName: "T2",
          email: "p2@t.c",
          gender: "Female",
          ipAddress: "1.1.1.2",
        },
        {
          id: 3,
          firstName: "P3",
          lastName: "T3",
          email: "p3@t.c",
          gender: "Male",
          ipAddress: "1.1.1.3",
        },
        {
          id: 4,
          firstName: "P4",
          lastName: "T4",
          email: "p4@t.c",
          gender: "Female",
          ipAddress: "1.1.1.4",
        },
      ];
      function JF(e, t) {
        if (1 & e) {
          const n = Ps();
          g(0, "div")(1, "strong"),
            b(2),
            m(),
            g(3, "button", 1),
            X("click", function () {
              return Wt(n), qt(Ko().handleDelete());
            }),
            b(4, "x"),
            m()();
        }
        if (2 & e) {
          const n = Ko();
          q(2), ei("", n.author.firstName, " ", n.author.lastName, "");
        }
      }
      let eP = (() => {
        class e {
          constructor() {
            this.deleteAuthor = new me();
          }
          ngOnInit() {}
          handleDelete() {
            this.deleteAuthor.emit(this.author);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-author-detail"]],
            inputs: { author: "author" },
            outputs: { deleteAuthor: "deleteAuthor" },
            decls: 1,
            vars: 1,
            consts: [
              [4, "ngIf"],
              [3, "click"],
            ],
            template: function (n, r) {
              1 & n && ke(0, JF, 5, 2, "div", 0), 2 & n && ie("ngIf", r.author);
            },
            dependencies: [fa],
          })),
          e
        );
      })();
      function tP(e, t) {
        if (1 & e) {
          const n = Ps();
          g(0, "app-author-detail", 2),
            X("deleteAuthor", function (o) {
              return Wt(n), qt(Ko().handleDeleteAuthor(o));
            }),
            m();
        }
        2 & e && ie("author", t.$implicit);
      }
      let nP = (() => {
        class e {
          constructor() {
            this.authors = xC;
          }
          ngOnInit() {}
          handleDeleteAuthor(n) {
            this.authors = this.authors.filter((r) => r.id !== n.id);
          }
          reload() {
            this.authors = xC;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = fn({
            type: e,
            selectors: [["app-author-list"]],
            decls: 3,
            vars: 1,
            consts: [
              [3, "author", "deleteAuthor", 4, "ngFor", "ngForOf"],
              [3, "click"],
              [3, "author", "deleteAuthor"],
            ],
            template: function (n, r) {
              1 & n &&
                (ke(0, tP, 1, 1, "app-author-detail", 0),
                g(1, "button", 1),
                X("click", function () {
                  return r.reload();
                }),
                b(2, "Reload"),
                m()),
                2 & n && ie("ngForOf", r.authors);
            },
            dependencies: [zc, eP],
          })),
          e
        );
      })();
      const rP = ["toggleComp2"],
        oP = ["textContainer"];
      function iP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng generate component xyz"), m());
      }
      function sP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng add @angular/material"), m());
      }
      function aP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng add @angular/pwa"), m());
      }
      function lP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng add _____"), m());
      }
      function uP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng test"), m());
      }
      function cP(e, t) {
        1 & e && (g(0, "pre"), b(1, "ng build"), m());
      }
      let dP = (() => {
          class e {
            constructor() {
              (this.title = "todoapp"),
                (this.checked = !1),
                (this.questions = { question1: !1, question2: !1 });
            }
            ngAfterViewInit() {
              console.log(this.toggles);
            }
            doSomething() {
              (this.checked = !this.checked), console.log(this.checked);
            }
            toggleInside() {
              this.toggleComp.toggle();
            }
            setDivText() {
              this.textContainer.nativeElement.textContent =
                "New" === this.textContainer.nativeElement.textContent
                  ? "Old"
                  : "New";
            }
            checkChanges(n) {
              console.log("checkChanges", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = fn({
              type: e,
              selectors: [["app-root"]],
              viewQuery: function (n, r) {
                if ((1 & n && (Gs(rP, 5), Gs(oP, 5), Gs(AC, 5)), 2 & n)) {
                  let o;
                  li((o = ui())) && (r.toggleComp = o.first),
                    li((o = ui())) && (r.textContainer = o.first),
                    li((o = ui())) && (r.toggles = o);
                }
              },
              decls: 212,
              vars: 15,
              consts: [
                ["role", "banner", 1, "toolbar"],
                [
                  "width",
                  "40",
                  "alt",
                  "Angular Logo",
                  "src",
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
                ],
                [1, "spacer"],
                [
                  "aria-label",
                  "Angular on twitter",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://twitter.com/angular",
                  "title",
                  "Twitter",
                ],
                [
                  "id",
                  "twitter-logo",
                  "height",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 400 400",
                ],
                ["width", "400", "height", "400", "fill", "none"],
                [
                  "d",
                  "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23",
                  "fill",
                  "#fff",
                ],
                [
                  "aria-label",
                  "Angular on YouTube",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://youtube.com/angular",
                  "title",
                  "YouTube",
                ],
                [
                  "id",
                  "youtube-logo",
                  "height",
                  "24",
                  "width",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 24 24",
                  "fill",
                  "#fff",
                ],
                ["d", "M0 0h24v24H0V0z", "fill", "none"],
                [
                  "d",
                  "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
                ],
                ["role", "main", 1, "content"],
                [1, "card", "highlight-card", "card-small"],
                [
                  "id",
                  "rocket",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "101.678",
                  "height",
                  "101.678",
                  "viewBox",
                  "0 0 101.678 101.678",
                ],
                [
                  "id",
                  "Group_83",
                  "data-name",
                  "Group 83",
                  "transform",
                  "translate(-141 -696)",
                ],
                [
                  "id",
                  "Ellipse_8",
                  "data-name",
                  "Ellipse 8",
                  "cx",
                  "50.839",
                  "cy",
                  "50.839",
                  "r",
                  "50.839",
                  "transform",
                  "translate(141 696)",
                  "fill",
                  "#dd0031",
                ],
                [
                  "id",
                  "Group_47",
                  "data-name",
                  "Group 47",
                  "transform",
                  "translate(165.185 720.185)",
                ],
                [
                  "id",
                  "Path_33",
                  "data-name",
                  "Path 33",
                  "d",
                  "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z",
                  "transform",
                  "translate(0.371 3.363)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_34",
                  "data-name",
                  "Path 34",
                  "d",
                  "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z",
                  "transform",
                  "translate(0 0.005)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "rocket-smoke",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "516.119",
                  "height",
                  "1083.632",
                  "viewBox",
                  "0 0 516.119 1083.632",
                ],
                [
                  "id",
                  "Path_40",
                  "data-name",
                  "Path 40",
                  "d",
                  "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z",
                  "transform",
                  "translate(-147.025 -140.939)",
                  "fill",
                  "#f5f5f5",
                ],
                [
                  3,
                  "backgroundColor",
                  "progressColor",
                  "progress",
                  "progress2",
                ],
                [3, "checked", "checkedChange"],
                [3, "click"],
                [3, "checkedChange"],
                ["toggleComp", ""],
                ["toggleComp2", ""],
                ["textContainer", ""],
                [1, "toogle-header"],
                ["ngProjectAs", "label", 5, ["label"]],
                [1, "card-container"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/tutorial",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24",
                  "height",
                  "24",
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "material-icons",
                ],
                [
                  "d",
                  "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
                ],
                ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/cli",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://material.angular.io",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.813",
                  "height",
                  "23.453",
                  "viewBox",
                  "0 0 179.2 192.7",
                  2,
                  "margin-right",
                  "8px",
                ],
                [
                  "fill",
                  "#ffa726",
                  "d",
                  "M89.4 0 0 32l13.5 118.4 75.9 42.3 76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#fb8c00",
                  "d",
                  "M89.4 0v192.7l76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#ffe0b2",
                  "d",
                  "m102.9 146.3-63.3-30.5 36.3-22.4 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff3e0",
                  "d",
                  "M102.9 122.8 39.6 92.2l36.3-22.3 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff",
                  "d",
                  "M102.9 99.3 39.6 68.7l36.3-22.4 63.7 30.6-36.7 22.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://blog.angular.io/",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/devtools/",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "enable-background",
                  "new 0 0 24 24",
                  "height",
                  "24px",
                  "viewBox",
                  "0 0 24 24",
                  "width",
                  "24px",
                  "fill",
                  "#000000",
                  1,
                  "material-icons",
                ],
                ["fill", "none", "height", "24", "width", "24"],
                [
                  "d",
                  "M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z",
                ],
                [
                  "points",
                  "10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44",
                ],
                ["type", "hidden"],
                ["selection", ""],
                ["tabindex", "0", 1, "card", "card-small", 3, "click"],
                ["d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
                [1, "terminal", 3, "ngSwitch"],
                [4, "ngSwitchDefault"],
                [4, "ngSwitchCase"],
                [
                  "title",
                  "Find a Local Meetup",
                  "href",
                  "https://www.meetup.com/find/?keywords=angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24.607",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 24.607 23.447",
                ],
                [
                  "id",
                  "logo--mSwarm",
                  "d",
                  "M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z",
                  "transform",
                  "translate(0 0.123)",
                  "fill",
                  "#f64060",
                ],
                [
                  "title",
                  "Join the Conversation on Discord",
                  "href",
                  "https://discord.gg/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "26",
                  "height",
                  "26",
                  "viewBox",
                  "0 0 245 240",
                ],
                [
                  "d",
                  "M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z",
                ],
                [
                  "d",
                  "M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z",
                ],
                [
                  "href",
                  "https://github.com/angular/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                ],
                [1, "github-star-badge"],
                ["d", "M0 0h24v24H0z", "fill", "none"],
                [
                  "d",
                  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
                ],
                [
                  "d",
                  "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
                  "fill",
                  "#1976d2",
                ],
                [
                  "id",
                  "clouds",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "2611.084",
                  "height",
                  "485.677",
                  "viewBox",
                  "0 0 2611.084 485.677",
                ],
                [
                  "id",
                  "Path_39",
                  "data-name",
                  "Path 39",
                  "d",
                  "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z",
                  "transform",
                  "translate(142.69 -634.312)",
                  "fill",
                  "#eee",
                ],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const o = Ps();
                  g(0, "div", 0),
                    T(1, "img", 1),
                    g(2, "span"),
                    b(3, "Welcome"),
                    m(),
                    T(4, "div", 2),
                    g(5, "a", 3),
                    he(),
                    g(6, "svg", 4),
                    T(7, "rect", 5)(8, "path", 6),
                    m()(),
                    pe(),
                    g(9, "a", 7),
                    he(),
                    g(10, "svg", 8),
                    T(11, "path", 9)(12, "path", 10),
                    m()()(),
                    pe(),
                    g(13, "div", 11)(14, "div", 12),
                    he(),
                    g(15, "svg", 13)(16, "title"),
                    b(17, "Rocket Ship"),
                    m(),
                    g(18, "g", 14),
                    T(19, "circle", 15),
                    g(20, "g", 16),
                    T(21, "path", 17)(22, "path", 18),
                    m()()(),
                    pe(),
                    g(23, "span"),
                    b(24),
                    m(),
                    he(),
                    g(25, "svg", 19)(26, "title"),
                    b(27, "Rocket Ship Smoke"),
                    m(),
                    T(28, "path", 20),
                    m()(),
                    pe(),
                    g(29, "h2"),
                    b(30, "Hello App"),
                    m(),
                    T(31, "app-hello"),
                    g(32, "h2"),
                    b(33, "Bookstore App"),
                    m(),
                    T(34, "app-bookstore"),
                    g(35, "h2"),
                    b(36, "Progress Bar"),
                    m(),
                    T(37, "app-progress-bar", 21),
                    g(38, "h2"),
                    b(39, "Component Interaction"),
                    m(),
                    T(40, "app-author-list"),
                    g(41, "h2"),
                    b(42, "Two-way binding"),
                    m(),
                    g(43, "app-toggle", 22),
                    X("checkedChange", function (s) {
                      return (r.checked = s);
                    }),
                    m(),
                    g(44, "button", 23),
                    X("click", function () {
                      return r.doSomething();
                    }),
                    b(45, "Toggle 1"),
                    m(),
                    T(46, "br"),
                    g(47, "h2"),
                    b(48, "Parent interacts with child via local variable"),
                    m(),
                    g(49, "button", 23),
                    X("click", function () {
                      return Wt(o), qt(en(52).toggle());
                    }),
                    b(50, "Toggle 2"),
                    m(),
                    g(51, "app-toggle", 24, 25),
                    X("checkedChange", function (s) {
                      return r.checkChanges(s);
                    }),
                    m(),
                    T(53, "br"),
                    g(54, "h2"),
                    b(55, "Parent class with ViewChild"),
                    m(),
                    g(56, "button", 23),
                    X("click", function () {
                      return r.toggleInside();
                    }),
                    b(57, "Toggle inside class"),
                    m(),
                    T(58, "app-toggle", null, 26),
                    g(60, "h2"),
                    b(61, "ViewChild with HTMLElement"),
                    m(),
                    g(62, "div", null, 27),
                    b(64, "Old"),
                    m(),
                    g(65, "button", 23),
                    X("click", function () {
                      return r.setDivText();
                    }),
                    b(66, "Set Text"),
                    m(),
                    g(67, "h2"),
                    b(68, "ng-content"),
                    m(),
                    g(69, "app-toggle", 22),
                    X("checkedChange", function (s) {
                      return (r.questions.question1 = s);
                    }),
                    b(70, "Question 1"),
                    m(),
                    g(71, "app-toggle", 22),
                    X("checkedChange", function (s) {
                      return (r.questions.question2 = s);
                    }),
                    b(72, "Question 2"),
                    m(),
                    g(73, "h2"),
                    b(74, "ng-content with selector"),
                    m(),
                    g(75, "app-toggle", 22),
                    X("checkedChange", function (s) {
                      return (r.questions.question1 = s);
                    }),
                    b(76, "Question 1 "),
                    g(77, "h3", 28),
                    b(78, "Header 1"),
                    m(),
                    g(79, "h3", 28),
                    b(80, "Header 2"),
                    m(),
                    g(81, "label"),
                    b(82, "Question 1"),
                    m(),
                    g(83, "span"),
                    b(84, "Some paragraph 1"),
                    m(),
                    g(85, "p"),
                    b(86, "Some paragraph 2"),
                    m(),
                    g(87, "p", 29),
                    b(88, "Will be put inside the toggle-label"),
                    m()(),
                    g(89, "h2"),
                    b(90, "Resources"),
                    m(),
                    g(91, "p"),
                    b(92, "Here are some links to help you get started:"),
                    m(),
                    g(93, "div", 30)(94, "a", 31),
                    he(),
                    g(95, "svg", 32),
                    T(96, "path", 33),
                    m(),
                    pe(),
                    g(97, "span"),
                    b(98, "Learn Angular"),
                    m(),
                    he(),
                    g(99, "svg", 32),
                    T(100, "path", 34),
                    m()(),
                    pe(),
                    g(101, "a", 35),
                    he(),
                    g(102, "svg", 32),
                    T(103, "path", 36),
                    m(),
                    pe(),
                    g(104, "span"),
                    b(105, "CLI Documentation"),
                    m(),
                    he(),
                    g(106, "svg", 32),
                    T(107, "path", 34),
                    m()(),
                    pe(),
                    g(108, "a", 37),
                    he(),
                    g(109, "svg", 38),
                    T(110, "path", 39)(111, "path", 40)(112, "path", 41)(
                      113,
                      "path",
                      42
                    )(114, "path", 43),
                    m(),
                    pe(),
                    g(115, "span"),
                    b(116, "Angular Material"),
                    m(),
                    he(),
                    g(117, "svg", 32),
                    T(118, "path", 34),
                    m()(),
                    pe(),
                    g(119, "a", 44),
                    he(),
                    g(120, "svg", 32),
                    T(121, "path", 45),
                    m(),
                    pe(),
                    g(122, "span"),
                    b(123, "Angular Blog"),
                    m(),
                    he(),
                    g(124, "svg", 32),
                    T(125, "path", 34),
                    m()(),
                    pe(),
                    g(126, "a", 46),
                    he(),
                    g(127, "svg", 47)(128, "g"),
                    T(129, "rect", 48),
                    m(),
                    g(130, "g")(131, "g"),
                    T(132, "path", 49)(133, "polygon", 50),
                    m()()(),
                    pe(),
                    g(134, "span"),
                    b(135, "Angular DevTools"),
                    m(),
                    he(),
                    g(136, "svg", 32),
                    T(137, "path", 34),
                    m()()(),
                    pe(),
                    g(138, "h2"),
                    b(139, "Next Steps"),
                    m(),
                    g(140, "p"),
                    b(141, "What do you want to do next with your app?"),
                    m(),
                    T(142, "input", 51, 52),
                    g(144, "div", 30)(145, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "component"));
                    }),
                    he(),
                    g(146, "svg", 32),
                    T(147, "path", 54),
                    m(),
                    pe(),
                    g(148, "span"),
                    b(149, "New Component"),
                    m()(),
                    g(150, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "material"));
                    }),
                    he(),
                    g(151, "svg", 32),
                    T(152, "path", 54),
                    m(),
                    pe(),
                    g(153, "span"),
                    b(154, "Angular Material"),
                    m()(),
                    g(155, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "pwa"));
                    }),
                    he(),
                    g(156, "svg", 32),
                    T(157, "path", 54),
                    m(),
                    pe(),
                    g(158, "span"),
                    b(159, "Add PWA Support"),
                    m()(),
                    g(160, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "dependency"));
                    }),
                    he(),
                    g(161, "svg", 32),
                    T(162, "path", 54),
                    m(),
                    pe(),
                    g(163, "span"),
                    b(164, "Add Dependency"),
                    m()(),
                    g(165, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "test"));
                    }),
                    he(),
                    g(166, "svg", 32),
                    T(167, "path", 54),
                    m(),
                    pe(),
                    g(168, "span"),
                    b(169, "Run and Watch Tests"),
                    m()(),
                    g(170, "button", 53),
                    X("click", function () {
                      return Wt(o), qt((en(143).value = "build"));
                    }),
                    he(),
                    g(171, "svg", 32),
                    T(172, "path", 54),
                    m(),
                    pe(),
                    g(173, "span"),
                    b(174, "Build for Production"),
                    m()()(),
                    g(175, "div", 55),
                    ke(176, iP, 2, 0, "pre", 56),
                    ke(177, sP, 2, 0, "pre", 57),
                    ke(178, aP, 2, 0, "pre", 57),
                    ke(179, lP, 2, 0, "pre", 57),
                    ke(180, uP, 2, 0, "pre", 57),
                    ke(181, cP, 2, 0, "pre", 57),
                    m(),
                    g(182, "div", 30)(183, "a", 58),
                    he(),
                    g(184, "svg", 59)(185, "title"),
                    b(186, "Meetup Logo"),
                    m(),
                    T(187, "path", 60),
                    m()(),
                    pe(),
                    g(188, "a", 61),
                    he(),
                    g(189, "svg", 62)(190, "title"),
                    b(191, "Discord Logo"),
                    m(),
                    T(192, "path", 63)(193, "path", 64),
                    m()()(),
                    pe(),
                    g(194, "footer"),
                    b(195, " Love Angular?\xa0 "),
                    g(196, "a", 65),
                    b(197, " Give our repo a star. "),
                    g(198, "div", 66),
                    he(),
                    g(199, "svg", 32),
                    T(200, "path", 67)(201, "path", 68),
                    m(),
                    b(202, " Star "),
                    m()(),
                    pe(),
                    g(203, "a", 65),
                    he(),
                    g(204, "svg", 32),
                    T(205, "path", 69)(206, "path", 67),
                    m()()(),
                    g(207, "svg", 70)(208, "title"),
                    b(209, "Gray Clouds Background"),
                    m(),
                    T(210, "path", 71),
                    m()(),
                    pe(),
                    T(211, "router-outlet");
                }
                if (2 & n) {
                  const o = en(143);
                  q(24),
                    Zr("", r.title, " app is running!"),
                    q(13),
                    ie("backgroundColor", "#2596be")(
                      "progressColor",
                      "#134b5f"
                    )("progress", 15)("progress2", 30),
                    q(6),
                    ie("checked", r.checked),
                    q(26),
                    ie("checked", r.questions.question1),
                    q(2),
                    ie("checked", r.questions.question2),
                    q(4),
                    ie("checked", r.questions.question1),
                    q(100),
                    ie("ngSwitch", o.value),
                    q(2),
                    ie("ngSwitchCase", "material"),
                    q(1),
                    ie("ngSwitchCase", "pwa"),
                    q(1),
                    ie("ngSwitchCase", "dependency"),
                    q(1),
                    ie("ngSwitchCase", "test"),
                    q(1),
                    ie("ngSwitchCase", "build");
                }
              },
              dependencies: [ha, Ov, Fv, Hd, WF, KF, XF, nP, AC],
              styles: [
                '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
              ],
            })),
            e
          );
        })(),
        fP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = zt({ type: e, bootstrap: [dP] })),
            (e.ɵinj = Tt({ imports: [Wx, VF, uR] })),
            e
          );
        })();
      Gx()
        .bootstrapModule(fP)
        .catch((e) => console.error(e));
    },
  },
  (ae) => {
    ae((ae.s = 697));
  },
]);
