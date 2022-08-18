import{_ as a,c as s,o as e,a as n}from"./app.3723165e.js";const u=JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"What is Exstream?","slug":"what-is-exstream"},{"level":2,"title":"Motivation","slug":"motivation"}],"relativePath":"guide/what-is-exstream.md"}'),t={name:"guide/what-is-exstream.md"},o=n(`<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h1><h2 id="what-is-exstream" tabindex="-1">What is Exstream? <a class="header-anchor" href="#what-is-exstream" aria-hidden="true">#</a></h2><p>Exstream is a library that aims to provide a unified api to handle data processing tasks, merging toghether 3 different domains: synchronous operations, asynchronous operations, and streams. It builds on top of plain Node.js modules, and enforces the use of a &quot;light-functional&quot; programming paradigm. With exstream it is possible to build memory efficient data flows in a clean and readable way, being them simple or complex.</p><p>Here is a minimal example:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> _ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">exstream.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filter</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">values</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//res is [2, 4]</span></span>
<span class="line"></span></code></pre></div><p>The above example demonstrates two of the core features of Exstream:</p><ul><li><p><b>Light-Functional approach (*)</b>: exstream enforces the use of well-known functional patterns like map, reduce, filter and many others.</p></li><li><p><b>A simple, well-known api</b>: this example is almost equal, with minimum differences, to a <a href="https://lodash.com/docs/4.17.15#chain" target="_blank" rel="noreferrer">lodash chain</a> and is also very similar to the code you would write in plain javascript. But as we will see in this guide, with exstream you can do a lot more, joining together streams and asynchronous transformation and controlling the data flow, using the same clean syntax</p></li></ul><div class="info custom-block"><p class="custom-block-title">*</p><p>We call it <b>Light</b>-Functional because FP involves specific math/notation/terminology that this library don&#39;t follow in a 100% <i>orthodox</i> way. This happens because we&#39;re seeking to strike a pragmatic balance between the clear undeniable benefits of FP, and the need to ship workable, maintainable JS. JS is, in fact, not a pure FP language in that, for example, lacks immutability.</p><p>Check out <a href="https://github.com/getify/Functional-Light-JS" target="_blank" rel="noreferrer">Functional Light JS</a> if you want to know more about FP in Javascript</p></div><h2 id="motivation" tabindex="-1">Motivation <a class="header-anchor" href="#motivation" aria-hidden="true">#</a></h2><p>Working with node streams is not easy at all. Also writing a minimum complex chain of asynchronous tasks is not trivial when you have to take care of rate limiting, throttling, partial parallelism, error handling, etc.</p><p>The idea behind this library is not new. Some years ago I discovered a beatiful library called <a href="https://caolan.github.io/highland/" target="_blank" rel="noreferrer">Highland</a>, that does essentially the same thing exstream does. The reasons why I wrote exstream are essentially 3:</p><ul><li>Highland is abandoned (no more commits from 2019)</li><li>Highland was written before Promise was a first class citizien, and even before ES5</li><li>There were lot of open issues (affecting also myself)</li></ul><p>Exstream share some similarities with highland in its api, but it&#39;s a rewrite from scratch with also many differences and improvements:</p><ul><li>A better handling of synchronous tasks</li><li>A better handling of promises</li><li>It is generally faster</li><li>The api can be easily extendend</li><li>It ships powerful high level functions (like CSV parsing/serializing, streaming join, groupBy of sorted data sets, and others)</li><li>It does not suffer of many bugs that are open since years</li></ul><p>That said, a great tribute to caolan for his brilliant work, hoping that this library can continue where Highland left off</p>`,15),l=[o];function i(r,p,c,h,d,m){return e(),s("div",null,l)}const f=a(t,[["render",i]]);export{u as __pageData,f as default};
