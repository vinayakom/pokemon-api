import { useEffect, useState } from "react";
import "./Pokemon.css"

export const Pokemon = () => {

    const [apiData, setApiData] = useState(null);

    const API = "https://pokeapi.co/api/v2/pokemon/pikachu";    

    const fetchPokemonData = () => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    return (
        <section className="container">
            <header>
                <h1>Lets catch Pokemon</h1>
            </header>
            <ul className="card-demo">
                <li className="pokemon-card">
                    <figure>

                    </figure>
                </li>
            </ul>
        </section>
    );
};
