let userInput = '';
let number = /[\d\.]/;
let newDisplay = false;
let ANS = '';

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
	if(b == 0){
		return 'Math ERROR';
	}
    return a/b;
}

function power(a,b) {
	return Math.pow(a,b);
}

function factorial(num) {
	if(num == 0 || num == 1)
		return 1;
	return num * factorial(num-1);
}

function square(num) {
	return Math.sqrt(num);
}

function inverse(num) {
	return 1/num;
}

function operate(op, a,b){
	switch(op){
		case 'mult':
			return multiply(a,b)
		case 'div':
			return divide(a,b)
		case 'add':
			return add(a,b)
		case 'sub':
			return subtract(a,b)
		case 'pow':
			return power(a,b)
		case 'fact':
			return factorial(a)
		case 'sqrt':
			return square(a)
		case 'inv':
			return inverse(a)
	}
}

function printDisplay(){
	let input = this.textContent;

	if(newDisplay){
		display.innerHTML = '';
	}

	if(number.test(input) && input != 'x-1'){
		if(newDisplay){
			userInput = '';
		}
		userInput += input;
	}
	else{
		if(newDisplay && userInput != ''){
			display.innerHTML = 'ANS';
		}

		if(input == 'ANS')
			userInput += ' ' + ANS;
		else
			userInput += ' ' + this.id + ' ';
	}

	if(this.id == 'inv'){
		display.innerHTML += '<sup>-1</sup>';
	}
	else{
		display.innerHTML += input;
	}

	newDisplay = false;
}

function result(){
	userInput = userInput.split(' ').filter(function(element) {
		return element.length != 0
	});
	let total = 0;
	let i = undefined;
	let finished = false;
	if(userInput.length == 1 && +userInput[0] != NaN)
		total = userInput[0];
	else if(userInput.length == 2 && !(userInput.includes('sqrt') || userInput.includes('fact') || userInput.includes('inv'))){
		total = 'Not enough data';
		userInput = '';
	}
	else{
		while(!finished){
			if(userInput.includes('pow')){
				i = userInput.findIndex((element) => element == 'pow');
			}
			else if(userInput.includes('sqrt')){
				i = userInput.findIndex((element) => element == 'sqrt');
			}
			else if(userInput.includes('inv')){
				i = userInput.findIndex((element) => element == 'inv');
			}
			else if(userInput.includes('fact')){
				i = userInput.findIndex((element) => element == 'fact');
			}
			else if(userInput.includes('mult')){
				i = userInput.findIndex((element) => element == 'mult');
			}
			else if(userInput.includes('div')){
				i = userInput.findIndex((element) => element == 'div');
			}
			else if(userInput.includes('add')){
				i = userInput.findIndex((element) => element == 'add');
			}
			else if(userInput.includes('sub')){
				i = userInput.findIndex((element) => element == 'sub');
			}
			
			let op = userInput[i];
			if(op == 'inv' || op == 'fact'){
				total = operate(op, +userInput[i-1]);
				userInput.splice(i-1, 2, total);
			}
			else if(op == 'sqrt'){
				total = operate(op, +userInput[i+1]);
				userInput.splice(i, 2, total);
			}
			else{
				total = operate(op, +userInput[i-1], +userInput[i+1]);
				userInput.splice(i-1, 3, total);
			}
			
			if(userInput.includes('Math ERROR')){
				finished  = true;
				userInput = '';
			}
			else if(userInput.includes(NaN) || userInput.includes(undefined)){
				total = 'Syntax ERROR';
				finished  = true;
				userInput = '';
			}
			else if(userInput.length == 1){
				ANS = total;
				finished = true;
			}				
		}
	}

	newDisplay = true;
	displayTotal.textContent = total;
}

function clearInput(){
	display.textContent = '';
	userInput = displayTotal.textContent;
	newDisplay = true;
}

function clearEverything(){	
	display.textContent = '';
	userInput = '';
	displayTotal.textContent = '0'
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

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearInput);

const clearall = document.querySelector('#clearall');
clearall.addEventListener('click', clearEverything);