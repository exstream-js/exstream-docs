# Basic concepts

## Flow structure 

A simple Exstream flow can be imagined as composed by 3 parts:

<style>   
  img.dark, html.dark img.light { display: none; }
  html.dark img.dark { display: block; }
</style>
<img class="dark" src="./img/exstream-graph-1.mmd-dark.svg">
<img class="light" src="./img/exstream-graph-1.mmd-light.svg">

The data flows from Source, is transformed by Transformer, and then flows to Destination. 
* <b>Source</b> can be an Array containing the actual data but can also be another Exstream instance, a Readable Node.js Stream, or other type of sources (see [Type of Sources](type-of-sources) to get a comprehensive list).
* <b>Transformer</b> is a composition of methods (like map, filters, reduce, etc) that performs the data manipulation
* <b>Destination</b> can be an Array, a Node.js writable stream, or a Promise that resolves with the results. Sometimes we don't even need a Destination, because we're using Exstream to control the flow of the data in an asynchronous context but we don't need to actually "pipe" that data to a Destination

::: info
A complex Stream, as we'll see in the [Forking and Merging](forking-and-merging) chapter, can involve more than 1 source and more than 1 destination, but let's start easy for now
:::

## Laziness

An Exstream flow is lazy by default. This means we're only definining what to do with the data, but we'll need to call a consumption method (see also [Consumption methods](consumption-methods)) to actually start the flow.

Consider this snippet of code:

```js
const myFlow = _([1,2,3]).reduce1((sum, x) => sum + x)
```

In the above example, we have defined a flow called `myFlow`, that sums together all the source values, emitting a single item containing the sum. As said, however, the flow will not start automatically, because we have only defined the intended behaviour. This is called <i>lazy evaluation</i>. 

::: tip
The same code written in plain javascript (`[1,2,3].reduce((sum, x) => sum + x, 0)`) gives you back directly the result of the sum. This is an example of an <i>eager evaluation</i>
:::

To actually consume the flow, we have to call the consumption method that best fit our needs. For example, we can just store the value in a variable calling the `.value()` consumption method:

```js
const myFlow = _([1,2,3]).reduce1((sum, x) => sum + x)
const res = myFlow.value()
//res is 6
```

In the next sections we'll see a couple of typical examples to better understand the different way in which we can define a flow

## Synchronous vs Asynchronous

Exstream is able to handle both synchronous and asynchronous data flows. 

A synchronous flow is one in which:
* <b>The Source emits data synchronously</b> (examples of synchronous sources are an Array or, more generically, an iterator)
* <b>The Transformer does not involve any asynchronous transform</b> (for example `resolve` or `asyncFilter`)
* <b>The Destination is an in-memory variable</b>

::: warning
In all the other cases the Stream is considered asynchronous
:::

A synchronous Stream is consumed (as you can imagine) synchronously. So, for example:

```js
const _ = require('exstream.js')

const values = _(['a', 'b', 'c'])
  .map(x => x.toUpperCase())
  .values()

//values is already available and is equal to ['A', 'B', 'C']
console.log(values)
```

Instead, an asynchronous Stream behaves in a different way:

```js
const _ = require('exstream.js')

const values = _(['a', 'b', 'c'])
  .map(async x => x.toUpperCase())
  .resolve()
  .values()

console.log(values)
// values is a Promise!!!

// we need to wait for the stream to finish 
// before getting access to the results
values.then(results => {
  console.log(results)
  //results is ['A', 'B', 'C']
})
```

::: tip
We're seeing here one of the most common consumption methods: `.values()`. This method collects all the values emitted by the stream and returns an array containing the results in case the stream is synchronous, or a `Promise` that resolves with an array containing the results in case the Stream is asynchronous.

We'll see other consumption methods in the next examples
:::

## Back pressure

TODO  

## Synchronous examples

A synchronous flow behaves exactly like a lodash chain, and you can use it every time you want to perform data manipulation of in-memory data structures. A synchronous flow takes an Iterator as source, does not involve any asynchronous transform and must be consumed calling `.value()` or `.values()` .

Examples:

### Count words in a string:
```js
const numOfWords = _('Tempor magna cillum eiusmod qui mollit.')
  .splitBy(/\s/)
  .reduce(sum => sum + 1, 0)
  .value()

console.log(numOfWords)
//res is 6
```

