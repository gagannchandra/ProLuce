"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SpecScheduleProvider } from "@/context/SpecScheduleContext";
import SpecScheduleDrawer from "@/components/schedule/SpecScheduleDrawer";
import QuoteModal from "@/components/product/QuoteModal";
import MobileNavigationDock from "@/components/mobile/MobileNavigationDock";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [scheduleQuoteOpen, setScheduleQuoteOpen] = useState(false);

  return (
    <ThemeProvider>
      <SpecScheduleProvider>
        {children}
        <MobileNavigationDock />
        <SpecScheduleDrawer onRequestQuote={() => setScheduleQuoteOpen(true)} />
        <QuoteModal
          isOpen={scheduleQuoteOpen}
          onClose={() => setScheduleQuoteOpen(false)}
          isScheduleMode={true}
        />
      </SpecScheduleProvider>
    </ThemeProvider>
  );
}
