import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCourt } from '../../../api/courtsAPI';

export const CourtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courtId = id ? parseInt(id, 10) : null;
  console.log(courtId)
  
  const { isLoading, data: court, isError, error } = useQuery({
    queryKey: ["court", courtId],
    queryFn: () => getCourt(courtId!),
    enabled: !!courtId
  });
  
  if(isLoading) return <div>Loading...</div>
  else if(isError) return <div>Error: {error.message}</div>
  if(!court) {
    return <div>No existe esa court</div>
  }
  
  return (
    <div>
      <h1>Detalle de la cancha {court.name}</h1>
      {/* Aquí puedes usar los datos de court */}
      <p>Tipo: {court.court_type}</p>
      <p>Muro: {court.wall_type}</p>
      {/* resto del componente */}
    </div>
  );
};