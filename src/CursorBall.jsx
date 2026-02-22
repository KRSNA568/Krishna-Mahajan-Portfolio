import { useEffect, useRef } from "react";

const CursorBall = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const onMouseMove = (e) => {
      ball.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={ballRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-75"
    />
  );
};

export default CursorBall;
