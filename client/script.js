import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  });
}

function generateUniqueId() {
  const timeStamp = Date.now() ; 
  const randomNumber = Math.random() ; 
  const hexdecimalString = randomNumber.toString(16) ; 
  return `id-${timeStamp}-${hexdecimalString}}`
}

function chatStripe (isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}"></div>
      <div class="chat">
        <div class="profile">
          <img
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueId}>
          ${value}
        </div>
      </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form) ; 

  // user's chat stripe 
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset() ; 


  // bot chat stripe 
  const uniqueId = generateUniqueId()  ;
  chatContainer.innerHTML += chatStripe(true ," ", uniqueId) ; 

  chatContainer.scrollTop = chatContainer.scrollHeight ;
}