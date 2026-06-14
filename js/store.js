/* ===== Agent TT — LocalStorage State Store ===== */
const Store = {
  _get(key) {
    try { return JSON.parse(localStorage.getItem('agenttt_' + key)); } catch { return null; }
  },
  _set(key, val) {
    localStorage.setItem('agenttt_' + key, JSON.stringify(val));
  },

  /* 初始化假資料（首次載入） */
  init() {
    if (!this._get('initialized_v2')) {
      this._set('itineraries', ITINERARIES);
      this._set('housing_orders', HOUSING_ORDERS);
      this._set('train_tickets', TRAIN_TICKETS);
      this._set('favorites', []);
      this._set('cart', []);
      this._set('user_points', CURRENT_USER.points);
      this._set('initialized', true);
      this._set('initialized_v2', true);
    }
    const existingUsers = this._get('registered_users');
    if (!existingUsers || !Array.isArray(existingUsers) || existingUsers.some(u => !u.account)) {
      this._set('registered_users', Array.isArray(existingUsers) ? existingUsers.filter(u => u.account) : []);
    }
    // 確保展示帳號與管理員存在
    if (!this._get('initialized_v3')) {
      const demoUsers = [
        ...USERS,
        { id:'admin001', name:'平台管理者', account:'admin', password:'admin123', role:'admin', avatar:'管' },
      ];
      this._set('registered_users', demoUsers);
      this._set('initialized_v3', true);
    }
    // 補充各車站住宿資料
    if (!this._get('initialized_v4')) {
      this._set('hotels', HOTELS);
      this._set('initialized_v4', true);
    }
  },

  reset() {
    ['itineraries','housing_orders','train_tickets','favorites','cart','user_points','ticket_purchase_count','initialized','registered_users','session']
      .forEach(k => localStorage.removeItem('agenttt_' + k));
    this.init();
  },

  /* Itineraries */
  /* Hotels */
  getHotels() {
    const stored = this._get('hotels') || [];
    if (!stored.length) { this._set('hotels', HOTELS); return HOTELS; }
    const ids = new Set(stored.map(h => h.id));
    const missing = HOTELS.filter(h => !ids.has(h.id));
    if (missing.length) {
      const merged = [...stored, ...missing];
      this._set('hotels', merged);
      return merged;
    }
    return stored;
  },
  saveHotels(data) { this._set('hotels', data); },
  addHotel(hotel) { const list = this.getHotels(); list.push(hotel); this.saveHotels(list); },
  updateHotel(id, patch) {
    const list = this.getHotels();
    const idx = list.findIndex(h => h.id === id);
    if (idx >= 0) list[idx] = { ...list[idx], ...patch };
    this.saveHotels(list);
  },
  deleteHotel(id) { this.saveHotels(this.getHotels().filter(h => h.id !== id)); },

  getItineraries() { return this._get('itineraries') || []; },
  saveItineraries(data) { this._set('itineraries', data); },
  getItinerary(id) { return this.getItineraries().find(i => i.id === id) || null; },
  saveItinerary(itin) {
    const list = this.getItineraries();
    const idx = list.findIndex(i => i.id === itin.id);
    if (idx >= 0) list[idx] = itin; else list.push(itin);
    this.saveItineraries(list);
  },
  deleteItinerary(id) {
    this.saveItineraries(this.getItineraries().filter(i => i.id !== id));
  },

  /* Housing Orders */
  getHousingOrders() { return this._get('housing_orders') || []; },
  saveHousingOrders(data) { this._set('housing_orders', data); },
  addHousingOrder(order) {
    const list = this.getHousingOrders();
    list.push(order);
    this.saveHousingOrders(list);
  },
  updateHousingOrder(id, patch) {
    const list = this.getHousingOrders();
    const idx = list.findIndex(o => o.id === id);
    if (idx >= 0) list[idx] = { ...list[idx], ...patch };
    this.saveHousingOrders(list);
  },

  /* Train Tickets */
  getTrainTickets() { return this._get('train_tickets') || []; },
  saveTrainTickets(data) { this._set('train_tickets', data); },
  addTrainTicket(ticket) {
    const list = this.getTrainTickets();
    list.push(ticket);
    this.saveTrainTickets(list);
  },
  updateTrainTicket(id, patch) {
    const list = this.getTrainTickets();
    const idx = list.findIndex(t => t.id === id);
    if (idx >= 0) list[idx] = { ...list[idx], ...patch };
    this.saveTrainTickets(list);
  },

  /* Favorites */
  getFavorites() { return this._get('favorites') || []; },
  toggleFavorite(hotelId) {
    let favs = this.getFavorites();
    if (favs.includes(hotelId)) favs = favs.filter(id => id !== hotelId);
    else favs.push(hotelId);
    this._set('favorites', favs);
    return favs.includes(hotelId);
  },
  isFavorite(hotelId) { return this.getFavorites().includes(hotelId); },

  /* Cart */
  getCart() { return this._get('cart') || []; },
  addToCart(item) {
    const cart = this.getCart();
    if (!cart.find(c => c.hotelId === item.hotelId && c.roomId === item.roomId)) {
      cart.push(item);
      this._set('cart', cart);
    }
  },
  removeFromCart(hotelId, roomId) {
    this._set('cart', this.getCart().filter(c => !(c.hotelId===hotelId && c.roomId===roomId)));
  },

  /* Points */
  getPoints() { return this._get('user_points') || 0; },
  addPoints(n) { this._set('user_points', this.getPoints() + n); },
  usePoints(n) {
    const p = this.getPoints();
    if (p < n) return false;
    this._set('user_points', p - n);
    return true;
  },

  /* Auth / Session */
  getSession() { return this._get('session'); },
  setSession(user) { this._set('session', user); },
  clearSession() { localStorage.removeItem('agenttt_session'); },
  getRegisteredUsers() { return this._get('registered_users') || []; },
  registerUser(user) {
    const users = this.getRegisteredUsers();
    if (users.find(u => u.account === user.account)) return false;
    users.push(user);
    this._set('registered_users', users);
    return true;
  },
  loginUser(account, password) {
    return this.getRegisteredUsers().find(u => u.account === account && u.password === password) || null;
  },

  /* Discount Settings */
  getDiscountSettings() { return this._get('discount_settings'); },
  saveDiscountSettings(settings) { this._set('discount_settings', settings); },

  /* Price History（歷史定價紀錄） */
  getPriceHistory() { return this._get('price_history') || []; },
  addPriceHistory(record) {
    const list = this.getPriceHistory();
    list.unshift(record); // 最新在前
    this._set('price_history', list);
  },

  /* Ticket Purchase Count（滿5次贈30點，退票不計） */
  getTicketPurchaseCount() { return this._get('ticket_purchase_count') || 0; },
  incrementTicketPurchaseCount() {
    const count = this.getTicketPurchaseCount() + 1;
    this._set('ticket_purchase_count', count);
    if (count % 5 === 0) { this.addPoints(30); return 30; }
    return 0;
  },
  decrementTicketPurchaseCount() {
    const count = Math.max(0, this.getTicketPurchaseCount() - 1);
    this._set('ticket_purchase_count', count);
  },
};
