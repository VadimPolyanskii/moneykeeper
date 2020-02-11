'use strict';

let startBtn = document.getElementById('start'),                 						// Для того, чтобы нам следить за нашими кнопками на HTML-странице, мы должны их сразу здесь получить. Поэтому получаем их.
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],



    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

	let money, time;                            										// Создаём переменные в глобальной области  
	
	// делаем 3 кнопки неактивными, пока пользователь пока не запустит программу (т.е. пока он не нажмёт кнопку "Начать расчёт")
	expensesBtn.disabled = true;
	optionalExpensesBtn.disabled = true;
	countBtn.disabled = true;


	// Создаём обработчик события, чтобы по нажатии кнопки "старт" программа запустилась.
	startBtn.addEventListener('click', function() {       								
		time = prompt ("Введите дату в формате YYYY-MM-DD", '');
		money = +prompt ("Ваш бюджет на месяц?", '');
        
    
        // цикл, при котором вопросы пользователю будут повторяться до тех пор, пока он не даст корректные ответы. Мы проверяем переменную money.
		while (isNaN(money) || money == '' || money == null) {      					// Проверяем, чтобы ответ юзера был ЧИСЛОМ.
            money = +prompt ("Ваш бюджет на месяц?", "");       						// Если ответ НЕ число, вопрос повторяется.
		}
	
		// Получив ответы, запысываем данные в глобальный объект appData.
		appData.budget = money; 														// Фиксируем бюджет, кот. указал юзер, в нашем глобальном объекте.
		appData.timeData = time;														// То же самое делаем и со временем.
		budgetValue.textContent = money.toFixed();										// Запишем данные о бюджете от юзера в пустой блок в теге-родителе "доход", и округлим его до ближайшего целого числа.
		yearValue.value = new Date(Date.parse(time)).getFullYear();						// Запишем в input "год" значение, которое получим от пользователя через объект даты (new Date).
		monthValue.value = new Date(Date.parse(time)).getMonth() + 1;  					// Также запишем месяц. Прибавляем 1, чтобы январь имел индекс не 0, а 1.
		dayValue.value = new Date(Date.parse(time)).getDate(); 							// Таким образом мы получим день текущего месяца, его номер (число месяца).
	
		expensesBtn.disabled = false;
		optionalExpensesBtn.disabled = false;
		countBtn.disabled = false;
	});

	
	// Теперь получим сумму всех ценников (всех обязательных расходов)
	expensesBtn.addEventListener('click', function() {									// Обработчик события кнопки "утвердить".
		let sum = 0;																	// зададим переменную sum, - (это сумма) она будет собирать все наши ценники (сумма всех значений из полей цен), кот. вввёл юзер.

		// создадим цикл, который будет продолжаться, пока не закончатся все input'ы с классом expensesItem.
		for (let i = 0; i < expensesItem.length; i++) {									// Зададим условие, чтобы JS сам узнавал, какое кол-во input'ов с классом "expenses-item" (наименование/цена), куда вводит данные юзер, есть на странице, и уже на основании этого расчитывал какую-то сумму. Берём псевдоколлекцию expensesItem и добавляем свойство lenght, что означает "все элементы на странице".
			let a = expensesItem[i].value,												// присваиваем переменной а значение из переменной expensesItem (данные из поля "наименование" на странице), пишем [i], чтобы данные пришли из строки с индексом 0, тк в условиях i = 0.			
				b = expensesItem[++i].value;											// присваиваем переменной b значение из переменной expensesItem (данные из поля "цена" на странице), пишем [++i], чтобы данные пришли из строки с индексом 1. 
			
			// содаём проверку ответов(проверяем переменные a и b на тип данных), задаём для них условия, невыполнение которых будет откатывать цикл назад, и вопросы будут повторяться, пока не будет дан корректный ответ.	
			if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
				console.log("Всё верно");                   							// условная фраза, кот. выводится в консоль, как знак, что проверка ответов прошла.
				appData.expenses[a] = b;            									// создадим новое свойство expenses в объекте appData и присвоим ему значение "ключ - значение", где переменная a - это ключ, а переменная b - это значение.
				sum += +b;																// таким образом у нас к sum каждый раз будет прибавляться значение переменной b, а унарный + перед b ставим, чтобы передавалось число, а не строка. Таким образом, мы будем собирать сумму всех значений, кот. ввёл юзер.
			} else {
				i = i - 1;
			}
			expensesValue.textContent = sum;											// запишем значение переменной sum в графу "обязат. расходы".
		}													
	});
	
	
	// Обработчик события данных о необязат. расходах.
	optionalExpensesBtn.addEventListener('click', () => {								// в роли кол-бэк функции стрелочная функция.
		for (let i = 0; optionalExpensesItem.length; i++) {								// применяем свойство length, чтобы JS определил, сколько input'ов из данной переменной есть на странице.
			let opt = optionalExpensesItem[i].value;									// помещаем в переменную opt значение из переменной optionalExpensesItem (поля необязат. расходов,кот. заполняет юзер), и ставим [i], чтобы начать получение из поля с 0 индексом и тд., тк i у нас в условиях равна 0.
			appData.optionalExpenses[i] = opt;											// помещаем значение переменной opt в наш глобальный объект в свойство optionalExpenses.
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';		// помещаем в графу "возможные траты" значение свойства optionalExpenses из объекта. [i] - означает "каждый следующий элемент" (input).
		}
	});

	
	// обработчик события, совместим кнопку "расчитать" и "уровень достатка".
	countBtn.addEventListener('click', () => {											// здесь в кол-бэк функции я попробовал использовать вместо традиционной записи функции стрелочную функцию.

		// условия, при которых программа сработает, если будет нажата кнопка "начать расчёт" (соответственно, далее будет указан доход).
		if (appData.budget != undefined) {
			appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();						// расчитываем бюджет на 1 день за минусом обязательных расходов (ставим + перед expensesValue, чтобы получить число), округляем его до ближайшего целого значения и сразу записываем егов глобальный объект.
			dayBudgetValue.textContent = appData.moneyPerDay;							// записываем значение в графу "Бюджет на день".

			
			// условия расчета уровня достатка и передадим значение (данные от юзера) в соответствующий блок на странице.
			if (appData.moneyPerDay < 100) {
				levelValue.textContent = "Минимальный уровень достатка";
			} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
				levelValue.textContent = "Средний уровень достатка";
			} else if (appData.moneyPerDay > 2000) {
				levelValue.textContent = "Высокий уровень достатка";
			} else {
				levelValue.textContent = "Произошла ошибка";
			}
		} else {
			dayBudgetValue.textContent = 'Произошла ошибка';
		}	
	});

	
	// обработчик события при указании юзером доп. дохода через заятую в поле доп.дохода.
	incomeItem.addEventListener('input', function() {
		let items = incomeItem.value;
		appData.income = items.split(', ');												// в скобках, через запятую, будут записаны значения, кот.введёт юзер, а затем они будут записаны в наш глобальный объект.
		incomeValue.textContent = appData.income;										// запишем значения в графу "доп.доход" на странице.
	});

	// обработчик события чек-бокса.
	checkSavings.addEventListener('click', function() {
		
		
		// проверка для чек-бокса, что если наш savings = false, то мы его вставим в true, и наоборот. То есть этим чек-боксом мы должны делать обратное. Это нужно для того, чтобы если только у человека есть сбережения (поставит галочку в чек-боксе), мы начнём их расчитывать.
		if (appData.savings == true) {
			appData.savings = false;
		} else {
			appData.savings = true;
		}
	});

	
	
	// создадим обработчики событий расчета накоплений за месяц и год.
	
	// для суммы
	sumValue.addEventListener('input', function() {
		if (appData.savings == true) {
			let sum = +sumValue.value,													// + перед значением ставим, чтобы преобразовать в числовой тип данных.
				percent = +percentValue.value;

			appData.monthIncome = sum/100/12*percent; 
			appData.yearIncome = sum/100*percent;

			monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		}
	});
	
	
	// для процентов
	percentValue.addEventListener('input', function() {
		if (appData.savings == true) {
			let sum = +sumValue.value,													// + перед значением ставим, чтобы преобразовать в числовой тип данных.
				percent = +percentValue.value;

			appData.monthIncome = sum/100/12*percent; 
			appData.yearIncome = sum/100*percent;

			monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		}
	});
	
	
	// Создаём объект, прописываем нужные нам "ключ (свойства) - значения".
    let appData = {                          											
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false
    };











    





