let measurementSystemPanel = document.getElementById("measurment-system-panel");
let cmSelect = document.getElementById("cm-select"); //Centi meter
let kgSelect = document.getElementById("kg-select"); //Kilo grams
let ftSelect = document.getElementById("ft-select"); //Feet
let inchSelect = document.getElementById("inch-select"); //Inch
let stSelect = document.getElementById("st-select"); //Stone
let lbsSelect = document.getElementById("lbs-select"); //Pound
let result = document.getElementById("result");
let metricPanel = document.getElementById("metric-panel");
let imperialPanel = document.getElementById("imperial-panel");

let cmValue, kgValue;
let ftValue, inchValue, stValue, lbsValue;

measurementSystemPanel.addEventListener("change", chooseMeasurementSystem);
metricPanel.addEventListener("change", calculateBmiMetric);
imperialPanel.addEventListener("change", calculateBmiImperial);

function chooseMeasurementSystem(e) {
  if (e.target.id === "metric-radio-option") {
    ftValue = 0;
    inchValue = 0;
    stValue = 0;
    lbsValue = 0;

    document.getElementById("result").style.background = "#000000";
    resetImperailUnitValues();
    document.getElementById("imperial-panel").style.display = "none";
    document.getElementById("metric-panel").style.display = "block";
    document.getElementById("result").textContent = "";

    cmData();
    kgData();
    document.querySelector(".panels-wrapper").style = "display:block";
    disableImperial();
  } else if (e.target.id === "imperial-radio-option") {
    document.getElementById("result").style.background = "#000000";
    cmValue = 0;
    kgValue = 0;
    resetMetricUnitValues();
    document.getElementById("metric-panel").style.display = "none";
    document.getElementById("imperial-panel").style.display = "block";
    document.getElementById("result").textContent = "";
    ftData();
    inchData();
    stData();
    lbsData();
    document.querySelector(".panels-wrapper").style = "display:block";
  }
}

/// METRIC DATA /////
function cmData() {
  let cm = new Array(75);
  let startCm = 140;
  for (let i = 0; i < cm.length; i++) {
    let option = document.createElement("OPTION");
    cm[i] = startCm;
    let txt = document.createTextNode(cm[i]);
    option.appendChild(txt);
    option.setAttribute("value", cm[i]);
    cmSelect.appendChild(option);
    startCm++;
  }
}

function kgData() {
  let kg = new Array(90);
  let startKg = 40;
  for (let i = 0; i < kg.length; i++) {
    let kgOption = document.createElement("OPTION");
    kg[i] = startKg;
    let txt = document.createTextNode(kg[i]);
    kgOption.appendChild(txt);
    kgOption.setAttribute("value", kg[i]);
    kgSelect.appendChild(kgOption);
    startKg++;
  }
}

/// IMPERIAL DATA /////

function ftData() {
  let ft = new Array(4);
  let startFt = 4;
  for (let i = 0; i < ft.length; i++) {
    let option = document.createElement("OPTION");
    ft[i] = startFt;
    let txt = document.createTextNode(ft[i]);
    option.appendChild(txt);
    option.setAttribute("value", ft[i]);
    ftSelect.appendChild(option);
    startFt++;
  }
}

function inchData() {
  let inch = new Array(12);
  let startInch = 0;
  for (let i = 0; i < inch.length; i++) {
    let option = document.createElement("OPTION");
    inch[i] = startInch;
    let txt = document.createTextNode(inch[i]);
    option.appendChild(txt);
    option.setAttribute("value", inch[i]);
    inchSelect.appendChild(option);
    startInch++;
  }
}

function stData() {
  let st = new Array(20);
  let startSt = 6;
  for (let i = 0; i < st.length; i++) {
    let option = document.createElement("OPTION");
    st[i] = startSt;
    let txt = document.createTextNode(st[i]);
    option.appendChild(txt);
    option.setAttribute("value", st[i]);
    stSelect.appendChild(option);
    startSt++;
  }
}

function lbsData() {
  let lbs = new Array(14);
  let startLbs = 0;
  for (let i = 0; i < lbs.length; i++) {
    let option = document.createElement("OPTION");
    lbs[i] = startLbs;
    let txt = document.createTextNode(lbs[i]);
    option.appendChild(txt);
    option.setAttribute("value", lbs[i]);
    lbsSelect.appendChild(option);
    startLbs++;
  }
}

