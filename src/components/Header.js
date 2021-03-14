import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Header = () => {

    const history = useHistory()

    return (
    <header className={history.location.pathname === '/' ? 'header-home' : 'header-results'}>
        <Link to='/'><h1 className="title">Unsplash Photo Search</h1></Link>
    </header>
    )
}

export default Header
