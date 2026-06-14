/* ===== Agent TT — Pure Utility Functions (fully testable) ===== */
const Utils = {

  /* 格式化金額 TWD */
  formatCurrency(amount) {
    return 'NT$' + Number(amount).toLocaleString('zh-TW');
  },

  /* 格式化日期 YYYY-MM-DD → M月D日 */
  formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getMonth()+1}月${d.getDate()}日`;
  },

  /* 取得今天 YYYY-MM-DD */
  today() {
    return new Date().toISOString().split('T')[0];
  },

  /* 兩日期相差天數（d2 - d1） */
  daysBetween(d1, d2) {
    const t1 = new Date(d1).setHours(0,0,0,0);
    const t2 = new Date(d2).setHours(0,0,0,0);
    return Math.round((t2 - t1) / 86400000);
  },

  /* 台鐵退票手續費率（依距離發車小時數） */
  calcTrainRefundFeeRate(hoursBeforeDep) {
    if (hoursBeforeDep <= 0)   return null;   // 已發車或已使用，不可退
    if (hoursBeforeDep <= 1)   return null;   // 距發車≤1小時，不可退
    if (hoursBeforeDep <= 48)  return 0.10;   // 當日（≤24h 對應 10%，這裡統一 ≤2天內）
    // 依天數重新判斷
    const daysBefore = Math.floor(hoursBeforeDep / 24);
    if (daysBefore <= 2)  return 0.05;        // 1-2日
    if (daysBefore <= 24) return 0.03;        // 3-24日
    return 0.01;                              // ≥25日
  },

  /* 精確版：依天數計算台鐵退票手續費率 */
  calcTrainRefundByDays(daysBefore) {
    if (daysBefore < 0) return null;
    if (daysBefore === 0) return null;        // 當日距發車≤1h 不可退（由 canRefundTicket 把關）
    if (daysBefore <= 2)  return 0.05;
    if (daysBefore <= 24) return 0.03;
    return 0.01;
  },

  /* 台鐵票價計算 */
  calcTrainFare(baseRate, distanceKm, classMultiplier = 1.0, discountRate = 1.0) {
    if (baseRate < 0 || distanceKm < 0) return 0;
    const raw = baseRate * distanceKm * classMultiplier;
    return Math.round(raw * discountRate);
  },

  /* 取最優惠折扣 */
  applyBestDiscount(originalPrice, discountRates = []) {
    if (!discountRates.length) return originalPrice;
    const best = Math.min(...discountRates);
    return Math.round(originalPrice * best);
  },

  /* 費用平均分攤 */
  calcBudgetSplit(totalAmount, memberCount) {
    if (memberCount <= 0) return 0;
    return Math.ceil(totalAmount / memberCount);
  },

  /* 判斷是否為竹竹苗車站 */
  isZhuzhumiaoStation(stationId) {
    return ZHUZHUMIAO_IDS.includes(stationId);
  },

  /* 判斷某個景點/地點名稱是否位於竹竹苗以外（用於新增項目時的區域警告） */
  isOutsideZhuzhumiao(name) {
    if (!name) return false;
    const n = name.trim();
    // 白名單：竹竹苗推薦景點與車站名稱，一律視為竹竹苗
    const whitelist = new Set();
    if (typeof ATTRACTIONS === 'object') {
      Object.values(ATTRACTIONS).forEach(list =>
        (list || []).forEach(a => whitelist.add(a.name)));
    }
    if (typeof ALL_STATIONS !== 'undefined') {
      ALL_STATIONS.filter(s => s.region === '竹竹苗').forEach(s => whitelist.add(s.name));
    }
    if (whitelist.has(n)) return false;
    // 黑名單：非竹竹苗縣市 / 大站關鍵字，名稱中含有則判定為區域外
    const OTHER_REGION_KEYWORDS = [
      '台北','臺北','新北','基隆','桃園','台中','臺中','台南','臺南',
      '高雄','花蓮','台東','臺東','宜蘭','嘉義','彰化','南投','雲林',
      '屏東','澎湖','金門','馬祖','日月潭','阿里山','墾丁','九份','淡水',
    ];
    return OTHER_REGION_KEYWORDS.some(kw => n.includes(kw));
  },

  /* 判斷暫時訂單是否已過期（10分鐘鎖位） */
  isLockExpired(lockStartTime, lockMinutes = 10) {
    const now = Date.now();
    const lockMs = lockMinutes * 60 * 1000;
    return (now - lockStartTime) >= lockMs;
  },

  /* 住宿退款率（依入住前幾天） */
  calcHousingRefundRate(daysBeforeCheckin) {
    if (daysBeforeCheckin >= 10) return 1.00;  // 全額退款
    if (daysBeforeCheckin >= 4)  return 0.70;  // 退70%
    return 0.00;                               // 3天內不退
  },

  /* 按狀態篩選行程 */
  filterByStatus(items, status) {
    if (!status || status === '全部') return items;
    return items.filter(item => item.status === status);
  },

  /* 按時間字串升冪排列 'HH:MM' */
  sortItemsByTime(items) {
    return [...items].sort((a, b) => {
      const ta = a.time || '00:00';
      const tb = b.time || '00:00';
      return ta.localeCompare(tb);
    });
  },

  /* 判斷是否超支 */
  isBudgetExceeded(totalSpent, budgetLimit) {
    return totalSpent > budgetLimit;
  },

  /* 判斷是否接近預算（≥80%） */
  isBudgetNear(totalSpent, budgetLimit) {
    return !Utils.isBudgetExceeded(totalSpent, budgetLimit) && (totalSpent / budgetLimit) >= 0.8;
  },

  /* 判斷車票能否退票（已使用或距發車≤1小時不可退） */
  canRefundTicket(ticket) {
    if (ticket.status === '已使用' || ticket.status === '已取消') return false;
    const depDt = new Date(`${ticket.date} ${ticket.dep}`);
    const now = new Date();
    const diffHours = (depDt - now) / 3600000;
    return diffHours > 1;
  },

  /* 判斷車票能否改票（未取票、未改過票、距發車1小時以上） */
  canChangeTicket(ticket) {
    if (ticket.status !== '已付款') return false;
    if (ticket.changed) return false;
    const depDt = new Date(`${ticket.date} ${ticket.dep}`);
    const diffHours = (depDt - new Date()) / 3600000;
    return diffHours > 1;
  },

  /* 判斷電子票能否分票（已付款、未取票） */
  canTransferTicket(ticket) {
    return ticket.status === '已付款' && !ticket.used;
  },

  /* 計算行程費用合計 */
  calcTotalExpense(expenses = []) {
    return expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  },

  /* 計算評分星號字串 */
  renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
  },

  /* 生成隨機 ID */
  genId(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  },

  /* 解析 HH:MM 為分鐘數 */
  timeToMin(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  },

  /* 分鐘數轉 HH:MM */
  minToTime(minutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  },

  /* 格式化持續時間（分鐘）為可讀字串 */
  formatDuration(minutes) {
    if (minutes < 60) return `${minutes}分鐘`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}小時${m}分` : `${h}小時`;
  },

  /* 取得車站名稱 */
  getStationName(id) {
    const s = ALL_STATIONS.find(s => s.id === id);
    return s ? s.name : id;
  },

  /* 取得用戶名稱 */
  getUserName(id) {
    const u = USERS.find(u => u.id === id);
    return u ? u.name : id;
  },

  /* 取得用戶頭像字 */
  getUserAvatar(id) {
    const u = USERS.find(u => u.id === id);
    return u ? u.avatar : '?';
  },
};

