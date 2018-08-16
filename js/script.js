let userInput = '';
let number = /[\d\.]/;
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
	display.textContent += input;

	if(number.test(input))
		userInput += input;
	else
		userInput += ' ' + input + ' ';
}

function result(){
	userInput = userInput.split(' ');
	let total = 0;
	let i = undefined;
	let finished = false;
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
		total = operate(parseInt(userInput[i-1]), parseInt(userInput[i+1]), userInput[i]);
		userInput.splice(i-1, 3, total);
		console.log(userInput);
		if(userInput.includes(NaN)){
			total = 'Incorrect math expression';
			break;
		}
		if(userInput.length == 1)
			finished = true;
	}
	display.textContent = total;
}

const display = document.querySelector('.display p');
display.textContent = '';

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', printDisplay));

const operations = document.querySelectorAll('.operation');
operations.forEach(operation => operation.addEventListener('click', printDisplay));

const equal = document.querySelector('#equals');
equal.addEventListener('click', result);