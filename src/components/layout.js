/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Archive from './archive'
import SiteLinks from './sitelinks'
import './layout.css'
import SocialIcons from './social'

const BodyCSS = Styled.div`
   background-color: #E8E4D3;
   height: 100%;
`

const MainLayout = Styled.main`
   max-width: 90%;
   margin: 0 auto;
   display: grid;
   grid-template-columns: 3fr 1fr;
   grid-gap: 40px;

   @media (max-width:720px) {
      grid-template-columns: 1fr;
   }
`
const FooterCSS = Styled.footer`
   text-align: center;
   font-size: 0.6rem;
   color: gray;
`

const Layout = ({ children }) => {
   const data = useStaticQuery(graphql`
      query SiteTitleQuery {
         site {
            siteMetadata {
               title
            }
         }
      }
   `)

   return (
      <BodyCSS>
         <Header siteTitle={data.site.siteMetadata.title} />
         <MainLayout>
            <div>{children}</div>
            <div className="sidebar">
            <Archive />
            <SiteLinks />
            <SocialIcons />
            </div>
         </MainLayout>

         <FooterCSS>
            © {new Date().getFullYear()}
            {` `} AmmoSeek, LLC
         </FooterCSS>
      </BodyCSS>
   )
}

Layout.propTypes = {
   children: PropTypes.node.isRequired,
}

export default Layout
