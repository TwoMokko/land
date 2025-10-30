'use client'

import React from 'react';

interface YaMapProps {
    address: string;
    width?: string;
    height?: string;
    className?: string;
}

export function YaMap({ address, width = '100%', height = '400px', className = ''}: YaMapProps) {
    const encodedAddress = encodeURIComponent(address);
    const src = `https://yandex.ru/map-widget/v1/?text=${encodedAddress}&z=16&lang=ru_RU`;

    return (
        <iframe
            src={src}
            width={width}
            height={height}
            frameBorder="0"
            className={className}
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
            title={`Карта: ${address}`}
        />
    );
}