const inputNumberList = document.querySelectorAll('input[type="number"]');
const total = document.querySelector('.total');

function Food(inputNumber) {
    this.inputNumber = inputNumber;
    this.checkBox = inputNumber.previousSibling.firstChild;
    this.getAmount = function () {
        if (this.inputNumber.value < 0) {
            this.setAmount(0);
        }
        return parseInt(this.inputNumber.value);
    };
    this.setAmount = function (value) {
        this.inputNumber.value = value;
    };
    this.getValue = function () {
        return parseInt(this.checkBox.value);
    };
    this.isChecked = function () {
        return this.checkBox.checked;
    };
    this.getTotal = function () {
        if (this.isChecked()) {
            return this.getAmount() * this.getValue();
        } else {
            return 0;
        }
    };

    // for (let key in this) {
    //     if (typeof this[key] != 'function') {
    //         this[key].addEventListener('change', getTotal);
    //     }
    // }

    this.inputNumber.addEventListener('change', getTotal);
    this.checkBox.addEventListener('change', () => {
        if (this.isChecked()) {
            if (this.getAmount() == 0) this.setAmount(1);
            this.inputNumber.disabled = false;
        } else {
            this.setAmount(0);
            this.inputNumber.disabled = true;
        }
        getTotal();
    });
}

let foodList = [];
for (inputNumber of inputNumberList) {

    foodList.push(new Food(inputNumber));
}

function getTotal() {
    let sum = 0;
    for (food of foodList) {
        sum += food.getTotal();
    }
    total.textContent = sum;
    return sum;
}

const name = document.querySelector('input[name="name"]');
const surname = document.querySelector('input[name="surname"]');

document.querySelector('.make-order').addEventListener('click', () => {
    const total = +getTotal();
    if (!name.value || !surname.value) {
        alert("Введите имя и фамилию");
    } else if (total == 0) {
        alert("Вы ничего не заказали");
    } else {
        alert(`Заказчик: ${surname.value} ${name.value}
Итого: ${getTotal()} р.`);
    }
});
