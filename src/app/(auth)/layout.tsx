import Image from "next/image";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid  min-[68.75rem]:grid-cols-2 min-h-screen py-10 md:py-12 px-4 md:px-11 gap-4 min-[68.75rem]:gap-10  relative">
      <Image
        src="/images/book.svg"
        width={554}
        height={496}
        alt="book image"
        className="mx-auto block min-[68.75rem]:hidden absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-20 p-10 -z-1"
      />
      <Image
        src="/images/logo.svg"
        width={189}
        height={73}
        alt="logo"
        className="mr-auto block min-[68.75rem]:hidden"
      />
      <div>{children}</div>{" "}
      <div className=" flex-col hidden min-[68.75rem]:flex  items-end justify-between">
        <Image src="/images/logo.svg" width={232} height={91} alt="logo" />
        <Image
          src="/images/book.svg"
          width={554}
          height={496}
          alt="book image"
          className="mx-auto"
        />
        <div className="h-[5.69rem]"></div>
      </div>
    </main>
  );
}
