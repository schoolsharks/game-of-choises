import React, { useState, useEffect, useRef } from "react";

const RadarChart = ({ dataValues }) => {
  const containerRef = useRef(null);
  const [svgConfig, setSvgConfig] = useState({
    width: 350,
    height: 300
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const width = Math.min(containerWidth, 500);
        setSvgConfig({
          width,
          height: 300 
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const renderChart = () => {
    const { width, height } = svgConfig;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    const getPentagonPoints = (scale) => [
      `${centerX},${centerY - radius * scale}`,
      `${centerX + radius * scale * 0.8},${centerY - radius * scale * 0.4}`,
      `${centerX + radius * scale * 0.8},${centerY + radius * scale * 0.4}`,
      `${centerX - radius * scale * 0.8},${centerY + radius * scale * 0.4}`,
      `${centerX - radius * scale * 0.8},${centerY - radius * scale * 0.4}`
    ];

    const dataPoints = dataValues?.map(val => parseFloat(val || 0) / 100) || [0, 0, 0, 0, 0];
    const labels = ["A", "B", "C", "D", "E"];

    return (
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A00612" />
            <stop offset="100%" stopColor="#FF7D87" />
          </linearGradient>
          <radialGradient id="backgroundGradient">
            <stop offset="0%" stopColor="#A0061240" />
            <stop offset="100%" stopColor="#a00613ae" />
          </radialGradient>
        </defs>

        {[1, 0.8, 0.6, 0.4, 0.2, 0.1].map((scale, index) => (
          <polygon 
            key={`grid-${index}`}
            points={getPentagonPoints(scale).join(' ')}
            fill="none"
            stroke="rgb(255, 255, 255)"
            strokeWidth={index === 5 ? 2.5 : 0.5}
          />
        ))}

        {getPentagonPoints(1).map((point, index) => (
          <line 
            key={`radial-${index}`}
            x1={centerX} 
            y1={centerY} 
            x2={point.split(',')[0]} 
            y2={point.split(',')[1]}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={1}
          />
        ))}

        <polygon 
          points={getPentagonPoints(1).join(' ')}
          fill="url(#backgroundGradient)"
        />

        <polygon 
          points={dataPoints.map((val, i) => 
            getPentagonPoints(val)[i]
          ).join(' ')}
          fill="url(#dataGradient)"
          stroke="#FFFFFF"
          strokeWidth={1.5}
        />

        {labels.map((label, i) => {
          const points = getPentagonPoints(1.15);
          const [x, y] = points[i].split(',');
          return (
            <text 
              key={label}
              x={x} 
              y={y} 
              fill="#FFFFFF"
              fontSize="14"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center' ,
        marginBottom:"-100px"
      }}
    >
      {renderChart()}
    </div>
  );
};

export default RadarChart;