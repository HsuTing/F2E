/* eslint-disable */
module.exports = {
  name: '@yarnpkg/plugin-workspace-tools',
  factory: function (require) {
    var plugin = (() => {
      var Cr = Object.create,
        ge = Object.defineProperty,
        wr = Object.defineProperties,
        Sr = Object.getOwnPropertyDescriptor,
        vr = Object.getOwnPropertyDescriptors,
        Hr = Object.getOwnPropertyNames,
        Je = Object.getOwnPropertySymbols,
        $r = Object.getPrototypeOf,
        et = Object.prototype.hasOwnProperty,
        Tr = Object.prototype.propertyIsEnumerable;
      var tt = (e, t, r) =>
          t in e
            ? ge(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r),
        N = (e, t) => {
          for (var r in t || (t = {})) et.call(t, r) && tt(e, r, t[r]);
          if (Je) for (var r of Je(t)) Tr.call(t, r) && tt(e, r, t[r]);
          return e;
        },
        Q = (e, t) => wr(e, vr(t)),
        kr = e => ge(e, '__esModule', { value: !0 });
      var q = (e, t) => () => (
          t || e((t = { exports: {} }).exports, t), t.exports
        ),
        Lr = (e, t) => {
          for (var r in t) ge(e, r, { get: t[r], enumerable: !0 });
        },
        Or = (e, t, r) => {
          if ((t && typeof t == 'object') || typeof t == 'function')
            for (let n of Hr(t))
              !et.call(e, n) &&
                n !== 'default' &&
                ge(e, n, {
                  get: () => t[n],
                  enumerable: !(r = Sr(t, n)) || r.enumerable,
                });
          return e;
        },
        Y = e =>
          Or(
            kr(
              ge(
                e != null ? Cr($r(e)) : {},
                'default',
                e && e.__esModule && 'default' in e
                  ? { get: () => e.default, enumerable: !0 }
                  : { value: e, enumerable: !0 },
              ),
            ),
            e,
          );
      var He = q(J => {
        'use strict';
        J.isInteger = e =>
          typeof e == 'number'
            ? Number.isInteger(e)
            : typeof e == 'string' && e.trim() !== ''
            ? Number.isInteger(Number(e))
            : !1;
        J.find = (e, t) => e.nodes.find(r => r.type === t);
        J.exceedsLimit = (e, t, r = 1, n) =>
          n === !1 || !J.isInteger(e) || !J.isInteger(t)
            ? !1
            : (Number(t) - Number(e)) / Number(r) >= n;
        J.escapeNode = (e, t = 0, r) => {
          let n = e.nodes[t];
          !n ||
            (((r && n.type === r) || n.type === 'open' || n.type === 'close') &&
              n.escaped !== !0 &&
              ((n.value = '\\' + n.value), (n.escaped = !0)));
        };
        J.encloseBrace = e =>
          e.type !== 'brace'
            ? !1
            : (e.commas >> (0 + e.ranges)) >> 0 == 0
            ? ((e.invalid = !0), !0)
            : !1;
        J.isInvalidBrace = e =>
          e.type !== 'brace'
            ? !1
            : e.invalid === !0 || e.dollar
            ? !0
            : (e.commas >> (0 + e.ranges)) >> 0 == 0 ||
              e.open !== !0 ||
              e.close !== !0
            ? ((e.invalid = !0), !0)
            : !1;
        J.isOpenOrClose = e =>
          e.type === 'open' || e.type === 'close'
            ? !0
            : e.open === !0 || e.close === !0;
        J.reduce = e =>
          e.reduce(
            (t, r) => (
              r.type === 'text' && t.push(r.value),
              r.type === 'range' && (r.type = 'text'),
              t
            ),
            [],
          );
        J.flatten = (...e) => {
          let t = [],
            r = n => {
              for (let s = 0; s < n.length; s++) {
                let a = n[s];
                Array.isArray(a) ? r(a, t) : a !== void 0 && t.push(a);
              }
              return t;
            };
          return r(e), t;
        };
      });
      var $e = q((as, st) => {
        'use strict';
        var at = He();
        st.exports = (e, t = {}) => {
          let r = (n, s = {}) => {
            let a = t.escapeInvalid && at.isInvalidBrace(s),
              i = n.invalid === !0 && t.escapeInvalid === !0,
              o = '';
            if (n.value)
              return (a || i) && at.isOpenOrClose(n) ? '\\' + n.value : n.value;
            if (n.value) return n.value;
            if (n.nodes) for (let h of n.nodes) o += r(h);
            return o;
          };
          return r(e);
        };
      });
      var ot = q((is, it) => {
        'use strict';
        it.exports = function (e) {
          return typeof e == 'number'
            ? e - e == 0
            : typeof e == 'string' && e.trim() !== ''
            ? Number.isFinite
              ? Number.isFinite(+e)
              : isFinite(+e)
            : !1;
        };
      });
      var At = q((os, ut) => {
        'use strict';
        var ct = ot(),
          pe = (e, t, r) => {
            if (ct(e) === !1)
              throw new TypeError(
                'toRegexRange: expected the first argument to be a number',
              );
            if (t === void 0 || e === t) return String(e);
            if (ct(t) === !1)
              throw new TypeError(
                'toRegexRange: expected the second argument to be a number.',
              );
            let n = N({ relaxZeros: !0 }, r);
            typeof n.strictZeros == 'boolean' &&
              (n.relaxZeros = n.strictZeros === !1);
            let s = String(n.relaxZeros),
              a = String(n.shorthand),
              i = String(n.capture),
              o = String(n.wrap),
              h = e + ':' + t + '=' + s + a + i + o;
            if (pe.cache.hasOwnProperty(h)) return pe.cache[h].result;
            let A = Math.min(e, t),
              f = Math.max(e, t);
            if (Math.abs(A - f) === 1) {
              let R = e + '|' + t;
              return n.capture ? `(${R})` : n.wrap === !1 ? R : `(?:${R})`;
            }
            let m = pt(e) || pt(t),
              p = { min: e, max: t, a: A, b: f },
              H = [],
              _ = [];
            if (
              (m && ((p.isPadded = m), (p.maxLen = String(p.max).length)),
              A < 0)
            ) {
              let R = f < 0 ? Math.abs(f) : 1;
              (_ = lt(R, Math.abs(A), p, n)), (A = p.a = 0);
            }
            return (
              f >= 0 && (H = lt(A, f, p, n)),
              (p.negatives = _),
              (p.positives = H),
              (p.result = Nr(_, H, n)),
              n.capture === !0
                ? (p.result = `(${p.result})`)
                : n.wrap !== !1 &&
                  H.length + _.length > 1 &&
                  (p.result = `(?:${p.result})`),
              (pe.cache[h] = p),
              p.result
            );
          };
        function Nr(e, t, r) {
          let n = Pe(e, t, '-', !1, r) || [],
            s = Pe(t, e, '', !1, r) || [],
            a = Pe(e, t, '-?', !0, r) || [];
          return n.concat(a).concat(s).join('|');
        }
        function Br(e, t) {
          let r = 1,
            n = 1,
            s = ft(e, r),
            a = new Set([t]);
          for (; e <= s && s <= t; ) a.add(s), (r += 1), (s = ft(e, r));
          for (s = ht(t + 1, n) - 1; e < s && s <= t; )
            a.add(s), (n += 1), (s = ht(t + 1, n) - 1);
          return (a = [...a]), a.sort(Ir), a;
        }
        function Dr(e, t, r) {
          if (e === t) return { pattern: e, count: [], digits: 0 };
          let n = Mr(e, t),
            s = n.length,
            a = '',
            i = 0;
          for (let o = 0; o < s; o++) {
            let [h, A] = n[o];
            h === A
              ? (a += h)
              : h !== '0' || A !== '9'
              ? (a += Pr(h, A, r))
              : i++;
          }
          return (
            i && (a += r.shorthand === !0 ? '\\d' : '[0-9]'),
            { pattern: a, count: [i], digits: s }
          );
        }
        function lt(e, t, r, n) {
          let s = Br(e, t),
            a = [],
            i = e,
            o;
          for (let h = 0; h < s.length; h++) {
            let A = s[h],
              f = Dr(String(i), String(A), n),
              m = '';
            if (!r.isPadded && o && o.pattern === f.pattern) {
              o.count.length > 1 && o.count.pop(),
                o.count.push(f.count[0]),
                (o.string = o.pattern + dt(o.count)),
                (i = A + 1);
              continue;
            }
            r.isPadded && (m = Gr(A, r, n)),
              (f.string = m + f.pattern + dt(f.count)),
              a.push(f),
              (i = A + 1),
              (o = f);
          }
          return a;
        }
        function Pe(e, t, r, n, s) {
          let a = [];
          for (let i of e) {
            let { string: o } = i;
            !n && !gt(t, 'string', o) && a.push(r + o),
              n && gt(t, 'string', o) && a.push(r + o);
          }
          return a;
        }
        function Mr(e, t) {
          let r = [];
          for (let n = 0; n < e.length; n++) r.push([e[n], t[n]]);
          return r;
        }
        function Ir(e, t) {
          return e > t ? 1 : t > e ? -1 : 0;
        }
        function gt(e, t, r) {
          return e.some(n => n[t] === r);
        }
        function ft(e, t) {
          return Number(String(e).slice(0, -t) + '9'.repeat(t));
        }
        function ht(e, t) {
          return e - (e % Math.pow(10, t));
        }
        function dt(e) {
          let [t = 0, r = ''] = e;
          return r || t > 1 ? `{${t + (r ? ',' + r : '')}}` : '';
        }
        function Pr(e, t, r) {
          return `[${e}${t - e == 1 ? '' : '-'}${t}]`;
        }
        function pt(e) {
          return /^-?(0+)\d/.test(e);
        }
        function Gr(e, t, r) {
          if (!t.isPadded) return e;
          let n = Math.abs(t.maxLen - String(e).length),
            s = r.relaxZeros !== !1;
          switch (n) {
            case 0:
              return '';
            case 1:
              return s ? '0?' : '0';
            case 2:
              return s ? '0{0,2}' : '00';
            default:
              return s ? `0{0,${n}}` : `0{${n}}`;
          }
        }
        pe.cache = {};
        pe.clearCache = () => (pe.cache = {});
        ut.exports = pe;
      });
      var Ue = q((us, mt) => {
        'use strict';
        var Ur = require('util'),
          Rt = At(),
          yt = e => e !== null && typeof e == 'object' && !Array.isArray(e),
          qr = e => t => (e === !0 ? Number(t) : String(t)),
          De = e => typeof e == 'number' || (typeof e == 'string' && e !== ''),
          me = e => Number.isInteger(+e),
          Ge = e => {
            let t = `${e}`,
              r = -1;
            if ((t[0] === '-' && (t = t.slice(1)), t === '0')) return !1;
            for (; t[++r] === '0'; );
            return r > 0;
          },
          Kr = (e, t, r) =>
            typeof e == 'string' || typeof t == 'string'
              ? !0
              : r.stringify === !0,
          Wr = (e, t, r) => {
            if (t > 0) {
              let n = e[0] === '-' ? '-' : '';
              n && (e = e.slice(1)), (e = n + e.padStart(n ? t - 1 : t, '0'));
            }
            return r === !1 ? String(e) : e;
          },
          _t = (e, t) => {
            let r = e[0] === '-' ? '-' : '';
            for (r && ((e = e.slice(1)), t--); e.length < t; ) e = '0' + e;
            return r ? '-' + e : e;
          },
          jr = (e, t) => {
            e.negatives.sort((i, o) => (i < o ? -1 : i > o ? 1 : 0)),
              e.positives.sort((i, o) => (i < o ? -1 : i > o ? 1 : 0));
            let r = t.capture ? '' : '?:',
              n = '',
              s = '',
              a;
            return (
              e.positives.length && (n = e.positives.join('|')),
              e.negatives.length && (s = `-(${r}${e.negatives.join('|')})`),
              n && s ? (a = `${n}|${s}`) : (a = n || s),
              t.wrap ? `(${r}${a})` : a
            );
          },
          Et = (e, t, r, n) => {
            if (r) return Rt(e, t, N({ wrap: !1 }, n));
            let s = String.fromCharCode(e);
            if (e === t) return s;
            let a = String.fromCharCode(t);
            return `[${s}-${a}]`;
          },
          xt = (e, t, r) => {
            if (Array.isArray(e)) {
              let n = r.wrap === !0,
                s = r.capture ? '' : '?:';
              return n ? `(${s}${e.join('|')})` : e.join('|');
            }
            return Rt(e, t, r);
          },
          bt = (...e) =>
            new RangeError('Invalid range arguments: ' + Ur.inspect(...e)),
          Ct = (e, t, r) => {
            if (r.strictRanges === !0) throw bt([e, t]);
            return [];
          },
          Fr = (e, t) => {
            if (t.strictRanges === !0)
              throw new TypeError(`Expected step "${e}" to be a number`);
            return [];
          },
          Qr = (e, t, r = 1, n = {}) => {
            let s = Number(e),
              a = Number(t);
            if (!Number.isInteger(s) || !Number.isInteger(a)) {
              if (n.strictRanges === !0) throw bt([e, t]);
              return [];
            }
            s === 0 && (s = 0), a === 0 && (a = 0);
            let i = s > a,
              o = String(e),
              h = String(t),
              A = String(r);
            r = Math.max(Math.abs(r), 1);
            let f = Ge(o) || Ge(h) || Ge(A),
              m = f ? Math.max(o.length, h.length, A.length) : 0,
              p = f === !1 && Kr(e, t, n) === !1,
              H = n.transform || qr(p);
            if (n.toRegex && r === 1) return Et(_t(e, m), _t(t, m), !0, n);
            let _ = { negatives: [], positives: [] },
              R = T => _[T < 0 ? 'negatives' : 'positives'].push(Math.abs(T)),
              b = [],
              C = 0;
            for (; i ? s >= a : s <= a; )
              n.toRegex === !0 && r > 1 ? R(s) : b.push(Wr(H(s, C), m, p)),
                (s = i ? s - r : s + r),
                C++;
            return n.toRegex === !0
              ? r > 1
                ? jr(_, n)
                : xt(b, null, N({ wrap: !1 }, n))
              : b;
          },
          Xr = (e, t, r = 1, n = {}) => {
            if ((!me(e) && e.length > 1) || (!me(t) && t.length > 1))
              return Ct(e, t, n);
            let s = n.transform || (p => String.fromCharCode(p)),
              a = `${e}`.charCodeAt(0),
              i = `${t}`.charCodeAt(0),
              o = a > i,
              h = Math.min(a, i),
              A = Math.max(a, i);
            if (n.toRegex && r === 1) return Et(h, A, !1, n);
            let f = [],
              m = 0;
            for (; o ? a >= i : a <= i; )
              f.push(s(a, m)), (a = o ? a - r : a + r), m++;
            return n.toRegex === !0 ? xt(f, null, { wrap: !1, options: n }) : f;
          },
          Te = (e, t, r, n = {}) => {
            if (t == null && De(e)) return [e];
            if (!De(e) || !De(t)) return Ct(e, t, n);
            if (typeof r == 'function') return Te(e, t, 1, { transform: r });
            if (yt(r)) return Te(e, t, 0, r);
            let s = N({}, n);
            return (
              s.capture === !0 && (s.wrap = !0),
              (r = r || s.step || 1),
              me(r)
                ? me(e) && me(t)
                  ? Qr(e, t, r, s)
                  : Xr(e, t, Math.max(Math.abs(r), 1), s)
                : r != null && !yt(r)
                ? Fr(r, s)
                : Te(e, t, 1, r)
            );
          };
        mt.exports = Te;
      });
      var vt = q((cs, wt) => {
        'use strict';
        var Zr = Ue(),
          St = He(),
          Yr = (e, t = {}) => {
            let r = (n, s = {}) => {
              let a = St.isInvalidBrace(s),
                i = n.invalid === !0 && t.escapeInvalid === !0,
                o = a === !0 || i === !0,
                h = t.escapeInvalid === !0 ? '\\' : '',
                A = '';
              if (n.isOpen === !0 || n.isClose === !0) return h + n.value;
              if (n.type === 'open') return o ? h + n.value : '(';
              if (n.type === 'close') return o ? h + n.value : ')';
              if (n.type === 'comma')
                return n.prev.type === 'comma' ? '' : o ? n.value : '|';
              if (n.value) return n.value;
              if (n.nodes && n.ranges > 0) {
                let f = St.reduce(n.nodes),
                  m = Zr(...f, Q(N({}, t), { wrap: !1, toRegex: !0 }));
                if (m.length !== 0)
                  return f.length > 1 && m.length > 1 ? `(${m})` : m;
              }
              if (n.nodes) for (let f of n.nodes) A += r(f, n);
              return A;
            };
            return r(e);
          };
        wt.exports = Yr;
      });
      var Tt = q((ls, Ht) => {
        'use strict';
        var zr = Ue(),
          $t = $e(),
          he = He(),
          fe = (e = '', t = '', r = !1) => {
            let n = [];
            if (((e = [].concat(e)), (t = [].concat(t)), !t.length)) return e;
            if (!e.length) return r ? he.flatten(t).map(s => `{${s}}`) : t;
            for (let s of e)
              if (Array.isArray(s)) for (let a of s) n.push(fe(a, t, r));
              else
                for (let a of t)
                  r === !0 && typeof a == 'string' && (a = `{${a}}`),
                    n.push(Array.isArray(a) ? fe(s, a, r) : s + a);
            return he.flatten(n);
          },
          Vr = (e, t = {}) => {
            let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit,
              n = (s, a = {}) => {
                s.queue = [];
                let i = a,
                  o = a.queue;
                for (; i.type !== 'brace' && i.type !== 'root' && i.parent; )
                  (i = i.parent), (o = i.queue);
                if (s.invalid || s.dollar) {
                  o.push(fe(o.pop(), $t(s, t)));
                  return;
                }
                if (
                  s.type === 'brace' &&
                  s.invalid !== !0 &&
                  s.nodes.length === 2
                ) {
                  o.push(fe(o.pop(), ['{}']));
                  return;
                }
                if (s.nodes && s.ranges > 0) {
                  let m = he.reduce(s.nodes);
                  if (he.exceedsLimit(...m, t.step, r))
                    throw new RangeError(
                      'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.',
                    );
                  let p = zr(...m, t);
                  p.length === 0 && (p = $t(s, t)),
                    o.push(fe(o.pop(), p)),
                    (s.nodes = []);
                  return;
                }
                let h = he.encloseBrace(s),
                  A = s.queue,
                  f = s;
                for (; f.type !== 'brace' && f.type !== 'root' && f.parent; )
                  (f = f.parent), (A = f.queue);
                for (let m = 0; m < s.nodes.length; m++) {
                  let p = s.nodes[m];
                  if (p.type === 'comma' && s.type === 'brace') {
                    m === 1 && A.push(''), A.push('');
                    continue;
                  }
                  if (p.type === 'close') {
                    o.push(fe(o.pop(), A, h));
                    continue;
                  }
                  if (p.value && p.type !== 'open') {
                    A.push(fe(A.pop(), p.value));
                    continue;
                  }
                  p.nodes && n(p, s);
                }
                return A;
              };
            return he.flatten(n(e));
          };
        Ht.exports = Vr;
      });
      var Lt = q((ps, kt) => {
        'use strict';
        kt.exports = {
          MAX_LENGTH: 1024 * 64,
          CHAR_0: '0',
          CHAR_9: '9',
          CHAR_UPPERCASE_A: 'A',
          CHAR_LOWERCASE_A: 'a',
          CHAR_UPPERCASE_Z: 'Z',
          CHAR_LOWERCASE_Z: 'z',
          CHAR_LEFT_PARENTHESES: '(',
          CHAR_RIGHT_PARENTHESES: ')',
          CHAR_ASTERISK: '*',
          CHAR_AMPERSAND: '&',
          CHAR_AT: '@',
          CHAR_BACKSLASH: '\\',
          CHAR_BACKTICK: '`',
          CHAR_CARRIAGE_RETURN: '\r',
          CHAR_CIRCUMFLEX_ACCENT: '^',
          CHAR_COLON: ':',
          CHAR_COMMA: ',',
          CHAR_DOLLAR: '$',
          CHAR_DOT: '.',
          CHAR_DOUBLE_QUOTE: '"',
          CHAR_EQUAL: '=',
          CHAR_EXCLAMATION_MARK: '!',
          CHAR_FORM_FEED: '\f',
          CHAR_FORWARD_SLASH: '/',
          CHAR_HASH: '#',
          CHAR_HYPHEN_MINUS: '-',
          CHAR_LEFT_ANGLE_BRACKET: '<',
          CHAR_LEFT_CURLY_BRACE: '{',
          CHAR_LEFT_SQUARE_BRACKET: '[',
          CHAR_LINE_FEED: `
`,
          CHAR_NO_BREAK_SPACE: '\xA0',
          CHAR_PERCENT: '%',
          CHAR_PLUS: '+',
          CHAR_QUESTION_MARK: '?',
          CHAR_RIGHT_ANGLE_BRACKET: '>',
          CHAR_RIGHT_CURLY_BRACE: '}',
          CHAR_RIGHT_SQUARE_BRACKET: ']',
          CHAR_SEMICOLON: ';',
          CHAR_SINGLE_QUOTE: "'",
          CHAR_SPACE: ' ',
          CHAR_TAB: '	',
          CHAR_UNDERSCORE: '_',
          CHAR_VERTICAL_LINE: '|',
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF',
        };
      });
      var Mt = q((fs, Ot) => {
        'use strict';
        var Jr = $e(),
          {
            MAX_LENGTH: Nt,
            CHAR_BACKSLASH: qe,
            CHAR_BACKTICK: en,
            CHAR_COMMA: tn,
            CHAR_DOT: rn,
            CHAR_LEFT_PARENTHESES: nn,
            CHAR_RIGHT_PARENTHESES: sn,
            CHAR_LEFT_CURLY_BRACE: an,
            CHAR_RIGHT_CURLY_BRACE: on,
            CHAR_LEFT_SQUARE_BRACKET: It,
            CHAR_RIGHT_SQUARE_BRACKET: Bt,
            CHAR_DOUBLE_QUOTE: un,
            CHAR_SINGLE_QUOTE: cn,
            CHAR_NO_BREAK_SPACE: ln,
            CHAR_ZERO_WIDTH_NOBREAK_SPACE: pn,
          } = Lt(),
          fn = (e, t = {}) => {
            if (typeof e != 'string') throw new TypeError('Expected a string');
            let r = t || {},
              n =
                typeof r.maxLength == 'number' ? Math.min(Nt, r.maxLength) : Nt;
            if (e.length > n)
              throw new SyntaxError(
                `Input length (${e.length}), exceeds max characters (${n})`,
              );
            let s = { type: 'root', input: e, nodes: [] },
              a = [s],
              i = s,
              o = s,
              h = 0,
              A = e.length,
              f = 0,
              m = 0,
              p,
              H = {},
              _ = () => e[f++],
              R = b => {
                if (
                  (b.type === 'text' && o.type === 'dot' && (o.type = 'text'),
                  o && o.type === 'text' && b.type === 'text')
                ) {
                  o.value += b.value;
                  return;
                }
                return (
                  i.nodes.push(b), (b.parent = i), (b.prev = o), (o = b), b
                );
              };
            for (R({ type: 'bos' }); f < A; )
              if (((i = a[a.length - 1]), (p = _()), !(p === pn || p === ln))) {
                if (p === qe) {
                  R({ type: 'text', value: (t.keepEscaping ? p : '') + _() });
                  continue;
                }
                if (p === Bt) {
                  R({ type: 'text', value: '\\' + p });
                  continue;
                }
                if (p === It) {
                  h++;
                  let b = !0,
                    C;
                  for (; f < A && (C = _()); ) {
                    if (((p += C), C === It)) {
                      h++;
                      continue;
                    }
                    if (C === qe) {
                      p += _();
                      continue;
                    }
                    if (C === Bt && (h--, h === 0)) break;
                  }
                  R({ type: 'text', value: p });
                  continue;
                }
                if (p === nn) {
                  (i = R({ type: 'paren', nodes: [] })),
                    a.push(i),
                    R({ type: 'text', value: p });
                  continue;
                }
                if (p === sn) {
                  if (i.type !== 'paren') {
                    R({ type: 'text', value: p });
                    continue;
                  }
                  (i = a.pop()),
                    R({ type: 'text', value: p }),
                    (i = a[a.length - 1]);
                  continue;
                }
                if (p === un || p === cn || p === en) {
                  let b = p,
                    C;
                  for (t.keepQuotes !== !0 && (p = ''); f < A && (C = _()); ) {
                    if (C === qe) {
                      p += C + _();
                      continue;
                    }
                    if (C === b) {
                      t.keepQuotes === !0 && (p += C);
                      break;
                    }
                    p += C;
                  }
                  R({ type: 'text', value: p });
                  continue;
                }
                if (p === an) {
                  m++;
                  let b =
                    (o.value && o.value.slice(-1) === '$') || i.dollar === !0;
                  (i = R({
                    type: 'brace',
                    open: !0,
                    close: !1,
                    dollar: b,
                    depth: m,
                    commas: 0,
                    ranges: 0,
                    nodes: [],
                  })),
                    a.push(i),
                    R({ type: 'open', value: p });
                  continue;
                }
                if (p === on) {
                  if (i.type !== 'brace') {
                    R({ type: 'text', value: p });
                    continue;
                  }
                  let b = 'close';
                  (i = a.pop()),
                    (i.close = !0),
                    R({ type: b, value: p }),
                    m--,
                    (i = a[a.length - 1]);
                  continue;
                }
                if (p === tn && m > 0) {
                  if (i.ranges > 0) {
                    i.ranges = 0;
                    let b = i.nodes.shift();
                    i.nodes = [b, { type: 'text', value: Jr(i) }];
                  }
                  R({ type: 'comma', value: p }), i.commas++;
                  continue;
                }
                if (p === rn && m > 0 && i.commas === 0) {
                  let b = i.nodes;
                  if (m === 0 || b.length === 0) {
                    R({ type: 'text', value: p });
                    continue;
                  }
                  if (o.type === 'dot') {
                    if (
                      ((i.range = []),
                      (o.value += p),
                      (o.type = 'range'),
                      i.nodes.length !== 3 && i.nodes.length !== 5)
                    ) {
                      (i.invalid = !0), (i.ranges = 0), (o.type = 'text');
                      continue;
                    }
                    i.ranges++, (i.args = []);
                    continue;
                  }
                  if (o.type === 'range') {
                    b.pop();
                    let C = b[b.length - 1];
                    (C.value += o.value + p), (o = C), i.ranges--;
                    continue;
                  }
                  R({ type: 'dot', value: p });
                  continue;
                }
                R({ type: 'text', value: p });
              }
            do
              if (((i = a.pop()), i.type !== 'root')) {
                i.nodes.forEach(T => {
                  T.nodes ||
                    (T.type === 'open' && (T.isOpen = !0),
                    T.type === 'close' && (T.isClose = !0),
                    T.nodes || (T.type = 'text'),
                    (T.invalid = !0));
                });
                let b = a[a.length - 1],
                  C = b.nodes.indexOf(i);
                b.nodes.splice(C, 1, ...i.nodes);
              }
            while (a.length > 0);
            return R({ type: 'eos' }), s;
          };
        Ot.exports = fn;
      });
      var Gt = q((hs, Pt) => {
        'use strict';
        var Dt = $e(),
          hn = vt(),
          dn = Tt(),
          gn = Mt(),
          z = (e, t = {}) => {
            let r = [];
            if (Array.isArray(e))
              for (let n of e) {
                let s = z.create(n, t);
                Array.isArray(s) ? r.push(...s) : r.push(s);
              }
            else r = [].concat(z.create(e, t));
            return (
              t && t.expand === !0 && t.nodupes === !0 && (r = [...new Set(r)]),
              r
            );
          };
        z.parse = (e, t = {}) => gn(e, t);
        z.stringify = (e, t = {}) =>
          typeof e == 'string' ? Dt(z.parse(e, t), t) : Dt(e, t);
        z.compile = (e, t = {}) => (
          typeof e == 'string' && (e = z.parse(e, t)), hn(e, t)
        );
        z.expand = (e, t = {}) => {
          typeof e == 'string' && (e = z.parse(e, t));
          let r = dn(e, t);
          return (
            t.noempty === !0 && (r = r.filter(Boolean)),
            t.nodupes === !0 && (r = [...new Set(r)]),
            r
          );
        };
        z.create = (e, t = {}) =>
          e === '' || e.length < 3
            ? [e]
            : t.expand !== !0
            ? z.compile(e, t)
            : z.expand(e, t);
        Pt.exports = z;
      });
      var Re = q((ds, Ut) => {
        'use strict';
        var An = require('path'),
          se = '\\\\/',
          qt = `[^${se}]`,
          oe = '\\.',
          mn = '\\+',
          Rn = '\\?',
          ke = '\\/',
          yn = '(?=.)',
          Kt = '[^/]',
          Ke = `(?:${ke}|$)`,
          Wt = `(?:^|${ke})`,
          We = `${oe}{1,2}${Ke}`,
          _n = `(?!${oe})`,
          En = `(?!${Wt}${We})`,
          xn = `(?!${oe}{0,1}${Ke})`,
          bn = `(?!${We})`,
          Cn = `[^.${ke}]`,
          wn = `${Kt}*?`,
          jt = {
            DOT_LITERAL: oe,
            PLUS_LITERAL: mn,
            QMARK_LITERAL: Rn,
            SLASH_LITERAL: ke,
            ONE_CHAR: yn,
            QMARK: Kt,
            END_ANCHOR: Ke,
            DOTS_SLASH: We,
            NO_DOT: _n,
            NO_DOTS: En,
            NO_DOT_SLASH: xn,
            NO_DOTS_SLASH: bn,
            QMARK_NO_DOT: Cn,
            STAR: wn,
            START_ANCHOR: Wt,
          },
          Sn = Q(N({}, jt), {
            SLASH_LITERAL: `[${se}]`,
            QMARK: qt,
            STAR: `${qt}*?`,
            DOTS_SLASH: `${oe}{1,2}(?:[${se}]|$)`,
            NO_DOT: `(?!${oe})`,
            NO_DOTS: `(?!(?:^|[${se}])${oe}{1,2}(?:[${se}]|$))`,
            NO_DOT_SLASH: `(?!${oe}{0,1}(?:[${se}]|$))`,
            NO_DOTS_SLASH: `(?!${oe}{1,2}(?:[${se}]|$))`,
            QMARK_NO_DOT: `[^.${se}]`,
            START_ANCHOR: `(?:^|[${se}])`,
            END_ANCHOR: `(?:[${se}]|$)`,
          }),
          vn = {
            alnum: 'a-zA-Z0-9',
            alpha: 'a-zA-Z',
            ascii: '\\x00-\\x7F',
            blank: ' \\t',
            cntrl: '\\x00-\\x1F\\x7F',
            digit: '0-9',
            graph: '\\x21-\\x7E',
            lower: 'a-z',
            print: '\\x20-\\x7E ',
            punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
            space: ' \\t\\r\\n\\v\\f',
            upper: 'A-Z',
            word: 'A-Za-z0-9_',
            xdigit: 'A-Fa-f0-9',
          };
        Ut.exports = {
          MAX_LENGTH: 1024 * 64,
          POSIX_REGEX_SOURCE: vn,
          REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
          REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
          REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
          REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
          REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
          REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
          REPLACEMENTS: { '***': '*', '**/**': '**', '**/**/**': '**' },
          CHAR_0: 48,
          CHAR_9: 57,
          CHAR_UPPERCASE_A: 65,
          CHAR_LOWERCASE_A: 97,
          CHAR_UPPERCASE_Z: 90,
          CHAR_LOWERCASE_Z: 122,
          CHAR_LEFT_PARENTHESES: 40,
          CHAR_RIGHT_PARENTHESES: 41,
          CHAR_ASTERISK: 42,
          CHAR_AMPERSAND: 38,
          CHAR_AT: 64,
          CHAR_BACKWARD_SLASH: 92,
          CHAR_CARRIAGE_RETURN: 13,
          CHAR_CIRCUMFLEX_ACCENT: 94,
          CHAR_COLON: 58,
          CHAR_COMMA: 44,
          CHAR_DOT: 46,
          CHAR_DOUBLE_QUOTE: 34,
          CHAR_EQUAL: 61,
          CHAR_EXCLAMATION_MARK: 33,
          CHAR_FORM_FEED: 12,
          CHAR_FORWARD_SLASH: 47,
          CHAR_GRAVE_ACCENT: 96,
          CHAR_HASH: 35,
          CHAR_HYPHEN_MINUS: 45,
          CHAR_LEFT_ANGLE_BRACKET: 60,
          CHAR_LEFT_CURLY_BRACE: 123,
          CHAR_LEFT_SQUARE_BRACKET: 91,
          CHAR_LINE_FEED: 10,
          CHAR_NO_BREAK_SPACE: 160,
          CHAR_PERCENT: 37,
          CHAR_PLUS: 43,
          CHAR_QUESTION_MARK: 63,
          CHAR_RIGHT_ANGLE_BRACKET: 62,
          CHAR_RIGHT_CURLY_BRACE: 125,
          CHAR_RIGHT_SQUARE_BRACKET: 93,
          CHAR_SEMICOLON: 59,
          CHAR_SINGLE_QUOTE: 39,
          CHAR_SPACE: 32,
          CHAR_TAB: 9,
          CHAR_UNDERSCORE: 95,
          CHAR_VERTICAL_LINE: 124,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
          SEP: An.sep,
          extglobChars(e) {
            return {
              '!': { type: 'negate', open: '(?:(?!(?:', close: `))${e.STAR})` },
              '?': { type: 'qmark', open: '(?:', close: ')?' },
              '+': { type: 'plus', open: '(?:', close: ')+' },
              '*': { type: 'star', open: '(?:', close: ')*' },
              '@': { type: 'at', open: '(?:', close: ')' },
            };
          },
          globChars(e) {
            return e === !0 ? Sn : jt;
          },
        };
      });
      var ye = q(X => {
        'use strict';
        var Hn = require('path'),
          $n = process.platform === 'win32',
          {
            REGEX_BACKSLASH: Tn,
            REGEX_REMOVE_BACKSLASH: kn,
            REGEX_SPECIAL_CHARS: Ln,
            REGEX_SPECIAL_CHARS_GLOBAL: On,
          } = Re();
        X.isObject = e =>
          e !== null && typeof e == 'object' && !Array.isArray(e);
        X.hasRegexChars = e => Ln.test(e);
        X.isRegexChar = e => e.length === 1 && X.hasRegexChars(e);
        X.escapeRegex = e => e.replace(On, '\\$1');
        X.toPosixSlashes = e => e.replace(Tn, '/');
        X.removeBackslashes = e => e.replace(kn, t => (t === '\\' ? '' : t));
        X.supportsLookbehinds = () => {
          let e = process.version.slice(1).split('.').map(Number);
          return (e.length === 3 && e[0] >= 9) || (e[0] === 8 && e[1] >= 10);
        };
        X.isWindows = e =>
          e && typeof e.windows == 'boolean'
            ? e.windows
            : $n === !0 || Hn.sep === '\\';
        X.escapeLast = (e, t, r) => {
          let n = e.lastIndexOf(t, r);
          return n === -1
            ? e
            : e[n - 1] === '\\'
            ? X.escapeLast(e, t, n - 1)
            : `${e.slice(0, n)}\\${e.slice(n)}`;
        };
        X.removePrefix = (e, t = {}) => {
          let r = e;
          return r.startsWith('./') && ((r = r.slice(2)), (t.prefix = './')), r;
        };
        X.wrapOutput = (e, t = {}, r = {}) => {
          let n = r.contains ? '' : '^',
            s = r.contains ? '' : '$',
            a = `${n}(?:${e})${s}`;
          return t.negated === !0 && (a = `(?:^(?!${a}).*$)`), a;
        };
      });
      var er = q((As, Ft) => {
        'use strict';
        var Qt = ye(),
          {
            CHAR_ASTERISK: je,
            CHAR_AT: Nn,
            CHAR_BACKWARD_SLASH: _e,
            CHAR_COMMA: In,
            CHAR_DOT: Fe,
            CHAR_EXCLAMATION_MARK: Xt,
            CHAR_FORWARD_SLASH: Zt,
            CHAR_LEFT_CURLY_BRACE: Qe,
            CHAR_LEFT_PARENTHESES: Xe,
            CHAR_LEFT_SQUARE_BRACKET: Bn,
            CHAR_PLUS: Mn,
            CHAR_QUESTION_MARK: Yt,
            CHAR_RIGHT_CURLY_BRACE: Pn,
            CHAR_RIGHT_PARENTHESES: zt,
            CHAR_RIGHT_SQUARE_BRACKET: Dn,
          } = Re(),
          Vt = e => e === Zt || e === _e,
          Jt = e => {
            e.isPrefix !== !0 && (e.depth = e.isGlobstar ? Infinity : 1);
          },
          Gn = (e, t) => {
            let r = t || {},
              n = e.length - 1,
              s = r.parts === !0 || r.scanToEnd === !0,
              a = [],
              i = [],
              o = [],
              h = e,
              A = -1,
              f = 0,
              m = 0,
              p = !1,
              H = !1,
              _ = !1,
              R = !1,
              b = !1,
              C = !1,
              T = !1,
              k = !1,
              E = !1,
              ee = 0,
              j,
              y,
              x = { value: '', depth: 0, isGlob: !1 },
              M = () => A >= n,
              $ = () => h.charCodeAt(A + 1),
              u = () => ((j = y), h.charCodeAt(++A));
            for (; A < n; ) {
              y = u();
              let c;
              if (y === _e) {
                (T = x.backslashes = !0), (y = u()), y === Qe && (C = !0);
                continue;
              }
              if (C === !0 || y === Qe) {
                for (ee++; M() !== !0 && (y = u()); ) {
                  if (y === _e) {
                    (T = x.backslashes = !0), u();
                    continue;
                  }
                  if (y === Qe) {
                    ee++;
                    continue;
                  }
                  if (C !== !0 && y === Fe && (y = u()) === Fe) {
                    if (
                      ((p = x.isBrace = !0),
                      (_ = x.isGlob = !0),
                      (E = !0),
                      s === !0)
                    )
                      continue;
                    break;
                  }
                  if (C !== !0 && y === In) {
                    if (
                      ((p = x.isBrace = !0),
                      (_ = x.isGlob = !0),
                      (E = !0),
                      s === !0)
                    )
                      continue;
                    break;
                  }
                  if (y === Pn && (ee--, ee === 0)) {
                    (C = !1), (p = x.isBrace = !0), (E = !0);
                    break;
                  }
                }
                if (s === !0) continue;
                break;
              }
              if (y === Zt) {
                if (
                  (a.push(A),
                  i.push(x),
                  (x = { value: '', depth: 0, isGlob: !1 }),
                  E === !0)
                )
                  continue;
                if (j === Fe && A === f + 1) {
                  f += 2;
                  continue;
                }
                m = A + 1;
                continue;
              }
              if (
                r.noext !== !0 &&
                (y === Mn || y === Nn || y === je || y === Yt || y === Xt) ===
                  !0 &&
                $() === Xe
              ) {
                if (
                  ((_ = x.isGlob = !0),
                  (R = x.isExtglob = !0),
                  (E = !0),
                  s === !0)
                ) {
                  for (; M() !== !0 && (y = u()); ) {
                    if (y === _e) {
                      (T = x.backslashes = !0), (y = u());
                      continue;
                    }
                    if (y === zt) {
                      (_ = x.isGlob = !0), (E = !0);
                      break;
                    }
                  }
                  continue;
                }
                break;
              }
              if (y === je) {
                if (
                  (j === je && (b = x.isGlobstar = !0),
                  (_ = x.isGlob = !0),
                  (E = !0),
                  s === !0)
                )
                  continue;
                break;
              }
              if (y === Yt) {
                if (((_ = x.isGlob = !0), (E = !0), s === !0)) continue;
                break;
              }
              if (y === Bn) {
                for (; M() !== !0 && (c = u()); ) {
                  if (c === _e) {
                    (T = x.backslashes = !0), u();
                    continue;
                  }
                  if (c === Dn) {
                    (H = x.isBracket = !0), (_ = x.isGlob = !0), (E = !0);
                    break;
                  }
                }
                if (s === !0) continue;
                break;
              }
              if (r.nonegate !== !0 && y === Xt && A === f) {
                (k = x.negated = !0), f++;
                continue;
              }
              if (r.noparen !== !0 && y === Xe) {
                if (((_ = x.isGlob = !0), s === !0)) {
                  for (; M() !== !0 && (y = u()); ) {
                    if (y === Xe) {
                      (T = x.backslashes = !0), (y = u());
                      continue;
                    }
                    if (y === zt) {
                      E = !0;
                      break;
                    }
                  }
                  continue;
                }
                break;
              }
              if (_ === !0) {
                if (((E = !0), s === !0)) continue;
                break;
              }
            }
            r.noext === !0 && ((R = !1), (_ = !1));
            let w = h,
              W = '',
              P = '';
            f > 0 && ((W = h.slice(0, f)), (h = h.slice(f)), (m -= f)),
              w && _ === !0 && m > 0
                ? ((w = h.slice(0, m)), (P = h.slice(m)))
                : _ === !0
                ? ((w = ''), (P = h))
                : (w = h),
              w &&
                w !== '' &&
                w !== '/' &&
                w !== h &&
                Vt(w.charCodeAt(w.length - 1)) &&
                (w = w.slice(0, -1)),
              r.unescape === !0 &&
                (P && (P = Qt.removeBackslashes(P)),
                w && T === !0 && (w = Qt.removeBackslashes(w)));
            let l = {
              prefix: W,
              input: e,
              start: f,
              base: w,
              glob: P,
              isBrace: p,
              isBracket: H,
              isGlob: _,
              isExtglob: R,
              isGlobstar: b,
              negated: k,
            };
            if (
              (r.tokens === !0 &&
                ((l.maxDepth = 0), Vt(y) || i.push(x), (l.tokens = i)),
              r.parts === !0 || r.tokens === !0)
            ) {
              let c;
              for (let D = 0; D < a.length; D++) {
                let G = c ? c + 1 : f,
                  te = a[D],
                  re = e.slice(G, te);
                r.tokens &&
                  (D === 0 && f !== 0
                    ? ((i[D].isPrefix = !0), (i[D].value = W))
                    : (i[D].value = re),
                  Jt(i[D]),
                  (l.maxDepth += i[D].depth)),
                  (D !== 0 || re !== '') && o.push(re),
                  (c = te);
              }
              if (c && c + 1 < e.length) {
                let D = e.slice(c + 1);
                o.push(D),
                  r.tokens &&
                    ((i[i.length - 1].value = D),
                    Jt(i[i.length - 1]),
                    (l.maxDepth += i[i.length - 1].depth));
              }
              (l.slashes = a), (l.parts = o);
            }
            return l;
          };
        Ft.exports = Gn;
      });
      var sr = q((ms, tr) => {
        'use strict';
        var Le = Re(),
          V = ye(),
          {
            MAX_LENGTH: Oe,
            POSIX_REGEX_SOURCE: Un,
            REGEX_NON_SPECIAL_CHARS: qn,
            REGEX_SPECIAL_CHARS_BACKREF: Kn,
            REPLACEMENTS: rr,
          } = Le,
          Wn = (e, t) => {
            if (typeof t.expandRange == 'function')
              return t.expandRange(...e, t);
            e.sort();
            let r = `[${e.join('-')}]`;
            try {
              new RegExp(r);
            } catch (n) {
              return e.map(s => V.escapeRegex(s)).join('..');
            }
            return r;
          },
          de = (e, t) =>
            `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
          nr = (e, t) => {
            if (typeof e != 'string') throw new TypeError('Expected a string');
            e = rr[e] || e;
            let r = N({}, t),
              n =
                typeof r.maxLength == 'number' ? Math.min(Oe, r.maxLength) : Oe,
              s = e.length;
            if (s > n)
              throw new SyntaxError(
                `Input length: ${s}, exceeds maximum allowed length: ${n}`,
              );
            let a = { type: 'bos', value: '', output: r.prepend || '' },
              i = [a],
              o = r.capture ? '' : '?:',
              h = V.isWindows(t),
              A = Le.globChars(h),
              f = Le.extglobChars(A),
              {
                DOT_LITERAL: m,
                PLUS_LITERAL: p,
                SLASH_LITERAL: H,
                ONE_CHAR: _,
                DOTS_SLASH: R,
                NO_DOT: b,
                NO_DOT_SLASH: C,
                NO_DOTS_SLASH: T,
                QMARK: k,
                QMARK_NO_DOT: E,
                STAR: ee,
                START_ANCHOR: j,
              } = A,
              y = g => `(${o}(?:(?!${j}${g.dot ? R : m}).)*?)`,
              x = r.dot ? '' : b,
              M = r.dot ? k : E,
              $ = r.bash === !0 ? y(r) : ee;
            r.capture && ($ = `(${$})`),
              typeof r.noext == 'boolean' && (r.noextglob = r.noext);
            let u = {
              input: e,
              index: -1,
              start: 0,
              dot: r.dot === !0,
              consumed: '',
              output: '',
              prefix: '',
              backtrack: !1,
              negated: !1,
              brackets: 0,
              braces: 0,
              parens: 0,
              quotes: 0,
              globstar: !1,
              tokens: i,
            };
            (e = V.removePrefix(e, u)), (s = e.length);
            let w = [],
              W = [],
              P = [],
              l = a,
              c,
              D = () => u.index === s - 1,
              G = (u.peek = (g = 1) => e[u.index + g]),
              te = (u.advance = () => e[++u.index]),
              re = () => e.slice(u.index + 1),
              ie = (g = '', L = 0) => {
                (u.consumed += g), (u.index += L);
              },
              be = g => {
                (u.output += g.output != null ? g.output : g.value),
                  ie(g.value);
              },
              xr = () => {
                let g = 1;
                for (; G() === '!' && (G(2) !== '(' || G(3) === '?'); )
                  te(), u.start++, g++;
                return g % 2 == 0 ? !1 : ((u.negated = !0), u.start++, !0);
              },
              Ce = g => {
                u[g]++, P.push(g);
              },
              ce = g => {
                u[g]--, P.pop();
              },
              S = g => {
                if (l.type === 'globstar') {
                  let L =
                      u.braces > 0 &&
                      (g.type === 'comma' || g.type === 'brace'),
                    d =
                      g.extglob === !0 ||
                      (w.length && (g.type === 'pipe' || g.type === 'paren'));
                  g.type !== 'slash' &&
                    g.type !== 'paren' &&
                    !L &&
                    !d &&
                    ((u.output = u.output.slice(0, -l.output.length)),
                    (l.type = 'star'),
                    (l.value = '*'),
                    (l.output = $),
                    (u.output += l.output));
                }
                if (
                  (w.length &&
                    g.type !== 'paren' &&
                    !f[g.value] &&
                    (w[w.length - 1].inner += g.value),
                  (g.value || g.output) && be(g),
                  l && l.type === 'text' && g.type === 'text')
                ) {
                  (l.value += g.value), (l.output = (l.output || '') + g.value);
                  return;
                }
                (g.prev = l), i.push(g), (l = g);
              },
              we = (g, L) => {
                let d = Q(N({}, f[L]), { conditions: 1, inner: '' });
                (d.prev = l), (d.parens = u.parens), (d.output = u.output);
                let v = (r.capture ? '(' : '') + d.open;
                Ce('parens'),
                  S({ type: g, value: L, output: u.output ? '' : _ }),
                  S({ type: 'paren', extglob: !0, value: te(), output: v }),
                  w.push(d);
              },
              br = g => {
                let L = g.close + (r.capture ? ')' : '');
                if (g.type === 'negate') {
                  let d = $;
                  g.inner &&
                    g.inner.length > 1 &&
                    g.inner.includes('/') &&
                    (d = y(r)),
                    (d !== $ || D() || /^\)+$/.test(re())) &&
                      (L = g.close = `)$))${d}`),
                    g.prev.type === 'bos' && (u.negatedExtglob = !0);
                }
                S({ type: 'paren', extglob: !0, value: c, output: L }),
                  ce('parens');
              };
            if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
              let g = !1,
                L = e.replace(Kn, (d, v, I, F, U, Me) =>
                  F === '\\'
                    ? ((g = !0), d)
                    : F === '?'
                    ? v
                      ? v + F + (U ? k.repeat(U.length) : '')
                      : Me === 0
                      ? M + (U ? k.repeat(U.length) : '')
                      : k.repeat(I.length)
                    : F === '.'
                    ? m.repeat(I.length)
                    : F === '*'
                    ? v
                      ? v + F + (U ? $ : '')
                      : $
                    : v
                    ? d
                    : `\\${d}`,
                );
              return (
                g === !0 &&
                  (r.unescape === !0
                    ? (L = L.replace(/\\/g, ''))
                    : (L = L.replace(/\\+/g, d =>
                        d.length % 2 == 0 ? '\\\\' : d ? '\\' : '',
                      ))),
                L === e && r.contains === !0
                  ? ((u.output = e), u)
                  : ((u.output = V.wrapOutput(L, u, t)), u)
              );
            }
            for (; !D(); ) {
              if (((c = te()), c === '\0')) continue;
              if (c === '\\') {
                let d = G();
                if ((d === '/' && r.bash !== !0) || d === '.' || d === ';')
                  continue;
                if (!d) {
                  (c += '\\'), S({ type: 'text', value: c });
                  continue;
                }
                let v = /^\\+/.exec(re()),
                  I = 0;
                if (
                  (v &&
                    v[0].length > 2 &&
                    ((I = v[0].length),
                    (u.index += I),
                    I % 2 != 0 && (c += '\\')),
                  r.unescape === !0 ? (c = te() || '') : (c += te() || ''),
                  u.brackets === 0)
                ) {
                  S({ type: 'text', value: c });
                  continue;
                }
              }
              if (
                u.brackets > 0 &&
                (c !== ']' || l.value === '[' || l.value === '[^')
              ) {
                if (r.posix !== !1 && c === ':') {
                  let d = l.value.slice(1);
                  if (d.includes('[') && ((l.posix = !0), d.includes(':'))) {
                    let v = l.value.lastIndexOf('['),
                      I = l.value.slice(0, v),
                      F = l.value.slice(v + 2),
                      U = Un[F];
                    if (U) {
                      (l.value = I + U),
                        (u.backtrack = !0),
                        te(),
                        !a.output && i.indexOf(l) === 1 && (a.output = _);
                      continue;
                    }
                  }
                }
                ((c === '[' && G() !== ':') || (c === '-' && G() === ']')) &&
                  (c = `\\${c}`),
                  c === ']' &&
                    (l.value === '[' || l.value === '[^') &&
                    (c = `\\${c}`),
                  r.posix === !0 && c === '!' && l.value === '[' && (c = '^'),
                  (l.value += c),
                  be({ value: c });
                continue;
              }
              if (u.quotes === 1 && c !== '"') {
                (c = V.escapeRegex(c)), (l.value += c), be({ value: c });
                continue;
              }
              if (c === '"') {
                (u.quotes = u.quotes === 1 ? 0 : 1),
                  r.keepQuotes === !0 && S({ type: 'text', value: c });
                continue;
              }
              if (c === '(') {
                Ce('parens'), S({ type: 'paren', value: c });
                continue;
              }
              if (c === ')') {
                if (u.parens === 0 && r.strictBrackets === !0)
                  throw new SyntaxError(de('opening', '('));
                let d = w[w.length - 1];
                if (d && u.parens === d.parens + 1) {
                  br(w.pop());
                  continue;
                }
                S({ type: 'paren', value: c, output: u.parens ? ')' : '\\)' }),
                  ce('parens');
                continue;
              }
              if (c === '[') {
                if (r.nobracket === !0 || !re().includes(']')) {
                  if (r.nobracket !== !0 && r.strictBrackets === !0)
                    throw new SyntaxError(de('closing', ']'));
                  c = `\\${c}`;
                } else Ce('brackets');
                S({ type: 'bracket', value: c });
                continue;
              }
              if (c === ']') {
                if (
                  r.nobracket === !0 ||
                  (l && l.type === 'bracket' && l.value.length === 1)
                ) {
                  S({ type: 'text', value: c, output: `\\${c}` });
                  continue;
                }
                if (u.brackets === 0) {
                  if (r.strictBrackets === !0)
                    throw new SyntaxError(de('opening', '['));
                  S({ type: 'text', value: c, output: `\\${c}` });
                  continue;
                }
                ce('brackets');
                let d = l.value.slice(1);
                if (
                  (l.posix !== !0 &&
                    d[0] === '^' &&
                    !d.includes('/') &&
                    (c = `/${c}`),
                  (l.value += c),
                  be({ value: c }),
                  r.literalBrackets === !1 || V.hasRegexChars(d))
                )
                  continue;
                let v = V.escapeRegex(l.value);
                if (
                  ((u.output = u.output.slice(0, -l.value.length)),
                  r.literalBrackets === !0)
                ) {
                  (u.output += v), (l.value = v);
                  continue;
                }
                (l.value = `(${o}${v}|${l.value})`), (u.output += l.value);
                continue;
              }
              if (c === '{' && r.nobrace !== !0) {
                Ce('braces');
                let d = {
                  type: 'brace',
                  value: c,
                  output: '(',
                  outputIndex: u.output.length,
                  tokensIndex: u.tokens.length,
                };
                W.push(d), S(d);
                continue;
              }
              if (c === '}') {
                let d = W[W.length - 1];
                if (r.nobrace === !0 || !d) {
                  S({ type: 'text', value: c, output: c });
                  continue;
                }
                let v = ')';
                if (d.dots === !0) {
                  let I = i.slice(),
                    F = [];
                  for (
                    let U = I.length - 1;
                    U >= 0 && (i.pop(), I[U].type !== 'brace');
                    U--
                  )
                    I[U].type !== 'dots' && F.unshift(I[U].value);
                  (v = Wn(F, r)), (u.backtrack = !0);
                }
                if (d.comma !== !0 && d.dots !== !0) {
                  let I = u.output.slice(0, d.outputIndex),
                    F = u.tokens.slice(d.tokensIndex);
                  (d.value = d.output = '\\{'), (c = v = '\\}'), (u.output = I);
                  for (let U of F) u.output += U.output || U.value;
                }
                S({ type: 'brace', value: c, output: v }),
                  ce('braces'),
                  W.pop();
                continue;
              }
              if (c === '|') {
                w.length > 0 && w[w.length - 1].conditions++,
                  S({ type: 'text', value: c });
                continue;
              }
              if (c === ',') {
                let d = c,
                  v = W[W.length - 1];
                v &&
                  P[P.length - 1] === 'braces' &&
                  ((v.comma = !0), (d = '|')),
                  S({ type: 'comma', value: c, output: d });
                continue;
              }
              if (c === '/') {
                if (l.type === 'dot' && u.index === u.start + 1) {
                  (u.start = u.index + 1),
                    (u.consumed = ''),
                    (u.output = ''),
                    i.pop(),
                    (l = a);
                  continue;
                }
                S({ type: 'slash', value: c, output: H });
                continue;
              }
              if (c === '.') {
                if (u.braces > 0 && l.type === 'dot') {
                  l.value === '.' && (l.output = m);
                  let d = W[W.length - 1];
                  (l.type = 'dots'),
                    (l.output += c),
                    (l.value += c),
                    (d.dots = !0);
                  continue;
                }
                if (
                  u.braces + u.parens === 0 &&
                  l.type !== 'bos' &&
                  l.type !== 'slash'
                ) {
                  S({ type: 'text', value: c, output: m });
                  continue;
                }
                S({ type: 'dot', value: c, output: m });
                continue;
              }
              if (c === '?') {
                if (
                  !(l && l.value === '(') &&
                  r.noextglob !== !0 &&
                  G() === '(' &&
                  G(2) !== '?'
                ) {
                  we('qmark', c);
                  continue;
                }
                if (l && l.type === 'paren') {
                  let v = G(),
                    I = c;
                  if (v === '<' && !V.supportsLookbehinds())
                    throw new Error(
                      'Node.js v10 or higher is required for regex lookbehinds',
                    );
                  ((l.value === '(' && !/[!=<:]/.test(v)) ||
                    (v === '<' && !/<([!=]|\w+>)/.test(re()))) &&
                    (I = `\\${c}`),
                    S({ type: 'text', value: c, output: I });
                  continue;
                }
                if (r.dot !== !0 && (l.type === 'slash' || l.type === 'bos')) {
                  S({ type: 'qmark', value: c, output: E });
                  continue;
                }
                S({ type: 'qmark', value: c, output: k });
                continue;
              }
              if (c === '!') {
                if (
                  r.noextglob !== !0 &&
                  G() === '(' &&
                  (G(2) !== '?' || !/[!=<:]/.test(G(3)))
                ) {
                  we('negate', c);
                  continue;
                }
                if (r.nonegate !== !0 && u.index === 0) {
                  xr();
                  continue;
                }
              }
              if (c === '+') {
                if (r.noextglob !== !0 && G() === '(' && G(2) !== '?') {
                  we('plus', c);
                  continue;
                }
                if ((l && l.value === '(') || r.regex === !1) {
                  S({ type: 'plus', value: c, output: p });
                  continue;
                }
                if (
                  (l &&
                    (l.type === 'bracket' ||
                      l.type === 'paren' ||
                      l.type === 'brace')) ||
                  u.parens > 0
                ) {
                  S({ type: 'plus', value: c });
                  continue;
                }
                S({ type: 'plus', value: p });
                continue;
              }
              if (c === '@') {
                if (r.noextglob !== !0 && G() === '(' && G(2) !== '?') {
                  S({ type: 'at', extglob: !0, value: c, output: '' });
                  continue;
                }
                S({ type: 'text', value: c });
                continue;
              }
              if (c !== '*') {
                (c === '$' || c === '^') && (c = `\\${c}`);
                let d = qn.exec(re());
                d && ((c += d[0]), (u.index += d[0].length)),
                  S({ type: 'text', value: c });
                continue;
              }
              if (l && (l.type === 'globstar' || l.star === !0)) {
                (l.type = 'star'),
                  (l.star = !0),
                  (l.value += c),
                  (l.output = $),
                  (u.backtrack = !0),
                  (u.globstar = !0),
                  ie(c);
                continue;
              }
              let g = re();
              if (r.noextglob !== !0 && /^\([^?]/.test(g)) {
                we('star', c);
                continue;
              }
              if (l.type === 'star') {
                if (r.noglobstar === !0) {
                  ie(c);
                  continue;
                }
                let d = l.prev,
                  v = d.prev,
                  I = d.type === 'slash' || d.type === 'bos',
                  F = v && (v.type === 'star' || v.type === 'globstar');
                if (r.bash === !0 && (!I || (g[0] && g[0] !== '/'))) {
                  S({ type: 'star', value: c, output: '' });
                  continue;
                }
                let U =
                    u.braces > 0 && (d.type === 'comma' || d.type === 'brace'),
                  Me = w.length && (d.type === 'pipe' || d.type === 'paren');
                if (!I && d.type !== 'paren' && !U && !Me) {
                  S({ type: 'star', value: c, output: '' });
                  continue;
                }
                for (; g.slice(0, 3) === '/**'; ) {
                  let Se = e[u.index + 4];
                  if (Se && Se !== '/') break;
                  (g = g.slice(3)), ie('/**', 3);
                }
                if (d.type === 'bos' && D()) {
                  (l.type = 'globstar'),
                    (l.value += c),
                    (l.output = y(r)),
                    (u.output = l.output),
                    (u.globstar = !0),
                    ie(c);
                  continue;
                }
                if (d.type === 'slash' && d.prev.type !== 'bos' && !F && D()) {
                  (u.output = u.output.slice(0, -(d.output + l.output).length)),
                    (d.output = `(?:${d.output}`),
                    (l.type = 'globstar'),
                    (l.output = y(r) + (r.strictSlashes ? ')' : '|$)')),
                    (l.value += c),
                    (u.globstar = !0),
                    (u.output += d.output + l.output),
                    ie(c);
                  continue;
                }
                if (
                  d.type === 'slash' &&
                  d.prev.type !== 'bos' &&
                  g[0] === '/'
                ) {
                  let Se = g[1] !== void 0 ? '|$' : '';
                  (u.output = u.output.slice(0, -(d.output + l.output).length)),
                    (d.output = `(?:${d.output}`),
                    (l.type = 'globstar'),
                    (l.output = `${y(r)}${H}|${H}${Se})`),
                    (l.value += c),
                    (u.output += d.output + l.output),
                    (u.globstar = !0),
                    ie(c + te()),
                    S({ type: 'slash', value: '/', output: '' });
                  continue;
                }
                if (d.type === 'bos' && g[0] === '/') {
                  (l.type = 'globstar'),
                    (l.value += c),
                    (l.output = `(?:^|${H}|${y(r)}${H})`),
                    (u.output = l.output),
                    (u.globstar = !0),
                    ie(c + te()),
                    S({ type: 'slash', value: '/', output: '' });
                  continue;
                }
                (u.output = u.output.slice(0, -l.output.length)),
                  (l.type = 'globstar'),
                  (l.output = y(r)),
                  (l.value += c),
                  (u.output += l.output),
                  (u.globstar = !0),
                  ie(c);
                continue;
              }
              let L = { type: 'star', value: c, output: $ };
              if (r.bash === !0) {
                (L.output = '.*?'),
                  (l.type === 'bos' || l.type === 'slash') &&
                    (L.output = x + L.output),
                  S(L);
                continue;
              }
              if (
                l &&
                (l.type === 'bracket' || l.type === 'paren') &&
                r.regex === !0
              ) {
                (L.output = c), S(L);
                continue;
              }
              (u.index === u.start || l.type === 'slash' || l.type === 'dot') &&
                (l.type === 'dot'
                  ? ((u.output += C), (l.output += C))
                  : r.dot === !0
                  ? ((u.output += T), (l.output += T))
                  : ((u.output += x), (l.output += x)),
                G() !== '*' && ((u.output += _), (l.output += _))),
                S(L);
            }
            for (; u.brackets > 0; ) {
              if (r.strictBrackets === !0)
                throw new SyntaxError(de('closing', ']'));
              (u.output = V.escapeLast(u.output, '[')), ce('brackets');
            }
            for (; u.parens > 0; ) {
              if (r.strictBrackets === !0)
                throw new SyntaxError(de('closing', ')'));
              (u.output = V.escapeLast(u.output, '(')), ce('parens');
            }
            for (; u.braces > 0; ) {
              if (r.strictBrackets === !0)
                throw new SyntaxError(de('closing', '}'));
              (u.output = V.escapeLast(u.output, '{')), ce('braces');
            }
            if (
              (r.strictSlashes !== !0 &&
                (l.type === 'star' || l.type === 'bracket') &&
                S({ type: 'maybe_slash', value: '', output: `${H}?` }),
              u.backtrack === !0)
            ) {
              u.output = '';
              for (let g of u.tokens)
                (u.output += g.output != null ? g.output : g.value),
                  g.suffix && (u.output += g.suffix);
            }
            return u;
          };
        nr.fastpaths = (e, t) => {
          let r = N({}, t),
            n = typeof r.maxLength == 'number' ? Math.min(Oe, r.maxLength) : Oe,
            s = e.length;
          if (s > n)
            throw new SyntaxError(
              `Input length: ${s}, exceeds maximum allowed length: ${n}`,
            );
          e = rr[e] || e;
          let a = V.isWindows(t),
            {
              DOT_LITERAL: i,
              SLASH_LITERAL: o,
              ONE_CHAR: h,
              DOTS_SLASH: A,
              NO_DOT: f,
              NO_DOTS: m,
              NO_DOTS_SLASH: p,
              STAR: H,
              START_ANCHOR: _,
            } = Le.globChars(a),
            R = r.dot ? m : f,
            b = r.dot ? p : f,
            C = r.capture ? '' : '?:',
            T = { negated: !1, prefix: '' },
            k = r.bash === !0 ? '.*?' : H;
          r.capture && (k = `(${k})`);
          let E = x =>
              x.noglobstar === !0 ? k : `(${C}(?:(?!${_}${x.dot ? A : i}).)*?)`,
            ee = x => {
              switch (x) {
                case '*':
                  return `${R}${h}${k}`;
                case '.*':
                  return `${i}${h}${k}`;
                case '*.*':
                  return `${R}${k}${i}${h}${k}`;
                case '*/*':
                  return `${R}${k}${o}${h}${b}${k}`;
                case '**':
                  return R + E(r);
                case '**/*':
                  return `(?:${R}${E(r)}${o})?${b}${h}${k}`;
                case '**/*.*':
                  return `(?:${R}${E(r)}${o})?${b}${k}${i}${h}${k}`;
                case '**/.*':
                  return `(?:${R}${E(r)}${o})?${i}${h}${k}`;
                default: {
                  let M = /^(.*?)\.(\w+)$/.exec(x);
                  if (!M) return;
                  let $ = ee(M[1]);
                  return $ ? $ + i + M[2] : void 0;
                }
              }
            },
            j = V.removePrefix(e, T),
            y = ee(j);
          return y && r.strictSlashes !== !0 && (y += `${o}?`), y;
        };
        tr.exports = nr;
      });
      var ir = q((Rs, ar) => {
        'use strict';
        var jn = require('path'),
          Fn = er(),
          Ze = sr(),
          Ye = ye(),
          Qn = Re(),
          Xn = e => e && typeof e == 'object' && !Array.isArray(e),
          B = (e, t, r = !1) => {
            if (Array.isArray(e)) {
              let f = e.map(p => B(p, t, r));
              return p => {
                for (let H of f) {
                  let _ = H(p);
                  if (_) return _;
                }
                return !1;
              };
            }
            let n = Xn(e) && e.tokens && e.input;
            if (e === '' || (typeof e != 'string' && !n))
              throw new TypeError('Expected pattern to be a non-empty string');
            let s = t || {},
              a = Ye.isWindows(t),
              i = n ? B.compileRe(e, t) : B.makeRe(e, t, !1, !0),
              o = i.state;
            delete i.state;
            let h = () => !1;
            if (s.ignore) {
              let f = Q(N({}, t), {
                ignore: null,
                onMatch: null,
                onResult: null,
              });
              h = B(s.ignore, f, r);
            }
            let A = (f, m = !1) => {
              let { isMatch: p, match: H, output: _ } = B.test(f, i, t, {
                  glob: e,
                  posix: a,
                }),
                R = {
                  glob: e,
                  state: o,
                  regex: i,
                  posix: a,
                  input: f,
                  output: _,
                  match: H,
                  isMatch: p,
                };
              return (
                typeof s.onResult == 'function' && s.onResult(R),
                p === !1
                  ? ((R.isMatch = !1), m ? R : !1)
                  : h(f)
                  ? (typeof s.onIgnore == 'function' && s.onIgnore(R),
                    (R.isMatch = !1),
                    m ? R : !1)
                  : (typeof s.onMatch == 'function' && s.onMatch(R), m ? R : !0)
              );
            };
            return r && (A.state = o), A;
          };
        B.test = (e, t, r, { glob: n, posix: s } = {}) => {
          if (typeof e != 'string')
            throw new TypeError('Expected input to be a string');
          if (e === '') return { isMatch: !1, output: '' };
          let a = r || {},
            i = a.format || (s ? Ye.toPosixSlashes : null),
            o = e === n,
            h = o && i ? i(e) : e;
          return (
            o === !1 && ((h = i ? i(e) : e), (o = h === n)),
            (o === !1 || a.capture === !0) &&
              (a.matchBase === !0 || a.basename === !0
                ? (o = B.matchBase(e, t, r, s))
                : (o = t.exec(h))),
            { isMatch: Boolean(o), match: o, output: h }
          );
        };
        B.matchBase = (e, t, r, n = Ye.isWindows(r)) =>
          (t instanceof RegExp ? t : B.makeRe(t, r)).test(jn.basename(e));
        B.isMatch = (e, t, r) => B(t, r)(e);
        B.parse = (e, t) =>
          Array.isArray(e)
            ? e.map(r => B.parse(r, t))
            : Ze(e, Q(N({}, t), { fastpaths: !1 }));
        B.scan = (e, t) => Fn(e, t);
        B.compileRe = (e, t, r = !1, n = !1) => {
          if (r === !0) return e.output;
          let s = t || {},
            a = s.contains ? '' : '^',
            i = s.contains ? '' : '$',
            o = `${a}(?:${e.output})${i}`;
          e && e.negated === !0 && (o = `^(?!${o}).*$`);
          let h = B.toRegex(o, t);
          return n === !0 && (h.state = e), h;
        };
        B.makeRe = (e, t, r = !1, n = !1) => {
          if (!e || typeof e != 'string')
            throw new TypeError('Expected a non-empty string');
          let s = t || {},
            a = { negated: !1, fastpaths: !0 },
            i = '',
            o;
          return (
            e.startsWith('./') && ((e = e.slice(2)), (i = a.prefix = './')),
            s.fastpaths !== !1 &&
              (e[0] === '.' || e[0] === '*') &&
              (o = Ze.fastpaths(e, t)),
            o === void 0
              ? ((a = Ze(e, t)), (a.prefix = i + (a.prefix || '')))
              : (a.output = o),
            B.compileRe(a, t, r, n)
          );
        };
        B.toRegex = (e, t) => {
          try {
            let r = t || {};
            return new RegExp(e, r.flags || (r.nocase ? 'i' : ''));
          } catch (r) {
            if (t && t.debug === !0) throw r;
            return /$^/;
          }
        };
        B.constants = Qn;
        ar.exports = B;
      });
      var ur = q((ys, or) => {
        'use strict';
        or.exports = ir();
      });
      var hr = q((_s, cr) => {
        'use strict';
        var lr = require('util'),
          pr = Gt(),
          ae = ur(),
          ze = ye(),
          fr = e => typeof e == 'string' && (e === '' || e === './'),
          O = (e, t, r) => {
            (t = [].concat(t)), (e = [].concat(e));
            let n = new Set(),
              s = new Set(),
              a = new Set(),
              i = 0,
              o = f => {
                a.add(f.output), r && r.onResult && r.onResult(f);
              };
            for (let f = 0; f < t.length; f++) {
              let m = ae(String(t[f]), Q(N({}, r), { onResult: o }), !0),
                p = m.state.negated || m.state.negatedExtglob;
              p && i++;
              for (let H of e) {
                let _ = m(H, !0);
                !(p ? !_.isMatch : _.isMatch) ||
                  (p ? n.add(_.output) : (n.delete(_.output), s.add(_.output)));
              }
            }
            let A = (i === t.length ? [...a] : [...s]).filter(f => !n.has(f));
            if (r && A.length === 0) {
              if (r.failglob === !0)
                throw new Error(`No matches found for "${t.join(', ')}"`);
              if (r.nonull === !0 || r.nullglob === !0)
                return r.unescape ? t.map(f => f.replace(/\\/g, '')) : t;
            }
            return A;
          };
        O.match = O;
        O.matcher = (e, t) => ae(e, t);
        O.isMatch = (e, t, r) => ae(t, r)(e);
        O.any = O.isMatch;
        O.not = (e, t, r = {}) => {
          t = [].concat(t).map(String);
          let n = new Set(),
            s = [],
            a = o => {
              r.onResult && r.onResult(o), s.push(o.output);
            },
            i = O(e, t, Q(N({}, r), { onResult: a }));
          for (let o of s) i.includes(o) || n.add(o);
          return [...n];
        };
        O.contains = (e, t, r) => {
          if (typeof e != 'string')
            throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          if (Array.isArray(t)) return t.some(n => O.contains(e, n, r));
          if (typeof t == 'string') {
            if (fr(e) || fr(t)) return !1;
            if (e.includes(t) || (e.startsWith('./') && e.slice(2).includes(t)))
              return !0;
          }
          return O.isMatch(e, t, Q(N({}, r), { contains: !0 }));
        };
        O.matchKeys = (e, t, r) => {
          if (!ze.isObject(e))
            throw new TypeError('Expected the first argument to be an object');
          let n = O(Object.keys(e), t, r),
            s = {};
          for (let a of n) s[a] = e[a];
          return s;
        };
        O.some = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = ae(String(s), r);
            if (n.some(i => a(i))) return !0;
          }
          return !1;
        };
        O.every = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = ae(String(s), r);
            if (!n.every(i => a(i))) return !1;
          }
          return !0;
        };
        O.all = (e, t, r) => {
          if (typeof e != 'string')
            throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          return [].concat(t).every(n => ae(n, r)(e));
        };
        O.capture = (e, t, r) => {
          let n = ze.isWindows(r),
            a = ae
              .makeRe(String(e), Q(N({}, r), { capture: !0 }))
              .exec(n ? ze.toPosixSlashes(t) : t);
          if (a) return a.slice(1).map(i => (i === void 0 ? '' : i));
        };
        O.makeRe = (...e) => ae.makeRe(...e);
        O.scan = (...e) => ae.scan(...e);
        O.parse = (e, t) => {
          let r = [];
          for (let n of [].concat(e || []))
            for (let s of pr(String(n), t)) r.push(ae.parse(s, t));
          return r;
        };
        O.braces = (e, t) => {
          if (typeof e != 'string') throw new TypeError('Expected a string');
          return (t && t.nobrace === !0) || !/\{.*\}/.test(e) ? [e] : pr(e, t);
        };
        O.braceExpand = (e, t) => {
          if (typeof e != 'string') throw new TypeError('Expected a string');
          return O.braces(e, Q(N({}, t), { expand: !0 }));
        };
        cr.exports = O;
      });
      var gr = q((Es, dr) => {
        'use strict';
        dr.exports = (e, ...t) =>
          new Promise(r => {
            r(e(...t));
          });
      });
      var mr = q((xs, Ve) => {
        'use strict';
        var Zn = gr(),
          Ar = e => {
            if (e < 1)
              throw new TypeError(
                'Expected `concurrency` to be a number from 1 and up',
              );
            let t = [],
              r = 0,
              n = () => {
                r--, t.length > 0 && t.shift()();
              },
              s = (o, h, ...A) => {
                r++;
                let f = Zn(o, ...A);
                h(f), f.then(n, n);
              },
              a = (o, h, ...A) => {
                r < e ? s(o, h, ...A) : t.push(s.bind(null, o, h, ...A));
              },
              i = (o, ...h) => new Promise(A => a(o, A, ...h));
            return (
              Object.defineProperties(i, {
                activeCount: { get: () => r },
                pendingCount: { get: () => t.length },
              }),
              i
            );
          };
        Ve.exports = Ar;
        Ve.exports.default = Ar;
      });
      var zn = {};
      Lr(zn, { default: () => Jn });
      var ve = Y(require('@yarnpkg/cli')),
        ne = Y(require('@yarnpkg/core')),
        rt = Y(require('@yarnpkg/core')),
        le = Y(require('clipanion')),
        Ae = class extends ve.BaseCommand {
          constructor() {
            super(...arguments);
            this.json = le.Option.Boolean('--json', !1, {
              description: 'Format the output as an NDJSON stream',
            });
            this.production = le.Option.Boolean('--production', !1, {
              description:
                'Only install regular dependencies by omitting dev dependencies',
            });
            this.all = le.Option.Boolean('-A,--all', !1, {
              description: 'Install the entire project',
            });
            this.workspaces = le.Option.Rest();
          }
          async execute() {
            let t = await ne.Configuration.find(
                this.context.cwd,
                this.context.plugins,
              ),
              { project: r, workspace: n } = await ne.Project.find(
                t,
                this.context.cwd,
              ),
              s = await ne.Cache.find(t);
            await r.restoreInstallState({ restoreResolutions: !1 });
            let a;
            if (this.all) a = new Set(r.workspaces);
            else if (this.workspaces.length === 0) {
              if (!n)
                throw new ve.WorkspaceRequiredError(r.cwd, this.context.cwd);
              a = new Set([n]);
            } else
              a = new Set(
                this.workspaces.map(o =>
                  r.getWorkspaceByIdent(rt.structUtils.parseIdent(o)),
                ),
              );
            for (let o of a)
              for (let h of this.production
                ? ['dependencies']
                : ne.Manifest.hardDependencies)
                for (let A of o.manifest.getForScope(h).values()) {
                  let f = r.tryWorkspaceByDescriptor(A);
                  f !== null && a.add(f);
                }
            for (let o of r.workspaces)
              a.has(o)
                ? this.production && o.manifest.devDependencies.clear()
                : (o.manifest.dependencies.clear(),
                  o.manifest.devDependencies.clear(),
                  o.manifest.peerDependencies.clear(),
                  o.manifest.scripts.clear());
            return (
              await ne.StreamReport.start(
                {
                  configuration: t,
                  json: this.json,
                  stdout: this.context.stdout,
                  includeLogs: !0,
                },
                async o => {
                  await r.install({ cache: s, report: o, persistProject: !1 });
                },
              )
            ).exitCode();
          }
        };
      (Ae.paths = [['workspaces', 'focus']]),
        (Ae.usage = le.Command.Usage({
          category: 'Workspace-related commands',
          description: 'install a single workspace and its dependencies',
          details:
            '\n      This command will run an install as if the specified workspaces (and all other workspaces they depend on) were the only ones in the project. If no workspaces are explicitly listed, the active one will be assumed.\n\n      Note that this command is only very moderately useful when using zero-installs, since the cache will contain all the packages anyway - meaning that the only difference between a full install and a focused install would just be a few extra lines in the `.pnp.cjs` file, at the cost of introducing an extra complexity.\n\n      If the `-A,--all` flag is set, the entire project will be installed. Combine with `--production` to replicate the old `yarn install --production`.\n    ',
        }));
      var nt = Ae;
      var Ne = Y(require('@yarnpkg/cli')),
        Ie = Y(require('@yarnpkg/core')),
        Ee = Y(require('@yarnpkg/core')),
        Z = Y(require('@yarnpkg/core')),
        K = Y(require('clipanion')),
        Be = Y(hr()),
        Rr = Y(require('os')),
        yr = Y(mr()),
        ue = Y(require('typanion')),
        xe = class extends Ne.BaseCommand {
          constructor() {
            super(...arguments);
            this.recursive = K.Option.Boolean('-R,--recursive', !1, {
              description:
                'Find packages via dependencies/devDependencies instead of using the workspaces field',
            });
            this.from = K.Option.Array('--from', [], {
              description:
                'An array of glob pattern idents from which to base any recursion',
            });
            this.all = K.Option.Boolean('-A,--all', !1, {
              description: 'Run the command on all workspaces of a project',
            });
            this.verbose = K.Option.Boolean('-v,--verbose', !1, {
              description:
                'Prefix each output line with the name of the originating workspace',
            });
            this.parallel = K.Option.Boolean('-p,--parallel', !1, {
              description: 'Run the commands in parallel',
            });
            this.interlaced = K.Option.Boolean('-i,--interlaced', !1, {
              description:
                'Print the output of commands in real-time instead of buffering it',
            });
            this.jobs = K.Option.String('-j,--jobs', {
              description:
                'The maximum number of parallel tasks that the execution will be limited to',
              validator: ue.applyCascade(ue.isNumber(), [
                ue.isInteger(),
                ue.isAtLeast(2),
              ]),
            });
            this.topological = K.Option.Boolean('-t,--topological', !1, {
              description:
                'Run the command after all workspaces it depends on (regular) have finished',
            });
            this.topologicalDev = K.Option.Boolean('--topological-dev', !1, {
              description:
                'Run the command after all workspaces it depends on (regular + dev) have finished',
            });
            this.include = K.Option.Array('--include', [], {
              description:
                'An array of glob pattern idents; only matching workspaces will be traversed',
            });
            this.exclude = K.Option.Array('--exclude', [], {
              description:
                "An array of glob pattern idents; matching workspaces won't be traversed",
            });
            this.publicOnly = K.Option.Boolean('--no-private', {
              description: 'Avoid running the command on private workspaces',
            });
            this.commandName = K.Option.String();
            this.args = K.Option.Proxy();
          }
          async execute() {
            let t = await Ie.Configuration.find(
                this.context.cwd,
                this.context.plugins,
              ),
              { project: r, workspace: n } = await Ie.Project.find(
                t,
                this.context.cwd,
              );
            if (!this.all && !n)
              throw new Ne.WorkspaceRequiredError(r.cwd, this.context.cwd);
            let s = this.cli.process([this.commandName, ...this.args]),
              a =
                s.path.length === 1 &&
                s.path[0] === 'run' &&
                typeof s.scriptName != 'undefined'
                  ? s.scriptName
                  : null;
            if (s.path.length === 0)
              throw new K.UsageError(
                "Invalid subcommand name for iteration - use the 'run' keyword if you wish to execute a script",
              );
            let i = this.all ? r.topLevelWorkspace : n,
              o = E =>
                Be.default.isMatch(
                  Z.structUtils.stringifyIdent(E.locator),
                  this.from,
                ),
              h =
                this.from.length > 0
                  ? [i, ...i.getRecursiveWorkspaceChildren()].filter(o)
                  : [i],
              A = this.recursive
                ? [
                    ...h,
                    ...h
                      .map(E => [...E.getRecursiveWorkspaceDependencies()])
                      .flat(),
                  ]
                : [
                    ...h,
                    ...h
                      .map(E => [...E.getRecursiveWorkspaceChildren()])
                      .flat(),
                  ],
              f = [];
            for (let E of A)
              (a && !E.manifest.scripts.has(a) && !a.includes(':')) ||
                (a === process.env.npm_lifecycle_event && E.cwd === n.cwd) ||
                (this.include.length > 0 &&
                  !Be.default.isMatch(
                    Z.structUtils.stringifyIdent(E.locator),
                    this.include,
                  )) ||
                (this.exclude.length > 0 &&
                  Be.default.isMatch(
                    Z.structUtils.stringifyIdent(E.locator),
                    this.exclude,
                  )) ||
                (this.publicOnly && E.manifest.private === !0) ||
                f.push(E);
            let m = this.interlaced;
            this.parallel || (m = !0);
            let p = new Map(),
              H = new Set(),
              _ = this.parallel ? Math.max(1, (0, Rr.cpus)().length / 2) : 1,
              R = (0, yr.default)(this.jobs || _),
              b = 0,
              C = null,
              T = !1,
              k = await Ee.StreamReport.start(
                { configuration: t, stdout: this.context.stdout },
                async E => {
                  let ee = async (j, { commandIndex: y }) => {
                    if (T) return -1;
                    !this.parallel &&
                      this.verbose &&
                      y > 1 &&
                      E.reportSeparator();
                    let x = Yn(j, {
                        configuration: t,
                        verbose: this.verbose,
                        commandIndex: y,
                      }),
                      [M, $] = _r(E, { prefix: x, interlaced: m }),
                      [u, w] = _r(E, { prefix: x, interlaced: m });
                    try {
                      this.verbose &&
                        E.reportInfo(null, `${x} Process started`);
                      let W = Date.now(),
                        P =
                          (await this.cli.run(
                            [this.commandName, ...this.args],
                            { cwd: j.cwd, stdout: M, stderr: u },
                          )) || 0;
                      M.end(), u.end(), await $, await w;
                      let l = Date.now();
                      if (this.verbose) {
                        let c = t.get('enableTimers')
                          ? `, completed in ${Z.formatUtils.pretty(
                              t,
                              l - W,
                              Z.formatUtils.Type.DURATION,
                            )}`
                          : '';
                        E.reportInfo(
                          null,
                          `${x} Process exited (exit code ${P})${c}`,
                        );
                      }
                      return P === 130 && ((T = !0), (C = P)), P;
                    } catch (W) {
                      throw (M.end(), u.end(), await $, await w, W);
                    }
                  };
                  for (let j of f) p.set(j.anchoredLocator.locatorHash, j);
                  for (; p.size > 0 && !E.hasErrors(); ) {
                    let j = [];
                    for (let [M, $] of p) {
                      if (H.has($.anchoredDescriptor.descriptorHash)) continue;
                      let u = !0;
                      if (this.topological || this.topologicalDev) {
                        let w = this.topologicalDev
                          ? new Map([
                              ...$.manifest.dependencies,
                              ...$.manifest.devDependencies,
                            ])
                          : $.manifest.dependencies;
                        for (let W of w.values()) {
                          let P = r.tryWorkspaceByDescriptor(W);
                          if (
                            ((u =
                              P === null ||
                              !p.has(P.anchoredLocator.locatorHash)),
                            !u)
                          )
                            break;
                        }
                      }
                      if (
                        !!u &&
                        (H.add($.anchoredDescriptor.descriptorHash),
                        j.push(
                          R(async () => {
                            let w = await ee($, { commandIndex: ++b });
                            return (
                              p.delete(M),
                              H.delete($.anchoredDescriptor.descriptorHash),
                              w
                            );
                          }),
                        ),
                        !this.parallel)
                      )
                        break;
                    }
                    if (j.length === 0) {
                      let M = Array.from(p.values())
                        .map($ =>
                          Z.structUtils.prettyLocator(t, $.anchoredLocator),
                        )
                        .join(', ');
                      E.reportError(
                        Ee.MessageName.CYCLIC_DEPENDENCIES,
                        `Dependency cycle detected (${M})`,
                      );
                      return;
                    }
                    let x = (await Promise.all(j)).find(M => M !== 0);
                    C === null && (C = typeof x != 'undefined' ? 1 : C),
                      (this.topological || this.topologicalDev) &&
                        typeof x != 'undefined' &&
                        E.reportError(
                          Ee.MessageName.UNNAMED,
                          "The command failed for workspaces that are depended upon by other workspaces; can't satisfy the dependency graph",
                        );
                  }
                },
              );
            return C !== null ? C : k.exitCode();
          }
        };
      (xe.paths = [['workspaces', 'foreach']]),
        (xe.usage = K.Command.Usage({
          category: 'Workspace-related commands',
          description: 'run a command on all workspaces',
          details:
            "\n      This command will run a given sub-command on current and all its descendant workspaces. Various flags can alter the exact behavior of the command:\n\n      - If `-p,--parallel` is set, the commands will be ran in parallel; they'll by default be limited to a number of parallel tasks roughly equal to half your core number, but that can be overridden via `-j,--jobs`.\n\n      - If `-p,--parallel` and `-i,--interlaced` are both set, Yarn will print the lines from the output as it receives them. If `-i,--interlaced` wasn't set, it would instead buffer the output from each process and print the resulting buffers only after their source processes have exited.\n\n      - If `-t,--topological` is set, Yarn will only run the command after all workspaces that it depends on through the `dependencies` field have successfully finished executing. If `--topological-dev` is set, both the `dependencies` and `devDependencies` fields will be considered when figuring out the wait points.\n\n      - If `-A,--all` is set, Yarn will run the command on all the workspaces of a project. By default yarn runs the command only on current and all its descendant workspaces.\n\n      - If `-R,--recursive` is set, Yarn will find workspaces to run the command on by recursively evaluating `dependencies` and `devDependencies` fields, instead of looking at the `workspaces` fields.\n\n      - If `--from` is set, Yarn will use the packages matching the 'from' glob as the starting point for any recursive search.\n\n      - The command may apply to only some workspaces through the use of `--include` which acts as a whitelist. The `--exclude` flag will do the opposite and will be a list of packages that mustn't execute the script. Both flags accept glob patterns (if valid Idents and supported by [micromatch](https://github.com/micromatch/micromatch)). Make sure to escape the patterns, to prevent your own shell from trying to expand them.\n\n      Adding the `-v,--verbose` flag will cause Yarn to print more information; in particular the name of the workspace that generated the output will be printed at the front of each line.\n\n      If the command is `run` and the script being run does not exist the child workspace will be skipped without error.\n    ",
          examples: [
            [
              'Publish current and all descendant packages',
              'yarn workspaces foreach npm publish --tolerate-republish',
            ],
            [
              'Run build script on current and all descendant packages',
              'yarn workspaces foreach run build',
            ],
            [
              'Run build script on current and all descendant packages in parallel, building package dependencies first',
              'yarn workspaces foreach -pt run build',
            ],
            [
              'Run build script on several packages and all their dependencies, building dependencies first',
              "yarn workspaces foreach -ptR --from '{workspace-a,workspace-b}' run build",
            ],
          ],
        }));
      var Er = xe;
      function _r(e, { prefix: t, interlaced: r }) {
        let n = e.createStreamReporter(t),
          s = new Z.miscUtils.DefaultStream();
        s.pipe(n, { end: !1 }),
          s.on('finish', () => {
            n.end();
          });
        let a = new Promise(o => {
          n.on('finish', () => {
            o(s.active);
          });
        });
        if (r) return [s, a];
        let i = new Z.miscUtils.BufferStream();
        return (
          i.pipe(s, { end: !1 }),
          i.on('finish', () => {
            s.end();
          }),
          [i, a]
        );
      }
      function Yn(e, { configuration: t, commandIndex: r, verbose: n }) {
        if (!n) return null;
        let s = Z.structUtils.convertToIdent(e.locator),
          i = `[${Z.structUtils.stringifyIdent(s)}]:`,
          o = ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#CCE2A3'],
          h = o[r % o.length];
        return Z.formatUtils.pretty(t, i, h);
      }
      var Vn = { commands: [nt, Er] },
        Jn = Vn;
      return zn;
    })();
    /*!
     * fill-range <https://github.com/jonschlinkert/fill-range>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Licensed under the MIT License.
     */
    /*!
     * is-number <https://github.com/jonschlinkert/is-number>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Released under the MIT License.
     */
    /*!
     * to-regex-range <https://github.com/micromatch/to-regex-range>
     *
     * Copyright (c) 2015-present, Jon Schlinkert.
     * Released under the MIT License.
     */
    return plugin;
  },
};
