# Exstream in depth

## Exstream as a chain of streams

Consider this example:

```js
const _ = require('exstream.js')

const sourceStream = _([1,2,3])
const multipliedStream = sourceStream.map(x => x * 2)
const filteredStream = multipliedStream.filter(x => x < 6)

const res = filteredStream.values()
// res is [2, 4]
```

The main concept that you should keep in mind to understand how exstream works, is that an exstream chain is actually a chain of streams: 
* `sourceStream` is equivalent to a `Readable` Node.js stream. 
* `multipliedStream` is equivalent to a `Transform` stream that uses `sourceStream` as source 
* `filteredStream` is equivalent to a `Transform` stream that uses `multipliedStream` as source 
* Calling `.values()` is equivalent to pipe `filteredStream` in a `Writable` stream that pushes the values emitted by `filteredStream` in an array

This code is functionally equivalent to this:

```js
const { Readable, Transform, Writable } = require('stream')

function * sourceIterator(arr) {
  for(const x of arr) yield arr
}

const sourceStream = Readable.from(sourceIterator([1,2,3]))

const multiplyBy2 = new Transform({
  objectMode: true,
  transform: function (chunk, enc, cb) {
    this.push(chunk * 2)
    cb()
  }
})

const filterIfLt6 = new Transform({
  objectMode: true,
  transform: function (chunk, enc, cb) {
    if(chunk < 6) this.push(chunk)
    cb()
  }
})

const res = []
const writeValues = new Writable({
  objectMode: true,
  write (chunk, enc, cb) {    
    res.push(rec)
    cb()
  }
})

sourceStream
  .pipe(multiplyBy2)
  .pipe(filterIfLt6)
  .pipe(writeValues)
  .on('finish', () => {
    console.log(res)
    // res is [2, 4]
  })

console.log(res)
//res is empty!
```

The main differences are 2:
* The exstream version is way more compact and readable that the plain node.js version
* If the source and the transformation chain are synchronous, the computation is synchronous as well, while with standard Node.js streams you have to listen to the finish event in order to have `res` populated. So, exstream is async only when needed. This let exstream achieve superior speed in many use cases compared with a plain Node.js stream implementation.

## Back-Pressure

TODO

## Performance considerations

TODO
