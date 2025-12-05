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

export interface Trip {
  id: number;
  destination: {
    id: number;
    name: string;
    google_maps_link: string;
  };
  trip_date: string;
  time_slot: string;
  approval_status: string;
  rejection_reason: string | null;
  total_students: number;
  total_amount: string;
  payment_link: string;
  created_at: string;
  updated_at: string;
  status_label: string;
}

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

export interface canceledTrip {
  id: number;
  destination: {
    id: number;
    name: string;
    google_maps_link: string;
  };
  updated_at: string;
  status_label: string;
  rejection_reason: string | null;
  total_students: number;
}

export type subAdmin = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};
