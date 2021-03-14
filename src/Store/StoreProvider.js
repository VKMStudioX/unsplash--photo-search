import React, { createContext, useState, useEffect } from 'react'
import { createApi } from "unsplash-js";
import { useHistory } from 'react-router-dom';
import axios from 'axios'

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    
    const [query, setQuery] = useState('')
    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState(true)
    const [suggestions, setSuggestions] = useState()
    const [modalPhoto, setModalPhoto] = useState()
    const [modalPhotoId, setModalPhotoId] = useState()
    const [randomPhoto, setRandomPhoto] = useState()
    const [page, setPage] = useState(1)
    const history = useHistory();

    const unsplash = createApi({
        accessKey: process.env.REACT_APP_API_ACCESS_KEY,
    });

    useEffect(() => {
      if (history.location.pathname==='/results' && search && query) {
      const delayed = setTimeout(() => {
          getPhotos(query, page);
      }, 300);
      return () => clearTimeout(delayed);}
      else {}
    }, [query, history, search, page]);

    const getPhotos = async (query, page) => {
      await unsplash.search.getPhotos({
        query: query,
        page: page,
        perPage: 20,
      })
        .then((json) => {
          let photosArray = photos.concat(json.response.results)
          setPhotos(photosArray);
          setSearch(false)
        });
    };

    useEffect(() => {
      getSuggestions(query)
    }, [query] );
  
    const getSuggestions = async (query) => {
      if (query.length >= 3 ) {
        await axios.get(`${process.env.REACT_APP_API_AUTOCOMPLETE_URL}/${query}`)
          .then((json) => {
            json.data.autocomplete.length
              ? setSuggestions(json.data.autocomplete) 
              : setSuggestions([{query: 'Suggestions not found'}])
          })
      }
      else {setSuggestions()}
    }

    useEffect(() => {
      getModalPhoto(modalPhotoId)
    }, [modalPhotoId] );

    const getModalPhoto = async (modalPhotoId) => {
      await unsplash.photos.get(
        { photoId: modalPhotoId }
      ).then((json) => {
        setModalPhoto(json.response)
      });
    }

    useEffect(() => {
      if (history.location.pathname==='/') {
        getRandomPhoto();
    }}, [history]);
 
    const getRandomPhoto = async () => {
      await unsplash.photos.getRandom({
        count: 1,
      }).then((json) => {
        setRandomPhoto(json.response[0]);
      });
    }

    return (
        <StoreContext.Provider value={{
    query, setQuery,
    photos, setPhotos,
    suggestions, setSuggestions,
    search, setSearch,
    modalPhoto,
    modalPhotoId, setModalPhotoId,
    randomPhoto,
    page, setPage
    }}>
        {children}
  </StoreContext.Provider>
    )
}

export default StoreProvider
