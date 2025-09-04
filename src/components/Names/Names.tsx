import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import './Names.css';

export const Names: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [conteo, setConteo] = useState<Record<string, number>>({});

  const conteoDeOcurrencias = (arr: string[]): Record<string, number> => {
    const counts: Record<string, number> = {}; 
      
    for(let name of arr){
        let lower = name.toLowerCase();
       
        counts[lower] = (counts[lower] || 0) + 1;
        
    }
   return counts; 
  }

  return (
    <div className="names-container">
      <h1 className="names-title">Conteo de ocurrencias</h1>
      <h2 className="names-subtitle">Agregar nombres</h2>

      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, { resetForm }) => {
          if (values.name.trim() === "") return;
          setNames([...names, values.name]);
          resetForm();
        }}
      >
        {() => (
          <Form className="names-form">
            <div className="form-field">
              <Field
                type="text"
                name="name"
                placeholder="Ingresa un nombre"
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="form-button"
            >
              Agregar
            </button>
          </Form>
        )}
      </Formik>

      <div className="names-list">
        <h3>Lista de nombres:</h3>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      
      <button onClick={() => setConteo(conteoDeOcurrencias(names))} className="count-button">
        Contar ocurrencias
      </button>

      {Object.keys(conteo).length > 0 && (
        <div className="count-results">
          <h3>Conteo de ocurrencias:</h3>
          <ul>
            {Object.entries(conteo).map(([name, count]) => (
              <li key={name}>
                {name}: {count} 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Names;
