"use client";

import Image from "next/image";
import { useApp, Screen } from "@/lib/state";
import { colors, mono } from "@/lib/tokens";
import { pendingCells, scopeRoot, titleFor } from "@/lib/tree";

interface NavItem {
  id: Screen | null;
  label: string;
  icon: string;
  badge: string;
}

export function Sidebar() {
  const { state, set } = useApp();

  const followBadge = state.people.filter((p) => p.status === "Not contacted").length;
  const apprBadge = pendingCells().length - state.apprDone.length;

  const navSets: Record<string, NavItem[]> = {
    leader: [
      { id: "leaderDash", label: "Dashboard", icon: "▦", badge: "" },
      { id: "report", label: "Sunday report", icon: "▤", badge: state.submitted ? "" : "!" },
      { id: "follow", label: "Follow-ups", icon: "◎", badge: followBadge ? String(followBadge) : "" },
      { id: null, label: "Cell members", icon: "◇", badge: "" },
      { id: null, label: "Resources", icon: "↓", badge: "" },
    ],
    coord: [
      { id: "dash", label: "Compliance", icon: "▦", badge: "" },
      { id: "appr", label: "Approvals", icon: "✓", badge: apprBadge > 0 ? String(apprBadge) : "" },
      { id: "cells", label: "Cells", icon: "◇", badge: "" },
      { id: "cfollow", label: "Follow-ups", icon: "◎", badge: "23" },
      { id: "exports", label: "Exports", icon: "↓", badge: "" },
    ],
  };

  const items = navSets[state.role] || [];

  const scopeLeader = scopeRoot(state.scope).leader;
  const userInitials = state.role === "leader" ? "BS" : scopeLeader.split(" ").map((x) => x[0]).join("");
  const userName = state.role === "leader" ? "Boluwatife Sodipo" : scopeLeader;
  const userRole = state.role === "leader" ? "Cell Leader · Grace Cell" : titleFor(state.scope);

  return (
    <div style={{ width: 248, flexShrink: 0, background: "#fff", borderRight: `1px solid ${colors.border}`, padding: "20px 14px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 6px 20px", borderBottom: `1px solid ${colors.hairline}`, marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff", border: `1px solid ${colors.border}`, overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <Image src="/assets/daystar-logo.jpeg" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Small Groups</div>
          <div style={{ fontSize: 10, color: colors.faint2, letterSpacing: "0.04em", textTransform: "uppercase" }}>Daystar</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((n) => {
          const on = !!n.id && state.screen === n.id;
          return (
            <div
              key={n.label}
              onClick={() => n.id && set({ screen: n.id })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 9,
                cursor: n.id ? "pointer" : "default",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                background: on ? colors.redSoft : "transparent",
                color: on ? colors.red : colors.muted,
              }}
            >
              <span style={{ fontSize: 14, width: 16, textAlign: "center" }}>{n.icon}</span>
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.badge && (
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: colors.redSoft, color: colors.red, fontFamily: mono }}>
                  {n.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 20, borderTop: `1px solid ${colors.hairline}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: colors.chipGrey, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: colors.muted, flexShrink: 0 }}>
          {userInitials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</div>
          <div style={{ fontSize: 10.5, color: colors.faint2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userRole}</div>
        </div>
      </div>
    </div>
  );
}
