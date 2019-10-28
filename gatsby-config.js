module.exports = {
   siteMetadata: {
      title: `Find ammo, guns, mags, and reloading - AmmoSeek Blog`,
      description: `Welcome to the AmmoSeek Blog. Here is where we'll keep you up to date with all the news, tips, tricks, features, offers, and more!`,
      author: `@ammoseek`,
      email: `admin@ammoseek.com`,
      siteUrl: 'https://blog.ammoseek.com',
      social: [
         {
            name: `RSS Feed`,
            url: `https://blog.ammoseek.com/rss.xml`,
            icon: `./images/feed-icon.svg`
         },
         {
           name: `Twitter`,
           url: `https://twitter.com/ammoseek`,
           icon: `./images/twitter.svg`
         },
         {
           name: `Facebook`,
           url: `https://facebook.com/ammoseek`,
           icon: `./images/facebook.svg`
         }
       ],
      siteLinks: [
         {
            name: 'Gun Talk',
            url: 'https://guntalk.com'
         },
         {
            name: 'Ammoland',
            url: 'https://ammoland.com'
         },
      ]
   },
   plugins: [
      `gatsby-plugin-react-helmet`,
      {
         resolve: 'gatsby-plugin-react-helmet-canonical-urls',
         options: {
            siteUrl: 'https://blog.ammoseek.com',
         }
      },
      'gatsby-plugin-sitemap',
      'gatsby-plugin-robots-txt',
      'gatsby-plugin-transition-link',
      {
         resolve: 'gatsby-plugin-feed',
         options: {
            query: `
               {
                  site {
                     siteMetadata {
                        title
                        description
                        siteUrl
                        site_url: siteUrl
                     }
                  }
               }
            `,
            feeds: [
               {
                  serialize: ({ query: { site, allMarkdownRemark } }) => {
                     return allMarkdownRemark.edges.map(edge => {
                        return Object.assign({}, edge.node.frontmatter, {
                           description: `
                              <img align="left" hspace="8" width="200" height="125" src="${site.siteMetadata.siteUrl + edge.node.frontmatter.featuredImage.publicURL}"/><br />
                              ${edge.node.excerpt}`,
                           date: edge.node.frontmatter.date,
                           url: site.siteMetadata.siteUrl + '/posts/' + edge.node.frontmatter.slug,
                           guid: site.siteMetadata.siteUrl + '/posts/' + edge.node.frontmatter.slug,
                           custom_elements: [{ "content:encoded": edge.node.html }],
                        })
                     })
                  },
                  query: `
                     {
                        allMarkdownRemark(
                           sort: { order: DESC, fields: [frontmatter___date] },
                        ) {
                           edges {
                              node {
                                 excerpt
                                 html
                                 frontmatter {
                                    title
                                    date
                                    slug
                                    featuredImage {
                                       publicURL
                                    }
                                 }
                              }
                           }
                        }
                     }
                  `,
                  output: '/rss.xml',
               }
            ]
         }
      },
      {
         resolve: `gatsby-plugin-google-analytics`,
         options: {
            trackingId: "UA-5694615-14",
            head: true
         }
      },
      {
         resolve: `gatsby-source-filesystem`,
         options: {
            name: `images`,
            path: `${__dirname}/src/images`,
         },
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'posts',
            path: `${__dirname}/src/posts`,
         },
      },
      {
         resolve: `gatsby-transformer-remark`,
         options: {
            plugins: [
               {
                  resolve: 'gatsby-remark-images',
                  options: {
                     maxWidth: 970,
                  },
               },
               {
                  resolve: "gatsby-remark-embed-video",
                  options: {
                    width: 580,
                    related: false,
                    noIframeBorder: true,
                    urlOverrides: [
                      {
                        id: 'youtube',
                        embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                      }
                    ]
                  }
               },
               'gatsby-remark-responsive-iframe'
            ],
         },
      },
      `gatsby-image`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
         resolve: `gatsby-plugin-manifest`,
         options: {
            name: `AmmoSeek Blog`,
            short_name: `AmmoSeek`,
            start_url: `/`,
            background_color: `#D31918`,
            theme_color: `#D31918`,
            display: `minimal-ui`,
            icon: `src/images/AS-Circle-Logo-For-LightBackgrounds-128x128.png`, // This path is relative to the root of the site.
         },
      },
      'gatsby-plugin-styled-components',
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      `gatsby-plugin-offline`,
      'gatsby-plugin-netlify',
   ],
}
