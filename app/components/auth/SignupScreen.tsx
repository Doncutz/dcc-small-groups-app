"use client";

import { useApp } from "@/lib/state";
import { AUTH_COPY } from "@/lib/authCopy";
import { colors } from "@/lib/tokens";
import { AuthShell } from "./AuthShell";
import { TextInput, Button } from "@/components/ui";

const STEP_LABELS = ["Confirm invitation", "Set a password", "Check your details"];

export function SignupScreen() {
  const { state, set, suNext, suBack, goLogin } = useApp();
  const a = AUTH_COPY[state.role];
  const su = state.su;
  const pwdOk = state.pwd.length >= 8 && state.pwd === state.pwd2;
  const nextLabel = ["Verify invitation", "Save password", "Activate account", `Go to ${a.home}`][su];

  return (
    <AuthShell
      subtitle="Account activation"
      roleLabel={a.role}
      headline={a.suHeadline}
      blurb={a.suBlurb}
      bottomLeft={
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STEP_LABELS.map((label, i) => {
            const done = su > i;
            const on = su === i;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-plex-mono), monospace",
                    background: on ? colors.red : done ? colors.green : "#23282F",
                    color: su >= i ? "#fff" : "#6C7683",
                  }}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: on ? "#fff" : done ? "#9AA3AE" : "#6C7683" }}>{label}</span>
              </div>
            );
          })}
        </div>
      }
      rightPane={
        <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
          {su === 0 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 7 }}>Confirm your invitation</div>
              <div style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.55, marginBottom: 26 }}>{a.suVerifySub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>Work email</span>
                  <TextInput value={state.suEmail} onChange={(v) => set({ suEmail: v })} placeholder="name@daystarng.org" />
                </label>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>Invitation code</span>
                  <TextInput
                    value={state.suCode}
                    onChange={(v) => set({ suCode: v })}
                    placeholder="6 characters"
                    mono
                    style={{ letterSpacing: "0.22em", fontSize: 15 }}
                  />
                </label>
              </div>
              <div style={{ marginTop: 18, padding: "14px 16px", background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 12, fontSize: 12, color: colors.muted, lineHeight: 1.55 }}>
                {a.suCodeNote}
              </div>
            </div>
          )}

          {su === 1 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 7 }}>Set a password</div>
              <div style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.55, marginBottom: 26 }}>
                At least 8 characters. You will use this and your email to sign in from now on.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>New password</span>
                  <TextInput value={state.pwd} onChange={(v) => set({ pwd: v })} type="password" placeholder="••••••••" />
                </label>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: colors.muted, marginBottom: 7 }}>Repeat password</span>
                  <TextInput value={state.pwd2} onChange={(v) => set({ pwd2: v })} type="password" placeholder="••••••••" />
                </label>
              </div>
              <div style={{ marginTop: 16, fontSize: 12, lineHeight: 1.55, color: pwdOk ? colors.green : colors.faint }}>
                {pwdOk ? "Passwords match." : state.pwd.length < 8 ? "Use at least 8 characters." : "The two passwords do not match yet."}
              </div>
              <div style={{ marginTop: 20, padding: "14px 16px", background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 12, fontSize: 12, color: colors.muted, lineHeight: 1.55 }}>
                Your phone number is also on file for WhatsApp alerts. You can turn those off later in settings.
              </div>
            </div>
          )}

          {su === 2 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 7 }}>Check your details</div>
              <div style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.55, marginBottom: 24 }}>
                This is what your Super Admin recorded. Tell them if anything is wrong before you continue.
              </div>
              <div style={{ border: `1px solid ${colors.border}`, borderRadius: 14, overflow: "hidden" }}>
                {a.suFields.map((d, i) => (
                  <div
                    key={d.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "13px 16px",
                      borderBottom: i < a.suFields.length - 1 ? `1px solid ${colors.hairline2}` : "none",
                    }}
                  >
                    <span style={{ fontSize: 12.5, color: colors.faint, flexShrink: 0 }}>{d.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, textAlign: "right", minWidth: 0 }}>{d.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                {a.suPerms.map((p) => (
                  <div key={p.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: colors.muted, lineHeight: 1.5 }}>
                    <span style={{ color: colors.green, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {su === 3 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, background: colors.greenSoft, color: colors.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>✓</div>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em", marginBottom: 9 }}>Account activated</div>
              <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.6 }}>{a.suDoneText}</div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            {su > 0 && su < 3 && (
              <Button variant="secondary" onClick={suBack} padding="14px 20px">
                Back
              </Button>
            )}
            <Button variant="primary" onClick={suNext} style={{ flex: 1 }} padding="15px" fontSize={14.5}>
              {nextLabel}
            </Button>
          </div>

          <div style={{ marginTop: 22, fontSize: 12, color: colors.faint2, lineHeight: 1.55, textAlign: "center" }}>
            Already activated?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); goLogin(); }} style={{ fontWeight: 600 }}>
              Sign in instead
            </a>
          </div>
        </div>
      }
    />
  );
}
