export type destination = {
  id: number;
  name: string;
  type: string;
  place: string;
  description: string;
  images: {
    image_path: string;
    id: number;
    destination_id: number;
    order: number;
  }[];
  pricePerStudent: number;
  availableDays: string[];
  working_hours_from: string;
  working_hours_to: string;
  working_days?: string[];
  gender: string[];
  capacity: number;
  payment_type: string;
  destination_type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  city: string;
  packages?: {
    id: string;
    name: string;
    price: string;
    unit: string;
    items: string[];
    benefits: { id: number; name: string }[]; // Updated to reflect object structure
  }[];
};

export type file = {
  id: number;
  name: string;
  students: number;
  gender: string[];
  levels: string[];
  filePath: string;
  date: string;
  students_count: number;
};

export type packageType = {
  id: string;
  name: string;
  price: string;
  unit: string;
  benefits: { id: number; name: string }[]; // Updated to reflect object structure
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

export type canceledTrip = {
  id: number;
  name: string;
  status: string;
  cancellation_date: string;
  cancellation_reason: string;
  total_students: string;
};

export type subAdmin = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};
