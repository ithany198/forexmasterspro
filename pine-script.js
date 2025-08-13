// Pine Script Editor and Compiler
class PineScriptEditor {
    constructor() {
        this.editor = null;
        this.functions = this.initializeFunctions();
        this.examples = this.initializeExamples();
        this.compiledScripts = new Map();
        this.setupEditor();
    }
    
    setupEditor() {
        // Initialize Ace Editor
        if (typeof ace !== 'undefined') {
            this.editor = ace.edit('pineEditor');
            this.editor.setTheme('ace/theme/monokai');
            this.editor.session.setMode('ace/mode/javascript');
            this.editor.setOptions({
                fontSize: 14,
                showPrintMargin: false,
                highlightActiveLine: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            });
            
            // Set default Pine Script template
            this.editor.setValue(this.getDefaultTemplate(), -1);
        }
    }
    
    getDefaultTemplate() {
        return `//@version=5
indicator("Custom Indicator", shorttitle="CI", overlay=true)

// Input parameters
length = input.int(20, title="Length", minval=1, maxval=200)
source = input(close, title="Source")

// Calculate moving average
ma = ta.sma(source, length)

// Plot the moving average
plot(ma, color=color.blue, linewidth=2, title="Moving Average")

// Add alerts
alertcondition(ta.crossover(close, ma), title="Price crosses above MA", message="Price crossed above moving average")
alertcondition(ta.crossunder(close, ma), title="Price crosses below MA", message="Price crossed below moving average")`;
    }
    
    initializeFunctions() {
        return {
            'Technical Analysis': [
                { name: 'ta.sma()', description: 'Simple Moving Average' },
                { name: 'ta.ema()', description: 'Exponential Moving Average' },
                { name: 'ta.wma()', description: 'Weighted Moving Average' },
                { name: 'ta.rsi()', description: 'Relative Strength Index' },
                { name: 'ta.macd()', description: 'MACD indicator' },
                { name: 'ta.stoch()', description: 'Stochastic oscillator' },
                { name: 'ta.cci()', description: 'Commodity Channel Index' },
                { name: 'ta.atr()', description: 'Average True Range' },
                { name: 'ta.bb()', description: 'Bollinger Bands' },
                { name: 'ta.crossover()', description: 'Crossover detection' },
                { name: 'ta.crossunder()', description: 'Crossunder detection' },
                { name: 'ta.highest()', description: 'Highest value over period' },
                { name: 'ta.lowest()', description: 'Lowest value over period' },
                { name: 'ta.valuewhen()', description: 'Value when condition is true' },
                { name: 'ta.barssince()', description: 'Bars since condition' }
            ],
            'Math Functions': [
                { name: 'math.abs()', description: 'Absolute value' },
                { name: 'math.max()', description: 'Maximum value' },
                { name: 'math.min()', description: 'Minimum value' },
                { name: 'math.round()', description: 'Round to nearest integer' },
                { name: 'math.floor()', description: 'Round down' },
                { name: 'math.ceil()', description: 'Round up' },
                { name: 'math.log()', description: 'Natural logarithm' },
                { name: 'math.pow()', description: 'Power function' },
                { name: 'math.sqrt()', description: 'Square root' },
                { name: 'math.sin()', description: 'Sine function' },
                { name: 'math.cos()', description: 'Cosine function' },
                { name: 'math.tan()', description: 'Tangent function' }
            ],
            'Input Functions': [
                { name: 'input.int()', description: 'Integer input' },
                { name: 'input.float()', description: 'Float input' },
                { name: 'input.bool()', description: 'Boolean input' },
                { name: 'input.string()', description: 'String input' },
                { name: 'input.color()', description: 'Color input' },
                { name: 'input.source()', description: 'Source input' },
                { name: 'input.timeframe()', description: 'Timeframe input' }
            ],
            'Plot Functions': [
                { name: 'plot()', description: 'Plot a series' },
                { name: 'plotshape()', description: 'Plot shapes' },
                { name: 'plotchar()', description: 'Plot characters' },
                { name: 'plotcandle()', description: 'Plot candlesticks' },
                { name: 'plotbar()', description: 'Plot bars' },
                { name: 'fill()', description: 'Fill between plots' },
                { name: 'bgcolor()', description: 'Background color' },
                { name: 'barcolor()', description: 'Bar color' }
            ],
            'Utility Functions': [
                { name: 'alert()', description: 'Create alert' },
                { name: 'alertcondition()', description: 'Alert condition' },
                { name: 'log.info()', description: 'Log information' },
                { name: 'log.warning()', description: 'Log warning' },
                { name: 'log.error()', description: 'Log error' },
                { name: 'request.security()', description: 'Request data from other timeframes' },
                { name: 'timeframe.in_seconds()', description: 'Timeframe in seconds' },
                { name: 'str.tostring()', description: 'Convert to string' }
            ]
        };
    }
    
