const form = document.querySelector(".feedback-form");
const textarea = form.elements.message;
const localStorageKey = "feedback-form-state";
let formData = { email: "", message: "" };

try {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey));
  if (savedData) {
    formData.email = savedData.email || "";
    formData.message = savedData.message || "";
  }
} catch (error) {
  console.error("Error parsing localStorage data:", error);
}

textarea.value = formData.message;
if (formData.email) {
  form.elements.email.value = formData.email;
}

form.addEventListener("input", (evt) => {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);
  localStorage.removeItem(localStorageKey);
  form.reset();
  formData = { email: "", message: "" };
});