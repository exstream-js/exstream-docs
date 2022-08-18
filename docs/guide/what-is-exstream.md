# Introduction

## What is Exstream?

Exstream is a library that aims to provide a unified api to handle data processing tasks, merging toghether 3 different domains: synchronous operations, asynchronous operations, and streams. It builds on top of plain Node.js modules, and enforces the use of a "light-functional" programming paradigm. With exstream it is possible to build memory efficient data flows in a clean and readable way, being them simple or complex.

Here is a minimal example:

```js
const _ = require('exstream.js')

const res = _([1,2,3])
  .map(x => x * 2)
  .filter(x => x < 6)
  .values()

//res is [2, 4]
```

The above example demonstrates two of the core features of Exstream:

* <b>Light-Functional approach (*)</b>: exstream enforces the use of well-known functional patterns like map, reduce, filter and many others. 

* <b>A simple, well-known api</b>: this example is almost equal, with minimum differences, to a [lodash chain](https://lodash.com/docs/4.17.15#chain) and is also very similar to the code you would write in plain javascript. But as we will see in this guide, with exstream you can do a lot more, joining together streams and asynchronous transformation and controlling the data flow, using the same clean syntax

::: info *
We call it <b>Light</b>-Functional because FP involves specific math/notation/terminology that this library don't follow in a 100% <i>orthodox</i> way. This happens because we're seeking to strike a pragmatic balance between the clear undeniable benefits of FP, and the need to ship workable, maintainable JS. JS is, in fact, not a pure FP language in that, for example, lacks immutability.

Check out [Functional Light JS](https://github.com/getify/Functional-Light-JS) if you want to know more about FP in Javascript
:::

## Motivation

Working with node streams is not easy at all. Also writing a minimum complex chain of asynchronous tasks is not trivial when you have to take care of rate limiting, throttling, partial parallelism, error handling, etc.

The idea behind this library is not new. Some years ago I discovered a beatiful library called [Highland](https://caolan.github.io/highland/), that does essentially the same thing exstream does. The reasons why I wrote exstream are essentially 3:

* Highland is abandoned (no more commits from 2019)
* Highland was written before Promise was a first class citizien, and even before ES5
* There were lot of open issues (affecting also myself) 

Exstream share some similarities with highland in its api, but it's a rewrite from scratch with also many differences and improvements:

* A better handling of synchronous tasks
* A better handling of promises
* It is generally faster
* The api can be easily extendend
* It ships powerful high level functions (like CSV parsing/serializing, streaming join, groupBy of sorted data sets, and others)
* It does not suffer of many bugs that are open since years

That said, a great tribute to caolan for his brilliant work, hoping that this library can continue where Highland left off