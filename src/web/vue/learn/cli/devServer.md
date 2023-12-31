---
title: Webpack_devServer
icon: post
order: 3
date: 2023-11-19
---


> `devServer` 是指开发服务器，通常用于前端开发环境。在前端开发中，开发者通常需要一个本地服务器来运行他们的应用程序，以便进行测试和调试。Webpack是一个流行的前端构建工具，而`devServer`就是Webpack提供的一个功能，用于在开发过程中提供一个简单的服务器。
>
> `devServer` 可以帮助开发者在本地启动一个服务器，监视文件的变化，并在文件发生更改时自动重新加载页面，以提高开发效率。此外，它还支持一些其他功能，比如模块热替换（Hot Module Replacement），允许在不刷新整个页面的情况下更新部分模块。
>
> 在使用Webpack配置文件时，你可以配置 `devServer` 的各种选项，以满足你的开发需求。这包括设置服务器的端口、指定静态资源的路径、配置代理等。

- 目前我们开发的代码，为了运行需要有两个操作：
  - 操作一：npm run build，编译相关的代码；
  - 操作二：通过live server或者直接通过浏览器，打开index.html代码，查看效果；
- 这个过程经常操作会影响我们的开发效率，我们希望可以做到，当文件发生变化时，可以自动的完成编译和展示；
- 为了完成自动编译，webpack提供了几种可选的方式：
  - `webpack watch mode`：在文件发生变化时，Webpack会自动重新编译代码。
  - `webpack-dev-server`（常用）：提供了一个开发服务器，可以在本地运行你的应用程序，并且在文件发生变化时自动重新加载页面。
  - `webpack-dev-middleware`：结合其他服务器框架使用，将Webpack与服务器集成，实现在文件发生变化时自动重新编译

## Webpack watch

+ webpack给我们提供了watch模式：

  - 在该模式下，webpack依赖图中的所有文件，只要有一个发生了更新，那么代码将被重新编译；
  - 我们不需要手动去运行 npm run build指令了；

