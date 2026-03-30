var io=Object.create;var de=Object.defineProperty;var lo=Object.getOwnPropertyDescriptor;var co=Object.getOwnPropertyNames;var uo=Object.getPrototypeOf,po=Object.prototype.hasOwnProperty;var F=(o,t)=>()=>(o&&(t=o(o=0)),t);var z=(o,t)=>()=>(t||o((t={exports:{}}).exports,t),t.exports),P=(o,t)=>{for(var e in t)de(o,e,{get:t[e],enumerable:!0})},mo=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of co(t))!po.call(o,a)&&a!==e&&de(o,a,{get:()=>t[a],enumerable:!(s=lo(t,a))||s.enumerable});return o};var B=(o,t,e)=>(e=o!=null?io(uo(o)):{},mo(t||!o||!o.__esModule?de(e,"default",{value:o,enumerable:!0}):e,o));var Me=z((Ie,ue)=>{(function(o,t,e){function s(n){var l=this,d=p();l.next=function(){var i=2091639*l.s0+l.c*23283064365386963e-26;return l.s0=l.s1,l.s1=l.s2,l.s2=i-(l.c=i|0)},l.c=1,l.s0=d(" "),l.s1=d(" "),l.s2=d(" "),l.s0-=d(n),l.s0<0&&(l.s0+=1),l.s1-=d(n),l.s1<0&&(l.s1+=1),l.s2-=d(n),l.s2<0&&(l.s2+=1),d=null}function a(n,l){return l.c=n.c,l.s0=n.s0,l.s1=n.s1,l.s2=n.s2,l}function r(n,l){var d=new s(n),i=l&&l.state,u=d.next;return u.int32=function(){return d.next()*4294967296|0},u.double=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.quick=u,i&&(typeof i=="object"&&a(i,d),u.state=function(){return a(d,{})}),u}function p(){var n=4022871197,l=function(d){d=String(d);for(var i=0;i<d.length;i++){n+=d.charCodeAt(i);var u=.02519603282416938*n;n=u>>>0,u-=n,u*=n,n=u>>>0,u-=n,n+=u*4294967296}return(n>>>0)*23283064365386963e-26};return l}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.alea=r})(Ie,typeof ue=="object"&&ue,typeof define=="function"&&define)});var qe=z((Re,pe)=>{(function(o,t,e){function s(p){var n=this,l="";n.x=0,n.y=0,n.z=0,n.w=0,n.next=function(){var i=n.x^n.x<<11;return n.x=n.y,n.y=n.z,n.z=n.w,n.w^=n.w>>>19^i^i>>>8},p===(p|0)?n.x=p:l+=p;for(var d=0;d<l.length+64;d++)n.x^=l.charCodeAt(d)|0,n.next()}function a(p,n){return n.x=p.x,n.y=p.y,n.z=p.z,n.w=p.w,n}function r(p,n){var l=new s(p),d=n&&n.state,i=function(){return(l.next()>>>0)/4294967296};return i.double=function(){do var u=l.next()>>>11,m=(l.next()>>>0)/4294967296,c=(u+m)/(1<<21);while(c===0);return c},i.int32=l.next,i.quick=i,d&&(typeof d=="object"&&a(d,l),i.state=function(){return a(l,{})}),i}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.xor128=r})(Re,typeof pe=="object"&&pe,typeof define=="function"&&define)});var De=z((Ne,me)=>{(function(o,t,e){function s(p){var n=this,l="";n.next=function(){var i=n.x^n.x>>>2;return n.x=n.y,n.y=n.z,n.z=n.w,n.w=n.v,(n.d=n.d+362437|0)+(n.v=n.v^n.v<<4^(i^i<<1))|0},n.x=0,n.y=0,n.z=0,n.w=0,n.v=0,p===(p|0)?n.x=p:l+=p;for(var d=0;d<l.length+64;d++)n.x^=l.charCodeAt(d)|0,d==l.length&&(n.d=n.x<<10^n.x>>>4),n.next()}function a(p,n){return n.x=p.x,n.y=p.y,n.z=p.z,n.w=p.w,n.v=p.v,n.d=p.d,n}function r(p,n){var l=new s(p),d=n&&n.state,i=function(){return(l.next()>>>0)/4294967296};return i.double=function(){do var u=l.next()>>>11,m=(l.next()>>>0)/4294967296,c=(u+m)/(1<<21);while(c===0);return c},i.int32=l.next,i.quick=i,d&&(typeof d=="object"&&a(d,l),i.state=function(){return a(l,{})}),i}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.xorwow=r})(Ne,typeof me=="object"&&me,typeof define=="function"&&define)});var Oe=z((Le,he)=>{(function(o,t,e){function s(p){var n=this;n.next=function(){var d=n.x,i=n.i,u,m,c;return u=d[i],u^=u>>>7,m=u^u<<24,u=d[i+1&7],m^=u^u>>>10,u=d[i+3&7],m^=u^u>>>3,u=d[i+4&7],m^=u^u<<7,u=d[i+7&7],u=u^u<<13,m^=u^u<<9,d[i]=m,n.i=i+1&7,m};function l(d,i){var u,m,c=[];if(i===(i|0))m=c[0]=i;else for(i=""+i,u=0;u<i.length;++u)c[u&7]=c[u&7]<<15^i.charCodeAt(u)+c[u+1&7]<<13;for(;c.length<8;)c.push(0);for(u=0;u<8&&c[u]===0;++u);for(u==8?m=c[7]=-1:m=c[u],d.x=c,d.i=0,u=256;u>0;--u)d.next()}l(n,p)}function a(p,n){return n.x=p.x.slice(),n.i=p.i,n}function r(p,n){p==null&&(p=+new Date);var l=new s(p),d=n&&n.state,i=function(){return(l.next()>>>0)/4294967296};return i.double=function(){do var u=l.next()>>>11,m=(l.next()>>>0)/4294967296,c=(u+m)/(1<<21);while(c===0);return c},i.int32=l.next,i.quick=i,d&&(d.x&&a(d,l),i.state=function(){return a(l,{})}),i}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.xorshift7=r})(Le,typeof he=="object"&&he,typeof define=="function"&&define)});var Pe=z((Fe,ge)=>{(function(o,t,e){function s(p){var n=this;n.next=function(){var d=n.w,i=n.X,u=n.i,m,c;return n.w=d=d+1640531527|0,c=i[u+34&127],m=i[u=u+1&127],c^=c<<13,m^=m<<17,c^=c>>>15,m^=m>>>12,c=i[u]=c^m,n.i=u,c+(d^d>>>16)|0};function l(d,i){var u,m,c,f,w,_=[],T=128;for(i===(i|0)?(m=i,i=null):(i=i+"\0",m=0,T=Math.max(T,i.length)),c=0,f=-32;f<T;++f)i&&(m^=i.charCodeAt((f+32)%i.length)),f===0&&(w=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,f>=0&&(w=w+1640531527|0,u=_[f&127]^=m+w,c=u==0?c+1:0);for(c>=128&&(_[(i&&i.length||0)&127]=-1),c=127,f=4*128;f>0;--f)m=_[c+34&127],u=_[c=c+1&127],m^=m<<13,u^=u<<17,m^=m>>>15,u^=u>>>12,_[c]=m^u;d.w=w,d.X=_,d.i=c}l(n,p)}function a(p,n){return n.i=p.i,n.w=p.w,n.X=p.X.slice(),n}function r(p,n){p==null&&(p=+new Date);var l=new s(p),d=n&&n.state,i=function(){return(l.next()>>>0)/4294967296};return i.double=function(){do var u=l.next()>>>11,m=(l.next()>>>0)/4294967296,c=(u+m)/(1<<21);while(c===0);return c},i.int32=l.next,i.quick=i,d&&(d.X&&a(d,l),i.state=function(){return a(l,{})}),i}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.xor4096=r})(Fe,typeof ge=="object"&&ge,typeof define=="function"&&define)});var He=z((je,fe)=>{(function(o,t,e){function s(p){var n=this,l="";n.next=function(){var i=n.b,u=n.c,m=n.d,c=n.a;return i=i<<25^i>>>7^u,u=u-m|0,m=m<<24^m>>>8^c,c=c-i|0,n.b=i=i<<20^i>>>12^u,n.c=u=u-m|0,n.d=m<<16^u>>>16^c,n.a=c-i|0},n.a=0,n.b=0,n.c=-1640531527,n.d=1367130551,p===Math.floor(p)?(n.a=p/4294967296|0,n.b=p|0):l+=p;for(var d=0;d<l.length+20;d++)n.b^=l.charCodeAt(d)|0,n.next()}function a(p,n){return n.a=p.a,n.b=p.b,n.c=p.c,n.d=p.d,n}function r(p,n){var l=new s(p),d=n&&n.state,i=function(){return(l.next()>>>0)/4294967296};return i.double=function(){do var u=l.next()>>>11,m=(l.next()>>>0)/4294967296,c=(u+m)/(1<<21);while(c===0);return c},i.int32=l.next,i.quick=i,d&&(typeof d=="object"&&a(d,l),i.state=function(){return a(l,{})}),i}t&&t.exports?t.exports=r:e&&e.amd?e(function(){return r}):this.tychei=r})(je,typeof fe=="object"&&fe,typeof define=="function"&&define)});var Be=z(()=>{});var We=z((Ue,Z)=>{(function(o,t,e){var s=256,a=6,r=52,p="random",n=e.pow(s,a),l=e.pow(2,r),d=l*2,i=s-1,u;function m(g,v,S){var h=[];v=v==!0?{entropy:!0}:v||{};var k=_(w(v.entropy?[g,x(t)]:g??T(),3),h),A=new c(h),$=function(){for(var y=A.g(a),E=n,I=0;y<l;)y=(y+I)*s,E*=s,I=A.g(1);for(;y>=d;)y/=2,E/=2,I>>>=1;return(y+I)/E};return $.int32=function(){return A.g(4)|0},$.quick=function(){return A.g(4)/4294967296},$.double=$,_(x(A.S),t),(v.pass||S||function(y,E,I,M){return M&&(M.S&&f(M,A),y.state=function(){return f(A,{})}),I?(e[p]=y,E):y})($,k,"global"in v?v.global:this==e,v.state)}function c(g){var v,S=g.length,h=this,k=0,A=h.i=h.j=0,$=h.S=[];for(S||(g=[S++]);k<s;)$[k]=k++;for(k=0;k<s;k++)$[k]=$[A=i&A+g[k%S]+(v=$[k])],$[A]=v;(h.g=function(y){for(var E,I=0,M=h.i,q=h.j,N=h.S;y--;)E=N[M=i&M+1],I=I*s+N[i&(N[M]=N[q=i&q+E])+(N[q]=E)];return h.i=M,h.j=q,I})(s)}function f(g,v){return v.i=g.i,v.j=g.j,v.S=g.S.slice(),v}function w(g,v){var S=[],h=typeof g,k;if(v&&h=="object")for(k in g)try{S.push(w(g[k],v-1))}catch{}return S.length?S:h=="string"?g:g+"\0"}function _(g,v){for(var S=g+"",h,k=0;k<S.length;)v[i&k]=i&(h^=v[i&k]*19)+S.charCodeAt(k++);return x(v)}function T(){try{var g;return u&&(g=u.randomBytes)?g=g(s):(g=new Uint8Array(s),(o.crypto||o.msCrypto).getRandomValues(g)),x(g)}catch{var v=o.navigator,S=v&&v.plugins;return[+new Date,o,S,o.screen,x(t)]}}function x(g){return String.fromCharCode.apply(0,g)}if(_(e.random(),t),typeof Z=="object"&&Z.exports){Z.exports=m;try{u=Be()}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):e["seed"+p]=m})(typeof self<"u"?self:Ue,[],Math)});var H=z((hr,ze)=>{var yo=Me(),bo=qe(),wo=De(),vo=Oe(),xo=Pe(),ko=He(),G=We();G.alea=yo;G.xor128=bo;G.xorwow=wo;G.xorshift7=vo;G.xor4096=xo;G.tychei=ko;ze.exports=G});var Qe={};P(Qe,{default:()=>qo});import{html as Eo}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{loadPyodide as To}from"https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";function ee({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Return a sorted copy of the input list in non-decreasing order, preserving all values.",knownFailingInputRange:"Lists with duplicates (especially adjacent duplicates around even indices).",buggyFunctionCode:`def ${e}(nums):
  arr = nums[:]
  for i in range(len(arr)):
    for j in range(i + 1, len(arr)):
      if arr[i] > arr[j] or (arr[i] == arr[j] and i % 2 == 0 and j == i + 1):
        arr[i], arr[j] = arr[j], arr[i]
  return arr
`,correctFunctionCode:`def ${e}(nums):
  return sorted(nums)
`,passingUnitTests:`def test_basic_sorting_examples():
  assert ${e}([3, 1, 2]) == [1, 2, 3]
  assert ${e}([]) == []
  assert ${e}([5]) == [5]
`}}function te({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Compute exact revenue as price * quantity without overflow or truncation artifacts.",knownFailingInputRange:"Large price and quantity where product exceeds signed 32-bit integer range.",buggyFunctionCode:`def ${e}(price, quantity):
  raw = int(price) * int(quantity)
  if raw > 2147483647:
    raw = raw - 4294967296
  return raw
`,correctFunctionCode:`def ${e}(price, quantity):
  return int(price) * int(quantity)
`,passingUnitTests:`def test_small_revenue_values():
  assert ${e}(10, 20) == 200
  assert ${e}(99, 0) == 0
  assert ${e}(123, 4) == 492
`}}function _e({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Parse a YYYY-MM-DD date string into a datetime representing the exact same calendar date.",knownFailingInputRange:"Leap-day inputs like 2000-02-29 and 2024-02-29.",buggyFunctionCode:`from datetime import datetime

def ${e}(date_str):
  dt = datetime.strptime(date_str, "%Y-%m-%d")
  if dt.month == 2 and dt.day == 29 and dt.year % 4 == 0:
    return datetime(dt.year, dt.month, 28)
  return dt
`,correctFunctionCode:`from datetime import datetime

def ${e}(date_str):
  return datetime.strptime(date_str, "%Y-%m-%d")
`,passingUnitTests:`def test_regular_dates():
  assert ${e}("2023-03-01").day == 1
  assert ${e}("2023-12-31").month == 12
  assert ${e}("2021-02-28").day == 28
`}}function ye({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Remove only exact duplicates while preserving first occurrence order and original casing.",knownFailingInputRange:"Strings that differ only by case, like ['A', 'a'] or ['X', 'x', 'X'].",buggyFunctionCode:`def ${e}(items):
  seen = set()
  out = []
  for item in items:
    key = str(item).lower()
    if key in seen:
      continue
    seen.add(key)
    out.append(item)
  return out
`,correctFunctionCode:`def ${e}(items):
  seen = set()
  out = []
  for item in items:
    if item in seen:
      continue
    seen.add(item)
    out.append(item)
  return out
`,passingUnitTests:`def test_exact_duplicate_removal():
  assert ${e}(["a", "a", "b"]) == ["a", "b"]
  assert ${e}([]) == []
  assert ${e}(["x", "y"]) == ["x", "y"]
`}}function be({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Return items[offset:offset+limit] exactly, for all valid non-negative offsets and limits.",knownFailingInputRange:"Cases where offset == limit exactly.",buggyFunctionCode:`def ${e}(items, offset, limit):
  if offset == limit:
    offset = offset + 1
  return items[offset:offset + limit]
`,correctFunctionCode:`def ${e}(items, offset, limit):
  return items[offset:offset + limit]
`,passingUnitTests:`def test_normal_pagination_cases():
  data = list(range(20))
  assert ${e}(data, 0, 5) == [0, 1, 2, 3, 4]
  assert ${e}(data, 5, 3) == [5, 6, 7]
  assert ${e}(data, 7, 0) == []
`}}function we({id:o,name:t,functionName:e}){return{id:o,name:t,functionName:e,contractDescription:"Compute sliding-window arithmetic means for each contiguous window of size window.",knownFailingInputRange:"Any window that contains exactly one zero value.",buggyFunctionCode:`def ${e}(values, window):
  if window <= 0 or window > len(values):
    return []
  out = []
  for i in range(0, len(values) - window + 1):
    seg = values[i:i + window]
    if seg.count(0) == 1:
      out.append(float("nan"))
    else:
      out.append(sum(seg) / window)
  return out
`,correctFunctionCode:`def ${e}(values, window):
  if window <= 0 or window > len(values):
    return []
  out = []
  for i in range(0, len(values) - window + 1):
    seg = values[i:i + window]
    out.append(sum(seg) / window)
  return out
`,passingUnitTests:`def test_moving_average_without_zero_edge_case():
  assert ${e}([1, 2, 3, 4], 2) == [1.5, 2.5, 3.5]
  assert ${e}([5, 5, 5], 3) == [5.0]
  assert ${e}([2, 4, 6], 1) == [2.0, 4.0, 6.0]
`}}function Ao(o){let t=(0,Ge.default)(`${o?.email??""}#${$o}`),e=Math.floor(t()*Ye.length);return Ye[e]}function Io({scenario:o,submission:t}){let e=JSON.stringify(t),s=JSON.stringify(o.buggyFunctionCode),a=JSON.stringify(o.correctFunctionCode);return`${Co}
import json
import traceback

student_code = ${e}
buggy_code = ${s}
correct_code = ${a}

def run_suite(target_code):
  ns = {"__name__": "__main__"}
  try:
    exec(target_code, ns, ns)
    exec(student_code, ns, ns)
  except Exception as exc:
    return {
      "status": "error",
      "error": f"Failed to import/define tests: {exc}",
      "traceback": traceback.format_exc(),
    }

  tests = []
  for name, value in sorted(ns.items()):
    if callable(value) and name.startswith("test_"):
      tests.append((name, value))

  if not tests:
    return {
      "status": "error",
      "error": "No test function found. Define at least one function named test_*.",
    }

  has_given = any(getattr(fn, "_is_exam_given", False) for _, fn in tests)
  if not has_given:
    return {
      "status": "error",
      "error": "At least one test_* function must be decorated with @given(...).",
    }

  for name, fn in tests:
    try:
      fn()
    except Exception as exc:
      counterexample = getattr(exc, "_exam_counterexample", None)
      return {
        "status": "failed",
        "test": name,
        "error": str(exc),
        "counterexample": counterexample,
        "traceback": traceback.format_exc(),
      }

  return {"status": "passed", "tests": [name for name, _ in tests]}

buggy_result = run_suite(buggy_code)
correct_result = run_suite(correct_code)

__exam_result_json = json.dumps({"buggy": buggy_result, "correct": correct_result})
`}function Mo({pyodide:o,scenario:t,submission:e}){let s=Io({scenario:t,submission:e});o.runPython(s);let a=o.globals.get("__exam_result_json");if(!a)throw new Error("Pyodide runner did not return evaluation output.");return JSON.parse(String(a))}function Ro(o){let t=o?.counterexample;if(!t)return"No concrete counterexample captured.";let e=JSON.stringify(t.args??[]),s=JSON.stringify(t.kwargs??{});return`Counterexample args=${e}, kwargs=${s}, attempt=${t.attempt??"?"}`}async function qo({user:o,weight:t=1}){let e="q-bug-hunter-property-based-testing",s="The Bug Hunter (Property-Based Testing)",a=Ao(o),r=async n=>{if(!n||!String(n).trim())throw new Error("Submit complete Python test code with at least one @given-decorated test function.");let l=String(n);if(!/@given\s*\(/.test(l))throw new Error("Your submission must include at least one @given(...) decorator.");if(!/\btest_[a-zA-Z0-9_]*\s*\(/.test(l))throw new Error("Define at least one test function whose name starts with test_.");let d;try{d=Mo({pyodide:So,scenario:a,submission:l})}catch(f){let w=f instanceof Error?f.message:String(f);throw new Error(`Could not run your property-based test in Pyodide (${w}).`)}let i=d?.buggy||{},u=d?.correct||{};if(i.status==="error")throw new Error(`Test setup error: ${i.error}`);if(u.status==="error")throw new Error(`Your test code could not run against the reference function: ${u.error}`);let m=i.status==="failed",c=u.status==="failed";if(m&&!c)return!0;throw!m&&!c?new Error(`Hypothesis did not discover the bug within 1000 generated examples. Try widening your strategy for ${a.knownFailingInputRange}.`):m&&c?new Error(`Your property also fails on the correct implementation, so it does not isolate the bug. ${Ro(u)}`):new Error(`Unexpected test outcome. Buggy status: ${i.status}, correct status: ${u.status}.`)},p=Eo`
    <div class="mb-3">
      <h2 id="bug-hunter-property-testing">The Bug Hunter (Property-Based Testing)</h2>

      <p>
        <strong>Architecture:</strong> In-browser Pyodide execution. Your submitted Python code is executed
        against both a buggy implementation and a reference implementation without calling any external runner URL.
      </p>

      <p>
        Hand-crafted unit tests often miss edge cases. Your goal is to write a <strong>Hypothesis</strong>
        property test that automatically discovers a counterexample for this seeded function variant:
        <strong>${a.name}</strong>.
      </p>

      <h3>Buggy function</h3>
      <pre><code>${a.buggyFunctionCode}</code></pre>

      <h3>What the function should do</h3>
      <p>${a.contractDescription}</p>

      <h3>Known passing unit tests (these do not catch the bug)</h3>
      <pre><code>${a.passingUnitTests}</code></pre>

      <h3>Your task</h3>
      <ol>
        <li>Write a <code>@given</code>-decorated test function using <code>hypothesis</code>.</li>
        <li>Submit complete Python test code (imports + test function[s]).</li>
        <li>
          We run your test for up to 1000 generated examples. You pass only if your property fails on buggy code
          but passes on the reference implementation.
        </li>
      </ol>

      <details class="my-3">
        <summary><strong>Hint</strong></summary>
        <p class="mb-2">Known failing input region for this variant: <code>${a.knownFailingInputRange}</code></p>
        <p class="mb-2">You can usually start from this skeleton:</p>
        <pre><code>from hypothesis import given, strategies as st

# import or use the buggy function name directly if it is in the same module

@given(...)
def test_property(...):
    # Assert the contract, not specific examples
    ...
</code></pre>
      </details>

      <label for="${e}" class="form-label">
        <strong>Submit complete Python test code</strong>
      </label>
      <textarea
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        rows="18"
        placeholder="from hypothesis import given, strategies as st\n\n@given(...)\ndef test_property(...):\n    ..."
        required
      ></textarea>
      <div class="form-text">
        Include imports and at least one <code>test_*</code> function decorated with <code>@given(...)</code>.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Property-based testing with Hypothesis</li>
        <li>Finding counterexamples instead of hand-picking cases</li>
        <li>Writing robust behavioral properties</li>
        <li>Distinguishing buggy vs correct implementations</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:p,answer:r}}var Ge,So,$o,Ye,Co,Ve=F(async()=>{"use strict";Ge=B(H(),1);globalThis.pyodide||(globalThis.pyodide=await To());So=globalThis.pyodide,$o="q-bug-hunter-property-based-testing";Ye=[ee({id:"sort-1",name:"Inventory Sort",functionName:"sort_inventory"}),ee({id:"sort-2",name:"Ranked Queue Sort",functionName:"sort_ranked_queue"}),ee({id:"sort-3",name:"Metrics Sort",functionName:"sort_metrics"}),ee({id:"sort-4",name:"Schedule Sort",functionName:"sort_schedule"}),te({id:"rev-1",name:"Ticket Revenue",functionName:"compute_ticket_revenue"}),te({id:"rev-2",name:"Ad Revenue",functionName:"compute_ad_revenue"}),te({id:"rev-3",name:"Subscription Revenue",functionName:"compute_subscription_revenue"}),te({id:"rev-4",name:"Retail Revenue",functionName:"compute_retail_revenue"}),_e({id:"leap-1",name:"Billing Date Parser",functionName:"parse_billing_date"}),_e({id:"leap-2",name:"Report Date Parser",functionName:"parse_report_date"}),_e({id:"leap-3",name:"Schedule Date Parser",functionName:"parse_schedule_date"}),ye({id:"dedupe-1",name:"User Tag Dedupe",functionName:"dedupe_user_tags"}),ye({id:"dedupe-2",name:"Category Dedupe",functionName:"dedupe_categories"}),ye({id:"dedupe-3",name:"Topic Dedupe",functionName:"dedupe_topics"}),be({id:"page-1",name:"Feed Pagination",functionName:"paginate_feed"}),be({id:"page-2",name:"Search Pagination",functionName:"paginate_search"}),be({id:"page-3",name:"Invoice Pagination",functionName:"paginate_invoices"}),we({id:"avg-1",name:"Sensor Moving Average",functionName:"moving_avg_sensor"}),we({id:"avg-2",name:"Price Moving Average",functionName:"moving_avg_price"}),we({id:"avg-3",name:"Latency Moving Average",functionName:"moving_avg_latency"})];Co=String.raw`import datetime as _exam_dt
import random as _exam_random
import string as _exam_string
import sys as _exam_sys
import types as _exam_types

class _ExamAssumptionFailed(Exception):
  pass

class _ExamStrategy:
  def __init__(self, fn):
    self._fn = fn

  def draw(self, rng):
    return self._fn(rng)

class _ExamStrategiesModule(_exam_types.ModuleType):
  def integers(self, min_value=-100, max_value=100):
    min_value = -100 if min_value is None else int(min_value)
    max_value = 100 if max_value is None else int(max_value)
    if min_value > max_value:
      min_value, max_value = max_value, min_value
    return _ExamStrategy(lambda rng: rng.randint(min_value, max_value))

  def booleans(self):
    return _ExamStrategy(lambda rng: bool(rng.randint(0, 1)))

  def floats(self, min_value=-1000.0, max_value=1000.0, allow_nan=False, allow_infinity=False):
    min_value = -1000.0 if min_value is None else float(min_value)
    max_value = 1000.0 if max_value is None else float(max_value)
    if min_value > max_value:
      min_value, max_value = max_value, min_value
    def _draw(rng):
      value = rng.uniform(min_value, max_value)
      if not allow_nan and value != value:
        return 0.0
      if not allow_infinity and value in (float("inf"), float("-inf")):
        return 0.0
      return value
    return _ExamStrategy(_draw)

  def sampled_from(self, values):
    values = list(values)
    if not values:
      values = [None]
    return _ExamStrategy(lambda rng: values[rng.randrange(len(values))])

  def text(self, alphabet=None, min_size=0, max_size=12):
    alphabet = alphabet or (_exam_string.ascii_letters + _exam_string.digits)
    min_size = max(0, int(min_size or 0))
    max_size = max(min_size, int(max_size or min_size))
    alphabet = list(alphabet) if alphabet else list("abc")
    if not alphabet:
      alphabet = list("abc")
    def _draw(rng):
      size = rng.randint(min_size, max_size)
      return "".join(alphabet[rng.randrange(len(alphabet))] for _ in range(size))
    return _ExamStrategy(_draw)

  def lists(self, elements=None, min_size=0, max_size=10):
    elements = elements or self.integers()
    min_size = max(0, int(min_size or 0))
    max_size = max(min_size, int(max_size or min_size))
    return _ExamStrategy(lambda rng: [elements.draw(rng) for _ in range(rng.randint(min_size, max_size))])

  def tuples(self, *strategies):
    if not strategies:
      return _ExamStrategy(lambda rng: ())
    return _ExamStrategy(lambda rng: tuple(s.draw(rng) for s in strategies))

  def one_of(self, *strategies):
    if not strategies:
      return self.sampled_from([None])
    return _ExamStrategy(lambda rng: strategies[rng.randrange(len(strategies))].draw(rng))

  def dates(self, min_value=None, max_value=None):
    min_value = min_value or _exam_dt.date(1990, 1, 1)
    max_value = max_value or _exam_dt.date(2035, 12, 31)
    if min_value > max_value:
      min_value, max_value = max_value, min_value
    delta = (max_value - min_value).days
    return _ExamStrategy(lambda rng: min_value + _exam_dt.timedelta(days=rng.randint(0, delta)))

def _exam_assume(condition):
  if not condition:
    raise _ExamAssumptionFailed()

def _exam_settings(*args, **kwargs):
  max_examples = kwargs.get("max_examples")
  def _decorator(fn):
    if max_examples is not None:
      setattr(fn, "_exam_max_examples", int(max_examples))
    return fn
  return _decorator

def _exam_given(*given_args, **given_kwargs):
  def _decorator(fn):
    def _wrapped():
      examples = int(getattr(fn, "_exam_max_examples", 1000))
      attempts = 0
      successes = 0
      rng = _exam_random.Random(1337)
      while successes < examples and attempts < examples * 20:
        attempts += 1
        args = [s.draw(rng) for s in given_args]
        kwargs = {k: s.draw(rng) for k, s in given_kwargs.items()}
        try:
          fn(*args, **kwargs)
          successes += 1
        except _ExamAssumptionFailed:
          continue
        except Exception as exc:
          setattr(exc, "_exam_counterexample", {"args": args, "kwargs": kwargs, "attempt": attempts})
          raise
    _wrapped.__name__ = fn.__name__
    _wrapped.__doc__ = fn.__doc__
    _wrapped._is_exam_given = True
    return _wrapped
  return _decorator

_hypothesis_module = _exam_types.ModuleType("hypothesis")
_strategies_module = _ExamStrategiesModule("hypothesis.strategies")

_hypothesis_module.given = _exam_given
_hypothesis_module.settings = _exam_settings
_hypothesis_module.assume = _exam_assume
_hypothesis_module.strategies = _strategies_module
_hypothesis_module.HealthCheck = _exam_types.SimpleNamespace()

_exam_sys.modules["hypothesis"] = _hypothesis_module
_exam_sys.modules["hypothesis.strategies"] = _strategies_module
`});var Ze={};P(Ze,{default:()=>jo});import{html as No}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function Ke(o,t){return o[Math.floor(t()*o.length)]}function Oo(o,t){let e=o.length;if(!e||e!==t.length)return 0;let s=o.reduce((l,d)=>l+d,0)/e,a=t.reduce((l,d)=>l+d,0)/e,r=0,p=0,n=0;for(let l=0;l<e;l++){let d=o[l]-s,i=t[l]-a;r+=d*i,p+=d*d,n+=i*i}return p===0||n===0?0:r/Math.sqrt(p*n)}async function Fo(o,t,e){let s=Math.max(1,Number(t)||1),a=Array.from({length:o.length}),r=0;async function p(){for(;;){let l=r;if(l>=o.length)return;r+=1,a[l]=await e(o[l],l)}}let n=Array.from({length:Math.min(s,o.length)},()=>p());return await Promise.all(n),a}async function Po({check:o,output:t,token:e}){let s="You are a strict binary evaluator. Decide whether the answer to the check question is YES by reading the candidate output only. Respond with exactly one token: YES or NO.",a=`Check question:
${o}

Candidate output:
${t}

Answer YES or NO only.`;for(let r=0;r<2;r++){let p=await fetch("https://aipipe.org/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:Lo,temperature:0,messages:[{role:"system",content:s},{role:"user",content:a}]})});if(!p.ok){let d=await p.text();if(r===0)continue;throw new Error(`AIPipe judge call failed (${p.status}): ${d.slice(0,200)}`)}let l=((await p.json()).choices?.[0]?.message?.content||"").trim().toUpperCase();if(l.startsWith("YES"))return 1;if(l.startsWith("NO"))return 0;if(r===1)throw new Error(`Judge returned non-binary output: ${JSON.stringify(l)}`)}return 0}async function jo({user:o,weight:t=1.25}){let e="q-binary-eval-rubric",s="Build a Binary Eval Rubric",a=(0,Xe.default)(`${o.email}#${e}`),r=Ke(Object.keys(Je),a),p=Je[r],n=Ke(Do,a),l=p.hiddenExamples,d=l.map(f=>f.label),i=n*l.length,u=8,m=async f=>{let w=(f||"").split(/\r?\n/).map(E=>E.trim()).filter(Boolean);if(w.length!==n)throw new Error(`You must submit exactly ${n} binary checks, one per line. You submitted ${w.length}.`);for(let E=0;E<w.length;E++){let I=w[E];if(!I.endsWith("?"))throw new Error(`Line ${E+1} must end with '?'.`);if(I.length<24)throw new Error(`Line ${E+1} is too short. Write a complete, specific question.`)}let _=w.map(E=>E.toLowerCase());if(new Set(_).size!==_.length)throw new Error("Duplicate checks detected. Each line must be meaningfully different.");globalThis.aiPipeToken||(globalThis.aiPipeToken=prompt("Enter your AI Pipe Token"));let T=globalThis.aiPipeToken;if(!T||!T.trim())throw new Error("AI Pipe token is required to evaluate your rubric.");let x=[];w.forEach((E,I)=>{l.forEach((M,q)=>{x.push({check:E,checkIndex:I,exIndex:q,output:M.output})})});let g=await Fo(x,u,async E=>{let I=await Po({check:E.check,output:E.output,token:T});return{checkIndex:E.checkIndex,exIndex:E.exIndex,pred:I}}),v=Array.from({length:w.length},()=>Array(l.length).fill(0));for(let E of g)v[E.checkIndex][E.exIndex]=E.pred;let S=w.map((E,I)=>{let M=v[I],q=M.every(R=>R===1),N=M.every(R=>R===0),D=q||N,C=Oo(M,d),b=!D&&C>.7;return{check:E,corr:C,degenerate:D,pass:b,yesRate:M.reduce((R,L)=>R+L,0)/M.length}}),h=S.filter(E=>E.pass).length,k=h/S.length,A=[...S].sort((E,I)=>I.corr-E.corr),$=A[0],y=A[A.length-1];if(console.info("Binary rubric eval results",{passedChecks:h,totalChecks:S.length,score:k,best:$,worst:y}),h<4){let E=S.map((I,M)=>{let q=I.degenerate?"degenerate":"non-degenerate";return`#${M+1} corr=${I.corr.toFixed(2)}, ${q}, yesRate=${(I.yesRate*100).toFixed(0)}%`}).join(`
`);throw new Error(`Insufficient calibrated checks: ${h}/${S.length} passed (need at least 4).

Highest-correlation check (corr=${$.corr.toFixed(2)}): ${$.check}
Lowest-correlation check (corr=${y.corr.toFixed(2)}): ${y.check}

Per-check diagnostics:
${E}`)}return!0},c=No`
    <div class="mb-3">
      <p><strong>Architecture:</strong> Client-side with AIPipe (LLM-as-judge validating the judge).</p>
      <p>
        You're building an automated grader for <strong>${p.taskDescription}</strong>. An LLM will evaluate
        student submissions using your rubric.
      </p>

      <p>
        The problem with vague rubrics: "Is this code good?" gives inconsistent results.
        Your job is to decompose quality into binary (YES/NO) checks that an LLM can answer reliably.
      </p>

      <p><strong>Your task:</strong></p>
      <ol>
        <li>Examine the 3 example outputs below (marked GOOD, MEDIOCRE, POOR).</li>
        <li>Write exactly <strong>${n}</strong> binary checks that collectively distinguish good from poor work.</li>
        <li>Each check must be answerable YES/NO by reading the output alone.</li>
        <li>Format: one check per line, as a complete question ending in "?".</li>
      </ol>

      <p><strong>Example outputs:</strong></p>
      <pre><code>GOOD: ${p.goodExample}

MEDIOCRE: ${p.mediocreExample}

POOR: ${p.poorExample}</code></pre>


      <div class="alert alert-warning" role="alert">
        <strong>Before you start:</strong> evaluating this answer will make about <strong>${i}
        AIPipe API calls</strong> (${n} checks x ${l.length} hidden examples), with up to
        <strong>${u}</strong> calls in parallel for speed. Make sure you have enough credits.
        Recommended: attempt this question near the end of the assignment after finishing lower-cost questions.
      </div>

      <p>Submit your ${n} binary checks, one per line.</p>

      <label for="${e}" class="form-label">Binary rubric checks</label>
      <textarea id="${e}" name="${e}" class="form-control font-monospace" rows="12"
        placeholder="Does the output explicitly state at least one interpretation beyond raw numbers?\nDoes the output mention at least one surprising or non-obvious finding?\n..."></textarea>

      <small class="form-text text-muted">
        Evaluation: each check is run against 20 hidden examples; a check passes if correlation with ground truth is
        greater than 0.7 and it is not degenerate (always YES or always NO). Threshold: at least 4 checks must pass.
        This validator executes calls concurrently to reduce waiting time.
      </small>
    </div>
  `;return{id:e,title:s,weight:t,question:c,answer:m}}var Xe,Do,Lo,Je,et=F(()=>{"use strict";Xe=B(H(),1),Do=[5,6,7],Lo="gpt-4.1-mini",Je={data_analysis_narrative:{taskDescription:"a short data analysis narrative for a dashboard report",goodExample:"Revenue rose 14% QoQ (from 4.2M to 4.8M), but the surprising result is that 71% of growth came from the smallest region, South-East, after only a 9% increase in ad spend. This suggests channel efficiency improved, not just volume. Churn also fell from 6.1% to 4.8%, which likely amplified net revenue impact.",mediocreExample:"Revenue increased to 4.8M and churn decreased to 4.8%. South-East contributed most growth. Ad spend changed in the quarter.",poorExample:"Q1 revenue 4.8M, Q0 revenue 4.2M. Churn 4.8%. South-East 71%. Ad spend +9%.",hiddenExamples:[{output:"AOV increased 11%, but repeat purchase rate was flat, so growth likely came from pricing rather than loyalty. The surprising part is that refunds dropped despite higher basket size.",label:1},{output:"Sales 1.2M Jan, 1.3M Feb, 1.4M Mar. Margin 28%, 29%, 30%.",label:0},{output:"Traffic rose only 3%, yet conversions jumped 18%, indicating funnel quality improvements. Most uplift came from returning users, not new campaigns.",label:1},{output:"North: 240, South: 310, East: 280, West: 260.",label:0},{output:"Although total tickets fell 9%, resolution time worsened by 12%. This trade-off suggests prioritization favored volume over depth.",label:1},{output:"Users 80k. Sessions 220k. Bounce 42%.",label:0},{output:"The biggest surprise is that premium plan downgrades fell after a price increase, implying price was not the primary churn driver.",label:1},{output:"CTR 2.4%. CPC 0.91. Spend 62k.",label:0},{output:"Even with fewer signups, MRR expanded because ARPU increased across all cohorts; cohort C showed the strongest retention recovery.",label:1},{output:"MRR up. ARPU up. Retention up.",label:0},{output:"Conversion improved mainly on mobile while desktop remained flat, indicating the redesign impact was device-specific rather than universal.",label:1},{output:"Mobile 3.1%. Desktop 2.9%.",label:0},{output:"Inventory stockouts dropped 40%, and this coincided with a 7-point NPS improvement, suggesting availability drove satisfaction gains.",label:1},{output:"Stockouts 12 to 7. NPS 31 to 38.",label:0},{output:"Support volume dipped slightly, but first-contact resolution jumped sharply, implying agent playbooks improved effectiveness.",label:1},{output:"FCR 68 to 79. Tickets 10,200 to 9,900.",label:0},{output:"Paid social spend was flat, yet qualified leads rose 22%, a surprising efficiency gain likely tied to improved audience filters.",label:1},{output:"Leads 1400 to 1710. Spend unchanged.",label:0},{output:"The key takeaway is not the average growth but the variance collapse across regions, which indicates more predictable execution.",label:1},{output:"Region variance lower this quarter.",label:0}]},sql_query_quality:{taskDescription:"SQL query quality for an analytics task",goodExample:`WITH clean_orders AS (
  SELECT order_id, customer_id, COALESCE(total_amount, 0) AS total_amount, order_date
  FROM orders
  WHERE order_date >= DATE '2025-01-01'
), customer_spend AS (
  SELECT customer_id, SUM(total_amount) AS spend
  FROM clean_orders
  GROUP BY customer_id
)
SELECT customer_id, spend
FROM customer_spend
WHERE spend > 500
ORDER BY spend DESC;`,mediocreExample:`SELECT customer_id, SUM(total_amount) AS spend
FROM orders
WHERE order_date >= '2025-01-01'
GROUP BY customer_id
ORDER BY spend DESC;`,poorExample:"SELECT * FROM orders;",hiddenExamples:[{output:"WITH base AS (SELECT customer_id, COALESCE(amount,0) amount FROM payments) SELECT customer_id, SUM(amount) total FROM base GROUP BY customer_id;",label:1},{output:"SELECT * FROM payments WHERE created_at > '2025-01-01';",label:0},{output:"WITH cte AS (SELECT id, COALESCE(status,'unknown') status FROM tickets) SELECT status, COUNT(*) FROM cte GROUP BY status;",label:1},{output:"SELECT id, user_id, status, created_at, updated_at FROM tickets;",label:0},{output:"WITH filtered AS (SELECT order_id, customer_id FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days') SELECT customer_id, COUNT(*) cnt FROM filtered GROUP BY customer_id;",label:1},{output:"SELECT * FROM users u JOIN orders o ON u.id=o.user_id;",label:0},{output:"WITH revenue AS (SELECT region, SUM(COALESCE(revenue,0)) r FROM sales GROUP BY region) SELECT region, r FROM revenue ORDER BY r DESC;",label:1},{output:"SELECT region, revenue FROM sales;",label:0},{output:"WITH sessions AS (SELECT user_id, COALESCE(duration_sec,0) d FROM app_sessions) SELECT user_id, AVG(d) avg_d FROM sessions GROUP BY user_id;",label:1},{output:"SELECT * FROM app_sessions WHERE duration_sec > 0;",label:0},{output:"WITH x AS (SELECT product_id, COALESCE(stock,0) stock FROM inventory) SELECT product_id FROM x WHERE stock = 0;",label:1},{output:"SELECT product_id, stock FROM inventory;",label:0},{output:"WITH base AS (SELECT DATE(order_ts) d, COALESCE(total,0) total FROM orders) SELECT d, SUM(total) FROM base GROUP BY d;",label:1},{output:"SELECT * FROM orders ORDER BY order_ts DESC;",label:0},{output:"WITH normalized AS (SELECT customer_id, COALESCE(country,'UNKNOWN') country FROM customers) SELECT country, COUNT(*) FROM normalized GROUP BY country;",label:1},{output:"SELECT customer_id, country FROM customers;",label:0},{output:"WITH recent AS (SELECT id, COALESCE(score,0) score FROM reviews WHERE created_at >= CURRENT_DATE - INTERVAL '90 days') SELECT AVG(score) FROM recent;",label:1},{output:"SELECT * FROM reviews;",label:0},{output:"WITH t AS (SELECT user_id, COALESCE(amount,0) amount FROM txns) SELECT user_id, SUM(amount) total_amount FROM t GROUP BY user_id HAVING SUM(amount) > 1000;",label:1},{output:"SELECT user_id, amount FROM txns;",label:0}]},api_documentation:{taskDescription:"API endpoint documentation quality",goodExample:`POST /v1/invoices
Content-Type: application/json
Authorization: Bearer <token>

Example request:
{"customer_id":"cus_123","amount":1999}

201 Created: returns invoice object
400 Bad Request: invalid payload
401 Unauthorized: missing/invalid token
429 Too Many Requests: rate limit exceeded`,mediocreExample:`POST /v1/invoices
Send customer_id and amount in JSON. Returns invoice on success. May return errors if request is invalid.`,poorExample:"Create invoice endpoint. It creates invoices.",hiddenExamples:[{output:`GET /v1/users/{id}
Content-Type: application/json
Example request: curl -H 'Authorization: Bearer <token>' https://api.example.com/v1/users/42
200 OK
404 Not Found`,label:1},{output:"Endpoint to fetch user by id. Returns user data.",label:0},{output:`PATCH /v1/orders/{id}
Content-Type: application/json
Example request body: {"status":"shipped"}
200 OK
400 Bad Request
401 Unauthorized`,label:1},{output:"PATCH /v1/orders updates an order status.",label:0},{output:`POST /v1/login
Content-Type: application/json
Example request: {"email":"a@b.com","password":"..."}
200 OK
401 Unauthorized
429 Too Many Requests`,label:1},{output:"Login API for users.",label:0},{output:`DELETE /v1/projects/{id}
Content-Type: application/json
Example request: curl -X DELETE ...
204 No Content
401 Unauthorized
404 Not Found`,label:1},{output:"Delete project endpoint, returns success when deleted.",label:0},{output:`PUT /v1/profile
Content-Type: application/json
Example request: {"display_name":"Nina"}
200 OK
400 Bad Request`,label:1},{output:"Update profile API.",label:0},{output:`POST /v1/upload
Content-Type: multipart/form-data
Example request: form-data file=@report.pdf
201 Created
415 Unsupported Media Type`,label:1},{output:"Upload endpoint for files.",label:0},{output:`GET /v1/search?q=term
Content-Type: application/json
Example request: curl '.../search?q=shirt'
200 OK
400 Bad Request`,label:1},{output:"Search endpoint for products.",label:0},{output:`POST /v1/refunds
Content-Type: application/json
Example: {"payment_id":"pay_123","amount":500}
201 Created
400 Bad Request
409 Conflict`,label:1},{output:"Refund API endpoint.",label:0},{output:`GET /v1/metrics
Content-Type: application/json
Example request: curl -H 'Authorization: Bearer <token>' ...
200 OK
401 Unauthorized`,label:1},{output:"Metrics endpoint that returns current metrics.",label:0}]},prompt_engineering:{taskDescription:"prompt quality for extracting structured output",goodExample:`Extract entities from the input text. Return ONLY valid JSON in this schema: {"people": string[], "orgs": string[], "locations": string[]}.
If input is empty, return {"people":[],"orgs":[],"locations":[]}.
Example:
Input: 'Ada from OpenAI moved to London'
Output: {"people":["Ada"],"orgs":["OpenAI"],"locations":["London"]}`,mediocreExample:"Extract entities and return JSON with people, orgs, and locations. Keep it concise.",poorExample:"Find entities in text.",hiddenExamples:[{output:`Classify support tickets. Output format must be JSON: {"label":"billing|bug|feature|access"}. Example: Input:'charged twice' -> Output:{"label":"billing"}.`,label:1},{output:"Classify support tickets into categories.",label:0},{output:"Summarize in exactly 3 bullet points. If input is empty, output: [] . Return JSON array only.",label:1},{output:"Summarize the text briefly.",label:0},{output:'Extract fields and return ONLY JSON {"name":string,"email":string}. Example included. If missing fields, use empty string.',label:1},{output:"Extract name and email from the text.",label:0},{output:"Return CSV with headers id,title,priority. Provide one example row in the prompt. Handle empty input by returning headers only.",label:1},{output:"Turn this into CSV.",label:0},{output:`Translate to French. Output format: JSON {"translation":string}. If source is empty, translation must be ''.`,label:1},{output:"Translate this text to French.",label:0},{output:"Given reviews, return sentiment labels as JSON list. Include an input-output example and enforce one label per review.",label:1},{output:"Label sentiment for reviews.",label:0},{output:"Extract invoice fields. Output schema required. Include explicit null handling and an example with missing tax.",label:1},{output:"Parse invoice details from text.",label:0},{output:"Generate SQL safely. Return ONLY SQL code block, include assumptions section, and define empty-input behavior.",label:1},{output:"Write SQL for the request.",label:0},{output:"Entity linking task with exact response format and edge-case instructions for empty/noisy input; includes one worked example.",label:1},{output:"Do entity linking for this text.",label:0},{output:"Provide regex extraction output as JSON with keys matches and count; include one positive and one negative example.",label:1},{output:"Extract values using regex.",label:0}]}}});var nt={};P(nt,{default:()=>Wo});import{html as oe}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function Ho(o){let t=(0,tt.default)(`${o}#${ot}`),e=(d,i)=>d+t()*(i-d),s=["gpt-4o","gpt-4.1","gpt-4.1-mini","gpt-5-mini"],a=21,r={"gpt-4o":Math.round(e(-2.5,-1)*100)/100,"gpt-4.1":Math.round(e(-2,-.5)*100)/100,"gpt-4.1-mini":Math.round(e(-3.5,-2)*100)/100,"gpt-5-mini":Math.round(e(-1.5,.5)*100)/100},p=[],n=["Step-by-step.","Act as Expert.","JSON Output.","No yapping.","Few-shot (3).","Chain of Thought.","Explain reasoning.","Professional tone.","Strict format.","Avoid jargon.","Summary first.","Double check.","Self-reflect.","Contextualize.","Verify logic.","Brevity.","Analogies.","Citations.","Persona: Mentor.","Persona: Auditor.","JSON schema."];for(let d=0;d<a;d++){let i={};s.forEach(u=>{let m=e(-.4,1.4);u==="gpt-5-mini"&&d<6&&(m-=.6),u==="gpt-4.1-mini"&&d>15&&(m+=.5),i[u]=Math.round(m*100)/100}),p.push({id:`I${d+1}`,text:n[d],word_count:Math.floor(e(5,18)),contribs:i})}let l=[];for(let d=0;d<50;d++){let i=Math.floor(t()*a),u=Math.floor(t()*a);if(i===u)continue;let m=[i+1,u+1].sort((c,f)=>c-f).map(c=>`I${c}`);l.find(c=>c.ids[0]===m[0]&&c.ids[1]===m[1])||l.push({ids:m,bonus:Math.round(e(-.7,.7)*100)/100})}return{instructions:p,interactions:l,biases:r,models:s,meanTarget:.97,floorTarget:.92}}function Uo(o,t){let e=new Set(o),s=0,a={};t.models.forEach(l=>{let d=t.biases[l];t.instructions.forEach(i=>{e.has(i.id)&&(d+=i.contribs[l],l===t.models[0]&&(s+=i.word_count))}),t.interactions.forEach(i=>{e.has(i.ids[0])&&e.has(i.ids[1])&&(d+=i.bonus)}),a[l]=Bo(d)});let r=Object.values(a),p=r.reduce((l,d)=>l+d,0)/r.length,n=Math.min(...r);return{meanAcc:p,floorAcc:n,metrics:a,wordCount:s}}async function Wo({user:o,weight:t=1}){let e=ot,s="The Multi-Model Robustness Audit",a=`_robustPrompt_v4_${o.email}`;globalThis[a]||(globalThis[a]=Ho(o.email));let r=globalThis[a],p=async l=>{let d=String(l??"").trim();if(!d)throw new Error("Enter submission.");let i=/^(.*);\s*(\d+);\s*(\d+\.\d+);\s*(\d+\.\d+)$/,u=d.match(i);if(!u)throw new Error("Format: IDs; WC; Mean%; Floor%");let m=u[1].split(",").map(h=>h.trim()).filter(Boolean),{meanAcc:c,floorAcc:f,wordCount:w}=Uo(m,r),_=parseInt(u[2]),T=parseFloat(u[3])/100,x=parseFloat(u[4])/100;if(w!==_)throw new Error("WC mismatch!");if(Math.abs(c-T)>5e-4)throw new Error("Mean match failed!");if(Math.abs(f-x)>5e-4)throw new Error("Floor match failed!");if(c<r.meanTarget||f<r.floorTarget)throw new Error("Targets not met.");let g=`_robustPrompt_opt_v4_${o.email}`;if(!globalThis[g]){let h=r.instructions.length,k=r.instructions,A=10,$=h-A,y=[],E=[],I=[];r.interactions.forEach(b=>{let R=parseInt(b.ids[0].slice(1))-1,L=parseInt(b.ids[1].slice(1))-1,W=1<<R|1<<L;R<A&&L<A?y.push({mask:W,bonus:b.bonus}):R>=A&&L>=A?E.push({mask:W>>A,bonus:b.bonus}):I.push({mask:W,bonus:b.bonus})});let M=(b,R,L,W)=>{let V=new Float32Array(1<<L),J=new Int32Array(1<<L);for(let U=0;U<1<<L;U++){for(let j=0;j<L;j++)U>>j&1&&(V[U]+=k[R+j].contribs[b],b==="gpt-4o"&&(J[U]+=k[R+j].word_count));W.forEach(j=>{(U&j.mask)===j.mask&&(V[U]+=j.bonus)})}return{lo:V,wc:J}},q={},N={};r.models.forEach(b=>{q[b]=M(b,0,A,y),N[b]=M(b,A,$,E)});let D=1/0,C=0;for(let b=0;b<1<<h;b++){let R=b&1023,L=b>>10,W=q["gpt-4o"].wc[R]+N["gpt-4o"].wc[L];if(W>D)continue;let V=0;I.forEach(Y=>{(b&Y.mask)===Y.mask&&(V+=Y.bonus)});let J=0,U=2;for(let Y of r.models){let ce=1/(1+Math.exp(-(r.biases[Y]+q[Y].lo[R]+N[Y].lo[L]+V)));J+=ce,ce<U&&(U=ce)}let j=J/4;j>=r.meanTarget&&U>=r.floorTarget&&(W<D?(D=W,C=j):W===D&&j>C&&(C=j))}globalThis[g]={bestWC:D,bestMean:C}}let{bestWC:v,bestMean:S}=globalThis[g];if(w>v)throw new Error(`Not optimal WC (${v})!`);if(w===v&&c<S-1e-4)throw new Error("Better Mean exists!");return!0},n=oe`
    <div class="mb-3">
      <h2 id="${e}">${s}</h2>
      <p class="small">Identify the <strong>shortest prompt</strong> (min Word Count) achieving <strong>Macro-Mean ≥${r.meanTarget*100}%</strong> and <strong>Model Floor ≥${r.floorTarget*100}%</strong> across 4 LLMs.</p>
      
      <div class="row g-2 mt-2">
        <div class="col-md-9 border-end">
          <h6 class="small fw-bold border-bottom">Instruction Matrix (Sensitivities)</h6>
          <div style="height: 220px; overflow-y: auto;">
            <table class="table table-sm table-striped m-0 small" style="font-size: 0.75rem">
              <thead class="sticky-top"><tr><th>ID</th><th>Fragment</th><th>WC</th><th>4o</th><th>4.1</th><th>4.1m</th><th>5m</th></tr></thead>
              <tbody>${r.instructions.map(l=>oe`<tr><td><code>${l.id}</code></td><td class="text-muted text-nowrap">${l.text}</td><td>${l.word_count}</td><td>${l.contribs["gpt-4o"]}</td><td>${l.contribs["gpt-4.1"]}</td><td>${l.contribs["gpt-4.1-mini"]}</td><td>${l.contribs["gpt-5-mini"]}</td></tr>`)}</tbody>
            </table>
          </div>
        </div>
        <div class="col-md-3">
          <h6 class="small fw-bold border-bottom">Pair Bonuses</h6>
          <div style="height: 220px; overflow-y: auto;">
            <table class="table table-sm m-0 small" style="font-size: 0.7rem">
              <tbody>${r.interactions.map(l=>oe`<tr><td><code>${l.ids.join(",")}</code></td><td>${l.bonus}</td></tr>`)}</tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-2 p-2 border rounded small d-flex flex-wrap gap-2">
        ${Object.entries(r.biases).map(([l,d])=>oe`<span class="badge bg-secondary font-monospace">${l}: ${d}</span>`)}
      </div>

      <label for="${e}" class="form-label mt-3 small fw-bold">Submit: IDs; WC; Mean%; Floor%</label>
      <input type="text" id="${e}" name="${e}" class="form-control form-control-sm font-monospace" placeholder="I1, I5; 18; 97.45; 93.12" required />
    </div>
  `;return{id:e,title:s,weight:t,question:n,answer:p}}var tt,ot,Bo,rt=F(()=>{"use strict";tt=B(H(),1),ot="q-minimal-prompt-robustness";Bo=o=>1/(1+Math.exp(-o))});var st={};P(st,{default:()=>Yo});import{html as Q}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function Yo({user:o,weight:t=1}){let e=zo,s="The Token Miser",a=(0,at.default)(`${o.email}#${e}`),r={pos:{title:"Part of Speech Tagging",description:Q`Identify the <strong>Part of Speech (POS)</strong> of the <strong>bolded word</strong> in the user message.`,categories:["Noun","Verb","Adjective","Adverb","Preposition"],pool:[{input:"The ball is perfectly **round**.",output:"Adjective"},{input:"The boxer won the third **round**.",output:"Noun"},{input:"Please **round** the number to two decimals.",output:"Verb"},{input:"I'll be **round** in a minute.",output:"Adjective"},{input:"She has a scarf **round** her neck.",output:"Preposition"},{input:"She injured her **back** lifting boxes.",output:"Noun"},{input:"Please step **back** from the edge.",output:"Adverb"},{input:"They used the **back** entrance.",output:"Adjective"},{input:"The investors will **back** the new startup.",output:"Verb"},{input:"She looks **well** after her recovery.",output:"Adjective"},{input:"He performed the task **well**.",output:"Adverb"},{input:"They dug a **well** to reach groundwater.",output:"Noun"},{input:"The movie was **well**-received by critics.",output:"Adverb"},{input:"She is a **fast** swimmer.",output:"Adjective"},{input:"The car sped **fast** down the highway.",output:"Adverb"},{input:"He decided to **fast** during Ramadan.",output:"Verb"},{input:"The religious **fast** lasted three days.",output:"Noun"},{input:"You have the **right** answer.",output:"Adjective"},{input:"Freedom of speech is a basic **right**.",output:"Noun"},{input:"Turn **right** at the traffic light.",output:"Adverb"},{input:"He vowed to **right** the injustice.",output:"Verb"},{input:"She walked **down** the hill slowly.",output:"Preposition"},{input:"The **down** jacket kept him warm.",output:"Adjective"},{input:"Prices went **down** last month.",output:"Adverb"},{input:"He was feeling **down** after the loss.",output:"Adjective"},{input:"The team scored a first **down**.",output:"Noun"},{input:"The lake was completely **still** at dawn.",output:"Adjective"},{input:"She is **still** waiting for a reply.",output:"Adverb"},{input:"The forest **still** was broken by a snap.",output:"Noun"},{input:"He took a breath to **still** his racing heart.",output:"Verb"}]},sentiment:{title:"Sentiment Analysis",description:Q`Determine the <strong>sentiment</strong> of the provided text.`,categories:["Positive","Negative","Neutral"],pool:[{input:"I absolutely loved the movie!",output:"Positive"},{input:"It was a total waste of time.",output:"Negative"},{input:"The weather is okay today.",output:"Neutral"},{input:"That was the best meal I've ever had.",output:"Positive"},{input:"I've had better coffee.",output:"Negative"},{input:"The meeting is at 3 PM.",output:"Neutral"},{input:"Excellent service and friendly staff.",output:"Positive"},{input:"The product failed after two days.",output:"Negative"},{input:"The book has 300 pages.",output:"Neutral"},{input:"Highly recommended for families.",output:"Positive"},{input:"I wouldn't go there again.",output:"Negative"},{input:"They sell shoes and bags.",output:"Neutral"},{input:"What a fantastic performance!",output:"Positive"},{input:"The sound quality was poor.",output:"Negative"},{input:"The train departs every hour.",output:"Neutral"},{input:"I'm so happy with this purchase.",output:"Positive"},{input:"This is the worst experience ever.",output:"Negative"},{input:"The sky is blue.",output:"Neutral"},{input:"Everything went perfectly.",output:"Positive"},{input:"It broke within an hour.",output:"Negative"},{input:"The water was lukewarm.",output:"Neutral"}]},topic:{title:"Topic Classification",description:Q`Classify the <strong>topic</strong> of the message.`,categories:["Politics","Sports","Tech","Entertainment"],pool:[{input:"The senator signed the new bill today.",output:"Politics"},{input:"The Lakers won the championship game.",output:"Sports"},{input:"Apple announced a new iPhone model.",output:"Tech"},{input:"The latest blockbuster movie broke records.",output:"Entertainment"},{input:"The prime minister met with world leaders.",output:"Politics"},{input:"The Olympics will be held in Paris.",output:"Sports"},{input:"Nvidia's GPU sales are soaring.",output:"Tech"},{input:"The singer released a new album.",output:"Entertainment"},{input:"The election results were unexpected.",output:"Politics"},{input:"The tennis tournament starts on Monday.",output:"Sports"},{input:"AI research is advancing rapidly.",output:"Tech"},{input:"The broadway show was sold out.",output:"Entertainment"},{input:"Congress debated the budget proposal.",output:"Politics"},{input:"The quarterback threw a touchdown pass.",output:"Sports"},{input:"A new security vulnerability was found.",output:"Tech"},{input:"The movie was nominated for five Oscars.",output:"Entertainment"},{input:"The supreme court issued a ruling.",output:"Politics"},{input:"He scored a goal in the final minute.",output:"Sports"},{input:"The software update fixed several bugs.",output:"Tech"},{input:"The concert was cancelled due to rain.",output:"Entertainment"}]},urgency:{title:"Urgency Detection",description:Q`Determine the <strong>urgency</strong> level of the customer request.`,categories:["High","Medium","Low"],pool:[{input:"My server is down and I am losing money!",output:"High"},{input:"I have a small question about the billing cycle.",output:"Low"},{input:"The website is a bit slow today.",output:"Medium"},{input:"Emergency: leaked credentials in the logs!",output:"High"},{input:"How do I change my password?",output:"Low"},{input:"I can't log in since the update this morning.",output:"High"},{input:"The logo looks slightly off-center on mobile.",output:"Low"},{input:"The payment gateway is returning 500 errors.",output:"High"},{input:"Would it be possible to add a dark mode?",output:"Low"},{input:"Our production database is corrupted.",output:"High"},{input:"I found a typo in the documentation.",output:"Low"},{input:"The API is occasionally timing out.",output:"Medium"},{input:"A user reported a bug in the search filter.",output:"Medium"},{input:"I need to upgrade my subscription next month.",output:"Low"},{input:"URGENT: Cannot process any orders!",output:"High"},{input:"The formatting on the invoice is incorrect.",output:"Low"},{input:"I'm seeing a flickering screen on the dashboard.",output:"Medium"},{input:"Critical security patch needed for the portal.",output:"High"},{input:"Can someone help me with the export feature?",output:"Low"},{input:"The site is undergoing a DDoS attack right now!",output:"High"}]}},p=Object.keys(r),n=Math.floor(a()*p.length),l=p[n],d=r[l],u=d.pool.slice().sort(()=>a()-.5).slice(0,10),m=async f=>{let w=String(f??"").trim();if(!w)throw new Error("Please enter your prompt.");let _=w.split(/\s+/).filter(Boolean);if(_.length>4)throw new Error(`Your prompt is too long (${_.length} words). It must be at most 4 words.`);if(!globalThis.aiPipeToken&&(globalThis.aiPipeToken=prompt("Enter your AIPipe.org token:"),!globalThis.aiPipeToken))throw new Error("AIPipe token is required.");let T=await Promise.all(u.map(async g=>{let v=await fetch("https://aipipe.org/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${globalThis.aiPipeToken}`},body:JSON.stringify({model:"gpt-4.1-mini",messages:[{role:"system",content:w},{role:"user",content:g.input}],temperature:0,max_tokens:5})});if(!v.ok){let $=await v.text();throw new Error(`AIPipe error: ${$}`)}let h=(await v.json()).choices?.[0]?.message?.content?.trim()||"",k=h.replace(/[^a-zA-Z]/g,"").toLowerCase(),A=g.output.toLowerCase();return{input:g.input,expected:g.output,actual:h,isCorrect:k===A}})),x=T.filter(g=>g.isCorrect).length;if(x<8){let g=T.filter(h=>!h.isCorrect),v=g.slice(0,3).map(h=>`"${h.input}" -> Expected "${h.expected}", got "${h.actual}"`).join(`
`),S=g.length>3?`
...and ${g.length-3} more.`:"";throw new Error(`Accuracy too low: ${x}/10 correct (need 8/10).
Some failures:
${v}${S}`)}return!0},c=Q`
    <div class="mb-3">
      <h2 id="${e}">${s}: ${d.title}</h2>

      <p>
        At <strong>Brevity Systems</strong>, we've optimized our costs and speed. 
        Your manager needs a prompt that is <strong>concise</strong>, <strong>fast</strong>, and <strong>robust</strong>.
      </p>

      <h3>The Challenge</h3>
      <p>
        ${d.description}
        Your prompt must be <strong>4 words or fewer</strong>.
      </p>
      
      <p>Possible categories: ${d.categories.map((f,w)=>Q`<code>${f}</code>${w<d.categories.length-1?", ":""}`)}.</p>

      <h3>Evaluation</h3>
      <p>
        Your prompt will be tested against <strong>10 randomized cases</strong> (running in parallel for speed). 
        You must get at least <strong>8 out of 10 correct</strong> to pass.
      </p>

      <div class="alert alert-warning">
        <strong>Constraints:</strong>
        <ul class="mb-0">
          <li><strong>Word Limit:</strong> Maximum 4 words.</li>
          <li><strong>Output Format:</strong> Must return <em>only</em> the category name (e.g., "${d.categories[0]}").</li>
          <li><strong>Model:</strong> <code>gpt-4.1-mini</code>.</li>
        </ul>
      </div>

      <h3>Sample of Your Test Cases</h3>
      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr><th>Input Context</th><th>Expected Output</th></tr>
        </thead>
        <tbody>
          ${u.slice(0,5).map(f=>Q`
            <tr><td>${f.input}</td><td><code>${f.output}</code></td></tr>
          `)}
          <tr><td colspan="2" class="text-center text-muted small">... [+5 more cases running in parallel]</td></tr>
        </tbody>
      </table>

      <label for="${e}" class="form-label mt-2">
        <strong>Enter your Short Prompt (Max 4 words):</strong>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        placeholder="e.g. Classify as ${d.categories[0]}"
        required
      />
      <div class="form-text">
        Requires an <a href="https://aipipe.org/" target="_blank">AIPipe</a> token. 
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Parallel evaluation workflows</li>
        <li>Prompt robustness and generalizability</li>
        <li>Instruction steering under constraints</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:c,answer:m}}var at,zo,it=F(()=>{"use strict";at=B(H(),1),zo="q-token-miser-prompt"});var dt={};P(dt,{default:()=>Ko});import{html as Go}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{loadPyodide as Qo}from"https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";function lt(o){let t=new Blob([o],{type:"text/csv"});return URL.createObjectURL(t)}async function Jo(o){let t=`${o?.email??""}#${ct}`,e=`_contractData_${t}`;if(!globalThis[e]){ne.globals.set("EXAM_SEED",t),await ne.runPythonAsync(Vo);let s=ne.globals.get("__exam_gen__");globalThis[e]=JSON.parse(String(s))}return globalThis[e]}async function Ko({user:o,weight:t=1}){let e=ct,s="Data Contract Violation Detector",a=await Jo(o),r=lt(a.day1_csv),p=lt(a.day2_csv),n=String(o?.email??"student").replace(/[^a-z0-9]/gi,"_"),l=a.correct_answer,d=u=>{let m=String(u??"").trim();if(!m)throw new Error("Please enter a number.");if(!/^\d+$/.test(m))throw new Error("Answer must be a whole number (e.g. 47).");if(parseInt(m,10)===l)return!0;let w=(parseInt(m,10)-l>0,"Your count is not correct");throw new Error(`Incorrect. ${w}`)},i=Go`
    <div class="mb-3">
      <h2 id="${e}">Data Contract Violation Detector</h2>

      <p>
        A data pipeline processes <strong>${a.domain}</strong> daily. The dataset below was generated on
        <strong>Day 1</strong> and passed all quality checks. A new batch arrived on <strong>Day 2</strong> —
        but something went wrong upstream and several violations were silently introduced.
      </p>

      <div class="d-flex gap-3 mb-3">
        <a href="${r}" download="${n}.day1.csv" class="btn btn-outline-primary btn-sm">
          ⬇ Download Day 1 (clean)
        </a>
        <a href="${p}" download="${n}.day2.csv" class="btn btn-outline-danger btn-sm">
          ⬇ Download Day 2 (corrupted)
        </a>
      </div>

      <h3>Your Task</h3>
      <p>
        Write a Python script that compares Day 2 against Day 1 and counts
        <strong>how many rows in Day 2 are anomalous</strong>.
        A row is anomalous if <em>at least one</em> of its column values breaks a rule derived from Day 1.
        Submit the count as a single integer.
      </p>

      <h3>Anomaly Detection Rules</h3>
      <p>
        For each column, derive a constraint from Day 1 and apply it to Day 2.
        Use a <strong>union of row indices</strong> across all columns — if a row is flagged by any
        column, count it once.
      </p>
      <table class="table table-sm table-bordered mt-2">
        <thead class="table-light">
          <tr><th>Column type (auto-detected)</th><th>Rule: flag a Day 2 row if …</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Any column with <strong>0 nulls</strong> in Day 1</td>
            <td>The Day 2 value is <code>null</code> / <code>NaN</code></td>
          </tr>
          <tr>
            <td><strong>Numeric</strong> column<br/><small class="text-muted">(>95 % of Day 1 values parse as numbers)</small></td>
            <td>The value is <strong>below Day 1 min</strong> or <strong>above Day 1 max</strong></td>
          </tr>
          <tr>
            <td><strong>Date</strong> column<br/><small class="text-muted">(>90 % of Day 1 values parse as dates; checked after numeric)</small></td>
            <td>The date is <strong>after today</strong></td>
          </tr>
          <tr>
            <td><strong>Categorical</strong> string column<br/><small class="text-muted">(≤ 20 distinct values in Day 1; checked last)</small></td>
            <td>The value <strong>did not appear</strong> anywhere in Day 1</td>
          </tr>
        </tbody>
      </table>
      <p class="text-muted small mt-1">
        Columns that are numeric are not additionally checked as date or categorical, and vice versa
        (rules are applied in the order above with early exit once a column type is determined).
      </p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>Load both CSVs with <code>pandas.read_csv()</code> and iterate over <code>day1.columns</code>.</li>
          <li>Use <code>pd.to_numeric(series, errors="coerce")</code> to detect numeric columns.</li>
          <li>Use <code>pd.to_datetime(series, errors="coerce")</code> to detect date columns.</li>
          <li>Use a Python <code>set()</code> to accumulate flagged row indices so each row is only counted once.</li>
          <li>Check <code>day1.describe()</code> and <code>day1.isnull().sum()</code> to understand the baseline.</li>
          <li><strong>The answer is a specific integer</strong> — your script should print it with <code>print(len(bad_rows))</code>.</li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Enter the number of anomalous rows you found in Day 2:</strong>
      </label>
      <input
        type="number"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width: 180px"
        min="0"
        placeholder="e.g. 47"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Loading and comparing two datasets with pandas</li>
        <li>Auto-detecting column types (numeric, date, categorical)</li>
        <li>Applying rule-based anomaly detection across columns</li>
        <li>Aggregating row-level flags with set union logic</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:i,answer:d}}var ne,ct,Vo,ut=F(async()=>{"use strict";globalThis.pyodide||(globalThis.pyodide=await Qo());ne=globalThis.pyodide;globalThis._contractDataReady||(await ne.loadPackage(["pandas"]),globalThis._contractDataReady=!0);ct="q-data-contract-violation",Vo=`
import pandas as pd
import random
import json
from datetime import date, timedelta

_DOMAINS = {
    "sales": {
        "label": "sales transactions", "id_prefix": "TXN",
        "cols": {"id": "transaction_id", "date": "sale_date", "amount": "amount",
                 "count": "quantity", "email": "customer_email", "fk": "region_id", "score": "discount_pct"},
        "fk_pool": ["REG01","REG02","REG03","REG04","REG05","REG06","REG07"],
        "amount_range": [5.0, 500.0], "count_range": [1, 50], "score_range": [0.0, 25.0],
        "date_bounds": ["2024-01-01", "2024-12-31"],
    },
    "sensor": {
        "label": "IoT sensor readings", "id_prefix": "SEN",
        "cols": {"id": "device_id", "date": "reading_date", "amount": "voltage",
                 "count": "packet_count", "email": "alert_email", "fk": "site_id", "score": "signal_strength"},
        "fk_pool": ["SITE01","SITE02","SITE03","SITE04","SITE05","SITE06"],
        "amount_range": [100.0, 240.0], "count_range": [10, 500], "score_range": [0.0, 100.0],
        "date_bounds": ["2024-01-01", "2024-12-31"],
    },
    "customer": {
        "label": "customer account records", "id_prefix": "ACC",
        "cols": {"id": "account_id", "date": "created_date", "amount": "account_balance",
                 "count": "login_count", "email": "email_address", "fk": "segment_id", "score": "satisfaction_score"},
        "fk_pool": ["SEG01","SEG02","SEG03","SEG04","SEG05"],
        "amount_range": [0.0, 10000.0], "count_range": [0, 200], "score_range": [1.0, 10.0],
        "date_bounds": ["2022-01-01", "2024-12-31"],
    },
    "inventory": {
        "label": "inventory records", "id_prefix": "SKU",
        "cols": {"id": "sku_id", "date": "last_updated", "amount": "unit_price",
                 "count": "stock_qty", "email": "supplier_email", "fk": "warehouse_id", "score": "fill_rate"},
        "fk_pool": ["WH01","WH02","WH03","WH04","WH05"],
        "amount_range": [1.0, 500.0], "count_range": [0, 1000], "score_range": [0.0, 100.0],
        "date_bounds": ["2024-01-01", "2024-12-31"],
    },
    "hr": {
        "label": "HR employee records", "id_prefix": "EMP",
        "cols": {"id": "employee_id", "date": "hire_date", "amount": "salary",
                 "count": "days_worked", "email": "work_email", "fk": "dept_id", "score": "performance_score"},
        "fk_pool": ["DEPT01","DEPT02","DEPT03","DEPT04","DEPT05","DEPT06"],
        "amount_range": [30000.0, 150000.0], "count_range": [1, 260], "score_range": [1.0, 5.0],
        "date_bounds": ["2015-01-01", "2024-12-31"],
    },
}

def _rand_dates(rng, n, s, e):
    start = date.fromisoformat(s)
    end = date.fromisoformat(e)
    delta = (end - start).days
    return [str(start + timedelta(days=rng.randint(0, delta))) for _ in range(n)]

def _rand_email(rng):
    name = "".join(rng.choices("abcdefghijklmnopqrstuvwxyz", k=rng.randint(4, 8)))
    dom = rng.choice(["gmail.com", "yahoo.com", "outlook.com", "corp.io"])
    return f"{name}@{dom}"

def _count_anomalous_rows(day1_df, day2_df):
    """
    Count rows in day2_df that are anomalous vs day1_df baseline.
    Rules (must match exactly what is shown to the student):
      - Numeric cols: value outside [Day1_min, Day1_max]
      - Date cols (YYYY-MM-DD strings): date is in the future (> today)
      - Any col: null where Day1 had zero nulls
      - Categorical string cols: value not present in Day1's unique set
    A row is anomalous if ANY column triggers a rule.
    """
    today = pd.Timestamp(date.today())
    bad = set()
    for col in day1_df.columns:
        d1, d2 = day1_df[col], day2_df[col]
        # null check
        if d1.isna().sum() == 0:
            bad.update(d2[d2.isna()].index.tolist())
        # numeric check
        num1 = pd.to_numeric(d1, errors="coerce")
        if num1.notna().mean() > 0.95:
            num2 = pd.to_numeric(d2, errors="coerce")
            lo, hi = num1.min(), num1.max()
            bad.update(d2[(num2 < lo) | (num2 > hi)].index.tolist())
            continue
        # date check
        parsed1 = pd.to_datetime(d1.dropna().astype(str), errors="coerce")
        if parsed1.notna().mean() > 0.9:
            parsed2 = pd.to_datetime(d2.astype(str), errors="coerce")
            bad.update(d2[parsed2 > today].index.tolist())
            continue
        # categorical check (only for low-cardinality columns, <=20 unique values in Day 1)
        valid = set(d1.dropna().astype(str).unique())
        if len(valid) <= 20:
            bad.update(d2[d2.notna() & ~d2.astype(str).isin(valid)].index.tolist())
    return len(bad)

def _generate(seed):
    rng = random.Random(seed)
    dkeys = list(_DOMAINS.keys())
    dk = dkeys[rng.randint(0, len(dkeys) - 1)]
    dom = _DOMAINS[dk]
    cols = dom["cols"]

    ALL_V = ["negative_values", "future_dates", "unexpected_nulls", "out_of_range",
             "string_format", "referential_integrity", "statistical_shift"]
    pool = ALL_V[:]
    violations = []
    for _ in range(5):
        idx = rng.randint(0, len(pool) - 1)
        violations.append(pool.pop(idx))

    # Each violation affects a different random number of rows (10\u201325), seeded
    nc_list = [rng.randint(10, 25) for _ in violations]
    total_rows = 200  # enough rows for all violations with room to spare

    prefix = dom["id_prefix"]
    fk_pool = dom["fk_pool"]
    amt_lo, amt_hi = dom["amount_range"]
    cnt_lo, cnt_hi = dom["count_range"]
    scr_lo, scr_hi = dom["score_range"]

    def clean_rows(n, offset=0):
        return {
            cols["id"]: [f"{prefix}-{offset + i + 1:06d}" for i in range(n)],
            cols["date"]: _rand_dates(rng, n, dom["date_bounds"][0], dom["date_bounds"][1]),
            cols["amount"]: [round(rng.uniform(amt_lo, amt_hi), 2) for _ in range(n)],
            cols["count"]: [rng.randint(cnt_lo, cnt_hi) for _ in range(n)],
            cols["email"]: [_rand_email(rng) for _ in range(n)],
            cols["fk"]: [rng.choice(fk_pool) for _ in range(n)],
            cols["score"]: [round(rng.uniform(scr_lo, scr_hi), 2) for _ in range(n)],
        }

    day1_df = pd.DataFrame(clean_rows(150, 0))
    day2_df = pd.DataFrame(clean_rows(total_rows, 150))
    today = date.today()
    WRONG = {"TXN": "ORD", "SEN": "DEV", "ACC": "USR", "SKU": "ITM", "EMP": "STF"}

    # Plant violations in non-overlapping row slices
    row_offset = 0
    for vtype, nc in zip(violations, nc_list):
        rows = list(range(row_offset, row_offset + nc))
        row_offset += nc
        if vtype == "negative_values":
            for r in rows:
                day2_df.loc[r, cols["amount"]] = round(rng.uniform(-amt_hi, -0.01), 2)
        elif vtype == "future_dates":
            for r in rows:
                day2_df.loc[r, cols["date"]] = str(today + timedelta(days=rng.randint(1, 365)))
        elif vtype == "unexpected_nulls":
            for r in rows:
                day2_df.loc[r, cols["email"]] = None
        elif vtype == "out_of_range":
            span = scr_hi - scr_lo
            for r in rows:
                if rng.random() < 0.5:
                    day2_df.loc[r, cols["score"]] = round(scr_hi + span * rng.uniform(0.2, 1.5), 2)
                else:
                    day2_df.loc[r, cols["score"]] = round(scr_lo - span * rng.uniform(0.2, 1.5), 2)
        elif vtype == "string_format":
            wp = WRONG.get(prefix, "WRG")
            for r in rows:
                day2_df.loc[r, cols["id"]] = f"{wp}-{rng.randint(1, 999999):06d}"
        elif vtype == "referential_integrity":
            bad = [f"UNKNOWN{i:02d}" for i in range(1, 6)]
            for r in rows:
                day2_df.loc[r, cols["fk"]] = rng.choice(bad)
        elif vtype == "statistical_shift":
            hi_val = max(cnt_hi * 3 + 1, cnt_hi * 6)
            for r in rows:
                day2_df.loc[r, cols["count"]] = rng.randint(cnt_hi * 3, hi_val)

    correct_answer = _count_anomalous_rows(day1_df, day2_df)

    return {
        "domain": dom["label"],
        "correct_answer": correct_answer,
        "day1_csv": day1_df.to_csv(index=False),
        "day2_csv": day2_df.to_csv(index=False),
    }

__exam_gen__ = json.dumps(_generate(EXAM_SEED))
`});var _t={};P(_t,{default:()=>rn});import{html as Xo}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function tn(){if(globalThis._sliceDetectiveDuckDB)return globalThis._sliceDetectiveDuckDB;let o=await import("https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/+esm"),t=o.getJsDelivrBundles(),e=await o.selectBundle(t),s=URL.createObjectURL(new Blob([`importScripts("${e.mainWorker}");`],{type:"text/javascript"})),a=new Worker(s),r=new o.VoidLogger,p=new o.AsyncDuckDB(r,a);return await p.instantiate(e.mainModule,e.pthreadWorker),globalThis._sliceDetectiveDuckDB=p,p}function on(o){let t=(0,gt.default)(`${o}#${ft}`),e=h=>h[Math.floor(t()*h.length)],s=(h,k)=>h+Math.floor(t()*(k-h+1)),a=e(Zo),r=e(en),p=e(pt),n=ve.slice(1)[Math.floor(t()*(ve.length-1))],l=.35+t()*.16,d=.83+t()*.09,i=s(25,44),u=i+s(10,22),m=s(800,1199),c=[];for(let h=0;h<u;h++){let k=re[Math.floor(t()*3)],A=t()<l,$=re.filter(E=>E!==k),y=A?k:$[Math.floor(t()*2)];c.push({text:ae[Math.floor(t()*ae.length)],true_label:k,predicted_label:y,platform:p,language_detected:n,message_length_bucket:e(mt)})}for(let h=u;h<m;h++){let k=e(pt),A=e(ve),$=re[Math.floor(t()*3)],y=k===p&&A===n?l:d,E=t()<y,I=re.filter(q=>q!==$),M=E?$:I[Math.floor(t()*2)];c.push({text:ae[Math.floor(t()*ae.length)],true_label:$,predicted_label:M,platform:k,language_detected:A,message_length_bucket:e(mt)})}for(let h=c.length-1;h>0;h--){let k=Math.floor(t()*(h+1));[c[h],c[k]]=[c[k],c[h]]}let w=c.filter(h=>h.true_label===h.predicted_label).length/c.length,_=["platform","language_detected","message_length_bucket"],T=null,x=1/0,g=0;for(let h of _){let k={};for(let A of c){let $=A[h];k[$]||(k[$]={c:0,t:0}),k[$].t++,A.true_label===A.predicted_label&&k[$].c++}for(let[A,{c:$,t:y}]of Object.entries(k))y>=i&&$/y<x&&(x=$/y,T=`${h} = '${A}'`,g=y)}for(let h=0;h<_.length;h++)for(let k=h+1;k<_.length;k++){let A={};for(let $ of c){let y=`${$[_[h]]}\0${$[_[k]]}`;A[y]||(A[y]={c:0,t:0}),A[y].t++,$.true_label===$.predicted_label&&A[y].c++}for(let[$,{c:y,t:E}]of Object.entries(A))if(E>=i&&y/E<x){let[I,M]=$.split("\0");x=y/E,T=`${_[h]} = '${I}' AND ${_[k]} = '${M}'`,g=E}}let S=["text,true_label,predicted_label,platform,language_detected,message_length_bucket",...c.map(h=>`"${h.text.replace(/"/g,'""')}","${h.true_label}","${h.predicted_label}","${h.platform}","${h.language_detected}","${h.message_length_bucket}"`)];return{domain:a,company:r,minSize:i,overallAccuracy:w,rows:c,csvText:S.join(`
`),worstSlice:{accuracy:x,size:g,definition:T}}}async function ht(o,t,e){let s=`_sliceTable_${t}`;if(globalThis[s])return;await o.registerFileText(`${t}_predictions.csv`,e);let a=await o.connect();await a.query("DROP TABLE IF EXISTS predictions"),await a.query(`CREATE TABLE predictions AS SELECT * FROM read_csv_auto('${t}_predictions.csv')`),await a.close(),globalThis[s]=!0}function nn(o){let t=o.schema.fields.map(e=>e.name);return o.toArray().map(e=>{let s={};for(let a of t){let r=e[a];s[a]=typeof r=="bigint"?Number(r):r}return s})}async function rn({user:o,weight:t=1}){let e=ft,s="The Slice Detective",a=`_sliceData_${o.email}`;globalThis[a]||(globalThis[a]=on(o.email));let r=globalThis[a],p=await tn();await ht(p,o.email,r.csvText);let n=(r.overallAccuracy*100).toFixed(1),l=Math.floor((r.worstSlice.accuracy+.05)*100),d=async u=>{let m=String(u??"").trim();if(!m)throw new Error("Please enter a SQL query.");let c=m.toUpperCase().trimStart();if(!c.startsWith("SELECT")&&!c.startsWith("WITH"))throw new Error("Only SELECT / WITH queries are allowed.");if(!m.toLowerCase().includes("predictions"))throw new Error('Your query must reference the "predictions" table.');await ht(p,o.email,r.csvText);let f=await p.connect(),w;try{w=await f.query(m)}catch($){throw await f.close(),new Error(`SQL error: ${String($.message??$)}`)}await f.close();let _=nn(w);if(_.length===0)throw new Error("Your query returned no rows.");let T=_[0],x=["slice_definition","slice_size","slice_accuracy","overall_accuracy"],g=x.filter($=>!($ in T));if(g.length>0)throw new Error(`Missing output column(s): ${g.map($=>`"${$}"`).join(", ")}. Your query must return exactly these columns: ${x.join(", ")}.`);let v=Number(T.slice_size);if(!Number.isFinite(v)||v<1)throw new Error(`slice_size must be a positive integer. Got: ${T.slice_size}`);if(v<r.minSize)throw new Error(`slice_size = ${v} is below the minimum required size of ${r.minSize}. Use a HAVING clause to filter out small slices.`);let S=Number(T.slice_accuracy),h=Number(T.overall_accuracy);if(!Number.isFinite(S)||!Number.isFinite(h))throw new Error("slice_accuracy and overall_accuracy must be numeric.");let k=S>1.5?S/100:S,A=h>1.5?h/100:h;if(Math.abs(A-r.overallAccuracy)>.025)throw new Error(`overall_accuracy = ${(A*100).toFixed(1)}% doesn't match the actual value (${(r.overallAccuracy*100).toFixed(1)}%). Compute it as: AVG(CASE WHEN true_label = predicted_label THEN 1.0 ELSE 0.0 END) over all rows in the predictions table.`);if(A-k<.1)throw new Error(`slice_accuracy = ${(k*100).toFixed(1)}% is not bad enough \u2014 it's within 10pp of overall accuracy (${(A*100).toFixed(1)}%). The worst slice is significantly more degraded. Keep investigating.`);if(k>r.worstSlice.accuracy+.04)throw new Error(`slice_accuracy = ${(k*100).toFixed(1)}% \u2014 but there is a worse-performing slice in the data. Try combining two metadata columns in your GROUP BY to find a smaller, more degraded subgroup.`);return!0},i=Xo`
    <div class="mb-3">
      <h2 id="${e}">The Slice Detective</h2>

      <p>
        A sentiment classifier was deployed for <strong>${r.company}</strong> to label
        <strong>${r.domain}</strong>. Overall accuracy is <strong>${n}%</strong> —
        which sounds acceptable.
      </p>
      <p>
        But the data science team suspects hidden failure modes in specific subgroups.
        Your job: find the <strong>single worst-performing slice</strong> in the
        <code>predictions</code> table.
      </p>

      <h3>Table Schema</h3>
      <pre><code>predictions (
  text                  VARCHAR,   -- the input message
  true_label            VARCHAR,   -- ground truth: 'positive' | 'negative' | 'neutral'
  predicted_label       VARCHAR,   -- model output: 'positive' | 'negative' | 'neutral'
  platform              VARCHAR,   -- 'mobile' | 'desktop' | 'api'
  language_detected     VARCHAR,   -- 'en' | 'es' | 'fr' | 'hi' | 'zh'
  message_length_bucket VARCHAR    -- 'short' | 'medium' | 'long'
)</code></pre>

      <h3>Task</h3>
      <p>Write a DuckDB SQL query that returns <strong>exactly one row</strong> — the worst-performing
      slice — with these four columns (exact names required):</p>
      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr><th>Column</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>slice_definition</code></td><td>VARCHAR</td><td>A description of the slice, e.g. <code>'platform = mobile'</code></td></tr>
          <tr><td><code>slice_size</code></td><td>INTEGER</td><td>Number of rows in the slice</td></tr>
          <tr><td><code>slice_accuracy</code></td><td>FLOAT</td><td>Fraction correct in the slice (0.0 – 1.0)</td></tr>
          <tr><td><code>overall_accuracy</code></td><td>FLOAT</td><td>Fraction correct across <em>all</em> rows (0.0 – 1.0)</td></tr>
        </tbody>
      </table>

      <h3>Constraints</h3>
      <ul>
        <li>A <strong>slice</strong> is defined by fixing the value of one metadata column, or a combination of two metadata columns (consider all combinations of <code>platform</code>, <code>language_detected</code>, <code>message_length_bucket</code>).</li>
        <li>Only include slices with <strong>at least ${r.minSize} rows</strong> (use a <code>HAVING</code> clause).</li>
        <li>Accuracy = rows where <code>true_label = predicted_label</code> divided by total rows in the slice.</li>
        <li>Return the slice with the <strong>lowest accuracy</strong>. Ties broken arbitrarily.</li>
        <li>The found slice must be at least <strong>${l}pp below</strong> overall accuracy.</li>
      </ul>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>Use <code>AVG(CASE WHEN true_label = predicted_label THEN 1.0 ELSE 0.0 END)</code> as your accuracy expression.</li>
          <li>A subquery or CTE can help: compute all candidate slices first, then pick the minimum.</li>
          <li>To consider two-column combinations, you can <code>UNION ALL</code> separate queries for each pair, or generate slice labels with <code>CONCAT</code>.</li>
          <li>Use <code>ORDER BY slice_accuracy ASC LIMIT 1</code> to get the single worst row.</li>
          <li>The <code>overall_accuracy</code> column should be a scalar subquery over the entire table.</li>
          <li>Run exploratory queries first — try <code>GROUP BY platform, language_detected</code> to spot degraded subgroups.</li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2"><strong>Submit your DuckDB SQL query:</strong></label>
      <textarea
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        rows="14"
        placeholder="-- Your query here
SELECT
  ...  AS slice_definition,
  COUNT(*) AS slice_size,
  AVG(...) AS slice_accuracy,
  (...) AS overall_accuracy
FROM predictions
..."
        required
      ></textarea>
      <div class="form-text">
        Your query will be executed in DuckDB directly in the browser against the
        <code>predictions</code> table. Only <code>SELECT</code> / <code>WITH</code> statements are allowed.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Exploratory SQL analysis to detect model failure modes</li>
        <li>GROUP BY with HAVING for slice-based aggregation</li>
        <li>UNION ALL or multi-column GROUP BY for cross-column analysis</li>
        <li>Subqueries and window functions for ranking</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:i,answer:d}}var gt,ft,Zo,en,pt,ve,mt,re,ae,yt=F(()=>{"use strict";gt=B(H(),1),ft="q-slice-detective",Zo=["product reviews","support tickets","news comments","social media posts"],en=["TechCorp","RetailCo","MediaHub","FinanceNow","HealthPlus"],pt=["mobile","desktop","api"],ve=["en","es","fr","hi","zh"],mt=["short","medium","long"],re=["positive","negative","neutral"],ae=["Great experience overall, highly recommend","Had trouble with the interface today","Delivery was faster than expected","Not satisfied with the response time","Works exactly as described, very happy","The quality could be better for the price","Support team was helpful and responsive","Encountered repeated errors in the app","Outstanding service from start to finish","Wish the process was more straightforward"]});var kt={};P(kt,{default:()=>mn});import{html as an}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function dn(){if(globalThis._thresholdEngineerDB)return globalThis._thresholdEngineerDB;let o=await import("https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/+esm"),t=await o.selectBundle(o.getJsDelivrBundles()),e=URL.createObjectURL(new Blob([`importScripts("${t.mainWorker}");`],{type:"text/javascript"})),s=new Worker(e),a=new o.AsyncDuckDB(new o.VoidLogger,s);return await a.instantiate(t.mainModule,t.pthreadWorker),globalThis._thresholdEngineerDB=a,a}function bt(o,t,e){let s=Math.max(1e-10,o()),a=o(),r=Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*a);return Math.max(1e-4,Math.min(.9999,t+e*r))}function un(o){let t=(0,vt.default)(`${o}#${xt}`),e=g=>g[Math.floor(t()*g.length)],s=e(cn),a=e(sn),r=e(ln),p=.58+.12*t(),n=.28+.14*t(),l=.13+.06*t(),d=.13+.06*t(),i=.25+.2*t(),u=[];for(let g=0;g<r;g++){let v=t()<i?1:0,S=v===1?bt(t,p,l):bt(t,n,d);u.push({score:Math.round(S*1e4)/1e4,true_label:v})}let m=[];for(let g=5;g<=95;g+=5)m.push(Math.round(g)/100);let c={},f=m[0],w=1/0;for(let g of m){let v=0,S=0,h=0;for(let y of u){let E=y.score>=g?1:0;E===1&&y.true_label===1?v++:E===1&&y.true_label===0?S++:E===0&&y.true_label===1&&h++}let k=(a*h+S)/r,A=v+S>0?v/(v+S):0,$=v+h>0?v/(v+h):0;c[g]={cost:k,prec:A,rec:$},k<w&&(w=k,f=g)}let _=c[f],T={optimal_threshold:f,precision:Math.round(_.prec*1e4)/1e4,recall:Math.round(_.rec*1e4)/1e4,expected_cost:Math.round(_.cost*1e6)/1e6},x=["score,true_label",...u.map(g=>`${g.score},${g.true_label}`)];return{company:s,fn_cost:a,N:r,csvText:x.join(`
`),correct:T,allMetrics:c}}async function wt(o,t,e){let s=`_threshTable_${t}`;if(globalThis[s])return;await o.registerFileText(`${t}_thresh.csv`,e);let a=await o.connect();await a.query("DROP TABLE IF EXISTS predictions"),await a.query(`CREATE TABLE predictions AS SELECT * FROM read_csv_auto('${t}_thresh.csv')`),await a.close(),globalThis[s]=!0}function pn(o){let t=o.schema.fields.map(e=>e.name);return o.toArray().map(e=>{let s={};for(let a of t){let r=e[a];s[a]=typeof r=="bigint"?Number(r):r}return s})}async function mn({user:o,weight:t=1}){let e=xt,s="The Threshold Engineer",a=`_threshData_${o.email}`;globalThis[a]||(globalThis[a]=un(o.email));let r=globalThis[a],p=await dn();await wt(p,o.email,r.csvText);let n=async d=>{let i=String(d??"").trim();if(!i)throw new Error("Please enter a SQL query.");let u=i.toUpperCase().trimStart();if(!u.startsWith("SELECT")&&!u.startsWith("WITH"))throw new Error("Only SELECT / WITH queries are allowed.");if(!i.toLowerCase().includes("predictions"))throw new Error('Your query must reference the "predictions" table.');await wt(p,o.email,r.csvText);let m=await p.connect(),c;try{c=await m.query(i)}catch($){throw await m.close(),new Error(`SQL error: ${String($.message??$).split(`
`)[0]}`)}await m.close();let f=pn(c);if(f.length===0)throw new Error("Your query returned no rows.");let w=f[0],_=["optimal_threshold","precision_at_threshold","recall_at_threshold","expected_cost_at_threshold"],T=_.filter($=>!($ in w));if(T.length)throw new Error(`Missing column(s): ${T.map($=>`"${$}"`).join(", ")}. Your query must return exactly: ${_.join(", ")}.`);let x=Number(w.optimal_threshold),g=[];for(let $=5;$<=95;$+=5)g.push(Math.round($)/100);let v=g.find($=>Math.abs($-x)<.001);if(v===void 0)throw new Error(`optimal_threshold = ${x} is not valid. Thresholds must be in {0.05, 0.10, \u2026, 0.95}.`);let S=r.allMetrics[v];if(Math.abs(S.cost-r.correct.expected_cost)>5e-4)throw new Error(`Threshold ${v.toFixed(2)} has expected_cost ${S.cost.toFixed(6)}, but the true minimum is ${r.correct.expected_cost.toFixed(6)} at threshold ${r.correct.optimal_threshold.toFixed(2)}. Evaluate ALL thresholds 0.05 \u2026 0.95 and return the one with the lowest cost.`);let h=Number(w.precision_at_threshold);if(Math.abs(h-r.correct.precision)>.002)throw new Error(`precision_at_threshold = ${h.toFixed(4)} is incorrect (expected \u2248 ${r.correct.precision.toFixed(4)}). Precision = TP / (TP + FP) where TP = predicted=1 AND true=1.`);let k=Number(w.recall_at_threshold);if(Math.abs(k-r.correct.recall)>.002)throw new Error(`recall_at_threshold = ${k.toFixed(4)} is incorrect (expected \u2248 ${r.correct.recall.toFixed(4)}). Recall = TP / (TP + FN) where FN = predicted=0 AND true=1.`);let A=Number(w.expected_cost_at_threshold);if(Math.abs(A-r.correct.expected_cost)>.001)throw new Error(`expected_cost_at_threshold = ${A.toFixed(6)} is incorrect (expected \u2248 ${r.correct.expected_cost.toFixed(6)}). Formula: (${r.fn_cost} \xD7 FN + FP) / ${r.N}.`);return!0},l=an`
    <div class="mb-3">
      <h2 id="${e}">The Threshold Engineer</h2>

      <p>
        You're deploying a content moderation classifier at <strong>${r.company}</strong>.
        The model outputs a confidence <code>score</code> (0–1) for each piece of content being
        <em>harmful</em>. Content is <strong>blocked</strong> when <code>score ≥ threshold</code>,
        shown otherwise. Your job is to choose the optimal threshold.
      </p>

      <p>
        The business has given you a cost ratio:
        a <strong>false negative</strong> (harmful content shown to users) costs
        <strong>${r.fn_cost}×</strong> as much as a
        <strong>false positive</strong> (safe content incorrectly blocked).
      </p>

      <h3>Table: <code>predictions</code></h3>
      <pre><code>predictions (
  score       FLOAT,   -- model confidence that content is harmful (0.0 – 1.0)
  true_label  INT      -- ground truth: 1 = harmful, 0 = safe
)
-- ${r.N} rows total</code></pre>

      <h3>Task</h3>
      <p>
        Write a DuckDB SQL query that evaluates every candidate threshold
        <code>t ∈ {0.05, 0.10, 0.15, …, 0.95}</code> (step 0.05)
        and returns a <strong>single row</strong> for the threshold that
        <em>minimises</em> expected cost:
      </p>
      <pre><code>expected_cost = (${r.fn_cost} × false_negatives + false_positives) / total_rows</code></pre>

      <p>where for a given threshold <code>t</code>:</p>
      <ul>
        <li><strong>false_negative</strong>: <code>score &lt; t AND true_label = 1</code></li>
        <li><strong>false_positive</strong>: <code>score ≥ t AND true_label = 0</code></li>
      </ul>

      <h3>Required output columns (exact names)</h3>
      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr><th>Column</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>optimal_threshold</code></td><td>FLOAT</td><td>The threshold (from 0.05–0.95 step 0.05) with minimum expected cost</td></tr>
          <tr><td><code>precision_at_threshold</code></td><td>FLOAT</td><td>TP / (TP + FP) at that threshold, rounded to 4 d.p.</td></tr>
          <tr><td><code>recall_at_threshold</code></td><td>FLOAT</td><td>TP / (TP + FN) at that threshold, rounded to 4 d.p.</td></tr>
          <tr><td><code>expected_cost_at_threshold</code></td><td>FLOAT</td><td>The minimised expected cost, rounded to 6 d.p.</td></tr>
        </tbody>
      </table>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            Use <code>generate_series(5, 95, 5)</code> in DuckDB to produce integers 5, 10, 15, …, 95,
            then divide by 100.0 to get your threshold candidates.
          </li>
          <li>
            <code>CROSS JOIN</code> the thresholds table with <code>predictions</code> to compute
            TP, FP, FN at every threshold in a single pass.
          </li>
          <li>
            A CTE structure works well: one CTE builds all threshold metrics,
            another picks the row with <code>ORDER BY expected_cost ASC LIMIT 1</code>.
          </li>
          <li>
            Precision and recall are undefined when the denominator is zero — use
            <code>NULLIF(…, 0)</code> or a <code>CASE</code> guard.
          </li>
          <li>
            <strong>Do not hardcode 0.5.</strong> With a cost ratio of ${r.fn_cost}:1,
            the optimal threshold will be meaningfully lower than 0.5.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your DuckDB SQL query:</strong>
      </label>
      <textarea
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        rows="16"
        placeholder="WITH thresholds AS (
  SELECT t / 100.0 AS threshold
  FROM generate_series(5, 95, 5) AS gs(t)
),
metrics AS (
  SELECT
    t.threshold,
    ...
  FROM thresholds t CROSS JOIN predictions p
  GROUP BY t.threshold
)
SELECT
  ... AS optimal_threshold,
  ... AS precision_at_threshold,
  ... AS recall_at_threshold,
  ... AS expected_cost_at_threshold
FROM metrics
ORDER BY expected_cost_at_threshold ASC
LIMIT 1;"
        required
      ></textarea>
      <div class="form-text">
        Runs in DuckDB in your browser against the <code>predictions</code> table.
        Only <code>SELECT</code> / <code>WITH</code> statements are allowed.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Classification threshold selection as a cost-minimisation problem</li>
        <li>Computing confusion matrix components (TP, FP, FN) in SQL</li>
        <li><code>CROSS JOIN</code> with a generated threshold grid</li>
        <li>Precision/recall tradeoff and the effect of asymmetric misclassification costs</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:l,answer:n}}var vt,xt,sn,ln,cn,Et=F(()=>{"use strict";vt=B(H(),1),xt="q-threshold-engineer",sn=[3,5,7,10],ln=[500,800,1e3],cn=["ContentFlow","SafeWatch","ModerateIQ","TrustNet","ClearVoice"]});var At={};P(At,{default:()=>bn});import{html as hn}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function fn(){if(globalThis._flakyTestDB)return globalThis._flakyTestDB;let o=await import("https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/+esm"),t=await o.selectBundle(o.getJsDelivrBundles()),e=URL.createObjectURL(new Blob([`importScripts("${t.mainWorker}");`],{type:"text/javascript"})),s=new Worker(e),a=new o.AsyncDuckDB(new o.VoidLogger,s);return await a.instantiate(t.mainModule,t.pthreadWorker),globalThis._flakyTestDB=a,a}function _n(o){let t=(0,xe.default)(`${o}#${$t}`),e=y=>y[Math.floor(t()*y.length)],s=(y,E)=>y+Math.floor(t()*(E-y+1)),a=e(gn),r=s(15,22),p=s(22,38),n=s(3,6),l=s(3,7),d=Tt.slice(0,Tt.length);for(let y=d.length-1;y>0;y--){let E=Math.floor(t()*(y+1));[d[y],d[E]]=[d[E],d[y]]}let i=d.slice(0,r),u=[];for(let y=0;y<p;y++){let E="";for(let I=0;I<8;I++)E+=Math.floor(t()*16).toString(16);u.push(`c${y.toString().padStart(3,"0")}${E}`)}let m=s(1,2),c=s(2,4),f=Math.min(n,r-m-c-1),w={},_=0;for(let y=0;y<f;y++,_++)w[i[_]]="flaky";for(let y=0;y<m;y++,_++)w[i[_]]="trap";for(let y=0;y<c;y++,_++)w[i[_]]="stable_fail";for(;_<r;_++)w[i[_]]="stable_pass";let T={};for(let y of i)w[y]==="flaky"&&(T[y]=.2+t()*.65);let x={};for(let y of i)if(w[y]==="trap"){let E=s(3,Math.floor(p/2)),I=u.slice();for(let M=I.length-1;M>0;M--){let q=Math.floor(t()*(M+1));[I[M],I[q]]=[I[q],I[M]]}x[y]=new Set(I.slice(0,E))}let g=[],v=1;for(let y of u)for(let E of i){if(t()<.12)continue;let I=w[E],M=l+Math.floor(t()*3);for(let q=0;q<M;q++){let N;I==="stable_pass"?N="PASS":I==="stable_fail"?N="FAIL":I==="trap"?N=x[E].has(y)?"FAIL":"PASS":(0,xe.default)(`${E}#${y}`)()<T[E]?N=t()<.5?"PASS":"FAIL":N=t()<.92?"PASS":"FAIL",g.push({run_id:`run_${String(v++).padStart(5,"0")}`,commit_hash:y,test_name:E,outcome:N})}}let S={};for(let y of g){S[y.test_name]||(S[y.test_name]={});let E=S[y.test_name];E[y.commit_hash]||(E[y.commit_hash]={pass:0,fail:0}),y.outcome==="PASS"?E[y.commit_hash].pass++:E[y.commit_hash].fail++}let h=[];for(let y of i){let E=S[y]||{},I=0,M=0,q=0,N=0;for(let[,{pass:b,fail:R}]of Object.entries(E))M++,q+=b,N+=b+R,b>0&&R>0&&I++;if(I===0)continue;let D=Math.round(I/M*1e4)/1e4,C=Math.round(q/N*1e4)/1e4;h.push({test_name:y,flaky_commits:I,pass_rate:C,flakyness_score:D})}h.sort((y,E)=>E.flakyness_score-y.flakyness_score);let k=["run_id,commit_hash,test_name,outcome",...g.map(y=>`"${y.run_id}","${y.commit_hash}","${y.test_name}","${y.outcome}"`)],A=g.length,$=s(14,30);return{company:a,totalRuns:A,totalDays:$,numCommits:p,csvText:k.join(`
`),correctRows:h,numFlakyExpected:h.length}}async function St(o,t,e){let s=`_flakyTable_${t}`;if(globalThis[s])return;await o.registerFileText(`${t}_runs.csv`,e);let a=await o.connect();await a.query("DROP TABLE IF EXISTS test_runs"),await a.query(`CREATE TABLE test_runs AS SELECT * FROM read_csv_auto('${t}_runs.csv')`),await a.close(),globalThis[s]=!0}function yn(o){let t=o.schema.fields.map(e=>e.name);return o.toArray().map(e=>{let s={};for(let a of t){let r=e[a];s[a]=typeof r=="bigint"?Number(r):r}return s})}async function bn({user:o,weight:t=1}){let e=$t,s="The Flaky Test Finder",a=`_flakyData_${o.email}`;globalThis[a]||(globalThis[a]=_n(o.email));let r=globalThis[a],p=await fn();await St(p,o.email,r.csvText);let n=async d=>{let i=String(d??"").trim();if(!i)throw new Error("Please enter a SQL query.");let u=i.toUpperCase().trimStart();if(!u.startsWith("SELECT")&&!u.startsWith("WITH"))throw new Error("Only SELECT / WITH queries are allowed.");if(!i.toLowerCase().includes("test_runs"))throw new Error('Your query must reference the "test_runs" table.');await St(p,o.email,r.csvText);let m=await p.connect(),c;try{c=await m.query(i)}catch(x){throw await m.close(),new Error(`SQL error: ${String(x.message??x).split(`
`)[0]}`)}await m.close();let f=yn(c),w=["test_name","flaky_commits","pass_rate","flakyness_score"];if(f.length===0)throw new Error(`Your query returned 0 rows, but there are ${r.numFlakyExpected} flaky tests. A test is flaky only if it has BOTH PASS and FAIL outcomes on the SAME commit.`);let _=w.filter(x=>!(x in f[0]));if(_.length)throw new Error(`Missing column(s): ${_.map(x=>`"${x}"`).join(", ")}. Required: ${w.join(", ")}.`);if(f.length!==r.correctRows.length)throw new Error(`Expected ${r.correctRows.length} row(s) but got ${f.length}. `+(f.length>r.correctRows.length?"You have too many rows \u2014 check you are not including tests that are deterministic per commit (a test that always passes on commit A and always fails on commit B is NOT flaky by definition).":"You are missing some flaky tests. A test is flaky on a commit if it has both PASS and FAIL outcomes across multiple runs on that exact commit."));let T=Object.fromEntries(r.correctRows.map(x=>[x.test_name,x]));for(let x of f){let g=String(x.test_name);if(!(g in T))throw new Error(`"${g}" should not appear in the output. Either it is a stable test, or it only fails consistently on specific commits (commit-specific failure \u2260 flakiness).`);let v=T[g],S=Number(x.flaky_commits);if(S!==v.flaky_commits)throw new Error(`For "${g}": flaky_commits = ${S} but expected ${v.flaky_commits}. Count the number of DISTINCT commits where this test had BOTH outcomes.`);let h=Number(x.pass_rate);if(Math.abs(h-v.pass_rate)>.002)throw new Error(`For "${g}": pass_rate = ${h.toFixed(4)} but expected \u2248 ${v.pass_rate.toFixed(4)}. pass_rate = total PASS runs / total runs across ALL commits for this test.`);let k=Number(x.flakyness_score);if(Math.abs(k-v.flakyness_score)>.002)throw new Error(`For "${g}": flakyness_score = ${k.toFixed(4)} but expected \u2248 ${v.flakyness_score.toFixed(4)}. flakyness_score = flaky_commits / total distinct commits this test was run on.`)}for(let x=0;x<f.length-1;x++){let g=Number(f[x].flakyness_score),v=Number(f[x+1].flakyness_score);if(g<v-.001)throw new Error(`Results must be ordered by flakyness_score DESC. Row ${x+1} (${g.toFixed(4)}) should come after row ${x+2} (${v.toFixed(4)}).`)}return!0},l=hn`
    <div class="mb-3">
      <h2 id="${e}">The Flaky Test Finder</h2>

      <p>
        The CI system at <strong>${r.company}</strong> ran <strong>${r.totalRuns}</strong>
        test-suite executions over the past <strong>${r.totalDays} days</strong>
        across <strong>${r.numCommits}</strong> distinct commits.
        Each run recorded which tests passed and which failed.
      </p>
      <p>
        A <strong>flaky</strong> test is one that produces <em>non-deterministic</em> results —
        it sometimes passes and sometimes fails on the <strong>exact same commit</strong>.
        Flaky tests are worse than no tests: they mask real failures and erode trust in CI.
      </p>
      <p>
        Your job: identify every flaky test and quantify how flaky each one is.
      </p>

      <h3>Table: <code>test_runs</code></h3>
      <pre><code>test_runs (
  run_id       VARCHAR,   -- unique ID for this individual run  e.g. 'run_00042'
  commit_hash  VARCHAR,   -- the code commit that was tested
  test_name    VARCHAR,   -- name of the test
  outcome      VARCHAR    -- 'PASS' or 'FAIL'
)</code></pre>

      <h3>Task</h3>
      <p>
        Write a DuckDB SQL query that returns one row per <em>flaky</em> test —
        a test that has <strong>both PASS and FAIL outcomes across runs on the same commit</strong>.
        Order by <code>flakyness_score DESC</code>.
      </p>

      <h3>Required output columns (exact names)</h3>
      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr><th>Column</th><th>Type</th><th>Definition</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>test_name</code></td><td>VARCHAR</td>
            <td>Name of the flaky test</td>
          </tr>
          <tr>
            <td><code>flaky_commits</code></td><td>INTEGER</td>
            <td>
              Number of distinct commits where this test had <strong>both</strong>
              PASS and FAIL outcomes across its runs
            </td>
          </tr>
          <tr>
            <td><code>pass_rate</code></td><td>FLOAT</td>
            <td>
              Fraction of all runs (all commits combined) where this test passed,
              rounded to 4 d.p.
            </td>
          </tr>
          <tr>
            <td><code>flakyness_score</code></td><td>FLOAT</td>
            <td>
              <code>flaky_commits / total_distinct_commits_this_test_ran_on</code>,
              rounded to 4 d.p.
            </td>
          </tr>
        </tbody>
      </table>

      <div class="alert alert-warning mt-3" role="alert">
        <strong>⚠ Important distinction — don't get trapped:</strong><br/>
        A test that <em>always</em> fails on commit A and <em>always</em> passes on commit B is
        <strong>not flaky</strong> — its behaviour is deterministic per commit (it likely tests
        something that changed between commits). Flakiness only exists when the same commit
        produces different outcomes across multiple runs.
      </div>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            First aggregate by <code>(test_name, commit_hash)</code> to find for each
            (test, commit) pair: how many PASSes and how many FAILs occurred.
          </li>
          <li>
            A commit is "flaky for this test" when both <code>COUNT(outcome='PASS') > 0</code>
            <em>and</em> <code>COUNT(outcome='FAIL') > 0</code> in that (test, commit) group.
          </li>
          <li>
            Then aggregate by <code>test_name</code> across all commits to compute
            <code>flaky_commits</code> and <code>total_distinct_commits</code>.
          </li>
          <li>
            <code>pass_rate</code> is the overall fraction — computed across ALL runs
            for that test, regardless of commit.
          </li>
          <li>
            Use <code>HAVING flakyness_score &gt; 0</code> (or equivalently
            <code>HAVING flaky_commits &gt; 0</code>) to exclude non-flaky tests.
          </li>
          <li>
            A window function or two-level CTE is the cleanest pattern here.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your DuckDB SQL query:</strong>
      </label>
      <textarea
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        rows="18"
        placeholder="WITH commit_outcomes AS (
  -- Step 1: for each (test, commit), detect if outcomes were mixed
  SELECT
    test_name,
    commit_hash,
    ...
  FROM test_runs
  GROUP BY test_name, commit_hash
),
test_stats AS (
  -- Step 2: aggregate per test
  SELECT
    test_name,
    ...
  FROM commit_outcomes
  GROUP BY test_name
)
SELECT
  test_name,
  flaky_commits,
  ROUND(pass_rate, 4)        AS pass_rate,
  ROUND(flakyness_score, 4)  AS flakyness_score
