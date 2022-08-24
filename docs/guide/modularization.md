# Modularization

Consider this example:

```js
_(csvSource)
  .csv({header: true})
  .map(normalizeNames)
  .filter(italianNames)
  .uniqBy(uniqByName)
  .batch(1000)
  .map(uploadToPostgres)
  .resolve(2)
  .start()
```

This flow is doing a couple of different things in a relatively complex chain. Many real use cases are even more complex and difficult to read. In this cases, the Stream can be modularized thanks to the `_.pipeline()` function

The `_.pipeline()` function let you create a transform or a writable stream that can be used in an Exstream chain thanks to the `.through` and `.pipe` functions. The above example can be refactored like this:

```js
const getNormalizedItalianNames = () => _.pipeline()
  .map(normalizeNames)
  .filter(italianNames)
  .uniqBy(uniqByName)

const bulkUploadToPostgres => (batchSize, parallelism) => _.pipeline()
  .batch(batchSize)
  .map(uploadToPostgres)
  .resolve(parallelism)
  .start()

const mainFlow = _(csvSource)
  .csv({header: true})
  .through(getNormalizedItalianNames())
  .pipe(bulkUploadToPostgres(1000, 2))
```

As you can see, the code is now way more readable.

A pipeline can also be used in a vanilla Node.js stream chain:

```js
const getNormalizedItalianNamesTransformStream = () => _.pipeline()
  .map(normalizeNames)
  .filter(italianNames)
  .uniqBy(uniqByName)
  .toNodeStream()

fs.createReadStream('input.csv')
  .pipe(csv.parse())
  .pipe(getNormalizedItalianNamesTransformStream())
  .pipe(csv.stringify())
  .pipe(fs.createWriteStream('output.csv'))
```

As we'll see in the next chapter, a stream can be forked and many source streams can be merged together, and modularization is particularly useful in those cases to write clean and readable code