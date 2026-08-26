/* 88326_jklnpqsw62140.js — city light FX (twinkle + beacons) */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var C = ['#fffdf5', '#c4f226', '#22d3ee', '#ffc233', '#4ADE80', '#ffd6e0'];
  var W = ['', 'wk2', 'wk3'];
  var B = document.querySelectorAll('.skyline .bldg');
  B.forEach(function (b, i) {
    var n = 2 + (i % 2);
    for (var k = 0; k < n; k++) {
      var w = document.createElement('span');
      w.className = 'wink ' + W[(i * 3 + k) % 3];
      w.style.setProperty('--wc', C[(i * 5 + k * 2 + 3) % C.length]);
      w.style.setProperty('--wpx', (k * 9 + (i * 7) % 26) + 'px');
      w.style.setProperty('--wpy', (k * 13 + (i * 11) % 32) + 'px');
      w.style.setProperty('--td', (1.8 + ((i * 1.3 + k * 2.7) % 2.7)).toFixed(2) + 's');
      w.style.setProperty('--tda', ((i * 0.7 + k * 1.4) % 4.2).toFixed(2) + 's');
      b.appendChild(w);
    }
    if ((i * 7) % 5 < 2) {
      var bn = document.createElement('span');
      bn.className = 'beacon';
      bn.style.setProperty('--bd', (1.8 + (i % 3) * 0.6).toFixed(2) + 's');
      bn.style.setProperty('--bda', ((i * 0.9) % 2.6).toFixed(2) + 's');
      b.appendChild(bn);
    }
  });
})();
