import { ScreenBackground } from "@/components/Background/ScreenBackground";
import React from "react";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function Dashboard() {


  const { language } = useLanguageStore();

  return (
    <ScreenBackground
      title={language!.Dashboard.Title}
    >
      <>
      </>
    </ScreenBackground>
  );
}
