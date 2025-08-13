// Content Generator for ForexMaster Pro
class ContentGenerator {
    constructor() {
        this.forumTopics = this.generateForumTopics();
        this.blogArticles = this.generateBlogArticles();
        this.courseContent = this.generateCourseContent();
        this.tradingStrategies = this.generateTradingStrategies();
        this.marketAnalysis = this.generateMarketAnalysis();
    }
    
    generateForumTopics() {
        const categories = [
            'Technical Analysis', 'Fundamental Analysis', 'Trading Psychology', 
            'Risk Management', 'Forex Trading', 'Stock Trading', 'Cryptocurrency',
            'Options Trading', 'Futures Trading', 'Day Trading', 'Swing Trading',
            'Scalping', 'Algorithmic Trading', 'Market News', 'Trading Platforms',
            'Broker Reviews', 'Education', 'Beginner Questions', 'Advanced Strategies',
            'Trading Systems', 'Backtesting', 'Economic Calendar', 'Market Sentiment'
        ];
        
        const topicTemplates = [
            'How to trade {instrument} effectively',
            'Best {indicator} settings for {timeframe}',
            '{strategy} strategy: Does it work in {market}?',
            'My {period} trading results using {approach}',
            'Question about {concept} - need help',
            '{instrument} analysis for this week',
            'Why {market} is moving {direction}',
            'Best practices for {tradingStyle}',
            'Risk management tips for {scenario}',
            'Economic impact of {event} on {market}',
            'Technical setup: {pattern} on {instrument}',
            'Live trading {session} discussion',
            'Broker comparison: {feature} analysis',
            'Platform review: {software} pros and cons',
            'Psychology: Overcoming {emotion} in trading',
            'Fundamental analysis of {asset}',
            'Options strategy: {optionStrategy} explained',
            'Crypto alert: {crypto} technical analysis',
            'Forex session: {session} market opportunities',
            'Swing trade idea: {instrument} setup'
        ];
        
        const instruments = [
            'EUR/USD', 'GBP/USD', 'USD/JPY', 'AAPL', 'TSLA', 'GOLD', 'Bitcoin', 'Ethereum',
            'S&P 500', 'NASDAQ', 'Crude Oil', 'Silver', 'AUD/USD', 'USD/CAD', 'NZD/USD',
            'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX', 'DXY', 'VIX', 'Natural Gas'
        ];
        
        const indicators = [
            'RSI', 'MACD', 'Moving Averages', 'Bollinger Bands', 'Stochastic', 'CCI',
            'ATR', 'Fibonacci', 'Support/Resistance', 'Volume Profile', 'Williams %R',
            'ADX', 'Ichimoku', 'Parabolic SAR', 'Momentum', 'OBV'
        ];
        
        const timeframes = [
            '1-minute', '5-minute', '15-minute', '1-hour', '4-hour', 'daily', 'weekly'
        ];
        
        const strategies = [
            'breakout', 'reversal', 'trend-following', 'mean-reversion', 'momentum',
            'arbitrage', 'grid trading', 'martingale', 'scalping', 'position trading'
        ];
        
        const topics = [];
        
        // Generate 300+ forum topics
        for (let i = 0; i < 350; i++) {
            const template = topicTemplates[Math.floor(Math.random() * topicTemplates.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            
            let title = template
                .replace('{instrument}', instruments[Math.floor(Math.random() * instruments.length)])
                .replace('{indicator}', indicators[Math.floor(Math.random() * indicators.length)])
                .replace('{timeframe}', timeframes[Math.floor(Math.random() * timeframes.length)])
                .replace('{strategy}', strategies[Math.floor(Math.random() * strategies.length)])
                .replace('{market}', ['bull market', 'bear market', 'sideways market'][Math.floor(Math.random() * 3)])
                .replace('{period}', ['weekly', 'monthly', 'quarterly', 'yearly'][Math.floor(Math.random() * 4)])
                .replace('{approach}', ['technical analysis', 'fundamental analysis', 'price action'][Math.floor(Math.random() * 3)])
                .replace('{concept}', ['leverage', 'margin', 'pip calculation', 'lot sizing'][Math.floor(Math.random() * 4)])
                .replace('{direction}', ['higher', 'lower', 'sideways'][Math.floor(Math.random() * 3)])
                .replace('{tradingStyle}', ['day trading', 'swing trading', 'scalping'][Math.floor(Math.random() * 3)])
                .replace('{scenario}', ['high volatility', 'low liquidity', 'news events'][Math.floor(Math.random() * 3)])
                .replace('{event}', ['Fed meeting', 'NFP release', 'GDP data', 'CPI inflation'][Math.floor(Math.random() * 4)])
                .replace('{pattern}', ['head and shoulders', 'double top', 'triangle', 'flag'][Math.floor(Math.random() * 4)])
                .replace('{session}', ['London', 'New York', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 4)])
                .replace('{feature}', ['spreads', 'execution', 'platform', 'regulation'][Math.floor(Math.random() * 4)])
                .replace('{software}', ['MetaTrader 4', 'MetaTrader 5', 'TradingView', 'cTrader'][Math.floor(Math.random() * 4)])
                .replace('{emotion}', ['fear', 'greed', 'FOMO', 'overconfidence'][Math.floor(Math.random() * 4)])
                .replace('{asset}', instruments[Math.floor(Math.random() * instruments.length)])
                .replace('{optionStrategy}', ['iron condor', 'butterfly', 'straddle', 'strangle'][Math.floor(Math.random() * 4)])
                .replace('{crypto}', ['Bitcoin', 'Ethereum', 'Cardano', 'Solana'][Math.floor(Math.random() * 4)]);
            
            const author = this.generateRandomAuthor();
            const timeAgo = this.generateRandomTime();
            const stats = this.generateRandomStats();
            
            topics.push({
                id: i + 1,
                title: title,
                category: category,
                author: author,
                timeAgo: timeAgo,
                replies: stats.replies,
                views: stats.views,
                likes: stats.likes,
                content: this.generateTopicContent(title, category),
                tags: this.generateTags(category, title)
            });
        }
        
        return topics;
    }
    
    generateBlogArticles() {
        const categories = [
            'Market Analysis', 'Trading Strategies', 'Technical Analysis', 'Fundamental Analysis',
            'Trading Psychology', 'Risk Management', 'Forex News', 'Crypto Analysis',
            'Stock Market', 'Economic Events', 'Trading Education', 'Platform Reviews'
        ];
        
        const titleTemplates = [
            '5 Essential {indicator} Strategies for {market} Trading',
            'How to Trade {instrument}: Complete Guide for {level}',
            '{timeframe} {strategy} Strategy: Proven Results',
            'Market Update: {instrument} Technical Analysis',
            'Why {concept} is Crucial for Trading Success',
            'Breaking: {event} Impact on {market} Markets',
            '{indicator} vs {indicator2}: Which is Better?',
            'Weekly Forecast: {instrument} Price Prediction',
            'Top 10 {category} Tips for {year}',
            'Risk Management: Protecting Your {asset} Trades',
            '{platform} Review: Pros, Cons, and Features',
            'Economic Calendar: {event} Trading Opportunities',
            'Psychology: Mastering {emotion} in Trading',
            'Beginner\'s Guide to {tradingType} Trading',
            'Advanced {technique} Techniques for Profits'
        ];
        
        const articles = [];
        
        for (let i = 0; i < 300; i++) {
            const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            
            let title = template
                .replace('{indicator}', ['RSI', 'MACD', 'Moving Average', 'Bollinger Bands'][Math.floor(Math.random() * 4)])
                .replace('{indicator2}', ['Stochastic', 'CCI', 'Williams %R', 'ADX'][Math.floor(Math.random() * 4)])
                .replace('{market}', ['Forex', 'Stock', 'Crypto', 'Commodity'][Math.floor(Math.random() * 4)])
                .replace('{instrument}', ['EUR/USD', 'Bitcoin', 'AAPL', 'Gold'][Math.floor(Math.random() * 4)])
                .replace('{level}', ['Beginners', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)])
                .replace('{timeframe}', ['Scalping', 'Day Trading', 'Swing Trading'][Math.floor(Math.random() * 3)])
                .replace('{strategy}', ['Breakout', 'Reversal', 'Trend Following'][Math.floor(Math.random() * 3)])
                .replace('{concept}', ['Risk Management', 'Position Sizing', 'Psychology'][Math.floor(Math.random() * 3)])
                .replace('{event}', ['Fed Meeting', 'NFP', 'GDP Release'][Math.floor(Math.random() * 3)])
                .replace('{category}', ['Forex', 'Stock', 'Crypto'][Math.floor(Math.random() * 3)])
                .replace('{year}', '2024')
                .replace('{asset}', ['Forex', 'Stock', 'Crypto'][Math.floor(Math.random() * 3)])
                .replace('{platform}', ['MetaTrader', 'TradingView', 'cTrader'][Math.floor(Math.random() * 3)])
                .replace('{emotion}', ['Fear', 'Greed', 'FOMO'][Math.floor(Math.random() * 3)])
                .replace('{tradingType}', ['Forex', 'Options', 'Futures'][Math.floor(Math.random() * 3)])
                .replace('{technique}', ['Technical Analysis', 'Price Action', 'Volume Analysis'][Math.floor(Math.random() * 3)]);
            
            const author = this.generateRandomAuthor();
            const date = this.generateRandomDate();
            const stats = this.generateRandomStats();
            
            articles.push({
                id: i + 1,
                title: title,
                category: category,
                author: author,
                date: date,
                views: stats.views,
                comments: stats.replies,
                readTime: Math.floor(Math.random() * 15) + 3 + ' min read',
                excerpt: this.generateArticleExcerpt(title),
                content: this.generateArticleContent(title, category),
                tags: this.generateTags(category, title)
            });
        }
        
        return articles;
    }
    
