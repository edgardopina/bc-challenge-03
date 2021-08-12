// Assignment Code
var generateBtn = document.querySelector("#generate"); // associates html id="generate" with the variable generateBtn
const YES = true; // const YES to validate user selected a criteria
const NUMBER_OF_CRITERIA = 4; // number of criteria: Lowercase, Uppercase, numbers, special characters
var passwordLength = 0; // stores valid password length
var superSetOfChars = []; // super set of charcaters that merges the sets of characters for all selected criteria

// criteria object
var criteria = [
	{
		name: "Lower Case", // criteria name
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
		name: "Upper Case",
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
		name: "Numeric",
		selected: false,
		setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	},
	{
		name: "Special Characters",
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
	// loops to present all password criteria for user selection
	for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
		// captures criteria selection YES/NO - OK/CANCEL - true/false
		criteria[i].selected = window.confirm(
			"Do you want to include " + criteria[i].name + " as a criteria to create your password?"
		);
		// if at least one user input is Yes/True then noneSelected assumption is false
		if (criteria[i].selected == YES) {
			noneSelected = false; //noneSelected assumption is false, AT LEAST ONE criteria was selected
			// builds superset with selected criteria's setOfChar
			superSetOfChars = [...superSetOfChars, ...criteria[i].setOfChars];
			console.log("set i=", i, " ", criteria[i].setOfChars);
			console.log("Super= ", superSetOfChars);
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
	console.log(passwordLength);
};

// builds the password
var buildPassword = function () {
	console.log("inside buildPassword");
	var password = ""; // declares empty password string
	var superSetLength = superSetOfChars.length; // length of superSetOfChars
	console.log(password);
	console.log(superSetLength);
	// loops to add one random character at a time to password
	for (var i = 0; i < passwordLength; ++i) {
		var superSetIndex = Math.floor(Math.random() * superSetLength); // random index in range [0,superSetLength]
		password += superSetOfChars[superSetIndex]; // adds ONE random character from superSetOfChars to password
		console.log(i, password);
	}
	return password; // returns built password
};

// full cycle to generate password
function generatePassword() {
	console.log("Inside generatePassword");
	presentPrompts(); // present and validate prompts for criteria to be used in the password, also builds superSetOfChar
	promptPasswordLength(); // present and validate prompt for password length
	var password = buildPassword(); // builds password with superSetOfChars built with selected criteria's setOfChar
	return password;
}

// Write password to the #password input
function writePassword() {
	var password = ""; // initializes password string after each run
	var passwordText = document.querySelector("#password"); // maps variable passwordText to html element id="password"
	passwordText.value = password; // cleans html id="password" content from previous password
	password = generatePassword(); // generate password
	passwordText = document.querySelector("#password"); // locates element with id="password"
	passwordText.value = password; // updates html id="password" content with the built password
}

// Add event listener to generate button, calls writePassword on button "click",
// waits until click on "Generate Password" button
generateBtn.addEventListener("click", writePassword);
