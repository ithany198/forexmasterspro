// Advanced Trading Chart Engine
class TradingChart {
    constructor(container) {
        this.container = container;
        this.chart = null;
        this.candlestickSeries = null;
        this.volumeSeries = null;
        this.indicators = new Map();
        this.drawings = [];
        this.currentTool = 'cursor';
        this.currentSymbol = 'AAPL';
        this.currentTimeframe = '1D';
        this.isDrawing = false;
        
        this.initChart();
        this.loadData();
        this.setupEventListeners();
    }
    
    initChart() {
        // Create main chart
        this.chart = LightweightCharts.createChart(this.container, {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
            layout: {
                backgroundColor: '#131722',
                textColor: '#d1d4dc',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
            },
            grid: {
                vertLines: {
                    color: '#2a2e39',
                    style: 1,
                    visible: true
                },
                horzLines: {
                    color: '#2a2e39',
                    style: 1,
                    visible: true
                }
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
                vertLine: {
                    color: '#4a6cf7',
                    width: 1,
                    style: 2
                },
                horzLine: {
                    color: '#4a6cf7',
                    width: 1,
                    style: 2
                }
            },
            rightPriceScale: {
                borderColor: '#2a2e39',
                textColor: '#8691a8',
                entireTextOnly: true
            },
            timeScale: {
                borderColor: '#2a2e39',
                textColor: '#8691a8',
                timeVisible: true,
                secondsVisible: false
            },
            watermark: {
                color: 'rgba(134, 145, 168, 0.1)',
                visible: true,
                text: 'ForexMaster Pro',
                fontSize: 24,
                horzAlign: 'center',
                vertAlign: 'center'
            }
        });
        
        // Create candlestick series
        this.candlestickSeries = this.chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderUpColor: '#26a69a',
            borderDownColor: '#ef5350',
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350'
        });
        
        // Create volume series
        this.volumeSeries = this.chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume'
            },
            priceScaleId: '',
            scaleMargins: {
                top: 0.8,
                bottom: 0
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.chart.applyOptions({
                width: this.container.clientWidth,
                height: this.container.clientHeight
            });
        });
    }
    
    loadData() {
        // Generate sample data
        const data = this.generateSampleData();
        this.candlestickSeries.setData(data.candlesticks);
        this.volumeSeries.setData(data.volume);
        
        // Update price info
        this.updatePriceInfo(data.candlesticks[data.candlesticks.length - 1]);
    }
    
    generateSampleData() {
        const candlesticks = [];
        const volume = [];
        let time = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getTime() / 1000;
        let price = 200;
        
        for (let i = 0; i < 365; i++) {
            time += 24 * 60 * 60; // Add one day
            
            const change = (Math.random() - 0.5) * 4;
            const open = price;
            const close = price + change;
            const high = Math.max(open, close) + Math.random() * 2;
            const low = Math.min(open, close) - Math.random() * 2;
            const vol = Math.random() * 1000000 + 500000;
            
            candlesticks.push({
                time: time,
                open: open,
                high: high,
                low: low,
                close: close
            });
            
            volume.push({
                time: time,
                value: vol,
                color: close > open ? '#26a69a' : '#ef5350'
            });
            
            price = close;
        }
        
        return { candlesticks, volume };
    }
    
    updatePriceInfo(candle) {
        if (!candle) return;
        
        document.getElementById('openPrice').textContent = candle.open.toFixed(2);
        document.getElementById('highPrice').textContent = candle.high.toFixed(2);
        document.getElementById('lowPrice').textContent = candle.low.toFixed(2);
        document.getElementById('closePrice').textContent = candle.close.toFixed(2);
        
        const change = candle.close - candle.open;
        const changePercent = (change / candle.open) * 100;
        const changeElement = document.getElementById('priceChange');
        
        changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent.toFixed(2)}%)`;
        changeElement.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
    
    setupEventListeners() {
        // Tool selection
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentTool = e.currentTarget.dataset.tool;
            });
        });
        
        // Chart type selection
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.changeChartType(e.currentTarget.dataset.type);
            });
        });
        
        // Timeframe selection
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentTimeframe = e.currentTarget.dataset.timeframe;
                this.loadData(); // Reload data for new timeframe
            });
        });
        
        // Panel tabs
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.showPanel(e.currentTarget.dataset.panel);
            });
        });
    }
    
    changeChartType(type) {
        // Remove existing series
        if (this.candlestickSeries) {
            this.chart.removeSeries(this.candlestickSeries);
            this.candlestickSeries = null;
        }
        
        const data = this.generateSampleData();
        
        switch (type) {
            case 'candlestick':
                this.candlestickSeries = this.chart.addCandlestickSeries({
                    upColor: '#26a69a',
                    downColor: '#ef5350',
                    borderUpColor: '#26a69a',
                    borderDownColor: '#ef5350',
                    wickUpColor: '#26a69a',
                    wickDownColor: '#ef5350'
                });
                this.candlestickSeries.setData(data.candlesticks);
                break;
                
            case 'line':
                this.candlestickSeries = this.chart.addLineSeries({
                    color: '#4a6cf7',
                    lineWidth: 2
                });
                const lineData = data.candlesticks.map(candle => ({
                    time: candle.time,
                    value: candle.close
                }));
                this.candlestickSeries.setData(lineData);
                break;
                
            case 'area':
                this.candlestickSeries = this.chart.addAreaSeries({
                    topColor: 'rgba(74, 108, 247, 0.3)',
                    bottomColor: 'rgba(74, 108, 247, 0.05)',
                    lineColor: '#4a6cf7',
                    lineWidth: 2
                });
                const areaData = data.candlesticks.map(candle => ({
                    time: candle.time,
                    value: candle.close
                }));
                this.candlestickSeries.setData(areaData);
                break;
                
            default:
                // Default to candlestick
                this.changeChartType('candlestick');
        }
    }
    
    showPanel(panel) {
        const content = document.getElementById('panelContent');
        
        switch (panel) {
            case 'indicators':
                content.innerHTML = this.generateIndicatorsPanel();
                break;
            case 'strategies':
                content.innerHTML = this.generateStrategiesPanel();
                break;
            case 'alerts':
                content.innerHTML = this.generateAlertsPanel();
                break;
            case 'orders':
                content.innerHTML = this.generateOrdersPanel();
                break;
            case 'editor':
                content.innerHTML = this.generateEditorPanel();
                break;
        }
    }
    
    generateIndicatorsPanel() {
        return `
            <div class="panel-section">
                <h4>Active Indicators</h4>
                <div class="indicator-list">
                    <div class="panel-item">
                        <span class="indicator-name">Moving Average (20)</span>
                        <div class="indicator-controls">
                            <button class="btn-small" onclick="editIndicator('ma20')">Edit</button>
                            <button class="btn-small" onclick="removeIndicator('ma20')">Remove</button>
                        </div>
                    </div>
                    <div class="panel-item">
                        <span class="indicator-name">RSI (14)</span>
                        <div class="indicator-controls">
                            <button class="btn-small" onclick="editIndicator('rsi14')">Edit</button>
                            <button class="btn-small" onclick="removeIndicator('rsi14')">Remove</button>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="openIndicatorLibrary()">
                    <i class="fas fa-plus"></i> Add Indicator
                </button>
            </div>
        `;
    }
    
    generateStrategiesPanel() {
        return `
            <div class="panel-section">
                <h4>Trading Strategies</h4>
                <div class="strategy-list">
                    <div class="panel-item">
                        <span class="strategy-name">Moving Average Crossover</span>
                        <span class="strategy-status active">Active</span>
                        <div class="strategy-controls">
                            <button class="btn-small" onclick="editStrategy('ma_cross')">Edit</button>
                            <button class="btn-small" onclick="backtest('ma_cross')">Backtest</button>
                        </div>
                    </div>
                    <div class="panel-item">
                        <span class="strategy-name">RSI Divergence</span>
                        <span class="strategy-status inactive">Inactive</span>
                        <div class="strategy-controls">
                            <button class="btn-small" onclick="editStrategy('rsi_div')">Edit</button>
                            <button class="btn-small" onclick="backtest('rsi_div')">Backtest</button>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="createStrategy()">
                    <i class="fas fa-plus"></i> Create Strategy
                </button>
            </div>
        `;
    }
    
    generateAlertsPanel() {
        return `
            <div class="panel-section">
                <h4>Price Alerts</h4>
                <div class="alert-list">
                    <div class="panel-item">
                        <span class="alert-condition">AAPL > $220</span>
                        <span class="alert-status active">Active</span>
                        <div class="alert-controls">
                            <button class="btn-small" onclick="editAlert(1)">Edit</button>
                            <button class="btn-small" onclick="deleteAlert(1)">Delete</button>
                        </div>
                    </div>
                    <div class="panel-item">
                        <span class="alert-condition">RSI < 30</span>
                        <span class="alert-status triggered">Triggered</span>
                        <div class="alert-controls">
                            <button class="btn-small" onclick="editAlert(2)">Edit</button>
                            <button class="btn-small" onclick="deleteAlert(2)">Delete</button>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="createAlert()">
                    <i class="fas fa-bell"></i> Create Alert
                </button>
            </div>
        `;
    }
    
    generateOrdersPanel() {
        return `
            <div class="panel-section">
                <h4>Open Orders</h4>
                <div class="order-list">
                    <div class="panel-item">
                        <span class="order-type buy">BUY</span>
                        <span class="order-symbol">AAPL</span>
                        <span class="order-quantity">100 shares</span>
                        <span class="order-price">$210.50</span>
                        <div class="order-controls">
                            <button class="btn-small" onclick="modifyOrder(1)">Modify</button>
                            <button class="btn-small" onclick="cancelOrder(1)">Cancel</button>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="placeNewOrder()">
                    <i class="fas fa-plus"></i> Place Order
                </button>
            </div>
        `;
    }
    
    generateEditorPanel() {
        return `
            <div class="panel-section">
                <h4>Pine Script Editor</h4>
                <div class="editor-preview">
                    <p>Create custom indicators and strategies using Pine Script v5.</p>
                    <button class="btn btn-primary" onclick="openPineEditor()">
                        <i class="fas fa-code"></i> Open Full Editor
                    </button>
                </div>
            </div>
        `;
    }
}

// Global chart instance
let chartInstance = null;

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
        chartInstance = new TradingChart(chartContainer);
        
        // Initialize other components
        initializeInstrumentSelector();
        initializeWatchlist();
        initializeIndicatorsList();
        initializeMarketData();
    }
});

// Instrument selector functions
function toggleInstrumentDropdown() {
    const dropdown = document.getElementById('instrumentDropdown');
    dropdown.classList.toggle('active');
}

function initializeInstrumentSelector() {
    const instruments = {
        stocks: [
            { symbol: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', price: 208.62, change: -1.20 },
            { symbol: 'GOOGL', name: 'Alphabet Inc', exchange: 'NASDAQ', price: 2845.32, change: 2.15 },
            { symbol: 'MSFT', name: 'Microsoft Corp', exchange: 'NASDAQ', price: 378.91, change: 0.85 },
            { symbol: 'TSLA', name: 'Tesla Inc', exchange: 'NASDAQ', price: 248.45, change: -2.34 },
            { symbol: 'AMZN', name: 'Amazon.com Inc', exchange: 'NASDAQ', price: 3127.78, change: 1.67 }
        ],
        forex: [
            { symbol: 'EURUSD', name: 'Euro/US Dollar', exchange: 'FX', price: 1.0875, change: 0.21 },
            { symbol: 'GBPUSD', name: 'British Pound/US Dollar', exchange: 'FX', price: 1.2634, change: -0.36 },
            { symbol: 'USDJPY', name: 'US Dollar/Japanese Yen', exchange: 'FX', price: 149.82, change: 0.45 },
            { symbol: 'USDCAD', name: 'US Dollar/Canadian Dollar', exchange: 'FX', price: 1.3567, change: 0.12 }
        ],
        crypto: [
            { symbol: 'BTCUSD', name: 'Bitcoin', exchange: 'CRYPTO', price: 45230, change: 2.82 },
            { symbol: 'ETHUSD', name: 'Ethereum', exchange: 'CRYPTO', price: 2847, change: 1.95 },
            { symbol: 'ADAUSD', name: 'Cardano', exchange: 'CRYPTO', price: 0.523, change: -0.87 },
            { symbol: 'SOLUSD', name: 'Solana', exchange: 'CRYPTO', price: 68.45, change: 3.21 }
        ],
        commodities: [
            { symbol: 'GOLD', name: 'Gold Spot', exchange: 'COMEX', price: 1987.45, change: 0.65 },
            { symbol: 'SILVER', name: 'Silver Spot', exchange: 'COMEX', price: 24.67, change: -0.23 },
            { symbol: 'OIL', name: 'Crude Oil WTI', exchange: 'NYMEX', price: 78.92, change: 1.45 }
        ]
    };
    
    // Populate instrument list
    const instrumentList = document.getElementById('instrumentList');
    const categories = document.querySelectorAll('.instrument-categories .category');
    
    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            const categoryName = category.dataset.category;
            const categoryInstruments = instruments[categoryName] || [];
            
            instrumentList.innerHTML = categoryInstruments.map(instrument => `
                <div class="instrument-item" onclick="selectInstrument('${instrument.symbol}', '${instrument.name}', '${instrument.exchange}')">
                    <div class="instrument-info">
                        <div class="symbol">${instrument.symbol}</div>
                        <div class="description">${instrument.name}</div>
                    </div>
                    <div class="instrument-price">
                        <div class="price ${instrument.change >= 0 ? 'positive' : 'negative'}">${instrument.price}</div>
                        <div class="change ${instrument.change >= 0 ? 'positive' : 'negative'}">${instrument.change >= 0 ? '+' : ''}${instrument.change}%</div>
                    </div>
                </div>
            `).join('');
        });
    });
    
    // Initialize with stocks
    categories[0].click();
}

function selectInstrument(symbol, name, exchange) {
    // Update current instrument display
    document.querySelector('.current-instrument .symbol').textContent = symbol;
    document.querySelector('.current-instrument .company').textContent = name;
    document.querySelector('.current-instrument .exchange').textContent = exchange;
    
    // Update chart
    if (chartInstance) {
        chartInstance.currentSymbol = symbol;
        chartInstance.loadData();
    }
    
    // Close dropdown
    document.getElementById('instrumentDropdown').classList.remove('active');
}

// Initialize watchlist
function initializeWatchlist() {
    const watchlistData = [
        { symbol: 'AAPL', name: 'Apple Inc', price: 208.62, change: -1.20 },
        { symbol: 'GOOGL', name: 'Alphabet', price: 2845.32, change: 2.15 },
        { symbol: 'EURUSD', name: 'Euro/USD', price: 1.0875, change: 0.21 },
        { symbol: 'BTCUSD', name: 'Bitcoin', price: 45230, change: 2.82 },
        { symbol: 'GOLD', name: 'Gold Spot', price: 1987.45, change: 0.65 }
    ];
    
    const watchlist = document.getElementById('watchlist');
    watchlist.innerHTML = watchlistData.map(item => `
        <div class="watchlist-item" onclick="selectInstrument('${item.symbol}', '${item.name}', 'Exchange')">
            <div class="watchlist-symbol">
                <div class="symbol-name">${item.symbol}</div>
                <div class="symbol-desc">${item.name}</div>
            </div>
            <div class="watchlist-price">
                <div class="symbol-price">${item.price}</div>
                <div class="symbol-change ${item.change >= 0 ? 'positive' : 'negative'}">${item.change >= 0 ? '+' : ''}${item.change}%</div>
            </div>
        </div>
    `).join('');
}

// Initialize indicators list
function initializeIndicatorsList() {
    const activeIndicators = [
        { name: 'SMA (20)', params: 'Period: 20', id: 'sma20' },
        { name: 'RSI (14)', params: 'Period: 14', id: 'rsi14' },
        { name: 'MACD', params: '12,26,9', id: 'macd' },
        { name: 'Bollinger Bands', params: '20,2', id: 'bb' }
    ];
    
    const indicatorsList = document.getElementById('indicatorsList');
    indicatorsList.innerHTML = activeIndicators.map(indicator => `
        <div class="indicator-item">
            <div class="indicator-info">
                <div class="indicator-name">${indicator.name}</div>
                <div class="indicator-params">${indicator.params}</div>
            </div>
            <div class="indicator-controls">
                <button class="indicator-control" onclick="editIndicator('${indicator.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="indicator-control" onclick="removeIndicator('${indicator.id}')" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize market data
