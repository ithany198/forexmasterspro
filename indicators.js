// Technical Indicators Library
class IndicatorLibrary {
    constructor() {
        this.indicators = this.initializeIndicators();
        this.customIndicators = new Map();
    }
    
    initializeIndicators() {
        return {
            // Trend Indicators
            trend: [
                {
                    id: 'sma',
                    name: 'Simple Moving Average',
                    description: 'A basic moving average that smooths price data',
                    category: 'trend',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 1, max: 200 }
                    ],
                    calculate: this.calculateSMA
                },
                {
                    id: 'ema',
                    name: 'Exponential Moving Average',
                    description: 'A moving average that gives more weight to recent prices',
                    category: 'trend',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 1, max: 200 }
                    ],
                    calculate: this.calculateEMA
                },
                {
                    id: 'wma',
                    name: 'Weighted Moving Average',
                    description: 'A moving average that assigns different weights to data points',
                    category: 'trend',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 1, max: 200 }
                    ],
                    calculate: this.calculateWMA
                },
                {
                    id: 'dema',
                    name: 'Double Exponential Moving Average',
                    description: 'A double-smoothed exponential moving average',
                    category: 'trend',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 1, max: 200 }
                    ],
                    calculate: this.calculateDEMA
                },
                {
                    id: 'tema',
                    name: 'Triple Exponential Moving Average',
                    description: 'A triple-smoothed exponential moving average',
                    category: 'trend',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 1, max: 200 }
                    ],
                    calculate: this.calculateTEMA
                }
            ],
            
            // Momentum Indicators
            momentum: [
                {
                    id: 'rsi',
                    name: 'Relative Strength Index',
                    description: 'Measures the speed and magnitude of price changes',
                    category: 'momentum',
                    parameters: [
                        { name: 'period', type: 'number', default: 14, min: 2, max: 50 }
                    ],
                    calculate: this.calculateRSI
                },
                {
                    id: 'macd',
                    name: 'MACD',
                    description: 'Moving Average Convergence Divergence',
                    category: 'momentum',
                    parameters: [
                        { name: 'fastPeriod', type: 'number', default: 12, min: 1, max: 50 },
                        { name: 'slowPeriod', type: 'number', default: 26, min: 1, max: 100 },
                        { name: 'signalPeriod', type: 'number', default: 9, min: 1, max: 50 }
                    ],
                    calculate: this.calculateMACD
                },
                {
                    id: 'stoch',
                    name: 'Stochastic Oscillator',
                    description: 'Compares closing price to price range over time',
                    category: 'momentum',
                    parameters: [
                        { name: 'kPeriod', type: 'number', default: 14, min: 1, max: 50 },
                        { name: 'dPeriod', type: 'number', default: 3, min: 1, max: 20 }
                    ],
                    calculate: this.calculateStochastic
                },
                {
                    id: 'cci',
                    name: 'Commodity Channel Index',
                    description: 'Measures the current price level relative to an average price level',
                    category: 'momentum',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 5, max: 50 }
                    ],
                    calculate: this.calculateCCI
                },
                {
                    id: 'williams',
                    name: 'Williams %R',
                    description: 'A momentum indicator that measures overbought and oversold levels',
                    category: 'momentum',
                    parameters: [
                        { name: 'period', type: 'number', default: 14, min: 1, max: 50 }
                    ],
                    calculate: this.calculateWilliamsR
                }
            ],
            
            // Volatility Indicators
            volatility: [
                {
                    id: 'bb',
                    name: 'Bollinger Bands',
                    description: 'Price channels based on standard deviation',
                    category: 'volatility',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 5, max: 50 },
                        { name: 'deviation', type: 'number', default: 2, min: 0.5, max: 4, step: 0.1 }
                    ],
                    calculate: this.calculateBollingerBands
                },
                {
                    id: 'atr',
                    name: 'Average True Range',
                    description: 'Measures market volatility',
                    category: 'volatility',
                    parameters: [
                        { name: 'period', type: 'number', default: 14, min: 1, max: 50 }
                    ],
                    calculate: this.calculateATR
                },
                {
                    id: 'keltner',
                    name: 'Keltner Channels',
                    description: 'Volatility-based envelopes set above and below an exponential moving average',
                    category: 'volatility',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 5, max: 50 },
                        { name: 'multiplier', type: 'number', default: 2, min: 0.5, max: 4, step: 0.1 }
                    ],
                    calculate: this.calculateKeltnerChannels
                },
                {
                    id: 'donchian',
                    name: 'Donchian Channels',
                    description: 'Price channels based on highest high and lowest low',
                    category: 'volatility',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 5, max: 100 }
                    ],
                    calculate: this.calculateDonchianChannels
                }
            ],
            
            // Volume Indicators
            volume: [
                {
                    id: 'vwap',
                    name: 'Volume Weighted Average Price',
                    description: 'Average price weighted by volume',
                    category: 'volume',
                    parameters: [],
                    calculate: this.calculateVWAP
                },
                {
                    id: 'obv',
                    name: 'On Balance Volume',
                    description: 'Cumulative volume based on price direction',
                    category: 'volume',
                    parameters: [],
                    calculate: this.calculateOBV
                },
                {
                    id: 'ad',
                    name: 'Accumulation/Distribution',
                    description: 'Volume flow indicator',
                    category: 'volume',
                    parameters: [],
                    calculate: this.calculateAD
                },
                {
                    id: 'mfi',
                    name: 'Money Flow Index',
                    description: 'Volume-weighted RSI',
                    category: 'volume',
                    parameters: [
                        { name: 'period', type: 'number', default: 14, min: 2, max: 50 }
                    ],
                    calculate: this.calculateMFI
                }
            ],
            
            // Oscillators
            oscillators: [
                {
                    id: 'ao',
                    name: 'Awesome Oscillator',
                    description: 'Momentum oscillator based on moving averages',
                    category: 'oscillators',
                    parameters: [],
                    calculate: this.calculateAO
                },
                {
                    id: 'roc',
                    name: 'Rate of Change',
                    description: 'Momentum oscillator measuring percentage change',
                    category: 'oscillators',
                    parameters: [
                        { name: 'period', type: 'number', default: 12, min: 1, max: 50 }
                    ],
                    calculate: this.calculateROC
                },
                {
                    id: 'trix',
                    name: 'TRIX',
                    description: 'Triple smoothed exponential moving average oscillator',
                    category: 'oscillators',
                    parameters: [
                        { name: 'period', type: 'number', default: 14, min: 5, max: 50 }
                    ],
                    calculate: this.calculateTRIX
                },
                {
                    id: 'dpo',
                    name: 'Detrended Price Oscillator',
                    description: 'Removes trend to highlight cycles',
                    category: 'oscillators',
                    parameters: [
                        { name: 'period', type: 'number', default: 20, min: 5, max: 50 }
                    ],
                    calculate: this.calculateDPO
                }
            ]
        };
    }
    
    // Technical Indicator Calculations
    
    calculateSMA(data, period) {
        const result = [];
        for (let i = period - 1; i < data.length; i++) {
            const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
            result.push({
                time: data[i].time,
                value: sum / period
            });
        }
        return result;
    }
    
    calculateEMA(data, period) {
        const result = [];
        const multiplier = 2 / (period + 1);
        let ema = data[0].close;
        
        result.push({ time: data[0].time, value: ema });
        
        for (let i = 1; i < data.length; i++) {
            ema = (data[i].close * multiplier) + (ema * (1 - multiplier));
            result.push({
                time: data[i].time,
                value: ema
            });
        }
        return result;
    }
    
    calculateWMA(data, period) {
        const result = [];
        const weights = [];
        for (let i = 1; i <= period; i++) {
            weights.push(i);
        }
        const weightSum = weights.reduce((acc, val) => acc + val, 0);
        
        for (let i = period - 1; i < data.length; i++) {
            let weightedSum = 0;
            for (let j = 0; j < period; j++) {
                weightedSum += data[i - j].close * weights[period - 1 - j];
            }
            result.push({
                time: data[i].time,
                value: weightedSum / weightSum
            });
        }
        return result;
    }
    
    calculateDEMA(data, period) {
        const ema1 = this.calculateEMA(data, period);
        const ema2 = this.calculateEMA(ema1.map(item => ({ time: item.time, close: item.value })), period);
        
        const result = [];
        for (let i = 0; i < ema1.length && i < ema2.length; i++) {
            result.push({
                time: ema1[i].time,
                value: (2 * ema1[i].value) - ema2[i].value
            });
        }
        return result;
    }
    
    calculateTEMA(data, period) {
        const ema1 = this.calculateEMA(data, period);
        const ema2 = this.calculateEMA(ema1.map(item => ({ time: item.time, close: item.value })), period);
        const ema3 = this.calculateEMA(ema2.map(item => ({ time: item.time, close: item.value })), period);
        
        const result = [];
        for (let i = 0; i < ema1.length && i < ema2.length && i < ema3.length; i++) {
            result.push({
                time: ema1[i].time,
                value: (3 * ema1[i].value) - (3 * ema2[i].value) + ema3[i].value
            });
        }
        return result;
    }
    
    calculateRSI(data, period) {
        const result = [];
        const gains = [];
        const losses = [];
        
        for (let i = 1; i < data.length; i++) {
            const change = data[i].close - data[i - 1].close;
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? Math.abs(change) : 0);
        }
        
        let avgGain = gains.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
        let avgLoss = losses.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
        
        for (let i = period; i < data.length; i++) {
            if (avgLoss === 0) {
                result.push({ time: data[i].time, value: 100 });
            } else {
                const rs = avgGain / avgLoss;
                const rsi = 100 - (100 / (1 + rs));
                result.push({ time: data[i].time, value: rsi });
            }
            
            // Update averages
            if (i < gains.length) {
                avgGain = ((avgGain * (period - 1)) + gains[i]) / period;
                avgLoss = ((avgLoss * (period - 1)) + losses[i]) / period;
            }
        }
        
        return result;
    }
    
    calculateMACD(data, fastPeriod, slowPeriod, signalPeriod) {
        const fastEMA = this.calculateEMA(data, fastPeriod);
        const slowEMA = this.calculateEMA(data, slowPeriod);
        
        const macdLine = [];
        const minLength = Math.min(fastEMA.length, slowEMA.length);
        
        for (let i = 0; i < minLength; i++) {
            macdLine.push({
                time: fastEMA[i].time,
                value: fastEMA[i].value - slowEMA[i].value
            });
        }
        
        const signalLine = this.calculateEMA(macdLine.map(item => ({ time: item.time, close: item.value })), signalPeriod);
        
        const histogram = [];
        const minSignalLength = Math.min(macdLine.length, signalLine.length);
        
        for (let i = 0; i < minSignalLength; i++) {
            histogram.push({
                time: macdLine[i].time,
                value: macdLine[i].value - signalLine[i].value
            });
        }
        
        return {
            macd: macdLine,
            signal: signalLine,
            histogram: histogram
        };
    }
    
    calculateStochastic(data, kPeriod, dPeriod) {
        const result = [];
        
        for (let i = kPeriod - 1; i < data.length; i++) {
            const period = data.slice(i - kPeriod + 1, i + 1);
            const lowest = Math.min(...period.map(d => d.low));
            const highest = Math.max(...period.map(d => d.high));
            const current = data[i].close;
            
            const k = ((current - lowest) / (highest - lowest)) * 100;
            result.push({
                time: data[i].time,
                k: k
            });
        }
        
        // Calculate %D (moving average of %K)
        for (let i = dPeriod - 1; i < result.length; i++) {
            const dSum = result.slice(i - dPeriod + 1, i + 1).reduce((acc, val) => acc + val.k, 0);
            result[i].d = dSum / dPeriod;
        }
        
        return result;
    }
    
    calculateCCI(data, period) {
        const result = [];
        
        for (let i = period - 1; i < data.length; i++) {
            const periodData = data.slice(i - period + 1, i + 1);
            
            // Calculate Typical Price for each period
            const typicalPrices = periodData.map(d => (d.high + d.low + d.close) / 3);
            
            // Calculate Simple Moving Average of Typical Price
            const sma = typicalPrices.reduce((acc, val) => acc + val, 0) / period;
            
            // Calculate Mean Deviation
            const meanDeviation = typicalPrices.reduce((acc, val) => acc + Math.abs(val - sma), 0) / period;
            
            // Calculate CCI
            const currentTP = (data[i].high + data[i].low + data[i].close) / 3;
            const cci = (currentTP - sma) / (0.015 * meanDeviation);
            
            result.push({
                time: data[i].time,
                value: cci
            });
        }
        
        return result;
    }
    
    calculateWilliamsR(data, period) {
        const result = [];
        
        for (let i = period - 1; i < data.length; i++) {
            const periodData = data.slice(i - period + 1, i + 1);
            const highest = Math.max(...periodData.map(d => d.high));
            const lowest = Math.min(...periodData.map(d => d.low));
            
            const williamsR = ((highest - data[i].close) / (highest - lowest)) * -100;
            
            result.push({
                time: data[i].time,
                value: williamsR
            });
        }
        
        return result;
    }
    
    calculateBollingerBands(data, period, deviation) {
        const sma = this.calculateSMA(data, period);
        const result = [];
        
        for (let i = 0; i < sma.length; i++) {
            const dataIndex = i + period - 1;
            const periodData = data.slice(dataIndex - period + 1, dataIndex + 1);
            
            // Calculate standard deviation
            const mean = sma[i].value;
            const variance = periodData.reduce((acc, val) => acc + Math.pow(val.close - mean, 2), 0) / period;
            const stdDev = Math.sqrt(variance);
            
            result.push({
                time: sma[i].time,
                upper: mean + (deviation * stdDev),
                middle: mean,
                lower: mean - (deviation * stdDev)
            });
        }
        
        return result;
    }
    
    calculateATR(data, period) {
        const result = [];
        const trueRanges = [];
        
        for (let i = 1; i < data.length; i++) {
            const tr1 = data[i].high - data[i].low;
            const tr2 = Math.abs(data[i].high - data[i - 1].close);
            const tr3 = Math.abs(data[i].low - data[i - 1].close);
            const tr = Math.max(tr1, tr2, tr3);
            trueRanges.push(tr);
        }
        
        // Calculate initial ATR (SMA of first period TRs)
        let atr = trueRanges.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
        result.push({
            time: data[period].time,
            value: atr
        });
        
        // Calculate subsequent ATRs using Wilder's smoothing
        for (let i = period; i < trueRanges.length; i++) {
            atr = ((atr * (period - 1)) + trueRanges[i]) / period;
            result.push({
                time: data[i + 1].time,
                value: atr
            });
        }
        
        return result;
    }
    
    calculateKeltnerChannels(data, period, multiplier) {
        const ema = this.calculateEMA(data, period);
        const atr = this.calculateATR(data, period);
        const result = [];
        
        for (let i = 0; i < Math.min(ema.length, atr.length); i++) {
            result.push({
                time: ema[i].time,
                upper: ema[i].value + (multiplier * atr[i].value),
                middle: ema[i].value,
                lower: ema[i].value - (multiplier * atr[i].value)
            });
        }
        
        return result;
    }
    
    calculateDonchianChannels(data, period) {
        const result = [];
        
        for (let i = period - 1; i < data.length; i++) {
            const periodData = data.slice(i - period + 1, i + 1);
            const upper = Math.max(...periodData.map(d => d.high));
            const lower = Math.min(...periodData.map(d => d.low));
            const middle = (upper + lower) / 2;
            
            result.push({
                time: data[i].time,
                upper: upper,
                middle: middle,
                lower: lower
            });
        }
        
        return result;
    }
    
    calculateVWAP(data) {
        const result = [];
        let cumulativePriceVolume = 0;
        let cumulativeVolume = 0;
        
        for (let i = 0; i < data.length; i++) {
            const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
            const volume = data[i].volume || 1000000; // Default volume if not provided
            
            cumulativePriceVolume += typicalPrice * volume;
            cumulativeVolume += volume;
            
            result.push({
                time: data[i].time,
                value: cumulativePriceVolume / cumulativeVolume
            });
        }
        
        return result;
    }
    
    calculateOBV(data) {
        const result = [];
        let obv = 0;
        
        result.push({ time: data[0].time, value: 0 });
        
        for (let i = 1; i < data.length; i++) {
            const volume = data[i].volume || 1000000;
            if (data[i].close > data[i - 1].close) {
                obv += volume;
            } else if (data[i].close < data[i - 1].close) {
                obv -= volume;
            }
            
            result.push({
                time: data[i].time,
                value: obv
            });
        }
        
        return result;
    }
    
    calculateAD(data) {
        const result = [];
        let ad = 0;
        
        for (let i = 0; i < data.length; i++) {
            const clv = ((data[i].close - data[i].low) - (data[i].high - data[i].close)) / (data[i].high - data[i].low);
            const volume = data[i].volume || 1000000;
            ad += clv * volume;
            
            result.push({
                time: data[i].time,
                value: ad
            });
        }
        
        return result;
    }
    
    calculateMFI(data, period) {
        const result = [];
        const typicalPrices = [];
        const rawMoneyFlows = [];
        
        for (let i = 0; i < data.length; i++) {
            const tp = (data[i].high + data[i].low + data[i].close) / 3;
            typicalPrices.push(tp);
            rawMoneyFlows.push(tp * (data[i].volume || 1000000));
        }
        
        for (let i = period; i < data.length; i++) {
            let positiveFlow = 0;
            let negativeFlow = 0;
            
            for (let j = i - period + 1; j <= i; j++) {
                if (typicalPrices[j] > typicalPrices[j - 1]) {
                    positiveFlow += rawMoneyFlows[j];
                } else if (typicalPrices[j] < typicalPrices[j - 1]) {
                    negativeFlow += rawMoneyFlows[j];
                }
            }
            
            const moneyRatio = positiveFlow / negativeFlow;
            const mfi = 100 - (100 / (1 + moneyRatio));
            
            result.push({
                time: data[i].time,
                value: mfi
            });
        }
        
        return result;
    }
    
    calculateAO(data) {
        const result = [];
        const sma5 = this.calculateSMA(data.map(d => ({ time: d.time, close: (d.high + d.low) / 2 })), 5);
        const sma34 = this.calculateSMA(data.map(d => ({ time: d.time, close: (d.high + d.low) / 2 })), 34);
        
        for (let i = 0; i < Math.min(sma5.length, sma34.length); i++) {
            result.push({
                time: sma5[i].time,
                value: sma5[i].value - sma34[i].value
            });
        }
        
        return result;
    }
    
    calculateROC(data, period) {
        const result = [];
        
        for (let i = period; i < data.length; i++) {
            const roc = ((data[i].close - data[i - period].close) / data[i - period].close) * 100;
            result.push({
                time: data[i].time,
                value: roc
            });
        }
        
        return result;
    }
    
    calculateTRIX(data, period) {
        const ema1 = this.calculateEMA(data, period);
        const ema2 = this.calculateEMA(ema1.map(item => ({ time: item.time, close: item.value })), period);
        const ema3 = this.calculateEMA(ema2.map(item => ({ time: item.time, close: item.value })), period);
        
        const result = [];
        for (let i = 1; i < ema3.length; i++) {
            const trix = ((ema3[i].value - ema3[i - 1].value) / ema3[i - 1].value) * 10000;
            result.push({
                time: ema3[i].time,
                value: trix
            });
        }
        
        return result;
    }
    
    calculateDPO(data, period) {
        const result = [];
        const sma = this.calculateSMA(data, period);
        const shift = Math.floor(period / 2) + 1;
        
        for (let i = 0; i < sma.length; i++) {
            const dataIndex = i + period - 1;
            if (dataIndex + shift < data.length) {
                const dpo = data[dataIndex].close - sma[i].value;
                result.push({
                    time: data[dataIndex].time,
                    value: dpo
                });
            }
        }
        
        return result;
    }
    
    // Get all indicators by category
    getIndicatorsByCategory(category) {
        if (category === 'all') {
            return Object.values(this.indicators).flat();
        }
        return this.indicators[category] || [];
    }
    
    // Get specific indicator
    getIndicator(id) {
        const allIndicators = Object.values(this.indicators).flat();
        return allIndicators.find(indicator => indicator.id === id);
    }
    
    // Add custom indicator
    addCustomIndicator(indicator) {
        this.customIndicators.set(indicator.id, indicator);
    }
    
    // Get all custom indicators
    getCustomIndicators() {
        return Array.from(this.customIndicators.values());
    }
}