function calculateBmiMetric(e) {
  let bmiMetric;

  if (e.target.id === "cm-select") {
    if (!(cmSelect.value === "default")) {
      cmValue = cmSelect.value;
      //e.currentTarget.id.disabled = true;

      kgSelect.disabled = false;
    }
  }
  if (e.target.id === "kg-select") {
    if (!(kgSelect.value === "default")) {
      kgValue = kgSelect.value;
    }
  }

  if (!isNaN(cmValue) && !isNaN(kgValue) && cmValue != 0 && kgValue != 0) {
    console.log("cm = " + cmValue + " kg = " + kgValue);
    cmValue = cmSelect.value / 100; //divide by 100 to change it to meter

    bmiMetric = (kgValue / (cmValue * cmValue)).toFixed(1);
    document.getElementById("result").innerHTML = bmiMetric;
    setBackground(bmiMetric);
  }
}

function calculateBmiImperial(e) {
  let totalInchValue;
  let totalLbsValue;
  let bmiImperial;

  if (e.target.id === "ft-select") {
    if (!(ftSelect.value === "default")) {
      ftValue = ftSelect.value;
      inchSelect.disabled = false;
    }
  }
  if (e.target.id === "inch-select") {
    if (!(inchSelect.value === "default")) {
      inchValue = inchSelect.value;
      stSelect.disabled = false;
    }
  }

  if (e.target.id === "st-select") {
    if (!(stSelect.value === "default")) {
      stValue = stSelect.value;
      lbsSelect.disabled = false;
    }
  }
  if (e.target.id === "lbs-select") {
    if (!(lbsSelect.value === "default")) {
      lbsValue = lbsSelect.value;
    }
  }

  if (
    !isNaN(ftValue) &&
    !isNaN(inchValue) &&
    !isNaN(stValue) &&
    !isNaN(lbsValue) &&
    ftValue != 0 &&
    stValue != 0 &&
    inchValue >= 0 &&
    lbsValue >= 0
  ) {
    totalInchValue = Number(ftValue * 12) + Number(inchValue);
    totalLbsValue = Number(stValue * 14) + Number(lbsValue);
    bmiImperial = (
      (totalLbsValue * 703) /
      (totalInchValue * totalInchValue)
    ).toFixed(1);

    document.getElementById("result").innerHTML = bmiImperial;
    setBackground(bmiImperial);
  }
}
function resetMetricUnitValues() {
  cmSelect.innerText = null;
  let optionCm = new Option("CM", "default", false, false);
  cmSelect.appendChild(optionCm);
  kgSelect.innerText = null;
  let optionKg = new Option("Kgs", "default", false, false);
  kgSelect.appendChild(optionKg);
}

function resetImperailUnitValues() {
  ftSelect.innerText = null;
  let optionFt = new Option("FT", "default", false, false);
  ftSelect.appendChild(optionFt);

  inchSelect.innerText = null;
  let optionInch = new Option("Inch", "default", false, false);
  inchSelect.appendChild(optionInch);

  stSelect.innerText = null;
  let optionSt = new Option("ST", "default", false, false);
  stSelect.appendChild(optionSt);
  lbsSelect.innerText = null;
  let optionlbs = new Option("Lbs", "default", false, false);
  lbsSelect.appendChild(optionlbs);
}

function disableImperial() {
  inchSelect.disabled = true;
  stSelect.disabled = true;
  lbsSelect.disabled = true;
}
function setBackground(bmiResult) {
  if (bmiResult > 35) {
    document.getElementById("result").style.background = "#E60405";
  } else if (bmiResult > 30) {
    document.getElementById("result").style.background = "#FF7E00";
  } else if (bmiResult > 25) {
    document.getElementById("result").style.background = "#FFCC00";
  } else if (bmiResult > 18.5) {
    document.getElementById("result").style.background = "#00D24A";
  } else {
    document.getElementById("result").style.background = "#F9F9F9";
    document.getElementById("result").style.color = "#000000";
  }
}
