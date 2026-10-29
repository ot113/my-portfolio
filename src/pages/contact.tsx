import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    outline: 'none',
};

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data: FormData) => {
        setStatus('idle');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                reset();
            } else {
                const err = await res.json();
                throw new Error(err.message || 'Something went wrong');
            }
        } catch (err: unknown) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Contact" description="Get in touch with Oğuzcan Taşkın." />

            <Reveal>
                <span className="label">/ Contact</span>
                <h1 className="h-display" style={{ margin: '12px 0 48px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Get in touch
                </h1>
            </Reveal>

            <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 48 }}>
                <Reveal delay={0.1} style={{ gridColumn: 'span 3' }}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ padding: 32, border: '1px solid var(--border)' }}
                            >
                                <h3 className="h-display" style={{ fontSize: 24, color: 'var(--accent)', marginBottom: 8 }}>Message sent!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Thank you, your message has been sent successfully. I&apos;ll get back to you soon.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="label"
                                    style={{ marginTop: 24, textDecoration: 'underline', textUnderlineOffset: 4, background: 'none', border: 'none', padding: 0, color: 'var(--text)' }}
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit(onSubmit)}
                                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                            >
                                {status === 'error' && (
                                    <div style={{ padding: 16, border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: 14 }}>
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <label className="label" style={{ color: 'var(--text-secondary)' }}>Name *</label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            style={fieldStyle}
                                            placeholder="Your name"
                                        />
                                        {errors.name && <p style={{ fontSize: 13, color: 'var(--accent)' }}>{errors.name.message}</p>}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <label className="label" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                            })}
                                            style={fieldStyle}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <p style={{ fontSize: 13, color: 'var(--accent)' }}>{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label className="label" style={{ color: 'var(--text-secondary)' }}>Subject *</label>
                                    <input
                                        {...register('subject', { required: 'Subject is required' })}
                                        style={fieldStyle}
                                        placeholder="What's this about?"
                                    />
                                    {errors.subject && <p style={{ fontSize: 13, color: 'var(--accent)' }}>{errors.subject.message}</p>}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label className="label" style={{ color: 'var(--text-secondary)' }}>Message *</label>
                                    <textarea
                                        {...register('message', { required: 'Message is required' })}
                                        rows={6}
                                        style={{ ...fieldStyle, resize: 'none' }}
                                        placeholder="Your message here..."
                                    />
                                    {errors.message && <p style={{ fontSize: 13, color: 'var(--accent)' }}>{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="label"
                                    style={{ padding: '16px 18px', background: 'var(--text)', color: 'var(--bg)', opacity: isSubmitting ? 0.5 : 1 }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send message'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </Reveal>

                <Reveal delay={0.18} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <div>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>/ Elsewhere</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, fontSize: 18, fontWeight: 600 }}>
                            <a href="https://linkedin.com/in/oguzcan-taskin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://github.com/ot113" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://ototot.itch.io" target="_blank" rel="noopener noreferrer">Itch.io</a>
                        </div>
                    </div>

                    <div>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>/ Based in</span>
                        <p style={{ margin: '16px 0 4px', fontSize: 18, fontWeight: 600 }}>Ankara / Türkiye</p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Middle East Technical University (METU)</p>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
