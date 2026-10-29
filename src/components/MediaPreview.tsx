import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MediaPreviewProps {
    title: string;
    thumbnail?: string;
    video?: string;
    active: boolean;
    aspect?: string;
    sizes?: string;
    priority?: boolean;
}

export default function MediaPreview({ title, thumbnail, video, active, aspect = '16 / 10', sizes = '(max-width: 760px) 100vw, 50vw', priority = false }: MediaPreviewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reducedMotion = useReducedMotion();
    const showVideo = Boolean(video) && !reducedMotion;

    useEffect(() => {
        if (!videoRef.current || !showVideo) return;
        if (active) {
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
        }
    }, [active, showVideo]);

    return (
        <div
            style={{
                position: 'relative',
                aspectRatio: aspect,
                maxWidth: '100%',
                backgroundColor: '#1C1C1A',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {thumbnail ? (
                <>
                    {/* Thumbnails come in many shapes (banners, 4:3, 16:9): show the whole image, fill the rest with a blurred copy */}
                    <Image src={thumbnail} alt="" aria-hidden="true" fill sizes={sizes} priority={priority} style={{ objectFit: 'cover', filter: 'blur(24px) brightness(.55)', transform: 'scale(1.15)' }} />
                    <Image src={thumbnail} alt={title} fill sizes={sizes} priority={priority} style={{ objectFit: 'contain' }} />
                </>
            ) : (
                // No media (design documents like the CardTower GDD): a plain document glyph stands in
                !showVideo && (
                    <svg
                        role="img"
                        aria-label={`${title} (document)`}
                        viewBox="0 0 48 60"
                        style={{ width: '18%', maxWidth: 96, height: 'auto', color: '#A9A79F' }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    >
                        <path d="M4 3h28l12 12v42H4z" />
                        <path d="M32 3v12h12" />
                        <path d="M12 27h24M12 35h24M12 43h16" strokeLinecap="round" />
                    </svg>
                )
            )}
            {showVideo && (
                <video
                    ref={videoRef}
                    src={video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: active ? 1 : 0,
                        transition: 'opacity .4s ease',
                    }}
                />
            )}
        </div>
    );
}
