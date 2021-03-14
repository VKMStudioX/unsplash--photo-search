import React, { useContext, useState } from 'react'
import { StoreContext } from '../Store/StoreProvider'
import { useHistory, Link } from 'react-router-dom'

const Search = () => {

  const  { query, setQuery, suggestions, setSearch, setPage, setPhotos } = useContext(StoreContext);

  const [searchFocused, setSearchFocused] = useState(false)
  const history = useHistory();

  const searchPhotos = async (e) => {
    e.preventDefault()
    history.push("/results")
    setSearch(true)
    setPhotos([])
    setPage(1)
    fadeFocus()
  };

  const fadeFocus = () => {
    const delayed = setTimeout(() => {
      setSearchFocused(false);
  }, 300);
  return () => clearTimeout(delayed);
  }

    return (
    <div className='search'>
      <form className="form" onSubmit={searchPhotos}> 
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Search for photos`}
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => fadeFocus()}
        />
        <div>
          {suggestions && query.length >= 3 && searchFocused ? suggestions.map((sugg) => 
            <li className='input-li' key={sugg.query}>
              <Link 
              to='/results' 
              onClick={() => {
                setQuery(sugg.query);
                fadeFocus();
                setSearch(true);
                setPhotos([])
                setPage(1)
              }}
              className='input-li'> 
                {sugg.query} 
              </Link>
            </li>
          ) : null}
        </div>
      </form>
    </div>
    )
}

export default Search
