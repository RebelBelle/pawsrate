import React from 'react';

interface HeroPanelProps {
  headline: string;
  text: string;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ headline, text }) => (
  <div className="hero-img">
    <div className="hero-text">
        <h1>{headline}</h1>
        <p>{text}</p>
    </div>
  </div>
);
