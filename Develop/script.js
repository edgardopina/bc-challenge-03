// Assignment Code

const YES = true; // const YES to validate user selected a criteria
const NUMBER_OF_CRITERIA = 4; // number of criteria: Lowercase, Uppercase, numbers, special characters
var generateBtn = document.querySelector("#generate"); // associates html element with id=generate with the variable generateBtn
var passwordLength = 0;

// criteria object
var criteria = [
	{
		name: "Lower Case", // criteria name
		selected: false, //criteria was selected for password (true/false)
		totalCharsInPwd: 0, // random # of total criteria chars TO BE used in pwd
		assignedCharsInPwd: 0, // current number of criteria chars used in pwd
		// define set of charcters for this criteria
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
		setLength: 26,
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
		setLength: 26,
	},
	{
		name: "Numeric",
		selected: false,
		totalCharsInPwd: 0,
		assignedCharsInPwd: 0,
		setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		setLength: 10,
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
		setLength: 22,
	},
];

// presents a loop of prompts for user input
var presentPrompts = function () {
	console.log("Inside presentPrompts");
	var noneSelected = true; // assumption that users did not select any criteria
	// loops to present all password criteria for user selection
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
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

// gets and validates password lenght from user
var promptPasswordLength = function () {
	console.log("Inside promptPasswordLength");
	// const values to validate a valid password length range
	const PWD_LENGTH_MIN = 8;
	const PWD_LENGTH_MAX = 128;
	// read password length
	var passwordLength = parseInt(
		window.prompt(
			"What length do you need your password to be? Minimum is 8 characters long. Maximum is 128 characters."
		)
	);
	// validates for out of range password length (number), empty, or non numeric input (spaces, other characters)
	// if length is invalid present prompts again
	if (passwordLength < PWD_LENGTH_MIN || passwordLength > PWD_LENGTH_MAX || isNaN(passwordLength)) {
		window.alert("Please enter a valid response.");
		promptPasswordLength();
	}

	console.log(passwordLength);

	return passwordLength;
};

var calculateCriteriaLength = function () {
	console.log("Inside calculateCriteriaLength");

	// determine count of selected criteria
	var countedSelectedCriteria = 0;
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
		if (criteria[i].selected === YES) {
			countedSelectedCriteria++;
		}
	}

	var equalSize = Math.floor(passwordLength / countedSelectedCriteria); // determine each criteria characters group size
	var adjustedSize = passwordLength - EqualSize * (countedSelectedCriteria - 1); // adjusted criteria size to compensate for Math.floor
	var auxIndex = 1; // controls processing of groups with equal and different size of characters (due to use of Math.floor)
	// process object criteria array to assign max number of random characters per criteria
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
		// process only if criteria was selected
		if (criteria[i].selected == YES) {
			// process all criteria except last one
			if (auxIndex < countedSelectedCriteria) {
				criteria[i].totalCharsInPwd = equalSize;
			} else {
				// process last criteria
				criteria[i].totalCharsInPwd = adjustedSize;
			}
			auxIndex++;
		}
	}
};

var buildPassword = function () {
	// loop to build password one character at a time
	for (var i = 0; i < passwordLength; i++) {
		var randomSet = Math.floor(Math.random() * (countedSelectedCriteria - 1)) + 1; // randomly select one of the user's criteria
		var auxIndex = 0; // index to find the matching array index position that matches the randomSet
		for (var j = 0; j < NUMBER_OF_CRITERIA; j++) {
			if (criteria[j].selected === YES) {
				auxIndex++; // increment auxIndex for each selected criteria
			}
			// check for condition when array index position corresponds with the randomSet
			if (auxIndex === randomSet) {
				var charIndex = Math.floor(Math.random() * (criteria[j].setLength - 1)) + 1; // generate random index to character set
				character = criteria[j].setOfChars[charIndex]; // gets random character from random set
				password += character; // concatenates character to password

				console.log("existing if block with break");
				break; //
			}
			console.log("finishised loop j");
		}
	}
};

function generatePassword() {
	console.log("Inside generatePassword");
	presentPrompts();
	passwordLength = promptPasswordLength();
	calculateCriteriaLength();
	buildPassword();
}

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");
	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
