/* ===== Agent TT — Mock Data ===== */
var CURRENT_USER = { id:'u001', name:'張靖程 (JJ)', email:'justin941108@gmail.com', points:1250, avatar:'JJ' };

const USERS = [
  { id:'u001', name:'張靖程 (JJ)', email:'justin941108@gmail.com', points:1250, avatar:'JJ', account:'jj',    password:'jj1234'   },
  { id:'u002', name:'林小明',     email:'ming@example.com',        points:380,  avatar:'明', account:'ming',  password:'ming123'  },
  { id:'u003', name:'陳小華',     email:'hua@example.com',         points:680,  avatar:'華', account:'hua',   password:'hua123'   },
  { id:'u004', name:'王大偉',     email:'david@example.com',       points:120,  avatar:'偉', account:'david', password:'david123' },
];

const ALL_STATIONS = [
  { id:'s001', name:'新竹',   region:'竹竹苗', lat:24.80, lng:120.97 },
  { id:'s002', name:'內灣',   region:'竹竹苗', lat:24.68, lng:121.08 },
  { id:'s003', name:'竹東',   region:'竹竹苗', lat:24.73, lng:121.09 },
  { id:'s004', name:'苗栗',   region:'竹竹苗', lat:24.56, lng:120.82 },
  { id:'s005', name:'造橋',   region:'竹竹苗', lat:24.63, lng:120.86 },
  { id:'s006', name:'銅鑼',   region:'竹竹苗', lat:24.50, lng:120.78 },
  { id:'s007', name:'三義',   region:'竹竹苗', lat:24.38, lng:120.75 },
  { id:'s008', name:'竹南',   region:'竹竹苗', lat:24.68, lng:120.87 },
  { id:'s009', name:'頭份',   region:'竹竹苗', lat:24.68, lng:120.91 },
  { id:'s010', name:'後龍',   region:'竹竹苗', lat:24.62, lng:120.80 },
  { id:'s011', name:'台北',   region:'其他',   lat:25.04, lng:121.51 },
  { id:'s012', name:'台中',   region:'其他',   lat:24.14, lng:120.68 },
  { id:'s013', name:'高雄',   region:'其他',   lat:22.63, lng:120.30 },
  { id:'s014', name:'花蓮',   region:'其他',   lat:23.99, lng:121.60 },
];
const ZHUZHUMIAO_IDS = ALL_STATIONS.filter(s=>s.region==='竹竹苗').map(s=>s.id);

const ATTRACTIONS = {
  s001: [ // 新竹
    { id:'a001', name:'新竹城隍廟', type:'景點', distance:'0.8km', time:'15分鐘', desc:'百年歷史廟宇，廟前小吃聞名全台', emoji:'🏛️' },
    { id:'a002', name:'玻璃工藝博物館', type:'景點', distance:'1.2km', time:'20分鐘', desc:'展示新竹玻璃藝術精品', emoji:'🏛️' },
    { id:'a003', name:'護城河親水公園', type:'景點', distance:'0.5km', time:'10分鐘', desc:'環繞新竹舊城的美麗水岸', emoji:'🌳' },
    { id:'a004', name:'老鍋米粉', type:'餐廳', distance:'0.6km', time:'12分鐘', desc:'新竹在地百年老店米粉湯', emoji:'🍜' },
  ],
  s002: [ // 內灣
    { id:'a005', name:'內灣老街', type:'景點', distance:'0.1km', time:'3分鐘', desc:'保存完整的山城老街風貌', emoji:'🏘️' },
    { id:'a006', name:'合興車站', type:'景點', distance:'3.2km', time:'20分鐘(開車)', desc:'廢棄再利用的浪漫愛情車站', emoji:'🚉' },
    { id:'a007', name:'內灣野薑花粽', type:'餐廳', distance:'0.2km', time:'5分鐘', desc:'內灣名產，葉片清香獨特', emoji:'🍱' },
    { id:'a008', name:'羅馬公路', type:'景點', distance:'5km', time:'30分鐘(開車)', desc:'竹60縣道，春天油桐花盛開', emoji:'🌸' },
  ],
  s004: [ // 苗栗
    { id:'a009', name:'苗栗木雕博物館', type:'景點', distance:'1.5km', time:'25分鐘', desc:'展示客家木雕工藝之美', emoji:'🪵' },
    { id:'a010', name:'南庄老街', type:'景點', distance:'15km', time:'25分鐘(開車)', desc:'山城老街，螢火蟲季聞名', emoji:'🏘️' },
    { id:'a011', name:'客家小炒餐館', type:'餐廳', distance:'0.8km', time:'15分鐘', desc:'正宗客家料理，炒粄條必點', emoji:'🍳' },
  ],
  s003: [ // 竹東
    { id:'a012', name:'竹東美食街', type:'景點', distance:'0.3km', time:'5分鐘', desc:'在地客家美食聚集', emoji:'🍴' },
    { id:'a013', name:'員崠仔公園', type:'景點', distance:'2km', time:'20分鐘', desc:'眺望竹東市區的好去處', emoji:'🌳' },
  ],
};

