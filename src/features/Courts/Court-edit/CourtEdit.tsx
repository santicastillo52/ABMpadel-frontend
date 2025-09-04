import React, { useMemo } from "react";
import type { CourtCreate } from "../../../models/court.model";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourt, updateCourt, deleteCourt } from "../../../api/courtsAPI";
import { useParams, useNavigate } from "react-router-dom";
import './CourtEdit.css';

const validationSchema = Yup.object({
    name: Yup.string().min(1).required('El nombre es requerido'),
    wall_type: Yup.string().required('El tipo de pared es requerido'),
    court_type: Yup.string().required('El tipo de cancha es requerido'),
})

export const CourtEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const courtId = id ? parseInt(id, 10) : null;
    const baseURL = 'http://localhost:3000';

    const { isLoading, data: court, isError, error } = useQuery({
        queryKey: ["court", courtId],
        queryFn: () => getCourt(courtId!),
        enabled: !!courtId
    });

    const mutation = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: FormData }) => updateCourt(id, formData),
        onSuccess: () => {
            alert('Cancha actualizada exitosamente');
        },
        onError: (error) => {
            alert(`Error: ${error}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCourt,
        onSuccess: () => {
           
            queryClient.invalidateQueries({ queryKey: ["courts"] });
            queryClient.invalidateQueries({ queryKey: ["court", courtId] });
            alert('Cancha eliminada exitosamente');
            navigate('/'); 
        },
        onError: (error) => {
            alert(`Error al eliminar cancha: ${error}`);
        }
    });

    const initialValues: CourtCreate = useMemo(() => ({
        name: court?.name || '',
        wall_type: court?.wall_type || '',
        court_type: court?.court_type || '',
        image_url: court?.image_url || '',
        schedules: court?.schedules || ''
    }), [court]);

    const onSubmit = (values: CourtCreate) => {
        if (!courtId) return;
        
        const imageInput = document.getElementById('court-image') as HTMLInputElement;
        const file = imageInput?.files?.[0];
        
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("wall_type", values.wall_type);
        formData.append("court_type", values.court_type);
        formData.append("schedules", court?.schedules || '');

        if (file) {
            formData.append("image_url", file);
        } else if (court?.image_url) {
            formData.append("image_url", court.image_url);
        }
        
        mutation.mutate({ id: courtId, formData });
    }

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar la cancha "${court?.name}"? Esta acción no se puede deshacer.`)) {
            if (courtId) {
                deleteMutation.mutate(courtId);
            }
        }
    };

    const { handleChange, handleSubmit, errors, values } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    });


    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error: {error?.message}</div>;
    if (!court) return <div>No se encontró la cancha</div>;

    return (
        <section className="court-edit-page">
            <div className="court-edit-container">
                <h2>Editar Cancha: {court.name}</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Nombre de la Cancha</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nombre"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <small className="error-text">
                            {errors.name}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="wall_type">Tipo de pared</label>
                        <select className="form-control" id="wall_type" name="wall_type" value={values.wall_type} onChange={handleChange}>
                            <option value="">Seleccionar tipo de pared</option>
                            <option value="acrylic">Acrílico</option>
                            <option value="cement">Cemento</option>
                        </select>
                        <small className="error-text">
                            {errors.wall_type}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="court_type">Tipo de cancha</label>
                        <select className="form-control" id="court_type" name="court_type" value={values.court_type} onChange={handleChange}>
                            <option value="">Seleccionar tipo de cancha</option>
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>
                        </select>
                        <small className="error-text">
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
                        {court.image_url && (
                            <div className="current-image">
                                <p>Imagen actual:</p>
                                <img 
                                    src={baseURL + court.image_url} 
                                    alt="Imagen actual" 
                                />
                            </div>
                        )}
                        <small className="error-text">
                            {errors.image_url}
                        </small>
                    </div>

                    <div className="buttons-container">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? 'Actualizando...' : 'Actualizar Cancha'}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="delete-btn"
                        >
                            {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar Cancha'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
