export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  priceMax: number;
  image: string;
  capacity: number;
  features: string[];
}

export interface Reservation {
  id: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
} 