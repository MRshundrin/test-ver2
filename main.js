"use strict";
// Вызов необходимых DOM элементов.
const $percentList = document.getElementById('percent_list');
const $numberList =  document.getElementById('number_list');
const $namesList =  document.getElementById('names_list');
const $randomNumber =  document.getElementById('random_number');
const $showButton = document.getElementById('show_button');
const $resultButton = document.getElementById('result_button');

// создание библиотек для комбинаций цифр.
let library = {}; /*однозначные*/
let doubleDigitLibrary = {}; /*двузначные*/
let threeDigitLibrary = {}; /*трёхзначные*/


// назначение обработчика событий при нажатии на кнопку показа и скрытия списка чисел
$showButton.addEventListener("click", () => {

	switch ($randomNumber.hidden) {
		case true:
			 $randomNumber.hidden = false;
			 $showButton.innerText = 'Скрыть список случайных чисел';
			break;
		case false:
			 $randomNumber.hidden = true;
			 $showButton.innerText = 'Показать список случайных чисел';
			break;
	}

});


// Преобразование сгенерированного списка чисел в новый массив.
let arr = $randomNumber.innerText.split('').map((item) => {
	return Number(item);  /*преобразование строчного элемента в числовой*/
});

// создание функции, создающей свойство соответствующее комбинации в нужной библиотеке.
function createLibraryElement (library, item) {
	if (!library[item]) {
		return	library[item] = 1;
	} else { /*если свойство с такой комбинацией уже было создано, то просто активируем счётчик данной комбинации*/
		return	library[item]++;
	};
};

// функция создания и заполнения библиотек
function createLibrary(array, library1, library2, library3) {
	array.forEach((item, i, array) => {
		createLibraryElement(library1, item); 

		if (array.length - i > 2) { /*для двузнаных комбинаций с текущим элементом*/
			let two = [item, array[i+1]].join('');
			createLibraryElement(library2, two);
		};

		if (array.length - i > 3) { /*для трёхзначных комбинаций с текущим элементом*/
			let three = [item, array[i+1], array[i+2]].join(''); 
			createLibraryElement(library3, three);
		};
	});	
};


// функция создания на странице списка названий комбинаций. 
function createNamesList(library) {

	for (var key in library) { /*перебор названий свойств библиотеки и создание таких же элементом на странице*/
		let name = document.createElement('li');

		name.className = 'name';
		name.innerText = key;
		$namesList.appendChild(name);
	};		
};


// создание функции для подсчёта процентной доли последовательности в соответствующей категории + вывод результатов подсчета на страницу.
function generateNumberAndPercent(library){
	var allCombination = Object.keys(library).map(function(key) { /*сознание массива значений из библиотеки*/
	  return  library[key];
	});
	
	let sum = allCombination.reduce((sum, current) => { /*общая сумма последовательностей соответсвующей категории*/
		return sum + current;
	});

	let oneProcent = sum / 100; /*количество последовательностей, которые приходятся на 1%*/

	let allProcents = allCombination.map((item) => {
		return Math.round((item / oneProcent) * 100) / 100; /*подсчёт и округление процентной доли последовательности*/
	});

	return allProcents.forEach((item, i, arr) => { /*перебор массива с результатами с целью отображения их на странице*/

		let percent = document.createElement('li'); /*создание необходимых DOM елементов для отображения результатов*/
		let number = document.createElement('li');

		percent.className = 'percent';
		number.className = 'number';

		percent.innerText = `${item} %`;
		number.innerText = allCombination[i];

		$percentList.appendChild(percent);
		$numberList.appendChild(number);
	});	
};

// конечная функция, объеденяющая в себе весь процесс.
function showResult (array, library1, library2, library3) {
	createLibrary(array, library1, library2, library3);
	createNamesList(library1);
	createNamesList(library2);
	createNamesList(library3);
	generateNumberAndPercent(library1);
	generateNumberAndPercent(library2);
	generateNumberAndPercent(library3);
};

// запуск конечной функции прои нажатии на кнопку показа возможных комбинаций.
$resultButton.addEventListener("click", () => {
	$percentList.hidden = false;
	$numberList.hidden = false;
	$namesList.hidden = false;
	$resultButton.hidden = true;
	showResult (arr, library, doubleDigitLibrary, threeDigitLibrary);	
});