+ 开启watch模式有两种方式：

  + 通过在命令行中使用--watch参数来开启watch模式。例如，运行`webpack --watch`命令即可开启watch模式。

  ```json
  // package.json
  "scripts": {
      "build": "webpack --watch"
  }
  ```

  + 在Webpack配置文件中添加``watch: true`选项来开启watch模式。例如，在Webpack配置文件中添加以下代码：

  ```javascript
  // webpack.config.js
  
  module.exports = {
    watch: true
  }
  ```

  ## webpack-dev-server

  + 上面的方式可以监听到文件的变化，但是事实上它本身是没有自动刷新浏览器的功能的：
    - 当然，目前我们可以在 VSCode 中使用 live-server 来完成这样的功能；
    - 但是，我们希望在不适用live-server的情况下，可以具备live reloading（实时重新加载）的功能；
  + 安装webpack-dev-server

  ```less
  npm install webpack-dev-server -D
  ```

  + 修改配置文件

  ```json
  // package.json
  
  "scripts": {
    "build": "webpack",
    "serve": "webpack serve"
  }
  ```

  + 运行 `npm run serve`, 在本地配置一个服务器, 使用 `webpack cli` 解析/ 启动本地服务

  ![image-20231119190420271](https://qiniu.waite.wang/202311191904772.png)

> 在运行 `npm run serve` 命令时，如果没有指定输出目录，webpack会默认将打包后的文件输出到内存中，而不是硬盘上的某个目录中。因此即使没有指定输出目录，该命令仍然可以正常运行。这种方式称为内存编译，可以提高开发效率，因为不需要每次修改代码后都重新编译和写入磁盘。 使用 `memfs` 这一个库实现;

## 认识模块热替换（HMR）

+ 什么是HMR呢？
  - HMR的全称是Hot Module Replacement，翻译为模块热替换；
  - 模块热替换是指在 应用程序运行过程中，**替换、添加、删除模块，而无需重新刷新整个页面**；
+ HMR通过如下几种方式，来提高开发的速度：
  - 不重新加载整个页面，这样可以保留某些应用程序的状态不丢失；
  - 只更新需要变化的内容，节省开发的时间；
  - 修改了css、js源代码，会立即在浏览器更新，相当于直接在浏览器的 devtools 中直接修改样式；
+ 如何使用HMR呢？
  - 默认情况下，webpack-dev-server已经支持HMR，我们只需要开启即可；
  - 在不开启HMR的情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的是live reloading；

### 开启 HMR

+ 修改webpack的配置：

```javascript
// webpack.config.js
module.exports = {
  // target 用来指定打包后的代码在哪个环境下运行
  target: "web",
  devServer: {
    // 1. static: 用来指定静态资源的根目录
    // 如果有的资源没有在 Webpack 中加载, 那么就会去 static 中查找加载
    static: "./public",
    // 2. hot: 是否开启热更新
    hot: true
  }
}
```

![image-20231119201428778](https://qiniu.waite.wang/202311192014822.png)

+ 指定哪些模块发生更新时，进行HMR；

```javascript
if(module.hot) {
  // module.hot.accept(moduleName, callback)
  module.hot.accept("./js/element", () => {
    console.log("element模块发生了变化");
  })
}
```

### 框架 的 HMR

+ 大多数主流框架（如React、Vue和Angular）都对模块热替换（HMR）提供了内置的支持，以便在开发过程中实现更快的热更新。

+ 具体而言，这些框架通常会提供开发服务器或开发工具，用于在开发过程中启用HMR功能。通过使用这些工具，你可以在修改代码时实时查看更新后的效果，而无需手动刷新页面。
+ 以下是一些常见的框架的HMR支持方式：
  + React：React 框架通常使用Webpack的 `react-hot-loader` 插件来实现HMR功能。你可以在Webpack配置文件中配置该插件，然后在开发服务器中启用HMR。
  + Vue：Vue 框架内置了对HMR的支持。你可以使用 `vue-loader` 和 `vue-style-loader` 等相关插件，以及在Webpack配置文件中配置HMR选项，来启用Vue的HMR功能。
  + Angular：Angular 框架使用Webpack的 `@angular-builders/custom-webpack` 插件来实现HMR功能。你可以在Angular项目的配置文件中进行相应的配置，以启用HMR。
+ 请注意，每个框架的具体配置方式可能会有所不同。建议查阅相应框架的官方文档或社区资源，以获取更详细的关于HMR的配置和使用说明。

### HMR的原理

HMR（Hot Module Replacement）的原理是通过在应用程序运行时，通过开发服务器向客户端发送更新的模块代码，然后使用热更新运行时（Hot Update Runtime）来替换旧的模块代码，从而实现模块的热替换，而无需重新加载整个页面。

+ webpack-dev-server会创建两个服务：提供静态资源的服务（express）和Socket服务（net.Socket）；
  + HMR Socket Server，是一个socket的长连接：
    - 长连接有一个最好的好处是建立连接后双方可以通信（服务器可以直接发送文件到客户端）；
    - 当服务器监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）；
    - 通过长连接，可以直接将这两个文件主动发送给客户端（浏览器）；
    - 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新；
  + Webpack-dev-server使用Node.js内置的net模块提供WebSocket服务。该服务与静态资源服务配合使用，用于与客户端进行实时通信。当客户端连接到WebSocket服务时，Webpack-dev-server会将更新的模块代码发送到客户端，并触发模块热替换（HMR）功能。客户端接收到更新后，会通过WebSocket与Webpack-dev-server建立连接，并将更新的模块代码应用到正在运行的应用程序中。
+ express server负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）；
  + Webpack-dev-server使用express框架提供静态资源服务。该服务可以将Webpack打包后的静态资源文件（如HTML、CSS、JavaScript等）提供给浏览器访问。同时，该服务还支持一些特殊的路由，如/__webpack_hmr，用于与客户端建立WebSocket通信。

具体而言，HMR的原理可以分为以下几个步骤：

1. 构建过程中的注入：在Webpack构建过程中，会将特殊的HMR运行时代码注入到应用程序中的每个模块中。这些HMR运行时代码负责与开发服务器建立连接，并接收来自服务器的更新通知。
2. 开发服务器的更新通知：开发服务器会监视文件的变化，并在文件发生更改时，向连接的客户端发送更新通知。这些更新通知包含了被修改的模块的更新代码。
3. 客户端接收更新：当客户端接收到更新通知时，它会根据更新代码进行处理。这些更新代码会被热更新运行时处理，并将其应用于相应的模块。
4. 模块的热替换：热更新运行时会将新的模块代码与旧的模块代码进行比较，并尽可能地将新代码应用于正在运行的应用程序。如果新代码可以被成功替换，应用程序会保持运行状态，同时显示更新后的效果。

总结起来，HMR利用了Webpack的构建能力和热更新运行时，使得在开发过程中可以实时地修改代码并查看更新后的效果，从而提高开发效率。

![image-20231119203330239](https://qiniu.waite.wang/202311192033908.png)

## devServer 配置信息

```javascript
// webpack.config.js
module.exports = {
  // target 用来指定打包后的代码在哪个环境下运行
  target: "web",
  devServer: {
    // 1. contentBase: 用来指定静态资源的根目录
    static: "./public",
    // 2. hot: 是否开启热更新
    hot: true,
    // 3. host: 指定服务器的ip地址, 默认是localhost
    host: "0.0.0.0",
    port: 7777,
    // 4. open: 是否自动打开浏览器
    open: true,
    // 5. compress: 是否启动gzip压缩
    // compress: true,
    // 6. proxy: 用来配置代理
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
```

### hotOnly、host 配置

+ host设置主机地址：
  - 默认值是localhost；
  - 如果希望其他地方也可以访问，可以设置为 0.0.0.0；
+ localhost 和 0.0.0.0 的区别：
  - `localhost`：`localhost`是一个主机名，表示本地计算机或设备自身。它通常映射到回环地址（loopback address）``127.0.0.1`，也可以是IPv6的`::1`。当应用程序绑定到`localhost`时，它只能通过本地计算机或设备上的回环接口进行访问。这意味着只有本地计算机或设备上的进程可以访问该应用程序，其他计算机或设备无法直接访问。
  - `0.0.0.0`：`0.0.0.0`是一个特殊的IP地址，表示任意主机或所有主机。当应用程序绑定到`0.0.0.0`时，它将监听所有可用的网络接口，包括本地计算机上的回环接口和其他网络接口。这意味着其他计算机或设备可以通过网络访问该应用程序，前提是网络连接和防火墙允许。

+ 简而言之，`localhost`指的是本地计算机或设备自身，只能通过本地访问。而`0.0.0.0`表示任意主机或所有主机，可以通过网络访问。在开发过程中，通常将应用程序绑定到localhost以进行本地开发和测试，而将其绑定到`0.0.0.0`可以使其在局域网或公共网络上可访问。

### port、open、compress

+ port设置监听的端口，默认情况下是8080
  + 这个选项用于指定Webpack开发服务器的端口号。通过设置port选项，你可以指定应用程序在开发服务器上监听的端口。
+ open是否打开浏览器：
  + 默认值是false，设置为true会打开浏览器；
  + 这个选项用于指定是否在启动Webpack开发服务器后自动打开浏览器。通过设置open选项为true，开发服务器将在启动后自动打开默认浏览器，并加载应用程序
  + 也可以设置为类似于 Google Chrome等值；
+ compress是否为静态文件开启gzip compression：
  - 默认值是false，可以设置为true；
  - 这个选项用于指定是否启用gzip压缩。通过设置compress选项为true，开发服务器将对传输到浏览器的资源进行gzip压缩，以减小文件大小，提高传输速度。

```javascript
module.exports = {
  // ...
  devServer: {
    port: 8080, // 指定端口号为8080
    open: true, // 自动打开浏览器
    compress: true, // 启用gzip压缩
  },
};
```

### Proxy

> https://webpack.docschina.org/configuration/dev-server#devserverproxy

+ proxy是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题：
  - 比如我们的一个api请求是 http://localhost:3000但是本地启动服务器的域名是 http://localhost:8000，这 个时候发送网络请求就会出现跨域的问题；
  - 那么我们可以将请求先发送到一个代理服务器，代理服务器和API服务器没有跨域的问题，就可以解决我们的跨域问题了
+ 代理（Proxy）是一种常见的网络应用程序架构，它可以将客户端的请求转发到另一个服务器进行处理。在开发环境中，我们通常会将应用程序和API服务分开部署，这时就需要使用代理将客户端的API请求转发到后端API服务器上。

+ 在 Webpack 的 devServer 中，可以使用proxy选项来配置代理设置。proxy选项可以是一个对象，也可以是一个函数。对象方式的proxy选项可以指定一个或多个代理规则，每个规则包含了要转发的请求路径和目标服务器地址。例如：

```javascript
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 目标服务器地址
        changeOrigin: true, // 改变请求头中的Origin字段
        pathRewrite: {
          '^/api': '', // 将/api前缀替换为空
        },
      },
    },
  },
};
```

+ 在这个示例中，我们将所有以`/api`开头的请求转发到`http://localhost:3000`服务器上。同时，我们还设置了`changeOrigin`选项为`true`，以改变请求头中的`Origin`字段，并使用`pathRewrite`选项将请求路径中的`/api`前缀替换为空。
+ 当 `changeOrigin `设置为 true 时，代理服务器会将请求头中的 Origin 字段替换为目标服务器的地址，这样目标服务器就可以正确识别请求来源。否则，目标服务器可能会拒绝请求或返回错误的响应。
+ 除了对象方式的`proxy`选项外，还可以使用函数方式的`proxy`选项来进行更灵活的配置。例如：

```javascript
module.exports = {
  // ...
  devServer: {
    proxy: (req, res, proxyOptions) => {
      const target = 'http://localhost:3000';
      if (req.url.startsWith('/api')) {
        return {
          target,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        };
      }
    },
  },
};
```

+ 在这个示例中，我们使用函数方式的`proxy`选项来动态配置代理规则。如果请求路径以`/api`开头，则将其转发到`http://localhost:3000`服务器上，并使用相应的选项进行配置。

+ 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false,
      },
    },
  },
};
```

### historyApiFallback 

+ `historyApiFallback `是 `webpack-dev-server `的一个配置项，用于控制当使用 HTML5 History API 时，如果找不到对应的资源应该返回什么页面。
+ 当浏览器使用 HTML5 History API 进行前端路由跳转时，例如从` /home` 跳转到 `/about`，浏览器会向服务器发送一个 GET 请求，但是服务器上并没有对应的 `/about` 路径和资源，此时会返回 404 错误。为了避免这种情况，`historyApiFallback` 可以设置一个默认的页面，用于代替 404 错误页面。

+ 例如，设置 `historyApiFallback`: true 后，当访问一个不存在的路由时，`webpack-dev-server` 会返回一个默认的 HTML 页面，通常是 `index.html`。这个页面会包含前端路由所需的 JavaScript 和 CSS 资源，从而保证前端路由跳转的正常运行。

+ 需要注意的是，在生产环境中，historyApiFallback 应该由服务器来处理，而不是由前端框架或工具来处理。
+ https://webpack.docschina.org/configuration/dev-server/#devserverhistoryapifallback

```javascript
module.exports = {
  // ...其他配置项
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    historyApiFallback: true
  }
}
```

+ 要将 404 错误跳转到一个名为 `404.html `的页面，你可以通过 `historyApiFallback `的 `rewrites `选项来实现。以下是一个示例配置：

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' },
      ],
    },
  },
};
```

