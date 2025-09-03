import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourts } from "../../../api/courtsAPI";
import { CourtCard } from "../Court-card/CourtCard";
import type { Court } from "../../../models/court.model";

export const CourtsContainer: React.FC = () => {
  const { isLoading, data: courts, isError, error } = useQuery({
    queryKey: ["courts"],
    queryFn: getCourts,
  });


  if(isLoading) return <div>Loading...</div>
  else if(isError) return <div>Error: {error.message}</div>
  if(!courts || !Array.isArray(courts)) {
    return <div>No hay canchas disponibles</div>
  }
  return <div>
    {
        courts.map((court: Court)=>{
            return <CourtCard key={court.id}{...court}/>
        })
    }
  </div>;
};