const ITINERARIES = [
  {
    id:'itin001', name:'竹苗三日遊', startDate:'2026-06-20', endDate:'2026-06-22', days:3,
    startStation:'s002', status:'規劃中', ownerId:'u001', budget:5000,
    collaborators:['u002'],
    linkedTrainOrders:['to001'], linkedHousingOrders:['ho001'],
    days_items:{
      D1:[
        { id:'item001', name:'內灣老街探索', type:'景點', time:'09:30', duration:120, note:'記得買野薑花粽', priority:'must', addedBy:'u001' },
        { id:'item002', name:'野薑花粽午餐', type:'餐廳', time:'12:00', duration:60, note:'', priority:'must', addedBy:'u001' },
        { id:'item003', name:'合興車站', type:'景點', time:'14:00', duration:90, note:'適合拍照', priority:'candidate', addedBy:'u002' },
        { id:'item004', name:'羅馬公路兜風', type:'活動', time:'16:00', duration:120, note:'需要租機車', priority:'candidate', addedBy:'u001' },
      ],
      D2:[
        { id:'item005', name:'新竹城隍廟', type:'景點', time:'09:00', duration:60, note:'', priority:'must', addedBy:'u001' },
        { id:'item006', name:'玻璃工藝博物館', type:'景點', time:'10:30', duration:90, note:'', priority:'candidate', addedBy:'u002' },
        { id:'item007', name:'老鍋米粉午餐', type:'餐廳', time:'12:30', duration:60, note:'百年老店', priority:'must', addedBy:'u001' },
        { id:'item008', name:'護城河散步', type:'景點', time:'14:00', duration:60, note:'', priority:'candidate', addedBy:'u001' },
      ],
      D3:[
        { id:'item009', name:'苗栗木雕博物館', type:'景點', time:'10:00', duration:120, note:'', priority:'must', addedBy:'u001' },
        { id:'item010', name:'客家小炒午餐', type:'餐廳', time:'12:30', duration:60, note:'炒粄條必點', priority:'must', addedBy:'u001' },
      ],
    },
    expenses:[
      { id:'exp001', name:'內灣老街費用', amount:350, type:'景點', paidBy:'u001' },
      { id:'exp002', name:'午餐費用', amount:480, type:'餐飲', paidBy:'u002' },
      { id:'exp003', name:'交通費', amount:300, type:'交通', paidBy:'u001' },
    ],
    votes:{
      item003:{ u001:true, u002:true },
      item004:{ u001:true },
      item006:{ u002:true },
    },
    comments:[
      { id:'c001', userId:'u001', text:'內灣老街的野薑花粽一定要買！', time:'2026-06-01 10:30' },
      { id:'c002', userId:'u002', text:'合興車站我之前去過，很推薦！', time:'2026-06-01 11:15' },
      { id:'c003', userId:'u001', text:'好！那就排進去D1吧', time:'2026-06-01 11:20' },
    ],
  },
  {
    id:'itin002', name:'新竹一日遊', startDate:'2026-05-10', endDate:'2026-05-10', days:1,
    startStation:'s001', status:'已完成', ownerId:'u001', budget:1500,
    collaborators:[], linkedTrainOrders:[], linkedHousingOrders:[],
    days_items:{ D1:[
      { id:'item011', name:'城隍廟參拜', type:'景點', time:'09:00', duration:60, note:'', priority:'must', addedBy:'u001' },
      { id:'item012', name:'米粉午餐', type:'餐廳', time:'12:00', duration:60, note:'', priority:'must', addedBy:'u001' },
    ]},
    expenses:[ { id:'exp010', name:'餐飲', amount:680, type:'餐飲', paidBy:'u001' } ],
    votes:{}, comments:[],
  },
  {
    id:'itin003', name:'苗栗客家文化之旅', startDate:'2026-07-05', endDate:'2026-07-07', days:3,
    startStation:'s004', status:'規劃中', ownerId:'u001', budget:8000,
    collaborators:['u003','u004'], linkedTrainOrders:[], linkedHousingOrders:[],
    days_items:{ D1:[], D2:[], D3:[] }, expenses:[], votes:{}, comments:[],
  },
];

