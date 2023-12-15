import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MarvelContext = createContext();

const ContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(false);

  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const ts = process.env.REACT_APP_MARVEL_TS;
  const hash = process.env.REACT_APP_MARVEL_HASH;

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (setData === setDetails) {
        setData(res.data.data.results[0]);
      } else {
        setData(res.data.data.results);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=30&apikey=${publicKey}&hash=${hash}`,
      setCharacters
    );
  }, [publicKey, ts, hash]);

  const getCharacterDetails = async (id) => {
    fetchData(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      setDetails
    );
  };

  const getCharacterComics = async (id) => {
    fetchData(
      `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?orderBy=onsaleDate&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      setComics
    );
  };

  const getCharacters = async (searchTerm) => {
    if (searchTerm) {
      fetchData(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&limit=30&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        setCharacters
      );
    } else {
      fetchData(
        `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=30&apikey=${publicKey}&hash=${hash}`,
        setCharacters
      );
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
        error,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};

export default ContextProvider;
