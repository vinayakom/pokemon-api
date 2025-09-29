import { useEffect, useState } from "react";
import "./Pokemon.css"

export const Pokemon = () => {

    const [apiData, setApiData] = useState(null);

    //const API = "https://pokeapi.co/api/v2/pokemon/pikachu";
    const API = "https://jsonplaceholder.typicode.com/posts";

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
        <div className="container effect-container">
            <ul>Data:
                {
                    apiData.map((currData) => {
                        return <li key={currData.id}> {currData.title} </li>
                    })
                }
            </ul>
        </div>
    );
};
