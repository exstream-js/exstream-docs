# Basic concepts

## Flow structure 

A simple Exstream flow can be imagined as composed by 3 parts:

<style>   
  img.dark, html.dark img.light { display: none; }
  html.dark img.dark { display: block; }
</style>
<img class="dark" src="img/exstream-graph-1.mmd-dark.svg">
<img class="light" src="img/exstream-graph-1.mmd-light.svg">

The data flows from Source, is transformed by Transformer, and then flows to Destination. 
* <b>Source</b> can be an Array containing the actual data but can also be another Exstream instance, a Readable Node.js Stream, or other type of sources (see [Type of Sources](type-of-sources) to get a comprehensive list).
* <b>Transformer</b> is a composition of methods (like map, filters, reduce, etc) that performs the data manipulation
* <b>Destination</b> can be an Array, a Node.js writable stream, or a Promise that resolves with the results. Sometimes we don't even need a Destination, because we're using Exstream to control the flow of the data in an asynchronous context but we don't need to actually "pipe" that data to a Destination

::: info
A complex Stream, as we'll see in the [Forking and Merging](forking-and-merging) chapter, can involve more than 1 source and more than 1 destination, but let's start easy for now
:::

## Laziness

An Exstream flow is lazy by default. This means we're only definining what to do with the data, but we'll need to call a consumption method (see also [Stream consumption](stream-consumption)) to actually start the flow.

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

// we need to wait for the stream to finish to get access to the results
values.then(results => {
  console.log(results)
  //results is ['A', 'B', 'C']
})
```

::: tip
We're seeing here one of the most common consumption methods: `.values()`. This method collects all the values emitted by the stream and returns an array containing the results in case the stream is synchronous, or a `Promise` that resolves with an array containing the results in case the Stream is asynchronous.

We'll see other consumption methods in the next examples
:::

## Synchronous use cases

## Asynchronous use cases


## Streaming use cases