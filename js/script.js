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
	return op(a,b);
}

function printDisplay(){
	let input = this.textContent;
	display.textContent += input;

	if(number.test(input)){
		userInput += input;
	}
	else{
		userInput += ' ' + input + ' ';
		console.log(userInput);
	} 
		
}

function result(){

}

const display = document.querySelector('.display p');
display.textContent = '';

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', printDisplay));

const operations = document.querySelectorAll('.operation');
operations.forEach(operation => operation.addEventListener('click', printDisplay));

const equal = document.querySelector('#equal');
//equal.addEventListener('click', result);