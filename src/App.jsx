import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import { LoadingScreen } from "./components/LoadingScreen";

const audio = new Audio("./audios/Song Of Unity.mp3");

function App() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      audio.play();
    }
  }, [start]);

  return (
    <>
      <Canvas shadows camera={{ position: [-5, 1, 6], fov: 25 }}>
        <fog attach="fog" args={["#16a04b", 12, 30]} />
        <Suspense fallback={null}>{start && <Experience />}</Suspense>
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.42}
            radius={0.72}
          />
        </EffectComposer>
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
    </>
  );
}

export default App;
