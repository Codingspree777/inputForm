import React, { useState } from 'react';
import moment from 'moment';
import './App.css';

import submitFormData from './submitFormData';

function App() {

  const [inputFields, setMapFields] = useState(submitFormData);
  const [dateValue, setDateValue] = useState('');

  const handleInputField = (e) => {
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
    setMapFields(inputFields.map((field)=>{
      if(field.name === e.target.name) {
        return {
          ...field,
          parential_consent: true
        }
      }
      return field;
    }))
  };
  
  const InputFields = inputFields.map((field) => {
    if (!field.conditional) {
      return (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.human_label}</label> <br />
          {field.name !== 'date_of_birth' ? <input type={field.type} name={field.name} onChange={handleInputField}></input> :
            <input type={field.type} name={field.name} onChange={handleBirthDataField} min="1900-01-01" max={moment(new Date()).format("YYYY-MM-DD")} value={dateValue}></input>
          }
        </div>
      )
    } else {
      if (field.conditional.show_if(new Date(dateValue))) {
        return (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.human_label}</label> <br />
            <input type={field.type} name={field.name} onClick={handleParentialConsent}></input>
          </div>
        )

      }
    }
  });

  return (
    <div className="App">
      <form>
        {InputFields}
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
