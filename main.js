'use strict'

// BMI ranges:
// < 18.5    → Underweight
// 18.5–24.9 → Healthy weight
// 25–29.9   → Overweight
// >= 30     → Obese

const blueInitial = document.querySelector('.blue-initial')
const blueResult = document.querySelector('.blue-result')
const bmiValue = document.querySelector('.bmi-value')
const bmiMessage = document.querySelector('.bmi-message')

let unitSystem = 'metric'

// ----- Metric fields -----
const heightInput = document.querySelector('.height-input') // cm
const weightInput = document.querySelector('.weight-input') // kg

// ----- Imperial fields -----
const heightFtInput = document.querySelector('.height-ft-input') // ft
const heightInInput = document.querySelector('.height-in-input') // in
const weightStInput = document.querySelector('.weight-st-input') // st
const weightLbInput = document.querySelector('.weight-lb-input') // lb

// ----- Field groups (metric / imperial blocks) -----
const metricFields = document.querySelector('.fields-metric')
const imperialFields = document.querySelector('.fields-imperial')

// ----- Radio buttons -----
const metricRadio = document.getElementById('opt-metric')
const imperialRadio = document.getElementById('opt-imperial')

metricRadio.addEventListener('change', handleUnitChange)
imperialRadio.addEventListener('change', handleUnitChange)

// Switch between Metric <-> Imperial
function handleUnitChange() {
  if (metricRadio.checked) {
    unitSystem = 'metric'
    metricFields.classList.add('is-active')
    imperialFields.classList.remove('is-active')
  } else {
    unitSystem = 'imperial'
    metricFields.classList.remove('is-active')
    imperialFields.classList.add('is-active')
  }

  // Reset all inputs when switching systems
  heightInput.value = ''
  weightInput.value = ''
  heightFtInput.value = ''
  heightInInput.value = ''
  weightStInput.value = ''
  weightLbInput.value = ''

  console.clear()
  resetBox()
}

// Listen for input changes on all fields
;[
  heightInput,
  weightInput,
  heightFtInput,
  heightInInput,
  weightStInput,
  weightLbInput,
].forEach((input) => {
  if (!input) return
  input.addEventListener('input', calcBmi)
})

// Calculate BMI based on chosen unit system
function calcBmi() {
  let bmi

  if (unitSystem === 'metric') {
    const heightCm = Number(heightInput.value)
    const weightKg = Number(weightInput.value)

    if (!heightCm || !weightKg) return

    const heightM = heightCm / 100
    bmi = weightKg / heightM ** 2
  } else {
    const heightFt = Number(heightFtInput.value)
    const heightIn = Number(heightInInput.value)
    const weightSt = Number(weightStInput.value)
    const weightLb = Number(weightLbInput.value)

    const totalInches = heightFt * 12 + heightIn
    const totalPounds = weightSt * 14 + weightLb

    if (!totalInches || !totalPounds) return

    // Imperial BMI formula
    bmi = 703 * (totalPounds / totalInches ** 2)
  }

  const category = result(bmi)

  console.log(bmi)
  console.log(category)

  // update UI
  bmiValue.textContent = bmi.toFixed(1)

  bmiMessage.innerHTML = `
  Your BMI suggests you're a <strong>${category}</strong>. Your ideal  weight is between 
  `
  
  showBlueBoxResult(bmi, category)
}

function resetBox() {
  bmiValue.textContent = '--'
  bmiMessage.textContent =
    "Enter your height and weight and you'll see your BMI result here."
}

// BMI category
function result(bmi) {
  if (bmi < 18.5) return 'underweight'
  if (bmi >= 18.5 && bmi < 25) return 'healthyWeight'
  if (bmi >= 25 && bmi < 30) return 'overWeight'
  return 'obese'
}

function showBlueBoxResult(bmi, category) {
  blueInitial.hidden = true
  blueResult.hidden = false

  bmiValue.textContent = bmi.toFixed(1)
  bmiMessage.textContent = `Your BMI suggests you're a ${category}.`
}
