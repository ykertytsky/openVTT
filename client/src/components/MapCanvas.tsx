import React, { useRef, useEffect, useState } from "react";

const MapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load the image once
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://preview.redd.it/eouyl4et4mn11.jpg?auto=webp&s=2b54f5aa795d7e6b5a43c96de299676bedf678bb"; // Default placeholder
    img.onload = () => setImage(img);
  }, []);

  // Draw the canvas
  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw the image
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }, [image, offset, scale]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const dx = e.clientX - startDrag.x;
    const dy = e.clientY - startDrag.y;

    setOffset((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Calculate boundaries
      const maxOffsetX = (dimensions.width / 2) * scale;
      const maxOffsetY = (dimensions.height / 2) * scale;

      return {
        x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
        y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY)),
      };
    });

    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // Handle zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const direction = e.deltaY > 0 ? -1 : 1;

    setScale((prevScale) =>
      Math.max(0.4, Math.min(4, prevScale + direction * zoomFactor))
    );
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      />
    </div>
  );
};

export default MapCanvas;
