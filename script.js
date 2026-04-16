const form = document.getElementById("preorder-form");
const message = document.getElementById("form-message");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      message.textContent = "Please complete all fields.";
      return;
    }
    message.textContent = "You’re on the list.";
    form.reset();
  });
}
