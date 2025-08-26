export type destination = {
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

export type file = {
  id: number;
  title: string;
  students: number;
  gender: string[];
  levels: string[];
  filePath: string;
};

export type packageType = {
  name: string;
  price: string;
  unit: string;
  items: string[];
};
