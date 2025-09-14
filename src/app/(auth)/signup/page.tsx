"use client";

import { useState } from "react";
import { OtpForm, RegisterForm } from "./components";
import Link from "next/link";

export default function Page() {
  const [optForm, setOtpForm] = useState(false);
  const [otpDuration, setOtpDuration] = useState<number>(100);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleOtpFormShow = () => {
    setOtpForm(true);
    setIsTimerActive(true);
    setCanResendOtp(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2 ">
        <h1 className="text-6xl text-primary font-arabic-bold ">إنشاء حساب</h1>
        <p className="text-2xl text-gray">
          يرجى تعبئة البيانات لإنشاء حسابكم في المنصة
        </p>
      </div>
      {/* registerForm */}
      {!optForm && (
        <RegisterForm
          handleOtpFormShow={handleOtpFormShow}
          setOtpDuration={setOtpDuration}
          setPhoneNumber={setPhoneNumber}
        />
      )}
      {/* OTP FORM */}
      {optForm && (
        <OtpForm
          otpDuration={otpDuration}
          isTimerActive={isTimerActive}
          canResendOtp={canResendOtp}
          phoneNumber={phoneNumber}
          setOtpDuration={setOtpDuration}
          setIsTimerActive={setIsTimerActive}
          setCanResendOtp={setCanResendOtp}
        />
      )}
      <div className="text-2xl flex items-center gap-1 flex-wrap">
        <span>هل يوجد لديك حساب للمدرسة ؟</span>
        <Link href="/login" className="text-primary">
          {" "}
          سجل دخول
        </Link>
      </div>
    </div>
  );
}
