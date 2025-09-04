
export interface Court {
    id: number;
    name: string;
    wall_type: string;
    court_type: string,
    image_url: string,
    available: boolean,
    schedules: string,
    createdAt: string,
    updatedAd: string
  }

  export interface CourtCreate {
    name: string;
    wall_type: string;
    court_type: string,
    image_url: File | string,
    schedules: string,
  }