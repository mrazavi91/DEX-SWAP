import React from 'react'
import Logo from '../dog-logo.svg'
import poly from '../polygan-logo.png'
import { Link } from 'react-router-dom'

export default function Header(props) {
  const {connect , isConnected, address } = props
  return (
    <header>

      {/* left side */}
      <div className="leftH">
        <img src={Logo} alt="logo" className='logo' />
        <Link to='/' className='link'>
          <div className="headerItem">Swap</div>
        </Link>
        
        <Link to='/tokens' className='link'>
          <div className="headerItem ">Tokens</div>
        </Link>
        
      </div>

      {/* Right side */}
      <div className="rightH">
        <div className="headerItem">
          <img src={poly} alt="eth" className='eth' />
          Polygon 
        </div>
        <div
          className="connectButton"
          onClick={connect}
        >
          {isConnected ? (address.slice(0,4) + "..." + address.slice(38)) : 'Connect'}
        </div>
        
      </div>

    </header>
    
  )
}
