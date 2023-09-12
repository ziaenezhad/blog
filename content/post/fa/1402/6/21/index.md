---
title: محاسبه عدد π
date: 2023-09-12
noReadMore: false
tags: ["π", "عدد پی", "ماشین حساب"]
categories: ["math"]
---

<link rel="stylesheet" href="./styles.css"></link>

## روش سری گریگوری

سری گریگوری (Gregory Series)، یک فرمول عدد پی می باشد که توسط Gregory و Leibniz ارئه شد و به این صورت محاسبه می گردد:

<div dir="ltr">
$$
  \frac{\pi }{4} = \sum\limits_{k = 1}^\infty  {\frac{{{{( - 1)}^{k + 1}}}}{{2k - 1}}}
$$
</div>

یکی از مشکلاتی که در این روش وجود دارد این است که برای پیدا کردن مقدار عدد پی تا ۶ رقم اعشار باید پنج میلیون جمله از سری فوق را با هم جمع کنیم.

طبق محاسبهٔ کامپیوتری سری فوق، تعداد سری و اعشار محاسبه شده مطابق زیر است:

- ۱۰۰ میلیون جمله: ۷ رقم اعشار
- یک میلیارد جمله: ۸ رقم اعشار

ارقام بالا نشان می‌دهد که این الگوریتم رشد نمایی شدیدی دارد که زمان زیادی را می‌تواند برای محاسبهٔ ارقام بسیار بالا صرف نماید.

### ماشین حساب

<form class="calculator" onsubmit="GregorySeriesCalculator.calculate(); return false;" point-component="GregorySeriesCalculator">
  <label>
    گام ها:
    <input
      point-bind="steps"
      type="number"
      placeholder="steps"
      required="true"
      step="10000"
      required="true"
    />
  </label>
  <br/>
  <label>
    تاخیر (میلی ثانیه):
    <input
      point-bind="delay"
      type="number"
      placeholder="delay"
      required="true"
      step="1"
      required="true"
    />
  </label>
  <br/>
  <button type="submit">محاسبه</button>
  <hr/>
  <h3>مقدار صحیح:</h3>
  <p dir="ltr">
    <b>{{PI}}</b>
  </p>
  <h3>نتیجه:</h3>
  <p dir="ltr">
    <b>{{result}}</b>
    <br/>
    <kbd>
      [{{step}}/{{steps}} - {{progress}}]
    </kbd>
  </p>
  <h3>دقت:</h3>    
  <p dir="ltr">
    <b>{{accuracy}}</b>
  </p>
</form>

## روش گاوس - لژاندر

این روش برای اولین بار در آثار کارل فردریش گاوس (1777-1855) و آدرین-ماری لژاندر (1752-1833) ارائه شد.
نکته جالب راجع به این روش این است که تنها در 25 گام تکرار، 45 میلیون رقم اعشار صحیح عدد پی را تولید می کند.

### الگوریتم

1. تنظیم مقدار اولیه:

<div dir="ltr">
$$
{\displaystyle a_{0}=1\qquad b_{0}={\frac {1}{\sqrt {2}}}\qquad t_{0}={\frac {1}{4}}\qquad p_ {0}=1.}
$$
</div>

2. مرحله زیر را تا زمان درسترسی به دقت مطلوب اخلاف <span dir="ltr">$a_{n}$</span> و <span dir="ltr">$b_{n}$</span> ادامه دهید:

<div dir="ltr">
$$
{\displaystyle {\begin{aligned}a_{n+1}&={\frac {a_{n}+b_{n}}{2}},\\\\b_{n+1}&={\sqrt {a_{n}b_{n}}},\\\\t_{n+1}&=t_{n}-p_{n}(a_{n}-a_{n+1})^{2},\\\\p_{n+1}&=2p_{n}.\\\end{aligned}}}
$$
</div>

3. پس از آن <span dir="ltr">$\pi$</span> تقریبا برابر است با:

<div dir="ltr">
$$
{\displaystyle \pi \approx {\frac {(a_{n+1}+b_{n+1})^{2}}{4t_{n+1}}}.}
$$
</div>

### ماشین حساب

<form class="calculator" onsubmit="GaussSeriesCalculator.calculate(); return false;" point-component="GaussSeriesCalculator">
  <label>
    گام ها:
    <input
      point-bind="steps"
      type="number"
      placeholder="steps"
      required="true"
      step="1"
      required="true"
    />
  </label>
  <br/>
  <label>
    تاخیر (میلی ثانیه):
    <input
      point-bind="delay"
      type="number"
      placeholder="delay"
      required="true"
      step="1"
      required="true"
    />
  </label>
  <br/>
  <button type="submit">محاسبه</button>
  <hr/>
  <h3>مقدار صحیح:</h3>
  <p dir="ltr">
    <b>{{PI}}</b>
  </p>
  <h3>نتیجه:</h3>
  <p dir="ltr">
    <b>{{result}}</b>
    <br/>
    <kbd>
      [{{step}}/{{steps}} - {{progress}}]
    </kbd>
  </p>
  <h3>دقت:</h3>    
  <p dir="ltr">
    <b>{{accuracy}}</b>
  </p>
</form>

<script src="//cdn.jsdelivr.net/gh/ranaroussi/pointjs/dist/point.js"></script>
<script src="https://unpkg.com/decimal.js@10.2.0/decimal.min.js"></script>
<script src="./scripts.js"></script>
