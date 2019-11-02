const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = ({ graphql, actions }) => {
   const { createPage } = actions
   return new Promise((resolve, reject) => {
      graphql(`
         {
            allMarkdownRemark(
               sort: { fields: [frontmatter___date], order: DESC }
            ) {
               edges {
                  node {
                     id
                     frontmatter {
                        slug
                     }
                  }
               }
            }
         }
      `).then(results => {
         if (results.errors) {
            console.log(results.errors);
            reject(results.errors);
         }

         paginate({
            createPage,
            items: results.data.allMarkdownRemark.edges,
            component: path.resolve('./src/templates/index.js'),
            itemsPerPage: 5,
            itemsPerFirstPage: 5,
            pathPrefix: "/"
         })

         results.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
               path: `/posts/${node.frontmatter.slug}`,
               component: path.resolve('./src/templates/postLayout.js'),
               context: {
                  slug: node.frontmatter.slug,
               }
            })
         })
      })
      resolve()
   })
}
