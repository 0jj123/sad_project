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
    if (!this._get('initialized')) {
      this._set('itineraries', ITINERARIES);
      this._set('housing_orders', HOUSING_ORDERS);
      this._set('train_tickets', TRAIN_TICKETS);
      this._set('favorites', []);
      this._set('cart', []);
      this._set('user_points', CURRENT_USER.points);
      this._set('initialized', true);
    }
    if (!this._get('registered_users')) {
      this._set('registered_users', [
        { id:'u001', name:'張靖程 (JJ)', email:'justin941108@gmail.com', password:'demo1234', avatar:'JJ' },
        { id:'u002', name:'林小明',      email:'ming@example.com',        password:'demo1234', avatar:'明' },
        { id:'u003', name:'陳小華',      email:'hua@example.com',         password:'demo1234', avatar:'華' },
      ]);
    }
  },

  reset() {
    ['itineraries','housing_orders','train_tickets','favorites','cart','user_points','ticket_purchase_count','initialized','registered_users','session']
      .forEach(k => localStorage.removeItem('agenttt_' + k));
    this.init();
  },

  /* Itineraries */
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
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    this._set('registered_users', users);
    return true;
  },
  loginUser(email, password) {
    return this.getRegisteredUsers().find(u => u.email === email && u.password === password) || null;
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
