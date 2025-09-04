import React from 'react';
import { Card, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Court } from '../../../models/court.model';
import { environment } from "../../../environment/environment";
import './CourtCard.css';

const { Meta } = Card;

export const CourtCard: React.FC<Court> = (court) => {
  const baseURL = environment.apiUrl;
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/court/${court.id}`);
  };
  return (
    <Card
      hoverable
      className="court-card"
      onClick={handleCardClick}
      cover={<img alt={court.name} src={baseURL + court.image_url} />}
    >
      <Meta
        title={court.name}
        description={`Tipo de cancha: ${court.court_type} | Tipo de pared: ${court.wall_type}`}
      />


      <div className="availability-section">
        {court.available ? (
          <Tag color="green" className="availability-tag">Disponible</Tag>
        ) : (
          <Tag color="red" className="availability-tag">No disponible</Tag>
        )}
      </div>


      
    </Card>
  );
};
