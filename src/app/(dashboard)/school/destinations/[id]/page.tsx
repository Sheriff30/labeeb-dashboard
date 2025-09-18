"use client";
import { useParams, useRouter } from "next/navigation";
import { Destination } from "@/views/Destination";
import { useField, useForm } from "@tanstack/react-form";
import { validators } from "@/lib/constants/validation";
import { useModal } from "@/Context";
import { useState } from "react";
import { useDestinationById } from "@/hooks/Destinations";
import Summary from "../Summary";
import TripForm from "../TripForm";
import { useCreateTrip } from "@/hooks/Trips";
import useProfile from "@/hooks/useProfile";
import { AxiosError } from "axios";

const FEES = 120;

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";
  const { data: destination, isLoading } = useDestinationById(id);
  const { openModal, closeModal } = useModal();
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const { mutate, isPending } = useCreateTrip();
  const { data: profile } = useProfile();
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      numberOfStudents: "",
      tripDate: "",
      tripTime: "",
      file: "",
      package: "",
    },

    onSubmit: ({ value }) => {
      if (
        value.numberOfStudents &&
        value.tripDate &&
        value.tripTime &&
        value.file &&
        value.package
      ) {
        const payload = {
          destination_id: destination?.data?.id,
          destination_package_id: Number(value.package),
          trip_date: value.tripDate,
          trip_time: value.tripTime,
          return_time: "",
          description: "",
          special_requirements: "",
          notes: "",
          total_students: Number(value.numberOfStudents),
          amount_per_student: Number(value.package),
          coordinator_name: profile?.data?.name || "",
          coordinator_phone: profile?.data?.mobile || "",
          coordinator_email: profile?.data?.email || "",
          emergency_contact_name: profile?.data?.name || "",
          emergency_contact_phone: profile?.data?.mobile || "",
          pickup_location: "School main entrance",
          pickup_time: value.tripTime,
          transport_provider: "",
          transport_type: "",
          transport_details: "",
        };

        mutate(payload, {
          onSuccess: () => {
            router.push("/school");
            openModal("CONFIRM", {
              title: "تم  حجز  الرحلة بنجاح",
              titleColor: "text-primary-green",
              buttonText: "شكراً",
              message:
                "تم إحجز فى انتظار موافقة الوجهة و سيصلكم إشعار بحالة الحجز عبر النظام و البريد الإلكتروني",
              onConfirm: () => {
                closeModal();
              },
            });
          },

          onError: (error) => {
            if (error instanceof AxiosError) {
              setError(error?.response?.data?.message);
            }
          },
        });
      }
    },
  });

  const numberOfStudents = useField({
    name: "numberOfStudents",
    form,
    validators: validators.capacity("عدد الطلاب", destination?.data?.capacity),
  });

  const tripDate = useField({
    name: "tripDate",
    form,
    validators: {
      onChange: ({ value }) =>
        validators.availableDate(
          "تاريخ غير متاح",
          destination?.data?.availability_days
        )(value),
    },
  });

  const tripTime = useField({
    name: "tripTime",
    form,
    validators: {
      onChange: ({ value }) =>
        validators.availableTime(
          "وقت غير متاح",
          destination?.data?.availability_hours
        )(value),
    },
  });

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }

  const handlePackageSelect = (selectedPackage: string) => {
    if (selectedPackage) {
      form.setFieldValue("package", selectedPackage);
      setShowRequestInfo(true);
    }
  };

  const handleFileSelect = (selectedFile: string) => {
    if (selectedFile) {
      form.setFieldValue("file", selectedFile);
      setTimeout(() => {
        openModal("PACKAGES", {
          packages: destination?.data?.active_packages || [],
          isLoading: isLoading,
          onPackageSelect: handlePackageSelect,
        });
      }, 0);
    }
  };

  async function HandleShowFilesModal() {
    await form.handleSubmit();
    if (!form.state.isValid) return;

    openModal("FILE_SELECTION", { onFileSelect: handleFileSelect });
  }

  const calculateTotal = () => {
    const numberOfStudents = parseInt(form.state.values.numberOfStudents) || 0;
    const packagePrice = form.state.values.package;

    return Number(packagePrice) * numberOfStudents + FEES;
  };

  return (
    <form
      className="h-full overflow-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {!showRequestInfo ? (
        <div className="flex flex-col gap-13">
          <Destination destination={destination.data} />
          <TripForm
            numberOfStudents={numberOfStudents}
            tripDate={tripDate}
            tripTime={tripTime}
            HandleShowFilesModal={HandleShowFilesModal}
          />
        </div>
      ) : (
        <Summary
          setShowRequestInfo={setShowRequestInfo}
          fees={FEES}
          form={form}
          name={destination?.data?.name}
          calculateTotal={calculateTotal}
          isPending={isPending}
          error={error}
          setError={setError}
        />
      )}
    </form>
  );
}
