import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

async function uploadFile(sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .saveFile(sheetName, headerRow);
  });
  return result;
}


const FileFormField = (props) => {

  // const [fileInputValue, setFileInputValue] = useState();

  const changeHandler = async (e) => {
    // setFileInputValue(e.target.value);
    const file = e.target.files[0]
    const { fileUrl } = await uploadFile(file);
    props.handleChange(fileUrl);
  };

  return (
    <Form.Group
      as={Col}
      sm="12"
      xs="12"
      md={6}
      controlId={props.name + "__controlId"}
    >
      <Form.Label>{props.name}</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <Form.Control
          type="file"
          name={props.name}
          required={props.required || false}
          isInvalid={props.touched && !!props.error}
          placeholder={props.placeholder}
          // value={fileInputValue}
          onChange={changeHandler}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default FileFormField;

/**
function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

 */