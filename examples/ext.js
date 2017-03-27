;(function () {
  var scriptEle = document.getElementById('code')
  var srcEle = document.getElementById('src')
  if (src && code) {
    src.innerHTML = prettyPrintOne(scriptEle.innerHTML, 'js')
  }
})();