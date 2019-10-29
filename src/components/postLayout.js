import React, { Component } from 'react'
import Layout from './layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import SEO from './seo'
import Breadcrumbs from './breadcrumbs'

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

export default class postLayout extends Component {
   render() {
      const { markdownRemark } = this.props.data
      return (
         <Layout>
            <SEO title={ markdownRemark.frontmatter.title }
               image={ markdownRemark.frontmatter.featuredImage.childImageSharp.resolutions.src }
             />
            <Breadcrumbs
               title={ markdownRemark.frontmatter.title}
               slug={ markdownRemark.frontmatter.slug }
            />
            <PostContentDiv>
               <Img alt={`${markdownRemark.frontmatter.title} Image`} className="postImage" fluid={markdownRemark.frontmatter.featuredImage.childImageSharp.fluid} />
               <h1>{markdownRemark.frontmatter.title}</h1>
               <h4>{markdownRemark.frontmatter.date}</h4>
               <div
                  dangerouslySetInnerHTML={{
                     __html: markdownRemark.html,
                  }}
               ></div>
            </PostContentDiv>
         </Layout>
      )
   }
}

export const query = graphql`
   query PostQuery($slug: String!) {
      markdownRemark(frontmatter: { slug: { eq: $slug } }) {
         html
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
