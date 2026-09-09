'use strict';
const form = document.getElementById('help-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const reply = form.elements.reply.value.trim();
  const issue = form.elements.issue.value.trim();
  if (!name || !reply || !issue) {
    document.getElementById('form-status').textContent = 'Please enter your name, a way to contact you and a short description of the problem.';
    return;
  }
  const body = `Name: ${name}\nContact me at: ${reply}\n\nWhat is happening:\n${issue}`;
  window.location.href = `mailto:adam@crumtechnologies.com?subject=${encodeURIComponent('Computer help request')}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Your email app should open with a draft. Your request has not been sent yet—press Send in your email app. If nothing opens, call (330) 558-1022 or email adam@crumtechnologies.com directly. Your details remain here so you can copy them.';
});
