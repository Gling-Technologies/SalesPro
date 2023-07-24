const  createSchemaObject = (fieldsMeta, mandatoriness, inputOptions) => {
  const fieldValidations = {};
  for (const fieldMeta of fieldsMeta) {
    if(fieldMeta.dependent === true) continue;

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

const checkConditions = (conditions, values) => {
  if (!conditions) return true;

  for (const condition of conditions) {
    const { field, value } = condition;
    if (values[field] !== value) {
      return false;
    }
  }
  return true;
};

const applyData = (setter, data) => {
  setter((prevValues) => {
    const newValues = Object.keys(prevValues).reduce((values, fieldName) => {
      if (fieldName in data && !!data[fieldName]) {
        values[fieldName] = data[fieldName];
      }
      return values;
    }, {});
    return { ...prevValues, ...newValues };
  });
};

export {
  createSchemaObject,
  checkConditions,
  applyData,
  createSchemaObject as default,
};
