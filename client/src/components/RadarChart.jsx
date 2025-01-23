import React, { useState, useEffect } from "react";

const RadarChart = ({ dataValues }) => {
  const canvasRef = React.useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const container = canvas.parentNode;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let size = screenWidth > 500 ? 500 : screenWidth > 400 ? 400 : 340;
      canvas.width = screenWidth > 500 ? size - 90 : size - 50;
      canvas.height = screenWidth > 500 ? size - 140 : size - 110;

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 3;

      drawChart(ctx, centerX, centerY, radius);
    };

    const drawChart = (ctx, centerX, centerY, radius) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridLevels = 6;

      // Create gradient
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY - radius,
        centerX,
        centerY + radius
      );
      gradient.addColorStop(0, "#A00612");
      gradient.addColorStop(1, "#FF7D87");

      // Modified pentagon points calculation for vertical BC and DE
      const getPentagonPoints = (scale) => {
        const points = [];
        // A point (top)
        points.push({
          x: centerX,
          y: centerY - radius * scale,
        });
        // B point (right-top)
        points.push({
          x: centerX + radius * scale * 0.8,
          y: centerY - radius * scale * 0.4,
        });
        // C point (right-bottom)
        points.push({
          x: centerX + radius * scale * 0.8,
          y: centerY + radius * scale * 0.4,
        });
        // D point (left-bottom)
        points.push({
          x: centerX - radius * scale * 0.8,
          y: centerY + radius * scale * 0.4,
        });
        // E point (left-top)
        points.push({
          x: centerX - radius * scale * 0.8,
          y: centerY - radius * scale * 0.4,
        });

        return points;
      };

      // Fill grid background
      const outerPoints = getPentagonPoints(1);
      ctx.beginPath();
      ctx.moveTo(outerPoints[0].x, outerPoints[0].y);
      for (let i = 1; i < outerPoints.length; i++) {
        ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(160, 6, 18, 0.2)";
      ctx.fill();

      // Draw grid lines with thicker outer border
      for (let i = 1; i <= gridLevels; i++) {
        const scale = i / gridLevels;
        const points = getPentagonPoints(scale);

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y);
        }
        ctx.closePath();
        // Make the outermost line thicker
        if (i === gridLevels) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
          ctx.lineWidth = 0.5 + i / 10;
        }
        ctx.stroke();
      }

      // Draw center-to-vertex lines
      ctx.beginPath();
      for (let point of outerPoints) {
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(point.x, point.y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Data points with new pentagon shape
      const dataPoints = [
        { value: parseFloat(dataValues?.[0] || 0) / 100 },
        { value: parseFloat(dataValues?.[1] || 0) / 100 },
        { value: parseFloat(dataValues?.[2] || 0) / 100 },
        { value: parseFloat(dataValues?.[3] || 0) / 100 },
        { value: parseFloat(dataValues?.[4] || 0) / 100 },
      ];

      // Draw data polygon with gradient
      ctx.beginPath();
      const dataPolygonPoints = dataPoints.map((point, i) => {
        const basePoints = getPentagonPoints(point.value);
        return basePoints[i];
      });

      ctx.moveTo(dataPolygonPoints[0].x, dataPolygonPoints[0].y);
      for (let i = 1; i < dataPolygonPoints.length; i++) {
        ctx.lineTo(dataPolygonPoints[i].x, dataPolygonPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = gradient; // Apply the gradient here
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Add labels
      const labels = ["A", "B", "C", "D", "E"];
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      labels.forEach((label, i) => {
        const point = getPentagonPoints(1.15)[i];
        ctx.fillText(label, point.x, point.y);
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [dataValues]);

  const getMarginClass = () => {
    if (windowWidth >= 421 && windowWidth <= 480)
      return "ml-[-18px]"
    else if (windowWidth >= 401 && windowWidth <= 420) {
      return "ml-[-14px]";
    }
    else if(windowWidth >=384 && windowWidth <= 400)
      return "ml-[10px]"
    return "mx-auto";
  };

  return (
    <div className={`w-full ${getMarginClass()}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RadarChart;
