import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import { PokemonCard } from "./PokemonCard";
import { NavigationButton } from "./NavigationButton";

export default function App() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((currentIndex) => (currentIndex === 0 ? data.length - 1 : currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex === data.length - 1 ? 0 : currentIndex + 1));
  };

  function resolvePokemonIndex(wishedIndex) {
    switch (wishedIndex) {
      case -2:
        return data[currentIndex === 0 ? data.length - 2 : currentIndex === 1 ? data.length - 1 : currentIndex - 2];
      case -1:
        return data[currentIndex === 0 ? data.length - 1 : currentIndex + wishedIndex];
      case 1:
        return data[currentIndex === data.length - 1 ? 0 : currentIndex + wishedIndex];
      case 2:
        return data[currentIndex === data.length - 2 ? 0 : currentIndex === data.length - 1 ? 1 : currentIndex + 2];
      default:
        return currentIndex;
    }
  }

  return (
    <div className="text-center h-screen content-center mx-auto max-w-fit">
      {data.length > 0 ? (
        <>
          <div className="flex items-center gap-8">
            <PokemonCard pokemon={resolvePokemonIndex(-2)} />
            <PokemonCard pokemon={resolvePokemonIndex(-1)} />
            <NavigationButton text="←" onClick={handlePrev} />
            <PokemonCard isCurrentIndex pokemon={data[currentIndex]} />
            <NavigationButton text="→" onClick={handleNext} />
            <PokemonCard pokemon={resolvePokemonIndex(1)} />
            <PokemonCard pokemon={resolvePokemonIndex(2)} />
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