// Global indicator library instance
const indicatorLibrary = new IndicatorLibrary();

// Functions for indicator library modal
function openIndicatorLibrary() {
    const modal = document.getElementById('indicatorModal');
    modal.style.display = 'block';
    populateIndicatorGrid('all');
}

function populateIndicatorGrid(category) {
    const grid = document.getElementById('indicatorGrid');
    const indicators = indicatorLibrary.getIndicatorsByCategory(category);
    
    grid.innerHTML = indicators.map(indicator => `
        <div class="indicator-card" onclick="addIndicatorToChart('${indicator.id}')">
            <div class="indicator-card-header">
                <div class="indicator-card-name">${indicator.name}</div>
                <div class="indicator-card-category">${indicator.category}</div>
            </div>
            <div class="indicator-card-description">${indicator.description}</div>
            <div class="indicator-card-footer">
                <span>Parameters: ${indicator.parameters.length}</span>
                <span>Popular</span>
            </div>
        </div>
    `).join('');
}

function addIndicatorToChart(indicatorId) {
    const indicator = indicatorLibrary.getIndicator(indicatorId);
    if (indicator && chartInstance) {
        // Calculate indicator with default parameters
        const data = chartInstance.generateSampleData().candlesticks;
        const params = indicator.parameters.map(p => p.default);
        
        try {
            const result = indicator.calculate.call(indicatorLibrary, data, ...params);
            
            // Add to chart (simplified for demo)
            console.log(`Added ${indicator.name} to chart`, result);
            alert(`${indicator.name} added to chart successfully!`);
            
            // Close modal
            closeModal('indicatorModal');
            
            // Refresh indicators list
            initializeIndicatorsList();
            
        } catch (error) {
            console.error('Error calculating indicator:', error);
            alert('Error adding indicator to chart.');
        }
    }
}

// Setup event listeners for indicator categories
document.addEventListener('DOMContentLoaded', function() {
    // Category selection
    document.querySelectorAll('.indicator-categories .category').forEach(category => {
        category.addEventListener('click', (e) => {
            document.querySelectorAll('.indicator-categories .category').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            populateIndicatorGrid(e.currentTarget.dataset.category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('indicatorSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.indicator-card');
            
            cards.forEach(card => {
                const name = card.querySelector('.indicator-card-name').textContent.toLowerCase();
                const description = card.querySelector('.indicator-card-description').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

