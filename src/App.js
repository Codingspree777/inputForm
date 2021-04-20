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
      if (field.name === e.target.name) {
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
    console.log(inputFields);  // console.log out payload
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
