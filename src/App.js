import React, { useState } from 'react';
import moment from 'moment';
import './App.css';

import submitFormData from './submitFormData';

function App() {

  const [inputFields, setMapFields] = useState(submitFormData);
  const [dateValue, setDateValue] = useState(''); //use for conditional rendering of parental consent

  const handleInputField = (e) => {
    setMapFields(inputFields.map((field) => {
      if (field.name === e.target.name) {
        return {
          ...field,
          textValue: e.target.value //text value added to data for the payload
        }
      }
      return field;
    }))
  };

  const handleBirthDataField = (e) => {
    setDateValue(e.target.value);
    setMapFields(inputFields.map((field) => {
      if (field.name === e.target.name || field.name === "parental_consent") {
        return {
          ...field,
          textValue: e.target.value
        }
      }
      return field;
    }))
  };

  const handleParentialConsent = (e) => {
    setMapFields(inputFields.map((field) => {
      if (field.name === e.target.name) {
        return {
          ...field,
          parental_consent: true
        }
      }
      return field;
    }))
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < inputFields.length; i++) {
      let item = inputFields[i];
      //checking for all the input field, except parental consent
      if (item.textValue === "" || !item.textValue) return alert("Missing one or more fields");

      if (item.conditional) {
        if (item.conditional.show_if(new Date(dateValue))) {
          //checking if the parental consent is checked, if the birthdate is indeed 13 years current
          item.parental_consent ? alert("Success with Parental Consent") : alert("Missing Parental Consent");
        } else {
          //success without Parental Consent needed
          console.log(inputFields)
          return alert("Submit form Success")
        }
      }
    };

  };

  const InputFields = inputFields.map((field) => {
    if (!field.conditional) {
      return (
        <div key={field.name} className="input-container">
          <label htmlFor={field.name}>{field.human_label}</label> <br />
          {field.name !== 'date_of_birth' ? <input type={field.type} name={field.name} onChange={handleInputField} className="input-field"></input> :
            <input className="input-field" type={field.type} name={field.name} onChange={handleBirthDataField} min="1900-01-01" max={moment(new Date()).format("YYYY-MM-DD")} value={dateValue}></input>
          }
        </div>
      )
    } else {
      if (field.conditional.show_if(new Date(dateValue))) {
        return (
          <div key={field.name} className="input-container">
            <label htmlFor={field.name}>{field.human_label}</label> <br />
            <input type={field.type} name={field.name} onClick={handleParentialConsent}></input>
          </div>
        )
      }
    }
    return null;
  });

  return (
    <div className="App">
      <h2>Sparrow Form</h2>
      <div className="form-container">
        <form className="form">
          {InputFields}
          <div className="input-container">
            <input type="submit" onClick={handleOnSubmit}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
