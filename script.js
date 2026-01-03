// ============================================
// МОЙ КАЛЬКУЛЯТОР НА JAVASCRIPT
// Автор: [Ваше имя]
// ============================================

// Получаем элементы экрана
const previousElement = document.getElementById('previous');
const currentElement = document.getElementById('current');

// Переменные для хранения данных
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetScreen = false;
let history = [];
function addToHistory(expression, result) {
    history.push(`${expression} = ${result}`);
}
// ============================================
// ОСНОВНЫЕ ФУНКЦИИ
// ============================================

// Функция обновления экрана
function updateDisplay() {
    currentElement.textContent = currentOperand;
    
    if (operation != null) {
        previousElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousElement.textContent = previousOperand;
    }
}

// Функция добавления цифры
function appendNumber(number) {
    // Если экран нужно сбросить
    if (resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    
    // Проверяем, есть ли уже точка
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Если текущее число 0, заменяем его
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        // Ограничиваем длину числа
        if (currentOperand.length < 12) {
            currentOperand += number;
        }
    }
    
    updateDisplay();
}

// Функция добавления операции
function appendOperation(op) {
    // Если нет текущего операнда, выходим
    if (currentOperand === '') return;
    
    // Если есть предыдущая операция, вычисляем
    if (previousOperand !== '') {
        calculate();
    }
    
    // Сохраняем операцию
    operation = op;
    previousOperand = currentOperand;
    resetScreen = true;
    
    updateDisplay();
}

// Функция вычисления
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Проверяем, что числа валидны
    if (isNaN(prev) || isNaN(current)) return;
    
    // Выполняем операцию
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Проверка деления на ноль
            if (current === 0) {
                alert("Ошибка: деление на ноль!");
                clearAll();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Округляем результат
    result = Math.round(result * 10000000000) / 10000000000;
    
    // Проверяем на переполнение
    if (result.toString().length > 12) {
        currentOperand = result.toExponential(6);
    } else {
        currentOperand = result.toString();
    }
    
    // Сбрасываем операцию
    operation = null;
    previousOperand = '';
    resetScreen = true;
    
    updateDisplay();
}

// Функция очистки всего
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    resetScreen = false;
    
    updateDisplay();
}

// Функция удаления последней цифры
function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    
    updateDisplay();
}

// Функция добавления десятичной точки
function appendDecimal() {
    if (resetScreen) {
        currentOperand = '0';
        resetScreen = false;
    }
    
    if (!currentOperand.includes('.')) {
        if (currentOperand.length < 12) {
            currentOperand += '.';
        }
    }
    
    updateDisplay();
}

// Функция смены знака
function toggleSign() {
    if (currentOperand === '0' || currentOperand === '') return;
    
    if (currentOperand.startsWith('-')) {
        currentOperand = currentOperand.slice(1);
    } else {
        currentOperand = '-' + currentOperand;
    }
    
    updateDisplay();
}

// ============================================
// ОБРАБОТКА КЛАВИАТУРЫ
// ============================================

document.addEventListener('keydown', function(event) {
    // Цифры 0-9 и точка
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        appendNumber(event.key);
    }
    
    // Операции
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperation(event.key);
    }
    
    // Enter или = для вычисления
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Escape для очистки
    if (event.key === 'Escape' || event.key === 'Delete') {
        clearAll();
    }
    
    // Backspace для удаления
    if (event.key === 'Backspace') {
        deleteLast();
    }
});

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// Функция для вычисления процентов (можно добавить позже)
function calculatePercent() {
    // Эта функция для будущего расширения
    console.log("Функция процентов будет добавлена позже");
}

// Функция для квадратного корня (можно добавить позже)
function calculateSquareRoot() {
    // Эта функция для будущего расширения
    console.log("Функция квадратного корня будет добавлена позже");
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

// Инициализируем калькулятор при загрузке
window.onload = function() {
    updateDisplay();
    console.log("Калькулятор загружен и готов к работе!");
    
    // Показываем подсказку
    setTimeout(() => {
        console.log("Подсказка: используйте клавиши на экране или клавиатуру");
    }, 1000);
};

// ============================================
// ПОДСКАЗКИ ДЛЯ РАЗРАБОТЧИКА
// ============================================

/*
КАК РАСШИРИТЬ ФУНКЦИОНАЛ:

1. Добавить кнопку процента (%):
   - Создать кнопку в HTML
   - Добавить функцию calculatePercent()
   - Рассчитывать процент от числа

2. Добавить память (M+, M-, MR, MC):
   - Создать переменную memory
   - Добавить функции для работы с памятью

3. Добавить научные функции:
   - Квадратный корень (√)
   - Возведение в степень (x^y)
   - Синус, косинус, тангенс

4. Добавить историю вычислений:
   - Массив для хранения операций
   - Отображение истории на экране

5. Добавить смену темы:
   - Тёмная/светлая тема
   - Сохранение в localStorage
*/

// Экспортируем функции для тестирования (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appendNumber,
        appendOperation,
        calculate,
        clearAll,
        deleteLast,
        appendDecimal,
        toggleSign
    };
}