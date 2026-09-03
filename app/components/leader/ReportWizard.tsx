"use client";

import { useApp } from "@/lib/state";
import { colors, mono } from "@/lib/tokens";
import { Button, Card, TextArea } from "@/components/ui";
import { REPORT_STEPS } from "@/lib/reportSteps";

export function ReportWizard() {
  const { state, set, bump, toggleField, goHome } = useApp();

  if (state.reportDone) {
    return (
      <div style={{ padding: "80px 28px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: colors.greenSoft, color: colors.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>✓</div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em", marginBottom: 9 }}>Report submitted</div>
          <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.6, marginBottom: 24 }}>
            Grace Cell · 23 August 2026. Sent to Tunde Bakare for approval. You will be notified when it is approved.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={goHome}>Back to dashboard</Button>
            <Button variant="secondary" onClick={() => set({ reportDone: false, step: 0, vals: {}, comments: "", submitted: false })}>Edit report</Button>
          </div>
        </div>
      </div>
    );
  }

  const steps = REPORT_STEPS;
  const step = steps[Math.min(state.step, steps.length - 1)];
  const numeric = step.fields.filter((f) => f.id && !f.kind);
  const lastStep = state.step >= steps.length - 1;

  const stepNext = () => {
    if (lastStep) set({ reportDone: true, submitted: true });
    else set({ step: state.step + 1 });
  };
  const stepBack = () => {
    if (state.step === 0) goHome();
    else set({ step: state.step - 1 });
  };

  const filled = Object.keys(state.vals).filter((k) => state.vals[k]).length;
  const summary = Object.keys(state.vals)
    .filter((k) => typeof state.vals[k] === "number" && (state.vals[k] as number) > 0)
    .slice(0, 6)
    .map((k) => {
      let label = k;
      steps.forEach((s) => s.fields.forEach((f) => { if (f.id === k && f.label) label = f.label; }));
      return { label, value: state.vals[k] as number };
    });

  return (
    <div>
      <div style={{ background: "#fff", borderBottom: `1px solid ${colors.border}`, padding: "22px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11.5, color: colors.faint, marginBottom: 6 }}>Grace Cell · CL-0142</div>
            <div style={{ fontSize: 25, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.15 }}>Sunday report · 23 August 2026</div>
          </div>
          <div style={{ display: "flex", gap: 9, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
            <div style={{ display: "flex", border: `1px solid ${colors.borderStrong}`, borderRadius: 10, overflow: "hidden" }}>
              {(["A", "B"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => set({ variant: v, step: 0 })}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                    fontSize: 11.5,
                    fontWeight: 600,
                    background: state.variant === v ? colors.red : "#fff",
                    color: state.variant === v ? "#fff" : colors.faint,
                  }}
                >
                  {v === "A" ? "Stepper" : "Tap grid"}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: colors.faint }}>Autosaved just now</span>
            <Button variant="secondary" padding="9px 13px" fontSize={12.5} onClick={goHome}>Save and exit</Button>
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 28px 40px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        <Card style={{ flex: "1 1 190px", maxWidth: 230, padding: 14, display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: colors.faint2, padding: "5px 10px 9px" }}>Categories</div>
          {steps.map((s, i) => {
            const on = i === state.step;
            const done = i < state.step;
            return (
              <div
                key={s.id}
                onClick={() => set({ step: i })}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, cursor: "pointer", background: on ? colors.redSoft : "transparent", color: on ? colors.red : done ? colors.ink : colors.muted }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    fontSize: 10.5,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: mono,
                    background: on ? colors.red : done ? colors.green : "#EDEFF3",
                    color: on || done ? "#fff" : colors.faint,
                  }}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", flex: 1 }}>{s.label}</span>
              </div>
            );
          })}
        </Card>

        <Card style={{ flex: "3 1 380px", minWidth: 0, padding: "24px 26px 26px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em" }}>{step.label}</div>
            <div style={{ fontSize: 11.5, color: colors.faint2, fontFamily: mono }}>Step {state.step + 1}/5</div>
          </div>
          <div style={{ fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 1.5 }}>{step.hint}</div>
          <div style={{ height: 3, background: "#EDEFF3", borderRadius: 2, overflow: "hidden", margin: "16px 0 22px" }}>
            <div style={{ height: "100%", background: colors.red, borderRadius: 2, width: `${Math.round(((state.step + 1) / 5) * 100)}%` }} />
          </div>

          {state.variant === "A" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {step.fields.map((f, i) => {
                if (f.g) return <div key={i} style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: colors.faint2, padding: "20px 0 8px" }}>{f.g}</div>;
                if (f.kind === "toggle") {
                  const on = !!state.vals[f.id!];
                  return (
                    <div
                      key={f.id}
                      onClick={() => toggleField(f.id!)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 18, padding: "14px 16px", borderRadius: 12, border: `1px solid ${on ? colors.redSoftBorder : colors.border}`, cursor: "pointer", background: on ? colors.redSoft : colors.fieldBg }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", color: on ? "#8C1720" : colors.ink }}>{f.label}</span>
                      <div style={{ width: 40, height: 22, borderRadius: 11, padding: 2, flexShrink: 0, background: on ? colors.red : "#D8DDE4" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 9, background: "#fff", transition: "transform .16s", transform: on ? "translateX(18px)" : "translateX(0)" }} />
                      </div>
                    </div>
                  );
                }
                if (f.kind === "text") {
                  return (
                    <div key={f.id} style={{ marginTop: 4 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 9 }}>
                        {f.label} <span style={{ fontWeight: 400, color: colors.faint2 }}>— optional</span>
                      </div>
                      <TextArea value={state.comments} onChange={(v) => set({ comments: v })} placeholder="Anything your Section Leader should know about this week." />
                    </div>
                  );
                }
                const val = Number(state.vals[f.id!]) || 0;
                return (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "11px 0", borderBottom: `1px solid ${colors.hairline2}` }}>
                    <span style={{ fontSize: 14, letterSpacing: "-0.01em" }}>{f.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <button onClick={() => bump(f.id!, -1)} style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${colors.borderStrong}`, background: "#fff", cursor: "pointer", fontSize: 17, color: colors.muted, lineHeight: 1 }}>−</button>
                      <span style={{ minWidth: 34, textAlign: "center", fontSize: 17, fontWeight: 600, fontFamily: mono, color: val > 0 ? colors.ink : colors.neutral }}>{val}</span>
                      <button onClick={() => bump(f.id!, 1)} style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${colors.borderStrong}`, background: "#fff", cursor: "pointer", fontSize: 17, color: colors.ink, lineHeight: 1 }}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {state.variant === "B" && (
            <div>
              <div style={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 13, padding: "13px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: colors.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>0</div>
                <div style={{ fontSize: 12.5, color: colors.muted, lineHeight: 1.45 }}>Everything starts at zero. Tap only what happened — click a tile to add one, use the minus to correct.</div>
              </div>
              {step.id !== "general" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
                  {numeric.map((f) => {
                    const val = Number(state.vals[f.id!]) || 0;
                    const touched = val > 0;
                    return (
                      <div
                        key={f.id}
                        onClick={() => bump(f.id!, 1)}
                        style={{ cursor: "pointer", border: `1.5px solid ${touched ? colors.red : colors.borderStrong}`, borderRadius: 14, padding: "15px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 104, background: touched ? colors.red : "#fff" }}
                      >
                        <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35, color: touched ? "#F6C9CD" : colors.muted }}>{f.label}</div>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, marginTop: 12 }}>
                          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: mono, color: touched ? "#fff" : colors.neutral }}>{val}</span>
                          {touched && (
                            <button
                              onClick={(e) => { e.stopPropagation(); bump(f.id!, -1); }}
                              style={{ border: "none", background: "rgba(255,255,255,.18)", color: "#fff", cursor: "pointer", width: 26, height: 26, borderRadius: 8, fontSize: 15, lineHeight: 1, flexShrink: 0 }}
                            >
                              −
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {step.id === "general" && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 9 }}>
                    Comments <span style={{ fontWeight: 400, color: colors.faint2 }}>— optional</span>
                  </div>
                  <TextArea value={state.comments} onChange={(v) => set({ comments: v })} placeholder="Anything your Section Leader should know about this week." />
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 26, paddingTop: 20, borderTop: `1px solid ${colors.hairline}` }}>
            <Button variant="secondary" onClick={stepBack} padding="13px 20px">Back</Button>
            <Button variant="primary" onClick={stepNext} style={{ flex: 1 }} padding="13px" fontSize={14}>
              {lastStep ? "Submit report" : "Next"}
            </Button>
          </div>
        </Card>

        <div style={{ flex: "1 1 250px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 3 }}>Running total</div>
            <div style={{ fontSize: 11.5, color: colors.faint, marginBottom: 14 }}>{filled} entered of 24 fields</div>
            {summary.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: `1px solid ${colors.hairline2}` }}>
                <span style={{ fontSize: 12.5, color: colors.muted, minWidth: 0 }}>{s.label}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, fontFamily: mono, flexShrink: 0 }}>{s.value}</span>
              </div>
            ))}
            {summary.length === 0 && (
              <div style={{ fontSize: 12.5, color: colors.faint2, lineHeight: 1.5 }}>Nothing entered yet. Values appear here as you fill the categories.</div>
            )}
          </Card>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 10 }}>After you submit</div>
            <div style={{ fontSize: 12.5, color: colors.muted, lineHeight: 1.6 }}>
              Tunde Bakare (Ijegun Section 1) reviews and approves. If nothing happens in 36 hours it escalates to the Area Coordinator. You can edit until it is approved.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