FROM test_stats
WHERE flakyness_score > 0
ORDER BY flakyness_score DESC;"
        required
      ></textarea>
      <div class="form-text">
        Runs in DuckDB in your browser against the <code>test_runs</code> table.
        Only <code>SELECT</code> / <code>WITH</code> statements are allowed.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Two-level GROUP BY aggregation (per-commit, then per-test)</li>
        <li>Detecting mixed outcomes within a group using conditional counts</li>
        <li>Distinguishing non-determinism from commit-specific deterministic failures</li>
        <li>Computing and ordering a custom metric (flakyness_score) in SQL</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:l,answer:n}}var xe,$t,gn,Tt,Ct=F(()=>{"use strict";xe=B(H(),1),$t="q-flaky-test-finder",gn=["BuildBot","PipelineHQ","CIFast","ShipNow","DeployOps"],Tt=["test_auth_login","test_auth_logout","test_db_connection","test_db_write","test_cache_hit","test_cache_miss","test_queue_enqueue","test_queue_drain","test_api_health","test_api_rate_limit","test_email_send","test_email_render","test_payment_charge","test_payment_refund","test_search_index","test_search_query","test_upload_small","test_upload_large","test_session_create","test_session_expire","test_webhook_receive","test_webhook_retry","test_report_generate","test_report_export","test_notification_push"]});var Rt={};P(Rt,{default:()=>Sn});import{html as wn}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function Mt(o){let t=0;for(let e of o)t+=e*e;return t=Math.sqrt(t),o.map(e=>e/t)}function En(o){let t=[];for(let e=0;e<Te;e++){let s=Math.max(1e-12,o()),a=o();t.push(Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*a))}return Mt(t)}function se(o,t,e){let s=[];for(let a=0;a<Te;a++){let r=Math.max(1e-12,e()),p=e(),n=Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*p);s.push(o[a]+t*n)}return Mt(s)}function ke(o,t){let e=0;for(let s=0;s<Te;s++)e+=o[s]*t[s];return e}function X(o,t){let e=o.slice(-1),s=o.slice(0,-1),a=(0,Ee.default)(`base_${s}`),r=En(a);if(e==="p")return se(r,.08,t);if(e==="q")return se(r,.2,t);let p=r.map(n=>-n);return se(p,.1,t)}function Tn(o){let t=(0,Ee.default)(`${o}#${It}`),e=c=>c[Math.floor(t()*c.length)],s=e(xn),a=e(vn),r=kn.slice();for(let c=r.length-1;c>0;c--){let f=Math.floor(t()*(c+1));[r[c],r[f]]=[r[f],r[c]]}let p={paraphrase:14,negation:14,near_duplicate:12},n=[],l=new Set,d=()=>{for(let[c]of r){let f=c.slice(0,-1);if(!l.has(f))return l.add(f),f}return null},i=Object.fromEntries(r.map(([c,f])=>[c,f]));for(let c=0;c<p.paraphrase;c++){let f=d();if(!f)break;let w=`${f}p`,_=`${f}q`;if(!(w in i)||!(_ in i)){c--;continue}let T=X(w,t),x=X(_,t),g=ke(T,x);n.push({id:`pair_${n.length+1}`,type:"paraphrase",text_a:i[w],text_b:i[_],embedding_a:T,embedding_b:x,threshold:.8,threshold_op:">=",cosine_sim:g,fails:g<.8})}l.clear();for(let c=0;c<p.negation;c++){let f=d();if(!f)break;let w=`${f}p`,_=`${f}r`;if(!(w in i)||!(_ in i)){c--;continue}let T=X(w,t),x=X(_,t),g=ke(T,x);n.push({id:`pair_${n.length+1}`,type:"negation",text_a:i[w],text_b:i[_],embedding_a:T,embedding_b:x,threshold:.5,threshold_op:"<=",cosine_sim:g,fails:g>.5})}l.clear();for(let c=0;c<p.near_duplicate;c++){let f=d();if(!f)break;let w=`${f}p`;if(!(w in i)){c--;continue}let _=X(w,t),T=t()<.25?.18:.03,x=se(_,T,t),g=ke(_,x);n.push({id:`pair_${n.length+1}`,type:"near_duplicate",text_a:i[w],text_b:i[w]+" ",embedding_a:_,embedding_b:x,threshold:.97,threshold_op:">=",cosine_sim:g,fails:g<.97})}for(let c=n.length-1;c>0;c--){let f=Math.floor(t()*(c+1));[n[c],n[f]]=[n[f],n[c]]}let u={paraphrase_failures:n.filter(c=>c.type==="paraphrase"&&c.fails).length,negation_failures:n.filter(c=>c.type==="negation"&&c.fails).length,near_duplicate_failures:n.filter(c=>c.type==="near_duplicate"&&c.fails).length},m=n.map(c=>({id:c.id,type:c.type,text_a:c.text_a,text_b:c.text_b,embedding_a:Array.from(c.embedding_a.map(f=>Math.round(f*1e6)/1e6)),embedding_b:Array.from(c.embedding_b.map(f=>Math.round(f*1e6)/1e6)),threshold:c.threshold,threshold_op:c.threshold_op}));return{company:s,domain:a,pairs:n,correctAnswer:u,jsonText:JSON.stringify(m,null,2)}}async function Sn({user:o,weight:t=1}){let e=It,s="The Embedding Auditor",a=`_embedAudit_${o.email}`;globalThis[a]||(globalThis[a]=Tn(o.email));let r=globalThis[a],p=new Blob([r.jsonText],{type:"application/json"}),n=URL.createObjectURL(p),l=String(o?.email??"student").replace(/[^a-z0-9]/gi,"_"),d=u=>{let m=String(u??"").trim();if(!m)throw new Error("Please enter your three counts.");let c=m.split(/[\s,]+/).filter(Boolean);if(c.length!==3)throw new Error(`Expected 3 numbers (paraphrase_failures, negation_failures, near_duplicate_failures) separated by commas. Got ${c.length} value(s).`);let f=c.map(k=>parseInt(k,10));if(f.some(k=>isNaN(k)||k<0))throw new Error("All three values must be non-negative integers.");let[w,_,T]=f,{paraphrase_failures:x,negation_failures:g,near_duplicate_failures:v}=r.correctAnswer,S=[];if(w!==x&&S.push(`paraphrase_failures: got ${w}`),_!==g&&S.push(`negation_failures: got ${_}`),T!==v&&S.push(`near_duplicate_failures: got ${T}`),S.length===0)return!0;let h=[];throw w!==x&&h.push(`For paraphrase pairs, check: does the cosine similarity of BOTH embeddings fall below 0.80? (Your answer is ${w>x?"too high":"too low"}.)`),_!==g&&h.push(`For negation pairs, the failure condition is similarity > 0.50 (model placed opposites too close). (Your answer is ${_>g?"too high":"too low"}.)`),T!==v&&h.push(`For near-duplicate pairs, failure = similarity < 0.97. Make sure you're using the rounded 6-decimal embeddings from the JSON. (Your answer is ${T>v?"too high":"too low"}.)`),new Error(S.join(" | ")+`

Hints:
\u2022 `+h.join(`
\u2022 `))},i=wn`
    <div class="mb-3">
      <h2 id="${e}">The Embedding Auditor</h2>

      <p>
        <strong>${r.company}</strong> uses pre-trained text embeddings to power semantic search
        across <strong>${r.domain}</strong>. Before deploying a new embedding model, the team runs
        an <em>invariance audit</em>: they test whether the model satisfies basic semantic properties.
      </p>
      <p>
        You've been given <strong>${r.pairs.length} sentence pairs</strong> with pre-computed
        32-dimensional embeddings. Each pair has an expected relationship and a cosine similarity
        threshold it should satisfy.
      </p>

      <div class="mb-3">
        <a href="${n}" download="${l}_embeddings.json" class="btn btn-outline-primary btn-sm">
          ⬇ Download embeddings.json
        </a>
      </div>

      <h3>JSON Structure</h3>
      <pre><code>[
  {
    "id": "pair_1",
    "type": "paraphrase" | "negation" | "near_duplicate",
    "text_a": "...",
    "text_b": "...",
    "embedding_a": [0.123456, -0.234567, ...],   // 32 floats
    "embedding_b": [0.987654,  0.012345, ...],   // 32 floats
    "threshold": 0.80,
    "threshold_op": ">="
  },
  ...
]</code></pre>

      <h3>Pair Types and Invariance Rules</h3>
      <table class="table table-sm table-bordered mt-2">
        <thead class="table-light">
          <tr><th>Type</th><th>Meaning</th><th>Rule</th><th>Fails if …</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>paraphrase</code></td>
            <td>Same meaning, different wording</td>
            <td>cosine ≥ 0.80</td>
            <td>cosine &lt; 0.80 — model didn't recognise equivalence</td>
          </tr>
          <tr>
            <td><code>negation</code></td>
            <td>Semantically opposite statements</td>
            <td>cosine ≤ 0.50</td>
            <td>cosine &gt; 0.50 — model placed opposites too close together</td>
          </tr>
          <tr>
            <td><code>near_duplicate</code></td>
            <td>Almost identical text (minor edit)</td>
            <td>cosine ≥ 0.97</td>
            <td>cosine &lt; 0.97 — minor edit caused unexpectedly large drift</td>
          </tr>
        </tbody>
      </table>

      <h3>Task</h3>
      <p>
        For each pair, compute the cosine similarity between <code>embedding_a</code> and
        <code>embedding_b</code>, then check whether it satisfies the threshold for its type.
        Count the number of <em>failures</em> per type.
      </p>
      <p>
        <strong>Cosine similarity formula:</strong>
        <code>cos(A, B) = (A · B) / (|A| × |B|)</code> — but since both vectors are already
        L2-normalised, this simplifies to just the dot product.
      </p>

      <h3>Reference code (browser console or Node.js)</h3>
      <pre><code>const data = await fetch("${l}_embeddings.json").then(r => r.json());

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
// vectors are already normalised — cosine = dot product

const counts = { paraphrase: 0, negation: 0, near_duplicate: 0 };
for (const pair of data) {
  const sim = dot(pair.embedding_a, pair.embedding_b);
  const fails = pair.threshold_op === ">="
    ? sim < pair.threshold
    : sim > pair.threshold;
  if (fails) counts[pair.type]++;
}
console.log(counts);</code></pre>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>The vectors are already L2-normalised — cosine similarity equals the raw dot product.</li>
          <li>Read <code>threshold_op</code> from the JSON — different pair types use different inequality directions.</li>
          <li>Count failures independently per type; the three counts may all differ.</li>
          <li>
            <strong>Expected surprise:</strong> failure counts are non-zero for at least one category.
            Real embedding models fail invariance tests in predictable ways.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit three comma-separated integers:</strong><br/>
        <span class="text-muted" style="font-weight:normal">
          <code>paraphrase_failures, negation_failures, near_duplicate_failures</code>
        </span>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width:260px"
        placeholder="e.g.  3, 1, 2"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Computing cosine similarity (dot product of normalised vectors)</li>
        <li>Invariance testing: applying threshold conditions per semantic category</li>
        <li>Understanding failure modes of text embedding models</li>
        <li>Parsing and processing structured JSON data programmatically</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:i,answer:d}}var Ee,It,vn,xn,kn,Te,qt=F(()=>{"use strict";Ee=B(H(),1),It="q-embedding-auditor",vn=["science facts","cooking instructions","legal clauses","code documentation","customer reviews"],xn=["EmbedLabs","VectorIQ","SemanticOS","NLPForge","TextGraph"],kn=[["sci_01p","Photosynthesis converts light energy into chemical energy stored in glucose."],["sci_01q","Plants transform solar radiation into chemical bonds through photosynthesis."],["sci_01r","Photosynthesis does not produce chemical energy from light."],["sci_02p","The boiling point of water decreases at higher altitudes due to lower pressure."],["sci_02q","At elevated elevations water boils at temperatures below 100 degrees Celsius."],["sci_02r","Water boils at higher temperatures when atmospheric pressure is reduced."],["sci_03p","Neurons transmit electrical signals across synapses using neurotransmitters."],["sci_03q","Chemical messengers carry nerve impulses between brain cells at synaptic junctions."],["sci_03r","Neurons do not rely on chemical signals to communicate across gaps."],["sci_04p","Black holes have gravitational fields so strong that even light cannot escape."],["sci_04q","The escape velocity at a black hole's event horizon exceeds the speed of light."],["sci_04r","Light can escape from a black hole given sufficient velocity."],["sci_05p","DNA replication is semi-conservative: each new molecule retains one original strand."],["sci_05q","During cell division each daughter DNA helix preserves one parental strand."],["sci_05r","DNA replication produces entirely new strands without retaining any original material."],["coo_01p","Caramelization occurs when sugars are heated above their melting point."],["coo_01q","Applying high heat to sugar causes it to melt and turn brown through caramelization."],["coo_01r","Caramelization happens when sugars are kept at low temperatures."],["coo_02p","Gluten forms when flour proteins hydrate and are worked mechanically."],["coo_02q","Kneading wet flour develops gluten by cross-linking its protein strands."],["coo_02r","Gluten formation is prevented by adding water to flour."],["coo_03p","Emulsification binds oil and water using an amphiphilic agent like lecithin."],["coo_03q","An emulsifier such as egg yolk stabilizes oil-water mixtures by bridging both phases."],["coo_03r","Oil and water naturally mix without requiring an emulsifier."],["coo_04p","Sous vide cooking submerges vacuum-sealed food in a precisely temperature-controlled bath."],["coo_04q","Vacuum-packed ingredients cooked in a water bath at exact temperatures produce consistent results."],["coo_04r","Sous vide cooking requires boiling food at high temperatures."],["coo_05p","The Maillard reaction browns food by bonding amino acids with reducing sugars."],["coo_05q","Surface browning in seared meat results from a chemical reaction between proteins and sugars."],["coo_05r","The Maillard reaction requires neither amino acids nor sugars."],["leg_01p","Force majeure clauses excuse contractual obligations during unforeseeable extraordinary events."],["leg_01q","Parties may invoke force majeure to suspend duties when catastrophic unforeseen events occur."],["leg_01r","Force majeure clauses require performance even during extraordinary unforeseeable events."],["leg_02p","Indemnification requires one party to compensate another for specified losses or liabilities."],["leg_02q","Under an indemnity clause the indemnifying party covers the other's designated damages."],["leg_02r","Indemnification releases both parties from any obligation to cover losses."],["leg_03p","A non-disclosure agreement prohibits parties from sharing confidential information with third parties."],["leg_03q","NDAs legally bind signatories to keep disclosed private information secret from outsiders."],["leg_03r","A non-disclosure agreement permits unrestricted sharing of confidential information."],["leg_04p","Arbitration resolves disputes outside the court system through a neutral third-party adjudicator."],["leg_04q","Binding arbitration settles legal disagreements via an independent arbitrator rather than litigation."],["leg_04r","Arbitration requires disputes to be decided by a panel of judges in open court."],["leg_05p","A warranty guarantees that a product will perform as specified for a defined period."],["leg_05q","Manufacturers' warranties promise that goods will meet stated standards during the coverage window."],["leg_05r","A warranty places no obligation on the seller to ensure product performance."],["cod_01p","This function returns the index of the first element satisfying the predicate or -1."],["cod_01q","Searches the array sequentially and returns the position of the first matching element, else -1."],["cod_01r","This function raises an exception when no element matches the predicate."],["cod_02p","The decorator caches the return value of the function for repeated calls with the same arguments."],["cod_02q","Memoizes the wrapped function so identical inputs reuse previously computed outputs."],["cod_02r","The decorator forces recomputation for every function call regardless of arguments."],["cod_03p","This class implements the observer pattern allowing subscribers to react to state changes."],["cod_03q","Subscribers register callbacks that are invoked whenever the observed object emits an event."],["cod_03r","This class prevents external code from reacting to internal state changes."],["cod_04p","The method validates the input schema and raises a ValueError on the first violation found."],["cod_04q","Inspects incoming data against the expected schema and throws a ValueError if any field is invalid."],["cod_04r","The method silently ignores schema violations and returns the invalid input unchanged."],["cod_05p","Pagination splits large result sets into fixed-size pages to reduce memory and network load."],["cod_05q","Results are chunked into equal-sized pages enabling clients to fetch data incrementally."],["cod_05r","Pagination loads all results at once to ensure the client always has complete data."],["rev_01p","The battery life exceeded my expectations lasting nearly three days on a single charge."],["rev_01q","Impressive endurance \u2014 the device stayed powered for almost 72 hours between charges."],["rev_01r","The battery depleted in under two hours making the device practically unusable."],["rev_02p","Customer support resolved my issue promptly and the representative was knowledgeable."],["rev_02q","The support agent quickly fixed my problem demonstrating excellent product knowledge."],["rev_02r","Customer support was unable to resolve my issue and the agent lacked any product knowledge."],["rev_03p","The build quality feels premium with an all-metal chassis and satisfying haptic feedback."],["rev_03q","Solid construction and a robust metallic body give the product an upscale look and feel."],["rev_03r","The product feels cheap and plasticky with no attention paid to build quality."],["rev_04p","The learning curve was steeper than expected but the software rewards mastery."],["rev_04q","Initially difficult to use, the application becomes powerful once you invest time learning it."],["rev_04r","The software is immediately intuitive with no learning curve whatsoever."],["rev_05p","Delivery arrived two days early and the packaging kept the contents perfectly intact."],["rev_05q","The order was shipped ahead of schedule and everything was well protected on arrival."],["rev_05r","Delivery was severely delayed and the item arrived with significant packaging damage."]],Te=32});var Ft={};P(Ft,{default:()=>Ln});import{html as $n}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function Lt(o){return o.toLowerCase().replace(/[^a-z0-9\s]/g," ").trim().split(/\s+/).filter(t=>t.length>0)}function Ot(o,t){let e=new Set;for(let s=0;s<=o.length-t;s++)e.add(o.slice(s,s+t).join(" "));return e}function Nn(o,t,e=8){let s=Lt(o);if(s.length<e)return 0;let a=Ot(s,e),r=0;for(let p of a)t.has(p)&&r++;return a.size>0?r/a.size:0}function Dn(o){let t=(0,Nt.default)(`${o}#${Dt}`),e=b=>b[Math.floor(t()*b.length)],s=(b,R)=>b+Math.floor(t()*(R-b+1)),a=e(Cn),r=e(An),p=e(Mn),n=e(In),l=Rn.slice();for(let b=l.length-1;b>0;b--){let R=Math.floor(t()*(b+1));[l[b],l[R]]=[l[R],l[b]]}let d=l.slice(0,38),i=d.join(". ")+".",u=Lt(i),m=Ot(u,8),c=s(5,12),f=[b=>`According to recent sources, ${b}. Is this statement correct?`,b=>`True or false: ${b}.`,b=>`A student claims that ${b}. Evaluate this claim.`,b=>`Based on the following fact \u2014 "${b}" \u2014 what can be concluded?`,b=>`Verify the following statement: ${b}.`,b=>`The following was found online: "${b}". Assess its accuracy.`],_=d.slice(0,c).map(b=>{let R=f[Math.floor(t()*f.length)];return R(b)}),T=qn.slice();for(let b=T.length-1;b>0;b--){let R=Math.floor(t()*(b+1));[T[b],T[R]]=[T[R],T[b]]}let x=T.slice(0,p-c),g=.72+.15*t(),v=.12+.08*t(),S=Math.min(.97,g+v),h=g,k=[];for(let b of _){let R=t()<S?1:0;k.push({question:b,is_correct:R,_contam:!0})}for(let b of x){let R=t()<h?1:0;k.push({question:b,is_correct:R,_contam:!1})}for(let b=k.length-1;b>0;b--){let R=Math.floor(t()*(b+1));[k[b],k[R]]=[k[R],k[b]]}let A=k.map(b=>Nn(b.question,m,8)),$=A.map(b=>b>n),y=$.filter(Boolean).length,E=k.reduce((b,R)=>b+R.is_correct,0),I=Math.round(E/k.length*1e4)/100,M=k.filter((b,R)=>!$[R]),q=M.reduce((b,R)=>b+R.is_correct,0),N=M.length>0?Math.round(q/M.length*1e4)/100:0,D=["question,is_correct"];for(let b of k)D.push(`"${b.question.replace(/"/g,'""')}",${b.is_correct}`);let C=D.join(`
`);return{company:a,domain:r,N:p,threshold:n,numContaminated:c,corpusText:i,questionsCsv:C,allQuestions:k,overlaps:A,contamFlags:$,correctAnswer:{contaminatedCount:y,reportedAccuracy:I,adjustedAccuracy:N}}}async function Ln({user:o,weight:t=1}){let e=Dt,s="The Leakage Auditor",a=`_leakage_${o.email}`;globalThis[a]||(globalThis[a]=Dn(o.email));let r=globalThis[a],p=new Blob([r.questionsCsv],{type:"text/csv"}),n=new Blob([r.corpusText],{type:"text/plain"}),l=String(o?.email??"student").replace(/[^a-z0-9]/gi,"_"),d=URL.createObjectURL(p),i=URL.createObjectURL(n),{contaminatedCount:u,reportedAccuracy:m,adjustedAccuracy:c}=r.correctAnswer,f=_=>{let T=String(_??"").trim();if(!T)throw new Error("Please enter your three values.");let x=T.split(/[\s,]+/).filter(Boolean);if(x.length!==3)throw new Error(`Expected 3 values: contaminated_count, reported_accuracy, adjusted_accuracy. Got ${x.length}. Example: 7, 82.50, 74.33`);let g=parseInt(x[0],10),v=parseFloat(x[1]),S=parseFloat(x[2]);if(isNaN(g)||g<0)throw new Error("contaminated_count must be a non-negative integer.");if(isNaN(v)||isNaN(S))throw new Error("reported_accuracy and adjusted_accuracy must be numbers.");let h=[];if(g!==u&&h.push(`contaminated_count: got ${g}. Flag questions with overlap score > ${r.threshold}. An 8-gram overlap score is: (8-grams in question that appear in corpus) / (total 8-grams in question).`),Math.abs(v-m)>.02&&h.push(`reported_accuracy: got ${v}. This is just sum(is_correct) / total \xD7 100 across all questions.`),Math.abs(S-c)>.02&&h.push(`adjusted_accuracy: got ${S}. Compute accuracy only on non-contaminated questions (those with overlap score \u2264 ${r.threshold}).`),h.length===0)return!0;throw new Error(h.join(`

`))},w=$n`
    <div class="mb-3">
      <h2 id="${e}">The Leakage Auditor</h2>

      <p>
        A research team at <strong>${r.company}</strong> built a benchmark to evaluate LLMs on
        <strong>${r.domain}</strong>. The benchmark contains <strong>${r.N} questions</strong>
        collected from the web. A colleague suspects some questions were scraped from sites likely in
        LLM training data — which would inflate the accuracy score through memorisation, not capability.
      </p>
      <p>
        The reported overall accuracy is
        <strong>${r.correctAnswer.reportedAccuracy.toFixed(2)}%</strong>.
        Your job: audit the benchmark for contamination and compute the <em>adjusted</em> accuracy.
      </p>

      <div class="d-flex gap-3 mb-3">
        <a href="${d}" download="${l}_questions.csv" class="btn btn-outline-primary btn-sm">
          ⬇ Download questions.csv
        </a>
        <a href="${i}" download="${l}_corpus.txt" class="btn btn-outline-secondary btn-sm">
          ⬇ Download corpus.txt
        </a>
      </div>

      <h3>Files</h3>
      <ul>
        <li>
          <code>questions.csv</code> — columns: <code>question</code> (text),
          <code>is_correct</code> (1 = model answered correctly, 0 = incorrect)
        </li>
        <li>
          <code>corpus.txt</code> — reference text representing web content likely in LLM training data
        </li>
      </ul>

      <h3>Contamination Signal: 8-gram Overlap Score</h3>
      <p>
        For each question, compute:
      </p>
      <pre><code>overlap_score = (# of 8-word windows in the question that appear verbatim in corpus)
              / (total # of 8-word windows in the question)</code></pre>
      <p>
        <strong>Tokenisation rule:</strong> lowercase the text, replace all non-alphanumeric characters
        with spaces, split on whitespace, discard empty tokens.
      </p>
      <p>
        A question is <strong>contaminated</strong> if <code>overlap_score &gt; ${r.threshold}</code>.
      </p>

      <h3>Task — compute three values</h3>
      <ol>
        <li>
          <strong><code>contaminated_count</code></strong> — number of questions with
          <code>overlap_score &gt; ${r.threshold}</code>
        </li>
        <li>
          <strong><code>reported_accuracy</code></strong> — overall accuracy across all questions
          (<code>sum(is_correct) / N × 100</code>, rounded to 2 d.p.)
        </li>
        <li>
          <strong><code>adjusted_accuracy</code></strong> — accuracy on <em>non-contaminated</em>
          questions only (<code>sum(is_correct) / count × 100</code> for questions with
          <code>overlap_score ≤ ${r.threshold}</code>, rounded to 2 d.p.)
        </li>
      </ol>

      <h3>Reference JavaScript (browser console)</h3>
      <pre><code>// Load files first, then:
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\\s]/g, " ")
             .trim().split(/\\s+/).filter(w => w.length > 0);
}
function ngrams(tokens, n) {
  const s = new Set();
  for (let i = 0; i <= tokens.length - n; i++)
    s.add(tokens.slice(i, i + n).join(" "));
  return s;
}
function overlapScore(question, corpusNgrams, n = 8) {
  const qt = tokenize(question);
  if (qt.length < n) return 0;
  const qg = ngrams(qt, n);
  let hits = 0;
  for (const g of qg) if (corpusNgrams.has(g)) hits++;
  return qg.size > 0 ? hits / qg.size : 0;
}

