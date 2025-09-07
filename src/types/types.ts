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
  date: string;
};

export type packageType = {
  name: string;
  price: string;
  unit: string;
  items: string[];
};

export type student = {
  name: string;
  phone: string;
};

export type students = {
  paid: student[];
  unpaid: student[];
};

export type trip = {
  id: number;
  trip_price: number;
  destination: string;
  status: "pending" | "scheduled" | "completed" | "canceled"; // Based on your status field
  date: string; // ISO date format (YYYY-MM-DD)
  day: string; // e.g., "الاثنين"
  time: string; // e.g., "10:00 ص"
  total_students: number;
  paid_count: number;
  unpaid_count: number;
  location: string;
  students: students;
  cancellation_date: string;
  refund_status: string;
  cancellation_reason: string;
};

export type confirmModalProps = {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  titleColor?: string;
  buttonText?: string;
  type?: "success" | "delete";
};

export type scheduledTrip = {
  id: number;
  name: string;
  status: string;
  date: string;
  time: string;
  total_students: string;
  paid_count: string;
  unpaid_count: number;
  students: students;
};
