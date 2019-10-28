import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Styled from 'styled-components'

const SocialList = Styled.ul`
   margin: 0;
   margin-top: 2rem;
   margin-bottom: 1.5rem;
   list-style: none;
   text-align: center;

   li {
      display: inline;
      margin-right: 3.5rem;
   }
   a {
      position: absolute;
   }
   img {

      max-height: 45px;
      max-width: 45px;
      transition: all 0.3s;
   }
   img:hover {
      max-height: 48px;
      max-width: 48px;
      transtion: all 0.3s;
   }
`

const SocialIcons = () => {
   const data = useStaticQuery(graphql`
      query {
         site {
            siteMetadata {
               social {
                  name
                  url
               }
            }
         }
         twitterIcon: file(relativePath: { regex: "/twitter.svg/" }) {
            publicURL
         }
         facebookIcon: file(relativePath: { regex: "/facebook.svg/" }) {
            publicURL
         }
         rssIcon: file(relativePath: { regex: "/feed-icon.svg/" }) {
            publicURL
         }
      }
   `)

   return (
      <>
         <aside>
            <SocialList>
               {data.site.siteMetadata.social.map(share => (
                  <li key={share.url}>
                     <a href={share.url}>
                        <img
                           src={
                              share.name === 'Twitter' ? data.twitterIcon.publicURL : share.name === 'Facebook' ? data.facebookIcon.publicURL : data.rssIcon.publicURL
                           }
                           alt={share.name}/>
                     </a>
                  </li>
               ))}
            </SocialList>
         </aside>
      </>
   )
}

export default SocialIcons
