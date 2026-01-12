'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const unitsRadios = document.querySelectorAll('input[name="units"]')
  const metricSet = document.querySelector('[data-set="metric"]')
  const imperialSet = document.querySelector('[data-set="imperial"]')

  const heightCmEl = document.getElementById('height-cm')
  const weightKgEl = document.getElementById('weight-kg')

  const heightFtEl = document.getElementById('height-ft')
  const heightInEl = document.getElementById('height-in')
  const weightStEl = document.getElementById('weight-st')
  const weightLbsEl = document.getElementById('weight-lbs')

  const bmiValueEl = document.getElementById('bmi-value')
  const bmiTextEl = document.getElementById('bmi-text')

  let currentUnits = 'metric'

  unitsRadios.forEach(r => r.addEventListener('change', onUnitsChange))

  ;[heightCmEl, weightKgEl, heightFtEl, heightInEl, weightStEl, weightLbsEl]
    .filter(Boolean)
    .forEach(el => el.addEventListener('input', updateResult))

  updateResult()

  function onUnitsChange(ev) {
    currentUnits = ev.target.value

    const isMetric = currentUnits === 'metric'
    metricSet.classList.toggle('is-hidden', !isMetric)
    imperialSet.classList.toggle('is-hidden', isMetric)

    resetResult()
    updateResult()
  }

  function updateResult() {
    const data = getInputsAsMetric()
    if (!data) return

    const { heightM, weightKg } = data

    const bmi = weightKg / (heightM * heightM)
    bmiValueEl.textContent = round1(bmi)

    const category = getCategory(bmi)
    const range = getHealthyRangeKg(heightM)

    bmiTextEl.innerHTML =
      `Your BMI suggests you’re a <strong>${category}</strong> weight. ` +
      `Your ideal weight is between <strong>${round1(range.min)}kgs - ${round1(
        range.max
      )}kgs</strong>.`
  }

  function getInputsAsMetric() {
    if (currentUnits === 'metric') {
      const cm = toNum(heightCmEl.value)
      const kg = toNum(weightKgEl.value)
      if (cm == null || kg == null) return null
      if (cm <= 0 || kg <= 0) return null
      return { heightM: cm / 100, weightKg: kg }
    }

    const ft = toNum(heightFtEl.value) ?? 0
    const inch = toNum(heightInEl.value) ?? 0
    const st = toNum(weightStEl.value) ?? 0
    const lbs = toNum(weightLbsEl.value) ?? 0

    const totalIn = ft * 12 + inch
    const totalLbs = st * 14 + lbs
    if (totalIn <= 0 || totalLbs <= 0) return null

    return {
      heightM: totalIn * 0.0254,
      weightKg: totalLbs * 0.45359237,
    }
  }

  function getHealthyRangeKg(heightM) {
    const min = 18.5 * heightM * heightM
    const max = 24.9 * heightM * heightM
    return { min, max }
  }

  function getCategory(bmi) {
    if (bmi < 18.5) return 'underweight'
    if (bmi < 25) return 'healthy'
    if (bmi < 30) return 'overweight'
    return 'obese'
  }

  function resetResult() {
    bmiValueEl.textContent = '--'
    bmiTextEl.textContent =
      'Enter your height and weight and you’ll see your BMI result here.'
  }

  function toNum(v) {
    if (v === '' || v == null) return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }

  function round1(n) {
    return Math.round(n * 10) / 10
  }
})