// corpusNgrams = ngrams(tokenize(corpusText), 8)
// questions = parsed rows from questions.csv
// threshold = ${r.threshold}
// Then compute the three values.</code></pre>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>Build the set of all corpus 8-grams once — looking up each question's n-grams is then O(k).</li>
          <li>A question shorter than 8 tokens after tokenisation has an overlap score of 0 by definition.</li>
          <li>
            <code>reported_accuracy</code> is computed over <em>all</em> questions including contaminated ones —
            it's what the benchmark "claims".
          </li>
          <li>
            <code>adjusted_accuracy</code> uses only the <em>non-contaminated</em> questions as the denominator.
            If all questions are contaminated the value is undefined — but the data is seeded to prevent that.
          </li>
          <li>
            <strong>The pedagogical reveal:</strong> adjusted accuracy will always be lower than reported
            accuracy. The gap tells you how much contamination inflated the model's score.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit three comma-separated values:</strong><br/>
        <span class="text-muted" style="font-weight:normal">
          <code>contaminated_count, reported_accuracy, adjusted_accuracy</code>
        </span>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width:320px"
        placeholder="e.g.  7, 82.50, 74.33"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Implementing n-gram extraction and set-based overlap computation</li>
        <li>Applying a threshold-based contamination filter to a dataset</li>
        <li>Understanding benchmark contamination and its effect on reported accuracy</li>
        <li>Computing conditional statistics on a filtered subset</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:w,answer:f}}var Nt,Dt,An,Cn,In,Mn,Rn,qn,Pt=F(()=>{"use strict";Nt=B(H(),1),Dt="q-leakage-auditor",An=["general trivia","coding puzzles","science questions","history facts","math word problems"],Cn=["BenchmarkLab","EvalForge","TestCraft","MetricsHub","ValidAI"],In=[.3,.4,.5],Mn=[40,50,60],Rn=["the speed of light in a vacuum is approximately 299792 kilometres per second","the mitochondria is often referred to as the powerhouse of the cell","water boils at one hundred degrees celsius at standard atmospheric pressure","the largest planet in our solar system is jupiter which has a diameter of about 143000 kilometres","the great wall of china stretches over twenty one thousand kilometres","deoxyribonucleic acid carries the genetic instructions for all living organisms","the pythagorean theorem states that the square of the hypotenuse equals the sum of squares of the other sides","photosynthesis is the process by which plants convert sunlight into chemical energy","the amazon river discharges more freshwater into the ocean than any other river on earth","the human brain contains approximately eighty six billion neurons","the boiling point of ethanol is seventy eight point four degrees celsius","mount everest is the highest mountain above sea level at eight thousand eight hundred forty nine metres","the speed of sound in air at sea level is approximately three hundred forty three metres per second","the first programmable electronic computer was eniac completed in nineteen forty five","the average distance from the earth to the moon is three hundred eighty four thousand kilometres","the formula for computing compound interest is a equals p times one plus r over n raised to nt","a binary search algorithm finds an element in a sorted array in order log n time","the french revolution began in seventeen eighty nine with the storming of the bastille","isaac newton formulated the three laws of motion in his principia mathematica in sixteen eighty seven","charles darwin published on the origin of species in eighteen fifty nine","the human genome contains approximately three billion base pairs of dna","the area of a circle is equal to pi times the radius squared","the treaty of versailles was signed in nineteen nineteen ending the first world war","the bohr model describes electrons orbiting the nucleus at fixed quantised energy levels","an algorithm is said to run in polynomial time if its complexity is bounded by a polynomial function","the riemann hypothesis concerns the distribution of prime numbers and remains unproven","the haversine formula computes great circle distances between two points on a sphere","gradient descent iteratively adjusts parameters by moving in the direction of the negative gradient","a convolutional neural network applies learned filters across spatial dimensions of the input","the central limit theorem states that sample means approach a normal distribution as sample size grows","the krebs cycle is a series of chemical reactions used to generate energy in aerobic organisms","ohms law states that voltage equals current multiplied by resistance","the doppler effect describes how the observed frequency of a wave changes with relative motion","bernoullis principle relates fluid speed to pressure in incompressible laminar flow","the second law of thermodynamics states that entropy in an isolated system never decreases","a blockchain is a distributed ledger that records transactions in cryptographically linked blocks","the halting problem is undecidable meaning no algorithm can determine whether any program halts","an api or application programming interface defines how software components communicate","relational databases organise data into tables with rows and columns linked by foreign keys","a hash function maps data of arbitrary size to a fixed size digest deterministically","the tcp ip model divides network communication into four abstraction layers","sql stands for structured query language and is used to manage relational databases","a decision tree partitions the feature space using axis aligned splits to minimise impurity","support vector machines find the hyperplane that maximises the margin between two classes","backpropagation computes gradients of the loss with respect to each parameter via the chain rule","regularisation techniques such as dropout reduce overfitting in neural networks","the attention mechanism in transformers computes a weighted sum of values guided by query key similarity","a confusion matrix shows the counts of true positives false positives true negatives and false negatives","precision is the fraction of predicted positives that are truly positive","recall is the fraction of actual positives that are correctly identified by the model"],qn=["What is the difference between supervised and unsupervised learning?","Explain how a hash table handles collisions using chaining.","What is the time complexity of quicksort in the average case?","How does transformer architecture differ from recurrent neural networks?","What is the purpose of a validation set in machine learning?","Describe the difference between precision and recall.","What does it mean for a function to be pure in functional programming?","Explain the concept of overfitting and how to detect it.","What is the difference between a process and a thread?","How does public key cryptography enable secure communication?","What is the bias-variance tradeoff in statistical modelling?","Explain what a race condition is and how it arises.","What is the purpose of normalisation in relational databases?","How does gradient clipping help training deep neural networks?","What is the difference between accuracy and F1 score?","Describe the MapReduce programming model.","What is memoisation and when should you use it?","Explain the difference between a stack and a queue.","What is a deadlock and what conditions must hold for one to occur?","How does the CAP theorem constrain distributed database design?","What is the difference between a type I error and a type II error?","Explain what cross-validation is used for.","What does ACID stand for in database transactions?","How does a bloom filter work and what is its false positive rate?","What is the difference between eager and lazy evaluation?","Explain the concept of idempotency in HTTP methods.","What is the purpose of an index in a relational database?","How does the attention mechanism help models handle long-range dependencies?","What is a kernel trick and why is it used in SVMs?","Explain what a RESTful API is and its key constraints.","What is the difference between L1 and L2 regularisation?","How does batch normalisation speed up neural network training?","What is an abstract syntax tree and how is it used in compilation?","Explain the concept of eventual consistency in distributed systems.","What is the halting problem and why is it important in computer science?","How does a generative adversarial network work?","What is the difference between horizontal and vertical scaling?","Explain what a pointer is and how pointer arithmetic works.","What is the role of the learning rate in gradient descent?","How does consistent hashing reduce rebalancing in distributed caches?","What is the difference between a B-tree and a B+ tree?","Explain the concept of tail-call optimisation.","What is the purpose of a foreign key constraint?","How does the EM algorithm handle latent variables?","What is the difference between synchronous and asynchronous I/O?","Explain how skip-gram word embeddings are trained.","What is the danger of data leakage in machine learning pipelines?","How does a lock-free data structure avoid the need for mutexes?","What is the Liskov substitution principle?","How does reinforcement learning differ from supervised learning?","What is the significance of the Turing test?","Explain the concept of information entropy.","What is a sufficient statistic and why does it matter?","How does the Floyd-Warshall algorithm compute all-pairs shortest paths?","What is the difference between depth-first and breadth-first search?","Explain how federated learning preserves data privacy.","What is the purpose of the softmax function in classification?","How does Monte Carlo sampling approximate intractable distributions?","What is a Merkle tree and where is it used?","Explain the difference between optimistic and pessimistic concurrency control."]});var Bt={};P(Bt,{default:()=>Hn});import{html as On}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{loadPyodide as Fn}from"https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";function jt(o){let t=new Blob([o],{type:"text/csv"});return URL.createObjectURL(t)}async function jn(o){let t=`${o?.email??""}#${Ht}`,e=`_contaminationData_${t}`;if(!globalThis[e]){ie.globals.set("EXAM_SEED",t),await ie.runPythonAsync(Pn);let s=ie.globals.get("__exam_gen__");globalThis[e]=JSON.parse(String(s))}return globalThis[e]}async function Hn({user:o,weight:t=1}){let e=Ht,s="Train-Test Contamination Scanner",a=await jn(o),r=jt(a.train_csv),p=jt(a.test_csv),n=String(o?.email??"student").replace(/[^a-z0-9]/gi,"_"),l=i=>{let u=String(i??"").trim();if(!u)throw new Error("Please enter your answer.");let m=u.split(",").map(T=>T.trim());if(m.length!==4)throw new Error("Expected 4 comma-separated values: leaked_count, leaked_accuracy, clean_accuracy, inflation_pp");let[c,f,w,_]=m.map(Number);if(m.some(T=>isNaN(Number(T))))throw new Error("All four values must be numbers.");if(c!==a.leaked_count)throw new Error(`leaked_count = ${c} is incorrect. A row is leaked if its feature columns (age, income, education, hours_per_week) exactly match any training row.`);if(Math.abs(f-a.leaked_accuracy)>.05)throw new Error(`leaked_accuracy = ${f} is incorrect (expected ~ ${a.leaked_accuracy}). Compute is_correct rate for leaked rows as a percentage.`);if(Math.abs(w-a.clean_accuracy)>.05)throw new Error(`clean_accuracy = ${w} is incorrect (expected ~ ${a.clean_accuracy}). Compute is_correct rate for non-leaked rows as a percentage.`);if(Math.abs(_-a.inflation_pp)>.05)throw new Error(`inflation_pp = ${_} is incorrect (expected ~ ${a.inflation_pp}). inflation_pp = reported_accuracy - clean_accuracy.`);return!0},d=On`
    <div class="mb-3">
      <h2 id="${e}">Train-Test Contamination Scanner</h2>

      <p>
        A team published a model with <strong>${a.reported_acc}%</strong> accuracy on their held-out test set. You
        suspect data leakage: some test examples appeared in training.
      </p>

      <p>You have access to:</p>
      <ul>
        <li><strong>train.csv</strong> — training examples (${a.n_train} rows), columns: ${a.col_list}, label</li>
        <li>
          <strong>test.csv</strong> — test examples (${a.n_test} rows), same columns plus predicted_label, is_correct
        </li>
      </ul>

      <div class="d-flex gap-3 mb-3">
        <a href="${r}" download="${n}_train.csv" class="btn btn-outline-primary btn-sm">
          Download train.csv
        </a>
        <a href="${p}" download="${n}_test.csv" class="btn btn-outline-danger btn-sm">
          Download test.csv
        </a>
      </div>

      <p>
        A row is <strong>leaked</strong> if its feature columns (<code>${a.col_list}</code>) are identical to any
        training row. The <code>label</code> column is <em>not</em> used as a feature for matching.
      </p>

      <h3>Your Task</h3>
      <ol>
        <li>Identify all leaked test rows</li>
        <li>Check: do leaked rows have a higher <code>is_correct</code> rate than clean rows?</li>
        <li>Compute the clean accuracy — accuracy on only the non-leaked test rows</li>
      </ol>

      <p>Submit four values, comma-separated:</p>
      <pre><code>leaked_count, leaked_accuracy, clean_accuracy, inflation_pp</code></pre>
      <p>Where:</p>
      <ul>
        <li><strong>leaked_count</strong> — number of test rows whose features match a training row (exact integer)</li>
        <li><strong>leaked_accuracy</strong> — is_correct rate of leaked rows as percentage (2 decimal places)</li>
        <li><strong>clean_accuracy</strong> — is_correct rate of non-leaked rows as percentage (2 decimal places)</li>
        <li>
          <strong>inflation_pp</strong> — ${a.reported_acc} minus clean_accuracy, in percentage points (2 decimal
          places)
        </li>
      </ul>

      <p><strong>Example:</strong> <code>23, 94.57, 81.23, 7.77</code></p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            Use <code>pandas.merge()</code> on the feature columns to find which test rows match any training row.
          </li>
          <li>
            A left merge with an indicator column (<code>indicator=True</code>) makes it easy to separate leaked vs clean
            rows.
          </li>
          <li>Leaked accuracy = <code>leaked_rows["is_correct"].mean() * 100</code>.</li>
          <li>inflation_pp = reported_accuracy - clean_accuracy (should be positive).</li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your answer (4 comma-separated values):</strong>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width: 400px"
        placeholder="e.g. 23, 94.57, 81.23, 7.77"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Detecting row-level train-test overlap using feature matching</li>
        <li>Computing conditional accuracy on subsets</li>
        <li>Quantifying accuracy inflation from data leakage</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:d,answer:l}}var ie,Ht,Pn,Ut=F(async()=>{"use strict";globalThis.pyodide||(globalThis.pyodide=await Fn());ie=globalThis.pyodide;globalThis._contaminationReady||(await ie.loadPackage(["pandas"]),globalThis._contaminationReady=!0);Ht="q-train-test-contamination",Pn=`
import pandas as pd
import random
import json

def _generate(seed):
    rng = random.Random(seed)

    n_test_choices = [200, 300, 400]
    leak_fracs = [0.05, 0.10, 0.15]
    n_train = rng.choice([800, 1000, 1200])
    n_test = rng.choice(n_test_choices)
    leak_frac = rng.choice(leak_fracs)
    leaked_count = int(n_test * leak_frac)

    # Feature columns: age, income, education, hours_per_week
    def make_row(r):
        return {
            "age": r.randint(18, 70),
            "income": round(r.uniform(15000, 120000), 2),
            "education": r.choice(["high_school", "bachelors", "masters", "phd", "associate"]),
            "hours_per_week": r.randint(10, 60),
        }

    # Generate training data
    train_rows = [make_row(rng) for _ in range(n_train)]
    for i, row in enumerate(train_rows):
        row["label"] = rng.choice([0, 1])

    # Generate clean test rows (not in training)
    clean_count = n_test - leaked_count
    clean_rows = [make_row(rng) for _ in range(clean_count)]

    # Leaked rows: copy feature columns from random training rows
    leak_indices = rng.sample(range(n_train), leaked_count)
    leaked_rows = []
    for idx in leak_indices:
        row = {k: v for k, v in train_rows[idx].items() if k != "label"}
        leaked_rows.append(row)

    # Combine test rows
    test_rows = clean_rows + leaked_rows
    rng.shuffle(test_rows)

    # Assign true labels and predictions
    # Leaked rows: higher accuracy (85-95%)
    # Clean rows: lower accuracy (70-80%)
    leaked_acc = rng.uniform(0.85, 0.95)
    clean_acc = rng.uniform(0.70, 0.80)

    # Build a set of feature tuples from training for lookup
    feature_cols = ["age", "income", "education", "hours_per_week"]
    train_features = set()
    for row in train_rows:
        train_features.add(tuple(row[c] for c in feature_cols))

    correct_leaked = 0
    correct_clean = 0
    total_leaked = 0
    total_clean = 0

    for row in test_rows:
        feat = tuple(row[c] for c in feature_cols)
        is_leaked = feat in train_features
        true_label = rng.choice([0, 1])
        row["label"] = true_label

        if is_leaked:
            total_leaked += 1
            is_correct = rng.random() < leaked_acc
        else:
            total_clean += 1
            is_correct = rng.random() < clean_acc

        if is_correct:
            row["predicted_label"] = true_label
            if is_leaked:
                correct_leaked += 1
            else:
                correct_clean += 1
        else:
            row["predicted_label"] = 1 - true_label
        row["is_correct"] = 1 if row["predicted_label"] == row["label"] else 0

    actual_leaked_acc = round(correct_leaked / total_leaked * 100, 2) if total_leaked > 0 else 0
    actual_clean_acc = round(correct_clean / total_clean * 100, 2) if total_clean > 0 else 0
    reported_acc = round(sum(r["is_correct"] for r in test_rows) / len(test_rows) * 100, 2)
    inflation_pp = round(reported_acc - actual_clean_acc, 2)

    # Build CSVs
    train_df = pd.DataFrame(train_rows)
    test_df = pd.DataFrame(test_rows)

    col_list = ", ".join(feature_cols)

    return {
        "train_csv": train_df[feature_cols + ["label"]].to_csv(index=False),
        "test_csv": test_df[feature_cols + ["label", "predicted_label", "is_correct"]].to_csv(index=False),
        "n_train": n_train,
        "n_test": n_test,
        "col_list": col_list,
        "reported_acc": reported_acc,
        "leaked_count": total_leaked,
        "leaked_accuracy": actual_leaked_acc,
        "clean_accuracy": actual_clean_acc,
        "inflation_pp": inflation_pp,
    }

__exam_gen__ = json.dumps(_generate(EXAM_SEED))
`});var zt={};P(zt,{default:()=>Gn});import{html as Bn}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{loadPyodide as Un}from"https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";function zn(o){let t=new Blob([o],{type:"text/csv"});return URL.createObjectURL(t)}async function Yn(o){let t=`${o?.email??""}#${Wt}`,e=`_idempotencyData_${t}`;if(!globalThis[e]){le.globals.set("EXAM_SEED",t),await le.runPythonAsync(Wn);let s=le.globals.get("__exam_gen__");globalThis[e]=JSON.parse(String(s))}return globalThis[e]}async function Gn({user:o,weight:t=1}){let e=Wt,s="The Idempotency Prober",a=await Yn(o),r=zn(a.records_csv),p=String(o?.email??"student").replace(/[^a-z0-9]/gi,"_"),n=d=>{let i=String(d??"").trim();if(!i)throw new Error("Please enter your answer.");let u=i.split(",").map(w=>w.trim());if(u.length!==3)throw new Error("Expected 3 comma-separated integers: idempotency_violations, monotonicity_violations, null_stability_violations");if(u.some(w=>!/^\d+$/.test(w)))throw new Error("All three values must be non-negative integers.");let[m,c,f]=u.map(Number);if(m!==a.idempotency_violations)throw new Error(`idempotency_violations = ${m} is incorrect. Run f(f(x)) and compare with f(x) for all ${a.N} records. Count rows where any column value differs.`);if(c!==a.monotonicity_violations)throw new Error(`monotonicity_violations = ${c} is incorrect. For all pairs (i, j) where record i has strictly higher ${a.monotone_col} than record j in the original data, check if the processed output preserves this ordering.`);if(f!==a.null_stability_violations)throw new Error(`null_stability_violations = ${f} is incorrect. Count records that had no nulls in the input but have at least one null after processing.`);return!0},l=Bn`
    <div class="mb-3">
      <h2 id="${e}">The Idempotency Prober</h2>

      <p>
        A data preprocessing function is supposed to "normalize and clean" records before they enter an ML pipeline.
        You've been given the implementation and <strong>${a.N}</strong> test records.
      </p>

      <div class="d-flex gap-3 mb-3">
        <a href="${r}" download="${p}_records.csv" class="btn btn-outline-primary btn-sm">
          Download test records (${a.N} rows)
        </a>
      </div>

      <h3>Function Implementation</h3>
      <pre><code class="language-python">${a.function_code}</code></pre>

      <h3>Properties to Check</h3>
      <p>A well-behaved preprocessing function should have these properties:</p>

      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr>
            <th>Property</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Idempotency</strong></td>
            <td>
              Running it twice produces the same result as running it once:
              <code>f(f(x)) == f(x)</code> for all records. Count records where any column value differs (use tolerance
              1e-9 for floats).
            </td>
          </tr>
          <tr>
            <td><strong>Monotonicity</strong></td>
            <td>
              For all pairs of records where record A has a strictly higher value in column
              <code>${a.monotone_col}</code> than record B in the <em>original</em> data, the processed output should
              also maintain A > B. Count the number of <strong>pairs</strong> that violate this. Skip pairs where either
              original value is null.
            </td>
          </tr>
          <tr>
            <td><strong>Null Stability</strong></td>
            <td>
              If a record contains no null values in the input, the output should also contain no null values. Count
              records that violate this.
            </td>
          </tr>
        </tbody>
      </table>

      <p>Submit three integers, comma-separated:</p>
      <pre><code>idempotency_violations, monotonicity_violations, null_stability_violations</code></pre>
      <p><strong>Example:</strong> <code>0, 3, 7</code></p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            Load the CSV with <code>pandas.read_csv()</code> and run the function once to get <code>result1</code>, then
            run it again on <code>result1</code> to get <code>result2</code>.
          </li>
          <li>
            For idempotency, compare <code>result1</code> and <code>result2</code> row by row. Use
            <code>abs(a - b) > 1e-9</code> for float comparisons.
          </li>
          <li>
            For monotonicity, iterate over all pairs where the original <code>${a.monotone_col}</code> values have a
            strict ordering.
          </li>
          <li>For null stability, check <code>row.isna().sum()</code> before and after processing.</li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your answer (3 comma-separated integers):</strong>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width: 300px"
        placeholder="e.g. 0, 3, 7"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Testing data transformation functions for invariant properties</li>
        <li>Understanding idempotency, monotonicity, and null stability</li>
        <li>Running Python code and comparing outputs systematically</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:l,answer:n}}var le,Wt,Wn,Yt=F(async()=>{"use strict";globalThis.pyodide||(globalThis.pyodide=await Un());le=globalThis.pyodide;globalThis._idempotencyReady||(await le.loadPackage(["pandas"]),globalThis._idempotencyReady=!0);Wt="q-idempotency-prober",Wn=`
import pandas as pd
import random
import json
import math

# Bank of preprocessing function variants.
# Each has a specific combination of property violations.
# The function takes a DataFrame row (as dict) and returns a processed dict.
FUNCTION_BANK = [
    {
        "name": "normalize_record_v1",
        "description": "Strips whitespace, scales numeric fields to 0-1 range, fills nulls with median",
        "code": '''def preprocess(df, monotone_col):
    """Normalize and clean records."""
    result = df.copy()
    # Strip whitespace from string columns
    for col in result.select_dtypes(include="object").columns:
        result[col] = result[col].str.strip()
    # Scale numeric columns to 0-1
    for col in result.select_dtypes(include="number").columns:
        mn, mx = result[col].min(), result[col].max()
        if mx > mn:
            result[col] = (result[col] - mn) / (mx - mn)
        else:
            result[col] = 0.0
    # Fill nulls with 0.5
    result = result.fillna(0.5)
    return result''',
        "bugs": {"idempotency": True, "monotonicity": False, "null_stability": False},
        "explanation": "Re-scaling after first pass changes min/max, so f(f(x)) != f(x)"
    },
    {
        "name": "normalize_record_v2",
        "description": "Clips values to [10th, 90th] percentile, forward-fills nulls",
        "code": '''def preprocess(df, monotone_col):
    """Clip outliers and fill missing values."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        lo = result[col].quantile(0.1)
        hi = result[col].quantile(0.9)
        result[col] = result[col].clip(lo, hi)
    result = result.fillna(method="ffill").fillna(method="bfill")
    return result''',
        "bugs": {"idempotency": False, "monotonicity": True, "null_stability": False},
        "explanation": "Clipping preserves idempotency but breaks ordering near boundaries"
    },
    {
        "name": "normalize_record_v3",
        "description": "Z-score normalization with null handling via computed ratio",
        "code": '''def preprocess(df, monotone_col):
    """Z-score normalize numeric columns, handle nulls via ratio."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        mean = result[col].mean()
        std = result[col].std()
        if std > 0:
            result[col] = (result[col] - mean) / std
        else:
            result[col] = 0.0
    # Fill remaining nulls using column ratio
    for col in result.columns:
        null_count = result[col].isna().sum()
        total = len(result)
        if null_count > 0:
            ratio = null_count / total
            result[col] = result[col].fillna(ratio)
    return result''',
        "bugs": {"idempotency": True, "monotonicity": False, "null_stability": False},
        "explanation": "Z-score re-normalization shifts values on second pass"
    },
    {
        "name": "normalize_record_v4",
        "description": "Rank-based normalization with null propagation",
        "code": '''def preprocess(df, monotone_col):
    """Rank-normalize numeric columns."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        result[col] = result[col].rank(method="average", na_option="keep")
        n = result[col].count()
        if n > 0:
            result[col] = result[col] / n
    return result''',
        "bugs": {"idempotency": True, "monotonicity": False, "null_stability": False},
        "explanation": "Rank normalization re-ranks on second pass, changing values"
    },
    {
        "name": "normalize_record_v5",
        "description": "Min-max scaling with log transform for skewed columns",
        "code": '''def preprocess(df, monotone_col):
    """Log-transform then min-max scale."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        # Log transform (shift to positive first)
        mn = result[col].min()
        if pd.notna(mn):
            result[col] = result[col] - mn + 1
            result[col] = result[col].apply(lambda x: x if pd.isna(x) else round(x, 6))
            result[col] = result[col].apply(lambda x: x if pd.isna(x) else max(x, 1e-6))
            import math
            result[col] = result[col].apply(lambda x: x if pd.isna(x) else math.log(x))
    # Fill nulls
    result = result.fillna(0)
    return result''',
        "bugs": {"idempotency": True, "monotonicity": False, "null_stability": False},
        "explanation": "Log transform applied twice changes values"
    },
    {
        "name": "normalize_record_v6",
        "description": "Percentile binning with null fill",
        "code": '''def preprocess(df, monotone_col):
    """Bin numeric values into percentile buckets."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        try:
            result[col] = pd.qcut(result[col], q=10, labels=False, duplicates="drop")
        except Exception:
            pass
    result = result.fillna(-1)
    return result''',
        "bugs": {"idempotency": False, "monotonicity": True, "null_stability": False},
        "explanation": "Binning is idempotent (re-binning same buckets) but breaks fine-grained ordering"
    },
    {
        "name": "normalize_record_v7",
        "description": "Robust scaler using median/IQR with division-based null fill",
        "code": '''def preprocess(df, monotone_col):
    """Robust scaling using median and IQR, with computed null fill."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        median = result[col].median()
        q1 = result[col].quantile(0.25)
        q3 = result[col].quantile(0.75)
        iqr = q3 - q1
        if iqr > 0:
            result[col] = (result[col] - median) / iqr
        else:
            result[col] = 0.0
        # Fill nulls with column mean divided by std
        mean = result[col].mean()
        std = result[col].std()
        fill_val = mean / std if std != 0 else 0
        result[col] = result[col].fillna(fill_val)
    return result''',
        "bugs": {"idempotency": True, "monotonicity": False, "null_stability": False},
        "explanation": "Re-scaling changes median/IQR on second pass"
    },
    {
        "name": "normalize_record_v8",
        "description": "Simple clipping to fixed bounds with forward fill",
        "code": '''def preprocess(df, monotone_col):
    """Clip numeric values to [0, 100] and forward-fill nulls."""
    result = df.copy()
    for col in result.select_dtypes(include="number").columns:
        result[col] = result[col].clip(0, 100)
    result = result.fillna(method="ffill").fillna(0)
    return result''',
        "bugs": {"idempotency": False, "monotonicity": True, "null_stability": False},
        "explanation": "Clipping to fixed bounds is idempotent, but values near 0/100 boundary lose relative ordering"
    },
]

def _generate(seed):
    rng = random.Random(seed)

    # Pick a function variant
    variant_idx = rng.randint(0, len(FUNCTION_BANK) - 1)
    variant = FUNCTION_BANK[variant_idx]

    N = rng.choice([50, 80, 100])
    monotone_col = rng.choice(["value_a", "value_b", "score"])

    # Generate test records as a DataFrame
    records = []
    for i in range(N):
        row = {
            "id": f"R{i+1:04d}",
            "value_a": round(rng.uniform(-50, 200), 2),
            "value_b": round(rng.uniform(0, 500), 2),
            "score": round(rng.uniform(-10, 110), 2),
            "category": rng.choice(["A", "B", "C", "D"]),
        }
        # Inject some nulls (~10% chance per numeric column)
        if rng.random() < 0.10:
            null_col = rng.choice(["value_a", "value_b", "score"])
            row[null_col] = None
        records.append(row)

    df = pd.DataFrame(records)

    # Execute the function code
    exec_globals = {"pd": pd, "math": math}
    exec(variant["code"], exec_globals)
    preprocess = exec_globals["preprocess"]

    # Test idempotency: f(f(x)) == f(x)
    once = preprocess(df.copy(), monotone_col)
    twice = preprocess(once.copy(), monotone_col)
    idempotency_violations = 0
    for i in range(N):
        row_once = once.iloc[i]
        row_twice = twice.iloc[i]
        is_different = False
        for col in df.columns:
            v1 = row_once[col]
            v2 = row_twice[col]
            if pd.isna(v1) and pd.isna(v2):
                continue
            if pd.isna(v1) or pd.isna(v2):
                is_different = True
                break
            if isinstance(v1, float) and isinstance(v2, float):
                if abs(v1 - v2) > 1e-9:
                    is_different = True
                    break
            elif v1 != v2:
                is_different = True
                break
        if is_different:
            idempotency_violations += 1

    # Test monotonicity on the monotone_col
    monotonicity_violations = 0
    for i in range(N):
        for j in range(i + 1, N):
            orig_i = df.iloc[i][monotone_col]
            orig_j = df.iloc[j][monotone_col]
            if pd.isna(orig_i) or pd.isna(orig_j):
                continue
            if orig_i <= orig_j:
                continue
            # orig_i > orig_j strictly, check if once_i > once_j
            proc_i = once.iloc[i][monotone_col]
            proc_j = once.iloc[j][monotone_col]
            if pd.isna(proc_i) or pd.isna(proc_j):
                monotonicity_violations += 1
                continue
            if proc_i <= proc_j:
                monotonicity_violations += 1

    # Test null stability
    null_stability_violations = 0
    for i in range(N):
        orig_row = df.iloc[i]
        proc_row = once.iloc[i]
        if orig_row.isna().sum() == 0 and proc_row.isna().sum() > 0:
            null_stability_violations += 1

    return {
        "function_name": variant["name"],
        "function_code": variant["code"],
        "N": N,
        "monotone_col": monotone_col,
        "records_csv": df.to_csv(index=False),
        "idempotency_violations": idempotency_violations,
        "monotonicity_violations": monotonicity_violations,
        "null_stability_violations": null_stability_violations,
    }

__exam_gen__ = json.dumps(_generate(EXAM_SEED))
`});var Kt={};P(Kt,{default:()=>er});import{html as Qn}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function Kn(){if(globalThis._latencySlaDB)return globalThis._latencySlaDB;let o=await import("https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/+esm"),t=await o.selectBundle(o.getJsDelivrBundles()),e=URL.createObjectURL(new Blob([`importScripts("${t.mainWorker}");`],{type:"text/javascript"})),s=new Worker(e),a=new o.AsyncDuckDB(new o.VoidLogger,s);return await a.instantiate(t.mainModule,t.pthreadWorker),globalThis._latencySlaDB=a,a}function Gt(o,t,e){let s=Math.max(1e-10,o()),a=o(),r=Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*a);return Math.max(1,t+e*r)}function Xn(o){let t=(0,Vt.default)(`${o}#${Jt}`),e=_=>_[Math.floor(t()*_.length)],s=e(Vn),a=3+Math.floor(t()*3),r=[],p=new Set;for(let _=0;_<a;_++){let T;do T=e(Jn);while(p.has(T));p.add(T),r.push(T)}let n=e([50,80,100]),l=e([200,300,400]),d=e([500,800,1e3]),i=e([1,2,5]),u=["pass","latency_tail","error_rate"];for(;u.length<a;)u.push(e(["pass","latency_tail"]));for(let _=u.length-1;_>0;_--){let T=Math.floor(t()*(_+1));[u[_],u[T]]=[u[T],u[_]]}let m=[],c=[],f=new Date("2025-01-15T00:00:00Z");for(let _=0;_<a;_++){let T=r[_],x=u[_],g=500+Math.floor(t()*500),v=n*(.4+.3*t()),S=v*.3,h=0,k=0,A=0;x==="latency_tail"&&(h=.04+.04*t(),k=d*(1.5+t()),A=k*.3);let $;x==="error_rate"?$=i+.5+t()*3:$=i*(.1+.4*t());let y=[],E=0;for(let C=0;C<g;C++){let b;h>0&&t()<h?b=Gt(t,k,A):b=Gt(t,v,S),b=Math.round(b*100)/100;let R=t()<$/100;R&&E++;let L=new Date(f.getTime()+Math.floor(t()*7*864e5));m.push({endpoint:T,latency_ms:b,is_error:R,logged_at:L.toISOString().replace("T"," ").slice(0,19)}),y.push(b)}y.sort((C,b)=>C-b);let I=Se(y,.5),M=Se(y,.95),q=Se(y,.99),N=Math.round(E/g*1e4)/100,D=[];I>n&&D.push("p50"),M>l&&D.push("p95"),q>d&&D.push("p99"),N>i&&D.push("error_rate"),c.push({endpoint:T,p50_ms:Math.round(I*100)/100,p95_ms:Math.round(M*100)/100,p99_ms:Math.round(q*100)/100,error_rate_pct:N,sla_status:D.length===0?"PASS":"FAIL",violated_slas:D.sort().join(",")})}c.sort((_,T)=>_.endpoint.localeCompare(T.endpoint));let w=["endpoint,latency_ms,is_error,logged_at"];for(let _ of m)w.push(`${_.endpoint},${_.latency_ms},${_.is_error},${_.logged_at}`);return{company:s,p50_sla:n,p95_sla:l,p99_sla:d,error_sla:i,csvText:w.join(`
`),correct:c}}function Se(o,t){let e=t*(o.length-1),s=Math.floor(e),a=Math.ceil(e);return s===a?o[s]:o[s]+(o[a]-o[s])*(e-s)}async function Qt(o,t,e){let s=`_slaTable_${t}`;if(globalThis[s])return;await o.registerFileText(`${t}_sla.csv`,e);let a=await o.connect();await a.query("DROP TABLE IF EXISTS api_logs"),await a.query(`CREATE TABLE api_logs AS SELECT * FROM read_csv_auto('${t}_sla.csv')`),await a.close(),globalThis[s]=!0}function Zn(o){let t=o.schema.fields.map(e=>e.name);return o.toArray().map(e=>{let s={};for(let a of t){let r=e[a];s[a]=typeof r=="bigint"?Number(r):r}return s})}async function er({user:o,weight:t=1}){let e=Jt,s="The Latency SLA Checker",a=`_slaData_${o.email}`;globalThis[a]||(globalThis[a]=Xn(o.email));let r=globalThis[a],p=await Kn();await Qt(p,o.email,r.csvText);let n=async d=>{let i=String(d??"").trim();if(!i)throw new Error("Please enter a SQL query.");let u=i.toUpperCase().trimStart();if(!u.startsWith("SELECT")&&!u.startsWith("WITH"))throw new Error("Only SELECT / WITH queries are allowed.");if(!i.toLowerCase().includes("api_logs"))throw new Error('Your query must reference the "api_logs" table.');await Qt(p,o.email,r.csvText);let m=await p.connect(),c;try{c=await m.query(i)}catch(x){throw await m.close(),new Error(`SQL error: ${String(x.message??x).split(`
`)[0]}`)}await m.close();let f=Zn(c);if(f.length===0)throw new Error("Your query returned no rows.");let _=["endpoint","p50_ms","p95_ms","p99_ms","error_rate_pct","sla_status","violated_slas"].filter(x=>!(x in f[0]));if(_.length)throw new Error(`Missing column(s): ${_.map(x=>`"${x}"`).join(", ")}.`);if(f.length!==r.correct.length)throw new Error(`Expected ${r.correct.length} rows (one per endpoint), got ${f.length}.`);let T=[...f].sort((x,g)=>String(x.endpoint).localeCompare(String(g.endpoint)));for(let x=0;x<r.correct.length;x++){let g=r.correct[x],v=T[x],S=g.endpoint;if(String(v.endpoint)!==S)throw new Error(`Row ${x+1}: expected endpoint "${S}", got "${v.endpoint}".`);let h=(A,$)=>{let y=g[A],E=Number(v[A]);if(Math.abs(E-y)>$)throw new Error(`${S}: ${A} = ${E.toFixed(2)}, expected ~ ${y.toFixed(2)}.`)};if(h("p50_ms",1),h("p95_ms",2),h("p99_ms",5),h("error_rate_pct",.1),String(v.sla_status)!==g.sla_status)throw new Error(`${S}: sla_status = "${v.sla_status}", expected "${g.sla_status}".`);let k=String(v.violated_slas??"").split(",").map(A=>A.trim()).filter(Boolean).sort().join(",");if(k!==g.violated_slas)throw new Error(`${S}: violated_slas = "${k}", expected "${g.violated_slas}".`)}return!0},l=Qn`
    <div class="mb-3">
      <h2 id="${e}">The Latency SLA Checker</h2>

      <p>
        <strong>${r.company}</strong>'s API must meet these SLAs for each endpoint:
      </p>

      <table class="table table-sm table-bordered" style="max-width: 350px">
        <tbody>
          <tr>
            <td><strong>p50</strong> (median) latency</td>
            <td>&le; ${r.p50_sla} ms</td>
          </tr>
          <tr>
            <td><strong>p95</strong> latency</td>
            <td>&le; ${r.p95_sla} ms</td>
          </tr>
          <tr>
            <td><strong>p99</strong> latency</td>
            <td>&le; ${r.p99_sla} ms</td>
          </tr>
          <tr>
            <td><strong>Error rate</strong></td>
            <td>&le; ${r.error_sla.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>

      <h3>Table: <code>api_logs</code></h3>
      <pre><code>api_logs (
  endpoint    VARCHAR,    -- e.g. '/api/search'
  latency_ms  FLOAT,      -- request latency in milliseconds
  is_error    BOOLEAN,    -- true if request returned an error
  logged_at   TIMESTAMP   -- when the request was logged
)</code></pre>

      <h3>Task</h3>
      <p>
        Write a DuckDB SQL query returning <strong>one row per endpoint</strong> with these columns:
      </p>

      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr>
            <th>Column</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>endpoint</code></td>
            <td>Endpoint name</td>
          </tr>
          <tr>
            <td><code>p50_ms</code></td>
            <td>Median latency (2 decimal places)</td>
          </tr>
          <tr>
            <td><code>p95_ms</code></td>
            <td>95th percentile latency (2 decimal places)</td>
          </tr>
          <tr>
            <td><code>p99_ms</code></td>
            <td>99th percentile latency (2 decimal places)</td>
          </tr>
          <tr>
            <td><code>error_rate_pct</code></td>
            <td>Error rate as percentage (2 decimal places)</td>
          </tr>
          <tr>
            <td><code>sla_status</code></td>
            <td><code>'PASS'</code> if all 4 SLAs met, else <code>'FAIL'</code></td>
          </tr>
          <tr>
            <td><code>violated_slas</code></td>
            <td>Comma-separated list of violated SLAs (e.g. <code>'p95,error_rate'</code>), empty string if passing</td>
          </tr>
        </tbody>
      </table>

      <p>Order by <code>endpoint</code> ascending.</p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            Use <code>PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY latency_ms)</code> for p50, and similarly for p95 and
            p99.
          </li>
          <li>
            Error rate = <code>COUNT(*) FILTER (WHERE is_error = true) * 100.0 / COUNT(*)</code>.
          </li>
          <li>
            Use <code>CASE WHEN ... THEN 'PASS' ELSE 'FAIL' END</code> for sla_status.
          </li>
          <li>
            Build <code>violated_slas</code> with string concatenation, e.g.
            <code>CASE WHEN p95 > ${r.p95_sla} THEN 'p95,' ELSE '' END || ...</code> then trim the trailing comma.
          </li>
          <li>
            <strong>Key insight:</strong> The mean latency may look fine, but tail latencies (p95/p99) tell the real
            story.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your DuckDB SQL query:</strong>
      </label>
      <textarea
        id="${e}"
        name="${e}"
        class="form-control font-monospace"
        rows="18"
        placeholder="WITH metrics AS (
  SELECT
    endpoint,
    ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY latency_ms), 2) AS p50_ms,
    ...
  FROM api_logs
  GROUP BY endpoint
)
SELECT
  endpoint,
  p50_ms, p95_ms, p99_ms,
  error_rate_pct,
  ... AS sla_status,
  ... AS violated_slas
FROM metrics
ORDER BY endpoint;"
        required
      ></textarea>
      <div class="form-text">
        Runs in DuckDB in your browser against the <code>api_logs</code> table. Only <code>SELECT</code> /
        <code>WITH</code> statements are allowed.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Computing percentile latencies (p50, p95, p99) in SQL</li>
        <li>Understanding that mean latency hides tail latency problems</li>
        <li>Evaluating multiple SLA conditions independently</li>
        <li>Building composite status columns with conditional string logic</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:l,answer:n}}var Vt,Jt,Vn,Jn,Xt=F(()=>{"use strict";Vt=B(H(),1),Jt="q-latency-sla-checker",Vn=["StreamCore","DataPulse","CloudNova","SyncGrid","FlowStack"],Jn=["/api/search","/api/users","/api/orders","/api/auth","/api/reports","/api/upload","/api/analytics","/api/notifications"]});var to={};P(to,{default:()=>or});import{html as tr}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function or({user:o,weight:t=1}){let e=Zt,s="The Benchmark Overfitter",a=(0,eo.default)(`${o.email}#${Zt}`),r=_=>_[Math.floor(a()*_.length)],p=r([10,20,50,100,200]),n=r([500,1e3,2e3,5e3]),l=r([.82,.85,.88,.91,.94]),d=Math.sqrt(l*(1-l)/n),u=d*Math.sqrt(2*Math.log(p))*100,m=l*100-u,c={sigma:Math.round(d*1e6)/1e6,inflation_pp:Math.round(u*1e3)/1e3,adjusted_accuracy:Math.round(m*1e3)/1e3},f=_=>{let T=String(_??"").trim();if(!T)throw new Error("Please enter your answer.");let x=T.split(",").map(h=>h.trim());if(x.length!==3)throw new Error("Expected 3 comma-separated values: sigma, expected_inflation_pp, adjusted_accuracy");if(x.some(h=>isNaN(Number(h))))throw new Error("All three values must be numbers.");let[g,v,S]=x.map(Number);if(Math.abs(g-c.sigma)>2e-6)throw new Error(`sigma = ${g} is incorrect (expected ${c.sigma}). Formula: sqrt(p * (1-p) / n_test).`);if(Math.abs(v-c.inflation_pp)>.005)throw new Error(`expected_inflation_pp = ${v} is incorrect (expected ${c.inflation_pp}). Formula: sigma * sqrt(2 * ln(T)) * 100.`);if(Math.abs(S-c.adjusted_accuracy)>.005)throw new Error(`adjusted_accuracy = ${S} is incorrect (expected ${c.adjusted_accuracy}). Formula: p_reported * 100 - inflation_pp.`);return!0},w=tr`
    <div class="mb-3">
      <h2 id="${e}">The Benchmark Overfitter</h2>

      <p>
        A team has been selecting hyperparameter configurations by evaluating each on the same fixed test set of
        <strong>${n}</strong> examples. After <strong>${p}</strong> rounds of evaluation, they report the best
        configuration's accuracy.
      </p>

      <p>
        Each time they pick the best configuration from a test, they're implicitly "using up" some of the test set's
        reliability. The expected accuracy inflation can be approximated as:
      </p>

      <div class="bg-light p-3 rounded mb-3">
        <p class="mb-1"><strong>Inflation &approx; &sigma; &middot; &radic;(2 ln T)</strong></p>
        <p class="mb-0">
          where &sigma; is the standard deviation of accuracy estimates, which for a binomial proportion on n_test
          examples at accuracy p is:
        </p>
        <p class="mb-0"><strong>&sigma; = &radic;(p(1-p) / n_test)</strong></p>
      </div>

      <h3>Given</h3>
      <ul>
        <li>Evaluation rounds: <strong>T = ${p}</strong></li>
        <li>Test set size: <strong>n_test = ${n}</strong></li>
        <li>Reported best accuracy: <strong>p = ${l.toFixed(4)}</strong></li>
      </ul>

      <h3>Submit three values, comma-separated:</h3>
      <pre><code>sigma, expected_inflation_pp, adjusted_accuracy</code></pre>
      <p>Where:</p>
      <ul>
        <li><strong>sigma</strong> — rounded to 6 decimal places</li>
        <li>
          <strong>expected_inflation_pp</strong> — inflation as percentage points (sigma * sqrt(2*ln(T)) * 100), rounded
          to 3 decimal places
        </li>
        <li>
          <strong>adjusted_accuracy</strong> — p_reported * 100 - inflation_pp, as a percentage (0-100), rounded to 3
          decimal places
        </li>
      </ul>
      <p><strong>Example:</strong> <code>0.004743, 0.701, 87.249</code></p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>This is a direct formula application &mdash; no data files to download.</li>
          <li>
            <code>sigma = sqrt(${l.toFixed(4)} * ${(1-l).toFixed(4)} / ${n})</code>
          </li>
          <li><code>inflation = sigma * sqrt(2 * ln(${p}))</code></li>
          <li>Convert inflation to percentage points: multiply by 100.</li>
          <li>Use <code>math.log()</code> in Python for natural logarithm (ln).</li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your answer (3 comma-separated values):</strong>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width: 400px"
        placeholder="e.g. 0.004743, 0.701, 87.249"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Understanding benchmark overfitting from repeated evaluation</li>
        <li>Applying the Gaussian maximum formula for expected inflation</li>
        <li>Computing binomial standard deviation for accuracy estimates</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:w,answer:f}}var eo,Zt,oo=F(()=>{"use strict";eo=B(H(),1),Zt="q-benchmark-overfitter"});var ao={};P(ao,{default:()=>ar});import{html as nr}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function rr(o){let t=(0,no.default)(`${o}#${ro}`),e=C=>C[Math.floor(t()*C.length)],s=e([80,100,120,150]),a=60+Math.floor(t()*21),r=Math.round(s*a/100),p=s-r,n=[],l=1;for(let C=0;C<s;C++)n.push(l),l+=1+(t()<.3?Math.floor(t()*3):0);let d=new Set,i=4+Math.floor(t()*12),u=Math.min(i,p),m=Math.floor(t()*(s-u));for(let C=m;C<m+u;C++)d.add(n[C]);let c=n.filter(C=>!d.has(C)),f=p-d.size;for(let C=0;C<f&&C<c.length;C++){let b=Math.floor(t()*c.length);d.add(c[b]),c.splice(b,1)}let w=[...d].sort((C,b)=>C-b),_=n.filter(C=>!d.has(C)),T=e([20,30,40,50]),x=a-(5+Math.floor(t()*15)),g=Math.round(T*x/100),v={},S=[];for(let C=0;C<T;C++){let b=n[Math.floor(t()*n.length)],R=b+1+Math.floor(t()*5);S.push([b,R])}let h=Array.from({length:T},(C,b)=>b);for(let C=h.length-1;C>0;C--){let b=Math.floor(t()*(C+1));[h[C],h[b]]=[h[b],h[C]]}for(let C=0;C<T;C++){let[b,R]=S[h[C]],L=`[${b}, ${R}]`;v[L]=C<g}let k=e([3,4,5]),$=e(["data_loader","transformer","validator","parser","aggregator","processor","serializer"]),y=Math.round(_.length/s*1e4)/100,E=Math.round(g/T*1e4)/100,I=[],M=[w[0]];for(let C=1;C<w.length;C++)w[C]===w[C-1]+1?M.push(w[C]):(I.push(M),M=[w[C]]);M.length>0&&I.push(M);let q=Math.max(...I.map(C=>C.length)),N=0;for(let C of I)N+=Math.ceil(C.length/k);let D={executed_lines:_,missing_lines:w,branches:v,total_statements:s,total_branches:T};return{moduleName:$,coverageDict:D,coverageDictStr:JSON.stringify(D,null,2),lines_per_test:k,correct:{line_coverage_pct:y,branch_coverage_pct:E,missing_line_runs:N,critical_missing:q}}}async function ar({user:o,weight:t=1}){let e=ro,s="The Coverage Gap Finder",a=`_coverageData_${o.email}`;globalThis[a]||(globalThis[a]=rr(o.email));let r=globalThis[a],p=l=>{let d=String(l??"").trim();if(!d)throw new Error("Please enter your answer.");let i=d.split(",").map(w=>w.trim());if(i.length!==4)throw new Error("Expected 4 comma-separated values: line_coverage_pct, branch_coverage_pct, missing_line_runs, critical_missing");if(i.some(w=>isNaN(Number(w))))throw new Error("All four values must be numbers.");let[u,m,c,f]=i.map(Number);if(Math.abs(u-r.correct.line_coverage_pct)>.02)throw new Error(`line_coverage_pct = ${u} is incorrect (expected ${r.correct.line_coverage_pct}). Formula: len(executed_lines) / total_statements * 100.`);if(Math.abs(m-r.correct.branch_coverage_pct)>.02)throw new Error(`branch_coverage_pct = ${m} is incorrect (expected ${r.correct.branch_coverage_pct}). Count branches with value True, divide by total_branches * 100.`);if(c!==r.correct.missing_line_runs)throw new Error(`missing_line_runs = ${c} is incorrect (expected ${r.correct.missing_line_runs}). Group consecutive missing lines, then ceil(group_size / ${r.lines_per_test}) for each group.`);if(f!==r.correct.critical_missing)throw new Error(`critical_missing = ${f} is incorrect (expected ${r.correct.critical_missing}). Find the largest group of consecutive missing lines.`);return!0},n=nr`
    <div class="mb-3">
      <h2 id="${e}">The Coverage Gap Finder</h2>

      <p>
        After running a test suite, <code>coverage.py</code> produces a JSON report. The coverage data for
        <code>${r.moduleName}.py</code> is provided below as a Python dict:
      </p>

      <pre
        style="max-height: 300px; overflow-y: auto"
      ><code class="language-python">coverage_data = ${r.coverageDictStr}</code></pre>

      <h3>Dictionary Keys</h3>
      <ul>
        <li><code>executed_lines</code>: list of line numbers that were executed</li>
        <li><code>missing_lines</code>: list of line numbers never executed</li>
        <li>
          <code>branches</code>: dict mapping <code>"[from_line, to_line]"</code> to <code>true</code> (executed) or
          <code>false</code> (not executed)
        </li>
        <li><code>total_statements</code>: total number of statements</li>
        <li><code>total_branches</code>: total number of branches</li>
      </ul>

      <h3>Task</h3>
      <p>Compute and submit four values:</p>
      <ol>
        <li><strong>line_coverage_pct</strong>: executed / total_statements &times; 100 (2 decimal places)</li>
        <li>
          <strong>branch_coverage_pct</strong>: executed_branches / total_branches &times; 100 (2 decimal places)
        </li>
        <li>
          <strong>missing_line_runs</strong>: Minimum test cases needed to cover all missing lines, assuming each test
          case covers at most <strong>${r.lines_per_test}</strong> <em>consecutive</em> missing lines (round up per
          group)
        </li>
        <li>
          <strong>critical_missing</strong>: The largest gap of consecutive missing lines (e.g., if lines 45, 46, 47,
          48, 49, 50, 51, 52 are all missing, the gap size is 8)
        </li>
      </ol>

      <p>Submit: <code>line_coverage_pct, branch_coverage_pct, missing_line_runs, critical_missing</code></p>
      <p><strong>Example:</strong> <code>73.21, 61.54, 4, 8</code></p>

      <details class="my-3">
        <summary><strong>Hints</strong></summary>
        <ul class="mt-2">
          <li>
            <code>line_coverage_pct = len(executed_lines) / total_statements * 100</code>
          </li>
          <li>
            For branch coverage, count how many branch entries have value <code>True</code>.
          </li>
          <li>
            For <code>missing_line_runs</code>: group consecutive missing lines (e.g., [10,11,12] is one group of size
            3). For each group, you need <code>ceil(group_size / ${r.lines_per_test})</code> test cases. Sum across
            all groups.
          </li>
          <li>
            For <code>critical_missing</code>: find the largest contiguous group of consecutive missing lines.
          </li>
        </ul>
      </details>

      <label for="${e}" class="form-label mt-2">
        <strong>Submit your answer (4 comma-separated values):</strong>
      </label>
      <input
        type="text"
        id="${e}"
        name="${e}"
        class="form-control"
        style="max-width: 400px"
        placeholder="e.g. 73.21, 61.54, 4, 8"
        required
      />
    </div>

    <div class="alert alert-info" role="alert">
      <strong>Assessed skills:</strong>
      <ul class="mb-0">
        <li>Reading and interpreting coverage report data programmatically</li>
        <li>Computing line and branch coverage percentages</li>
        <li>Analyzing contiguous missing line groups for test planning</li>
      </ul>
    </div>
  `;return{id:e,title:s,weight:t,question:n,answer:p}}var no,ro,so=F(()=>{"use strict";no=B(H(),1),ro="q-coverage-gap-finder"});import{html as K,render as ho}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function $e(o,t){let e=K`<ol class="mt-3">
    ${o.map(({id:r,title:p,weight:n})=>K`<li><a href="#h${r}">${p}</a> (${n} ${n==1?"mark":"marks"})</li>`)}
  </ol>`,s=[K`<h1 class="display-6">Questions</h1>`,e,...o.map(({id:r,title:p,weight:n,question:l,help:d},i)=>(d&&!Array.isArray(d)&&(d=[d]),K`
        <div class="card my-5" data-question="${r}" id="h${r}">
          <div class="card-header">
            <span class="badge text-bg-primary me-2">${i+1}</span>
            ${p} (${n} ${n==1?"mark":"marks"})
          </div>
          ${d?d.map(u=>K`<div class="card-body border-bottom">${u}</div>`):""}
          <div class="card-body">${l}</div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-primary check-answer" data-question="${r}">Check</button>
          </div>
        </div>
      `))],a={index:e,questions:s};for(let[r,p]of t)ho(a[p],r)}import{unsafeHTML as go}from"https://cdn.jsdelivr.net/npm/lit-html@3/directives/unsafe-html.js";import{Marked as fo}from"https://cdn.jsdelivr.net/npm/marked@13/+esm";var Ae="https://tds.s-anand.net",Ce=o=>o&&!o.match(/^(https?|mailto):/),_o=new fo({renderer:{image(o,t,e){return Ce(o)&&(o=`${Ae}/${o}`),`<img src="${o}" alt="${e}" ${t?`title="${t}"`:""} class="img-fluid" loading="lazy">`},link(o,t,e){return Ce(o)&&(o=`${Ae}/${o.endsWith(".md")?`#/${o.replace(/\.md$/,"")}`:o}`),`<a href="${o}" ${t?`title="${t}"`:""} target="_blank">${e}</a>`}}}),O=o=>go(_o.parse(o));async function Lr(o,t){let e=[{...await Ve().then(()=>Qe).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [What makes property-based tests different from unit tests with hand-picked examples?](#askai)
- [How do I design a good property/invariant before writing Hypothesis strategies?](#askai)
- [How can I avoid writing weak Hypothesis tests that never hit the bug region?](#askai)
`)]},{...await Promise.resolve().then(()=>(et(),Ze)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I convert a vague rubric into binary checks that are judgeable from output alone?](#askai)
- [What makes a binary check degenerate or weak in LLM-as-judge evaluations?](#askai)
- [How can I design checks that correlate with quality labels instead of style preferences?](#askai)
`)]},{...await Promise.resolve().then(()=>(rt(),nt)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I calculate the Macro-Mean of accuracy scores across 4 different models in Python?](#askai)
- [How can I efficiently search $2^{24}$ combinations considering model-specific sensitivities?](#askai)
- [Why do some models (like gpt-5-mini) exhibit negative contributions for certain 'reasoning' fragments?](#askai)
- [What is the benefit of a Performance Floor metric in prompt engineering robustness?](#askai)
    `)]},{...await Promise.resolve().then(()=>(it(),st)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How can I use prompt compression but still keep enough instruction for classification tasks?](#askai)
- [What are the most effective 4-word prompts for zero-shot classification in gpt-4.1-mini?](#askai)
- [How do I instruct an LLM to focus exclusively on specific text and output nothing else?](#askai)
    `)]},{...await ut().then(()=>dt).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I use pandas to quickly profile column ranges, null counts, and unique values in Day 1?](#askai)
- [How do I use pd.to_numeric and pd.to_datetime to handle data type detection during validation?](#askai)
- [How do I use pandas .isin() to find categorical values in Day 2 that never appeared in Day 1?](#askai)
- [How do I use a Python set to ensure each anomalous row index is only counted once?](#askai)

`)]},{...await Promise.resolve().then(()=>(yt(),_t)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I write a SQL query that considers all combinations of two metadata columns at once?](#askai)
- [What is the difference between WHERE and HAVING in SQL, and when do I need HAVING?](#askai)
- [How can I use a CTE (WITH clause) to compute overall accuracy separately from slice accuracy?](#askai)
- [How do I combine results from multiple GROUP BY queries using UNION ALL?](#askai)
        `)]},{...await Promise.resolve().then(()=>(Et(),kt)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I generate a series of candidate thresholds in DuckDB SQL?](#askai)
- [How do I use CROSS JOIN to evaluate every threshold against every row in one query?](#askai)
- [What is the difference between precision and recall, and how do I compute them in SQL?](#askai)
- [Why does a higher false-negative cost push the optimal threshold lower than 0.5?](#askai)
    `)]},{...await Promise.resolve().then(()=>(Ct(),At)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [What is the difference between a flaky test and a test that is broken on specific commits?](#askai)
- [How do I detect mixed outcomes (PASS and FAIL) within a group in SQL?](#askai)
- [How do I do a two-level GROUP BY \u2014 first by (test, commit), then by test \u2014 in a CTE?](#askai)
- [What does COUNT(*) FILTER (WHERE ...) do in DuckDB?](#askai)
    `)]},{...await Promise.resolve().then(()=>(qt(),Rt)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I compute cosine similarity between two vectors in JavaScript?](#askai)
- [Why are embedding vectors L2-normalised and how does that simplify cosine similarity?](#askai)
- [What are common failure modes of sentence embedding models on paraphrase pairs?](#askai)
- [Why might a model place semantically opposite sentences close together in embedding space?](#askai)
    `)]},{...await Promise.resolve().then(()=>(Pt(),Ft)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [What is an n-gram and how do I generate all 8-grams from a sentence in JavaScript?](#askai)
- [How do I use a Set for fast n-gram lookup instead of scanning the corpus for each question?](#askai)
- [What does benchmark contamination mean and why does it inflate accuracy scores?](#askai)
- [How do I compute conditional accuracy over a filtered subset of a dataset?](#askai)
    `)]},{...await Ut().then(()=>Bt).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I use pandas merge to find rows that exist in both train and test sets?](#askai)
- [How do I compute accuracy on a filtered subset of rows in pandas?](#askai)
- [What is train-test data leakage and why does it inflate model accuracy?](#askai)
`)]},{...await Yt().then(()=>zt).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [What does idempotency mean for data preprocessing functions and why does it matter?](#askai)
- [How do I compare two DataFrames row-by-row with floating point tolerance in pandas?](#askai)
- [How do I check monotonicity \u2014 that relative ordering is preserved \u2014 after a transformation?](#askai)
`)]},{...await Promise.resolve().then(()=>(Xt(),Kt)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I compute p50, p95, and p99 percentile latencies in DuckDB SQL?](#askai)
- [Why is mean latency misleading compared to tail latency percentiles?](#askai)
- [How do I build a CASE expression to check multiple SLA conditions in SQL?](#askai)
- [How do I concatenate strings conditionally in DuckDB to list violated SLAs?](#askai)
`)]},{...await Promise.resolve().then(()=>(oo(),to)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [What is the formula for binomial standard deviation of an accuracy estimate?](#askai)
- [How does repeated evaluation on the same test set inflate reported accuracy?](#askai)
- [How do I compute sqrt(2 * ln(T)) in Python using the math module?](#askai)
`)]},{...await Promise.resolve().then(()=>(so(),ao)).then(s=>s.default({user:o,weight:1})),help:[O(`
### Ask AI

- [How do I group consecutive integers into contiguous ranges in Python?](#askai)
- [How do I compute line and branch coverage from a coverage.py JSON report?](#askai)
- [What does ceil(group_size / lines_per_test) calculate in a coverage context?](#askai)
`)]}];return $e(e,t),Object.fromEntries(e.map(({id:s,...a})=>[s,a]))}export{Lr as questions};
