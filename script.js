// ========== DATA ==========
let wishlist = JSON.parse(localStorage.getItem('wishlistCoquette')) || [];
let categories = JSON.parse(localStorage.getItem('wishlistCategories')) || [];
let trashItems = JSON.parse(localStorage.getItem('wishlistTrash')) || [];
let currentEditIndex = -1;
let currentEditCategoryId = null;
let currentTheme = localStorage.getItem('wishlistTheme') || 'blush';
let isDarkMode = localStorage.getItem('wishlistDarkMode') === 'true';
let currentLang = localStorage.getItem('wishlistLang') || 'id';
let pendingDeleteIndex = -1;
let visionMode = false;

function saveWishlist() { localStorage.setItem('wishlistCoquette', JSON.stringify(wishlist)); }
function saveCategories() { localStorage.setItem('wishlistCategories', JSON.stringify(categories)); }
function saveTrash() { localStorage.setItem('wishlistTrash', JSON.stringify(trashItems)); }
function saveDarkMode() { localStorage.setItem('wishlistDarkMode', isDarkMode); }
function saveLang() { localStorage.setItem('wishlistLang', currentLang); }

// ========== TRANSLATIONS ==========
const translations = {
    id: {
        subtitle: 'Barang yang ingin aku beli 🛍️',
        theme_label: 'Tema',
        tab_add: 'Tambah', tab_wishlist: 'Wishlist', tab_categories: 'Kategori', tab_stats: 'Statistik', tab_trash: 'Sampah',
        form_title_add: 'Tambah Wishlist Baru',
        label_name: 'Nama Produk', label_category: 'Kategori', label_link: 'Link Produk',
        label_image: 'Gambar Produk (URL)', label_price: 'Harga (Rp)', label_note: 'Catatan Personal',
        label_store_detected: 'Toko Terdeteksi',
        label_target_date: 'Tanggal Target', label_target_time: 'Jam Target',
        option_no_category: 'Tanpa Kategori',
        btn_add: 'Tambah ke Wishlist', btn_cancel: 'Batal', btn_save: 'Simpan',
        btn_show_all: 'Tampilkan Semua', btn_add_first: 'Tambah Sekarang', btn_add_category: 'Tambah Kategori',
        btn_clear_datetime: 'Bersihkan Tanggal & Jam',
        btn_vision: 'Vision Board',
        btn_clear_trash: 'Kosongkan Sampah',
        wishlist_count_1: 'Kamu punya', wishlist_count_2: 'item di wishlist',
        total_label: 'Total Wishlist',
        filter_all_categories: 'Semua Kategori', filter_all_stores: 'Semua Toko',
        sort_label: 'Urutkan:', sort_newest: 'Terbaru', sort_oldest: 'Terlama',
        sort_expensive: 'Termahal', sort_cheapest: 'Termurah', sort_az: 'Nama A-Z', sort_za: 'Nama Z-A',
        sort_priority_high: 'Prioritas Tinggi', sort_priority_low: 'Prioritas Rendah',
        sort_deadline_near: 'Target Terdekat', sort_deadline_far: 'Target Terlama',
        no_result_title: 'Produk tidak ditemukan', no_result_text: 'Coba kata kunci lain!',
        empty_title: 'Wishlist kamu masih kosong', empty_text: 'Yuk, tambahkan produk impianmu dulu!',
        cat_form_title: 'Tambah Kategori Baru', cat_list_title: 'Daftar Kategori',
        cat_empty_title: 'Belum ada kategori', cat_empty_text: 'Buat kategori pertamamu di atas!',
        cat_name_label: 'Nama Kategori',
        modal_edit_title: 'Edit Wishlist', modal_edit_cat_title: 'Edit Kategori',
        theme_modal_title: 'Pilih Tema',
        stat_total_items: 'Total Produk', stat_total_price: 'Total Harga',
        stat_purchased: 'Sudah Dibeli', stat_not_purchased: 'Belum Dibeli',
        stat_top_category: 'Kategori Terbanyak', stat_top_store: 'Toko Terbanyak',
        stat_most_expensive: 'Termahal', stat_cheapest: 'Termurah',
        confirm_title: 'Hapus Produk?',
        confirm_text: 'Yakin ingin menghapus produk ini?',
        btn_delete: 'Hapus',
        trash_count_1: 'Kamu punya', trash_count_2: 'produk di sampah',
        trash_empty_title: 'Sampah kosong', trash_empty_text: 'Produk yang dihapus akan muncul di sini',
        toast_added: 'Berhasil ditambahkan! 🎀', toast_updated: 'Wishlist diperbarui! ✨',
        toast_deleted: 'Item dipindah ke sampah 🗑️', toast_cat_added: 'Kategori ditambahkan! 🏷️',
        toast_cat_updated: 'Kategori diperbarui! ✨', toast_cat_deleted: 'Kategori dihapus! 🗑️',
        toast_purchased: 'Yay, wishlist tercapai! 🎉',
        confirm_delete_item: 'Yakin ingin menghapus',
        confirm_delete_cat: 'Produk akan jadi "Tanpa Kategori". Lanjutkan?',
        label_purchased: 'Dibeli', label_not_purchased: 'Belum dibeli',
        label_no_link: 'Tanpa link', label_open_link: 'Buka Link', label_no_name: 'Tanpa Nama',
        search_result: 'Menampilkan ${visible} dari ${total} produk',
        store_total_format: '${name}: Rp ${total}'
    },
    en: {
        subtitle: 'Things I want to buy 🛍️',
        theme_label: 'Theme',
        tab_add: 'Add', tab_wishlist: 'Wishlist', tab_categories: 'Categories', tab_stats: 'Statistics', tab_trash: 'Trash',
        form_title_add: 'Add New Wishlist',
        label_name: 'Product Name', label_category: 'Category', label_link: 'Product Link',
        label_image: 'Product Image (URL)', label_price: 'Price (Rp)', label_note: 'Personal Note',
        label_store_detected: 'Store Detected',
        label_target_date: 'Target Date', label_target_time: 'Target Time',
        option_no_category: 'No Category',
        btn_add: 'Add to Wishlist', btn_cancel: 'Cancel', btn_save: 'Save',
        btn_show_all: 'Show All', btn_add_first: 'Add Now', btn_add_category: 'Add Category',
        btn_clear_datetime: 'Clear Date & Time',
        btn_vision: 'Vision Board',
        btn_clear_trash: 'Clear Trash',
        wishlist_count_1: 'You have', wishlist_count_2: 'items in wishlist',
        total_label: 'Total Wishlist',
        filter_all_categories: 'All Categories', filter_all_stores: 'All Stores',
        sort_label: 'Sort:', sort_newest: 'Newest', sort_oldest: 'Oldest',
        sort_expensive: 'Most Expensive', sort_cheapest: 'Cheapest', sort_az: 'Name A-Z', sort_za: 'Name Z-A',
        sort_priority_high: 'Highest Priority', sort_priority_low: 'Lowest Priority',
        sort_deadline_near: 'Nearest Deadline', sort_deadline_far: 'Farthest Deadline',
        no_result_title: 'Product not found', no_result_text: 'Try another keyword!',
        empty_title: 'Your wishlist is empty', empty_text: 'Add your dream products first!',
        cat_form_title: 'Add New Category', cat_list_title: 'Category List',
        cat_empty_title: 'No categories yet', cat_empty_text: 'Create your first category above!',
        cat_name_label: 'Category Name',
        modal_edit_title: 'Edit Wishlist', modal_edit_cat_title: 'Edit Category',
        theme_modal_title: 'Choose Theme',
        stat_total_items: 'Total Items', stat_total_price: 'Total Price',
        stat_purchased: 'Purchased', stat_not_purchased: 'Not Purchased',
        stat_top_category: 'Top Category', stat_top_store: 'Top Store',
        stat_most_expensive: 'Most Expensive', stat_cheapest: 'Cheapest',
        confirm_title: 'Delete Product?',
        confirm_text: 'Are you sure you want to delete this product?',
        btn_delete: 'Delete',
        trash_count_1: 'You have', trash_count_2: 'products in trash',
        trash_empty_title: 'Trash is empty', trash_empty_text: 'Deleted products will appear here',
        toast_added: 'Successfully added! 🎀', toast_updated: 'Wishlist updated! ✨',
        toast_deleted: 'Item moved to trash 🗑️', toast_cat_added: 'Category added! 🏷️',
        toast_cat_updated: 'Category updated! ✨', toast_cat_deleted: 'Category deleted! 🗑️',
        toast_purchased: 'Yay, wishlist achieved! 🎉',
        confirm_delete_item: 'Are you sure you want to delete',
        confirm_delete_cat: 'Items will become "No Category". Continue?',
        label_purchased: 'Purchased', label_not_purchased: 'Not purchased',
        label_no_link: 'No link', label_open_link: 'Open Link', label_no_name: 'No Name',
        search_result: 'Showing ${visible} of ${total} products',
        store_total_format: '${name}: Rp ${total}'
    }
};

