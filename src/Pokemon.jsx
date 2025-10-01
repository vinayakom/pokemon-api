import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./index.css"


export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemonData = async () => {
        try {
            const res = await fetch(API);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();

            const detailedPokemonData = data.results.map(async (currentDataGroup) => {
                const responseCurrentData = await fetch(currentDataGroup.url);
                if (!responseCurrentData.ok) {
                    throw new Error(`HTTP error! Status: ${responseCurrentData.status}`);
                }
                const currentDataObject = await responseCurrentData.json();
                return currentDataObject;
            });

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    // Search Pokemon
    const searchPokemon = pokemon.filter((currentPokemonData) => currentPokemonData.name.toLowerCase().includes(search.toLowerCase()));

    // Initial loading stage
    if (loading)
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );

    // Handle error while initial loading
    if (error)
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        );

    return (
        <section className="container">
            <header>
                <h1>Poke Poke Pokemon !!</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div>
                <ul className="cards">
                    {
                        searchPokemon.map((currentPokemon) => {
                            return <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
                        })
                    }
                </ul>
            </div>
        </section>
    );
};
