import { defineConfig } from 'vitepress'

export default defineConfig({  
  title: 'Exstream',
  description: 'Exstream.js - The library to handle sync/async/streaming data flows',
  lastUpdated: true,  
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/exstream-js/exstream-js.github.io/edit/master/docs/:path'
    },   
    siteTitle: 'Exstream',
    algolia: {
      apiKey: '1035291f12f45bfc745a9b261bed6502',
      indexName: 'exstream.js'
      // algoliaOptions: { facetFilters: ['tags:guide,api'] }
    },    
    nav: [
      { text: 'Guide', link: '/guide/what-is-exstream', activeMatch: '/guide/' },
      { text: 'Reference', link: '/reference/filter', activeMatch: '/reference/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/micheletriaca/exstream' },
    ],  
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          collapsible: true,
          items: [
            { text: 'What is exstream.js?', link: '/guide/what-is-exstream' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Guide',
          collapsible: true,
          items: [
            { text: 'Basic concepts', link: '/guide/basic-concepts' },
            { text: 'Type of sources', link: '/guide/type-of-sources' },
            { text: 'Consumption methods', link: '/guide/consumption-methods' },
            { text: 'Modularization', link: '/guide/modularization' },
            { text: 'Forking and merging', link: '/guide/forking-and-merging' },
            { text: 'Error handling', link: '/guide/error-handling' },
            { text: 'Embedded CSV parser/serializer', link: '/guide/embedded-csv-parser-serializer' },
            { text: 'Operations on sorted data', link: '/guide/operations-on-sorted-data' },
          ]
        },      
        {
          text: 'Advanced topics',
          collapsible: true,
          items: [
            { text: 'Exstream in depth', link: '/guide/exstream-in-depth' },
            { text: 'Extending Extream', link: '/guide/extending-exstream' },
          ]
        },
      ],
      '/reference/': [
        {
          text: 'Filtering',
          collapsible: true,
          items: [
            { text: 'filter', link: '/reference/filter' },
            { text: 'reject', link: '/reference/reject' },
            { text: 'find', link: '/reference/find' },
            { text: 'findWhere', link: '/reference/findWhere' },
            { text: 'compact', link: '/reference/compact' },
            { text: 'uniq', link: '/reference/uniq' },
            { text: 'uniqBy', link: '/reference/uniqBy' },
            { text: 'where', link: '/reference/where' },    
            { text: 'drop', link: '/reference/drop' },
            { text: 'head', link: '/reference/head' },
            { text: 'last', link: '/reference/last' },
            { text: 'slice', link: '/reference/slice' },
            { text: 'take', link: '/reference/take' },
          ]
        },
        {
          text: 'Transforming',
          collapsible: true,
          items: [
            { text: 'map', link: '/reference/map' },
            { text: 'omit', link: '/reference/omit' },
            { text: 'pick', link: '/reference/pick' },
            { text: 'pluck', link: '/reference/pluck' },
            { text: 'reduce', link: '/reference/reduce' },
            { text: 'reduce1', link: '/reference/reduce1' },
            { text: 'flatMap', link: '/reference/flatMap' },
            { text: 'flatten', link: '/reference/flatten' },
          ]
        },
        {
          text: 'Grouping',
          collapsible: true,
          items: [
            { text: 'collect', link: '/reference/collect' },
            { text: 'batch', link: '/reference/batch' },
            { text: 'keyBy', link: '/reference/keyBy' },
            { text: 'groupBy', link: '/reference/groupBy' },    
          ]
        },
        {
          text: 'Working with buffers',
          collapsible: true,
          items: [
            { text: 'split', link: '/reference/split' },
            { text: 'splitBy', link: '/reference/splitBy' },
            { text: 'csv', link: '/reference/csv' },
            { text: 'csvStringify', link: '/reference/csvStringify' },
            { text: 'decode', link: '/reference/decode' },
            { text: 'encode', link: '/reference/encode' },
          ]
        },
        {
          text: 'Flow control',
          collapsible: true,
          items: [
            { text: 'ratelimit', link: '/reference/ratelimit' },
            { text: 'throttle', link: '/reference/throttle' },
          ]
        },
        {
          text: 'Handling Promises',
          collapsible: true,
          items: [
            { text: 'resolve', link: '/reference/resolve' },
            { text: 'massThen', link: '/reference/massThen' },
            { text: 'massCatch', link: '/reference/massCatch' },
            { text: 'makeAsync', link: '/reference/makeAsync' },
            { text: 'asyncFilter', link: '/reference/asyncFilter' },
            { text: 'asyncReduce', link: '/reference/asyncReduce' },    
          ]
        },
        {
          text: 'Handling errors',
          collapsible: true,
          items: [
            { text: 'errors', link: '/reference/errors' },
            { text: 'stopOnError', link: '/reference/stopOnError' },
            { text: 'stopWhen', link: '/reference/stopWhen' },
          ]
        },
        {
          text: 'Sorting',
          collapsible: true,
          items: [
            { text: 'sort', link: '/reference/sort' },
            { text: 'sortBy', link: '/reference/sortBy' },
          ]
        },
        {
          text: 'Transforming sorted data sources',
          collapsible: true,
          items: [
            { text: 'sortedGroupBy', link: '/reference/sortedGroupBy' },
            { text: 'sortedJoin', link: '/reference/sortedJoin' },
          ]    
        },
        {
          text: 'Side effects',
          collapsible: true,
          items: [
            { text: 'tap', link: '/reference/tap' },            
          ]
        },
        {
          text: 'Combining streams',
          collapsible: true,
          items: [
            { text: 'merge', link: '/reference/merge' },
            { text: 'fork', link: '/reference/fork' },
            { text: 'observe', link: '/reference/observe' },
            { text: 'through', link: '/reference/through' },
            { text: 'pipeline', link: '/reference/pipeline' },
          ]
        },
        {
          text: 'Consuming streams',
          collapsible: true,
          items: [
            { text: 'toArray', link: '/reference/toArray' },
            { text: 'toPromise', link: '/reference/toPromise' },
            { text: 'pull', link: '/reference/pull' },
            { text: 'pipe', link: '/reference/pipe' },
            { text: 'each', link: '/reference/each' },
            { text: 'value', link: '/reference/value' },
            { text: 'values', link: '/reference/values' },
            { text: 'start', link: '/reference/start' },
            { text: 'consume', link: '/reference/consume' },
            { text: 'consumeSync', link: '/reference/consumeSync' },
          ]
        },
        {
          text: 'Node.js streams interop',
          collapsible: true,
          items: [
            { text: 'toAsyncIterator', link: '/reference/toAsyncIterator' },
            { text: 'toNodeStream', link: '/reference/toNodeStream' },
          ]
        },
        {
          text: 'Controlling data flow',
          collapsible: true,
          items: [
            { text: 'resume', link: '/reference/resume' },
            { text: 'pause', link: '/reference/pause' },
            { text: 'end', link: '/reference/end' },
            { text: 'destroy', link: '/reference/destroy' },
          ]
        }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Michele Triaca'
    } 
  }
})