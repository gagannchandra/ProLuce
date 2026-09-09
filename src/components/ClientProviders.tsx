"use client";

import { useState } from "react";
import { SpecScheduleProvider } from "@/context/SpecScheduleContext";
import SpecScheduleDrawer from "@/components/schedule/SpecScheduleDrawer";
import QuoteModal from "@/components/product/QuoteModal";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [scheduleQuoteOpen, setScheduleQuoteOpen] = useState(false);

  return (
    <SpecScheduleProvider>
      {children}
      <SpecScheduleDrawer onRequestQuote={() => setScheduleQuoteOpen(true)} />
      <QuoteModal
        isOpen={scheduleQuoteOpen}
        onClose={() => setScheduleQuoteOpen(false)}
        isScheduleMode={true}
      />
    </SpecScheduleProvider>
  );
}
