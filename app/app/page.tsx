"use client";

import { AppProvider, useApp } from "@/lib/state";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { SignupScreen } from "@/components/auth/SignupScreen";
import { AppShell } from "@/components/shell/AppShell";

function Root() {
  const { state } = useApp();
  if (state.screen === "login") return <LoginScreen />;
  if (state.screen === "signup") return <SignupScreen />;
  return <AppShell />;
}

export default function Home() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
