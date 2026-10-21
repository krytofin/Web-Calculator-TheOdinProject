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
let bigNum = false;

const display = document.querySelector(`.display_container`);

function makeOperation(item){
    let content = item.textContent;
    let operationArray = [...Object.keys(operators)];
    if (bigNum){
        display.textContent = "to big num";
        leftOperand = "0";
    }
    else if (isLeft)
        display.textContent = `${leftOperand}`;
    else
        display.textContent = `${righOperand}`;

    if (leftOperand)
        leftOperand = `${+leftOperand}`;
        if (bigNum){
            bigNum = false;
        }
        if (leftOperand.length > 10){
            console.log(bigNum);
            bigNum = true;
        }
    if (righOperand)
        righOperand = `${+righOperand}`;


    if (operationArray.includes(content)){
        isLeft = false;
        if (leftOperand && righOperand){
            leftOperand = `${operate(operation, +leftOperand, +righOperand)}`;
            if (leftOperand.length > 10){
                console.log(bigNum);
                bigNum = true;
            }
            righOperand = "";
            operation = "";

        }
        operation = content;
        functionalButtons.forEach((btn) =>{
            btn.classList.remove('active');
        });
        item.classList.toggle('active');
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
        leftOperand = `${operate(operation, +leftOperand, +righOperand)}`;
        if (leftOperand.length > 10){
            console.log(bigNum);
            bigNum = true;
        }
        righOperand = "";
        operation = "";
        isLeft = true;
    }
    else {
        functionalButtons.forEach((btn) =>{
            btn.classList.remove('active');
        });
        if (isLeft){
            leftOperand += content;
            leftOperand = `${+leftOperand}`;
        }
        else {
            if (operation){
                righOperand += content;
                righOperand = `${+righOperand}`;
            }
        }
    }
    if (!leftOperand){
        leftOperand = '0';
    }
    if (bigNum){
            display.textContent = "to big num";
            leftOperand = "0";
        }
    else if (!isLeft && righOperand)
        display.textContent = `${righOperand}`;
    else
        display.textContent = `${leftOperand}`;

    console.log(leftOperand, righOperand, operation);
}
let functionalButtons = document.querySelectorAll(`.operation`);
let allButtons = document.querySelectorAll(`.short_btn`);
allButtons.forEach((item)=>{
    item.addEventListener(`click`, ()=>{
        makeOperation(item);
    })
})