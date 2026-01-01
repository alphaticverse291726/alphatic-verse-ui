import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveformRecorder({ audioBlob }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!audioBlob) return;

    const ws = WaveSurfer.create({
      container: ref.current,
      waveColor: "#ec4899",
      progressColor: "#a855f7",
      height: 80,
    });

    ws.loadBlob(audioBlob);
    return () => ws.destroy();
  }, [audioBlob]);

  return <div ref={ref} />;
}
