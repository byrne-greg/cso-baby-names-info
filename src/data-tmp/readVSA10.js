const fs = require("fs");
const data = require("./VSA10.json").dataset;
const outFileName = "normalized-VCAS10-boys.json";

// ------

function getYearIndex() {
	const yearIndexObj = data.dimension.Year.category.index;
	let years = [];
	for(let prop in yearIndexObj) {
		if(yearIndexObj.hasOwnProperty(prop)) {
			years.push(prop);
		}
	}
	return years;
}
let years = getYearIndex();
 
function getNameIndex() {
	const nameIndexObj = data.dimension.Name.category.label;
	let names = [];
	for(let prop in nameIndexObj) {
		if(nameIndexObj.hasOwnProperty(prop)) {
			names.push(nameIndexObj[prop]);
		}
	 }
	 return names;
}
let names = getNameIndex();


// let allNameRankAndYear = [];
// let allNameBirthAndYear = [];
// for(let j = 0; j < data.value.length; j++) {
// 	if(j % 2 !== 0) {
// 		allNameBirthAndYear.push(data.value[j]);
// 	} else {
// 		allNameRankAndYear.push(data.value[j]);
// 	}
// }
function getAllRankings() {
	let allNameRankAndYear = [];
	for(let j = 0; j < data.value.length; j++) {
		if(j % 2 === 0) {
			allNameRankAndYear.push(data.value[j]);
		}
	}
	return allNameRankAndYear;
}

function getAllBirthsWithName() {
	let allNameBirthAndYear = [];
	for(let j = 0; j < data.value.length; j++) {
		if(j % 2 !== 0) {
			allNameBirthAndYear.push(data.value[j]);
		}
	}
	return allNameBirthAndYear;
}

// let allNamesPerYearRankBirth = [];
// 	let yearIterator = 0;
// 	for(let i = 0; i < allNameRankAndYear.length; i++) {
// 
// 		if(i % 20 === 0) {
// 			yearIterator = 0;
// 		}
// 	
// 		let currentYear = years[yearIterator];
// 	
// 		yearObject = { "year" : currentYear,
// 						"data" : { 
// 							"rank": allNameRankAndYear[i],
// 							"births": allNameBirthAndYear[i]
// 						}
// 					}
// 		allNamesPerYearRankBirth.push(yearObject);
// 		yearIterator++;
// }


function getRankAndBirthNumPerYear(allNameRankAndYear, allNameBirthAndYear) {
	let allNamesPerYearRankBirth = [];
	let yearIterator = 0;
	for(let i = 0; i < allNameRankAndYear.length; i++) {

		if(i % 20 === 0) {
			yearIterator = 0;
		}
	
		let currentYear = years[yearIterator];
	
		yearObject = { "year" : currentYear,
						"data" : { 
							"rank": allNameRankAndYear[i],
							"births": allNameBirthAndYear[i]
						}
					}
		allNamesPerYearRankBirth.push(yearObject);
		yearIterator++;
}
return allNamesPerYearRankBirth;
}
let allNamesPerYearRankBirth = getRankAndBirthNumPerYear(getAllRankings(), getAllBirthsWithName());

function getNamesWithPerYearData(nameIndex, yearIndex, rankBirthPerYearIndex) {
let namesWithPerYearData = [];
for(let k = 0; k < nameIndex.length; k++) {
	

	
	const nameWithPerYearRankBirth = { 
		"name": nameIndex[k],
		"yearData": []
	}
	
	for(let m = 0; m < yearIndex.length; m++) {
		nameWithPerYearRankBirth.yearData.push(rankBirthPerYearIndex[m]);
	}	
	rankBirthPerYearIndex.splice(0,(yearIndex.length));

	namesWithPerYearData.push(nameWithPerYearRankBirth);
}
}
let namesWithPerYearData = getNamesWithPerYearData(getNameIndex(), getYearIndex(), allNamesPerYearRankBirth);

console.log(namesWithPerYearData);
fs.writeFile(outFileName, JSON.stringify(namesWithPerYearData), 'utf8', (err) => {
	if(err) throw err;
	console.log(`Normalization complete for ${outFileName}`);
	});