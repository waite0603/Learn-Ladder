const e=JSON.parse('{"key":"v-171421b2","path":"/web/vue/learn/components/%E6%8F%92%E6%A7%BD.html","title":"插槽","lang":"zh-CN","frontmatter":{"title":"插槽","icon":"post","order":3,"date":"2023-12-05T00:00:00.000Z","description":"https://cn.vuejs.org/guide/components/slots.html#slots 认识组件 Slot 在开发中，我们会经常封装一个个可复用的组件： 前面我们会通过props传递给组件一些数据，让组件来进行展示； 但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素； 比如某种情况下我们使用组件，希望组件显示的是一个按钮，某种情况下我们使用组件希望显示的是一张图片； 我们应该让使用者可以决定某一块区域到底存放什么内容和元素； 举个栗子：假如我们定制一个通用的导航组件 - NavBar 这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定； 左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示； 中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等； 右边可能是一个文字，也可能是一个图标，也可能什么都不显示；","head":[["meta",{"property":"og:url","content":"https://brain.sunguoqi.com/web/vue/learn/components/%E6%8F%92%E6%A7%BD.html"}],["meta",{"property":"og:site_name","content":"Waite Wang"}],["meta",{"property":"og:title","content":"插槽"}],["meta",{"property":"og:description","content":"https://cn.vuejs.org/guide/components/slots.html#slots 认识组件 Slot 在开发中，我们会经常封装一个个可复用的组件： 前面我们会通过props传递给组件一些数据，让组件来进行展示； 但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素； 比如某种情况下我们使用组件，希望组件显示的是一个按钮，某种情况下我们使用组件希望显示的是一张图片； 我们应该让使用者可以决定某一块区域到底存放什么内容和元素； 举个栗子：假如我们定制一个通用的导航组件 - NavBar 这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定； 左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示； 中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等； 右边可能是一个文字，也可能是一个图标，也可能什么都不显示；"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-04T17:55:46.000Z"}],["meta",{"property":"article:published_time","content":"2023-12-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-04T17:55:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"插槽\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-04T17:55:46.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"认识组件  Slot","slug":"认识组件-slot","link":"#认识组件-slot","children":[]},{"level":2,"title":"如何使用插槽slot？","slug":"如何使用插槽slot","link":"#如何使用插槽slot","children":[]},{"level":2,"title":"插槽的基本使用","slug":"插槽的基本使用","link":"#插槽的基本使用","children":[{"level":3,"title":"插槽的默认内容","slug":"插槽的默认内容","link":"#插槽的默认内容","children":[]},{"level":3,"title":"多个插槽的效果","slug":"多个插槽的效果","link":"#多个插槽的效果","children":[]}]},{"level":2,"title":"具名插槽的使用","slug":"具名插槽的使用","link":"#具名插槽的使用","children":[{"level":3,"title":"动态插槽名","slug":"动态插槽名","link":"#动态插槽名","children":[]}]},{"level":2,"title":"渲染作用域","slug":"渲染作用域","link":"#渲染作用域","children":[{"level":3,"title":"作用域插槽","slug":"作用域插槽","link":"#作用域插槽","children":[]},{"level":3,"title":"具名作用域插槽","slug":"具名作用域插槽","link":"#具名作用域插槽","children":[]},{"level":3,"title":"默认插槽和具名插槽混合","slug":"默认插槽和具名插槽混合","link":"#默认插槽和具名插槽混合","children":[]}]}],"git":{"createdTime":1701712546000,"updatedTime":1701712546000,"contributors":[{"name":"Waite Wang","email":"waite@waite.wang","commits":1}]},"readingTime":{"minutes":8.65,"words":2594},"filePathRelative":"web/vue/learn/components/插槽.md","localizedDate":"2023年12月5日","excerpt":"<blockquote>\\n<p>https://cn.vuejs.org/guide/components/slots.html#slots</p>\\n</blockquote>\\n<h2> 认识组件  Slot</h2>\\n<ul>\\n<li>在开发中，我们会经常封装一个个可复用的组件：\\n<ul>\\n<li>前面我们会通过props传递给组件一些数据，让组件来进行展示；</li>\\n<li>但是为了让这个组件<strong>具备更强的通用性</strong>，我们<strong>不能将组件中的内容限制为固定的div、span等等这些元素</strong>；</li>\\n<li>比如某种情况下我们使用组件，希望组件显示的是一个按钮，某种情况下我们使用组件希望显示的是一张图片；</li>\\n<li>我们应该让使用者可以<strong>决定某一块区域到底存放什么内容和元素</strong>；</li>\\n</ul>\\n</li>\\n<li>举个栗子：假如我们定制一个通用的导航组件 - <code>NavBar</code>\\n<ul>\\n<li>这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定；</li>\\n<li>左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示；</li>\\n<li>中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等；</li>\\n<li>右边可能是一个文字，也可能是一个图标，也可能什么都不显示；</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