    initializeExamples() {
        return [
            {
                name: 'Simple Moving Average',
                code: `//@version=5
indicator("Simple Moving Average", shorttitle="SMA", overlay=true)

length = input.int(20, title="Length", minval=1)
src = input(close, title="Source")

sma_value = ta.sma(src, length)
plot(sma_value, color=color.blue, linewidth=2, title="SMA")`
            },
            {
                name: 'RSI Indicator',
                code: `//@version=5
indicator("RSI", shorttitle="RSI")

length = input.int(14, title="RSI Length", minval=1)
src = input(close, title="Source")

rsi_value = ta.rsi(src, length)

plot(rsi_value, color=color.purple, title="RSI")
hline(70, "Overbought", color=color.red)
hline(50, "Middle", color=color.gray)
hline(30, "Oversold", color=color.green)`
            },
            {
                name: 'MACD',
                code: `//@version=5
indicator("MACD", shorttitle="MACD")

fast_length = input.int(12, title="Fast Length")
slow_length = input.int(26, title="Slow Length")
signal_length = input.int(9, title="Signal Length")
src = input(close, title="Source")

[macd_line, signal_line, hist] = ta.macd(src, fast_length, slow_length, signal_length)

plot(macd_line, color=color.blue, title="MACD")
plot(signal_line, color=color.red, title="Signal")
plot(hist, color=color.gray, style=plot.style_histogram, title="Histogram")`
            },
            {
                name: 'Bollinger Bands',
                code: `//@version=5
indicator("Bollinger Bands", shorttitle="BB", overlay=true)

length = input.int(20, title="Length", minval=1)
mult = input.float(2.0, title="Multiplier", minval=0.001, maxval=50)
src = input(close, title="Source")

[middle, upper, lower] = ta.bb(src, length, mult)

plot(middle, color=color.blue, title="Middle")
p1 = plot(upper, color=color.red, title="Upper")
p2 = plot(lower, color=color.green, title="Lower")
fill(p1, p2, color=color.blue, transp=90, title="Background")`
            },
            {
                name: 'Support and Resistance',
                code: `//@version=5
indicator("Support and Resistance", shorttitle="S&R", overlay=true)

pivot_length = input.int(10, title="Pivot Length", minval=1)

pivot_high = ta.pivothigh(high, pivot_length, pivot_length)
pivot_low = ta.pivotlow(low, pivot_length, pivot_length)

plotshape(pivot_high, style=shape.triangledown, location=location.abovebar, 
          color=color.red, size=size.small, title="Resistance")
plotshape(pivot_low, style=shape.triangleup, location=location.belowbar, 
          color=color.green, size=size.small, title="Support")`
            },
            {
                name: 'Trading Strategy',
                code: `//@version=5
strategy("Simple MA Strategy", shorttitle="MA Strat", overlay=true)

fast_length = input.int(10, title="Fast MA Length")
slow_length = input.int(20, title="Slow MA Length")

fast_ma = ta.sma(close, fast_length)
slow_ma = ta.sma(close, slow_length)

long_condition = ta.crossover(fast_ma, slow_ma)
short_condition = ta.crossunder(fast_ma, slow_ma)

if (long_condition)
    strategy.entry("Long", strategy.long)

if (short_condition)
    strategy.entry("Short", strategy.short)

plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")`
            },
            {
                name: 'Volume Analysis',
                code: `//@version=5
indicator("Volume Analysis", shorttitle="Vol")

vol_ma_length = input.int(20, title="Volume MA Length")
vol_threshold = input.float(1.5, title="Volume Threshold")

vol_ma = ta.sma(volume, vol_ma_length)
high_volume = volume > vol_ma * vol_threshold

barcolor(high_volume ? color.yellow : na, title="High Volume")
plot(vol_ma, color=color.blue, title="Volume MA")
plot(volume, color=high_volume ? color.red : color.gray, 
     style=plot.style_histogram, title="Volume")`
            },
            {
                name: 'Fibonacci Levels',
                code: `//@version=5
indicator("Auto Fibonacci", shorttitle="Fib", overlay=true)

length = input.int(100, title="Lookback Length")

highest_price = ta.highest(high, length)
lowest_price = ta.lowest(low, length)

fib_range = highest_price - lowest_price

fib_0 = lowest_price
fib_236 = lowest_price + fib_range * 0.236
fib_382 = lowest_price + fib_range * 0.382
fib_50 = lowest_price + fib_range * 0.5
fib_618 = lowest_price + fib_range * 0.618
fib_100 = highest_price

plot(fib_0, color=color.black, linewidth=2, title="0%")
plot(fib_236, color=color.red, title="23.6%")
plot(fib_382, color=color.orange, title="38.2%")
plot(fib_50, color=color.yellow, title="50%")
plot(fib_618, color=color.green, title="61.8%")
plot(fib_100, color=color.black, linewidth=2, title="100%")`
            }
        ];
    }
    
