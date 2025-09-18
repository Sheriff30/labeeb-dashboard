import { formatTime } from "../utils/timeFormatter";

export const validators = {
  required: (fieldName: string) => ({
    onChange: ({ value }: { value: string }) =>
      !value ? `الرجاء إدخال ${fieldName}` : undefined,
  }),

  requiredArray: (fieldName: string) => ({
    onChange: ({ value }: { value: string[] }) =>
      !value || value.length === 0 ? `الرجاء إدخال ${fieldName}` : undefined,
  }),

  name: (fieldName: string) => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return `الرجاء إدخال ${fieldName}`;

      if (/^[0-9\u0660-\u0669]+$/.test(value)) {
        return `${fieldName} لا يمكن أن يحتوي على أرقام.`;
      }

      if (/^[^a-zA-Z0-9\u0600-\u06FF]+$/.test(value)) {
        return `${fieldName} لا يمكن أن يحتوي على رموز خاصة.`;
      }

      return undefined;
    },
  }),

  length: (fieldName: string, min: number, max: number) => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return ` الرجاء إدخال ${fieldName}`;
      if (value.length < min)
        return `${fieldName} يجب أن يكون على الأقل ${min}  ${
          fieldName === "الكود" ? "ارقام" : "حرف "
        }`;
      if (value.length > max)
        return `${fieldName} يجب أن يكون على اقل ${max} ${
          fieldName === "الكود" ? "ارقام" : "حرف "
        }`;
      return undefined;
    },
  }),

  otp: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return `الرجاء إدخال رمز التحقق`;
      if (value.length < 6)
        return "الرجاء إدخال رمز التحقق، ويجب أن يتكون من 6 أرقام على الأقل.";
      if (value.length > 6)
        return "الرجاء إدخال رمز التحقق، ويجب أن يتكون من 6 أرقام على الأقل.";
      return undefined;
    },
  }),

  email: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "الرجاء إدخال البريد الإلكتروني";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return " الرجاء إدخال بريد إلكتروني صالح";
      return undefined;
    },
  }),

  phone: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "الرجاء إدخال رقم الجوال";
      const cleanValue = value.replace(/\s+/g, "");
      const saudiRegex = /^05\d{8}$/;
      const intlRegex = /^\+9665\d{8}$/;

      if (!saudiRegex.test(cleanValue) && !intlRegex.test(cleanValue)) {
        return "الرجاء إدخال رقم جوال صالح بصيغة 05XXXXXXXX أو +9665XXXXXXXX.";
      }
      return "";
    },
  }),

  capacity: (fieldName: string, maxCapacity: number) => ({
    onChange: ({ value }: { value: string | number }) => {
      if (value === undefined || value === null || value === "")
        return `الرجاء إدخال ${fieldName}`;

      const numericValue = Number(value);
      if (isNaN(numericValue)) return `${fieldName} يجب أن يكون رقماً`;
      if (numericValue > maxCapacity)
        return `${fieldName} يجب ألا يزيد عن ${maxCapacity} طالب`;
      if (numericValue <= 0) return `${fieldName} يجب أن يكون أكبر من صفر`;

      return undefined;
    },
  }),

  number: () => ({
    onChange: ({ value }: { value: string }) => {
      if (isNaN(Number(value))) return "يجب أن يكون رقماً";
      if (Number(value) < 0) return "يجب أن يكون رقماً موجباً";
      return undefined;
    },
  }),

  message: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "رسالتك مطلوبة";
      if (value.length < 10) return "رسالتك تجب أن تكون على الأقل 10 حروف";
      return undefined;
    },
  }),

  file: () => ({
    onChange: ({ value }: { value: File | null }) => {
      if (!value) return " الرجاء إرفاق الملف";
      return undefined;
    },
  }),

  availableDate: (message: string, availableDays?: string[]) => {
    return (value: string) => {
      if (!value || !availableDays || availableDays.length === 0)
        return undefined;

      const selectedDate = new Date(value);
      // Get the day index (0 = Sunday, 1 = Monday, etc.)
      const dayIndex = selectedDate.getDay();

      // Map day index to day name
      const dayNames = [
        "sunday", // 0
        "monday", // 1
        "tuesday", // 2
        "wednesday", // 3
        "thursday", // 4
        "friday", // 5
        "saturday", // 6
      ];

      const dayName = dayNames[dayIndex];

      if (!availableDays.includes(dayName)) {
        const dayMap = {
          sunday: "الأحد",
          monday: "الاثنين",
          tuesday: "الثلاثاء",
          wednesday: "الأربعاء",
          thursday: "الخميس",
          friday: "الجمعة",
          saturday: "السبت",
        };

        const availableDaysArabic = availableDays
          .map((day) => dayMap[day as keyof typeof dayMap])
          .join("، ");

        return `الوجهة متاحة فقط في الأيام التالية: ${availableDaysArabic}`;
      }

      return undefined;
    };
  },

  availableTime: (
    message: string,
    availabilityHours?: { morning?: string; afternoon?: string }
  ) => {
    return (value: string) => {
      if (!value || !availabilityHours) return undefined;

      const [hours, minutes] = value.split(":").map(Number);
      const selectedMinutes = hours * 60 + minutes;

      let isValid = false;
      const availableHours: string[] = [];

      // Helper function to format time to 12-hour format
      const formatTimeRange = (timeRange: string) => {
        const [start, end] = timeRange.split("-");

        return `${formatTime(start)}-${formatTime(end)}`;
      };

      // Check morning availability
      if (availabilityHours.morning) {
        const [morningStart, morningEnd] = availabilityHours.morning.split("-");
        const [startH, startM] = morningStart.split(":").map(Number);
        const [endH, endM] = morningEnd.split(":").map(Number);

        const morningStartMinutes = startH * 60 + startM;
        const morningEndMinutes = endH * 60 + endM;

        if (
          selectedMinutes >= morningStartMinutes &&
          selectedMinutes <= morningEndMinutes
        ) {
          isValid = true;
        }

        availableHours.push(
          `${formatTimeRange(availabilityHours.morning)} صباحاً`
        );
      }

      // Check afternoon availability
      if (availabilityHours.afternoon && !isValid) {
        const [afternoonStart, afternoonEnd] =
          availabilityHours.afternoon.split("-");
        const [startH, startM] = afternoonStart.split(":").map(Number);
        const [endH, endM] = afternoonEnd.split(":").map(Number);

        const afternoonStartMinutes = startH * 60 + startM;
        const afternoonEndMinutes = endH * 60 + endM;

        if (
          selectedMinutes >= afternoonStartMinutes &&
          selectedMinutes <= afternoonEndMinutes
        ) {
          isValid = true;
        }

        availableHours.push(
          `${formatTimeRange(availabilityHours.afternoon)} مساءً`
        );
      }

      if (!isValid) {
        return `الوجهة متاحة في الأوقات التالية: ${availableHours.join(
          " أو "
        )}`;
      }

      return undefined;
    };
  },
};
