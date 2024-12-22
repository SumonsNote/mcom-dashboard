# E-commerce Admin Panel

A comprehensive admin dashboard built with Next.js for managing e-commerce operations. This panel provides complete control over products, orders, users, and analytics with a modern, responsive interface.

![image](https://github.com/user-attachments/assets/8f9b7de2-01b8-43ef-949d-c0cd1606ea50)


## Features

### Product Management
- Create, update, and delete products
- Bulk product operations
- Image upload with drag-and-drop support
- Inventory tracking
- Category and subcategory management

### Order Management
- Real-time order tracking
- Order status updates
- Payment status monitoring
- Order history and details
- Export orders to CSV/Excel

### User Management
- Role-based access control
- Customer profiles
- Admin user management
- Activity logging
- Permission settings

### Analytics Dashboard
- Sales overview
- Revenue metrics
- Product performance
- Customer insights
- Inventory status

## Tech Stack

- **Frontend**: Next.js 13+, React, Tailwind CSS
- **State Management**: Redux
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- MongoDB database
- Cloudinary account for image storage

### Installation

1. Clone the repository
```bash
git clone https://github.com/Soab42/dash-ecom.git
cd ecommerce-admin
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── products/       # Product management
│   ├── orders/         # Order management
│   └── users/          # User management
├── components/
│   ├── ui/            # Reusable UI components
│   ├── forms/         # Form components
│   └── layouts/       # Layout components
├── lib/
│   ├── utils/         # Utility functions
│   └── db/            # Database configurations
└── public/            # Static files
```

## API Routes

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user role

## Deployment

The application can be deployed on Vercel with the following steps:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support, email support@yourdomain.com or raise an issue in the repository.
