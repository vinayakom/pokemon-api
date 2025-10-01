import { useEffect, useState } from "react";
import "./index.css"

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

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
            <div>
                <ul className="cards">
                    {
                        pokemon.map((currentPokemon) => {
                            return <li key={currentPokemon.id}>{currentPokemon.name}</li>
                        })
                    }
                </ul>
            </div>
        </section>
    );
};
