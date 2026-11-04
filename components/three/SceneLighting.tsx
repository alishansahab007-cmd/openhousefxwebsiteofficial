"use client";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#8296a0" />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#fff8ec" />
      <pointLight position={[-3, 1, -2]} intensity={0.6} color="#d6af58" />
    </>
  );
}
