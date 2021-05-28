class Calculator {
    constructor(BoperandA, BoperandB) {
        this.BoperandB = BoperandB
        this.BoperandA = BoperandA
        this.clear()
    }

    delete() {
        
        if(this.operandB !== '')
        {
            this.operandB = this.operandB.toString().slice(0, -1)
        }
        else{
            if(this.operator !== undefined)
            {
                this.operator = undefined
            }
            else{
                this.operandB = this.operandA
                this.operandA = ''
            }
        }
    }

    clear() {
        this.operandB = ''
        this.operandA = ''
        this.operator = undefined
    }

    appendfun(number) {
        if (number === '.' && this.operandB.includes('.')) return
        this.operandB = this.operandB.toString() + number
    }

    operation(operator) {
        if (this.operandB == '') return
        if (this.operandA !== '') {
            this.calculate()
        }
        this.operator = operator
        this.operandA = this.operandB
        this.operandB = ''
    }

    calculate() {
        let ans
        const preNum = parseFloat(this.operandA)
        const curNum = parseFloat(this.operandB)
        if (isNaN(preNum) || isNaN(curNum)) return
        switch (this.operator) {
            case '+':
                ans = preNum + curNum
                break;
            case '/':
                ans = preNum / curNum
                break;
            case '-':
                ans = preNum - curNum
                break;
            case '*':
                ans = preNum * curNum
                break;
            case "GCD":
                for (let i = 1; i <= preNum && i <= curNum; i++) {
                    if (preNum % i == 0 && curNum % i == 0) {
                        ans = i;
                    }
                }
                break;
            case "LCM":
                let min = (preNum > curNum) ? preNum : curNum;
                while (true) {
                    if (min % preNum == 0 && min % curNum == 0) {
                        ans = min;
                        break;
                    }
                    min++;
                }
                break;
            default:
                return
        }
        this.operandB = ans
        this.operator = undefined
        this.operandA = ''
    }

    show() {
        this.BoperandB.innerText = this.operandB
        this.BoperandA.innerText = this.operandA
        if(this.operator != null)
        {
            this.BoperandA.innerText = `${this.operandA} ${this.operator}`
        }
    }

}

const numbersB = document.querySelectorAll('[data-number]')
const operationB = document.querySelectorAll('[data-operation]')
const equalB = document.querySelector('[data-enter]')
const delB = document.querySelector('[data-del]')
const clearB = document.querySelector('[data-clear]')
const BoperandA = document.querySelector('[data-operandA]')
const BoperandB = document.querySelector('[data-operandB]')

const calculator = new Calculator(BoperandA, BoperandB)

numbersB.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendfun(button.innerText)
        calculator.show()
    })
})

operationB.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operation(button.innerText)
        calculator.show()
    })
})

equalB.addEventListener('click', button => {
    calculator.calculate()
    calculator.show()
})

clearB.addEventListener('click', button => {
    calculator.clear()
    calculator.show
})

delB.addEventListener('click', button => {
    calculator.delete()
    calculator.show()
})