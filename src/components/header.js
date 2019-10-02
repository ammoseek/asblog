import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Styled from 'styled-components'

import logoImg from '../images/AS-Circle-Logo-For-DarkBackgrounds-128x128-new.png'

const HeaderWrapper = Styled.div`
   background: #111;
   margin-bottom: 1.45rem;
   img {
      margin-bottom: none;
   }
   box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
`
const HeaderContainer = Styled.div`
   margin: 0 auto;
   max-width: 960px;
   height: 100px;
   padding: 0.6rem;
   display: grid;
   grid-template-columns: 3fr 1fr;
   align-items: center;

   @media (max-width:720px) {
      grid-template-columns: 1fr;
      height: 200px;
      text-align:center;
   }

   ul {
      align-self: center;
      list-style: none;
      margin: 0;
   }

   li {
      margin: 0;
   }

   .nav-item {
      display: inline-block;
      background-color: #D31918;
      color: black;
      padding: 0.3rem;
      text-decoration: none;
      white-space: nowrap;
      box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.34);
      height: 60px;
      width: 170px;
      transition: all 0.3s;
      border-radius: 6px;
   }
   .nav-item:hover,
   .nav-item:active {
      //background-color: gray;
      color: #3a3a3a;
      cursor: pointer;
      //box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
      padding: 0.4rem;
      transition: all 0.3s;
   }
   @keyframes findwhatcolor {
      0% {
         content: 'AMMO';
         color: yellow;
      }
      30% {
         content: 'MAGS';
         color: pink;
      }
      60% {
         content: 'GUNS';
         color: cyan;
      }
      80% {
         content: 'RELOADING';
         color: lightgreen;
      }
   }
   @keyframes findwhat {
      0% {
         content: 'AMMO';
      }
      30% {
         content: 'MAGS';
      }
      60% {
         content: 'GUNS';
      }
      80% {
         content: 'RELOADING';
      }
   }
   .nav-item .find {
      text-align: left;
   }
   .nav-item .type::after {
      content: 'AMMO';
      animation: findwhat 10s infinite;
      width: 170px;
      text-align: center;
   }
   .nav-item:hover .type::after {
      animation: findwhatcolor 0.3s infinite;
   }
   .nav-item .at {
      display: inline-block;
      font-size: 0.8em;
      width: 170px;
      text-align: center;
      font-style: italic;
   }
`

const LogoCSS = Styled.div`
   img {
      vertical-align: middle;
      width: 75px;
      margin-right: 1rem;
   }
   span {
      color: #D31918;
   }
`

const Header = ({ siteTitle }) => (
   <HeaderWrapper>
      <header>
         <HeaderContainer>
            <h1 style={{ margin: 0 }}>
               <Link
                  to="/"
                  style={{
                     color: `white`,
                     textDecoration: `none`,
                  }}
               >
                  <LogoCSS>
                     <img src={logoImg} alt="AmmoSeek Logo" />
                     <span>AmmoSeek Blog</span>
                  </LogoCSS>
               </Link>
            </h1>
            <ul>
               <li>
                  <a className="nav-item" type="buttom" href="https://ammoseek.com/">
                     <span className="find">FIND</span> <span className="type"></span><br />
                     <span className="at">at AmmoSeek.com</span>
                  </a>
               </li>
            </ul>
         </HeaderContainer>
      </header>
   </HeaderWrapper>
)

Header.propTypes = {
   siteTitle: PropTypes.string,
}

Header.defaultProps = {
   siteTitle: ``,
}

export default Header
