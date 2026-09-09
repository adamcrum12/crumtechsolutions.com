 'use strict';
const form = document.getElementById('help-form');
let sending = false;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const values = ['name', 'reply', 'issue'].map(key => form.elements.namedItem(key).value.trim());
  if (values.some(value => !value)) {
    status.textContent = 'Please enter your name, a way to contact you and a description of the problem.';
    return;
  }
  sending = true;
  button.disabled = true;
  button.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Sending your request…';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const data = new FormData(form);
    ['name', 'reply', 'issue'].forEach((key, i) => data.set(key, values[i]));
    const response = await fetch(form.action, { method: 'POST', body: data,
      headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    status.textContent = 'Thank you—your request has been submitted. Adam will contact you using the details you provided.';
    form.reset();
  } catch (error) {
    status.textContent = 'We couldn’t confirm your request was received. Your details are still here. Please call (330) 558-1022 or email adam@crumtechnologies.com. You can also try again, but a delayed request may have already arrived.';
  } finally {
    clearTimeout(timer);
    sending = false;
    button.disabled = false;
    button.textContent = 'Send request';
    form.removeAttribute('aria-busy');
  }
});
