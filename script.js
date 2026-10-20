function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

const operators = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide,
    };

function operate(operator, a, b){
    return operators[operator](a, b);
}

let leftOperand = "";
let righOperand = "";
let operation = "";
let isLeft = true;

const display = document.querySelector(`.display_container`);

function makeOperation(item){
    let content = item.textContent;
    let operationArray = [...Object.keys(operators)];
    if (leftOperand)
        leftOperand = `${+leftOperand}`;
    if (righOperand)
        righOperand = `${+righOperand}`;
    if (operationArray.includes(content)){
        isLeft = false;
        operation = content;
    }
    else if (content == 'AC'){
        leftOperand = "";
        righOperand = "";
        operation = "";
        isLeft = true;
    }
    else if (content == 'DEL'){
        if (isLeft){
            leftOperand = leftOperand.slice(0, -1);
        }
        else {
            righOperand = righOperand.slice(0, -1);
        }
    }
    else if (content == '='){
        leftOperand = `${operate(operation, leftOperand, righOperand)}`;
        righOperand = "";
        operation = "";
        isLeft = true;
    }
    else {
        if (isLeft){
            leftOperand += content;
            display.textContent = leftOperand;
        }
        else {
            if (operation){
                righOperand += content;
            }
        }
    }
    if (!leftOperand){
        leftOperand = '0';
    }

    display.textContent = `${leftOperand} ${operation} ${righOperand}`;
    console.log(leftOperand, righOperand, operation);
}

let allButtons = document.querySelectorAll(`.short_btn`);
allButtons.forEach((item)=>{
    item.addEventListener(`click`, ()=>{
        makeOperation(item);
    })
})