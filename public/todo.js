const date = new Date();
const getDay = date.getDay();
const getDate = date.getDate();
const getMonth = date.getMonth();
const getFullYear = date.getFullYear();
const displaydate = document.getElementsByClassName('displaydate')[0];
const todoInput = document.getElementById('todoInput');
const container = document.getElementsByClassName('container')[0];
const todovalue = todoInput.value;
const task = document.getElementsByClassName('task')[0];
const form = document.getElementById('form')
const form2 = document.getElementById('form2')
let arr = []

console.log(todoInput)

const displayday = document.getElementsByClassName('displayday')[0];
switch (getDay) {
    case 0:
        day = "Sunday";
        displayday.innerHTML = `${day}`;
        break;
    case 1:
        day = "Monday";
        displayday.innerHTML = `${day}`;
        break;
    case 2:
        day = "Tuesday";
        displayday.innerHTML = `${day}`;
        break;
    case 3:
        day = "Wednesday";
        displayday.innerHTML = `${day}`;
        break;
    case 4:
        day = "Thursday";
        displayday.innerHTML = `${day}`;
        break;
    case 5:
        day = "Friday";
        displayday.innerHTML = `${day}`;
        break;
    case 6:
        day = "Saturday";
        displayday.innerHTML = `${day}`;
}
switch (getMonth) {
    case 0:
        month = "January";
        break;
    case 1:
        month = "February";
        break;
    case 2:
        month = "March";
        break;
    case 3:
        month = "April";
        break;
    case 4:
        month = "May";
        break;
    case 5:
        month = "June";
        break;
    case 6:
        month = "July";
        break;
    case 7:
        month = "August";
        break;
    case 8:
        month = "September";
        break;
    case 9:
        month = "October";
        break;
    case 10:
        month = "November";
        break;
    case 11:
        month = "December";
        break;
}
displaydate.innerHTML = `${getDate} ${month} ${getFullYear}`;
todoInput.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        form.submit();


    }
})