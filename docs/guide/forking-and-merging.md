# Forking and Merging

## Forking

A stream can be splitted to perform parallel transformations and to pipe data to different destinations. Exstream offers two different API to accomplish this task: `Exstream.fork` and `Exstream.observe`

### Exstream.fork(disableAutostart = false)

Calling `Exstream.fork` will create a new Exstream instance that you can use to perform your parallel data manipulations:

```js
const s1 = _(source).fork().map(x => x * 2).pipe(writable1)
const s2 = _(source).fork().map(x => x * 3).pipe(writable2)
```

Each fork share the backpressure with the others. So if, for example, `writable1` is slow, it pauses source and also `s2` will be paused. 

A forked stream will start in the next tick to avoid losing data while you are building all the forks. For this reason, an Exstream instance created with fork is always considered to be asynchronous.

There are cases in which you want to build different forks in different ticks. In this case you have to set `disableAutoStart` to `true` and to manual start the source after you've built all the forks:

```js
const s = _(source)
const fork1 = s.fork(true).map(x => x * 2).pipe(writable1)
setTimeout(() => {
  const fork2 = s.fork(true).map(x => x * 3).pipe(writable2)
  s.start()
}, 500)
```


### Exstream.observe()

TODO

## Merging

TODO

### Exstream.merge()

TODO