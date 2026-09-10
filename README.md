# Policy Adda

Your neighbourhood insurance & loan consultancy — built with Next.js, Supabase, and Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js 15 + TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Storage, RLS)
- **Deployment:** Vercel
- **Version Control:** GitHub

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Copy your project URL and keys to `.env.local`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Public pages
│   ├── auth/               # Login/Signup
│   ├── dashboard/          # Customer dashboard
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── landing/            # Landing page components
│   ├── layout/             # Nav, Footer
│   └── dashboard/          # Dashboard components
├── lib/
│   ├── supabase/           # Supabase client setup
│   └── utils.ts            # Utility functions
├── data/                   # Static data
└── types/                  # TypeScript types
```

## User Roles

- **Customer** — View policies, submit applications, manage documents
- **Executive** — Manage assigned customers and applications
- **Support** — Handle support tickets
- **Manager** — Oversee team and assignments
- **Admin** — Full system access

## License

Private — Policy Adda
