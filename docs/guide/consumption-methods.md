# Consumption methods

An Exstream flow is lazy by default. To consume a stream we have to call a consumption method.
There are many consumption methods that are suitable for various scenarios:

## Exstream.values()

Collects all the results of the flow in an array. If the stream is synchronous, it returns the array. If the stream is asynchronous, it returns a Promise that resolves with the array

```js
const results = _([1,2,3]).map(x => x * 2).values()

const resultsAsync = await _([1,2,3]).map(async x => x * 2).resolve().values()
```

## Exstream.value()

Same as `Exstream.values()` but it returns a single value. It's useful when the last method of the chain is a method like `Exstream.reduce` or `Exstream.groupBy` that emit a single value:

```js
const sum = _([1,2,3]).reduce1((sum, x) => sum + x).value()
```

## Exstream.toPromise()

Same as `Exstream.values()` but it always returns a Promise, regardless of the Stream being synchronous or not

```js
const results = await _([1,2,3]).map(x => x * 2).toPromise()
```

## Exstream.start()

It just starts the Stream

```js
_(1000)
  .tap(console.log)
  .start()

// will log 1, 2, 3, ... 1000 to the console
```

`Exstream.start()` is often used to build pipelines that acts as a Writable Stream:

```js
const mongoWritable = _.pipeline()
  .batch(1000)
  .map(records => writeToMongo(records))
  .resolve()
  .start()

_(myRecords).pipe(mongoWritable)
```

## Exstream.each(callback)

It consumes the Stream and it calls the callback function for each value emitted

```js
_([1,2,3])
  .map(x => x * 2)
  .each(x => {
    console.log(x)
  })
```

## Exstream.toArray(callback)

It collects all the emitted items in an Array and it calls the callback function with that Array:

```js
_([1,2,3])
  .map(x => x * 2)
  .toArray(results => {
    console.log(results)
    //results is [2,4,6]
  })
```

## Exstream.pipe(target)

It pipes the chain to a Node.js Stream

```js
_(randomStringGenerator())
  .pipe(process.stdout)
```

::: warning
`.pipe(target)` can be used also to pipe our chain to an Exstream pipeline or another Exstream flow. In those cases calling this method is equivalent to call [`.through`](/reference/through.html), so the Stream is consumed automatically only if you pass a vanilla Node.js Exstream.
:::