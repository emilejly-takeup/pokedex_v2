import React from "react";

export function PokemonCard({ pokemon, isCurrentIndex }) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={`p-5 w-72 h-[500px] mx-auto border-2 border-gray-600 rounded-lg ${isCurrentIndex ? "" : "opacity-70"}`}>
      {/* Noms */}
      <h2 className="text-2xl font-bold">{pokemon.name?.fr || "Inconnu"}</h2>
      <div className="mt-1 flex justify-around">
        <h4>🇬🇧 {pokemon.name?.en || "Inconnu"}</h4>
        <h4>🇯🇵 {pokemon.name?.jp || "Inconnu"}</h4>
      </div>

      {/* Catégorie */}
      <p className="mt-3 text-sm">
        <strong>{pokemon.category || "Unknown"}</strong>
      </p>

      {/* Image */}
      <img
        className="w-72 h-auto mt-8"
        src={pokemon.sprites?.regular || "https://via.placeholder.com/100"}
        alt={`${pokemon.name?.en || "Unknown"} sprite`}
      />

      {/* Types */}
      <div className="flex justify-center gap-4 mt-8">
        {pokemon.types?.length > 0 ? (
          pokemon.types.map((type, index) => (
            <div key={index} className="text-center">
              <img src={type.image || "https://via.placeholder.com/50"} alt={type.name || "image"} />
            </div>
          ))
        ) : (
          <p>???</p>
        )}
      </div>

      {/* Stats */}
      {/* <div>
        <h3>Stats</h3>
        <p>PV: {pokemon.stats?.hp ?? "N/A"}</p>
        <p>Attaque: {pokemon.stats?.atk ?? "N/A"}</p>
        <p>Défense: {pokemon.stats?.def ?? "N/A"}</p>
        <p>Attaque Spéciale: {pokemon.stats?.spe_atk ?? "N/A"}</p>
        <p>Défense Spéciale: {pokemon.stats?.spe_def ?? "N/A"}</p>
        <p>Vitesse: {pokemon.stats?.vit ?? "N/A"}</p>
      </div> */}

      {/* Evolutions */}
      {/* <div>
        <h3>Évolution suivante :</h3>
        {pokemon.evolution?.next?.length > 0 ? (
          pokemon.evolution.next.map((evo, index) => (
            <p key={index}>
              {evo.name || "Inconnu"} - {evo.condition || "Inconnue"}
            </p>
          ))
        ) : (
          <p>Aucune</p>
        )}
      </div> */}
    </div>
  );
}
