const form = document.getElementById("preorder-form");
const errorMessage = document.getElementById("form-error-message");
const successMessage = document.getElementById("form-success-message");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (form && errorMessage && successMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.textContent = "";
    successMessage.textContent = "";
    if (!form.checkValidity()) {
      const invalid = form.querySelector(":invalid");
      const fieldName = invalid?.labels?.[0]?.textContent?.trim() || "required fields";
      form.reportValidity();
      errorMessage.textContent = `Please complete the ${fieldName.toLowerCase()} field correctly.`;
      return;
    }
    successMessage.textContent = "You’re on the list.";
    form.reset();
  });
}
