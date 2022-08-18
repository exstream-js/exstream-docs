# Type of sources

The main entry point to the Exstream API is the Stream constructor `_(source)`.
`source` can be a variety of things:

## No source

If you define a Stream without a source, you can write the values yourself programmatically (there are few use cases in which it could be useful)

```js
const _ = require('exstream.js')

const source = _()
source.write(1)
source.write(2)

// after 100 milliseconds, write another value 
// to the stream and then ends the source
setTimeout(() => {
  source.write(3)
  source.end()
}, 100)

source
  .map(x => x * 2)
  .toPromise()
  .then(res => {
    console.log(res)
    //res is [2, 4, 6]
  })
```

## Iterator (ex. an Array, a Set, a Map, an Object, a String)
```js
const _ = require('exstream.js')

// this stream will emit 1, 2, 3 as values
const s1 = _([1,2,3]) 

// this stream will emit 1, 2, 3 as values
const s2 = _(new Set([1,2,3])) 

// this stream will emit a, b, c, d, e as values
const s3 = _('abcde') 

// this stream will emit ['a', 1] and ['b', 2] as values
const s4 = _({a: 1, b: 2}) 

// this stream will emit ['a', 1] and ['b', 2] as values
const s5 = _(new Map({a: 1, b: 2})) 
```

## Async iterator

```js
const _ = require('exstream.js')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function * slowArrayEmitter(arr) {
  for(const x of arr) {
    await sleep(100)
    yield x
  }
}

// this stream will emit 1, 2, 3 as values, one value every 100ms
const s1 = _(slowArrayEmitter([1,2,3])) 
```

## Readable Stream

```js
const _ = require('exstream.js')
const fs = require('fs')

// wrapping a Node Readable Stream so you can easily manipulate it
// in this example we are converting the readable stream in a stream 
// of records, we are performing a filter and then we are converting 
//back to csv and write the result on another file
const s1 = _(fs.createReadStream('input.csv'))
  .csv({header: true})
  .filter(x => x.name.startsWith('a'))
  .csvStringify({header: true})
  .pipe(fs.createWriteStream('output.csv'))
```

## Promise

```js
const _ = require('exstream.js')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchData = async () => {
  await sleep(100)
  return [1,2,3]
}

 // this stream will emit the result of the promise, 
 // so a single item containing [1,2,3]
const s1 = _(fetchData())

// you can flat the result in single items to process them separately
s1
  .flatten()
  .map(x => x * 2)
  .toPromise()
  .then(res => {
    console.log(res)
    //res is [2, 4, 6]
  })
```

## Generator function

A generator function is a function which provides values for the Stream. They are lazy and can be infinite, they can also be asynchronous (for example, making a HTTP request). You emit values on the Stream by calling `write(val)`. Once it has been called, the generator function will not be called again unless you call `next()`. This call to next() will signal you've finished processing the current data and allow for the generator function to be called again. If the Stream is still being consumed the generator function will then be called again. To end the stream, you should call `write(_.nil)`

```js
const _ = require('exstream.js')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// this stream will emit a random number < 0.5 every 100ms, 
// and will end at the first occurrence of a random number >= 0.5
const s1 = _(async (write, next) => {    
  await sleep(100)
  const result = Math.random()
  write(result)
  if(result > 0.5) write(_.nil)
  else next()
})
```

You can also redirect a generator Stream by passing a new source Stream to read from to next. For example: `next(otherStream)` - then any subsequent calls will be made to the new source. This is useful to implement recursive generators, like the following <s>totally useless</s> academic example:

```js
const _ = require('exstream.js')

const data = [
  [1,2,3], 
  [4,5,6]
]

const processDataBlock = idx => (write, next) => {    
  if(idx > data.length) {
    write(_.nil)
  } else if(data[idx].length === 0) {
    next(processDataBlock(idx + 1))  
  } else {
    const item = data[idx].pop()
    write(item)
    next()
  }
) 


// this stream will emit 1, 2, 3, 4, 5, 6 as values
const s1 = _(processDataBlock(0))
```


