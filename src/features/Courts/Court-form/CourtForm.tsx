import React, { useState } from "react";
import type { CourtCreate } from "../../../models/court.model";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { createCourt } from "../../../api/courtsAPI";
import './CourtForm.css';

const initialValues: CourtCreate = {
    name: '',
    wall_type: '',
    court_type: '',
    image_url: '',
    schedules: ''
}

const daysOfWeek = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
];


const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('El nombre es requerido'),
    wall_type: Yup.string().required('El tipo de pared es requerido'),
    court_type: Yup.string().required('El tipo de cancha es requerido'),
    image_url: Yup.mixed().required('La imagen es requerida'),
    schedules: Yup.string(),
})

export const CourtForm: React.FC = () => {
    const [schedules, setSchedules] = useState<Record<string, string>>({});
    const [selectedDay, setSelectedDay] = useState('');
    const [timeRange, setTimeRange] = useState('');

    const mutation = useMutation({
        mutationFn: createCourt,
        onSuccess: () => {
            alert('Cancha creada');
        },
        onError: (error) => {
            alert(`Error:${error}`);
        }
    });

    const addSchedule = () => {
        if (selectedDay && timeRange) {
            setSchedules(prev => ({
                ...prev,
                [selectedDay]: timeRange
            }));
            setSelectedDay('');
            setTimeRange('');
        }
    };


    const removeSchedule = (day: string) => {
        setSchedules(prev => {
            const newSchedules = { ...prev };
            delete newSchedules[day];
            return newSchedules;
        });
    };

  
    const formatSchedulesForBackend = () => {
        if (Object.keys(schedules).length === 0) return '';
        return JSON.stringify([schedules]);
    };

    const onSubmit = (values: CourtCreate) => {
        const formattedSchedules = formatSchedulesForBackend();
        
        
        const imageInput = document.getElementById('court-image') as HTMLInputElement;
        const file = imageInput?.files?.[0];
        
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("wall_type", values.wall_type);
        formData.append("court_type", values.court_type);
        formData.append("schedules", formattedSchedules);

        if (file) {
            formData.append("image_url", file); 
        }
        mutation.mutate(formData);
    }

    const {handleChange, handleSubmit, errors, isValid, dirty} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });



  return (
    <section className="court-form-page">
    <div className="court-form-container">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Nombre de la Cancha</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          />
          <small style={{ color: 'red' }}>
            {errors.name}
          </small>
        </div>
  

        <div className="form-group">
          <label htmlFor="wall_type">Tipo de pared</label>
          <select className="form-control" id="wall_type" name="wall_type" onChange={handleChange}>
            <option value="acrylic">Acrílico</option>
            <option value="cement">Cemento</option>
          </select>
          <small style={{ color: 'red' }}>
            {errors.wall_type}
          </small>
        </div>
  

        <div className="form-group">
          <label htmlFor="court_type">Tipo de cancha</label>
          <select className="form-control" id="court_type" name="court_type" onChange={handleChange}>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
          <small style={{ color: 'red' }}>
            {errors.court_type}
          </small>
        </div>
  
  
        <div className="form-group">
          <label htmlFor="court-image">Imagen</label>
          <input
            type="file"
            className="form-control-file"
            id="court-image"
            name="image_url"
            accept="image/*"
            onChange={handleChange}
          />
          <small style={{ color: 'red' }}>
            {errors.image_url}
          </small>
        </div>

        <div className="form-group">
          <label>Horarios de Disponibilidad</label>
          
          <div className="schedules-form-container">
            <div className="schedule-field">
              <label htmlFor="day-select" className="schedule-label">
                Día de la semana
              </label>
              <select
                id="day-select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="schedule-select"
              >
                <option value="">Seleccionar día</option>
                {daysOfWeek.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="schedule-field">
              <label htmlFor="time-range" className="schedule-label">
                Horario (ej: 20:00 hasta 22:00)
              </label>
              <input
                id="time-range"
                type="text"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                placeholder="20:00 hasta 22:00"
                className="schedule-input"
              />
            </div>
            
            <button
              type="button"
              onClick={addSchedule}
              disabled={!selectedDay || !timeRange}
              className="add-schedule-btn"
            >
              Agregar
            </button>
          </div>

          {Object.keys(schedules).length > 0 && (
            <div className="schedules-list-container">
              <h4 className="schedules-title">Horarios configurados:</h4>
              <div className="schedules-list">
                {Object.entries(schedules).map(([day, time]) => {
                  const dayLabel = daysOfWeek.find(d => d.value === day)?.label || day;
                  return (
                    <div key={day} className="schedule-item">
                      <span>
                        <strong>{dayLabel}:</strong> {time}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSchedule(day)}
                        className="remove-schedule-btn"
                        title="Eliminar horario"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <small className="schedule-help-text">
            Selecciona un día y agrega el horario de disponibilidad. Puedes agregar múltiples días.
          </small>
        </div>

  
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!isValid || !dirty}
        >
          Agregar Cancha
        </button>
      </form>
  

    </div>
  </section>
  
  )
};
