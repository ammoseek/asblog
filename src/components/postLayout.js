import React, { Component } from 'react'
import Layout from './layout'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

// Static Query
// used anywhere, doesn't accept variables/params, can't use context

// Page Query
// Must be used on pages

const PostContentDiv = Styled.div`
   background-color: lightgray;
   padding: 1rem;
   border-radius: 5px;
   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
`

export default class postLayout extends Component {
   render() {
      const { markdownRemark } = this.props.data
      return (
         <Layout>
            <PostContentDiv>
               <h1>{markdownRemark.frontmatter.title}</h1>
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
            date
            slug
         }
      }
   }
`
