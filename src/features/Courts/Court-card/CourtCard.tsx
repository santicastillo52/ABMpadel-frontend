import React from 'react'
import type { Court } from '../../../models/court.model'

export const CourtCard: React.FC<Court> = (court) => {
  return (
    <div>{court.name}</div>
  )
}