    generateCourseContent() {
        const courseTemplates = [
            {
                title: 'Complete Forex Trading Masterclass',
                category: 'Forex',
                level: 'Beginner to Advanced',
                duration: '25 hours',
                lessons: 45,
                description: 'Master forex trading from basics to advanced strategies'
            },
            {
                title: 'Technical Analysis Professional Course',
                category: 'Technical Analysis',
                level: 'Intermediate',
                duration: '18 hours',
                lessons: 32,
                description: 'Learn professional technical analysis techniques'
            },
            {
                title: 'Cryptocurrency Trading Strategies',
                category: 'Cryptocurrency',
                level: 'Intermediate',
                duration: '12 hours',
                lessons: 24,
                description: 'Master crypto trading with proven strategies'
            },
            {
                title: 'Options Trading Mastery',
                category: 'Options',
                level: 'Advanced',
                duration: '20 hours',
                lessons: 38,
                description: 'Advanced options strategies and risk management'
            },
            {
                title: 'Day Trading Bootcamp',
                category: 'Day Trading',
                level: 'Intermediate',
                duration: '15 hours',
                lessons: 28,
                description: 'Intensive day trading course with live examples'
            }
        ];
        
        const courses = [];
        
        courseTemplates.forEach((template, index) => {
            const course = {
                ...template,
                id: index + 1,
                instructor: this.generateRandomAuthor(),
                rating: (4.5 + Math.random() * 0.5).toFixed(1),
                students: Math.floor(Math.random() * 10000) + 1000,
                lastUpdated: this.generateRandomDate(),
                curriculum: this.generateCourseCurriculum(template.title, template.lessons)
            };
            courses.push(course);
        });
        
        return courses;
    }
    
