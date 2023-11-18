class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    // Display ERROR if result is too long -zy
    if (stringNumber.length > 14) {
      return 'ERROR'
    } 
    else if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }
    else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//Creating DOM objects -zy
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//flag to avoid appending recent result to a new one -zy
var flag = false
//dynamic disabled color for themes -zy
var disabledColor = 1

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(equalsButton.disabled === true && disabledColor === 1){
      equalsButton.style.backgroundColor = "hsl(6, 63%, 50%)"
    }
    else if(equalsButton.disabled === true && disabledColor === 2){
      equalsButton.style.backgroundColor = "hsl(176, 100%, 44%)"
    }
    //flag in action -zy
    if(flag === true){
      calculator.clear()
      flag = false
    }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    equalsButton.disabled = false
    operationButtons.disabled = false
    freshSession = false
  })
})

//keyboard event listener - zy 
document.body.addEventListener('keydown', (event) =>{
  if(equalsButton.disabled === true && disabledColor === 1){
    equalsButton.style.backgroundColor = "hsl(6, 63%, 50%)"
  }
  else if(equalsButton.disabled === true && disabledColor === 2){
    equalsButton.style.backgroundColor = "hsl(176, 100%, 44%)"
  }
  //flag in action -zy
  if(flag === true){
    calculator.clear()
    flag = false
  }
  var y = event.key
  if('0' === y || '1' === y || '2' === y || '3' === y || '4' === y 
    ||'5' === y || '6' === y || '7' === y || '8' === y || '9' === y || '.' === y){
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
    equalsButton.disabled = false
    operationButtons.disabled = false  
    freshSession = false
  }
  else if('=' === y){
  calculator.compute()
  calculator.updateDisplay()
  //flag in action -zy
  flag = true
  }
  else if('+' === y || '-' === y || 'x' === y || '/' === y){
    if(freshSession === false){
      equalsButton.disabled = true
      equalsButton.style.backgroundColor = "hsl(0, 0%, 58%)"
      equalsButton.style.zIndex = 100;
      calculator.chooseOperation(y)
      //flag in action -zy
      flag = false
      calculator.updateDisplay()
    }
  }
})

//for the operations
var freshSession = true

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(freshSession === false){
      equalsButton.disabled = true
      equalsButton.style.backgroundColor = "hsl(0, 0%, 58%)"
      equalsButton.style.zIndex = 100;
      calculator.chooseOperation(button.innerText)
      //flag in action -zy
      flag = false
      calculator.updateDisplay()
    }
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
  //flag in action -zy
  flag = true
  operationButtons.disabled = false
})

allClearButton.addEventListener('click', button => {
  if(equalsButton.disabled === true && disabledColor === 1){
    equalsButton.style.backgroundColor = "hsl(6, 63%, 50%)"
  }
  else if(equalsButton.disabled === true && disabledColor === 2){
    equalsButton.style.backgroundColor = "hsl(176, 100%, 44%)"
  }
  equalsButton.disabled = false  
  calculator.clear()
  calculator.updateDisplay()
  operationButtons.disabled = true
  freshSession = true
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


const bodyBG = document.querySelector('.body')
const radioButtons = document.querySelectorAll('.radio-button')
const attriText = document.querySelector('.attribution')
const header = document.querySelector('.header')
const keys = document.querySelector('.keys')
const keysButtons = document.querySelector('.btns')
const calcScreen = document.querySelector('.calc-screen')

//theme manipulation -zy
radioButtons.forEach(input => {
  input.addEventListener('click', () =>{
    switch (input.value){
      case 'one':
        disabledColor = 1
        bodyBG.style.backgroundColor = "hsl(222, 26%, 31%)"
        attriText.style.color = "rgb(252, 252, 252)"
        header.style.color = "aliceblue"
        keys.style.backgroundColor = "hsl(223, 31%, 20%)"
        keys.style.borderColor = "hsl(223, 31%, 20%)"
        calcScreen.style.backgroundColor = "hsl(224, 36%, 15%)"
        calcScreen.style.color = "hsl(0, 0%, 100%)"
        deleteButton.style.backgroundColor = "hsl(225, 21%, 49%)"
        allClearButton.style.backgroundColor = "hsl(225, 21%, 49%)"
        if (equalsButton.disabled === false){
          equalsButton.style.backgroundColor = "hsl(6, 63%, 50%)"
        }
        break
      case 'two':
        disabledColor = 1
        bodyBG.style.backgroundColor = "hsl(0, 0%, 90%)"
        attriText.style.color = "hsl(60, 10%, 19%)"
        header.style.color = "hsl(60, 10%, 19%)"
        keys.style.backgroundColor = "hsl(0, 5%, 81%)"
        calcScreen.style.backgroundColor = "hsl(0, 0%, 93%)"
        calcScreen.style.color = "hsl(60, 10%, 19%)"
        deleteButton.style.backgroundColor = "hsl(185, 42%, 37%)"
        allClearButton.style.backgroundColor = "hsl(185, 42%, 37%)"
        if (equalsButton.disabled === false){
          equalsButton.style.backgroundColor = "hsl(25, 98%, 40%)"
        }
        break
      case 'three':
        disabledColor = 2
        bodyBG.style.backgroundColor = "hsl(268, 75%, 9%)"
        attriText.style.color = "rgb(252, 252, 252)"
        header.style.color = "hsl(52, 100%, 62%)"
        keys.style.backgroundColor = "hsl(268, 71%, 12%)"
        keys.style.borderColor = "hsl(268, 71%, 12%)"
        calcScreen.style.backgroundColor = "hsl(268, 71%, 12%)"
        calcScreen.style.color = "hsl(52, 100%, 62%)"
        deleteButton.style.backgroundColor = "hsl(281, 89%, 26%)"
        allClearButton.style.backgroundColor = "hsl(281, 89%, 26%)"
        if (equalsButton.disabled === false){
          equalsButton.style.backgroundColor = "hsl(176, 100%, 44%)"
        }
        break
    }
  })
})
