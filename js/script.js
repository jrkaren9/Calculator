let userInput = '';
let newDisplay = false;
let ANS = '0';

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
		display.textContent = '';
	}

	if((!isNaN(input) || input == '.') && input != 'x-1'){
		if(newDisplay){
			userInput = '';
		}
		userInput += input;
	}
	else{
		if(newDisplay && userInput != ''){
			display.textContent = 'ANS';
		}
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
	userInput = userInput.split(' ').filter(element => element != '');
	let total = 0;
	let i = undefined;
	let finished = false;
	if(userInput.length == 1 && !isNaN(+userInput[0]))
		total = userInput[0];
	else if(userInput.length == 2 && !(userInput.includes('sqrt') || userInput.includes('fact') || userInput.includes('inv'))){
		total = 'Not enough data';
		userInput = '';
	}
	else{
		while(!finished){
			if(userInput.includes('ANS')){
				i = userInput.findIndex((element) => element == 'ANS');
			}
			else if(userInput.includes('pow')){
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
			if(op == 'ANS'){
				total = ANS;
				userInput.splice(i, 1, total);
			}
			else if(op == 'inv' || op == 'fact'){
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
			else if((userInput.includes(NaN) && !(userInput.includes('ANS'))) || userInput.includes(undefined)){
				total = 'Syntax ERROR';
				finished  = true;
				userInput = '';
			}
			else if(userInput.length == 1){
				userInput = 'ANS';
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
	displayTotal.textContent = '0';
}

function delInput(){
	if(userInput != ''){
		userInput = userInput.split(' ').filter(element => element != '');
		let erased = userInput.pop();
		if(!isNaN(erased)){
			erased = erased.slice(0, -1);
			userInput.push(erased)
		}
		let delDisplay = display.innerHTML;
		if (erased == 'inv'){
			delDisplay = delDisplay.slice(0, -10);
		}
		else if(erased == 'ANS'){
			delDisplay = delDisplay.slice(0, -3);
		}
		else{
			delDisplay = delDisplay.slice(0, -1);
		}
		
		display.innerHTML = delDisplay;
		userInput = userInput.join(' ');

	}
}

function supportKeyboard(e) {
	let key = e.key;

	if(!isNaN(key) || key == '.'){
		numbers.forEach(number => {
			if(number.textContent == key)
				number.click();
		});
	}
	else if(key=='+' || key=='-' || key=='/' || key=='^' || key=='!'){
		operations.forEach(operation => {
			if(operation.textContent == key)
				operation.click();
		});
	}
	else if(key=='*'){
		operations.forEach(operation => {
			if(operation.id == 'mult')
				operation.click();
		});
	}
	else if(key=='Enter' || key=='='){
		equal.click();
	}
	else if(key === "Backspace" || key === "Delete"){
		del.click();
	}
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

const del = document.querySelector('#del');
del.addEventListener('click', delInput);

window.addEventListener('keypress', supportKeyboard);