"use client";
import {
  Button,
  FloatLabelInput,
  FormField,
  OtpInput,
  Timer,
} from "@/components";

import { validators } from "@/lib/constants/validation";
import { cn } from "@/lib/utils";
import { useForm, useField } from "@tanstack/react-form";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginOtp from "@/hooks/useLoginOtp";
import { AxiosError } from "axios";
import useLogin from "@/hooks/useLogin";

type LoginMethod = "email" | "phone";

export default function Page() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const router = useRouter();
  const { mutate: loginOtp } = useLoginOtp();
  const { mutate: login } = useLogin();
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
  };

  const handleLoginMethodChange = (method: LoginMethod) => {
    setIsOtpSent(false);
    setIsTimerRunning(false);
    setLoginMethod(method);
    form.reset();
  };

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      email: "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      const { phoneNumber, otp } = value;

      if (loginMethod === "phone") {
        login(
          {
            mobile: phoneNumber,
            otp: otp,
          },
          {
            onSuccess: (data) => {
              if (data.data.user.role === "super_admin") {
                router.push("/admin");
              } else if (data.data.user.role === "school") {
                router.push("/school");
              }
            },

            onError: (error) => {
              if (error instanceof AxiosError) {
                setError(error.response?.data.message);
              }
            },
          }
        );
      }

      if (loginMethod === "email") {
        router.push("/school");
      }
    },
  });

  const emailField = useField({
    name: "email",
    form,
    validators: loginMethod === "email" ? validators.email() : undefined,
  });

  const phoneNumberField = useField({
    name: "phoneNumber",
    form,
    validators: loginMethod === "phone" ? validators.phone() : undefined,
  });

  const otpField = useField({
    name: "otp",
    form,
    validators: validators.otp(),
  });

  const handleSendOtp = () => {
    if (loginMethod === "phone") {
      loginOtp(
        { mobile: phoneNumberField.state.value },
        {
          onSuccess: (data) => {
            setDuration(data.data.expires_in);
            setIsOtpSent(true);
            setIsTimerRunning(true);
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              setError(error.response?.data.message);
            }
          },
        }
      );
    }
  };

  const otpDisabled =
    (loginMethod === "email" &&
      (!emailField.state.value || !!emailField.state.meta.errors?.length)) ||
    (loginMethod === "phone" &&
      (!phoneNumberField.state.value ||
        !!phoneNumberField.state.meta.errors?.length));

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2 ">
        <h1 className="text-6xl text-primary font-arabic-bold ">تسجيل دخول</h1>
        <p className="text-2xl text-gray">
          ادخل البريد الإلكتروني أو رقم الجوال لتسجيل الدخول إلى حسابك{" "}
        </p>
      </div>
      {/* Form */}
      <form
        className="flex flex-col gap-7  max-w-[573px]"
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.validateAllFields("submit");

          if (isValid) {
            form.handleSubmit();
          } else {
            console.log("Invalid");
          }
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="text-[32px] font-arabic-bold ">
            إختر طريقة تسجيل الدخول
          </div>

          <div className="flex gap-8">
            <Button
              variant="tertiary"
              text="البريد الإلكتروني"
              type="button"
              onClick={() => handleLoginMethodChange("email")}
              className={cn(loginMethod === "email" && "bg-navy !text-white")}
            />
            <Button
              variant="tertiary"
              text="رقم الجوال"
              type="button"
              onClick={() => handleLoginMethodChange("phone")}
              className={cn(loginMethod === "phone" && "bg-navy !text-white")}
            />
          </div>
        </div>

        {/* Email  */}
        {loginMethod === "email" && (
          <FormField field={emailField}>
            <FloatLabelInput
              format="ex@gmail.com"
              formatLang="en"
              label="البريد الإلكتروني"
              value={emailField.state.value}
              onChange={(e) => {
                setIsOtpSent(false);
                setIsTimerRunning(false);
                setError("");
                emailField.handleChange(e.target.value);
              }}
              type="email"
              maxLength={254}
            />
          </FormField>
        )}

        {loginMethod === "phone" && (
          <FormField field={phoneNumberField}>
            <FloatLabelInput
              value={phoneNumberField.state.value}
              label="رقم الجوال"
              type="tel"
              inputMode="numeric"
              pattern="[0-9+]{10,15}"
              minLength={10}
              maxLength={20}
              format="05XXXXXXXX"
              formatLang="en"
              onChange={(e) => {
                setIsOtpSent(false);
                setIsTimerRunning(false);
                setError("");
                const arabicNums = "٠١٢٣٤٥٦٧٨٩";
                const englishNums = "0123456789";
                let val = e.target.value.replace(/[٠-٩]/g, (d) => {
                  return englishNums[arabicNums.indexOf(d)];
                });
                val = val.replace(/[^0-9+]/g, "");
                phoneNumberField.handleChange(val);
              }}
            />
          </FormField>
        )}

        {/* OTP */}
        <Button
          type="button"
          variant="tertiary"
          text={isOtpSent ? "إرسال الرمز مرة أخرى" : "إرسال الرمز"}
          className="w-fit"
          onClick={handleSendOtp}
          disabled={otpDisabled || isTimerRunning}
        />

        <div
          className={cn(
            "text-2xl transition-all duration-300",
            !isOtpSent
              ? "opacity-0 pointer-events-none invisible"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <p className="text-2xl text-primary mb-[6px]">ادخل الكود المرسل لك</p>
          <p className="text-gray flex items-center flex-wrap gap-2 mb-[14px]">
            <span className="text-gray">لم تستلم الرمز ؟ </span>
            <span>إعادة إرسال الرمز </span>
            <Timer
              onComplete={handleTimerComplete}
              isActive={isTimerRunning}
              duration={duration}
            />
          </p>

          <FormField field={otpField}>
            <OtpInput onComplete={otpField.handleChange} />{" "}
          </FormField>
        </div>

        <Button type="submit" text="تسجيل دخول" variant="primary" />

        {error && (
          <ul
            className={cn(
              error.length > 0 ? "opacity-100 visible" : "opacity-0  invisible",
              "text-red-500 bg-red-500/10 px-2 py-4  text-md rounded-xl list-disc list-inside duration-200"
            )}
          >
            {error}
          </ul>
        )}

        <div className="text-2xl flex items-center gap-1 flex-wrap">
          <span> لا يوجد حساب للمدرسة؟ </span>{" "}
          <Link href="/signup" className="text-primary">
            {" "}
            انشاء حساب{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
