export const validators = {
  required: (fieldName: string) => ({
    onChange: ({ value }: { value: string }) =>
      !value ? `الرجاء إدخال ${fieldName}` : undefined,
  }),

  requiredArray: (fieldName: string) => ({
    onChange: ({ value }: { value: string[] }) =>
      !value || value.length === 0 ? `الرجاء إدخال ${fieldName}` : undefined,
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
};
