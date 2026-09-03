"use client";

import { useApp } from "@/lib/state";
import { AUTH_COPY } from "@/lib/authCopy";
import { colors, mono } from "@/lib/tokens";
import { AuthShell } from "./AuthShell";
import { TextInput, Button } from "@/components/ui";

export function LoginScreen() {
  const { state, set, setRole, doLogin, goSignup } = useApp();
  const a = AUTH_COPY[state.role];

  return (
    <AuthShell
      subtitle="Alimosho Region"
      roleLabel={a.role}
      headline={a.headline}
      blurb={a.blurb}
      bottomLeft={
        <div style={{ display: "flex", gap: 34, flexWrap: "wrap" }}>
          {a.stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", fontFamily: mono }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#6C7683", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      }
      rightPane={
        <div style={{ width: "100%", maxWidth: 372, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
            {(["leader", "coord"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  border: `1px solid ${state.role === r ? colors.ink : colors.borderStrong}`,
                  background: state.role === r ? colors.ink : "#fff",
                  color: state.role === r ? "#fff" : colors.muted,
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: "6px 11px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                {r === "leader" ? "Demo: Cell Leader" : "Demo: Coordinator"}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 7 }}>Sign in</div>
          <div style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.55, marginBottom: 28 }}>{a.formSub}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>Email address</span>
              <TextInput value={state.loginEmail} onChange={(v) => set({ loginEmail: v })} placeholder="name@email.com" />
            </label>
            <label style={{ display: "block" }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>
                <span>Password</span>
                <a href="#" style={{ fontSize: 11.5, fontWeight: 500 }} onClick={(e) => e.preventDefault()}>Forgot?</a>
              </span>
              <TextInput value={state.loginPwd} onChange={(v) => set({ loginPwd: v })} type="password" placeholder="••••••••" />
            </label>
          </div>

          <Button variant="primary" fullWidth onClick={doLogin} style={{ marginTop: 24, padding: 15, fontSize: 14.5 }}>
            Sign in
          </Button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#EDEFF3" }} />
            <span style={{ fontSize: 11, color: colors.faint2, letterSpacing: "0.04em", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#EDEFF3" }} />
          </div>

          <Button variant="secondary" fullWidth onClick={doLogin} style={{ padding: 14, fontSize: 14 }}>
            {a.altLabel}
          </Button>

          <div style={{ marginTop: 26, padding: "14px 16px", background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 12, fontSize: 12, color: colors.muted, lineHeight: 1.55 }}>
            {a.note}
          </div>
          <div style={{ marginTop: 22, fontSize: 12, color: colors.faint2, lineHeight: 1.55, textAlign: "center" }}>
            First time here?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); goSignup(); }} style={{ fontWeight: 600 }}>
              Activate your account
            </a>
          </div>
        </div>
      }
    />
  );
}
