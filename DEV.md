# Development Guide

## 📋 Overview

This guide covers:
- **Project Manager Integration** - How to connect and interact with the central project management system
- **General Coding Practices** - Universal best practices for all projects
- **Documentation Maintenance** - How to keep DEV.md, PLAN.md, and DEVLOG.md updated

**⚠️ Important**: Update this DEV.md file regularly as your project evolves. Add project-specific practices, tools, and workflows that are unique to your tech stack.

## 🔗 Project Manager Integration

### Database Schema (Key Tables)

**Projects Table:**
```sql
- id (UUID, primary key)
- name (string, required)
- type (WEBAPP/WEBSITE/CLI/API/MOBILE/DESKTOP/etc.)
- status (PLANNING/ACTIVE/COMPLETED/ON_HOLD/ARCHIVED)
- priority (LOW/MEDIUM/HIGH/URGENT)
- briefDescription (text)
- detailedDescription (text, optional)
- liveUrl, githubUrl, localPath (strings, optional)
- techStack, tags (JSON arrays as strings)
- createdAt, updatedAt (timestamps)
```

**ProjectItem Table:**
```sql
- id (UUID, primary key)
- projectId (UUID, foreign key)
- name (string, required)
- description (text, optional)
- type (FEATURE/BUG/IMPROVEMENT/TASK/RESEARCH/DOCUMENTATION)
- status (TODO/IN_PROGRESS/COMPLETED/BLOCKED/CANCELLED)
- priority (LOW/MEDIUM/HIGH/URGENT)
- labels (JSON array as string)
- createdAt, updatedAt (timestamps)
```

### Connection Setup

**Local Development:**
```bash
# Set environment variable
export PROJECT_MANAGER_DB="file:../project-manager/prisma/dev.db"
# Or relative to your project location
export PROJECT_MANAGER_DB="file:/path/to/project-manager/prisma/dev.db"
```

**Production:**
```bash
# For hosted database
export PROJECT_MANAGER_DB="postgresql://user:pass@host:port/db"
# Or MySQL
export PROJECT_MANAGER_DB="mysql://user:pass@host:port/db"
```

### Common Operations

**Query Your Project's Tasks:**
```bash
# Get all tasks for your project
sqlite3 $PROJECT_MANAGER_DB "
  SELECT pi.name, pi.type, pi.status, pi.priority, pi.description 
  FROM ProjectItem pi 
  JOIN Project p ON pi.projectId = p.id 
  WHERE p.name = 'YOUR_PROJECT_NAME' 
  ORDER BY pi.priority DESC, pi.createdAt ASC;
"

# Get high-priority TODO items
sqlite3 $PROJECT_MANAGER_DB "
  SELECT pi.name, pi.description, pi.priority 
  FROM ProjectItem pi 
  JOIN Project p ON pi.projectId = p.id 
  WHERE p.name = 'YOUR_PROJECT_NAME' 
  AND pi.priority IN ('HIGH', 'URGENT') 
  AND pi.status = 'TODO';
"
```

**Update Task Status:**
```bash
# Mark task as completed
sqlite3 $PROJECT_MANAGER_DB "
  UPDATE ProjectItem 
  SET status='COMPLETED', updatedAt=datetime('now') 
  WHERE name='TASK_NAME' 
  AND projectId=(SELECT id FROM Project WHERE name='YOUR_PROJECT_NAME');
"

# Mark task as in progress
sqlite3 $PROJECT_MANAGER_DB "
  UPDATE ProjectItem 
  SET status='IN_PROGRESS', updatedAt=datetime('now') 
  WHERE name='TASK_NAME' 
  AND projectId=(SELECT id FROM Project WHERE name='YOUR_PROJECT_NAME');
"
```

**Add New Tasks:**
```bash
# Add a new feature
sqlite3 $PROJECT_MANAGER_DB "
  INSERT INTO ProjectItem (id, projectId, name, description, type, status, priority, labels, createdAt, updatedAt)
  VALUES (
    lower(hex(randomblob(16))),
    (SELECT id FROM Project WHERE name='YOUR_PROJECT_NAME'),
    'New Feature Name',
    'Feature description',
    'FEATURE',
    'TODO',
    'MEDIUM',
    '[]',
    datetime('now'),
    datetime('now')
  );
"
```

### MCP Server Integration (Future)

When the Project Manager MCP server is available, you'll be able to use AI tools directly:
- AI assistants can query your project tasks
- Automatic status updates when you complete work
- Better integration with development workflow

## 🛠️ General Coding Practices

### Git Workflow
- **Commit regularly** - Don't let changes pile up
- **Use conventional commits** - `feat:`, `fix:`, `docs:`, `refactor:`, etc.
- **Write meaningful commit messages** - Explain what and why, not just what
- **Create branches for features** - Don't work directly on main
- **Tag releases** - Use semantic versioning (v1.0.0, v1.1.0, etc.)

```bash
# Good commit examples
git commit -m "feat: add user authentication with JWT"
git commit -m "fix: resolve database connection timeout issue"
git commit -m "docs: update API documentation for new endpoints"
```

### Security Best Practices
- **Never commit secrets** - Use .env files for sensitive data
- **Add .env to .gitignore** - But include .env.example
- **Use environment variables** - For API keys, database URLs, etc.
- **Validate all inputs** - Sanitize user data
- **Keep dependencies updated** - Regular security updates
- **Use HTTPS everywhere** - Especially in production

```bash
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
```

