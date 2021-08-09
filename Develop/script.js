// Assignment Code
const CRITERIA_NUMBER = 4;
var generateBtn = document.querySelector("#generate");

var criteria = [
	{ name: "Lower Case", selected: false },
	{ name: "Upper Case", selected: false },
	{ name: "Numeric", selected: false },
	{ name: "Special Characters", selected: false },
];

// presents a loop of prompts
var presentPrompts = function () {
	console.log("Inside presentPrompts");
	for (var i = 0; i < CRITERIA_NUMBER; i++) {
		criteria[i].selected = window.confirm(
			"Do you want to include " + criteria[i].name + " as a criteria to create your password?"
		);
	}
};

var promptPasswordLength = function () {
	console.log("Inside promptPasswordLength");
	const PWD_LENGTH_MIN = 8;
	const PWD_LENGTH_MAX = 128;
	var passwordLength = parseInt(
		window.prompt(
			"What length do you need your password to be? Minimum is 8 characters long. Maximum is 128 characters."
		)
	);
	if (passwordLength < PWD_LENGTH_MIN || passwordLength > PWD_LENGTH_MAX || isNaN(passwordLength)) {
		window.alert("Please enter a valid response.");
		promptPasswordLength();
	}
	console.log(passwordLength);
	return passwordLength;
};

function generatePassword() {
	console.log("Inside generatePassword");
	presentPrompts();
	var passwordLength = promptPasswordLength();
}

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");
	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
