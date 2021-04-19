import React, { useState, useEffect } from 'react';
import './App.css';

import submitFormData from './submitFormData';

function App() {

  const [mapFields, setMapFields] = useState(
    submitFormData.filter(field => !field.conditional)
  );

  const handleInputField = (e) => {
    console.log(e.target.name, 'regular');
  }

  const handleBirthDataField = (e) => {
    console.log(e.target.value, 'birthday')
  }
 
  const InputFields = mapFields.map((field)=>{
    return (
      <div key={field.name}>
        <label htmlFor={field.name}>{field.human_label}</label> <br/>
        <input type={field.type} name={field.name} onChange={field.name === 'date_of_birth' ? handleBirthDataField : handleInputField}></input>
      </div>
    )
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
