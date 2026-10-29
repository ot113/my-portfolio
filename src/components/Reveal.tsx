import { motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    style?: CSSProperties;
    className?: string;
    as?: 'div' | 'header' | 'section';
}

const MOTION_TAGS = {
    div: motion.div,
    header: motion.header,
    section: motion.section,
};

export default function Reveal({ children, delay = 0, y = 48, style, className, as = 'div' }: RevealProps) {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        const Tag = as;
        return <Tag style={style} className={className}>{children}</Tag>;
    }

    const MotionTag = MOTION_TAGS[as];

    return (
        <MotionTag
            style={style}
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12, margin: '0px 0px -6% 0px' }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionTag>
    );
}
