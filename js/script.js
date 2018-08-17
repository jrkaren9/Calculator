let userInput = '';
let number = /[\d\.]/;
let newDisplay = false;

function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function power(a,b) {
	return a^b;
}

function factorial(num) {
	if(num == 0 || num == 1)
		return 1;
	return num * factorial(num-1);
}

function operate(a,b,op){
	switch(op){
		case '×':
			return multiply(a,b)
		case '/':
			return divide(a,b)
		case '+':
			return add(a,b)
		case '-':
			return subtract(a,b)
	}
}

function printDisplay(){
	let input = this.textContent;
	
	if(number.test(input)){
		userInput += input;
		if(newDisplay){
			display.textContent = '';
			newDisplay = false;
		}
	}
	else{
		userInput += ' ' + input + ' ';
		if(newDisplay){
			display.textContent = 'Ans';
			newDisplay = false;
		}
	}

	display.textContent += input;
}

function result(){
	userInput = userInput.split(' ').filter(function(element) {
		return element.length != 0
	});
	let total = 0;
	let i = undefined;
	let finished = false;
	if(userInput.length <= 2){
		if(+userInput[0] != NaN && userInput.length == 1)
			total = userInput[0];
		else
			total = 'Not enough data';
	}
	else{
		while(!finished){
			if(userInput.includes('×')){
				i = userInput.findIndex((element) => element == '×');
			}
			else if(userInput.includes('/')){
				i = userInput.findIndex((element) => element == '/');
			}
			else if(userInput.includes('+')){
				i = userInput.findIndex((element) => element == '+');
			}
			else if(userInput.includes('-')){
				i = userInput.findIndex((element) => element == '-');
			}
			total = operate(+userInput[i-1], +userInput[i+1], userInput[i]);
			userInput.splice(i-1, 3, total);
			userInput.toString();
			if(userInput.includes(NaN)){
				total = 'Incorrect math expression';
				finished  = true;
			}
			if(userInput.length == 1)
				finished = true;
		}
	}
	
	newDisplay = true;
	displayTotal.textContent = total;
}

const display = document.querySelector('.display #input');
display.textContent = '';

const displayTotal = document.querySelector('.display #total');
display.textContent = '';

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', printDisplay));

const operations = document.querySelectorAll('.operation');
operations.forEach(operation => operation.addEventListener('click', printDisplay));

const equal = document.querySelector('#equals');
equal.addEventListener('click', result);