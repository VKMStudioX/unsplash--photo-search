import React, { useContext } from 'react'
import { StoreContext } from '../Store/StoreProvider'
import Header from '../components/Header'
import Search from '../components/Search'

const Home = () => {

    const  { randomPhoto } = useContext(StoreContext);

    return (
    <div className='home'>
        <Header/>
        <div className='home--search'>
            <Search/>
        </div>
        {randomPhoto 
        ? <img
            className="home--image"
            alt={randomPhoto.alt_description}
            src={randomPhoto.urls.full}
          />
        : null}
    </div>
    )
}

export default Home
