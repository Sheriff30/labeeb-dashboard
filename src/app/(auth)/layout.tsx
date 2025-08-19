import Image from "next/image";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-2 min-h-screen py-12 px-11">
      <div>{children}</div>{" "}
      <div className="flex flex-col  items-end justify-between">
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
