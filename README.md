Commerce-New
Overview

Commerce-New is a modern e-commerce web application built with Next.js 16, TypeScript, and Convex for real-time backend functionality. It allows users to browse products, manage a shopping cart, proceed through checkout, and receive order confirmation emails. The application features a fully responsive design, optimized for both desktop and mobile devices.

Features

Product Pages: View individual products with detailed descriptions and images.

Shopping Cart: Add, remove, and update quantities for products.

Checkout: Secure checkout process with email notifications.

Order Confirmation: Displays order summary after successful checkout.

Responsive Design: Works seamlessly on mobile, tablet, and desktop.

Convex Integration: Real-time backend operations for cart and orders.

TypeScript & Aliases: Strongly typed codebase with clear module aliases for easy imports.

Tech Stack

Frontend: Next.js 16, React 18, Tailwind CSS

Backend: Convex serverless functions

Languages: TypeScript, JavaScript

Version Control: Git & GitHub

Deployment: Vercel

Project Structure
src/
├─ app/                  # Pages and routes
├─ components/           # Reusable UI components
├─ context/              # React contexts (e.g., CartContext)
├─ api/                  # API utilities
convex/
├─ _generated/           # Convex generated bindings
├─ orders.ts             # Convex functions for order management
public/
├─ images/               # Static images for products

Getting Started
Prerequisites

Node.js >= 20

npm >= 9

Installation
git clone https://github.com/ogooluwa-cn/stage--3project.git
cd commerce-new
npm install
npx convex codegen

Running Locally
npm run dev


The application will run at http://localhost:3000.

Building for Production
npm run build
npm run start

Deployment

This project is deployed on Vercel. The latest production build includes:

Optimized static pages

Server-rendered dynamic routes (API and checkout pages)

Convex serverless functions for real-time operations

Contributing

Fork the repository

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Open a Pull Request
