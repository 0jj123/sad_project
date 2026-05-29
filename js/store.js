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
  },

  reset() {
    ['itineraries','housing_orders','train_tickets','favorites','cart','user_points','initialized']
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
};
