import generateUniqueId from './helpers/generateUniqueId';
import typeText from './helpers/typeText';
import chatUI from './helpers/chatUI';

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

const baseUrl = 'http://localhost:9500'

let loadInterval

const loader = (element) => {

  element.textContent = ''

  loadInterval = setInterval(() => {

    // Update the text content of the loading indicator
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    element.textContent === '...' && (element.textContent = '');

  }, 300);
}


const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  // user's chatUI
  // ######################################################################
  chatContainer.innerHTML += chatUI(false, data.get('userTextInput'))

  // to clear the textarea input 
  form.reset()


  // bot's chatUI
  // ######################################################################
  const uniqueId = generateUniqueId()

  chatContainer.innerHTML += chatUI(true, " ", uniqueId)

  // to focus scroll to the bottom 
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 
  const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  loader(messageDiv, loadInterval)


  // ######################################################################
  const httpConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('userTextInput')
    })
  }

  const response = await fetch(baseUrl, httpConfig)

  clearInterval(loadInterval);
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()
    messageDiv.innerHTML = "Something went wrong"
    alert(err)
  }
}


form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', e => e.key === 'Enter' && handleSubmit(e));