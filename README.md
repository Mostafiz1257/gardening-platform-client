# Gardening Tips & Advice Platform - Frontend

## Project Overview
The Gardening Tips & Advice Platform is designed for gardening enthusiasts and professionals to share, discover, and engage with gardening tips and techniques. The frontend is built with **Next.js**, **TypeScript**, and other modern technologies, providing a seamless, interactive user experience.

### Features
- User authentication and profile management
- Post creation and editing with a rich text editor
- Upvote/downvote system for posts
- Commenting and following functionality
- Premium content access through payment integration (Aamarpay/Stripe)
- Dynamic news feed with infinite scroll and search/filter functionality
- Admin dashboard to manage users, posts, payments, and community moderation

### Tech Stack
- **Next.js**: Framework for React-based frontends
- **TypeScript**: For type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React Query/Redux**: State management and data fetching
- **Stripe API**: Payment integration for premium content
- **Froala/Quill/Draft.js/Slate**: Rich text editor for posts
- **React Router**: Routing within the application
- **React Icons**: Icons for enhanced visuals

---

## Getting Started

### Prerequisites
Ensure that you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/gardening-platform-frontend.git
    cd gardening-platform-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root of the project and add your environment variables:

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    NEXT_PUBLIC_STRIPE_KEY=your-stripe-public-key
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
