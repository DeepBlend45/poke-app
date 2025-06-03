import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  // 図鑑番号の入力バリデーション
  const isValidNumber = (value) => {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 && num <= 1025;
  };

  const fetchPokemon = async () => {
    if (!isValidNumber(number)) {
      setError("1〜1025の整数を入力してください。");
      setPokemon(null);
      return;
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
      if (!res.ok) throw new Error("取得失敗");

      const data = await res.json();
      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        imageShiny: data.sprites.front_shiny,
      });
      setError("");
    } catch (e) {
      setError("ポケモンの取得に失敗しました。");
      setPokemon(null);
    }
  };

  return (
    <div className="App">
      <h1>ポケモン図鑑検索</h1>
      <input
        type="text"
        placeholder="図鑑番号を入力"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={fetchPokemon}>検索</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <img src={pokemon.imageShiny} alt={pokemon.name} /></div>
      )}
    </div>
  );
}

export default App;
