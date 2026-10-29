import { useMemo, useState } from 'react';
import { ANNOTATIONS, KIND_LABEL, LEVELS, METRICS, RATIONALE, REST_KINDS, WORLDS, type Level } from './data';

// SVG attributes take literal colours, so the site tokens are mirrored here
const INK = '#111111';
const INK2 = '#5F5E58';
const BG = '#F2F1EC';
const ACCENT = '#E4572E';
const FINALE = '#A04C3A';
const GRID = 'rgba(17,17,17,.1)';
const RULE = 'rgba(17,17,17,.22)';

const SMOOTHING = 0.18;
const W = 1180;
const H = 460;
const M = { t: 30, r: 16, b: 56, l: 48 };
const innerW = W - M.l - M.r;
const innerH = H - M.t - M.b;
const N = LEVELS.length;
const colW = innerW / N;
const xFor = (i: number) => M.l + (i + 0.5) * colW;
const yFor = (v: number) => M.t + innerH - (v / 100) * innerH;

/* Symmetric EMA so the lines read as a trend without shifting peaks sideways */
function smooth(values: number[], alpha: number) {
    const fwd: number[] = [];
    let prev = values[0];
    for (const v of values) { prev = prev * (1 - alpha) + v * alpha; fwd.push(prev); }
    const back: number[] = [];
    prev = fwd[fwd.length - 1];
    for (let i = fwd.length - 1; i >= 0; i--) { prev = prev * (1 - alpha) + fwd[i] * alpha; back.unshift(prev); }
    return back;
}

const linePath = (ys: number[]) => ys.map((y, i) => `${i ? 'L' : 'M'}${xFor(i).toFixed(1)},${y.toFixed(1)}`).join('');
const areaPath = (ys: number[]) => `M${xFor(0).toFixed(1)},${M.t + innerH}${ys.map((y, i) => `L${xFor(i).toFixed(1)},${y.toFixed(1)}`).join('')}L${xFor(N - 1).toFixed(1)},${M.t + innerH}Z`;
const pad = (n: number) => String(n).padStart(2, '0');
const isRest = (l: Level) => REST_KINDS.includes(l.kind);
const isPeak = (l: Level) => l.kind === 'finale' || l.kind === 'boss';
const worldOf = (l: Level) => WORLDS.find((w) => w.id === l.world) ?? WORLDS[0];

