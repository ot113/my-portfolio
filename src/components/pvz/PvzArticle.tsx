// The PvZ teardown as plain React (no next/* imports), so it can also be bundled for the static preview.
import type { ReactNode } from 'react';
import DifficultyCurve from './DifficultyCurve';
import { ICAR_STAGES, PILLARS, TAKEAWAYS, TUTORIAL, WORLD_MATRIX } from './data';

const WRAP: React.CSSProperties = { maxWidth: 1360, margin: '0 auto', padding: '0 24px' };
/* 1px rules between cells: the container's background shows through the gaps */
const CELLS: React.CSSProperties = { display: 'grid', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' };
const CELL: React.CSSProperties = { background: 'var(--bg)', padding: '22px 18px 24px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 };

function Section({ id, kicker, title, lede, children }: { id: string; kicker: string; title: string; lede?: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id} style={{ ...WRAP, paddingTop: 72, paddingBottom: 8 }}>
            <div className="label" style={{ color: 'var(--text-secondary)', marginBottom: 14 }}>/ {kicker}</div>
            <h2 id={id} className="h-display" style={{ margin: 0, fontSize: 'clamp(32px, 4.4vw, 60px)', maxWidth: 1000 }}>{title}</h2>
            {lede && <p style={{ margin: '18px 0 0', maxWidth: 760, color: 'var(--text-secondary)' }}>{lede}</p>}
            <div style={{ marginTop: 32 }}>{children}</div>
        </section>
    );
}

export default function PvzArticle({ date, readingTime }: { date: string; readingTime: number }) {
    return (
        <article>
            <header style={{ ...WRAP, paddingTop: 8 }}>
                <div className="label" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', color: 'var(--text-secondary)', marginBottom: 18 }}>
                    <span>Teardown</span>
                    <span>{date}</span>
                    <span>{readingTime} min read</span>
                    <span style={{ color: 'var(--text)' }}>Oğuzcan Taşkın</span>
                </div>
                <h1 className="h-display" style={{ margin: 0, fontSize: 'clamp(42px, 6.6vw, 96px)', maxWidth: 1180 }}>
                    How PvZ teaches without telling, and ramps without breaking.
                </h1>
                <p style={{ margin: '24px 0 0', maxWidth: 760, fontSize: 19 }}>
                    A teardown of PopCap&apos;s 2009 lawn defense, organized around four design pillars and read against a 50-level difficulty
                    curve. The thesis: PvZ&apos;s level design is not about obstacles, it is about building competence. Every level makes the
                    player slightly better and slightly more confident, until they are managing five lanes, two world mechanics, and a final boss
                    wave without ever having felt overwhelmed.
                </p>
            </header>

            <Section id="pvz-pillars" kicker="Pillars" title="Four design principles, applied at every scale"
                lede="The whole game can be read off these four commitments. They show up in level 1 and they show up in the boss. Everything that follows is one of them in practice.">
                <div className="pvz-cols grid-sm" style={{ ...CELLS, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
                    {PILLARS.map((p) => (
                        <div key={p.n} style={{ ...CELL, minHeight: 210 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                                <span className="label" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Pillar {p.n}</span>
                                <span className="label" style={{ fontSize: 10, padding: '2px 6px', border: '1px solid var(--border)' }}>{p.tag}</span>
                            </div>
                            <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{p.title}</div>
                            <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{p.body}</div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="pvz-loop" kicker="The loop" title="ICAR: Introduce, Challenge, Adapt, Reward">
                <ol className="pvz-cols grid-sm" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24 }}>
                    {ICAR_STAGES.map((s, i) => (
                        <li key={s.k} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span className="h-display" aria-hidden="true" style={{ width: 64, height: 64, flexShrink: 0, border: '1px solid var(--border)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 34, paddingTop: 0 }}>{s.k}</span>
                                {i < ICAR_STAGES.length - 1 && <span aria-hidden="true" className="hide-sm" style={{ flex: 1, borderTop: '1px solid var(--text-secondary)', position: 'relative' }} />}
                            </div>
                            <span className="label">{s.label}</span>
                            <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{s.body}</span>
                            <span className="label" style={{ fontSize: 11, letterSpacing: '0.04em', textTransform: 'none' }}>{s.ex}</span>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section id="pvz-curve" kicker="The curve" title="A 50-level sawtooth across five biomes"
                lede="Difficulty does not climb on a slope. Each world hard-resets the player with a structural change (lanes, fog, slope), then re-ramps with two or three rest-beats interleaved. Hover or tap any level for its breakdown.">
                <DifficultyCurve />
            </Section>

            <Section id="pvz-tutorial" kicker="Tutorial deep-dive" title="The first five levels teach everything the next forty-five test"
                lede="Levels 1-1 through 1-5 ship the entire grammar of the game: collect, plant, defend, AOE, tank, undo, breathe. Every later level is a recombination of these five lessons under heavier load.">
                <div className="pvz-cols grid-sm" style={{ ...CELLS, gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
                    {TUTORIAL.map((t) => (
                        <div key={t.lvl} style={CELL}>
                            <span className="h-display" style={{ fontSize: 36 }}>{t.lvl}</span>
                            <span className="label" style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{t.state}</span>
                            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25 }}>{t.title}</div>
                            <dl style={{ margin: 0, display: 'grid', gap: 10 }}>
                                {([['Introduce', t.intro], ['Challenge', t.challenge], ['Reward', t.reward]] as const).map(([k, v]) => (
                                    <div key={k}>
                                        <dt className="label" style={{ fontSize: 10 }}>{k}</dt>
                                        <dd style={{ margin: '2px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{v}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p style={{ margin: 'auto 0 0', paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 15, fontWeight: 600, lineHeight: 1.45 }}>{t.insight}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="pvz-worlds" kicker="World framework" title="Five worlds, one mechanic, five constraint inversions"
                lede="PvZ ships five biomes of content using one core grid. The diversity comes from removing or rewriting one rule at a time, not from layering new systems. For studios with limited resources, this is the central lesson: design constraints, not features.">
                <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
                    <table style={{ width: '100%', minWidth: 860, borderCollapse: 'collapse', fontSize: 15 }}>
                        <thead>
                            <tr className="label" style={{ fontSize: 11, textAlign: 'left' }}>
                                {['World', 'Removes', 'Adds', 'Reuses', 'Strategic shift', 'Tools shipped'].map((h) => (
                                    <th key={h} scope="col" style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {WORLD_MATRIX.map((w, i) => (
                                <tr key={w.w} style={{ borderTop: i ? '1px solid color-mix(in srgb, var(--text) 22%, transparent)' : undefined, verticalAlign: 'top' }}>
                                    <th scope="row" className="h-display" style={{ padding: '14px', fontSize: 26, textAlign: 'left' }}>{w.w}</th>
                                    <td style={{ padding: '14px', color: '#A04C3A' }}>{w.removes}</td>
                                    <td style={{ padding: '14px' }}>{w.adds}</td>
                                    <td style={{ padding: '14px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{w.reuses}</td>
                                    <td style={{ padding: '14px' }}>{w.shift}</td>
                                    <td style={{ padding: '14px', color: 'var(--text-secondary)', fontSize: 14 }}>{w.tools}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section id="pvz-takeaways" kicker="Takeaways" title="What to steal for mobile and hybrid-casual design"
                lede="Four portable lessons from this teardown. They generalize past tower defense, the patterns are about how players learn, not about lawns.">
                <div className="pvz-cols grid-sm" style={{ ...CELLS, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
                    {TAKEAWAYS.map((t) => (
                        <div key={t.n} style={CELL}>
                            <span className="label" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Lesson {t.n}</span>
                            <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{t.h}</div>
                            <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{t.body}</div>
                        </div>
                    ))}
                </div>
            </Section>

            <footer style={{ ...WRAP, paddingTop: 72 }}>
                <div className="stack-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                    <p style={{ margin: 0, maxWidth: 560, fontSize: 15, color: 'var(--text-secondary)' }}>
                        Written and designed by <b style={{ color: 'var(--text)' }}>Oğuzcan Taşkın</b> as a game-design portfolio piece. Difficulty values are
                        design estimates, not telemetry. The visual treatment is original, not the shipping game&apos;s UI.
                    </p>
                    <p className="label" style={{ margin: 0, fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Plants vs. Zombies © PopCap Games / Electronic Arts.<br />
                        Unofficial commentary, not affiliated with or endorsed by PopCap or EA.
                    </p>
                </div>
            </footer>
        </article>
    );
}
