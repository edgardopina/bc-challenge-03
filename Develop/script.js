// Assignment Code
var generateBtn = document.querySelector("#generate"); // associates html id="generate" with the variable generateBtn
const YES = true; // const YES to validate user selected a criteria
const NUMBER_OF_CRITERIA = 4; // number of criteria: Lowercase, Uppercase, numbers, special characters
var passwordLength = 0; // stores valid password length
var superSetOfChars = []; // super set of charcaters that merges the sets of characters for all selected criteria

// criteria object
var criteria = [
	{
		name: "LOWER-CASE", // criteria name
		selected: false, //criteria was selected for password (true/false)
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
	},
	{
		name: "UPPER-CASE",
		selected: false,
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
		name: "NUMBER",
		selected: false,
		setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	},
	{
		name: "SPECIAL",
		selected: false,
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

// presents a loop of prompts for user input
var presentPrompts = function () {
	console.log("Inside presentPrompts");
	superSetOfChars = []; // initializes superSet each time that we present prompts
	var noneSelected = true; // assumption that users did NOT select ANY criteria
	// presents all password criteria for user selection
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
		criteria[i].selected = window.confirm(
			"Do you want to include " + criteria[i].name + " characters as a criteria to create your password?"
		);
		// if at least one user input is Yes/True then noneSelected assumption is false
		if (criteria[i].selected == YES) {
			noneSelected = false;
			// builds superset with selected criteria's setOfChar
			superSetOfChars = [...superSetOfChars, ...criteria[i].setOfChars];
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
	const PWD_LENGTH_MIN = 8; // const values to validate a valid password length range
	const PWD_LENGTH_MAX = 128;
	// read password length
	passwordLength = parseInt(
		window.prompt(
			"What length do you need your password to be? Minimum length is " +
				PWD_LENGTH_MIN +
				" characters. Maximum length is " +
				PWD_LENGTH_MAX +
				" characters."
		)
	);
	// validates for out of range password length (number), empty, or non numeric input (spaces, other characters)
	// if length is invalid present prompts again
	if (passwordLength < PWD_LENGTH_MIN || passwordLength > PWD_LENGTH_MAX || isNaN(passwordLength)) {
		window.alert("Please enter a valid response.");
		promptPasswordLength();
	}
};

// builds the password
var buildPassword = function () {
	var password = "";
	var superSetLength = superSetOfChars.length;
	// loops to add one random character at a time to password
	for (var i = 0; i < passwordLength; ++i) {
		password += superSetOfChars[Math.floor(Math.random() * superSetLength)];
	}
	return password;
};

// full cycle to generate password
function generatePassword() {
	presentPrompts(); // present and validate prompts for criteria selection; also builds superSetOfChar
	promptPasswordLength(); // present and validate prompt for password length
	var password = buildPassword(); // builds password from superSetOfChars
	return password;
}

// Write password to the #password input
function writePassword() {
	var password = ""; // initializes password string after each run
	var passwordText = document.querySelector("#password"); // maps variable  to html element
	passwordText.value = password; // cleans screen html id="password" content from previous password
	password = generatePassword(); // generate password
	passwordText.value = password; // updates html id="password" content with the built password
}

// Add event listener to generate button, calls writePassword on button "click",
// waits until click on "Generate Password" button
generateBtn.addEventListener("click", writePassword);
