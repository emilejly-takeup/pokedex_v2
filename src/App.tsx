import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { PokemonCard } from "./components/PokemonCard";
import { NavigationButton } from "./components/NavigationButton";
import PokemonData from "./interfaces/PokemonData";

export default function App() {
  const [data, setData] = useState<PokemonData[] | []>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData()
      .then((data: PokemonData[]) => {
        setData(data);
      })
      .catch((error: Error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handlePrev = () => {
    data && setCurrentIndex((currentIndex) => (currentIndex === 0 ? data.length - 1 : currentIndex - 1));
  };

  const handleNext = () => {
    data && setCurrentIndex((currentIndex) => (currentIndex === data.length - 1 ? 0 : currentIndex + 1));
  };

  function resolvePokemonIndex(wishedIndex: number) {
    switch (wishedIndex) {
      case -2:
        return data && data[currentIndex === 0 ? data.length - 2 : currentIndex === 1 ? data.length - 1 : currentIndex - 2];
      case -1:
        return data && data[currentIndex === 0 ? data.length - 1 : currentIndex + wishedIndex];
      case 1:
        return data && data[currentIndex === data.length - 1 ? 0 : currentIndex + wishedIndex];
      case 2:
        return data && data[currentIndex === data.length - 2 ? 0 : currentIndex === data.length - 1 ? 1 : currentIndex + 2];
      default:
        return data && data[currentIndex];
    }
  }

  return (
    <div className="text-center h-screen content-center mx-auto max-w-fit">
      {data && data.length > 0 ? (
        <>
          <div className="flex items-center gap-8">
            <PokemonCard isCurrentIndex={false} pokemon={resolvePokemonIndex(-2)} />
            <PokemonCard isCurrentIndex={false} pokemon={resolvePokemonIndex(-1)} />
            <NavigationButton text="←" onClick={handlePrev} />
            <PokemonCard isCurrentIndex={true} pokemon={data[currentIndex]} />
            <NavigationButton text="→" onClick={handleNext} />
            <PokemonCard isCurrentIndex={false} pokemon={resolvePokemonIndex(1)} />
            <PokemonCard isCurrentIndex={false} pokemon={resolvePokemonIndex(2)} />
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
