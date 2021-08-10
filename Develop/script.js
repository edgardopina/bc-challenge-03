// Assignment Code
const NUMBER_OF_CRITERIA = 4;
var generateBtn = document.querySelector("#generate");

// criteria
// name - criteria name
// selected - criteria was selected for password (true/false)
// totalCharsInPwd - random # of total criteria chars TO BE used in pwd
// assignedCharsInPwd - current number of criteria chars used in pwd
// setOfChars - define set of charcters for this criteria
var criteria = [
	{
		name: "Lower Case",
		selected: false,
		totalCharsInPwd: 0,
		assignedCharsInPwd: 0,
		setOfChars: [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		],
	},
	{
		name: "Upper Case",
		selected: false,
		totalCharsInPwd: 0,
		assignedCharsInPwd: 0,
		setOfChars: [
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"S",
			"7",
			"U",
			"V",
			"W",
			"X",
			"Y",
			"Z",
		],
	},
	{
		name: "Numeric",
		selected: false,
		totalCharsInPwd: 0,
		assignedCharsInPwd: 0,
		setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	},
	{
		name: "Special Characters",
		selected: false,
		totalCharsInPwd: 0, // random # of criteria chars used in pwd
		assignedCharsInPwd: 0, // actual criteria chars used in pwd
		setOfChars: [
			"!",
			"(",
			")",
			"-",
			".",
			"?",
			"[",
			"]",
			"_",
			"`",
			"~",
			";",
			":",
			"@",
			"#",
			"$",
			"%",
			"^",
			"&",
			"*",
			"+",
			"=",
		],
	},
];

// presents a loop of prompts
var presentPrompts = function () {
	console.log("Inside presentPrompts");
	// assumption that users did not select any criteria
	const YES = true;
	var noneSelected = true;

	// loops through to present all criterias
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
		// receives user input (Yes/True or No/False) on property selected of object criteria
		criteria[i].selected = window.confirm(
			"Do you want to include " + criteria[i].name + " as a criteria to create your password?"
		);
		// if at least one user input is Yes/True then noneSelected assumption is false
		if (criteria[i].selected == YES) {
			noneSelected = false;
		}
	}
	// if assumption "that no criteria was selected" is true, send error message and prompt again
	if (noneSelected == true) {
		window.alert("Please select at least one criteria. Try again.");
		presentPrompts();
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
	var assignPwdLengthIntoCriteriaLength = function (passwordLength) {};
}

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");
	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
