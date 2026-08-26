/* 55107_bcdfgqrt41295.js — copy contract address */
(function () {
  document.querySelectorAll('[data-ca]').forEach(function (el) {
    el.addEventListener('click', async function (e) {
      e.preventDefault();
      var ca = el.dataset.ca;
      try {
        await navigator.clipboard.writeText(ca);
        if (el.classList.contains('mini-copy')) {
          var o = el.textContent;
          el.textContent = '\u2713';
          setTimeout(function () { el.textContent = o; }, 1600);
        } else {
          var lb = el.querySelector('.ca-copy');
          if (lb) { var o2 = lb.textContent; lb.textContent = '\u2713 COPIED'; setTimeout(function () { lb.textContent = o2; }, 1600); }
        }
      } catch (err) {
        alert('Copy blocked by browser. CA: ' + ca);
      }
    });
  });
})();