function t(key, vars = {}) {
    let text = (translations[currentLang] && translations[currentLang][key]) || translations['id'][key] || key;
    for (const [k, v] of Object.entries(vars)) text = text.replace('${' + k + '}', v);
    return text;
}

function applyLanguage() {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang] && translations[currentLang][key]) el.textContent = translations[currentLang][key];
    });
    document.querySelectorAll('.category-select option[value=""]').forEach(opt => opt.textContent = t('option_no_category'));
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLang) btn.classList.add('active');
    });
    
    const placeholders = {
        productName: { id: 'Contoh: Dress vintage putih...', en: 'E.g.: Vintage white dress...' },
        productLink: { id: 'Masukkan link produk...', en: 'Enter product link...' },
        productImage: { id: 'https://...', en: 'https://...' },
        productPrice: { id: '150000', en: '150000' },
        productNote: { id: 'Contoh: Buat kado ultah mama...', en: 'E.g.: Gift for mom...' },
        searchInput: { id: 'Cari produk...', en: 'Search products...' },
        newCategoryName: { id: 'Nama kategori...', en: 'Category name...' },
        editProductName: { id: 'Contoh: Dress vintage putih...', en: 'E.g.: Vintage white dress...' },
        editProductLink: { id: 'Masukkan link produk...', en: 'Enter product link...' },
        editProductImage: { id: 'https://...', en: 'https://...' },
        editProductPrice: { id: '150000', en: '150000' },
        editProductNote: { id: 'Contoh: Buat kado ultah mama...', en: 'E.g.: Gift for mom...' }
    };

    for (const [id, texts] of Object.entries(placeholders)) {
        const el = document.getElementById(id);
        if (el) el.placeholder = texts[currentLang] || texts.id;
    }
    
    if (document.getElementById('tabList').classList.contains('active')) { renderCustomSelects(); renderWishlist(); }
    if (document.getElementById('tabCategories').classList.contains('active')) renderCategoryList();
    if (document.getElementById('tabTrash').classList.contains('active')) renderTrash();
    populateCategoryDropdowns();
}

function changeLanguage(lang) { 
    currentLang = lang; 
    saveLang(); 
    applyLanguage(); 
    initDateTimeSelects(); 
}

// ========== STORE DETECTION ==========
const STORE_COLORS = ['#EE4D2D','#42B549','#0F1464','#000000','#232F3E','#FF6A00','#E91E63','#9C27B0','#3F51B5','#009688','#FF5722','#795548'];

function extractStoreFromUrl(url) {
    if (!url) return null;
    try {
        let hostname = url.replace(/^https?:\/\//, '').split('/')[0].toLowerCase().replace(/^www\./, '');
        if (hostname.includes('shopee')) return { name: 'Shopee', domain: 'shopee' };
        if (hostname.includes('tokopedia')) return { name: 'Tokopedia', domain: 'tokopedia' };
        if (hostname.includes('lazada')) return { name: 'Lazada', domain: 'lazada' };
        if (hostname.includes('tiktok')) return { name: 'TikTok Shop', domain: 'tiktok' };
        if (hostname.includes('amazon')) return { name: 'Amazon', domain: 'amazon' };
        if (hostname.includes('alibaba') || hostname.includes('aliexpress')) return { name: 'Alibaba', domain: 'alibaba' };
        const parts = hostname.split('.');
        const TLDs = ['com','co','id','net','org','io','sg','my','vn','th','ph'];
        let storeName = parts.find(p => !TLDs.includes(p)) || parts[0];
        return { name: storeName.charAt(0).toUpperCase() + storeName.slice(1), domain: storeName.toLowerCase() };
    } catch (e) { return null; }
}

function getStoreColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return STORE_COLORS[Math.abs(hash) % STORE_COLORS.length];
}

// ========== DARK MODE ==========
function toggleDarkMode() { isDarkMode = !isDarkMode; saveDarkMode(); applyDarkMode(); updateDarkModeIcon(); updateThemeColorMeta(); renderWishlist(); }
function applyDarkMode() { document.body.classList.toggle('dark-mode', isDarkMode); }
function updateDarkModeIcon() {
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) icon.className = isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ========== TEMA ==========
const THEME_ORDER = ['blush', 'lavender', 'peach', 'matcha', 'blue', 'caramel', 'berry', 'pearl', 'ocean', 'charcoal'];
const THEME_NAMES = {
    blush: 'Blush', lavender: 'Lavender', peach: 'Peach', matcha: 'Matcha', blue: 'Blue',
    caramel: 'Caramel', berry: 'Berry', pearl: 'Pearl', ocean: 'Ocean', charcoal: 'Charcoal'
};
const THEME_COLORS = {
    blush: { dot: 'linear-gradient(135deg, #F8C8DC, #F5B5CB)', bg: '#FDE2E7', theme: '#F8C8DC' },
    lavender: { dot: 'linear-gradient(135deg, #C3AED6, #B09CC8)', bg: '#E8DFF5', theme: '#C3AED6' },
    peach: { dot: 'linear-gradient(135deg, #F8B88B, #F5A578)', bg: '#FDE8D8', theme: '#F8B88B' },
    matcha: { dot: 'linear-gradient(135deg, #A8C89A, #8FB882)', bg: '#E8F0E3', theme: '#A8C89A' },
    blue: { dot: 'linear-gradient(135deg, #A8C8E8, #8FB8DA)', bg: '#E0ECF5', theme: '#A8C8E8' },
    caramel: { dot: 'linear-gradient(135deg, #D4A574, #C4905E)', bg: '#F5E6D3', theme: '#D4A574' },
    berry: { dot: 'linear-gradient(135deg, #C48BA8, #B07090)', bg: '#F5E0EC', theme: '#C48BA8' },
    pearl: { dot: 'linear-gradient(135deg, #D4C5B0, #C0B098)', bg: '#FAF5F0', theme: '#D4C5B0' },
    ocean: { dot: 'linear-gradient(135deg, #7EC8C8, #5EB8B8)', bg: '#D8F0F0', theme: '#7EC8C8' },
    charcoal: { dot: 'linear-gradient(135deg, #A08078, #907068)', bg: '#E8DDD8', theme: '#A08078' }
};