    generateCourseCurriculum(courseTitle, lessonCount) {
        const lessonTemplates = [
            'Introduction to {topic}',
            'Understanding {concept}',
            'How to use {tool}',
            'Advanced {technique}',
            'Practical {application}',
            'Case Study: {example}',
            'Common Mistakes in {area}',
            'Best Practices for {skill}',
            'Live Trading {session}',
            'Q&A and Review'
        ];
        
        const curriculum = [];
        const modulesCount = Math.ceil(lessonCount / 8);
        
        for (let m = 1; m <= modulesCount; m++) {
            const module = {
                title: `Module ${m}`,
                lessons: []
            };
            
            const lessonsInModule = Math.min(8, lessonCount - (m - 1) * 8);
            
            for (let l = 1; l <= lessonsInModule; l++) {
                const template = lessonTemplates[Math.floor(Math.random() * lessonTemplates.length)];
                const lesson = {
                    title: template.replace('{topic}', courseTitle.split(' ')[0])
                                 .replace('{concept}', 'market analysis')
                                 .replace('{tool}', 'indicators')
                                 .replace('{technique}', 'strategies')
                                 .replace('{application}', 'examples')
                                 .replace('{example}', 'EUR/USD trade')
                                 .replace('{area}', 'trading')
                                 .replace('{skill}', 'risk management')
                                 .replace('{session}', 'session'),
                    duration: Math.floor(Math.random() * 30) + 10 + ' minutes',
                    type: ['video', 'article', 'quiz'][Math.floor(Math.random() * 3)]
                };
                module.lessons.push(lesson);
            }
            
            curriculum.push(module);
        }
        
        return curriculum;
    }
    
