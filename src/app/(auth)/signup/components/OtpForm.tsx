"use client";

import { useState } from "react";
import { Button, FormField, OtpInput, Timer } from "@/components";
import { cn } from "@/lib";
import { useForm } from "@tanstack/react-form";
import { validators } from "@/lib/constants/validation";
import useOTP from "@/hooks/useOTP";
import useVerifyOtp from "@/hooks/useVerifyOtp";
import { AxiosError } from "axios";
import { useModal } from "@/Context";
import { useRouter } from "next/navigation";

type OtpFormProps = {
  otpDuration: number;
  isTimerActive: boolean;
  canResendOtp: boolean;
  phoneNumber: string;
  setOtpDuration: (val: number) => void;
  setIsTimerActive: (val: boolean) => void;
  setCanResendOtp: (val: boolean) => void;
};

export default function OtpForm({
  otpDuration,
  isTimerActive,
  canResendOtp,
  phoneNumber,
  setOtpDuration,
  setIsTimerActive,
  setCanResendOtp,
}: OtpFormProps) {
  const { mutate: otpMutate } = useOTP();
  const { mutate: otpVerifyMutate, isPending } = useVerifyOtp();
  const [error, setError] = useState("");
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const otpForm = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      otpVerifyMutate(
        {
          mobile: phoneNumber,
          otp: value.otp,
        },
        {
          onSuccess() {
            openModal("CONFIRM", {
              title:
                "تم تقديم الطلب بنجاح وسيتم تفعيل حسابكم في مدة أقصاها 24 ساعة",
              buttonText: " شكراً",
              onConfirm: () => {
                router.push("/login");
                closeModal();
              },
            });
          },
          onError(error) {
            if (error instanceof AxiosError) {
              setError(error.response?.data.message);
            }
          },
        }
      );
    },
  });

  const handleTimerComplete = () => {
    setIsTimerActive(false);
    setCanResendOtp(true);
  };

  const handleResendOtp = () => {
    if (!canResendOtp) return;
    otpMutate(
      { mobile: phoneNumber },
      {
        onSuccess(data) {
          setOtpDuration(Number(data.data.expires_in));
          setIsTimerActive(true);
          setCanResendOtp(false);
        },
      }
    );
  };

  const clearErrors = () => {
    if (error.length > 0) {
      setError("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        otpForm.handleSubmit(e);
      }}
      action=""
      className="flex flex-col gap-7  max-w-[700px]"
    >
      <Button
        type="button"
        variant="tertiary"
        text="إرسال الرمز مرة أخرى"
        className="w-fit"
        disabled={!canResendOtp}
        onClick={handleResendOtp}
      />

      <div
        className={cn(
          "text-2xl transition-all duration-300",
          !true
            ? "opacity-0 pointer-events-none invisible"
            : "opacity-100 pointer-events-auto"
        )}
      >
        <p className="text-2xl text-primary mb-[6px]">ادخل الكود المرسل لك</p>
        <p className="text-gray flex items-center flex-wrap gap-2 mb-[14px]">
          <span className="text-gray">لم تستلم الرمز ؟ </span>
          <span>إعادة إرسال الرمز </span>
          <Timer
            duration={otpDuration}
            isActive={isTimerActive}
            onComplete={handleTimerComplete}
          />
        </p>
        <otpForm.Field name="otp" validators={validators.otp()}>
          {(field) => {
            return (
              <FormField field={field}>
                <OtpInput
                  onComplete={field.handleChange}
                  clearErrors={clearErrors}
                />{" "}
              </FormField>
            );
          }}
        </otpForm.Field>
      </div>

      <Button
        type="submit"
        text={isPending ? "جاري التحقق..." : "تسجيل الدخول"}
        variant="primary"
      />
      {error && (
        <ul className="text-red-500 bg-red-500/10 px-2 py-4  text-md rounded-xl list-disc list-inside duration-200">
          {" "}
          {error}
        </ul>
      )}
    </form>
  );
}