function Chart({ selected, onSelect }: { selected: number; onSelect: (lvl: number) => void }) {
    const series = useMemo(() => {
        const s: Record<string, number[]> = {};
        for (const m of METRICS) s[m.key] = smooth(LEVELS.map((l) => l[m.key]), SMOOTHING).map(yFor);
        s.overall = smooth(LEVELS.map((l) => l.overall), SMOOTHING).map(yFor);
        return s;
    }, []);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Difficulty index across the 50 Adventure levels" style={{ display: 'block', width: '100%', minWidth: 820, fontFamily: 'inherit' }}>
            {WORLDS.map((w, wi) => {
                const x0 = xFor(w.start - 1) - colW / 2;
                const x1 = xFor(w.end - 1) + colW / 2;
                return (
                    <g key={w.id}>
                        <rect x={x0} y={M.t} width={x1 - x0} height={innerH} fill={INK} opacity={wi % 2 ? 0.05 : 0.02} />
                        <text x={x0 + 8} y={M.t + 16} fontSize="10.5" fontWeight="700" fill={INK2} letterSpacing="0.08em">
                            {w.name.toUpperCase()} · {w.lane}
                        </text>
                    </g>
                );
            })}

            {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                    <line x1={M.l} x2={W - M.r} y1={yFor(v)} y2={yFor(v)} stroke={GRID} />
                    <text x={M.l - 8} y={yFor(v) + 3} fontSize="10" fill={INK2} textAnchor="end">{v}</text>
                </g>
            ))}
            <text x={M.l - 36} y={M.t + innerH / 2} fontSize="10" fill={INK2} textAnchor="middle" letterSpacing="0.08em" transform={`rotate(-90 ${M.l - 36} ${M.t + innerH / 2})`}>
                DIFFICULTY INDEX
            </text>

            {LEVELS.map((l, i) => isRest(l) && (
                <line key={l.lvl} x1={xFor(i)} x2={xFor(i)} y1={M.t} y2={M.t + innerH} stroke={INK2} strokeWidth="0.75" strokeDasharray="1 4" />
            ))}

            {METRICS.map((m) => (
                <path key={m.key} d={linePath(series[m.key])} fill="none" stroke={m.color} strokeWidth="1.25" opacity="0.6" />
            ))}
            <path d={areaPath(series.overall)} fill={INK} opacity="0.06" />
            <path d={linePath(series.overall)} fill="none" stroke={INK} strokeWidth="2.25" />

            {ANNOTATIONS.map((a, idx) => {
                const i = a.lvl - 1;
                const px = xFor(i);
                const py = yFor(LEVELS[i].overall);
                const above = idx % 2 === 0;
                const ty = above ? py - 28 : py + 36;
                return (
                    <g key={a.lvl} aria-hidden="true">
                        <line x1={px} x2={px} y1={py + (above ? -4 : 4)} y2={ty + (above ? 12 : -12)} stroke={INK2} strokeWidth="0.6" />
                        {a.text.map((line, li) => (
                            <text key={li} x={px + 4} y={ty + li * 12} fontSize="10" fill={INK2}>{line}</text>
                        ))}
                    </g>
                );
            })}

            {LEVELS.map((l, i) => {
                const sel = selected === l.lvl;
                return (
                    <g key={l.lvl} onClick={() => onSelect(l.lvl)} onMouseEnter={() => onSelect(l.lvl)} style={{ cursor: 'pointer' }}>
                        <rect x={xFor(i) - colW / 2} y={M.t} width={colW} height={innerH} fill="transparent" />
                        {sel && <line x1={xFor(i)} x2={xFor(i)} y1={M.t} y2={M.t + innerH} stroke={ACCENT} strokeWidth="1.25" />}
                        <circle
                            cx={xFor(i)}
                            cy={yFor(l.overall)}
                            r={sel ? 5.5 : isPeak(l) ? 3.75 : 2.5}
                            fill={sel || l.kind === 'boss' ? ACCENT : l.kind === 'finale' ? FINALE : INK}
                            stroke={BG}
                            strokeWidth={sel ? 2 : 1}
                        />
                    </g>
                );
            })}

            <line x1={M.l} x2={W - M.r} y1={M.t + innerH} y2={M.t + innerH} stroke={INK} strokeWidth="0.75" />
            {LEVELS.map((l, i) => {
                const major = l.lvl % 5 === 0 || l.lvl === 1;
                return (
                    <g key={l.lvl}>
                        <line x1={xFor(i)} x2={xFor(i)} y1={M.t + innerH} y2={M.t + innerH + (major ? 5 : 2.5)} stroke={INK} strokeWidth="0.5" />
                        {major && <text x={xFor(i)} y={M.t + innerH + 18} fontSize="10" fill={INK2} textAnchor="middle">{l.lvl}</text>}
                    </g>
                );
            })}
            <text x={M.l} y={H - 12} fontSize="10" fill={INK2} letterSpacing="0.08em">LEVEL</text>
        </svg>
    );
}

function Swatch({ color, thick, dot }: { color: string; thick?: boolean; dot?: boolean }) {
    if (dot) return <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />;
    return <span style={{ width: 16, height: thick ? 3 : 1.5, background: color, display: 'inline-block' }} />;
}

