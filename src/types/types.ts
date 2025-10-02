export type destination = {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  type: string;
  gender: "male" | "female" | "both";
  city: string;
  district: string;
  address: string;
  google_maps_link: string;
  contact_phone: string;
  contact_email: string;
  contact_person_name: string;
  capacity: number;
  labeeb_commission_percentage: number;
  rating: string;
  status: "active" | "inactive";
  images: string[];
  thumbnail: string;
  facilities: string[];
  suitable_grades: string[];
  availability_hours: {
    morning: string;
    afternoon: string;
  };
  availability_days: (
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
  )[];
  booking_required: boolean;
  active_package_count: number;
  min_price: string;
  max_price: string;
  created_at: string;
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
  id: number;
  name: string;
  price: number;
  benefits: string[];
  formatted_benefits: string | null;
  status: "active" | "inactive"; // assuming only these states, adjust if needed
  sort_order: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
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
  id: number;
  name: string;
  date: string;
  phoneNumber: string;
  email: string;
  city: string;
};

export type SchoolTrip = {
  destination_id: number;
  destination_package_id: number;
  trip_date: string; // format: YYYY-MM-DD
  trip_time: string; // format: HH:mm
  return_time: string; // format: HH:mm
  description: string;
  special_requirements?: string;
  notes?: string;
  total_students: number;
  amount_per_student: number;
  coordinator_name: string;
  coordinator_phone: string;
  coordinator_email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  pickup_location: string;
  pickup_time: string; // format: HH:mm
  transport_provider: string;
  transport_type: "bus" | "van" | "car" | string;
  transport_details?: string;
};

export interface Destination {
  id: number;
  name: string;
  name_ar: string;
  city: string;
  type: string;
}

export interface School {
  id: string;
  name: string;
  city: string;
}

export interface Trip {
  id: number;
  trip_reference: string;
  destination: Destination;
  school: School;
  package: Package;
  trip_date: string; // e.g. "2025-09-29"
  trip_time: string; // ISO string
  return_time: string | null;
  pickup_time: string;
  pickup_location: string;
  students_count: number;
  confirmed_students: number;
  total_students: number;
  amount_per_student: string; // keep as string since it's returned that way
  total_amount: string;
  paid_amount: string;
  pending_amount: string;
  payment_progress: number;
  coordinator_name: string;
  coordinator_phone: string;
  status: "approved" | "pending" | "rejected" | string; // can extend later
  status_label: string;
  is_editable: boolean;
  is_cancellable: boolean;
  approved_at: string | null;
  rejected_at: string | null;
  cancelled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

type AvailabilityHours = {
  from: string;
  to: string;
};

export interface Package {
  name: string;
  price: string;
  benefits: string[];
  status: "active";
}

export type DestinationCreate = {
  name: string;
  description: string;
  google_maps_link: string;
  email: string;
  phone: string;
  contact_person_name: string;
  type: string;
  city: string;
  district: string;
  gender: string;
  labeeb_commission_percentage: string;
  capacity: string;
  availability_hours: AvailabilityHours[];
  availability_days: string[];
  images: string[];
  status: "active";
  payment_method: string;
  packages: Package[];
};
