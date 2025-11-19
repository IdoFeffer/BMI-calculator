'use strict'
// bmi < 18.5 → "Underweight"
// bmi between 18.5–24.9 → "Healthy weight"
// bmi 25–29.9 → "Overweight"
// bmi > 30 → "Obese"

let unitSystem = 'metric'

const heightInput = document.querySelector('.height-input')
const weightInput = document.querySelector('.weight-input')

const metricRadio = document.getElementById('opt-metric')
const imperialRadio = document.getElementById('opt-imperial')

const heightUnitSpan = document.querySelector('.height .unit')
const weightUnitSpan = document.querySelector('.weight .unit')

metricRadio.addEventListener('change', handleUnitChange)
imperialRadio.addEventListener('change', handleUnitChange)

function handleUnitChange() {
  if (metricRadio.checked) {
    unitSystem = 'metric'
    heightUnitSpan.textContent = 'cm'
    weightUnitSpan.textContent = 'kg'
  } else {
    unitSystem = 'imperial'
    heightUnitSpan.textContent = 'in'
    weightUnitSpan.textContent = 'lb'
  }

  heightInput.value = ''
  weightInput.value = ''
}

heightInput.addEventListener('input', calcBmi)
weightInput.addEventListener('input', calcBmi)

function calcBmi() {
  const heightCm = Number(heightInput.value)
  const weightKg = Number(weightInput.value)

  if (!heightCm || !weightKg) return

  if (unitSystem) {
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM ** 2)
    
    console.log(bmi)
  }
}

function result(BMI) {
  if (BMI <= 18.5) return 'underweight'
  if (BMI > 18.5 && BMI < 24.9) return 'healthyWeight'
  if (BMI >= 25 && BMI < 29.9) return 'overWeight'
  if (BMI >= 30) return 'obese'
  return BMI
}
