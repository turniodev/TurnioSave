// SÁCH MARKETING 6.0 CỦA PHILIP KOTLER NÈ: https://drive.google.com/file/d/159kYfDasGq0LNF8y-tHRq3JIKFJvKma-/view?usp=sharing
// Appscript
function doPost(request) {
  const files = JSON.parse(request.postData.contents)
  const folderId = "10lr8M4W5DHf998LoB_dHROsRBF5pgmkf"; // Thay đổi id của thư mục cần lưu file tại đây
  const folder = DriveApp.getFolderById(folderId);
  const output = []
  files.forEach((file,index)=> {
  const datafile = Utilities.base64Decode(file.data);
  const blob = Utilities.newBlob(datafile, file.type, file.name);
  const newFile = folder.createFile(blob);
  const url = newFile.getUrl();
  const id = newFile.getId();
  output[index] = { status: "success", name: file.name, id: id, view: url, link: `https://lh3.googleusercontent.com/d/${id}`}
  })
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON); 
}
// MyHTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    body {
      background-color: #000;
      display: flex;
      color: white;
      height: 100vh;
      justify-content: center;
      gap: 30px;
      flex-direction: column;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    button {
      background-color: #ffb800;
      outline: none;
      border: none;
      transition: 0.3s;
      border-radius: 5px;
      padding: 10px 30px;
      cursor: pointer;
    }
    div {
      margin: auto;
    }
  </style>
  <body>
    <div>
      <input type="file" id="file" multiple />
      <button id="upload">UPLOAD</button>
    </div>
    <img id="img" width="50%" />
  </body>
  <script>
    const elInput = document.getElementById("file");
    const img = document.getElementById("img");
    const uploadBtn = document.getElementById("upload");
    const postData = [];

    elInput.addEventListener("change", () => {
      const file = elInput.files;
      const fileList = [...file];
      fileList.forEach((file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          const data = reader.result.split(",")[1];
          postData[index] = {
            name: file.name,
            type: file.type,
            data: data,
          };
        });
      });
    });
    uploadBtn.addEventListener("click", () => {
      console.log(postData);
      postFile(postData);
    });
    async function postFile(postData) {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwLv8w4ZEeC3hvaEFgNrUYjeMZeSA7UzdxzZiQsC9sD377JC_1cAkP-X2fCY1pwAtyJog/exec",
          {
            method: "POST",
            body: JSON.stringify(postData),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        alert("Vui lòng thử lại");
      }
    }
  </script>
</html>