/* Toast 通知 */
function showToast(msg, type = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.innerHTML = `<span>${type==='success'?'✓':type==='error'?'✕':'ℹ'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('out'); setTimeout(()=>toast.remove(), 350); }, 3000);
}

/* Modal 開關 */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/* 確認對話框（返回 Promise） */
function confirmDialog(msg) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay open';
    overlay.innerHTML = `
      <div class="modal modal-sm">
        <div class="modal-header"><span class="modal-title">確認操作</span></div>
        <div class="modal-body"><p style="font-size:15px;line-height:1.7;">${msg}</p></div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cd-cancel">取消</button>
          <button class="btn btn-danger"    id="cd-confirm">確認</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#cd-cancel').onclick  = () => { overlay.remove(); resolve(false); };
    overlay.querySelector('#cd-confirm').onclick = () => { overlay.remove(); resolve(true);  };
  });
}

/* Auth helpers */
function checkAuth() {
  const session = Store.getSession();
  if (!session) {
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? 'login.html' : 'pages/login.html';
    return null;
  }
  window.CURRENT_USER = session;
  return session;
}

function updateNavUser() {
  const session = Store.getSession();
  if (!session) return;
  const pts = Store.getPoints();
  const navPts = document.getElementById('nav-points');
  if (navPts) navPts.textContent = `⭐ ${pts.toLocaleString()} 點`;
  const navAvatar = document.getElementById('nav-avatar');
  if (!navAvatar) return;
  navAvatar.textContent = session.avatar || session.name.slice(0, 2);
  if (!document.getElementById('nav-dropdown')) {
    const wrap = document.createElement('div');
    wrap.className = 'nav-avatar-wrap';
    navAvatar.parentNode.insertBefore(wrap, navAvatar);
    wrap.appendChild(navAvatar);
    navAvatar.onclick = toggleUserDropdown;
    const dropdown = document.createElement('div');
    dropdown.id = 'nav-dropdown';
    dropdown.className = 'nav-dropdown';
    dropdown.innerHTML = `<div class="nav-dropdown-name">${session.name}</div><button class="nav-dropdown-btn" onclick="doLogout()">登出</button>`;
    wrap.appendChild(dropdown);
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) dropdown.classList.remove('show');
    });
  }
}

function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('nav-dropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

function doLogout() {
  Store.clearSession();
  const inPages = window.location.pathname.includes('/pages/');
  window.location.href = inPages ? 'login.html' : 'pages/login.html';
}

/* Tab 切換 */
function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === target);
      });
    });
  });
}