    populateFunctionList() {
        const functionList = document.getElementById('functionList');
        if (!functionList) return;
        
        let html = '';
        Object.entries(this.functions).forEach(([category, functions]) => {
            html += `<div class="function-category">
                <div class="function-category-title">${category}</div>`;
            
            functions.forEach(func => {
                html += `<div class="function-item" onclick="insertFunction('${func.name}')" title="${func.description}">
                    ${func.name}
                </div>`;
            });
            
            html += '</div>';
        });
        
        functionList.innerHTML = html;
    }
    
    populateExampleList() {
        const exampleList = document.getElementById('exampleList');
        if (!exampleList) return;
        
        const html = this.examples.map(example => `
            <div class="example-item" onclick="loadExample('${example.name}')">
                ${example.name}
            </div>
        `).join('');
        
        exampleList.innerHTML = html;
    }
    
    insertFunction(functionName) {
        if (this.editor) {
            this.editor.insert(functionName);
            this.editor.focus();
        }
    }
    
    loadExample(exampleName) {
        const example = this.examples.find(ex => ex.name === exampleName);
        if (example && this.editor) {
            this.editor.setValue(example.code, -1);
        }
    }
    
    compile() {
        if (!this.editor) return;
        
        const code = this.editor.getValue();
        const output = document.getElementById('editorOutput');
        
        try {
            // Basic Pine Script validation
            const errors = this.validatePineScript(code);
            
            if (errors.length === 0) {
                output.innerHTML = `
                    <div style="color: #26a69a;">
                        <i class="fas fa-check-circle"></i> Compilation successful!
                    </div>
                    <div style="margin-top: 10px; color: #8691a8;">
                        Script compiled and ready to apply to chart.
                    </div>
                `;
                
                // Store compiled script
                const scriptId = 'custom_' + Date.now();
                this.compiledScripts.set(scriptId, {
                    code: code,
                    name: this.extractScriptName(code),
                    compiled: true
                });
                
                return true;
            } else {
                this.showErrors(errors);
                return false;
            }
        } catch (error) {
            this.showErrors([{ line: 0, message: error.message }]);
            return false;
        }
    }
    