+ 在上述配置中，我们使用了 `rewrites `数组来定义重写规则。第一个规则 `{ from: /^\/$/, to: '/index.html' }` 将根路径 `/ `重写到 `index.html` 页面，这样确保了默认路径的正确加载。第二个规则 `{ from: /./, to: '/404.html' } `将所有其他路径都重写到 `404.html` 页面，实现了将 404 错误跳转到指定页面的效果。

## resolve模块解析

> https://webpack.docschina.org/configuration/resolve

+ `resolve `是 `webpack` 中的一个配置选项，用于配置模块解析的规则。
  + 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库；
  + resolve可以帮助webpack从每个 require/import 语句中，找到需要引入到合适的模块代码；
  + webpack 使用 [enhanced-resolve](https://github.com/webpack/enhanced-resolve) 来解析文件路径；

1. extensions
`extensions `用于配置在导入模块时可以省略的文件扩展名。例如，配置了 `extensions: ['.js', '.jsx']` 后，当导入模块时可以省略文件扩展名，如 `import MyComponent from './MyComponent'`，`webpack` 会自动尝试解析 `MyComponent.js` 或 `MyComponent.jsx`。

2. alias
`alias `用于创建模块的别名，可以简化模块导入的路径。例如，配置了 `alias: { '@': path.resolve(__dirname, 'src') } `后，可以使用` import MyComponent from '@/components/MyComponent' `来导入位于 `src/components/MyComponent` 的模块。

3. modules
`modules `用于配置 `webpack `在解析模块时搜索的目录。默认情况下，`webpack `只会搜索 `node_modules` 目录。通过配置 `modules`，可以告诉 `webpack `在其他目录中查找模块。例如，配置了 `modules: ['src', 'node_modules']` 后，`webpack `会先在 `src `目录中查找模块，然后再在 `node_modules `目录中查找。

4. mainFields
`mainFields `用于配置在导入模块时，`webpack `优先使用的字段。当导入一个模块时，它可能在 `package.json` 文件中定义了多个入口字段（如 main, module, browser 等）。通过配置 `mainFields`，可以告诉 webpack 使用哪个字段作为模块的主入口。例如，配置了 `mainFields: ['browser', 'module', 'main']` 后，webpack 会优先使用 `browser` 字段，然后是 `module `字段，最后是 `main `字段。

```javascript
module.exports = {
  // ...其他配置项
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // alias：创建了一个别名 @，指向项目根目录下的 src 目录。
      '@': path.resolve(__dirname, 'src')
    },
    modules: ['src', 'node_modules'],
    mainFields: ['browser', 'module', 'main']
  }
}
```

+ webpack能解析三种文件路径：
  + 绝对路径
    - 由于已经获得文件的绝对路径，因此不需要再做进一步解析。
  + 相对路径
    - 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录；
    - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径；
  + 模块路径
    - 在 resolve.modules中指定的所有目录检索模块；
      - 默认值是 [‘node_modules’]，所以默认会从node_modules中查找文件；
    - 我们可以通过设置别名的方式来替换初识模块路径，具体后面讲解alias的配置；

## 区分开发/ 生产环境

+ 目前我们所有的webpack配置信息都是放到一个配置文件中的：webpack.config.js
  - 当配置越来越多时，这个文件会变得越来越不容易维护；
  - 并且某些配置是在开发环境需要使用的，某些配置是在生成环境需要使用的，当然某些配置是在开发和生成环 境都会使用的；
  - 所以，我们最好对配置进行划分，方便我们维护和管理；
+ 方案一：编写两个不同的配置文件，开发和生成时，分别加载不同的配置文件即可；

```json
// package.json
"scripts": {
  "build": "webpack --config ./config/webpack.prod.config.js",
  "serve": "webpack serve --config ./config/webpack.dev.config.js"
}
```

![image-20231119222920881](https://qiniu.waite.wang/202311192229409.png)

```javascript
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.comm.config');

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./public",
    hot: true,
    // host: "0.0.0.0",
    port: 7777,
    open: true,
    // compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
})

```

+ 方式二：使用相同的一个入口配置文件，通过设置参数来区分它们；

```javascript
const path = require('path');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    mode: argv.mode,
    entry: './src/index.js',
    output: {
      filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    optimization: {
      minimize: !isDev
    },
    // ...其他配置项
  };
};
```

+ 在命令行中，可以通过 `--mode` 参数来指定 webpack 的构建模式。例如：

```less
webpack --mode development
```

