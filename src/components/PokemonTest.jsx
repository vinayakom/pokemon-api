import { useEffect, useState } from "react";
import "./PokemonTest.css"

export const PokemonTest = () => {

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = "https://pokeapi.co/api/v2/pokemon/pikachu";    

    // Using promises
    // const fetchPokemonData = () => {
    //     fetch(API)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setPokemon(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // };

    // Using Async Await
    const fetchPokemonData = async () => {
        try {
            const res = await fetch(API);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setPokemon(data);
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

    console.log(pokemon);

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
            <ul className="card-demo">
                <li className="pokemon-card">
                    <figure>
                        <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}
                            className="pokemon-image"
                        />
                    </figure>
                    <h1>{pokemon.name}</h1>
                    <div className="grid-three-cols">
                        <p className="pokemon-info">
                            Height: <span> {pokemon.height} </span>
                        </p>
                        <p className="pokemon-info">
                            Weight: <span> {pokemon.weight} </span>
                        </p>
                        <p className="pokemon-info">
                            Speed: <span> {pokemon.stats[5].base_stat} </span>
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    );
};