    validatePineScript(code) {
        const errors = [];
        const lines = code.split('\\n');
        
        // Basic validation rules
        if (!code.includes('//@version=5')) {
            errors.push({ line: 1, message: 'Missing version directive. Add //@version=5 at the top.' });
        }
        
        if (!code.includes('indicator(') && !code.includes('strategy(')) {
            errors.push({ line: 1, message: 'Script must declare indicator() or strategy().' });
        }
        
        // Check for common syntax issues
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            
            // Check for unmatched parentheses
            const openParens = (line.match(/\\(/g) || []).length;
            const closeParens = (line.match(/\\)/g) || []).length;
            if (openParens !== closeParens && !line.trim().endsWith('\\\\')) {
                errors.push({ line: lineNum, message: 'Unmatched parentheses' });
            }
            
            // Check for undefined variables (basic check)
            const variableMatch = line.match(/^\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*=/);
            if (variableMatch && this.isReservedWord(variableMatch[1])) {
                errors.push({ line: lineNum, message: `'${variableMatch[1]}' is a reserved word` });
            }
        });
        
        return errors;
    }
    
    isReservedWord(word) {
        const reserved = ['if', 'else', 'for', 'while', 'true', 'false', 'na', 'close', 'open', 'high', 'low', 'volume'];
        return reserved.includes(word);
    }
    
    extractScriptName(code) {
        const match = code.match(/(?:indicator|strategy)\\s*\\(\\s*["']([^"']+)["']/);
        return match ? match[1] : 'Custom Script';
    }
    
    showErrors(errors) {
        const output = document.getElementById('editorOutput');
        const errorHtml = errors.map(error => `
            <div style="color: #ef5350; margin-bottom: 8px;">
                <i class="fas fa-exclamation-circle"></i> 
                Line ${error.line}: ${error.message}
            </div>
        `).join('');
        
        output.innerHTML = `
            <div style="color: #ef5350; font-weight: 600; margin-bottom: 10px;">
                <i class="fas fa-times-circle"></i> Compilation failed with ${errors.length} error(s):
            </div>
            ${errorHtml}
        `;
    }
    
    save() {
        if (!this.editor) return;
        
        const code = this.editor.getValue();
        const name = this.extractScriptName(code);
        
        // Save to localStorage for demo
        const savedScripts = JSON.parse(localStorage.getItem('pineScripts') || '[]');
        savedScripts.push({
            id: Date.now().toString(),
            name: name,
            code: code,
            created: new Date().toISOString()
        });
        localStorage.setItem('pineScripts', JSON.stringify(savedScripts));
        
        alert(`Script "${name}" saved successfully!`);
    }
    
    load() {
        const savedScripts = JSON.parse(localStorage.getItem('pineScripts') || '[]');
        
        if (savedScripts.length === 0) {
            alert('No saved scripts found.');
            return;
        }
        
        const scriptList = savedScripts.map((script, index) => 
            `${index + 1}. ${script.name} (${new Date(script.created).toLocaleDateString()})`
        ).join('\\n');
        
        const selection = prompt(`Select script to load:\\n${scriptList}\\n\\nEnter number:`);
        const index = parseInt(selection) - 1;
        
        if (index >= 0 && index < savedScripts.length) {
            this.editor.setValue(savedScripts[index].code, -1);
            alert(`Script "${savedScripts[index].name}" loaded successfully!`);
        }
    }
    
    share() {
        if (!this.editor) return;
        
        const code = this.editor.getValue();
        const name = this.extractScriptName(code);
        
        // Create shareable link (simplified for demo)
        const encodedCode = btoa(encodeURIComponent(code));
        const shareUrl = `${window.location.origin}/chart?script=${encodedCode}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert(`Script "${name}" share link copied to clipboard!`);
        }).catch(() => {
            prompt('Copy this share link:', shareUrl);
        });
    }
}

// Global Pine Script editor instance
let pineEditor = null;

// Functions called from HTML
function openPineEditor() {
    const modal = document.getElementById('pineEditorModal');
    modal.style.display = 'block';
    
    // Initialize editor if not already done
    if (!pineEditor) {
        setTimeout(() => {
            pineEditor = new PineScriptEditor();
            pineEditor.populateFunctionList();
            pineEditor.populateExampleList();
        }, 100);
    }
}

function compilePineScript() {
    if (pineEditor) {
        const success = pineEditor.compile();
        if (success) {
            // Show success feedback
            const output = document.getElementById('editorOutput');
            setTimeout(() => {
                output.innerHTML += `
                    <div style="color: #26a69a; margin-top: 10px;">
                        <i class="fas fa-info-circle"></i> 
                        You can now apply this indicator to your chart.
                    </div>
                `;
            }, 1000);
        }
    }
}

function savePineScript() {
    if (pineEditor) {
        pineEditor.save();
    }
}

function loadPineScript() {
    if (pineEditor) {
        pineEditor.load();
    }
}

function sharePineScript() {
    if (pineEditor) {
        pineEditor.share();
    }
}

function insertFunction(functionName) {
    if (pineEditor) {
        pineEditor.insertFunction(functionName);
    }
}

function loadExample(exampleName) {
    if (pineEditor) {
        pineEditor.loadExample(exampleName);
    }
}

// Output tab switching
function switchOutputTab(tabName) {
    const tabs = document.querySelectorAll('.output-tab');
    const output = document.getElementById('editorOutput');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    switch (tabName) {
        case 'console':
            // Show compilation output
            break;
        case 'errors':
            output.innerHTML = `
                <div style="color: #8691a8;">
                    <i class="fas fa-info-circle"></i> No errors found.
                </div>
            `;
            break;
        case 'help':
            output.innerHTML = `
                <div style="color: #d1d4dc;">
                    <h4 style="color: #4a6cf7; margin-bottom: 10px;">Pine Script Help</h4>
                    <p>Welcome to the Pine Script v5 editor!</p>
                    <br>
                    <strong>Getting Started:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Every script must start with <code>//@version=5</code></li>
                        <li>Declare your script type: <code>indicator()</code> or <code>strategy()</code></li>
                        <li>Use <code>input.*()</code> functions for user inputs</li>
                        <li>Calculate your values using built-in functions</li>
                        <li>Use <code>plot()</code> to display results</li>
                    </ul>
                    <br>
                    <strong>Common Functions:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li><code>ta.sma(source, length)</code> - Simple Moving Average</li>
                        <li><code>ta.rsi(source, length)</code> - RSI</li>
                        <li><code>ta.crossover(a, b)</code> - Cross above detection</li>
                        <li><code>alert(message)</code> - Create alert</li>
                    </ul>
                </div>
            `;
            break;
    }
}

// Initialize output tab switching
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.output-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchOutputTab(e.currentTarget.dataset.tab);
        });
    });
});

