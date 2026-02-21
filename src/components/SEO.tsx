import Head from 'next/head';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const SITE_NAME = "Oğuzcan Taşkın";
const DEFAULT_DESCRIPTION = "Game Designer & Historian. Crafting player-driven experiences and thoughtful game systems.";
const DEFAULT_IMAGE = "/images/og-image.jpg";

export default function SEO({ title, description, image, url }: SEOProps) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Game Designer & Historian`;
    const metaDescription = description ?? DEFAULT_DESCRIPTION;
    const metaImage = image ?? DEFAULT_IMAGE;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oguzcan.dev';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* OG */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={`${siteUrl}${metaImage}`} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={`${siteUrl}${metaImage}`} />

            <link rel="canonical" href={fullUrl} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