### Code Quality
- **Use linting tools** - ESLint, Prettier, etc.
- **Write tests** - Unit tests, integration tests
- **Document your code** - Comments for complex logic
- **Follow naming conventions** - Consistent and descriptive names
- **Keep functions small** - Single responsibility principle
- **Handle errors properly** - Don't ignore exceptions

### Versioning & Releases
- **Use semantic versioning** - MAJOR.MINOR.PATCH
- **Tag releases in git** - `git tag v1.0.0`
- **Maintain a CHANGELOG** - Document what changed
- **Test before releasing** - Don't break production
- **Backup before major changes** - Safety first

### Documentation Standards
- **Keep README.md current** - Update as features change
- **Document API endpoints** - If you have an API
- **Include setup instructions** - For new developers
- **Add troubleshooting section** - Common issues and solutions

## 📝 Documentation Maintenance

### When to Update DEV.md
- **Add new tools or dependencies** - Document setup and usage
- **Change development workflow** - Update processes
- **Add project-specific practices** - Customize for your tech stack
- **Discover new best practices** - Share knowledge

### When to Update PLAN.md
- **Add new features** - Document what you plan to build
- **Change priorities** - Update what's important
- **Complete milestones** - Mark progress
- **Discover new requirements** - Add to backlog

### When to Update DEVLOG.md
- **Complete significant work** - Document what was done
- **Make important decisions** - Record reasoning
- **Solve difficult problems** - Share solutions
- **Learn something new** - Document insights

## 🎯 CryptoNow Project-Specific Practices

### Next.js 15 + TypeScript Best Practices
```typescript
// Use TypeScript for all components and utilities
interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
}

// Follow Next.js App Router conventions
// app/
//   ├── (dashboard)/
//   │   ├── page.tsx
//   │   └── layout.tsx
//   ├── trading/
//   │   └── page.tsx
//   ├── markets/
//   │   └── page.tsx
//   └── api/
//       └── crypto/
//           └── route.ts

// Use shadcn/ui components consistently
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

### CoinGecko API Integration Guidelines
```typescript
// Rate Limiting Best Practices (10,000 calls/month = 333/day)
const CACHE_DURATION = {
  POPULAR_COINS: 60, // 1 minute for top coins
  MARKET_DATA: 120,  // 2 minutes for market overview
  DETAILED_DATA: 300, // 5 minutes for individual coin data
  NEWS_DATA: 900     // 15 minutes for news
}

// Batch requests when possible
const fetchMultipleCoins = async (coinIds: string[]) => {
  const batchSize = 250; // CoinGecko limit
  const batches = chunk(coinIds, batchSize);
  // Process batches with proper error handling
}

// Always handle rate limits gracefully
const apiCall = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.status === 429) {
      // Use cached data or show loading state
      return getCachedData(url);
    }
    return response.json();
  } catch (error) {
    // Fallback to cached data
    return getCachedData(url);
  }
}
```

### Development Environment Setup
```bash
# Required Node.js version
node --version  # Should be 18.17.0 or higher

# Environment variables needed
COINGECKO_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/cryptonow
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Development server commands
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database commands (if using Prisma)
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

### Trading Platform UI/UX Guidelines
```typescript
// Color scheme for trading interface
const TRADING_COLORS = {
  profit: '#00ff88',    // Green for gains
  loss: '#ff4757',      // Red for losses
  neutral: '#747d8c',   // Gray for neutral
  background: '#1a1a1a', // Dark background
  surface: '#2d3436',   // Card backgrounds
  accent: '#00cec9'     // Accent color
}

// Price formatting standards
const formatPrice = (price: number, currency = 'USD') => {
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 100) return price.toFixed(2);
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });
}

// Percentage change display
const formatPercentage = (change: number) => {
  const formatted = Math.abs(change).toFixed(2);
  const sign = change >= 0 ? '+' : '-';
  return `${sign}${formatted}%`;
}
```

### Security Best Practices for Crypto Platform
```typescript
// Never store private keys or sensitive data
// Use environment variables for all API keys
// Implement proper input validation
const validateCoinId = (id: string): boolean => {
  return /^[a-z0-9-]+$/.test(id) && id.length <= 50;
}

// Rate limiting for API endpoints
import { Ratelimit } from "@upstash/ratelimit";
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

// Sanitize user inputs
import DOMPurify from 'dompurify';
const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input);
}
```

### Testing Strategy
```bash
# Unit testing with Jest and React Testing Library
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report

# E2E testing with Playwright
npm run test:e2e              # Run E2E tests
npm run test:e2e:ui           # Run with UI

# Component testing
npm run test:components       # Test UI components

# API testing
npm run test:api             # Test API endpoints

# Performance testing
npm run lighthouse           # Lighthouse audit
npm run test:performance     # Performance tests
```

### Deployment Process
```bash
# Build process
npm run build                # Next.js build
npm run export              # Static export (if needed)

# Environment setup for production
COINGECKO_API_KEY=prod_key
DATABASE_URL=production_db_url
NEXTAUTH_SECRET=production_secret
NEXTAUTH_URL=https://cryptonow.com

# Vercel deployment (recommended)
vercel --prod

# Docker deployment
docker build -t cryptonow .
docker run -p 3000:3000 cryptonow

# Monitoring setup
# - Vercel Analytics for performance
# - Sentry for error tracking
# - Uptime monitoring for API endpoints
# - CoinGecko API usage monitoring
```

---

**Remember**: This DEV.md file should evolve with your project. Keep it updated and relevant to your current development practices!
