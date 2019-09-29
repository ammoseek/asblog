import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Styled from "styled-components"

const PostCSS = Styled.article`
   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
   background-color: lightgray;
   padding: 1rem;
   border-radius: 5px;
   margin-bottom: 1rem;
   a {
      color: #000;
      text-decoration: none;
   }
   p {
      font-size: 1rem;
   }
   .read-more {
      font-size: 0.9rem;
      text-decoration: underline;
      color: blue;
   }
   .read-more:hover,
   .read-more:active {
      color: lightblue;
   }
`

const Listing = () => {
   const data = useStaticQuery(graphql`
      query {
         allMarkdownRemark(
            limit: 10
            sort: { order: DESC, fields: [frontmatter___date] }
         ) {
            edges {
               node {
                  excerpt
                  frontmatter {
                     date(formatString: "MMMM DD, YYYY")
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
      {data.allMarkdownRemark.edges.map( ({node}) => (
         <PostCSS key={node.frontmatter.slug}>
            <Link to={`/posts${node.frontmatter.slug}`}>
               <h2>{node.frontmatter.title}</h2>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
            <Link className="read-more" to={`/posts${node.frontmatter.slug}`}>Read More...</Link>
         </PostCSS>
      ))}
      </>
   )
}

export default Listing
