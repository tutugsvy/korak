/* 39814_klmnpqvs73018.js — wallet connect + auto-switch Robinhood Chain 4663 */
(function () {
  var B = document.getElementById('wallet-btn');
  var I = document.querySelector('.masthead-indicator');
  if (!B) return;
  var C = {
    chainId: '0x1237',
    chainName: 'Robinhood Chain',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'],
    blockExplorerUrls: ['https://robinhoodchain.blockscout.com']
  };
  function S(a) { return a ? a.slice(0, 6) + '\u2026' + a.slice(-4) : ''; }
  function G() {
    if (window.ethereum) return window.ethereum;
    if (window.phantom && window.phantom.ethereum) return window.phantom.ethereum;
    if (window.rabby) return window.rabby;
    return null;
  }
  function BT(t, m) {
    B.textContent = t;
    B.classList.remove('ok', 'err', 'busy');
    if (m) B.classList.add(m);
  }
  function BI(h) { if (I) I.innerHTML = h; }
  async function SW(p) {
    try {
      await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: C.chainId }] });
      return true;
    } catch (e) {
      var code = e && (e.code || (e.data && e.data.originalError && e.data.originalError.code));
      if (code === 4902) {
        await p.request({ method: 'wallet_addEthereumChain', params: [C] });
        await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: C.chainId }] });
        return true;
      }
      throw e;
    }
  }
  async function US(p) {
    try {
      var ch = await p.request({ method: 'eth_chainId' });
      var ac = await p.request({ method: 'eth_accounts' });
      var a = ac && ac[0];
      if (String(ch).toLowerCase() !== C.chainId) {
        BT('SWITCH TO RH', 'err');
        BI('<i style="background:#ff3355;box-shadow:0 0 10px #ff3355"></i> WRONG NETWORK');
      } else if (a) {
        BT(S(a) + ' \u00B7 RH', 'ok');
        BI('<i></i> CONNECTED');
      } else {
        BT('CONNECT WALLET', '');
        BI('<i></i> MARKET LIVE');
      }
    } catch (e) {}
  }
  async function CN() {
    var p = G();
    if (!p) {
      alert('No wallet detected.\n\nInstall MetaMask, Phantom, Rabby or the Robinhood Wallet to connect to StockBrokerCity.');
      return;
    }
    try {
      BT('CONNECTING\u2026', 'busy');
      var ac = await p.request({ method: 'eth_requestAccounts' });
      if (!ac || !ac.length) throw Object.assign(new Error('No account'), { code: 4001 });
      BI('<i></i> CONNECTING');
      await SW(p);
      await US(p);
    } catch (e) {
      if (e && e.code === 4001) { BT('CONNECT WALLET', ''); BI('<i></i> MARKET LIVE'); }
      else {
        BT('CONNECT WALLET', 'err');
        console.error('Wallet error', e);
        try { await US(p); } catch (_) { BI('<i></i> MARKET LIVE'); }
      }
    }
  }
  B.addEventListener('click', CN);
  var p0 = G();
  if (p0) {
    US(p0);
    if (p0.on) {
      p0.on('accountsChanged', function () { US(p0); });
      p0.on('chainChanged', function () { setTimeout(function () { US(p0); }, 300); });
    }
  }
})();
