const urlParams = new URLSearchParams(window.location.search);
const clientName = urlParams.get('client-name');
const clientColor = urlParams.get('client-color');
const text = document.querySelector("#text");
const messages = document.querySelector("#messages");
const chatApp = document.querySelector("#chat-app");
let conn = false;

if(clientName === null || clientColor === null) window.location.replace("index.html");

const CHANNEL_ID = 'yCZ9ykyx9a7Uukk7';
const drone = new ScaleDrone(CHANNEL_ID, {
 data: { 
   name: clientName,
   color: clientColor,
 },
});

drone.on('open', error => {
    if (error) {
      return console.error(error);
    }

    const room = drone.subscribe('observable-room');
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      conn = true;
    });
    
    room.on('data', (message) => {
        addMessage(message);
   });
});

function sendMessage(event) {
    event.preventDefault();

    if(text.value.length === 0) return false;
    if(conn === false) return false;

    drone.publish({
        room: 'observable-room',
        message: {
            id: Date.now(),
            user: clientName,
            color: clientColor,
            text: text.value,
        },
    });
    text.value = "";
}

function addMessage(obj) {
    const message = document.createElement("div");
    const messageUser = document.createElement("div");
    const messageText = document.createElement("div");
    messageUser.innerHTML = obj.user;
    messageText.innerHTML = obj.text;
    message.appendChild(messageUser);
    message.appendChild(messageText);
    message.classList.add("message");
    messageUser.classList.add("messageUser");
    messageText.classList.add("messageText");
    messageText.style.backgroundColor = obj.color;
    messageUser.style.color = obj.color;
    if(obj.user !== clientName || obj.color !== clientColor) {
        message.style.marginLeft = "auto";
        message.style.textAlign = "right";
        message.style.marginRight = "1%";
    }
    else {
        message.style.marginLeft = "1%";
    }
    messages.appendChild(message);
}

function signOut() {
    window.location.replace("index.html");
}