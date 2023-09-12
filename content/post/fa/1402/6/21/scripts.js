// @ts-check
const piDigits = Math.PI.toString().replace(".", "").split("");
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
    result: 0,
    progress: "0%",
    accuracy: "?",
    PI: Math.PI.toString(),
  };

  static async calculate() {
    let pi = 0;
    for (let i = 1; i <= +this.data.steps; i++) {
      pi += (4 * Math.pow(-1, i + 1)) / (2 * i - 1);
      this.data.result = pi;
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
    delay: "1000",
    result: "?",
    progress: "0%",
    accuracy: "?",
    PI: Math.PI.toString(),
  };

  static async calculate() {
    let a0 = 1;
    let b0 = 1 / Math.sqrt(2);
    let t0 = 1 / 4;
    let p0 = 1;
    let an;
    let bn;
    let tn;
    let pn;
    let pi = 0;
    for (let i = 1; i <= +this.data.steps; i++) {
      an = (a0 + b0) / 2;
      bn = Math.sqrt(a0 * b0);
      tn = t0 - p0 * Math.pow(a0 - an, 2);
      pn = 2 * p0;
      pi = Math.pow(an + bn, 2) / (4 * tn);
      a0 = an;
      b0 = bn;
      t0 = tn;
      p0 = pn;
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
