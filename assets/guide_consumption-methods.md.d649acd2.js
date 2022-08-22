import{_ as s,c as a,o as n,a as l}from"./app.cc08e96b.js";const i=JSON.parse('{"title":"Consumption methods","description":"","frontmatter":{},"headers":[{"level":2,"title":"Stream.values()","slug":"stream-values"},{"level":2,"title":"Stream.value()","slug":"stream-value"},{"level":2,"title":"Stream.toPromise()","slug":"stream-topromise"},{"level":2,"title":"Stream.start()","slug":"stream-start"},{"level":2,"title":"Stream.each(callback)","slug":"stream-each-callback"},{"level":2,"title":"Stream.toArray(callback)","slug":"stream-toarray-callback"}],"relativePath":"guide/consumption-methods.md","lastUpdated":1661151859000}'),o={name:"guide/consumption-methods.md"},p=l(`<h1 id="consumption-methods" tabindex="-1">Consumption methods <a class="header-anchor" href="#consumption-methods" aria-hidden="true">#</a></h1><p>An Exstream flow is lazy by default. To consume a stream we have to call a consumption method. There are many consumption methods that are suitable for various scenarios:</p><h2 id="stream-values" tabindex="-1">Stream.values() <a class="header-anchor" href="#stream-values" aria-hidden="true">#</a></h2><p>Collects all the results of the flow in an array. If the stream is synchronous, it returns the array. If the stream is asynchronous, it returns a Promise that resolves with the array</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> results </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">values</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> resultsAsync </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">values</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="stream-value" tabindex="-1">Stream.value() <a class="header-anchor" href="#stream-value" aria-hidden="true">#</a></h2><p>Same as <code>Stream.values()</code> but it returns a single value. It&#39;s useful when the last method of the chain is a method like <code>Stream.reduce</code> or <code>Stream.groupBy</code> that emit a single value:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> sum </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce1</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">sum</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> sum </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> x)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">value</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="stream-topromise" tabindex="-1">Stream.toPromise() <a class="header-anchor" href="#stream-topromise" aria-hidden="true">#</a></h2><p>Same as <code>Stream.values()</code> but it always returns a Promise, regardless of the Stream being synchronous or not</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> results </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toPromise</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="stream-start" tabindex="-1">Stream.start() <a class="header-anchor" href="#stream-start" aria-hidden="true">#</a></h2><p>It just starts the Stream</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">tap</span><span style="color:#A6ACCD;">(console</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">log)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// will log 1, 2, 3, ... 1000 to the console</span></span>
<span class="line"></span></code></pre></div><p><code>Stream.start()</code> is often used to build pipelines that acts as a Writable Stream:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mongoWritable </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> _</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pipeline</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">batch</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">records</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">writeToMongo</span><span style="color:#A6ACCD;">(records))</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">(myRecords)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pipe</span><span style="color:#A6ACCD;">(mongoWritable)</span></span>
<span class="line"></span></code></pre></div><h2 id="stream-each-callback" tabindex="-1">Stream.each(callback) <a class="header-anchor" href="#stream-each-callback" aria-hidden="true">#</a></h2><p>It consumes the Stream and it calls the callback function for each value emitted</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">each</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="stream-toarray-callback" tabindex="-1">Stream.toArray(callback) <a class="header-anchor" href="#stream-toarray-callback" aria-hidden="true">#</a></h2><p>It collects all the emitted items in an Array and it calls the callback function with that Array:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toArray</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">results</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">results</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//results is [2,4,6]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div>`,22),e=[p];function t(r,c,A,C,y,D){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};
