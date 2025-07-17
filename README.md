# 🚀 CryptoNow

**A modern cryptocurrency trading platform with real-time price feeds, advanced trading charts, portfolio tracking, and market analysis.**

## 📋 Project Overview

- **Type**: WEBAPP (Cryptocurrency Trading Platform)
- **Tech Stack**: Next.js 15, React 18, TypeScript, shadcn/ui, Tailwind CSS, TradingView Charts, Framer Motion, TanStack Query, Zustand, CoinGecko API
- **Status**: PLANNING
- **Priority**: HIGH
- **Live URL**: https://cryptonow.com
- **Repository**: https://github.com/hardik88t/cryptonow

## 🎯 What This Project Does

CryptoNow is a professional cryptocurrency trading platform that provides real-time market data, advanced trading charts, and comprehensive portfolio management tools. It features a modern trading interface with TradingView-style charts, live price feeds for 9M+ cryptocurrencies, and professional-grade market analysis tools designed for crypto traders, investors, and portfolio managers.

## ✨ Key Features

- [x] **Real-Time Market Data**: Live cryptocurrency prices via CoinGecko API with smart caching and 30-second update intervals
- [ ] **Professional Trading Charts**: TradingView-style candlestick charts with technical indicators (RSI, MACD, Moving Averages)
- [ ] **Portfolio Management**: Asset allocation tracking, P&L analysis, and diversification insights
- [ ] **Advanced Market Analysis**: Trending cryptocurrencies, market sentiment indicators, and comprehensive market data
- [ ] **Multi-Platform Trading Interface**: Responsive design optimized for desktop, tablet, and mobile trading
- [ ] **Real-Time Portfolio Tracking**: Live portfolio value calculations and performance metrics
- [ ] **News & Analysis Hub**: Crypto news feed, market analysis, and educational content

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - Latest LTS version recommended
- **npm/yarn/pnpm** - Package manager
- **CoinGecko API Key** - For cryptocurrency data (free tier: 10,000 calls/month)
- **PostgreSQL Database** (Optional) - For user data and portfolio tracking

### Installation
```bash
# Clone the repository
git clone https://github.com/hardik88t/cryptonow.git
cd cryptonow

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your values:
# COINGECKO_API_KEY=your_api_key_here
# DATABASE_URL=postgresql://user:password@localhost:5432/cryptonow (optional)

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Usage
1. **Dashboard**: View real-time market overview and portfolio summary
2. **Trading**: Access professional trading interface with advanced charts
3. **Markets**: Browse comprehensive cryptocurrency market data
4. **Portfolio**: Track your investments and analyze performance
5. **News**: Stay updated with latest crypto news and market analysis

## 🏗️ Architecture

### Platform Structure (7 Main Sections)
1. **Dashboard** (`/`) - Real-time market overview, portfolio summary, and quick actions
2. **Trading** (`/trading`) - Advanced trading interface with professional charts and order simulation
3. **Markets** (`/markets`) - Comprehensive market data for 9M+ cryptocurrencies with advanced filtering
4. **Portfolio** (`/portfolio`) - Portfolio tracking, P&L analysis, and performance metrics
5. **Wallet** (`/wallet`) - Wallet management interface mockup with transaction history
6. **News & Analysis** (`/news`) - Crypto news feed, market analysis, and educational content
7. **Settings** (`/settings`) - User preferences, notifications, and security settings

### Technical Architecture
- **Frontend**: Next.js 15 with App Router, React 18, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS for consistent design
- **Charts**: TradingView-style charts with technical indicators
- **State Management**: Zustand for lightweight state management
- **Data Fetching**: TanStack Query for API data management and caching
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **API Integration**: CoinGecko API with smart caching and rate limit management

## 🧪 Testing

```bash
# Run unit tests
npm run test
# or
yarn test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate test coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t cryptonow .

# Run container
docker run -p 3000:3000 cryptonow
```

### Environment Variables for Production
```bash
COINGECKO_API_KEY=your_production_api_key
DATABASE_URL=your_production_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 Development Documentation

For development workflow, coding practices, and project management integration, see:
- **[DEV.md](./DEV.md)** - Development guide and project manager integration
- **[PLAN.md](./PLAN.md)** - Project planning and feature tracking
- **[DEVLOG.md](./DEVLOG.md)** - Detailed development progress log