export default function DifficultyCurve() {
    const [sel, setSel] = useState(25);
    const level = LEVELS.find((l) => l.lvl === sel) ?? LEVELS[0];
    const world = worldOf(level);
    const beats = LEVELS.filter((l) => l.newZombie || l.kind === 'intro' || isPeak(l));

    return (
        <div style={{ border: '1px solid var(--border)' }}>
            <div className="label" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 18px', padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Swatch color={INK} thick />Overall</span>
                {METRICS.map((m) => (
                    <span key={m.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Swatch color={m.color} />{m.label}</span>
                ))}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}><Swatch color={FINALE} dot />Finale</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Swatch color={ACCENT} dot />Boss</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ height: 12, borderLeft: `1px dashed ${INK2}` }} />Rest beat</span>
            </div>

            <div style={{ overflowX: 'auto', padding: '12px 8px 4px' }}>
                <Chart selected={sel} onSelect={setSel} />
            </div>

            <div style={{ padding: '14px 16px 18px', borderTop: '1px solid var(--border)' }}>
                <div className="label" style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>Threat introductions · world starts · finales</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {beats.map((l) => {
                        const on = sel === l.lvl;
                        return (
                            <button
                                key={l.lvl}
                                type="button"
                                onClick={() => setSel(l.lvl)}
                                aria-pressed={on}
                                style={{ fontSize: 13, padding: '5px 9px', border: '1px solid var(--text)', background: on ? 'var(--text)' : 'transparent', color: on ? 'var(--bg)' : 'var(--text)' }}
                            >
                                {pad(l.lvl)} · {l.newZombie ?? (isPeak(l) ? l.title : `→ ${worldOf(l).name}`)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', borderTop: '1px solid var(--border)' }}>
                <div style={{ padding: '22px 16px 24px' }} aria-live="polite">
                    <div className="label" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: 11, color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--text)' }}>Selected level</span>
                        <span>{world.name} · {world.lane}</span>
                        <span style={{ marginLeft: 'auto' }}>{KIND_LABEL[level.kind]}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 10 }}>
                        <span className="h-display" style={{ fontSize: 64 }}>{pad(level.lvl)}</span>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15 }}>{level.title}</div>
                            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
                                {level.mechanic}
                                {level.unlock && <> · <span style={{ color: 'var(--text)' }}>unlock: {level.unlock}</span></>}
                                {level.newZombie && <> · <span style={{ color: FINALE }}>new: {level.newZombie}</span></>}
                            </div>
                        </div>
                    </div>

                    <div className="pvz-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 14, marginTop: 18 }}>
                        {METRICS.map((m) => (
                            <div key={m.key}>
                                <div className="label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4, color: 'var(--text-secondary)' }}>
                                    <span>{m.label}</span>
                                    <span style={{ color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{level[m.key]}</span>
                                </div>
                                <div style={{ height: 6, background: GRID }}>
                                    <div style={{ width: `${level[m.key]}%`, height: '100%', background: m.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p style={{ margin: '18px 0 0', padding: '12px 14px', border: `1px solid ${RULE}`, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <span className="label" style={{ fontSize: 10, color: 'var(--text)', marginRight: 10 }}>Note</span>
                        {level.note ?? 'Standard ramp level. Pressure increases monotonically within the world.'}
                    </p>

                    <div role="group" aria-label="Pick a level" style={{ display: 'flex', gap: 2, marginTop: 14 }}>
                        {LEVELS.map((l) => {
                            const on = l.lvl === sel;
                            return (
                                <button
                                    key={l.lvl}
                                    type="button"
                                    onClick={() => setSel(l.lvl)}
                                    aria-label={`Level ${l.lvl}, ${l.title}`}
                                    aria-pressed={on}
                                    title={`Lv ${l.lvl} · ${l.title}`}
                                    style={{ flex: 1, minWidth: 0, height: 20, padding: 0, border: 0, background: on ? ACCENT : isPeak(l) ? FINALE : isRest(l) ? RULE : INK2 }}
                                />
                            );
                        })}
                    </div>
                    <div className="label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>
                        <span>01</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
                    </div>
                </div>

                <div className="pvz-rationale" style={{ padding: '22px 16px 24px', borderLeft: '1px solid var(--border)' }}>
                    <div className="label" style={{ fontSize: 11 }}>Design rationale</div>
                    <ol style={{ margin: '12px 0 0', paddingLeft: 18, fontSize: 15, lineHeight: 1.55 }}>
                        {RATIONALE.map((r) => (
                            <li key={r.h} style={{ marginBottom: 10 }}>
                                <b>{r.h}</b> <span style={{ color: 'var(--text-secondary)' }}>{r.body}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="label" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-secondary)' }}>
                <span>Weights · threat 0.32 · skill 0.30 · variety 0.14 · economy 0.14 · novelty 0.10</span>
                <span>Hover or tap any level</span>
            </div>
        </div>
    );
}
