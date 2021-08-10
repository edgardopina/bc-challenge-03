// Assignment Code
// const YES to validate user selected a criteria
const YES = true;
const NUMBER_OF_CRITERIA = 4;
var generateBtn = document.querySelector("#generate");

// criteria object
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

function generatePassword() {
	console.log("Inside generatePassword");
	presentPrompts();
	var passwordLength = promptPasswordLength();
	var calculateCriteriaLength = function (passwordLength) {
		// determine count of selected criteria
		var countedSelectedCriteria = 0;
		for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
			if (criteria[i].selected === YES) {
				countedSelectedCriteria++;
			}
		}

		// determine each criteria characters group size
		var equalSize = Math.floor(passwordLength / countedSelectedCriteria);
		// adjusted criteria size to compensate for Math.floor
		var adjustedSize = passwordLength - EqualSize * (countedSelectedCriteria - 1);

		// controls processing of groups with equal and different size of characters (due to use of Math.floor)
		var auxIndex = 1;
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

		var password = "";
	};
}

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");
	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
