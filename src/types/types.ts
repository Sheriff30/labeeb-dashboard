export type distination = {
  id: number;
  name: string;
  type: string;
  place: string;
  description: string;
  images: string[];
  pricePerStudent: number;
  availableDays: string[];
  availableTimes: {
    start: string;
    end: string;
  };
  gender: string[];
  capacity: number;
  paymentMethod: string;
};
