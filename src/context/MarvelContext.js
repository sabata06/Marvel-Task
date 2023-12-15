import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MarvelContext = createContext();
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const ts = process.env.REACT_APP_MARVEL_TS;
const hash = process.env.REACT_APP_MARVEL_HASH;

const ContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacterDetails = async (id) => {
    // console.log(id);
    setLoading(true);
    await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => setDetails(res.data.data.results[0]))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const getCharacterComics = async (id) => {
    // console.log(id);
    setLoading(true);
    await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?orderBy=onsaleDate&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => setComics(res.data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getCharacters = async (searchTerm) => {
    // console.log(searchTerm);
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
    <MarvelContext.Provider
      value={{
        characters,
        getCharacters,
        loading,
        details,
        getCharacterDetails,
        getCharacterComics,
        comics,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};

export default ContextProvider;
