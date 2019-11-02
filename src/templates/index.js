import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'
import Styled from 'styled-components'

const PostCSS = Styled.article`
   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
   background-color: lightgray;
   padding: 1rem;
   padding-top: 0;
   border-radius: 5px;
   margin-bottom: 1rem;
   h2 {
      background-color: #D31918;
      overflow: visible;
      margin-left: -1.8rem;
      padding: 0.5rem;
      padding-left: 1.5rem;
      width: calc(100% + 3.5rem);
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
      font-size: 1.3rem;
      clip-path: polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%);
      transition: all 0.3s;
      margin-bottom: 0.1rem;
   }
   .postTitle-wrap {
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
   }
   h2:hover {
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      transition: all 0.3s;
      color: #3a3a3a;
   }
   a {
      color: #000;
      text-decoration: none;
   }
   p {
      font-size: 1rem;
   }
   .date {
      font-style: italic;
      font-size: 0.7rem;
   }
   .read-more {
      font-size: 0.9rem;
      text-decoration: underline;
      color: blue;
   }
   .read-more:hover {
      color: #001489;
   }
   img {
      float: left;
   }
   .readMoreWrapper {
      text-align: right;
   }
   .listingImage {
      border-radius: 7px;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
   }
   .pagination {
      display: flex;
      justify-content: space-between;
   }
`
const PaginateDiv = Styled.div`
   display: flex;
   justify-content: space-around;
   margin-bottom: 1.5rem;

   a {
      font-size: 0.8rem;
      border-radius: 30px;
      padding: 0.1rem 0.5rem;
      text-decoration: none;
      color: #c5c5c5;
      font-family: Open Sans, sans-serif;
      font-weight: bolder;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 1px 1px 1px rgba(255, 255, 255, .44);
      text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.41);
      background-image: linear-gradient(#ff1f1e, #a21413);
      transition: all 0.15s ease;
   }

   a:hover {
      color: gray;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 0px 0px 2px rgba(0, 0, 0, 0.5);
      transition: all 0.15s ease;
   }

   a:active {
      box-shadow: inset 0px 0px 3px rgba(0,0,0, .8);
   }
`

const IndexPage = (props) => {
   const { pageContext } = props;
   const { previousPagePath, nextPagePath } = pageContext;

   return (
      <Layout>
         <SEO title="Home" />
         {props.data.posts.edges.map(({ node }) => (
            <PostCSS key={node.frontmatter.slug}>
               <AniLink fade to={`/posts/${node.frontmatter.slug}`}>
                  <div className="postTitle-wrap">
                     <h2>{node.frontmatter.title}</h2>
                  </div>
               </AniLink>
               <p className="date">{node.frontmatter.date}</p>
               <div className="postContentContainer">
                  <Img alt={`${node.frontmatter.title} Thumbnail`} className="listingImage" fixed={node.frontmatter.featuredImage.childImageSharp.fixed} />
                  <p className="postContent">{node.excerpt}</p>
               </div>
               <div className="readMoreWrapper">
                  <AniLink fade className="read-more" to={`/posts/${node.frontmatter.slug}`}>
                     Read More...
                  </AniLink>
               </div>
            </PostCSS>
         ))}

         <PaginateDiv>
            {previousPagePath ? <AniLink fade to={previousPagePath}>&lt;&lt; Newer</AniLink> : null }
            {nextPagePath ? <AniLink fade to={nextPagePath}>Older &gt;&gt;</AniLink> : null }
         </PaginateDiv>
      </Layout>
   )
}

export const pageQuery = graphql`
   query($skip: Int!, $limit: Int!) {
      posts: allMarkdownRemark(
         sort: { fields: [frontmatter___date], order: DESC }
         skip: $skip
         limit: $limit
      ) {
         edges {
            node {
               excerpt(pruneLength: 280)
               frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  title
                  slug
                  featuredImage {
                     childImageSharp {
                        fixed(width: 180) {
                           ...GatsbyImageSharpFixed_tracedSVG
                        }
                     }
                  }
               }
            }
         }
      }
   }
`

export default IndexPage
