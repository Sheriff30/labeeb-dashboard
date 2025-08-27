import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Currency } from "@/components";
import { RenderMixedFonts } from "@/components/ui/RenderMixedFonts";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { destination } from "@/types";

type Props = {
  destination: destination;
};
export function Destination({ destination }: Props) {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-[31.6rem_1fr]">
      <div className="flex flex-col gap-2">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          loop={true}
          className="destination-swiper rounded-xl mb-2 w-full"
        >
          {destination?.images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative h-102.5">
                <Image
                  src={image}
                  alt="destination"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>{" "}
        <div className="grid gap-3 grid-cols-3">
          {destination?.images?.map((image: string, index: number) => (
            <div
              className="relative h-32.5 rounded-sm overflow-hidden"
              key={index}
            >
              <Image
                src={image}
                alt="destination"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        {/* Group 1 */}
        <div className="flex gap-3 text-2xl text-primary-blue mb-4">
          <div className="flex items-center gap-1">
            <Image
              src="/images/destination-type.svg"
              alt={destination.type}
              width={32}
              height={32}
            />
            {destination.type}
          </div>{" "}
          <div className="flex items-center gap-1">
            <Image
              src="/images/location.svg"
              alt={destination.type}
              width={32}
              height={32}
            />
            <div>{destination.place}</div>
          </div>
        </div>
        {/* Group 2 */}
        <div className="flex justify-between gap-2 text-3xl mb-2 flex-w flex-wrap">
          <div className="font-arabic-bold">{destination.name}</div>
          <div className="flex  items-center">
            <div className="text-xl text-gray font-arabic-light">تبدأ من</div>
            <div className="flex gap-1 font-arabic-bold text-primary">
              {destination.pricePerStudent}

              <Currency />
            </div>
            <div className="font-arabic-bold text-primary">/طالب</div>
          </div>
        </div>
        {/* Group 3 */}
        <div className="text-xl text-gray mb-4">{destination.description}</div>
        {/* Group 4 */}
        <div className="flex justify-between gap-5 text-2xl mb-11 flex-wrap">
          {/* القدرة الإستيعابية */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-primary">القدرة الإستيعابية</div>
            <div className="flex gap-2">
              <div className="font-roboto font-bold">
                {destination.capacity}
              </div>
              <div>طالب / ة</div>
            </div>
          </div>
          {/*الفئة*/}
          <div className="flex flex-col  gap-2">
            <div className="text-primary">الفئة</div>
            <div className="flex gap-2 items-center">
              <div>{destination.gender[0]}</div>
              {destination.gender[1] && <div>و</div>}
              <div>{destination.gender[1]}</div>
            </div>
          </div>
          {/* الأوقات الأيام المتاحة */}
          <div className="flex flex-col  gap-2">
            <div className="text-primary">الأوقات الأيام المتاحة</div>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              {destination.availableDays.map((day: string) => (
                <div key={day}>{day}</div>
              ))}
            </div>
          </div>
          <div>
            {" "}
            <div className="text-primary">الأوقات المتاحة</div>
            <div className="flex gap-1">
              {<RenderMixedFonts text={destination.availableTimes.start} />}
              <div className="font-arabic-light">حتي</div>
              {<RenderMixedFonts text={destination.availableTimes.end} />}
            </div>
          </div>
        </div>
        {/* Group 5 */}
        <div className="flex flex-col  gap-2 text-2xl">
          <div className="text-primary">طريقة الدفع</div>
          <div>{destination.paymentMethod}</div>
        </div>
      </div>
    </div>
  );
}

export default Destination;
