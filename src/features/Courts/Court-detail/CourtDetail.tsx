import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourt } from '../../../api/courtsAPI';
import { List } from 'antd';

export const CourtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courtId = id ? parseInt(id, 10) : null;
  const baseURL = 'http://localhost:3000';
  
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
      <p>Tipo: {court.court_type}</p>
      <p>Muro: {court.wall_type}</p>
      <img alt={court.name} src={baseURL + court.image_url} />
      
      <button 
        onClick={() => navigate(`/court/${courtId}/edit`)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        {court.schedules && court.schedules.length > 0 && (
        <div className="schedules-section">
          <h4 className="schedules-title">Horarios:</h4>
          <List
            size="small"
            bordered
            className="schedules-list"
            dataSource={Object.entries(court.schedules[0])}
            renderItem={([day, time]) => (
              <List.Item>
                <span className="schedule-day">{day}:</span>
                <span className="schedule-time">{time}</span>
              </List.Item>
            )}
          />
        </div>
      )}
        Editar Cancha
      </button>
    </div>
  );
};