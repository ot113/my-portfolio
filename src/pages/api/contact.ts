import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        console.log('Sending email with Resend:', { name, email, subject });
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'oguzcan@example.com',
            subject: `[Portfolio] ${subject}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        console.log('Resend Response:', data);
        return res.status(200).json(data);
    } catch (error: unknown) {
        console.error('Resend Error:', error);
        const message = error instanceof Error ? error.message : 'Something went wrong';
        return res.status(500).json({ message });
    }
}
