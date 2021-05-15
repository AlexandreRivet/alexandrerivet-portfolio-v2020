import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import Application from '../experiment/Application';

const Experiment = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const experimentRef = useRef<Application>(null);
  const router = useRouter();

  useEffect(() => {
    experimentRef.current = new Application({ view: canvasRef.current });

    return () => {
      experimentRef.current.destroy();
    }
  }, [canvasRef]);

  useEffect(() => {
    const route = router.route;
    switch (route) {
      case '/': {
        experimentRef.current.setColor(0x00FF00);
        break;
      }
      case '/playground': {
        experimentRef.current.setColor(0xFF0000);
        break;
      }
      case '/projects': {
        experimentRef.current.setColor(0x0000FF);
        break;
      }
      case '/about': {
        experimentRef.current.setColor(0xFFFF00);
        break;
      }
      default: {
        experimentRef.current.setColor(0xFFFFFF);
        break;
      }
    }
  }, [router]);

  return (
    <div className="experiment">
      <canvas ref={canvasRef}></canvas>
      <style jsx>{`
        .experiment {
          position: static;
          width: 100%;
          height: 100%;
        }

        canvas {
          background: black;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
  

export default Experiment;