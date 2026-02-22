import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
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
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="p-8 lg:p-20 max-w-4xl mx-auto">
            <SEO title="Contact" description="Get in touch with Oğuzcan Taşkın." />

            <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h1>
                <p className="text-lg opacity-70">Have a project in mind or just want to say hi?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 border border-green-500/20 bg-green-500/5 rounded-lg mb-8"
                            >
                                <h3 className="text-xl font-bold text-green-500 mb-2">Message Sent!</h3>
                                <p className="opacity-70">Thank you! Your message has been sent successfully. I'll get back to you soon.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm font-bold uppercase tracking-widest underline underline-offset-4"
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
                                className="space-y-6"
                            >
                                {status === 'error' && (
                                    <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-sm rounded">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Name *</label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            className="w-full p-4 bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Your Name"
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Email *</label>
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                            })}
                                            className="w-full p-4 bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Subject *</label>
                                    <input
                                        {...register('subject', { required: 'Subject is required' })}
                                        className="w-full p-4 bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="What's this about?"
                                    />
                                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Message *</label>
                                    <textarea
                                        {...register('message', { required: 'Message is required' })}
                                        rows={6}
                                        className="w-full p-4 bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-colors resize-none"
                                        placeholder="Your message here..."
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50 transition-all"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">Social Links</h4>
                        <div className="space-y-4">
                            <a href="https://linkedin.com/in/oguzcan-taskin" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-blue-400 transition-colors">LinkedIn</a>
                            <a href="https://github.com/ot113" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-blue-400 transition-colors">GitHub</a>
                            <a href="https://ototot.itch.io" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-blue-400 transition-colors">Itch.io</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Location</h4>
                        <p className="text-lg font-medium">Ankara / Türkiye</p>
                        <p className="text-sm opacity-60 mt-1">Middle East Technical University (METU).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
