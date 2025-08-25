export const validators = {
  required: (fieldName: string) => ({
    onChange: ({ value }: { value: string }) =>
      !value ? `${fieldName} مطلوب` : undefined,
  }),

  requiredArray: (fieldName: string) => ({
    onChange: ({ value }: { value: string[] }) =>
      !value || value.length === 0 ? `${fieldName} مطلوب` : undefined,
  }),

  length: (fieldName: string, min: number, max: number) => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return `${fieldName} مطلوب`;
      if (value.length < min)
        return `${fieldName} يجب أن يكون على الأقل ${min} ${
          fieldName === "الكود" ? "ارقام" : "حرف "
        }`;
      if (value.length > max)
        return `${fieldName} يجب أن يكون على اقل ${max} ${
          fieldName === "الكود" ? "ارقام" : "حرف "
        }`;
      return undefined;
    },
  }),

  email: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "البريد الإلكتروني مطلوب";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return "البريد الإلكتروني غير صالح";
      return undefined;
    },
  }),

  phone: () => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "رقم الجوال مطلوب";
      const cleanValue = value.replace(/\s+/g, "");
      const saudiRegex = /^05\d{8}$/;
      const intlRegex = /^\+9665\d{8}$/;

      if (!saudiRegex.test(cleanValue) && !intlRegex.test(cleanValue)) {
        return "رقم الجوال غير صالح، اكتبه بصيغة 05XXXXXXXX أو +9665XXXXXXXX";
      }
      return "";
    },
  }),

  capacity: (fieldName: string, maxCapacity: number) => ({
    onChange: ({ value }: { value: string | number }) => {
      if (value === undefined || value === null || value === "")
        return `${fieldName} مطلوب`;

      const numericValue = Number(value);
      if (isNaN(numericValue)) return `${fieldName} يجب أن يكون رقماً`;
      if (numericValue > maxCapacity)
        return `${fieldName} يجب ألا يزيد عن ${maxCapacity} طالب`;
      if (numericValue <= 0) return `${fieldName} يجب أن يكون أكبر من صفر`;

      return undefined;
    },
  }),
};
