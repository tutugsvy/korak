/* 22622_wkkjask55933.js — room nav F1-F7 */
(function () {
  var R = document.querySelectorAll('.rail-link');
  var P = {
    skyline: document.getElementById('room-skyline'),
    exchange: document.getElementById('room-exchange'),
    floor: document.getElementById('room-floor'),
    mint: document.getElementById('room-mint'),
    holders: document.getElementById('room-holders'),
    docs: document.getElementById('room-docs'),
    pool: document.getElementById('room-pool')
  };
  R.forEach(function (l) {
    l.addEventListener('click', function (e) {
      e.preventDefault();
      var room = l.dataset.room;
      if (!room || !P[room]) return;
      R.forEach(function (r) { r.classList.remove('active'); });
      l.classList.add('active');
      Object.keys(P).forEach(function (k) { if (P[k]) P[k].classList.remove('active'); });
      P[room].classList.add('active');
    });
  });
  document.addEventListener('keydown', function (e) {
    var M = { F1: 'skyline', F2: 'exchange', F3: 'floor', F4: 'mint', F5: 'holders', F6: 'docs', F7: 'pool' };
    var room = M[e.key];
    if (room && P[room]) {
      e.preventDefault();
      var t = document.querySelector('.rail-link[data-room="' + room + '"]');
      if (t) t.click();
    }
  });
})();