function changeTheme(themeName) {
    currentTheme = themeName; localStorage.setItem('wishlistTheme', themeName);
    document.body.classList.remove('theme-lavender','theme-peach','theme-matcha','theme-blue','theme-caramel','theme-berry','theme-pearl','theme-ocean','theme-charcoal');
    if (themeName !== 'blush') document.body.classList.add('theme-' + themeName);
    
    const dot = document.getElementById('themeModalDot');
    const name = document.getElementById('themeModalName');
    if (dot) dot.style.background = THEME_COLORS[themeName]?.dot || THEME_COLORS.blush.dot;
    if (name) name.textContent = THEME_NAMES[themeName] || themeName;
    
    updateThemeColorMeta(); renderWishlist();
    playChimeSound();
    closeThemeModal();
}

function openThemeModal() {
    const overlay = document.getElementById('themeModalOverlay');
    const modal = document.getElementById('themeModal');
    const grid = document.getElementById('themeModalGrid');
    
    if (grid) {
        grid.innerHTML = '';
        THEME_ORDER.forEach(theme => {
            const option = document.createElement('button');
            option.className = 'theme-option' + (theme === currentTheme ? ' active' : '');
            option.innerHTML = `
                <span class="theme-option-dot" style="background: ${THEME_COLORS[theme].dot};"></span>
                <span class="theme-option-name">${THEME_NAMES[theme]}</span>
            `;
            option.onclick = () => changeTheme(theme);
            grid.appendChild(option);
        });
    }
    
    if (overlay) overlay.classList.add('show');
    if (modal) modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeThemeModal() {
    const overlay = document.getElementById('themeModalOverlay');
    const modal = document.getElementById('themeModal');
    if (overlay) overlay.classList.remove('show');
    if (modal) modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

function updateThemeColorMeta() {
    const meta = document.getElementById('metaThemeColor');
    const safeTheme = THEME_COLORS[currentTheme] ? currentTheme : 'blush';
    if (meta) meta.content = isDarkMode ? '#2D1F2C' : (THEME_COLORS[safeTheme]?.theme || '#F8C8DC');
}

// ========== TAB ==========
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (tabName === 'add') { document.getElementById('tabAdd').classList.add('active'); document.getElementById('tabAddBtn').classList.add('active'); populateCategoryDropdowns(); }
    else if (tabName === 'list') { document.getElementById('tabList').classList.add('active'); document.getElementById('tabListBtn').classList.add('active'); renderCustomSelects(); clearSearch(); renderWishlist(); }
    else if (tabName === 'categories') { document.getElementById('tabCategories').classList.add('active'); document.getElementById('tabCategoriesBtn').classList.add('active'); renderCategoryList(); }
    else if (tabName === 'trash') { document.getElementById('tabTrash').classList.add('active'); document.getElementById('tabTrashBtn').classList.add('active'); renderTrash(); }
    else if (tabName === 'stats') { document.getElementById('tabStats').classList.add('active'); document.getElementById('tabStatsBtn').classList.add('active'); renderStats(); }
    updateBadge();
    updateTrashBadge();
}

function updateBadge() { document.getElementById('badgeCount').textContent = wishlist.length; document.getElementById('totalItems').textContent = wishlist.length; }

// ========== CUSTOM SELECT ==========
let categoryFilterValue = 'all';
let storeFilterValue = 'all';
let sortFilterValue = 'newest';

let dateTimeValues = {
    productDay: '', productMonth: '', productYear: '',
    productHour: '', productMinute: '',
    editProductDay: '', editProductMonth: '', editProductYear: '',
    editProductHour: '', editProductMinute: ''
};

function toggleCustomSelect(type) {
    const wrappers = {
        category: document.getElementById('categorySelectWrapper'),
        store: document.getElementById('storeSelectWrapper'),
        sort: document.getElementById('sortSelectWrapper'),
        productDay: document.getElementById('productDayWrapper'),
        productMonth: document.getElementById('productMonthWrapper'),
        productYear: document.getElementById('productYearWrapper'),
        productHour: document.getElementById('productHourWrapper'),
        productMinute: document.getElementById('productMinuteWrapper'),
        editProductDay: document.getElementById('editProductDayWrapper'),
        editProductMonth: document.getElementById('editProductMonthWrapper'),
        editProductYear: document.getElementById('editProductYearWrapper'),
        editProductHour: document.getElementById('editProductHourWrapper'),
        editProductMinute: document.getElementById('editProductMinuteWrapper')
    };
    
    const wrapper = wrappers[type];
    if (!wrapper) return;
    
    Object.values(wrappers).forEach(w => {
        if (w && w !== wrapper) w.classList.remove('active');
    });
    
    wrapper.classList.toggle('active');
}

function renderCustomSelects() {
    // Kategori
    const catOptions = document.getElementById('categorySelectOptions');
    const catLabel = document.getElementById('categorySelectLabel');
    if (catOptions) {
        catOptions.innerHTML = '';
        catOptions.innerHTML += `<div class="custom-select-option ${categoryFilterValue === 'all' ? 'selected' : ''}" onclick="selectCategoryFilter('all')"><span>${t('filter_all_categories')}</span><i class="fa-solid fa-check"></i></div>`;
        categories.forEach(cat => {
            const selected = categoryFilterValue === cat.id;
            catOptions.innerHTML += `<div class="custom-select-option ${selected ? 'selected' : ''}" onclick="selectCategoryFilter('${cat.id}')"><span>${cat.name}</span><i class="fa-solid fa-check"></i></div>`;
        });
    }
    if (catLabel) {
        const cat = categories.find(c => c.id === categoryFilterValue);
        catLabel.textContent = categoryFilterValue === 'all' ? t('filter_all_categories') : cat?.name || '';
    }
    
    // Toko
    const storeOptions = document.getElementById('storeSelectOptions');
    const storeLabel = document.getElementById('storeSelectLabel');
    if (storeOptions) {
        const storeNames = new Set();
        wishlist.forEach(item => { if (item.storeName) storeNames.add(item.storeName); });
        
        storeOptions.innerHTML = '';
        storeOptions.innerHTML += `<div class="custom-select-option ${storeFilterValue === 'all' ? 'selected' : ''}" onclick="selectStoreFilter('all')"><span>${t('filter_all_stores')}</span><i class="fa-solid fa-check"></i></div>`;
        storeNames.forEach(name => {
            const selected = storeFilterValue === name;
            storeOptions.innerHTML += `<div class="custom-select-option ${selected ? 'selected' : ''}" onclick="selectStoreFilter('${name}')"><span>${name}</span><i class="fa-solid fa-check"></i></div>`;
        });
    }
    if (storeLabel) storeLabel.textContent = storeFilterValue === 'all' ? t('filter_all_stores') : storeFilterValue;
    
    // Sort
    const sortOptions = document.getElementById('sortSelectOptions');
    const sortLabel = document.getElementById('sortSelectLabel');
    if (sortOptions) {
        const sortNames = { 
            newest: t('sort_newest'), oldest: t('sort_oldest'), 
            expensive: t('sort_expensive'), cheapest: t('sort_cheapest'), 
            az: t('sort_az'), za: t('sort_za'),
            priority_high: t('sort_priority_high'), priority_low: t('sort_priority_low'),
            deadline_near: t('sort_deadline_near'), deadline_far: t('sort_deadline_far')
        };
        
        sortOptions.innerHTML = '';
        Object.entries(sortNames).forEach(([value, label]) => {
            const selected = sortFilterValue === value;
            sortOptions.innerHTML += `<div class="custom-select-option ${selected ? 'selected' : ''}" onclick="selectSortFilter('${value}')"><span>${label}</span><i class="fa-solid fa-check"></i></div>`;
        });
    }
    if (sortLabel) {
        const sortNames = { newest: t('sort_newest'), oldest: t('sort_oldest'), expensive: t('sort_expensive'), cheapest: t('sort_cheapest'), az: t('sort_az'), za: t('sort_za'), priority_high: t('sort_priority_high'), priority_low: t('sort_priority_low'), deadline_near: t('sort_deadline_near'), deadline_far: t('sort_deadline_far') };
        sortLabel.textContent = sortNames[sortFilterValue] || sortFilterValue;
    }
}

function selectCategoryFilter(value) {
    categoryFilterValue = value;
    toggleCustomSelect('category');
    renderCustomSelects();
    filterWishlist();
}

function selectStoreFilter(value) {
    storeFilterValue = value;
    toggleCustomSelect('store');
    renderCustomSelects();
    filterWishlist();
}

function selectSortFilter(value) {
    sortFilterValue = value;
    toggleCustomSelect('sort');
    renderCustomSelects();
    renderWishlist();
}

// ========== DATETIME ==========
function initDateTimeSelects() {
    const days = Array.from({length: 31}, (_, i) => i + 1);
    const months = currentLang === 'en' 
        ? [
            {value: 1, label: 'January'}, {value: 2, label: 'February'}, {value: 3, label: 'March'},
            {value: 4, label: 'April'}, {value: 5, label: 'May'}, {value: 6, label: 'June'},
            {value: 7, label: 'July'}, {value: 8, label: 'August'}, {value: 9, label: 'September'},
            {value: 10, label: 'October'}, {value: 11, label: 'November'}, {value: 12, label: 'December'}
        ]
        : [
            {value: 1, label: 'Januari'}, {value: 2, label: 'Februari'}, {value: 3, label: 'Maret'},
            {value: 4, label: 'April'}, {value: 5, label: 'Mei'}, {value: 6, label: 'Juni'},
            {value: 7, label: 'Juli'}, {value: 8, label: 'Agustus'}, {value: 9, label: 'September'},
            {value: 10, label: 'Oktober'}, {value: 11, label: 'November'}, {value: 12, label: 'Desember'}
        ];
    const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i);
    const hours = Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));
    
    const labels = {
        day: currentLang === 'en' ? 'Day' : 'Hari',
        month: currentLang === 'en' ? 'Month' : 'Bulan',
        year: currentLang === 'en' ? 'Year' : 'Tahun',
        hour: currentLang === 'en' ? 'Hour' : 'Jam',
        minute: currentLang === 'en' ? 'Minute' : 'Menit'
    };
    
    renderDateTimeOptions('productDay', days, labels.day);
    renderDateTimeOptions('productMonth', months, labels.month);
    renderDateTimeOptions('productYear', years, labels.year);
    renderDateTimeOptions('productHour', hours, labels.hour);
    renderDateTimeOptions('productMinute', minutes, labels.minute);
    
    renderDateTimeOptions('editProductDay', days, labels.day);
    renderDateTimeOptions('editProductMonth', months, labels.month);
    renderDateTimeOptions('editProductYear', years, labels.year);
    renderDateTimeOptions('editProductHour', hours, labels.hour);
    renderDateTimeOptions('editProductMinute', minutes, labels.minute);
}

