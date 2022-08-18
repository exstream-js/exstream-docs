import { defineConfig } from 'vitepress'

export default defineConfig({  
  title: 'Exstream',
  description: 'Exstream.js - The library to handle sync/async/streaming data flows',
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
      },
      {
        text: 'Guide',
        collapsible: true,
        items: [
          { text: 'Basic concepts', link: '/guide/basic-concepts' },
          { text: 'Lazy vs Eager', link: '/guide/lazy-vs-eager' },
          { text: 'Type of sources', link: '/guide/type-of-sources' },
          { text: 'Stream consumption', link: '/guide/stream-consumption' },
          { text: 'Modularization', link: '/guide/modularization' },
          { text: 'Forking and merging', link: '/guide/forking-and-merging' },
          { text: 'Error handling', link: '/guide/error-handling' },
          { text: 'Operations on sorted data', link: '/guide/operations-on-sorted-data' },
        ]
      },      
      {
        text: 'Filtering',
        collapsible: true,
        items: [
          { text: 'filter', link: '/guide/reference/filter' },
          { text: 'reject', link: '/guide/reference/reject' },
          { text: 'find', link: '/guide/reference/find' },
          { text: 'findWhere', link: '/guide/reference/findWhere' },
          { text: 'compact', link: '/guide/reference/compact' },
          { text: 'uniq', link: '/guide/reference/uniq' },
          { text: 'uniqBy', link: '/guide/reference/uniqBy' },
          { text: 'where', link: '/guide/reference/where' },    
          { text: 'drop', link: '/guide/reference/drop' },
          { text: 'head', link: '/guide/reference/head' },
          { text: 'last', link: '/guide/reference/last' },
          { text: 'slice', link: '/guide/reference/slice' },
          { text: 'take', link: '/guide/reference/take' },
        ]
      },
      {
        text: 'Transforming',
        collapsible: true,
        items: [
          { text: 'map', link: '/guide/reference/map' },
          { text: 'omit', link: '/guide/reference/omit' },
          { text: 'pick', link: '/guide/reference/pick' },
          { text: 'pluck', link: '/guide/reference/pluck' },
          { text: 'reduce', link: '/guide/reference/reduce' },
          { text: 'reduce1', link: '/guide/reference/reduce1' },
          { text: 'flatMap', link: '/guide/reference/flatMap' },
          { text: 'flatten', link: '/guide/reference/flatten' },
        ]
      },
      {
        text: 'Grouping',
        collapsible: true,
        items: [
          { text: 'collect', link: '/guide/reference/collect' },
          { text: 'batch', link: '/guide/reference/batch' },
          { text: 'keyBy', link: '/guide/reference/keyBy' },
          { text: 'groupBy', link: '/guide/reference/groupBy' },    
        ]
      },
      {
        text: 'Working with buffers',
        collapsible: true,
        items: [
          { text: 'split', link: '/guide/reference/split' },
          { text: 'splitBy', link: '/guide/reference/splitBy' },
          { text: 'csv', link: '/guide/reference/csv' },
          { text: 'csvStringify', link: '/guide/reference/csvStringify' },
          { text: 'decode', link: '/guide/reference/decode' },
          { text: 'encode', link: '/guide/reference/encode' },
        ]
      },
      {
        text: 'Flow control',
        collapsible: true,
        items: [
          { text: 'ratelimit', link: '/guide/reference/ratelimit' },
          { text: 'throttle', link: '/guide/reference/throttle' },
        ]
      },
      {
        text: 'Handling Promises',
        collapsible: true,
        items: [
          { text: 'resolve', link: '/guide/reference/resolve' },
          { text: 'massThen', link: '/guide/reference/massThen' },
          { text: 'massCatch', link: '/guide/reference/massCatch' },
          { text: 'makeAsync', link: '/guide/reference/makeAsync' },
          { text: 'asyncFilter', link: '/guide/reference/asyncFilter' },
          { text: 'asyncReduce', link: '/guide/reference/asyncReduce' },    
        ]
      },
      {
        text: 'Handling errors',
        collapsible: true,
        items: [
          { text: 'errors', link: '/guide/reference/errors' },
          { text: 'stopOnError', link: '/guide/reference/stopOnError' },
          { text: 'stopWhen', link: '/guide/reference/stopWhen' },
        ]
      },
      {
        text: 'Sorting',
        collapsible: true,
        items: [
          { text: 'sort', link: '/guide/reference/sort' },
          { text: 'sortBy', link: '/guide/reference/sortBy' },
        ]
      },
      {
        text: 'Transforming sorted data sources',
        collapsible: true,
        items: [
          { text: 'sortedGroupBy', link: '/guide/reference/sortedGroupBy' },
          { text: 'sortedJoin', link: '/guide/reference/sortedJoin' },
        ]    
      },
      {
        text: 'Side effects',
        collapsible: true,
        items: [
          { text: 'tap', link: '/guide/reference/tap' },            
        ]
      },
      {
        text: 'Combining streams',
        collapsible: true,
        items: [
          { text: 'merge', link: '/guide/reference/merge' },
          { text: 'fork', link: '/guide/reference/fork' },
          { text: 'observe', link: '/guide/reference/observe' },
          { text: 'through', link: '/guide/reference/through' },
          { text: 'pipeline', link: '/guide/reference/pipeline' },
        ]
      },
      {
        text: 'Consuming streams',
        collapsible: true,
        items: [
          { text: 'toArray', link: '/guide/reference/toArray' },
          { text: 'toPromise', link: '/guide/reference/toPromise' },
          { text: 'pull', link: '/guide/reference/pull' },
          { text: 'pipe', link: '/guide/reference/pipe' },
          { text: 'each', link: '/guide/reference/each' },
          { text: 'value', link: '/guide/reference/value' },
          { text: 'values', link: '/guide/reference/values' },
          { text: 'start', link: '/guide/reference/start' },
          { text: 'consume', link: '/guide/reference/consume' },
          { text: 'consumeSync', link: '/guide/reference/consumeSync' },
        ]
      },
      {
        text: 'Node.js streams interop',
        collapsible: true,
        items: [
          { text: 'toAsyncIterator', link: '/guide/reference/toAsyncIterator' },
          { text: 'toNodeStream', link: '/guide/reference/toNodeStream' },
        ]
      },
      {
        text: 'Controlling data flow',
        collapsible: true,
        items: [
          { text: 'resume', link: '/guide/reference/resume' },
          { text: 'pause', link: '/guide/reference/pause' },
          { text: 'end', link: '/guide/reference/end' },
          { text: 'destroy', link: '/guide/reference/destroy' },
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Michele Triaca'
    } 
  }
})