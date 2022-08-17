import { defineConfig } from 'vitepress'

export default defineConfig({  
  title: 'Exstream',
  description: 'jjjj',
  themeConfig: {
    siteTitle: 'Exstream',
    algolia: {
      apiKey: '1035291f12f45bfc745a9b261bed6502',
      indexName: 'exstream.js'
      // algoliaOptions: { facetFilters: ['tags:guide,api'] }
    },    
    nav: [
      { text: 'Guide', link: '/guide/what-is-exstream', activeMatch: '/guide/' }      
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/micheletriaca/exstream' },
    ],    
    sidebar: [
      {
        text: 'Introduction',
        collapsible: true,
        items: [
          { text: 'What is exstream.js?', link: '/guide/what-is-exstream' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Michele Triaca'
    } 
  }
})