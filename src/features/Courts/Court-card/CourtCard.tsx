import React from 'react';
import { Card, Tag, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Court } from '../../../models/court.model';
import './CourtCard.css';

const { Meta } = Card;

export const CourtCard: React.FC<Court> = (court) => {
  const baseURL = 'http://localhost:3000';
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
        description={`Tipo de cancha: ${court.court_type} | Tipo de muro: ${court.wall_type}`}
      />


      <div className="availability-section">
        {court.available ? (
          <Tag color="green" className="availability-tag">Disponible</Tag>
        ) : (
          <Tag color="red" className="availability-tag">No disponible</Tag>
        )}
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
    </Card>
  );
};
