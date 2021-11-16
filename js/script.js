let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const clearButton = document.getElementById('clear-btn')
const deleteButton = document.getElementById('delete-btn')
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operations-btn')
const equalsButton = document.getElementById('equals-btn')
const decimalButton = document.getElementById('decimal-btn')
const screenLastOperation = document.getElementById('screen-last-operation')
const screenCurrentOperation = document.getElementById('screen-current-operation')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (screenCurrentOperation.textContent === '0' || shouldResetScreen) {
    resetScreen()
  }
  screenCurrentOperation.textContent += number
}

function resetScreen() {
  screenCurrentOperation.textContent = ''
  shouldResetScreen = false
}

function clear() {
  screenCurrentOperation.textContent = '0'
  screenLastOperation.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendDecimal() {
  if (shouldResetScreen) {
    resetScreen()
  }
  if (screenCurrentOperation.textContent === ''){
    screenCurrentOperation.textContent = '0'
  }
  if (screenCurrentOperation.textContent.includes('.')) {
    return
  }
  screenCurrentOperation.textContent += '.'
}

function deleteNumber() {
  screenCurrentOperation.textContent = screenCurrentOperation.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = screenCurrentOperation.textContent
  currentOperation = operator
  screenLastOperation.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) {
    return
  }
  if (currentOperation === '÷' && screenCurrentOperation.textContent === '0') {
    alert("You can't divide by 0!")

    return
  }
  secondOperand = screenCurrentOperation.textContent
  screenCurrentOperation.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  screenLastOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key)
  }
  if (e.key === '.') {
    appendDecimal()
  }
  if (e.key === '=' || e.key === 'Enter') {
    evaluate()
  }
  if (e.key === 'Backspace') {
    deleteNumber()
  }
  if (e.key === 'Escape') {
    clear()
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    setOperation(convertOperator(e.key))
  }
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') {
    return '÷'
  }
  if (keyboardOperator === '*') {
    return '×'
  }
  if (keyboardOperator === '-') {
    return '−'
  }
  if (keyboardOperator === '+') {
    return '+'
  }
}

function addNumbers(a, b) {
  return a + b
}

function substractNumbers(a, b) {
  return a - b
}

function multiplyNumbers(a, b) {
  return a * b
}

function divideNumbers(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+' :
      return addNumbers(a, b)
    case '−' :
      return substractNumbers(a, b)
    case '×' :
      return multiplyNumbers(a, b)
    case '÷' :
      if (b === 0) {
        return null
      } else {
        return divideNumbers(a, b)
      }
    default :
      return null
  }
}
