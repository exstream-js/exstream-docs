# Getting started

Current stable release (0.x) requires at least Node.js 12.x.

## Installation

```sh
yarn add exstream.js

# or

npm install exstream.js
```

## Quick start

First of all, we have to import the library
```js
const _ = require('exstram.js')
```

An exstream flow is very similar to a `lodash` chain. We also use the `_` symbol for convenience, but feel free to name it as you prefer!

Consider this simple chain: 

```js
const output = _(source)
  .map(...)
  .filter(...)
  .pluck(...)
  ...
  .values()
```

In its simplest form, `source` is an array and the stream is synchronous. The main difference from `lodash` or similar libraries, that makes `exstream` so powerful, is that the `source`'s items <i>flow</i> through the transformation chain one at a time.

Consider this example

```js
const output = _([1,2])
  .map(x => x * 2)
  .map(x => x / 2)
  .values()
```

In this case, `1` will be processed by the first `map`, then will go through the second `map`, than will be collected by the `values` method. After the first item reach the end of the flow, the second item will be processed. We'll see the consequences of this behaviour in detail in the next sections, but -- SPOILER ALERT -- , this enables the same chain to handle async transformations, to use <i>streams</i> and <i>async iterators</i> as sources, to use this chain as a node transform stream, and a lot more!

So let's start with some examples

### "I would like to transform an array"

It's super easy. Just wrap the array into an exstream instance and perform your transformations. 

```js
const _ = require('exstream.js');

const res = _([1, 2, 3])
  .map(x => x * 2)  // every item of the array will be multiplied by 2
  .filter(x => x % 2 === 0) // odd items will be filtered out
  .values() // collect all the results in an array

// res is [2, 6]
```

### "Ha! I could just have used the standard array methods or lodash"

That's true, but this is only the beginning

### "What if I need to perform an asynchronous transformation?"

With `lodash`, you're stuck. With plain javascript, things get complicated fast.
With `exstream`, it's straightforward

```js
const _ = require('exstream.js');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const slowAsyncMultiply = async x => {
  await sleep(100)
  return x * 2
}

const resPromise = _([1, 2, 3])
  // this map sleeps for 100ms and then returns the item multiplied by 2
  .map(slowAsyncMultiply)
  // the previous map transforms every item in a promise. 
  // With resolve, we are resolving the promises one at a time 
  .resolve()
  // Now the items are the results of the promises. 
  // The computation is asynchronous, so values returns a promise 
  .values() 

//Let's wait for the stream to finish
resPromise.then(res => {
  console.log(res)  
  // res is [2, 4, 6]
})
```

### "That's great, but I would like to perform 2 asynchronous multiplies at a time..."

Just pass the desired degree of parallelism to `.resolve` (in this case `.resolve(2)`)

### "I also need to perform a maximum of 2 multiplies every 100 ms..."

Use `.rateLimit` to control the rate of the data flow

```js
const _ = require('exstream.js');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const slowAsyncMultiply = async x => {
  await sleep(100)
  return x * 2
}

const resPromise = _([1, 2, 3])
  // emit a maximum of 2 items every 100 ms
  .rateLimit(2, 100)
  // sleep for 100ms and then returns the item multiplied by 2
  .map(slowAsyncMultiply)
  // the previous map transforms every item in a promise. 
  // With .resolve, we are resolving the promises (two at a time)
  .resolve(2)
  // Now the items are the results of the promises. 
  // The computation is asynchronous, so .values returns a promise 
  .values() 

//Let's wait for the stream to finish
resPromise.then(res => {
  console.log(res)  
  // res is [2, 4, 6]
})
```

### "😮 impressive! But the problem is that my source is not an array. It is a gzipped txt file..."

Here things start becoming interesting. But `exstream` can do the job easily:

Let's assume to have a `input.txt` file containing, when unzipped, something like this:
```text
1
2
3
```

We just need to read the file and unzip it using the standard node streams, combined in an exstream chain:

```js
const _ = require('exstream.js');
const fs = require('fs')
const zlib = require('zlib')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const slowAsyncMultiply = async x => {
  await sleep(100)
  return x * 2
}

const resPromise = _(fs.createReadStream('input.txt.gz')) // the source can be a node stream
  // node transform streams can be used in an exstream chain thanks to .through  
  .through(zlib.createGunzip())
  // now we have a flow of unzipped buffers. Let's convert them in a flow of numbers.
  //.split convert the stream of buffers in a stream of text lines, splitting the text by newline delimiters
  .split()  
  // convert the strings in numbers
  .map(x => parseInt(x, 10))
  // emit a maximum of 2 items every 100 ms
  .rateLimit(2, 100)
  // sleep for 100ms and then returns the item multiplied by 2
  .map(slowAsyncMultiply)
  // the previous map transforms every item in a promise. 
  // With resolve, we are resolving the promises (two at a time)
  .resolve(2)
  // Now the items are the results of the promises. 
  // The computation is asynchronous, so values returns a promise 
  .values() 

//Let's wait for the stream to finish
resPromise.then(res => {
  console.log(res)  
  // res is [2, 4, 6]
})
```

### "Awesome! But I forgot to mention that the input.txt file is 16GB and i need to save the results in another gzipped file..."

<s>WTF</s> no problem at all! An exstream chain is already a compatible node stream, so we just need to pipe the flow to a writable node stream:

```js
const _ = require('exstream.js');
const fs = require('fs')
const zlib = require('zlib')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const slowAsyncMultiply = async x => {
  await sleep(100)
  return x * 2
}

const resPromise = _(fs.createReadStream('input.txt.gz')) // the source can be a node stream
  // node transform streams can be used in an exstream chain thanks to .through  
  .through(zlib.createGunzip())
  // now we have a flow of unzipped buffers. Let's convert them in a flow of numbers.
  //.split convert the stream of buffers in a stream of text lines, splitting the text by newline delimiters
  .split()  
  // convert the strings in numbers
  .map(x => parseInt(x, 10))
  // emit a maximum of 2 items every 100 ms
  .rateLimit(2, 100)
  // sleep for 100ms and then returns the item multiplied by 2
  .map(slowAsyncMultiply)
  // the previous map transforms every item in a promise. 
  // With resolve, we are resolving the promises (two at a time)
  .resolve(2)
  // let's convert the stream of numbers in a stream of newline delimited strings
  .map(x => x.toString() + '\n')
  // convert the stream of strings in a stream of zipped buffers
  .through(zlib.createGzip())
  // and pipe them to a writable file stream
  .pipe(fs.createWriteStream('out.txt.gz')) 
  // we can listen to the finish event of the writable stream to do something at the end
  .on('finish', () => {
    console.log('end')
  })
```






