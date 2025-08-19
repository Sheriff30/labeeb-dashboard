import Image from "next/image";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-2 h-screen py-12 px-11">
      <div>{children}</div>{" "}
      <div className="flex flex-col relative items-center justify-center">
        <Image
          src="/images/logo.svg"
          width={232}
          height={91}
          alt="logo"
          className="absolute top-0 left-0"
        />
        <Image
          src="/images/book.svg"
          width={554}
          height={496}
          alt="book image"
        />
      </div>
    </main>
  );
}
