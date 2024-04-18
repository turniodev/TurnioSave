const fullname = document.getElementById("name");
const mail = document.getElementById("mail");
const select = document.getElementById("select");
const content = document.getElementById("content");
const gender = document.querySelector("input[name=gender]:checked");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  if (fullname.value && mail.value) {
    const data = {
      name: fullname.value,
      mail: mail.value,
      select: select.value,
      content: content.value,
      gender: gender.value,
    };
    postData(data);
  } else {
    alert("Vui lòng...");
  }
});

async function postData(data) {
  const formData = new FormData();
  formData.append("entry.1887347495", data.name);
  formData.append("entry.1837638957", data.mail);
  formData.append("entry.314747228", data.select);
  formData.append("entry.854254096", data.content);
  formData.append("entry.1060636809", data.gender);

  fetch(
    "https://docs.google.com/forms/d/e/FORM__________________ID/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );
}