    generateRandomAuthor() {
        const firstNames = [
            'John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'Robert', 'Jennifer',
            'William', 'Jessica', 'James', 'Ashley', 'Christopher', 'Amanda', 'Daniel',
            'Melissa', 'Matthew', 'Deborah', 'Anthony', 'Dorothy', 'Mark', 'Lisa'
        ];
        
        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
            'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
            'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
        ];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return `${firstName} ${lastName}`;
    }
    
    generateRandomTime() {
        const times = [
            '5 minutes ago', '15 minutes ago', '30 minutes ago', '1 hour ago',
            '2 hours ago', '4 hours ago', '8 hours ago', '12 hours ago',
            '1 day ago', '2 days ago', '3 days ago', '1 week ago',
            '2 weeks ago', '3 weeks ago', '1 month ago'
        ];
        
        return times[Math.floor(Math.random() * times.length)];
    }
    
    generateRandomDate() {
        const start = new Date(2024, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    generateRandomStats() {
        return {
            views: Math.floor(Math.random() * 50000) + 100,
            replies: Math.floor(Math.random() * 200) + 1,
            likes: Math.floor(Math.random() * 500) + 5
        };
    }
    
    generateTopicContent(title, category) {
        const contentTemplates = [
            "I've been analyzing this setup and wanted to share my thoughts with the community. The technical indicators are showing some interesting signals that could be worth discussing.",
            "Has anyone else noticed this pattern forming? I'm seeing some potential opportunities but would love to get other perspectives before making any moves.",
            "After extensive backtesting, I've found some interesting results that might be valuable to share. The strategy seems to work well in certain market conditions.",
            "Looking for advice from more experienced traders. I'm still learning and could use some guidance on this particular situation.",
            "This week's market analysis is showing some fascinating developments. Here's my breakdown of the key levels and potential scenarios.",
            "I've been using this approach for several months now and wanted to share the results. The performance has been quite encouraging so far."
        ];
        
        const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
        return template + " What are your thoughts on this? Any feedback would be greatly appreciated!";
    }
    
    generateArticleExcerpt(title) {
        const excerpts = [
            "In this comprehensive guide, we'll explore the essential strategies and techniques that professional traders use to achieve consistent results in today's markets.",
            "Market volatility presents both opportunities and challenges for traders. Understanding how to navigate these conditions is crucial for long-term success.",
            "Technical analysis forms the backbone of many successful trading strategies. Learn how to identify key patterns and signals that can improve your trading performance.",
            "Risk management is perhaps the most important aspect of trading that many beginners overlook. Discover the techniques that can protect your capital.",
            "Economic events can create significant market movements. Stay ahead of the curve by understanding how to trade around major announcements."
        ];
        
        return excerpts[Math.floor(Math.random() * excerpts.length)];
    }
    
    generateArticleContent(title, category) {
        return `
            <h2>Introduction</h2>
            <p>Welcome to this comprehensive analysis of ${title.toLowerCase()}. In today's dynamic trading environment, understanding the nuances of ${category.toLowerCase()} is more important than ever.</p>
            
            <h2>Key Points</h2>
            <ul>
                <li>Market structure and trend analysis</li>
                <li>Entry and exit strategies</li>
                <li>Risk management techniques</li>
                <li>Psychology and discipline</li>
            </ul>
            
            <h2>Detailed Analysis</h2>
            <p>The current market conditions present unique opportunities for skilled traders. By applying the principles discussed in this article, you can improve your trading performance and achieve more consistent results.</p>
            
            <h2>Conclusion</h2>
            <p>Success in trading requires a combination of technical knowledge, proper risk management, and psychological discipline. Continue to educate yourself and practice these concepts to achieve your trading goals.</p>
        `;
    }
    
    generateTags(category, title) {
        const allTags = [
            'forex', 'stocks', 'crypto', 'technical-analysis', 'fundamental-analysis',
            'day-trading', 'swing-trading', 'scalping', 'risk-management', 'psychology',
            'indicators', 'patterns', 'support-resistance', 'trends', 'breakouts',
            'reversals', 'momentum', 'volatility', 'volume', 'news-trading'
        ];
        
        // Select 3-5 relevant tags
        const numTags = Math.floor(Math.random() * 3) + 3;
        const selectedTags = [];
        
        for (let i = 0; i < numTags; i++) {
            const tag = allTags[Math.floor(Math.random() * allTags.length)];
            if (!selectedTags.includes(tag)) {
                selectedTags.push(tag);
            }
        }
        
        return selectedTags;
    }
    
    generateTradingStrategies() {
        // Generate comprehensive trading strategies
        return [
            {
                name: 'Moving Average Crossover',
                type: 'Trend Following',
                timeframe: 'Daily',
                winRate: '68%',
                riskReward: '1:2.5',
                description: 'Classic strategy using MA crossovers'
            },
            {
                name: 'RSI Divergence',
                type: 'Reversal',
                timeframe: '4H',
                winRate: '72%',
                riskReward: '1:3',
                description: 'Identifies potential reversals using RSI'
            }
            // Add more strategies...
        ];
    }
    
    generateMarketAnalysis() {
        // Generate market analysis reports
        return [
            {
                title: 'Weekly Market Outlook',
                date: new Date().toLocaleDateString(),
                summary: 'Major indices showing bullish momentum',
                keyLevels: ['SPY 450', 'QQQ 380', 'IWM 220'],
                outlook: 'Bullish'
            }
            // Add more analysis...
        ];
    }
    
    // Method to get forum topics by category
    getForumTopicsByCategory(category, limit = 20) {
        if (category === 'all') {
            return this.forumTopics.slice(0, limit);
        }
        return this.forumTopics.filter(topic => 
            topic.category.toLowerCase() === category.toLowerCase()
        ).slice(0, limit);
    }
    
    // Method to get blog articles by category
    getBlogArticlesByCategory(category, limit = 10) {
        if (category === 'all') {
            return this.blogArticles.slice(0, limit);
        }
        return this.blogArticles.filter(article => 
            article.category.toLowerCase() === category.toLowerCase()
        ).slice(0, limit);
    }
    
    // Search functionality
    searchContent(query, type = 'all') {
        const searchTerm = query.toLowerCase();
        let results = [];
        
        if (type === 'all' || type === 'forum') {
            const forumResults = this.forumTopics.filter(topic =>
                topic.title.toLowerCase().includes(searchTerm) ||
                topic.content.toLowerCase().includes(searchTerm) ||
                topic.tags.some(tag => tag.includes(searchTerm))
            );
            results = results.concat(forumResults.map(r => ({ ...r, type: 'forum' })));
        }
        
        if (type === 'all' || type === 'blog') {
            const blogResults = this.blogArticles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.includes(searchTerm))
            );
            results = results.concat(blogResults.map(r => ({ ...r, type: 'blog' })));
        }
        
        return results;
    }
}

// Global content generator instance
const contentGenerator = new ContentGenerator();

// Make it available globally
window.contentGenerator = contentGenerator;

