import { useState, useEffect } from 'react';

export function useWarehouseSimulation() {
  // IoT Sensor State
  const [coldTemp, setColdTemp] = useState(3.8);
  const [coldHumidity, setColdHumidity] = useState(84.5);
  const [generalTemp, setGeneralTemp] = useState(23.2);
  const [generalHumidity, setGeneralHumidity] = useState(52.1);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update sensors
      setColdTemp((t) => +(t + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setColdHumidity((h) => +(h + (Math.random() * 1.0 - 0.5)).toFixed(1));
      setGeneralTemp((t) => +(t + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setGeneralHumidity((h) => +(h + (Math.random() * 0.6 - 0.3)).toFixed(1));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return {
    sensors: {
      cold: { temp: coldTemp, humidity: coldHumidity, status: coldTemp > 5.0 ? 'Warning' : 'OK' },
      general: { temp: generalTemp, humidity: generalHumidity, status: 'OK' },
    },
  };
}