function initializeMarketData() {
    const marketData = [
        { name: 'S&P 500', value: '4,567.89', change: '+0.85%' },
        { name: 'NASDAQ', value: '14,234.56', change: '+1.23%' },
        { name: 'DOW', value: '34,876.45', change: '+0.67%' },
        { name: 'VIX', value: '18.45', change: '-2.34%' },
        { name: 'DXY', value: '103.45', change: '+0.12%' }
    ];
    
    const marketDataContainer = document.getElementById('marketData');
    marketDataContainer.innerHTML = marketData.map(item => `
        <div class="market-item">
            <div class="market-name">${item.name}</div>
            <div class="market-value">${item.value} (${item.change})</div>
        </div>
    `).join('');
}

// Chart control functions
function saveChart() {
    alert('Chart saved successfully!');
}

function loadChart() {
    alert('Load chart functionality would open here.');
}

function shareChart() {
    alert('Share chart functionality would open here.');
}

function takeScreenshot() {
    alert('Screenshot functionality would capture the chart.');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function openSettings() {
    alert('Chart settings panel would open here.');
}

// Trading functions
function placeBuyOrder() {
    alert('Buy order panel would open here.');
}

function placeSellOrder() {
    alert('Sell order panel would open here.');
}

function openOrderPanel() {
    alert('Order management panel would open here.');
}

// Indicator functions
function editIndicator(id) {
    alert(`Edit indicator: ${id}`);
}

function removeIndicator(id) {
    if (confirm(`Remove indicator: ${id}?`)) {
        alert(`Indicator ${id} removed.`);
    }
}

function addToWatchlist() {
    const symbol = prompt('Enter symbol to add to watchlist:');
    if (symbol) {
        alert(`${symbol} added to watchlist.`);
    }
}

