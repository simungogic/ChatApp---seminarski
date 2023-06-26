const clientName = document.querySelector("#client-name");
const clientColor = document.querySelector("#client-color");
const clientNames = ["Lion", "Deer", "Bear", "Tiger", "Bobcat", "Mouse", "Dog", "Dingo"];

function randomizeClientName() {
    const randomIndex = Math.floor(Math.random() * clientNames.length);
    clientName.value = clientNames[randomIndex];
}

function randomizeClientColor() {
    clientColor.value = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function validateSignIn() {
    if(clientName.value.length === 0) return false;
    if(clientColor.value.length === 0) return false;

    return true;
}