function renderDateTimeOptions(prefix, options, placeholder) {
    const container = document.getElementById(prefix + 'Options');
    const label = document.getElementById(prefix + 'Label');
    if (!container || !label) return;
    
    container.innerHTML = '';
    options.forEach(opt => {
        const value = typeof opt === 'object' ? opt.value : opt;
        const text = typeof opt === 'object' ? opt.label : opt;
        const selected = dateTimeValues[prefix] === String(value);
        container.innerHTML += `<div class="custom-select-option ${selected ? 'selected' : ''}" onclick="selectDateTimeOption('${prefix}', '${value}', '${text}')"><span>${text}</span><i class="fa-solid fa-check"></i></div>`;
    });
    
    if (dateTimeValues[prefix]) {
        const val = dateTimeValues[prefix];
        const found = options.find(o => (typeof o === 'object' ? o.value : o) == val);
        label.textContent = found ? (typeof found === 'object' ? found.label : found) : placeholder;
    } else {
        label.textContent = placeholder;
    }
}

function selectDateTimeOption(prefix, value, text) {
    dateTimeValues[prefix] = String(value).padStart(2, '0');
    document.getElementById(prefix + 'Label').textContent = String(value).padStart(2, '0');
    document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('active'));
}

function clearDateTime(prefix) {
    dateTimeValues[prefix + 'Day'] = '';
    dateTimeValues[prefix + 'Month'] = '';
    dateTimeValues[prefix + 'Year'] = '';
    dateTimeValues[prefix + 'Hour'] = '';
    dateTimeValues[prefix + 'Minute'] = '';
    initDateTimeSelects();
}

function getDateFromSelects(prefix) {
    const day = dateTimeValues[prefix + 'Day'];
    const month = dateTimeValues[prefix + 'Month'];
    const year = dateTimeValues[prefix + 'Year'];
    if (!day || !month || !year) return '';
    return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

function getTimeFromSelects(prefix) {
    const hour = dateTimeValues[prefix + 'Hour'];
    const minute = dateTimeValues[prefix + 'Minute'];
    if (hour === '' || minute === '') return '';
    return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
}

// ========== COUNTDOWN ==========
function getCountdownText(targetDate, targetTime) {
    const dateTimeStr = targetDate + (targetTime ? 'T' + targetTime + ':00' : 'T23:59:59');
    const now = new Date();
    const target = new Date(dateTimeStr);
    const diff = target - now;
    
    const hariNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const hari = hariNames[target.getDay()];
    const tanggal = target.getDate();
    const bulan = bulanNames[target.getMonth()];
    const tahun = target.getFullYear();
    const tanggalFormat = `${hari}, ${tanggal} ${bulan} ${tahun}`;
    
    if (diff < 0) return `${tanggalFormat} - Sudah lewat!`;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let countdown = '';
    if (days > 0) countdown = `${days} hari ${hours} jam lagi`;
    else if (hours > 0) countdown = `${hours} jam ${minutes} menit lagi`;
    else if (minutes > 0) countdown = `${minutes} menit lagi`;
    else countdown = 'Hari ini!';
    
    return `${tanggalFormat} - ${countdown}`;
}

function getCountdownStatus(targetDate, targetTime) {
    const dateTimeStr = targetDate + (targetTime ? 'T' + targetTime + ':00' : 'T23:59:59');
    const now = new Date();
    const target = new Date(dateTimeStr);
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 3) return 'urgent';
    return '';
}

