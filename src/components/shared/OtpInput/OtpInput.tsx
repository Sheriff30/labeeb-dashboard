"use client";
import { useState, useRef } from "react";

type OtpInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
};

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // normalize any input to English digits only
  const normalizeDigit = (value: string) => {
    // Convert Arabic/Indian numerals → English
    const arabicToEnglishMap: Record<string, string> = {
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    };
    return arabicToEnglishMap[value] ?? value;
  };

  const handleChange = (value: string, index: number) => {
    const normalized = normalizeDigit(value);

    if (/^[0-9]?$/.test(normalized)) {
      const newOtp = [...otp];
      newOtp[index] = normalized;
      setOtp(newOtp);

      // If digit entered -> move to next
      if (normalized && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);

        onComplete?.(newOtp.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-4 w-fit" dir="ltr">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          placeholder=" "
          className="border-[1.5px] font-roboto border-primary  rounded-lg text-center text-primary text-[32px] w-[62px] h-[69px] px-[22px] focus:outline-none placeholder:border-b-primary placeholder:border-b-[1.5px]"
        />
      ))}
    </div>
  );
}
