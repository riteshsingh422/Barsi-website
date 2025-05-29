import { useEffect, useRef, useState } from "react";

const MouseTrail = () => {
  const dotRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check if the device supports touch input
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Handle mouse movement for non-touch devices
  useEffect(() => {
    if (isTouchDevice) return; // Skip mouse trail logic on touch devices

    const handleMouseMove = (e) => {
      if (dotRef.current) {
        const { clientX, clientY } = e;
        setTimeout(() => {
          dotRef.current.style.left = `${clientX}px`;
          dotRef.current.style.top = `${clientY}px`;
        }, 100);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  // Don't render the dot on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className="hidden sm:block fixed w-4 h-4 bg-orange-500 rounded-full pointer-events-none z-50"
      style={{
        transform: "translate(-50%, -50%)",
        transition: "all 0.1s ease-out",
      }}
    />
  );
};

export default MouseTrail;
