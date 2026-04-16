const form = document.getElementById("preorder-form");
const message = document.getElementById("form-message");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.classList.remove("is-success", "is-error");
    if (!form.checkValidity()) {
      message.textContent = "Please complete all fields.";
      message.classList.add("is-error");
      form.reportValidity();
      return;
    }
    message.textContent = "You’re on the list.";
    message.classList.add("is-success");
    form.reset();
  });
}
