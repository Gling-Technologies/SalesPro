export default function createSchemaObject(fieldsMeta, mandatoriness, inputOptions) {
  const fieldValidations = {};
  for (const fieldMeta of fieldsMeta) {
    let validation = fieldMeta.validation;
    // validation = validation.required(); // for testing

    // Adding required valdation for the field
    if (fieldMeta.name in mandatoriness && mandatoriness[fieldMeta.name]) {
      validation = validation.required();
    }

    // Adding options for the field
    if (fieldMeta.name in inputOptions && inputOptions[fieldMeta.name]) {
      validation = validation.oneOf(inputOptions[fieldMeta.name]);
    }
    fieldValidations[fieldMeta.name] = validation;
  }
  return fieldValidations;
}