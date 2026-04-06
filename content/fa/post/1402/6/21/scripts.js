// @ts-check
const PRECISION = 60;
// @ts-ignore
Decimal.set({ precision: PRECISION });
// @ts-ignore
const PI = Decimal.acos(-1);

const piDigits = PI.toString().replace(".", "").split("");
function calculateAccuracy(value) {
  const valueDigits = value.toString().replace(".", "").split("");
  let correctDigits = 0;
  for (let i = 0; i < valueDigits.length; i++) {
    if (valueDigits[i] == piDigits[i]) {
      correctDigits++;
    } else {
      break;
    }
  }
  return correctDigits / piDigits.length;
}

class GregorySeriesCalculator {
  static data = {
    step: 0,
    steps: "100000",
    delay: "0",
    result: '?',
    progress: "0%",
    accuracy: "?",
    PI: PI.toString(),
  };

  static async calculate() {
    // @ts-ignore
    let pi = Decimal(0);
    for (let i = 1; i <= +this.data.steps; i++) {
      pi = pi.plus(
        // @ts-ignore      
        Decimal(4 * Math.pow(-1, i + 1)).div(2 * i - 1)
      );
      this.data.result = pi.toString();
      this.data.progress = `${((i * 100) / +this.data.steps).toFixed()}%`;
      this.data.accuracy = (calculateAccuracy(pi) * 100).toFixed(2) + "%";
      this.data.step = i;
      if (+this.data.delay || i % 1000 == 0) {
        await new Promise((resolve) => setTimeout(resolve, +this.data.delay));
      }
    }
  }
}

class GaussSeriesCalculator {
  static data = {
    step: 0,
    steps: "5",
    delay: "500",
    result: "?",
    progress: "0%",
    accuracy: "?",
    PI: PI.toString(),
  };

  static async calculate() {
    // @ts-ignore
    let ao = Decimal(1);
    // @ts-ignore
    let bo = Decimal(1).div(Decimal(2).sqrt());
    // @ts-ignore
    let to = Decimal(1).div(4);
    // @ts-ignore
    let po = Decimal(1);
    let an;
    let bn;
    let tn;
    let pn;
    let pi;
    for (let i = 1; i <= +this.data.steps; i++) {
      an = ao.plus(bo).div(2);
      bn = ao.times(bo).sqrt();
      tn = to.minus(po.times(ao.minus(an).pow(2)));
      pn = po.times(2);
      pi = an.plus(bn).pow(2).div(tn.times(4));
      console.log(pi.toString());
      ao = an;
      bo = bn;
      to = tn;
      po = pn;
      this.data.result = pi.toString();
      this.data.progress = `${((i * 100) / +this.data.steps).toFixed()}%`;
      this.data.accuracy = (calculateAccuracy(pi) * 100).toFixed(2) + "%";
      this.data.step = i;
      if (+this.data.delay || i % 1000 == 0) {
        await new Promise((resolve) => setTimeout(resolve, +this.data.delay));
      }
    }
  }
}

// @ts-ignore
point.attach(GregorySeriesCalculator.name, GregorySeriesCalculator.data);
// @ts-ignore
point.attach(GaussSeriesCalculator.name, GaussSeriesCalculator.data);
