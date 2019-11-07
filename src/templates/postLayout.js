import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import SEO from '../components/seo'
import Breadcrumbs from '../components/breadcrumbs'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

// Static Query
// used anywhere, doesn't accept variables/params, can't use context

// Page Query
// Must be used on pages

const PostContentDiv = Styled.div`
   background-color: white;
   padding: 1rem;
   border-radius: 5px;
   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

   .postImage {
      border-radius: 7px;
      box-shadow: 5px 5px 10px #777;
      max-height: 200px;
   }

   h1 {
      margin-top: 1rem;
      margin-bottom: 0;
      text-align: center;
      color: #a60000;
      text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
   }
   h4 {
      text-align: center;
      font-size: small;
      font-style: italic;
      font-weight: 100;
   }
`

const PaginateDiv = Styled.div`
   display: flex;
   justify-content: space-around;
   margin-bottom: 1.5rem;
   margin-top: 0.5rem;

   a {
      font-size: 0.8rem;
      border-radius: 30px;
      padding: 0.1rem 0.5rem;
      text-decoration: none;
      color: #333;
      font-family: Open Sans, sans-serif;
      font-weight: bolder;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 1px 1px 1px rgba(255, 255, 255, .44);
      text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.41);
      background-image: linear-gradient(#ff1f1e, #a21413);
      transition: all 0.15s ease;
   }

   a:hover {
      color: #000;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 0px 0px 2px rgba(0, 0, 0, 0.5);
      transition: all 0.15s ease;
   }
   a:hover span {
      color: yellow;
   }

   a:active {
      box-shadow: inset 0px 0px 3px rgba(0,0,0, .8);
   }

   span {
      color: #ddd;
      margin-right: 0.3rem;
   }
`

const postLayout = (props) => {
   const { pageContext, data } = props
   const {
      previousPagePath,
      nextPagePath,
      previousItem,
      nextItem,
   } = pageContext
   const { post } = data
   return (
      <Layout>
         <SEO
            title={post.frontmatter.title}
            image={
               post.frontmatter.featuredImage.childImageSharp.resolutions.src
            }
            description={post.excerpt}
         />
         <Breadcrumbs
            title={post.frontmatter.title}
            slug={post.frontmatter.slug}
         />
         <PostContentDiv>
            <Img
               alt={`${post.frontmatter.title} Image`}
               className="postImage"
               fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            />
            <h1>{post.frontmatter.title}</h1>
            <h4>{post.frontmatter.date}</h4>
            <div
               dangerouslySetInnerHTML={{
                  __html: post.html,
               }}
            ></div>
         </PostContentDiv>
         <PaginateDiv>
            {nextPagePath ? (
               <AniLink fade to={pageContext.nextPagePath}>
                  <span>previous: </span>{nextItem.node.frontmatter.title}
               </AniLink>
            ) : null}
            {previousPagePath ? (
               <AniLink fade to={pageContext.previousPagePath}>
               <span>next: </span>{previousItem.node.frontmatter.title}
               </AniLink>
            ) : null}
         </PaginateDiv>
      </Layout>
   )
}

export const query = graphql`
   query PostQuery($pageId: String!) {
      post: markdownRemark(id: { eq: $pageId }) {
         html
         excerpt
         frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            featuredImage {
               childImageSharp {
                  fluid(maxWidth: 650) {
                     ...GatsbyImageSharpFluid_tracedSVG
                  }
                  resolutions(width: 1200, height: 630) {
                     src
                  }
               }
            }
         }
      }
   }
`
export default postLayout