// ========== TOTAL ==========
function updateTotalPrice() {
    const card = document.getElementById('totalPriceCard');
    if (wishlist.length === 0) { card.style.display = 'none'; return; }
    card.style.display = 'flex';
    let total = 0;
    wishlist.forEach(item => { const p = parseInt(String(item.price).replace(/[^0-9]/g,'')); if (!isNaN(p)) total += p; });
    document.getElementById('totalPriceAmount').textContent = 'Rp ' + total.toLocaleString('id-ID');
}

function updateStoreTotals() {
    const container = document.getElementById('storeTotals');
    if (wishlist.length === 0) { container.style.display = 'none'; return; }
    const totals = {};
    wishlist.forEach(item => {
        const name = item.storeName || 'Tanpa Toko';
        if (!totals[name]) totals[name] = { total: 0, color: item.storeColor || '#888' };
        const p = parseInt(String(item.price).replace(/[^0-9]/g,''));
        if (!isNaN(p)) totals[name].total += p;
    });
    container.innerHTML = ''; container.style.display = 'flex';
    for (const [name, data] of Object.entries(totals)) {
        const el = document.createElement('span'); el.className = 'store-total-item'; el.style.background = data.color;
        el.innerHTML = `<i class="fa-solid fa-store"></i> ${t('store_total_format',{name,total:data.total.toLocaleString('id-ID')})}`;
        container.appendChild(el);
    }
}

// ========== SORTING ==========
function getSortedWishlist() {
    const sorted = [...wishlist];
    switch(sortFilterValue) {
        case 'newest': return sorted.reverse();
        case 'oldest': return sorted;
        case 'expensive': return sorted.sort((a,b) => (parseInt(String(b.price).replace(/[^0-9]/g,''))||0) - (parseInt(String(a.price).replace(/[^0-9]/g,''))||0));
        case 'cheapest': return sorted.sort((a,b) => (parseInt(String(a.price).replace(/[^0-9]/g,''))||0) - (parseInt(String(b.price).replace(/[^0-9]/g,''))||0));
        case 'az': return sorted.sort((a,b) => (a.name||'').localeCompare(b.name||''));
        case 'za': return sorted.sort((a,b) => (b.name||'').localeCompare(a.name||''));
        case 'priority_high': return sorted.sort((a,b) => (b.priority || 0) - (a.priority || 0));
        case 'priority_low': return sorted.sort((a,b) => (a.priority || 0) - (b.priority || 0));
        case 'deadline_near':
            return sorted.sort((a,b) => {
                if (!a.targetDate && !b.targetDate) return 0;
                if (!a.targetDate) return 1;
                if (!b.targetDate) return -1;
                return new Date(a.targetDate + 'T' + (a.targetTime || '23:59:59')) - new Date(b.targetDate + 'T' + (b.targetTime || '23:59:59'));
            });
        case 'deadline_far':
            return sorted.sort((a,b) => {
                if (!a.targetDate && !b.targetDate) return 0;
                if (!a.targetDate) return 1;
                if (!b.targetDate) return -1;
                return new Date(b.targetDate + 'T' + (b.targetTime || '23:59:59')) - new Date(a.targetDate + 'T' + (a.targetTime || '23:59:59'));
            });
        default: return sorted;
    }
}

// ========== FILTER ==========
function filterWishlist() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const btnClear = document.getElementById('btnClearSearch');
    if (btnClear) btnClear.style.display = searchTerm ? 'flex' : 'none';
    if (wishlist.length === 0) return;
    
    let visibleCount = 0;
    const sorted = getSortedWishlist();
    
    document.querySelectorAll('.wishlist-item').forEach((item, idx) => {
        const name = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
        const price = item.querySelector('.item-price')?.textContent.toLowerCase() || '';
        let show = true;
        if (searchTerm && !name.includes(searchTerm) && !price.includes(searchTerm)) show = false;
        if (categoryFilterValue !== 'all' && sorted[idx] && sorted[idx].category !== categoryFilterValue) show = false;
        if (storeFilterValue !== 'all' && sorted[idx] && (sorted[idx].storeName || '') !== storeFilterValue) show = false;
        item.classList.toggle('hidden-item', !show);
        if (show) visibleCount++;
    });
    
    const resultText = document.getElementById('searchResultText');
    const noResult = document.getElementById('noResultState');
    if (searchTerm || categoryFilterValue !== 'all' || storeFilterValue !== 'all') {
        if (visibleCount === 0) { if (resultText) resultText.style.display = 'none'; if (noResult) noResult.style.display = 'block'; }
        else { if (resultText) { resultText.textContent = t('search_result', {visible: visibleCount, total: wishlist.length}); resultText.style.display = 'block'; } if (noResult) noResult.style.display = 'none'; }
    } else { if (resultText) resultText.style.display = 'none'; if (noResult) noResult.style.display = 'none'; }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const btnClear = document.getElementById('btnClearSearch');
    const resultText = document.getElementById('searchResultText');
    const noResult = document.getElementById('noResultState');
    if (searchInput) searchInput.value = '';
    if (btnClear) btnClear.style.display = 'none';
    if (resultText) resultText.style.display = 'none';
    if (noResult) noResult.style.display = 'none';
    document.querySelectorAll('.wishlist-item').forEach(item => item.classList.remove('hidden-item'));
}

// ========== POPULATE ==========
function populateCategoryDropdowns() {
    ['productCategory','editProductCategory'].forEach(id => {
        const sel = document.getElementById(id); if (!sel) return;
        sel.innerHTML = `<option value="">${t('option_no_category')}</option>`;
        categories.forEach(cat => sel.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);
    });
}

