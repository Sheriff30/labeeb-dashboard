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
import { useLogin, useRequestLoginOtp } from "@/hooks/auth";

type LoginMethod = "email" | "phone";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

export default function Page() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("phone");
  const {
    mutate: requestLoginOtp,
    error: otpError,
    isError: isOtpError,
  } = useRequestLoginOtp();

  const {
    mutate: login,
    error: loginError,
    isError: isLoginError,
    isPending: isLoginPending,
  } = useLogin();
  const [otpDuration, setOtpDuration] = useState(0);

  const router = useRouter();

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
  };

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      email: "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      const { phoneNumber, email, otp } = value;

      login(
        {
          identifier: loginMethod === "email" ? email : phoneNumber,
          otp,
        },
        {
          onSuccess: (data) => {
            localStorage.setItem("token", data.data.token);
            router.push("/school");
          },
        }
      );
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
    validators: {
      onSubmit: ({ value }) => {
        if (!value || value.length === 0) return "الرجاء إدخال رمز التحقق";
        if (value.length !== 6)
          return "الرجاء إدخال رمز التحقق المكون من 6 أرقام";
        if (!/^\d{6}$/.test(value)) return "الرجاء إدخال أرقام فقط";
        return undefined;
      },
      onChange: ({ value }) => {
        // Only validate if the field has a value
        if (!value || value.length === 0) return undefined;
        if (value.length !== 6)
          return "الرجاء إدخال رمز التحقق المكون من 6 أرقام";
        if (!/^\d{6}$/.test(value)) return "الرجاء إدخال أرقام فقط";
        return undefined;
      },
    },
  });

  const handleLoginMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    setIsOtpSent(false);
    setIsTimerRunning(false);
    form.reset();
    otpField.handleChange("");
  };
  const handleSendOtp = () => {
    requestLoginOtp(
      {
        identifier:
          loginMethod === "email"
            ? emailField.state.value
            : phoneNumberField.state.value,
        type: loginMethod,
      },
      {
        onSuccess: (data) => {
          setOtpDuration(data.data.expires_in_minutes);
          setIsOtpSent(true);
          setIsTimerRunning(true);
        },
      }
    );
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

      {/* Error Messages */}
      {isOtpError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>خطأ في إرسال الرمز: </strong>
          {(otpError as ApiError)?.response?.data?.message ||
            "حدث خطأ غير متوقع"}

          {(otpError as ApiError)?.response?.data?.errors && (
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(
                (otpError as ApiError).response!.data!.errors!
              ).map(([field, errors]) => (
                <li key={field}>
                  {Array.isArray(errors) ? errors.join(", ") : String(errors)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isLoginError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>خطأ في إرسال الرمز: </strong>
          {(loginError as ApiError)?.response?.data?.message ||
            "حدث خطأ غير متوقع"}

          {(loginError as ApiError)?.response?.data?.errors && (
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(
                (loginError as ApiError).response!.data!.errors!
              ).map(([field, errors]) => (
                <li key={field}>
                  {Array.isArray(errors) ? errors.join(", ") : String(errors)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
              onChange={(e) => emailField.handleChange(e.target.value)}
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
              duration={otpDuration * 60}
            />
          </p>

          <FormField field={otpField}>
            <OtpInput
              onComplete={otpField.handleChange}
              value={otpField.state.value}
              shouldReset={!isOtpSent} // Reset when OTP is not sent
            />{" "}
          </FormField>
        </div>

        <Button
          type="submit"
          text={isLoginPending ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          variant="primary"
          disabled={isLoginPending}
        />
        <div className="text-2xl flex items-center gap-1 flex-wrap">
          <span> لا يوجد حساب للمدرسة؟ </span>{" "}
          <Link href="/signup" className="text-primary">
            {" "}
            تسجيل دخول{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
