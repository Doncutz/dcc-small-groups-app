"use client";

import { useApp } from "@/lib/state";
import { Sidebar } from "./Sidebar";
import { LeaderDashboard } from "@/components/leader/LeaderDashboard";
import { ReportWizard } from "@/components/leader/ReportWizard";
import { FollowUps } from "@/components/leader/FollowUps";
import { ComplianceDashboard } from "@/components/coord/ComplianceDashboard";
import { Approvals } from "@/components/coord/Approvals";
import { Cells } from "@/components/coord/Cells";
import { CoordFollowUps } from "@/components/coord/CoordFollowUps";
import { Exports } from "@/components/coord/Exports";

export function AppShell() {
  const { state } = useApp();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F8FA" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        {state.screen === "leaderDash" && <LeaderDashboard />}
        {state.screen === "report" && <ReportWizard />}
        {state.screen === "follow" && <FollowUps />}
        {state.screen === "dash" && <ComplianceDashboard />}
        {state.screen === "appr" && <Approvals />}
        {state.screen === "cells" && <Cells />}
        {state.screen === "cfollow" && <CoordFollowUps />}
        {state.screen === "exports" && <Exports />}
      </div>
    </div>
  );
}
