function doPost(request) {
  const file = JSON.parse(request.postData.contents)
   const datafile = Utilities.base64Decode(file.data);
  const blob = Utilities.newBlob(datafile, file.type, file.name);
  const folderId = "14PFXiarcdUz9O-CgVx__Fs1m____Xw93PbLJ"; // Thay đổi id của thư mục cần lưu file tại đây
  const folder = DriveApp.getFolderById(folderId);
  const newFile = folder.createFile(blob);
  const url = newFile.getUrl();
  const id = newFile.getId();
  const output = { status: "success", name: file.name, id: id, view: url, link: `https://lh3.googleusercontent.com/d/${id}`};
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON); 
}

// HTML cua minh 
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
      <input type="file" id="file" /> <button id="upload">UPLOAD</button>
    </div>
    <img id="img" width="50%" />
  </body>
  <script>
    const elInput = document.getElementById("file");
    const img = document.getElementById("img");
    const uploadBtn = document.getElementById("upload");

    uploadBtn.addEventListener("click", () => {
      const file = elInput.files[0];
      if (!file) {
        return elInput.click();
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        const data = reader.result.split(",")[1];
        const postData = {
          name: file.name,
          type: file.type,
          data: data,
        };
        postFile(postData);
      });
    });
    async function postFile(postData) {
      try {
        const response = await fetch(
          "APPSCRIPCUABAN",
          {
            method: "POST",
            body: JSON.stringify(postData),
          }
        );
        const data = await response.json();
        console.log(data);
        img.src = data.link + "&sz=s500";
      } catch (error) {
        alert("Vui lòng thử lại");
      }
    }
  </script>
</html>