const HOTELS = [
  {
    id:'h001', name:'內灣山居 民宿', station:'s002', stationDist:0.3,
    priceMin:1800, priceMax:2800, rating:4.8, reviewCount:124,
    type:'民宿', amenities:['WiFi','早餐','停車場','寵物友善'],
    images:['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80'], desc:'位於內灣老街旁，坐擁油桐花景致，提供客家早餐與單車租借服務。',
    policies:'入住15:00，退房11:00。訂金50%，免費取消至入住前10天。',
    rooms:[
      { id:'r001', name:'山景雙人房', capacity:2, beds:'1張雙人床', area:18, price:1800, available:3, imageEmoji:'🛏️' },
      { id:'r002', name:'客家四人房', capacity:4, beds:'2張雙人床', area:30, price:2800, available:1, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'林小明', rating:5, text:'超棒的體驗！早餐客家料理很道地。', date:'2026-05-10' },
      { user:'陳曉雯', rating:4, text:'環境很好，老闆熱情。位置稍微難找。', date:'2026-04-22' },
      { user:'王大偉', rating:5, text:'性價比超高，強烈推薦！', date:'2026-04-05' },
    ],
    chat:[
      { from:'u004', name:'王大偉', text:'請問有接送服務嗎？', time:'10:30', mine:false },
      { from:'host', name:'民宿主人', text:'您好，我們提供火車站接送，需要提前預約！', time:'10:35', mine:false },
    ],
  },
  {
    id:'h002', name:'竹東雅客商旅', station:'s003', stationDist:0.1,
    priceMin:1200, priceMax:1800, rating:4.2, reviewCount:87,
    type:'商旅', amenities:['WiFi','停車場','健身房'],
    images:['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'], desc:'鄰近竹東火車站，商務旅行首選，設施完善。',
    policies:'入住14:00，退房12:00。免費取消至入住前7天。',
    rooms:[
      { id:'r003', name:'標準單人房', capacity:1, beds:'1張單人床', area:12, price:1200, available:5, imageEmoji:'🛏️' },
      { id:'r004', name:'豪華雙人房', capacity:2, beds:'1張雙人床', area:22, price:1800, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'張小琪', rating:4, text:'地點很方便，房間乾淨。', date:'2026-05-15' },
      { user:'李建宏', rating:5, text:'CP值高，服務好。', date:'2026-04-18' },
    ],
    chat:[],
  },
  {
    id:'h003', name:'苗栗山城驛站', station:'s004', stationDist:0.5,
    priceMin:2200, priceMax:3500, rating:4.6, reviewCount:203,
    type:'旅館', amenities:['WiFi','早餐','停車場','游泳池','SPA'],
    images:['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'], desc:'苗栗市中心高質感旅館，擁有室外泳池與SPA設施。',
    policies:'入住15:00，退房11:00。客房服務24小時。',
    rooms:[
      { id:'r005', name:'豪華雙人房', capacity:2, beds:'1張King Size床', area:28, price:2200, available:4, imageEmoji:'🛏️' },
      { id:'r006', name:'家庭套房', capacity:4, beds:'1雙人+2單人', area:45, price:3500, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'施美玲', rating:5, text:'SPA超放鬆！早餐選擇多元。', date:'2026-05-20' },
      { user:'黃柏誠', rating:4, text:'設施很好，停車方便。', date:'2026-05-01' },
    ],
    chat:[],
  },
  {
    id:'h004', name:'新竹悠然旅宿', station:'s001', stationDist:0.4,
    priceMin:1500, priceMax:2500, rating:4.4, reviewCount:156,
    type:'旅館', amenities:['WiFi','早餐','停車場','腳踏車租借'],
    images:['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'], desc:'鄰近新竹火車站，提供腳踏車租借，輕鬆遊覽護城河周邊。',
    policies:'入住14:00，退房11:00。',
    rooms:[
      { id:'r007', name:'雙人房', capacity:2, beds:'1張雙人床', area:18, price:1500, available:6, imageEmoji:'🛏️' },
      { id:'r008', name:'三人房', capacity:3, beds:'1雙1單', area:25, price:2500, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'蔡依珊', rating:4, text:'騎腳踏車逛護城河很棒！', date:'2026-05-18' },
    ],
    chat:[],
  },
  /* ===== 造橋 ===== */
  {
    id:'h005', name:'造橋鄉居民宿', station:'s005', stationDist:0.5,
    priceMin:1400, priceMax:2200, rating:4.5, reviewCount:68,
    type:'民宿', amenities:['WiFi','早餐','停車場','腳踏車租借'],
    images:['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'],
    desc:'靜謐田野中的溫馨民宿，提供客家風味早餐，適合放鬆身心的慢旅行。',
    policies:'入住15:00，退房11:00。訂金50%，入住前7天免費取消。',
    rooms:[
      { id:'r009', name:'田園雙人房', capacity:2, beds:'1張雙人床', area:16, price:1400, available:4, imageEmoji:'🛏️' },
      { id:'r010', name:'家庭四人房', capacity:4, beds:'2張雙人床', area:32, price:2200, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'吳雅婷', rating:5, text:'鄉下的寧靜讓人充電！早餐超好吃。', date:'2026-05-12' },
      { user:'陳冠宇', rating:4, text:'環境清幽，老闆很親切。', date:'2026-04-30' },
    ],
    chat:[],
  },
  /* ===== 銅鑼 ===== */
  {
    id:'h006', name:'銅鑼花田驛棧', station:'s006', stationDist:0.6,
    priceMin:1600, priceMax:2600, rating:4.6, reviewCount:92,
    type:'民宿', amenities:['WiFi','早餐','停車場','觀景台'],
    images:['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'],
    desc:'緊鄰銅鑼杭菊花田，每年秋季花開時節景色迷人，是拍照打卡熱點。',
    policies:'入住15:00，退房11:00。旺季（10-11月）訂金不退。',
    rooms:[
      { id:'r011', name:'花田景觀房', capacity:2, beds:'1張雙人床', area:20, price:1600, available:3, imageEmoji:'🛏️' },
      { id:'r012', name:'山居四人套房', capacity:4, beds:'1雙人+2單人', area:36, price:2600, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'劉欣怡', rating:5, text:'杭菊盛開時超美！一定要再來。', date:'2026-05-25' },
      { user:'林建志', rating:4, text:'景色很棒，早餐豐盛。', date:'2026-05-08' },
    ],
    chat:[],
  },
  /* ===== 三義 ===== */
  {
    id:'h007', name:'三義木雕山莊', station:'s007', stationDist:0.8,
    priceMin:2000, priceMax:3200, rating:4.7, reviewCount:148,
    type:'民宿', amenities:['WiFi','早餐','停車場','木雕體驗'],
    images:['https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80'],
    desc:'以木雕藝術為主題的特色民宿，可預約木雕體驗課程，鄰近勝興車站與雲洞山。',
    policies:'入住15:00，退房11:00。免費取消至入住前10天。',
    rooms:[
      { id:'r013', name:'木藝雙人房', capacity:2, beds:'1張雙人床', area:22, price:2000, available:4, imageEmoji:'🛏️' },
      { id:'r014', name:'藝術套房', capacity:2, beds:'1張King Size床', area:35, price:3200, available:1, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'楊宗翰', rating:5, text:'木雕體驗超有趣！房間質感很高。', date:'2026-05-30' },
      { user:'鄭雅如', rating:5, text:'勝興車站步行可達，早餐美味。', date:'2026-05-14' },
      { user:'黃柏文', rating:4, text:'環境幽靜，很有特色。', date:'2026-04-28' },
    ],
    chat:[],
  },
  {
    id:'h008', name:'三義老街文旅', station:'s007', stationDist:0.3,
    priceMin:1500, priceMax:2200, rating:4.3, reviewCount:74,
    type:'商旅', amenities:['WiFi','停車場','早餐'],
    images:['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
    desc:'位於三義老街旁，逛街購物超方便，提供台式早餐。',
    policies:'入住14:00，退房12:00。',
    rooms:[
      { id:'r015', name:'標準雙人房', capacity:2, beds:'1張雙人床', area:16, price:1500, available:5, imageEmoji:'🛏️' },
      { id:'r016', name:'家庭三人房', capacity:3, beds:'1雙1單', area:24, price:2200, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'許淑婷', rating:4, text:'地點好，老街逛到腳軟！', date:'2026-05-22' },
    ],
    chat:[],
  },
  /* ===== 竹南 ===== */
  {
    id:'h009', name:'竹南海灣商旅', station:'s008', stationDist:0.2,
    priceMin:1300, priceMax:2000, rating:4.2, reviewCount:83,
    type:'商旅', amenities:['WiFi','停車場','早餐','健身房'],
    images:['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'],
    desc:'交通樞紐旁的現代商旅，竹南轉乘首選，設施完善、CP值高。',
    policies:'入住14:00，退房12:00。',
    rooms:[
      { id:'r017', name:'單人商務房', capacity:1, beds:'1張單人床', area:12, price:1300, available:6, imageEmoji:'🛏️' },
      { id:'r018', name:'標準雙人房', capacity:2, beds:'1張雙人床', area:18, price:2000, available:3, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'江明輝', rating:4, text:'轉車很方便，房間乾淨。', date:'2026-05-16' },
      { user:'周雅惠', rating:4, text:'CP值高，早餐選擇不錯。', date:'2026-05-02' },
    ],
    chat:[],
  },
  /* ===== 頭份 ===== */
  {
    id:'h010', name:'頭份客家風情館', station:'s009', stationDist:0.7,
    priceMin:1600, priceMax:2400, rating:4.5, reviewCount:105,
    type:'民宿', amenities:['WiFi','早餐','停車場','客家文化體驗'],
    images:['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
    desc:'以客家文化為主題，提供擂茶DIY與客家美食體驗，感受道地苗栗風情。',
    policies:'入住15:00，退房11:00。訂金50%，免費取消至入住前7天。',
    rooms:[
      { id:'r019', name:'客家雙人房', capacity:2, beds:'1張雙人床', area:18, price:1600, available:4, imageEmoji:'🛏️' },
      { id:'r020', name:'庭院四人房', capacity:4, beds:'2張雙人床', area:34, price:2400, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'徐志豪', rating:5, text:'擂茶DIY超有趣！客家早餐很豐盛。', date:'2026-06-01' },
      { user:'廖美芳', rating:4, text:'充滿客家特色，環境舒適。', date:'2026-05-18' },
    ],
    chat:[],
  },
  /* ===== 後龍 ===== */
  {
    id:'h011', name:'後龍海風民宿', station:'s010', stationDist:1.0,
    priceMin:1500, priceMax:2300, rating:4.4, reviewCount:89,
    type:'民宿', amenities:['WiFi','早餐','停車場','衝浪課程','腳踏車租借'],
    images:['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
    desc:'靠近後龍海岸，可安排衝浪或海岸漫步，夕陽景色絕美，提供新鮮海味早餐。',
    policies:'入住15:00，退房11:00。旺季（暑假）訂金不退。',
    rooms:[
      { id:'r021', name:'海景雙人房', capacity:2, beds:'1張雙人床', area:18, price:1500, available:4, imageEmoji:'🛏️' },
      { id:'r022', name:'家庭套房', capacity:4, beds:'1雙人+2單人', area:38, price:2300, available:2, imageEmoji:'🛏️' },
    ],
    reviews:[
      { user:'謝宇翔', rating:5, text:'夕陽超美！衝浪教練很專業。', date:'2026-06-03' },
      { user:'陳靜宜', rating:4, text:'海鮮早餐新鮮好吃，環境放鬆。', date:'2026-05-20' },
      { user:'王俊傑', rating:4, text:'騎腳踏車沿海岸線超享受。', date:'2026-05-05' },
    ],
    chat:[],
  },
];

const HOUSING_ORDERS = [
  {
    id:'ho001', hotelId:'h001', roomId:'r001', userId:'u001',
    checkIn:'2026-06-20', checkOut:'2026-06-22', guests:2, nights:2,
    roomName:'山景雙人房', hotelName:'內灣山居 民宿',
    roomPrice:1800, discount:0, totalAmount:3600,
    status:'已付款', payMethod:'信用卡', paidAt:'2026-05-15 14:30',
    itineraryId:'itin001',
  },
  {
    id:'ho002', hotelId:'h002', roomId:'r004', userId:'u001',
    checkIn:'2026-05-10', checkOut:'2026-05-11', guests:1, nights:1,
    roomName:'豪華雙人房', hotelName:'竹東雅客商旅',
    roomPrice:1800, discount:180, totalAmount:1620,
    status:'已完成', payMethod:'電子支付', paidAt:'2026-04-20 09:00',
    itineraryId:'itin002',
  },
];

const TRAIN_SCHEDULES = [
  { id:'tr001', trainNo:'3501', type:'區間', from:'s011', to:'s001', dep:'07:20', arr:'08:35', duration:75, price:{full:174,half:87,child:87}, seats:68, delay:0 },
  { id:'tr002', trainNo:'3503', type:'區間', from:'s011', to:'s001', dep:'08:00', arr:'09:15', duration:75, price:{full:174,half:87,child:87}, seats:12, delay:0 },
  { id:'tr003', trainNo:'139',  type:'自強', from:'s011', to:'s001', dep:'08:30', arr:'09:17', duration:47, price:{full:218,half:109,child:109}, seats:0,  delay:0 },
  { id:'tr004', trainNo:'3505', type:'區間', from:'s011', to:'s001', dep:'09:00', arr:'10:15', duration:75, price:{full:174,half:87,child:87}, seats:96, delay:10 },
  { id:'tr005', trainNo:'141',  type:'自強', from:'s011', to:'s001', dep:'09:30', arr:'10:17', duration:47, price:{full:218,half:109,child:109}, seats:34, delay:0 },
  { id:'tr006', trainNo:'5001', type:'莒光', from:'s011', to:'s001', dep:'10:00', arr:'11:02', duration:62, price:{full:196,half:98,child:98}, seats:55, delay:0 },
  { id:'tr007', trainNo:'3507', type:'區間', from:'s011', to:'s002', dep:'07:45', arr:'09:40', duration:115, price:{full:210,half:105,child:105}, seats:82, delay:0 },
  { id:'tr008', trainNo:'3509', type:'區間', from:'s011', to:'s002', dep:'09:15', arr:'11:10', duration:115, price:{full:210,half:105,child:105}, seats:47, delay:0 },
  { id:'tr009', trainNo:'3511', type:'區間', from:'s001', to:'s004', dep:'10:00', arr:'10:52', duration:52, price:{full:84,half:42,child:42}, seats:120, delay:0 },
  { id:'tr010', trainNo:'3513', type:'區間', from:'s001', to:'s004', dep:'12:30', arr:'13:22', duration:52, price:{full:84,half:42,child:42}, seats:65, delay:0 },
  // 台北→新竹 下午/晚上
  { id:'tr011', trainNo:'3509', type:'區間', from:'s011', to:'s001', dep:'11:00', arr:'12:15', duration:75, price:{full:174,half:87,child:87}, seats:88, delay:0 },
  { id:'tr012', trainNo:'143',  type:'自強', from:'s011', to:'s001', dep:'12:00', arr:'12:47', duration:47, price:{full:218,half:109,child:109}, seats:22, delay:0 },
  { id:'tr013', trainNo:'3515', type:'區間', from:'s011', to:'s001', dep:'13:30', arr:'14:45', duration:75, price:{full:174,half:87,child:87}, seats:105, delay:0 },
  { id:'tr014', trainNo:'145',  type:'自強', from:'s011', to:'s001', dep:'14:30', arr:'15:17', duration:47, price:{full:218,half:109,child:109}, seats:58, delay:0 },
  { id:'tr015', trainNo:'5003', type:'莒光', from:'s011', to:'s001', dep:'15:30', arr:'16:32', duration:62, price:{full:196,half:98,child:98}, seats:40, delay:0 },
  { id:'tr016', trainNo:'3517', type:'區間', from:'s011', to:'s001', dep:'16:00', arr:'17:15', duration:75, price:{full:174,half:87,child:87}, seats:73, delay:5 },
  { id:'tr017', trainNo:'147',  type:'自強', from:'s011', to:'s001', dep:'17:00', arr:'17:47', duration:47, price:{full:218,half:109,child:109}, seats:0,  delay:0 },
  { id:'tr018', trainNo:'3519', type:'區間', from:'s011', to:'s001', dep:'18:00', arr:'19:15', duration:75, price:{full:174,half:87,child:87}, seats:94, delay:0 },
  { id:'tr019', trainNo:'149',  type:'自強', from:'s011', to:'s001', dep:'19:00', arr:'19:47', duration:47, price:{full:218,half:109,child:109}, seats:31, delay:0 },
  { id:'tr020', trainNo:'3521', type:'區間', from:'s011', to:'s001', dep:'20:30', arr:'21:45', duration:75, price:{full:174,half:87,child:87}, seats:112, delay:0 },
  { id:'tr021', trainNo:'151',  type:'自強', from:'s011', to:'s001', dep:'21:30', arr:'22:17', duration:47, price:{full:218,half:109,child:109}, seats:45, delay:0 },
  // 台北→內灣 下午/晚上
  { id:'tr022', trainNo:'3523', type:'區間', from:'s011', to:'s002', dep:'11:30', arr:'13:25', duration:115, price:{full:210,half:105,child:105}, seats:63, delay:0 },
  { id:'tr023', trainNo:'3525', type:'區間', from:'s011', to:'s002', dep:'13:45', arr:'15:40', duration:115, price:{full:210,half:105,child:105}, seats:88, delay:0 },
  { id:'tr024', trainNo:'3527', type:'區間', from:'s011', to:'s002', dep:'15:30', arr:'17:25', duration:115, price:{full:210,half:105,child:105}, seats:22, delay:0 },
  { id:'tr025', trainNo:'3529', type:'區間', from:'s011', to:'s002', dep:'17:15', arr:'19:10', duration:115, price:{full:210,half:105,child:105}, seats:75, delay:0 },
  { id:'tr026', trainNo:'3531', type:'區間', from:'s011', to:'s002', dep:'19:30', arr:'21:25', duration:115, price:{full:210,half:105,child:105}, seats:50, delay:0 },
  // 新竹→苗栗 下午/晚上
  { id:'tr027', trainNo:'3515', type:'區間', from:'s001', to:'s004', dep:'14:00', arr:'14:52', duration:52, price:{full:84,half:42,child:42}, seats:90, delay:0 },
  { id:'tr028', trainNo:'3517', type:'區間', from:'s001', to:'s004', dep:'16:30', arr:'17:22', duration:52, price:{full:84,half:42,child:42}, seats:48, delay:0 },
  { id:'tr029', trainNo:'3519', type:'區間', from:'s001', to:'s004', dep:'18:00', arr:'18:52', duration:52, price:{full:84,half:42,child:42}, seats:110, delay:0 },
  { id:'tr030', trainNo:'3521', type:'區間', from:'s001', to:'s004', dep:'20:00', arr:'20:52', duration:52, price:{full:84,half:42,child:42}, seats:35, delay:0 },
];

const TRAIN_TICKETS = [
  {
    id:'tt001', scheduleId:'tr009', userId:'u001',
    trainNo:'3511', type:'區間', from:'新竹', to:'苗栗', dep:'10:00', arr:'10:52', date:'2026-06-20',
    seatCar:3, seatNo:'15A', ticketType:'全票', price:84,
    status:'已付款', qrCode:'TT-3511-20260620-15A-001',
    canRefund:true, canChange:true, canTransfer:true,
    itineraryId:'itin001',
  },
  {
    id:'tt002', scheduleId:'tr001', userId:'u001',
    trainNo:'3501', type:'區間', from:'台北', to:'新竹', dep:'07:20', arr:'08:35', date:'2026-05-10',
    seatCar:2, seatNo:'8B', ticketType:'全票', price:174,
    status:'已使用', qrCode:'TT-3501-20260510-8B-002',
    canRefund:false, canChange:false, canTransfer:false,
    itineraryId:'itin002',
  },
  {
    id:'tt003', scheduleId:'tr007', userId:'u001',
    trainNo:'3507', type:'區間', from:'台北', to:'內灣', dep:'07:45', arr:'09:40', date:'2026-06-20',
    seatCar:1, seatNo:'22C', ticketType:'全票', price:210,
    status:'已付款', qrCode:'TT-3507-20260620-22C-003',
    canRefund:true, canChange:true, canTransfer:true,
    itineraryId:'itin001',
  },
];

const TRAIN_DISCOUNTS = [
  { id:'d001', name:'學生優惠', rate:0.8, condition:'學生證' },
  { id:'d002', name:'早鳥30天', rate:0.9, condition:'發車前30天以上購票' },
  { id:'d003', name:'週末假日加價', rate:1.1, condition:'六日假日' },
];
