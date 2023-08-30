---
title: حلّ معادله ریاضی درجه دوم
date: 2023-08-30
tags: ["معادله ریاضی درجه دوم", "اثبات", "ریاضی", "جبر", "ماشین حساب", "سقوط آزاد"]
categories: ["math"]
---

## مدخل

حرکت شناسی یا سینماتیک شاخه ای از فیزیک است که به طبقه بندی و مقایسه حرکت ها می پردازد. نوع خاصی از حرکت در یک بعد، حرکت با شتاب ثابت است. **سقوط آزاد** با کمی مسامحه و با صرف نظر کردن از وجود هوا، مشهود ترین مصداق حرکت با شتاب ثابت است.

اگر با داشتن سرعت اولیه و در مسائل **سقوط آزاد** در پی پیدا کردن زمان قرار گرفتن ذره در یک ارتفاع بخصوص باشیم از فرمول ذیل استفاده می کنیم:

<div dir="ltr">
$$
  x=\frac{1}{2}at^{2}+v_{0}t+x_{0}
$$
</div>

که در آن شتاب معادل گرانش در نزدیکی سطح زمین و معادل است با منفی 9.81 متر بر مربع ثانیه:

<div dir="ltr">
$$
  g=-9.81\frac{m}{s^{2}}
$$
</div>
از آنجایی که - چنانچه گفته شد- در مساله مفروض سایر متغیر ها به جز زمان معلوم است، معادله فوق به یک معادله مرتبه 2 تبدیل می شود:

<div dir="ltr">
$$
  4.9t^{2} - v_{0}t + y = 0
$$
</div>
 
و اینجاست که برای کشف مقدار زمان لازم است تا روش حل معادلات مرتبه دو را بدانیم.

## معادله ریاضی درجه دوم

در جبر، معادله درجه دوم یا مربعی (به انگلیسی: Quadratic Equation)، هر معادله تک متغیره ای ست که بتوان آن را به صورت فرم استاندارد زیر نوشت:

<div dir="ltr">
$$
  ax^{2} + bx + c = 0
$$
</div>

و جواب های آن به طور کلی از فرمول زیر بدست می آیند:

<div dir="ltr">
$$
  x=\frac{-b\pm\sqrt{b^2-4ac} }{2a}
$$
</div>

این فرمول کار می کند. امّا واقعا چگونه چنین چیز پیچیده ای بوجود آمده است؟

## اثبات روش کلی حل معادله درجه دوم

1. داریم:

<div dir="ltr">
$$
  ax^{2} + bx + c = 0
$$
</div>

2. دو طرف را در مقدار $ 4a $ ضرب می کنیم:

<div dir="ltr">
$$
  4a^{2}x^{2} + 4abx + 4ac = 0
$$
</div>

3. از دو طرف $ 4ac $ را کم می کنیم:

<div dir="ltr">
$$
  4a^{2}x^{2} + 4abx = - 4ac
$$
</div>

4.  به دو طرف <span dir="ltr">$ b^{2} $</span> را اضاف می کنیم:

<div dir="ltr">
$$
  4a^{2}x^{2} + 4abx + b^{2} = b^{2} - 4ac
$$
</div>

5.  اتحاد مربع دو جمله ای یکی از معروف ترین اتحاد های ریاضی است که به این صورت برقرار است:

<div dir="ltr">$ (A+B)^2=(A)^2+2(A)(B)+(B)^2\,$</div>

6. اتحاد دوجمله ای را بر سمت چپ معادله اعمال می کنیم:

<div dir="ltr">
$$
  (2ax + b)^{2} = b^{2} - 4ac
$$
</div>

7. از دو طرف جذر می گیریم:

<div dir="ltr">
$$
  2ax + b = \pm \sqrt{b^{2} - 4ac}
$$
</div>

8. از دو طرف $ b $ را کم می کنیم:

<div dir="ltr">
$$
  2ax = - b \pm \sqrt{b^{2} - 4ac}
$$
</div>

9. دو طرف را بر $ 2a $ تقسیم می کنیم:

<div dir="ltr">
$$
  x=\frac{-b\pm\sqrt{b^2-4ac} }{2a}
$$
</div>

## ماشین حساب

مقادیر a و b و c را وارد کنید:

<script>
function calculate() {
  const a = +document.getElementById('num_a').value;
  const b = +document.getElementById('num_b').value;
  const c = +document.getElementById('num_c').value;
  const x1 = (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  const x2 = (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  document.getElementById('dom_x1').textContent = isNaN(x1) ? 'جوابی وجود ندارد' : x1;
  document.getElementById('dom_x2').textContent = isNaN(x2) ? 'جوابی وجود ندارد' : x2;
  return false;
}
</script>

<form class="calculator" dir="ltr" onsubmit="return calculate()">
  <style>
    form.calculator {
      padding: 32px;
      background-color: #ececec;
      text-align: center;
      border-radius: 16px;
    }
    form.calculator hr{
      margin: 16px auto;
      width: 100%
    }
    form.calculator input {
      width: 64px
    }
    form.calculator button {
      width: 100%;
      background-color: lightgray;
      padding: 16px;
    }
  </style>
  <input id="num_a" type="number" placeholder="a" required="true" step=0.01></input>
  $ x^{2} + $
  <input id="num_b" type="number" placeholder="b" required="true" step=0.01></input>
  $ x + $
  <input id="num_c" type="number" placeholder="c" required="true" step=0.01></input>
  $ = 0 $
  <hr/>
  <button type="submit">محاسبه</button>
</form>

نتیجه:

<form class="calculator" dir="ltr">
  $ x_{1} = $ <b id="dom_x1">?</b>
  <br/>
  $ x_{2} = $ <b id="dom_x2">?</b>
</form>
