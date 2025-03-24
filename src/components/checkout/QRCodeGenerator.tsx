
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  level?: string;
}

const QRCodeGenerator = ({ 
  value, 
  size = 200, 
  level = 'M' 
}: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
          errorCorrectionLevel: level as any,
        },
        (error) => {
          if (error) {
            console.error('Error generating QR code:', error);
          }
        }
      );
    }
  }, [value, size, level]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCodeGenerator;
