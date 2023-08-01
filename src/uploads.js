window.fileUploads = [];

window.onbeforeunload = function () {
  console.log("Unloading the page!");
  if (window.fileUploads.length) {
    return "You will lose the files being uploaded! Do you still want to continue?";
  }
};

window.uploadFile = async function (file) {
  return new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .createBlankFile(file.name, file.type);

    !window.google && setTimeout(() => resolve({ fileUrl: "https://example.com/file" }), 2000);
  });
}

window.getFileContent = async function (file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (f) => {
      const fileContent = f.target.result.substr(
        f.target.result.indexOf(",") + 1
      );
      resolve(fileContent);
    };
    fr.readAsDataURL(file);
  });
}

window.validateFileFormField = function (files) {
  if (files.length > 1) {
    // repalce the number for allowing the number of files to upload
    // swal("Important", "You cannot upload more than 1 files!");
    console.log("Important", "You cannot upload more than 1 files!");
    return false;
  }
  for (let file of files) {
    if (file.size > 10485760) {
      // swal("Important", "You cannot upload more than 1 files!");
      console.log("Important", "The size of file cannot be more than 10 MB!");
      return false;
    }
  }
  return true;
}

window.processFiles = async function (files) {
  const fileUrls = [];
  const status = window.validateFileFormField(files);
  if(!status){
    return "";
  }
  for (let file of files) {
    try {
      let data = await window.uploadFile(file);
      fileUrls.push(data.fileUrl);
      data["mimeType"] = file.type;
      data["status"] = "new";
      data["content"] = await window.getFileContent(file);
      window.fileUploads.push(data);
    } catch (e) {
      console.error(e);
    }
  }
  return {fileUrl: fileUrls.join("\n")};
};

setInterval(function () {
  if (window.fileUploads.length) {
    console.log(`Uploading ${window.fileUploads.length} files`);
    //   $("#file-upload-progress-bar").removeClass("d-none");
    const newFileUploads = window.fileUploads.filter(({ status }) => status === "new");
    for (let fileUpload of newFileUploads) {
      const { fileId, content, mimeType } = fileUpload;
      fileUpload.status = "uploading";

      window.google && window.google.script.run
        .withSuccessHandler(() => {
          const index = window.fileUploads.find(
            (fileUpload) => fileUpload.fileId === fileId
          );
          window.fileUploads.splice(index, 1);
          console.log("File Upload Success!", fileId);
        })
        .withFailureHandler(() => {
          fileUpload.status = "new";
          console.log("File Upload Failed!", fileId);
        })
        .overwriteFile(fileId, mimeType, content);
    }
  }
  // else {
  //   $("#file-upload-progress-bar").addClass("d-none");
  // }
}, 1000);
