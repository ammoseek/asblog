const path = require('path')
const { paginate, createPagePerItem } = require('gatsby-awesome-pagination')

exports.createPages = async ({ graphql, actions }) => {
   const { createPage } = actions
   await graphql(`
      {
         allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
         ) {
            edges {
               node {
                  id
                  frontmatter {
                     title
                     slug
                  }
               }
            }
         }
      }
   `).then(results => {
      if (results.errors) {
         console.log(results.errors)
         reject(results.errors)
      }

      paginate({
         createPage,
         items: results.data.allMarkdownRemark.edges,
         component: path.resolve('./src/templates/index.js'),
         itemsPerPage: 5,
         itemsPerFirstPage: 5,
         pathPrefix: '/',
      })

      createPagePerItem({
         createPage,
         items: results.data.allMarkdownRemark.edges,
         component: path.resolve('./src/templates/postLayout.js'),
         itemToPath: item => {
            if (item) {
               return `/posts/${item.node.frontmatter.slug}`
            } else {
               return ''
            }
         },
         itemToId: 'node.id',
      })
   })
}
