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
  const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";

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
      `${BASE_URL}?ts=${ts}&limit=30&apikey=${publicKey}&hash=${hash}`,
      setCharacters
    );
  }, [publicKey, ts, hash]);

  const getCharacterDetails = async (id) => {
    fetchData(
      `${BASE_URL}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      setDetails
    );
  };

  const getCharacterComics = async (id) => {
    fetchData(
      `${BASE_URL}/${id}/comics?orderBy=onsaleDate&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      setComics
    );
  };

  const getCharacters = async (searchTerm) => {
    if (searchTerm) {
      fetchData(
        `${BASE_URL}?nameStartsWith=${searchTerm}&limit=30&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        setCharacters
      );
    } else {
      fetchData(
        `${BASE_URL}?ts=${ts}&limit=30&apikey=${publicKey}&hash=${hash}`,
        setCharacters
      );
    }
  };

  return (
    <MarvelContext.Provider
      value={{
        getCharacters,
        getCharacterDetails,
        getCharacterComics,
        loading,
        error,
        details,
        comics,
        characters,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};

export default ContextProvider;
