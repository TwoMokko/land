import React from 'react';
import styles from './Marquee.module.scss'

interface MarqueeType {
    text: string
    speed?: number
}

const Marquee = ({ text, speed = 20 }: MarqueeType) => {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeContent} style={{ animationDuration: `${speed}s` }}>
                {text}
            </div>
        </div>
    );
};

export default Marquee;