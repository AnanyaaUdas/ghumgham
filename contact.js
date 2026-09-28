// contact us page
// the message form only shows a thank you for now, in wordpress it is sent by the contact form plugin

const messageForm = document.getElementById('messageForm');
const messageThanks = document.getElementById('messageThanks');

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  messageForm.reset();
  messageThanks.hidden = false;
  setTimeout(() => { messageThanks.hidden = true; }, 4000);
});
