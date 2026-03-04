'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let past60vh = false;
        let atFinalCta = false;

        const updateVisibility = () => setIsVisible(past60vh && !atFinalCta);

        // Sentinel at exactly 60vh
        const sentinel = document.createElement('div');
        sentinel.style.cssText =
            'position:absolute;top:60vh;height:1px;width:100%;pointer-events:none;';
        document.body.prepend(sentinel);
        triggerRef.current = sentinel;

        const sentinelObserver = new IntersectionObserver(
            ([entry]) => {
                past60vh = !entry.isIntersecting;
                updateVisibility();
            },
            { threshold: 0 }
        );
        sentinelObserver.observe(sentinel);

        // Hide when final CTA section enters view
        const finalCtaEl = document.getElementById('final-cta');
        let finalCtaObserver: IntersectionObserver | null = null;
        if (finalCtaEl) {
            finalCtaObserver = new IntersectionObserver(
                ([entry]) => {
                    atFinalCta = entry.isIntersecting;
                    updateVisibility();
                },
                { threshold: 0.15 }
            );
            finalCtaObserver.observe(finalCtaEl);
        }

        return () => {
            sentinelObserver.disconnect();
            finalCtaObserver?.disconnect();
            sentinel.remove();
        };
    }, []);

    return (
        // sm:hidden — desktop never sees this
        <div className="sm:hidden">
            <AnimatePresence>
                {isVisible && (
                    // Outer div handles fixed positioning + centering — no transform conflicts
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            zIndex: 999,
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Inner motion div handles only the fade-up animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            style={{ pointerEvents: 'auto' }}
                        >
                        <Link
                            href="/mentors"
                            onMouseDown={() => setIsPressed(true)}
                            onMouseUp={() => setIsPressed(false)}
                            onMouseLeave={() => setIsPressed(false)}
                            onTouchStart={() => setIsPressed(true)}
                            onTouchEnd={() => setIsPressed(false)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 28px',
                                borderRadius: '100px',
                                backgroundColor: '#2E5FFF',
                                color: 'white',
                                fontFamily: 'var(--font-dm-sans, sans-serif)',
                                fontWeight: 700,
                                fontSize: '15px',
                                letterSpacing: '0.01em',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 8px 28px rgba(46, 95, 255, 0.40)',
                                transform: isPressed ? 'scale(0.96)' : 'scale(1)',
                                transition: isPressed
                                    ? 'transform 100ms ease-in, background-color 150ms ease, box-shadow 150ms ease'
                                    : 'transform 100ms ease-out, background-color 150ms ease, box-shadow 150ms ease',
                            }}
                        >
                            <Compass size={20} color="white" strokeWidth={2} />
                            Find Your Mentor
                        </Link>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
