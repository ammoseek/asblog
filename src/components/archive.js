/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Styled from "styled-components"

const ListCSS = Styled.ul`
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

const ArchiveTitle = Styled.h3`
   margin-bottom: 0.5rem;
`

const Archive = () => {
   const data = useStaticQuery(graphql`
      query {
         allMarkdownRemark(limit:5, sort: {
            order: DESC,
            fields: [frontmatter___date]
          }) {
            edges {
               node {
                  frontmatter {
                     title
                     slug
                  }
               }
            }
         }
      }
   `)

   return (
      <>
         <aside>
            <ArchiveTitle>Recent Articles</ArchiveTitle>
            <ListCSS>
            {data.allMarkdownRemark.edges.map( edge => (
               <li key={edge.node.frontmatter.slug}>
                  <AniLink fade duration={1.2} to={`/posts${edge.node.frontmatter.slug}`}>
                     {edge.node.frontmatter.title}
                  </AniLink>
               </li>
            ))}
            </ListCSS>
         </aside>
      </>
   )
}

export default Archive
