// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  
function validateMe(event) {
  event.preventDefault();

  // const emailNode = event.target.elements['email'];
  // const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  // emailErrorNode.innerHTML = '';

  // let emailErrors = document.createElement('ul');
  // emailErrors.setAttribute("role", "alert");

  // if (emailNode.value.length < 5 ) {
  //   let li = document.createElement('li');
  //   li.innerText = 'Email is too short';
  //   emailErrors.appendChild(li)
  // }

  // if (!emailNode.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
  //   let li = document.createElement('li');
  //   li.innerText = 'Email format is incorrect';
  //   emailErrors.appendChild(li)
  // }

  // if (emailErrors.childElementCount > 0) {
  //   emailErrorNode.appendChild(emailErrors)
  // }

  validateEmail(event)
  validatePhone(event)
  validateName(event)
  validateMessage(event)


  return false;
}

function addErrorWarnings(node, errorMessages) {

  let ErrorWarnings = document.createElement('ul');
  ErrorWarnings.setAttribute("role", "alert");

  if (errorMessages.length > 0) {
      errorMessages.forEach(message => {
      let li = document.createElement('li');
      li.innerText = message;
      ErrorWarnings.appendChild(li);
    })
  }

  node.appendChild(ErrorWarnings);
}

function validateEmail(event) {
  const emailNode =(event.type=='submit')?event.target.elements['email']:event.target;
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let errorMessages = [];

  if (emailNode.value.length < 5) {
    errorMessages.push('Email is too short');
  }

  if (!emailNode.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorMessages.push('Email format is incorrect');
  }

  addErrorWarnings(emailErrorNode, errorMessages);

  return true;
}

function validatePhone(event) {
  const phoneNode =(event.type=='submit')? event.target.elements['phone']:event.target;
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';
  let errorMessages = [];

  if(!phoneNode.value.match(/^(\+|0)\s?(\d{3})(\(\d{2}\)|\d{2})\s?(\s?-?\d){7,}$/)){
    errorMessages.push('Phone format is incorrect');
  }
  addErrorWarnings(phoneErrorNode, errorMessages);

}

function validateName(event) {
  const nameNode =(event.type=='submit')? event.target.elements['name']:event.target;
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';
  let errorMessages = [];

  if(!nameNode.value.match(/^(\S(\s\s)?)+$/)){
    errorMessages.push('Name format is incorrect');
  }
  if(nameNode.value.length < 1){
    errorMessages.push('Name is too short');
  }
  addErrorWarnings(nameErrorNode, errorMessages);
}

function validateMessage(event) {
  const forbidden_words = ['ugly', 'dumm', 'stupid', 'pig', 'ignorant'];

  const messageNode =(event.type=='submit')? event.target.elements['message']:event.target;
  const  messageErrorNode =  messageNode.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';
  let errorMessages = [];
  if(messageNode.value.match(new RegExp('(^|\\s)('+forbidden_words.join('|')+')($|\\s)'))){
    errorMessages.push('Message includes bad language');
  }
  if(messageNode.value.length < 10){
    errorMessages.push('Message is too short');
  }
  addErrorWarnings(messageErrorNode, errorMessages);

}