### Data manipulations: 
```js
// in this example we want a unique list of all the books

const authors = [
  { name: 'mario rossi', books: ['book1', 'book2'] },
  { name: 'giorgio verdi', books: ['book1', 'book3'] }
]

const books = _(authors)
  .flatMap(author => author.books)
  .uniq()
  .values()

console.log(books)
//books is ['book1', 'book2', 'book3']
```

### An example with a custom iterator
```js
// this generator builds an infinite Iterator
// that emits random 4chars strings
function * randomStringGenerator () {
  const alphabet = 'abcdefghijklmnopqrstuvz'.split('')
  const randomChar = () => alphabet[Math.round(Math.random() * (alphabet.length - 1))]
  while(true) yield Array(4).fill(0).map(randomChar).join('')
}

// We want to find the first 10 unique strings that start with azk
const first10azkStrings = _(randomStringGenerator())
  .filter(x => x.startsWith('azk'))
  .uniq()
  .take(10)
  .values()

console.log(first10azkStrings)
```

### Caesar Cipher
```js
// in this example we build a reusable, configurable transformer 
// thanks to _.pipeline. we'll see modularitazion in more detail
// in the next chapters
const cipher = positions => _.pipeline()
  .map(char => char.charCodeAt(0))
  .map(asciiCode => asciiCode + positions)
  .map(asciiCode => asciiCode > 125 ? asciiCode - 126 + 33 : asciiCode)
  .map(String.fromCharCode)

const cyphered = _('Nostrud mollit Lorem sint occaecat nostrud cillum')
  .through(cipher(4))
  .values()
  .join('')

console.log(cyphered)
// cyphered is Rswxvyh$qsppmx$Psviq$wmrx$sggeigex$rswxvyh$gmppyq
```

## Asynchronous examples

An Exstream flow can handle asynchronous transforms without troubles. This open the possibility to make an HTTP call, an SQL query, calling an S3 API, etc, using the same clean API

Examples:

### Write 10M records on a Postgres database in chunks of 10000
```js
const { Client } = require('pg')

/**
 *   Builds an infinite Iterator that emits records with
 *   random data
 */
function * randomRecordGenerator () {
  const alphabet = 'abcdefghijklmnopqrstuvz'.split('')
  const randomChar = () => alphabet[Math.round(Math.random() * (alphabet.length - 1))]
  const randomWord = (numChars) => [...Array(numChars)].map(randomChar).join('')
  while(true) yield { 
    FirstName: randomWord(4), 
    LastName: randomWord(4), 
    Email: randomWord(4) + '@google.com' 
  }
}

/**
 *  Builds a postgres query with $n placeholders
 */
const genQuery = (numOfRecords, numOfFields) => {
  const sqlValues = _(numOfRecords * numOfFields)
    .map(i => '$' + i)
    .batch(numOfFields)
    .map(x => `(${x.join(', ')})`)
    .values()
    .join(', ')

  return `INSERT INTO users(name, email) VALUES ${sqlValues} RETURNING *`
}

/**
 *  The actual flow
 */
;(async () => {
  const client = new Client()
  await client.connect()

  _(randomRecordGenerator())
    .map(record => [record.FirstName, record.Email])
    .take(1000000)
    .batch(10000)   
    .map(recordValues => client.query(
      genQuery(recordValues.length, 2), 
      recordValues
    ))
    .resolve()
    .start()
})()


```

In the above example we've used the `.start()` consumption method. This method is useful when we are not interested to pipe our stream in another stream. That's because our data has already been piped to postgres through the async map. The flow can be refactored to see it clearly:

```js
const createPostgresWriteStream = () => _.pipeline()
  .batch(10000)   
  .map(recordValues => client.query(
    genQuery(recordValues.length, 2), 
    recordValues
  ))
  .resolve()
  .start()


_(randomRecordGenerator())
    .map(record => [record.FirstName, record.Email])
    .take(1000000)
    .pipe(createPostgresWriteStream())
})()
```

As you can see, we have created in essence a new Writable stream and we have piped our data to the new Writable. the Writable buffers the data in block of 10000 records and bulk loads those records to postgres
## Streaming examples