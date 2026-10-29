import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Reveal from './Reveal';

/** One cut of the reel: the game on screen from `at` seconds until the next cut */
export interface ReelClip {
    at: number;
    id: string;
    title: string;
    type: string;
}

interface HeroReelProps {
    reel: ReelClip[];
    video: string;
    poster: string;
}

export default function HeroReel({ reel, video, poster }: HeroReelProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reducedMotion = useReducedMotion();
    const [clipIndex, setClipIndex] = useState(0);
    const clip = reel[clipIndex] ?? reel[0];

    // Follow the playhead so "Now playing" names the game currently on screen
    const onTimeUpdate = () => {
        const t = videoRef.current?.currentTime ?? 0;
        let i = 0;
        while (i + 1 < reel.length && reel[i + 1].at <= t) i++;
        if (i !== clipIndex) setClipIndex(i);
    };

    // React does not reliably render the muted attribute, which autoplay needs
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.muted = true;
        el.play().catch(() => { });
    }, [reducedMotion]);

    return (
        <section
            aria-labelledby="who"
            style={{
                position: 'relative',
                height: 'calc(100svh - 66px)',
                minHeight: 520,
                overflow: 'hidden',
                backgroundColor: 'var(--bg-inverse)',
                color: 'var(--text-inverse)',
            }}
        >
            {reducedMotion ? (
                <Image src={poster} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
            ) : (
                <video
                    ref={videoRef}
                    src={video}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onTimeUpdate={onTimeUpdate}
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            )}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.35) 55%, rgba(17,17,17,0.45) 100%)',
                }}
            />

            <div
                className="stack-sm"
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    maxWidth: 1360,
                    margin: '0 auto',
                    padding: '0 24px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: 32,
                    flexWrap: 'wrap',
                }}
            >
                <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h1 id="who" className="h-display" style={{ margin: 0, fontSize: 'clamp(64px, 11vw, 168px)' }}>
                        Oğuzcan<br />Taşkın
                    </h1>
                    <p style={{ margin: 0, fontSize: 'clamp(20px, 1.9vw, 26px)', fontWeight: 500 }}>Level Designer</p>
                    <div className="label" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <Link href="/projects" style={{ background: 'var(--text-inverse)', color: 'var(--bg-inverse)', padding: '13px 18px' }}>
                            See all work →
                        </Link>
                        <Link href="/contact" style={{ border: '1px solid var(--text-inverse)', padding: '12px 18px' }}>
                            Get in touch
                        </Link>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <Link
                        href={`/projects/${clip.id}`}
                        style={{ display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '2px solid var(--accent)', paddingLeft: 14 }}
                    >
                        <span className="label" style={{ fontSize: 12, color: 'var(--text-inverse-secondary)' }}>Now playing</span>
                        <span key={clipIndex} className="h-display now-swap" style={{ fontSize: 32 }}>{clip.title}</span>
                        <span className="label" style={{ fontSize: 12 }}>{clip.type} →</span>
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
