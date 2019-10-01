import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Styled from 'styled-components'

const LinksTitle = Styled.h3`
   margin-bottom: 0.5rem;
   margin-top: 2rem;
`
const LinksList = Styled.ul`
   padding: 0;
   margin: 0;
   margin-left: 0.7rem;
   list-style: none;
   li {
      margin-bottom: 0.5rem;
   }
   a {
      font-size: 0.9rem;
      text-decoration: underline;
      color: blue;
   }
   a:hover {
      color: #001489;
   }
`

const SiteLinks = () => {
   const data = useStaticQuery(graphql`
      query {
         site {
            siteMetadata {
               siteLinks {
                  name
                  url
               }
            }
         }
      }
   `)

   return (
      <>
         <aside>
            <LinksTitle>Other Sites</LinksTitle>
            <LinksList>
               {data.site.siteMetadata.siteLinks.map(site => (
                  <li key={site.url}>
                     <a href={site.url}>
                        {site.name}
                     </a>
                  </li>
               ))}
            </LinksList>
         </aside>
      </>
   )
}

export default SiteLinks