// ========== KATEGORI CRUD ==========
function addCategory() {
    const name = document.getElementById('newCategoryName').value.trim();
    if (!name) { shakeElement(document.getElementById('newCategoryName')); return; }
    categories.push({ id: 'cat_'+Date.now(), name }); saveCategories();
    document.getElementById('newCategoryName').value = ''; renderCategoryList(); showToast(t('toast_cat_added'));
}
function openEditCategoryModal(catId) {
    currentEditCategoryId = catId;
    document.getElementById('editCategoryName').value = categories.find(c => c.id === catId)?.name || '';
    document.getElementById('editCategoryModal').classList.add('show');
    document.getElementById('modalBackdrop').classList.add('show'); document.body.classList.add('modal-open');
}
function closeEditCategoryModal() {
    document.getElementById('editCategoryModal').classList.remove('show');
    document.getElementById('modalBackdrop').classList.remove('show'); document.body.classList.remove('modal-open');
    currentEditCategoryId = null;
}
function saveEditCategory() {
    if (!currentEditCategoryId) return;
    const name = document.getElementById('editCategoryName').value.trim(); if (!name) return;
    const cat = categories.find(c => c.id === currentEditCategoryId); if (cat) cat.name = name;
    saveCategories(); closeEditCategoryModal(); renderCategoryList();
    populateCategoryDropdowns(); renderCustomSelects(); renderWishlist(); showToast(t('toast_cat_updated'));
}
function deleteCategory(catId) {
    if (!confirm(t('confirm_delete_cat'))) return;
    wishlist.forEach(item => { if (item.category === catId) item.category = ''; });
    saveWishlist(); categories = categories.filter(c => c.id !== catId); saveCategories();
    if (categoryFilterValue === catId) categoryFilterValue = 'all';
    renderCategoryList(); populateCategoryDropdowns(); renderCustomSelects(); renderWishlist();
    showToast(t('toast_cat_deleted'));
}
function renderCategoryList() {
    const container = document.getElementById('categoryList');
    const empty = document.getElementById('emptyCategoryState');
    container.innerHTML = '';
    if (categories.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    categories.forEach(cat => {
        const count = wishlist.filter(item => item.category === cat.id).length;
        const el = document.createElement('div'); el.className = 'category-item';
        el.innerHTML = `<div class="category-item-info"><span class="category-item-name">${cat.name}</span><span class="category-item-count">(${count})</span></div>
            <div class="category-item-actions">
                <button class="btn-edit-cat" onclick="openEditCategoryModal('${cat.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-delete-cat" onclick="deleteCategory('${cat.id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>`;
        container.appendChild(el);
    });
}

// ========== STATISTIK ==========
function renderStats() {
    const totalItems = wishlist.length;
    const purchased = wishlist.filter(item => item.purchased).length;
    const notPurchased = totalItems - purchased;
    let totalPrice = 0;
    wishlist.forEach(item => { const p = parseInt(String(item.price).replace(/[^0-9]/g,'')); if (!isNaN(p)) totalPrice += p; });
    
    document.getElementById('statTotalItems').textContent = totalItems;
    document.getElementById('statTotalPrice').textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
    document.getElementById('statPurchased').textContent = purchased;
    document.getElementById('statNotPurchased').textContent = notPurchased;
    
    const catCounts = {};
    wishlist.forEach(item => { if (item.category) { catCounts[item.category] = (catCounts[item.category] || 0) + 1; } });
    let topCat = '-'; let topCatCount = 0;
    Object.entries(catCounts).forEach(([catId, count]) => { if (count > topCatCount) { topCatCount = count; topCat = getCategoryById(catId)?.name || '-'; } });
    document.getElementById('statTopCategory').textContent = topCat;
    
    const storeCounts = {};
    wishlist.forEach(item => { if (item.storeName) { storeCounts[item.storeName] = (storeCounts[item.storeName] || 0) + 1; } });
    let topStore = '-'; let topStoreCount = 0;
    Object.entries(storeCounts).forEach(([name, count]) => { if (count > topStoreCount) { topStoreCount = count; topStore = name; } });
    document.getElementById('statTopStore').textContent = topStore;
    
    if (wishlist.length > 0) {
        const sortedByPrice = [...wishlist].sort((a,b) => (parseInt(String(b.price).replace(/[^0-9]/g,''))||0) - (parseInt(String(a.price).replace(/[^0-9]/g,''))||0));
        document.getElementById('statMostExpensive').textContent = `${sortedByPrice[0].name} - Rp ${formatRupiah(sortedByPrice[0].price)}`;
        document.getElementById('statCheapest').textContent = `${sortedByPrice[sortedByPrice.length-1].name} - Rp ${formatRupiah(sortedByPrice[sortedByPrice.length-1].price)}`;
    }
}

// ========== WISHLIST RENDER ==========
function getCategoryById(id) { return categories.find(c => c.id === id) || null; }

function togglePriority(index, level) {
    const item = wishlist[index];
    if (item.priority === level) {
        item.priority = 0;
    } else {
        item.priority = level;
    }
    saveWishlist();
    renderWishlist();
}

function toggleVisionBoard() {
    visionMode = !visionMode;
    const btn = document.querySelector('.btn-vision-mode');
    if (btn) {
        if (visionMode) { btn.classList.add('active'); }
        else { btn.classList.remove('active'); }
    }
    renderWishlist();
}

function renderVisionBoard() {
    const container = document.getElementById('visionBoard');
    if (!container) return;
    
    container.innerHTML = '';
    wishlist.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'vision-item';
        el.onclick = () => openEditModal(index);
        
        el.innerHTML = `
            ${item.image ? `<img src="${escapeHTML(item.image)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'vision-item-no-img\\'><i class=\\'fa-solid fa-image\\'></i></div>'">` : `<div class="vision-item-no-img"><i class="fa-solid fa-image"></i></div>`}
            ${item.priority > 0 ? `<div class="vision-priority">${'♥'.repeat(item.priority)}</div>` : ''}
        `;
        container.appendChild(el);
    });
}

