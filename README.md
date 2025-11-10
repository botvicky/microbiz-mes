# MicroBiz Monitor - Business Management Platform

A comprehensive business monitoring and evaluation platform designed for small businesses in developing markets.

## Features

### For Business Owners

- **Dashboard Analytics**: Real-time insights into revenue, expenses, and profitability
- **Transaction Management**: Track all income and expenses with detailed categorization
- **Inventory Management**: Monitor stock levels with automatic low-stock alerts
- **Digital Wallet**: Manage business finances with multiple payment methods
- **AI Assistant**: Get intelligent insights and recommendations based on your business data
- **Notifications**: Stay updated with alerts about transactions, inventory, and performance

### For Administrators

- **Platform Overview**: Monitor all registered businesses and platform metrics
- **Business Management**: View and manage all businesses on the platform
- **Comprehensive Reports**: Detailed analytics on platform performance and growth
- **Regional Insights**: Track business distribution and performance by region

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Type Safety**: TypeScript
- **State Management**: React Context API with SWR for data fetching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables (optional - works with mock data):
   \`\`\`
   # Database (Supabase/Neon)
   DATABASE_URL=your_database_url
   
   # AI Assistant (Groq/OpenAI)
   GROQ_API_KEY=your_api_key
   
   # Add other environment variables as needed
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

- **Business Owner**: Use any email (e.g., `john@example.com`)
- **Administrator**: Use `admin@microbiz.com`
- **Password**: Any password (demo mode)

## Project Structure

\`\`\`
/app
  /(auth)       - Authentication pages (login, register)
  /dashboard    - Business owner dashboard and features
  /admin        - Administrator dashboard and management
/components     - Reusable UI components
/lib            - Utilities, types, mock data, and business logic
/hooks          - Custom React hooks
\`\`\`

## Key Features Explained

### Dashboard
- Real-time KPI cards showing revenue, expenses, profit, and transactions
- Interactive charts for revenue vs expenses and expense categories
- Recent transactions list and inventory alerts

### Transactions
- Add, view, filter, and export transactions
- Categorization for income and expenses
- Multiple payment method support

### Wallet
- Digital wallet with balance tracking
- Deposit and withdrawal functionality
- Payment method configuration

### Inventory
- Track all inventory items with quantities and costs
- Automatic low-stock and critical stock alerts
- Supplier management

### AI Assistant
- Context-aware business insights
- Revenue and expense analysis
- Growth recommendations
- Inventory optimization suggestions

### Admin Dashboard
- Platform-wide statistics and growth metrics
- Business directory with search and filters
- Comprehensive reports with visualizations
- Regional performance analysis

## Production Considerations

### Database Integration
Replace mock data in `/lib/mock-data.ts` with actual database queries. Recommended options:
- **Supabase**: PostgreSQL with real-time subscriptions
- **Neon**: Serverless PostgreSQL
- **PlanetScale**: MySQL with branching

### Authentication
Implement proper authentication:
- JWT tokens with secure httpOnly cookies
- Session management with refresh tokens
- Role-based access control (RBAC)
- OAuth providers (Google, Microsoft, etc.)

### AI Integration
Connect to AI services:
- **Groq**: Fast inference for real-time insights
- **OpenAI**: Advanced language models
- **Anthropic Claude**: Context-aware assistance

### Security
- Implement rate limiting
- Add CSRF protection
- Enable CORS properly
- Sanitize user inputs
- Use environment variables for secrets
- Implement proper error handling

### Performance
- Enable caching with Redis
- Implement proper data pagination
- Optimize images and assets
- Use ISR (Incremental Static Regeneration) where applicable
- Add monitoring with Vercel Analytics

### Deployment
Ready to deploy on Vercel:
\`\`\`bash
vercel deploy
\`\`\`

Or build for production:
\`\`\`bash
npm run build
npm start
\`\`\`

## Environment Variables

\`\`\`env
# Required for production
DATABASE_URL=
AUTH_SECRET=
NEXTAUTH_URL=

# Optional - AI Features
GROQ_API_KEY=
OPENAI_API_KEY=

# Optional - Analytics
NEXT_PUBLIC_GA_ID=
\`\`\`

## Contributing

This is a production-ready template. Feel free to customize and extend it for your specific needs.

## License

MIT License - feel free to use this project for your business or as a template.

## Support

For issues or questions, please open an issue in the repository or contact support.
