import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MarvelContext = createContext();
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const ts = process.env.REACT_APP_MARVEL_TS;
const hash = process.env.REACT_APP_MARVEL_HASH;

const ContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async (searchTerm) => {
    console.log(searchTerm);
    setLoading(true);
    if (searchTerm) {
      await axios
        .get(
          `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&limit=30&ts=${ts}&apikey=${publicKey}&hash=${hash}`
        )
        .then((res) => setCharacters(res.data.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      await axios
        .get(
          `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=30&apikey=${publicKey}&hash=${hash}`
        )
        .then((res) => setCharacters(res.data.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  return (
    <MarvelContext.Provider value={{ characters, getCharacters, loading }}>
      {children}
    </MarvelContext.Provider>
  );
};

export default ContextProvider;