function renderWishlist() {
    if (visionMode) {
        document.getElementById('wishlistContainer').style.display = 'none';
        document.getElementById('visionBoard').style.display = 'grid';
        renderVisionBoard();
        return;
    } else {
        document.getElementById('wishlistContainer').style.display = 'grid';
        document.getElementById('visionBoard').style.display = 'none';
    }
    
    const container = document.getElementById('wishlistContainer');
    const emptyState = document.getElementById('emptyState');
    container.innerHTML = '';
    if (wishlist.length === 0) {
        document.querySelector('.wishlist-header').style.display = 'none';
        emptyState.classList.remove('hidden'); updateTotalPrice(); updateStoreTotals(); renderCustomSelects(); return;
    }
    document.querySelector('.wishlist-header').style.display = 'block';
    emptyState.classList.add('hidden');
    getSortedWishlist().forEach((item, index) => {
        const cat = getCategoryById(item.category);
        const isPurchased = item.purchased || false;
        const storeName = item.storeName || '';
        const storeColor = item.storeColor || '#888';
        const realIndex = wishlist.indexOf(item);
        const el = document.createElement('div');
        el.className = 'wishlist-item' + (isPurchased ? ' purchased' : '');
        el.style.animationDelay = `${index * 0.03}s`;
        el.innerHTML = `
            ${cat ? `<div class="item-category-badge">${cat.name}</div>` : ''}
            ${item.image ? `<div class="item-image-wrapper"><img src="${escapeHTML(item.image)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'item-no-image\\'><i class=\\'fa-solid fa-image\\'></i></div>'"></div>` : `<div class="item-no-image"><i class="fa-solid fa-image"></i></div>`}
            <div class="item-actions-top">
                <button class="btn-edit" onclick="openEditModal(${realIndex})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-delete" onclick="deleteItem(${realIndex})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            <div class="item-info">
                <div class="item-name">${escapeHTML(item.name) || t('label_no_name')}</div>
                ${storeName ? `<div class="item-store-inline"><span class="store-badge" style="background:${storeColor};"><i class="fa-solid fa-store"></i> ${storeName}</span></div>` : ''}
                <div class="item-price">${formatRupiah(item.price) || '0'}</div>
                ${item.note ? `<div class="item-note"><i class="fa-solid fa-note-sticky"></i> ${escapeHTML(item.note)}</div>` : ''}
                ${item.targetDate ? `<div class="item-countdown ${getCountdownStatus(item.targetDate, item.targetTime)}"><i class="fa-solid fa-clock"></i> ${getCountdownText(item.targetDate, item.targetTime)}</div>` : ''}
                ${item.link ? `<a href="${escapeHTML(item.link)}" target="_blank" class="item-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${t('label_open_link')}</a>` : `<span class="item-link" style="opacity:0.5;"><i class="fa-solid fa-link-slash"></i> ${t('label_no_link')}</span>`}
            </div>
            <div class="item-purchased-checkbox ${isPurchased ? 'checked' : ''}" onclick="togglePurchased(${realIndex})">
                <i class="fa-solid ${isPurchased ? 'fa-circle-check' : 'fa-circle'}"></i> ${isPurchased ? t('label_purchased') : t('label_not_purchased')}
            </div>
            <div class="item-priority" onclick="event.stopPropagation();">
                ${[5,4,3,2,1].map(i => `<span class="priority-heart ${(item.priority || 0) >= i ? 'filled' : ''}" onclick="event.stopPropagation(); togglePriority(${realIndex}, ${i})">${(item.priority || 0) >= i ? '♥' : '♡'}</span>`).join('')}
            </div>
        `;
        container.appendChild(el);
    });
    filterWishlist(); updateTotalPrice(); updateStoreTotals(); renderCustomSelects();
}

function togglePurchased(index) {
    wishlist[index].purchased = !wishlist[index].purchased; saveWishlist(); renderWishlist();
    if (wishlist[index].purchased) {
        showToast(t('toast_purchased'));
        playDingSound();
    } else {
        playDeleteSound();
    }
}

// ========== WISHLIST CRUD ==========
function addItem() {
    const name = document.getElementById('productName').value.trim();
    if (!name) { shakeElement(document.getElementById('productName')); return; }
    let link = document.getElementById('productLink').value.trim();
    if (link && !link.startsWith('http')) link = 'https://' + link;
    const store = extractStoreFromUrl(link);
    wishlist.unshift({
        name, category: document.getElementById('productCategory').value,
        price: document.getElementById('productPrice').value.trim() || '0',
        link, image: document.getElementById('productImage').value.trim(),
        note: document.getElementById('productNote').value.trim(),
        targetDate: getDateFromSelects('product'),
        targetTime: getTimeFromSelects('product'),
        priority: 0,
        storeName: store ? store.name : '', storeColor: store ? getStoreColor(store.name) : '#888', purchased: false
    });
    saveWishlist();
    ['productName','productPrice','productLink','productImage','productNote'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('storeBadgePreview').style.display = 'none';
    document.getElementById('storeNamePreview').textContent = '-';
    clearImagePreview(); updateBadge(); showToast(t('toast_added'));
    playPopSound();
    setTimeout(() => switchTab('list'), 400);
}

function openEditModal(index) {
    document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('active'));
    currentEditIndex = index; const item = wishlist[index];
    populateCategoryDropdowns();
    document.getElementById('editProductName').value = item.name;
    document.getElementById('editProductCategory').value = item.category || '';
    document.getElementById('editProductPrice').value = item.price;
    document.getElementById('editProductLink').value = item.link || '';
    document.getElementById('editProductImage').value = item.image || '';
    document.getElementById('editProductNote').value = item.note || '';
    
    dateTimeValues.editProductDay = '';
    dateTimeValues.editProductMonth = '';
    dateTimeValues.editProductYear = '';
    dateTimeValues.editProductHour = '';
    dateTimeValues.editProductMinute = '';
    
    if (item.targetDate) {
        const d = new Date(item.targetDate + 'T12:00:00');
        dateTimeValues.editProductDay = String(d.getDate()).padStart(2, '0');
        dateTimeValues.editProductMonth = String(d.getMonth() + 1).padStart(2, '0');
        dateTimeValues.editProductYear = String(d.getFullYear());
    }
    if (item.targetTime) {
        const [h, m] = item.targetTime.split(':');
        dateTimeValues.editProductHour = String(h).padStart(2, '0');
        dateTimeValues.editProductMinute = String(m).padStart(2, '0');
    }
    initDateTimeSelects();
    
    if (item.image) { document.getElementById('editImagePreview').src = item.image; document.getElementById('editImagePreviewContainer').style.display = 'block'; }
    detectEditStorePreview();
    document.getElementById('editModal').classList.add('show');
    document.getElementById('modalBackdrop').classList.add('show'); document.body.classList.add('modal-open');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
    document.getElementById('confirmModal').classList.remove('show');
    document.getElementById('modalBackdrop').classList.remove('show'); 
    document.body.classList.remove('modal-open');
    currentEditIndex = -1;
}

function saveEditItem() {
    document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('active'));
    if (currentEditIndex === -1) return;
    const name = document.getElementById('editProductName').value.trim(); if (!name) return;
    let link = document.getElementById('editProductLink').value.trim();
    if (link && !link.startsWith('http')) link = 'https://' + link;
    const store = extractStoreFromUrl(link);
    wishlist[currentEditIndex] = {
        name, category: document.getElementById('editProductCategory').value,
        price: document.getElementById('editProductPrice').value.trim() || '0',
        link, image: document.getElementById('editProductImage').value.trim(),
        note: document.getElementById('editProductNote').value.trim(),
        targetDate: getDateFromSelects('editProduct'),
        targetTime: getTimeFromSelects('editProduct'),
        priority: wishlist[currentEditIndex].priority || 0,
        storeName: store ? store.name : '', storeColor: store ? getStoreColor(store.name) : '#888',
        purchased: wishlist[currentEditIndex].purchased || false
    };
    saveWishlist(); closeEditModal(); renderWishlist(); updateBadge(); showToast(t('toast_updated'));
}

function deleteItem(index) {
    pendingDeleteIndex = index;
    const item = wishlist[index];
    document.getElementById('confirmProductName').textContent = item.name;
    document.getElementById('confirmModal').classList.add('show');
    document.getElementById('modalBackdrop').classList.add('show');
    document.body.classList.add('modal-open');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
    document.getElementById('modalBackdrop').classList.remove('show');
    document.body.classList.remove('modal-open');
    pendingDeleteIndex = -1;
}

function confirmDelete() {
    if (pendingDeleteIndex === -1) return;
    const index = pendingDeleteIndex;
    const deletedItem = wishlist[index];
    trashItems.unshift(deletedItem);
    saveTrash();
    wishlist.splice(index, 1);
    saveWishlist();
    closeConfirmModal();
    renderWishlist();
    updateBadge();
    updateTrashBadge();
    showToast(t('toast_deleted'));
    playDeleteSound();
}

function renderTrash() {
    const container = document.getElementById('trashList');
    const emptyState = document.getElementById('emptyTrashState');
    if (!container) return;
    
    container.innerHTML = '';
    document.getElementById('trashTotalItems').textContent = trashItems.length;
    
    if (trashItems.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    emptyState.style.display = 'none';
    container.style.display = 'flex';
    
    trashItems.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'trash-item';
        el.innerHTML = `
            <div class="trash-item-img">
                ${item.image ? `<img src="${escapeHTML(item.image)}" loading="lazy">` : '<i class="fa-solid fa-image"></i>'}
            </div>
            <div class="trash-item-info">
                <div class="trash-item-name">${escapeHTML(item.name)}</div>
                <div class="trash-item-price">Rp ${formatRupiah(item.price)}</div>
            </div>
            <div class="trash-item-actions">
                <button class="btn-restore" onclick="restoreTrashItem(${index})">
                    <i class="fa-solid fa-rotate-left"></i>
                </button>
                <button class="btn-delete-permanent" onclick="permanentDeleteTrash(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(el);
    });
}

function restoreTrashItem(index) {
    const item = trashItems[index];
    wishlist.unshift(item);
    saveWishlist();
    trashItems.splice(index, 1);
    saveTrash();
    renderTrash();
    renderWishlist();
    updateBadge();
    updateTrashBadge();
    showToast('Produk dipulihkan! ♻️');
}

function permanentDeleteTrash(index) {
    trashItems.splice(index, 1);
    saveTrash();
    renderTrash();
    updateTrashBadge();
    showToast('Produk dihapus permanen! 🗑️');
}

function clearAllTrash() {
    if (trashItems.length === 0) return;
    if (confirm('Hapus semua produk di sampah?')) {
        trashItems = [];
        saveTrash();
        renderTrash();
        updateTrashBadge();
        showToast('Sampah dikosongkan! 🧹');
    }
}

