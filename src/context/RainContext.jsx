import { createContext, useContext, useState } from "react";

const RainContext = createContext();

export function RainProvider({ children }) {
  const [rainfall, setRainfall] = useState(42);

  const increaseRain = () => {
    setRainfall((current) => Math.min(current + 20, 100));
  };

  const decreaseRain = () => {
    setRainfall((current) => Math.max(current - 20, 0));
  };

  const resetRain = () => {
    setRainfall(42);
  };

  return (
    <RainContext.Provider
      value={{
        rainfall,
        increaseRain,
        decreaseRain,
        resetRain,
      }}
    >
      {children}
    </RainContext.Provider>
  );
}

export function useRain() {
  return useContext(RainContext);
}