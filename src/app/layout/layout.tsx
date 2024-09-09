import React, { useEffect } from "react";

import { Header } from "@/widgets/header";

const tele = (window as any).Telegram.WebApp;

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    tele.ready();
  }, []);
  return (
    <>
      <Header />

      {children}
    </>
  );
}
