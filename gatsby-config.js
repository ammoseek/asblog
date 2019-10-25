module.exports = {
   siteMetadata: {
      title: `AmmoSeek Blog`,
      description: `Welcome to the new AmmoSeek Blog. Here is where we'll keep you up to date with all the news, tips, tricks, features, offers, and more!`,
      author: `@gatsbyjs`,
      siteUrl: 'http://blog.ammoseek.com/',
      social: [
         {
           name: `Twitter`,
           url: `https://twitter.com/ammoseek`,
           icon: `./images/twitter.svg`
         },
         {
           name: `Facebook`,
           url: `https://facebook.com/ammoseek`,
           icon: `./images/facebook.svg`
         },
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
      'gatsby-plugin-sitemap',
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
