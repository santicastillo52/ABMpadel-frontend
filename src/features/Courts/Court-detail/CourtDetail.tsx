import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCourt } from "../../../api/courtsAPI";
import { List } from "antd";
import { environment } from "../../../environment/environment";
import "./CourtDetail.css";

export const CourtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courtId = id ? parseInt(id, 10) : null;
  const baseURL = environment.apiUrl;

  const {
    isLoading,
    data: court,
    isError,
    error,
  } = useQuery({
    queryKey: ["court", courtId],
    queryFn: () => getCourt(courtId!),
    enabled: !!courtId,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;
  if (!court) {
    return <div>No existe esa court</div>;
  }

  return (
    <div className="court-detail-container">
      <div className="court-detail-header">
        <h1 className="court-detail-title">
          Detalle de la cancha {court.name}
        </h1>
      </div>

      <div className="court-detail-info">
        <p className="court-detail-field">
          <strong>Tipo:</strong> {court.court_type}
        </p>
        <p className="court-detail-field">
          <strong>Pared:</strong> {court.wall_type}
        </p>
      </div>

      <div className="court-detail-image">
        <img alt={court.name} src={baseURL + court.image_url} />
      </div>

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

      <div className="button-container">
        <button
          onClick={() => navigate(`/court/${courtId}/edit`)}
          className="court-detail-button"
        >
          Editar Cancha
        </button>
        <button onClick={() => navigate("/")} className="court-detail-button">
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
