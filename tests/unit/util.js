define(function(require) {

  var test = require('../test')

  var util = seajs.pluginSDK.util
  var util4test = seajs.test

  test.assert(util.dirname('a/b/c.js') === 'a/b/', 'dirname')
  test.assert(util.dirname('d.js') === './', 'dirname')
  test.assert(util.dirname('') === './', 'dirname')
  test.assert(util.dirname('xxx') === './', 'dirname')
  test.assert(util.dirname('http://cdn.com/js/file.js') === 'http://cdn.com/js/', 'dirname')
  test.assert(util.dirname('http://cdn.com/js/file.js?t=xxxxx') === 'http://cdn.com/js/', 'dirname')
  test.assert(util.dirname('http://example.com/arale/seajs/1.2.0/??sea.js,plugin-combo.js') === 'http://example.com/arale/seajs/1.2.0/', 'dirname')
  test.assert(util.dirname('http://cdn.com/??seajs/1.2.0/sea.js,jquery/1.7.2/jquery.js') === 'http://cdn.com/', 'dirname')

  test.assert(util4test.realpath('./a//b/../c') === 'a/c', 'realpath')
  test.assert(util4test.realpath('file:///a//b/c') === 'file:///a/b/c', 'realpath')
  test.assert(util4test.realpath('http://a//b/c') === 'http://a/b/c', 'realpath')
  test.assert(util4test.realpath('a/b/c') === 'a/b/c', 'realpath')

  test.assert(util4test.normalize('a/b/c') === 'a/b/c.js', 'normalize')
  test.assert(util4test.normalize('a/b/c.js') === 'a/b/c.js', 'normalize')
  test.assert(util4test.normalize('a/b/c.css') === 'a/b/c.css', 'normalize')
  test.assert(util4test.normalize('a/b/c.d') === 'a/b/c.d.js', 'normalize')
  test.assert(util4test.normalize('c?t=20110525') === 'c?t=20110525', 'normalize')
  test.assert(util4test.normalize('c?t=20110525#') === 'c?t=20110525', 'normalize')
  test.assert(util4test.normalize('a/b/c.json#') === 'a/b/c.json', 'normalize')
  test.assert(util4test.normalize('a/b/') === 'a/b/', 'normalize')

  test.assert(util.id2Uri() === '', 'id2Uri')
  test.assert(util.id2Uri('') === '', 'id2Uri')
  test.assert(util.id2Uri('http://t.com/x.js') === 'http://t.com/x.js', 'id2Uri')
  test.assert(util.id2Uri('./z.js', 'http://t.com/x.js') === 'http://t.com/z.js', 'id2Uri')

  seajs.config({
        alias: {
          'jquery-debug': 'jquery/1.8.0/jquery-debug'
          ,'jquery': '1.8.0'
          ,'app': 'app/1.2/app'
          ,'router': 'router.js?t=20110525'
        }
      })
  test.assert(util4test.parseAlias('jquery-debug') === 'jquery/1.8.0/jquery-debug', 'parseAlias')
  //test.assert(util.parseAlias('jquery') === 'jquery/1.8.0/jquery', 'parseAlias')
  test.assert(util4test.parseAlias('app') === 'app/1.2/app', 'parseAlias')
  test.assert(util4test.parseAlias('http://test.com/router') === 'http://test.com/router', 'parseAlias')
  //test.assert(util.parseAlias('#jquery') === 'jquery', 'parseAlias')


  seajs.config({
    vars: {
      'locale': 'zh-cn',
      'biz': 'path/to/biz',
      'xx': './xx',
      'zz': 'zz.js'
    }
  })
  test.assert(util4test.parseVars('./i18n/{locale}.js') === './i18n/zh-cn.js', 'parseVars')
  test.assert(util4test.parseVars('{biz}/js/x') === 'path/to/biz/js/x', 'parseVars')
  test.assert(util4test.parseVars('/js/{xx}/c.js') === '/js/./xx/c.js', 'parseVars')
  test.assert(util4test.parseVars('/js/{xx}/{zz}') === '/js/./xx/zz.js', 'parseVars')

  // issues#302
  var t = 'http://XXX.com.cn/min/index.php?g=commonCss.css'
  test.assert(require.resolve(t) === t, 'require.resolve')

  // issues#430
  test.assert(require.resolve('./front_net/jquery.plupload.queue.js#').indexOf('jquery.plupload.queue.js') > 0, 'require.resolve')

  test.done()
});