function updateTrashBadge() {
    const badge = document.getElementById('trashCount');
    if (badge) badge.textContent = trashItems.length;
}

// ========== SOUND EFFECTS ==========
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playPopSound() {
    try {
        const ctx = getAudioContext();
        const notes = [523, 659, 784];
        const gains = [0.25, 0.2, 0.18];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(gains[i], ctx.currentTime + i * 0.08 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.4);
        });
    } catch(e) {}
}

function playDingSound() {
    try {
        const ctx = getAudioContext();
        const notes = [880, 1100, 1320];
        const gains = [0.3, 0.25, 0.2];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
            gain.gain.setValueAtTime(gains[i], ctx.currentTime + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.3);
            osc.start(ctx.currentTime + i * 0.07);
            osc.stop(ctx.currentTime + i * 0.07 + 0.3);
        });
    } catch(e) {}
}

function playDeleteSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
        pop.connect(popGain);
        popGain.connect(ctx.destination);
        pop.type = 'sine';
        pop.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
        pop.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.12);
        popGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.1);
        popGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.11);
        popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        pop.start(ctx.currentTime + 0.1);
        pop.stop(ctx.currentTime + 0.15);
    } catch(e) {}
}

function playChimeSound() {
    try {
        const ctx = getAudioContext();
        const notes = [1319, 1760];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + i * 0.15 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.6);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.6);
            const echo = ctx.createOscillator();
            const echoGain = ctx.createGain();
            echo.connect(echoGain);
            echoGain.connect(ctx.destination);
            echo.type = 'sine';
            echo.frequency.setValueAtTime(freq * 1.5, ctx.currentTime + i * 0.15 + 0.2);
            echoGain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.2);
            echoGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + i * 0.15 + 0.22);
            echoGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.5);
            echo.start(ctx.currentTime + i * 0.15 + 0.2);
            echo.stop(ctx.currentTime + i * 0.15 + 0.5);
        });
    } catch(e) {}
}

// ========== HELPERS ==========
function escapeHTML(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
function formatRupiah(angka) { let n = String(angka).replace(/[^0-9]/g,''); return n ? n.replace(/\B(?=(\d{3})+(?!\d))/g,'.') : '0'; }
function shakeElement(el) { el.style.borderColor = '#FF6B8A'; el.style.animation = 'shake 0.5s ease'; setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 500); }
function showToast(msg) {
    const old = document.querySelector('.toast'); if (old) old.remove();
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(92,61,75,0.9);color:white;padding:12px 25px;border-radius:25px;font-size:0.9em;z-index:101;animation:toastIn 0.4s,toastOut 0.4s 1.8s forwards;';
    document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}
function previewImage() { const url = document.getElementById('productImage').value.trim(); if (url) { document.getElementById('imagePreview').src = url; document.getElementById('imagePreviewContainer').style.display = 'block'; } else document.getElementById('imagePreviewContainer').style.display = 'none'; }
function clearImagePreview() { document.getElementById('productImage').value = ''; document.getElementById('imagePreviewContainer').style.display = 'none'; }
function previewEditImage() { const url = document.getElementById('editProductImage').value.trim(); if (url) { document.getElementById('editImagePreview').src = url; document.getElementById('editImagePreviewContainer').style.display = 'block'; } else document.getElementById('editImagePreviewContainer').style.display = 'none'; }
function clearEditImagePreview() { document.getElementById('editProductImage').value = ''; document.getElementById('editImagePreviewContainer').style.display = 'none'; }
function detectStorePreview() {
    const store = extractStoreFromUrl(document.getElementById('productLink').value.trim());
    const badge = document.getElementById('storeBadgePreview');
    const name = document.getElementById('storeNamePreview');
    if (store) { badge.style.display = 'inline-flex'; badge.style.background = getStoreColor(store.name); badge.innerHTML = `<i class="fa-solid fa-store"></i> ${store.name}`; name.textContent = ''; }
    else { badge.style.display = 'none'; name.textContent = '-'; }
}
function detectEditStorePreview() {
    const store = extractStoreFromUrl(document.getElementById('editProductLink').value.trim());
    const badge = document.getElementById('editStoreBadgePreview');
    const name = document.getElementById('editStoreNamePreview');
    if (store) { badge.style.display = 'inline-flex'; badge.style.background = getStoreColor(store.name); badge.innerHTML = `<i class="fa-solid fa-store"></i> ${store.name}`; name.textContent = ''; }
    else { badge.style.display = 'none'; name.textContent = '-'; }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const act = document.activeElement;
        if (act && ['productName','productPrice','productLink','productImage','productNote'].includes(act.id)) { e.preventDefault(); addItem(); }
        if (act && ['editProductName','editProductPrice','editProductLink','editProductImage','editProductNote'].includes(act.id)) { e.preventDefault(); saveEditItem(); }
    }
    if (e.key === 'Escape') { closeEditModal(); closeEditCategoryModal(); closeThemeModal(); closeConfirmModal(); }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('active'));
    }
});

// ========== INIT ==========
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@keyframes toastOut{from{opacity:1;transform:translateX(-50%) translateY(0)}to{opacity:0;transform:translateX(-50%) translateY(-20px)}}';
document.head.appendChild(styleEl);

applyDarkMode(); updateDarkModeIcon();
if (currentTheme !== 'blush') document.body.classList.add('theme-' + currentTheme);
updateThemeColorMeta();

const themeDot = document.getElementById('themeModalDot');
const themeNameEl = document.getElementById('themeModalName');
const safeTheme = THEME_COLORS[currentTheme] ? currentTheme : 'blush';
if (themeDot) themeDot.style.background = THEME_COLORS[safeTheme].dot;
if (themeNameEl) themeNameEl.textContent = THEME_NAMES[safeTheme] || 'Blush';

applyLanguage();

const quotes = [
    'Dreaming in pastel pink...',
    'Soft hearts & lace wishes...',
    'A touch of coquette magic...',
    'Romanticizing every wish...',
    'Delicate dreams loading...',
    'Sweets & ribbons & love...',
    'Whispers of elegance...',
    'Blush & bloom moments...'
];

let currentQuote = 0;
let loadingProgress = 0;

setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    const quoteEl = document.getElementById('loadingQuote');
    if (quoteEl) quoteEl.textContent = quotes[currentQuote];
}, 1500);

const progressInterval = setInterval(() => {
    loadingProgress += Math.random() * 12;
    if (loadingProgress > 100) loadingProgress = 100;
    
    const percentEl = document.getElementById('loadingPercent');
    const fillEl = document.getElementById('progressFill');
    if (percentEl) percentEl.textContent = Math.floor(loadingProgress);
    if (fillEl) fillEl.style.width = loadingProgress + '%';
    
    const glow = document.querySelector('.progress-glow');
    if (glow) glow.style.right = (100 - loadingProgress) + '%';
    
    const pearlCount = Math.floor(loadingProgress / 10);
    document.querySelectorAll('.mini-pearl').forEach((p, i) => {
        if (i < pearlCount) p.classList.add('filled');
    });
    
    if (loadingProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) loadingScreen.classList.add('hidden');
        }, 500);
    }
}, 180);

initDateTimeSelects();
renderCustomSelects();
updateTrashBadge();
renderWishlist(); updateBadge(); switchTab('add');
