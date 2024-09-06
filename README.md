# RB Guides

## Overview

RB Guides is a simple and efficient guide service provider application, built using modern web development technologies. The platform allows users to book a guide for a day, and guides can manage their booking requests through an intuitive dashboard. The application also features a role-based authentication system, protecting all private routes and APIs.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Database:** [Supabase](https://supabase.io/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Component Library:** [Shadcn](https://shadcn.dev/)
- **Authentication:** [NextAuth v5](https://next-auth.js.org/)
- **File Uploads:** [UploadThing](https://uploadthing.com/)

## Features

- **Guide Booking System:**

  - Users can book a guide for a specified date.
  - Guides can view booking requests in their dashboard.
  - Guides have the ability to accept or decline booking requests.

- **Admin Dashboard:**

  - Admins can manage guide applications.
  - Admins can accept or reject applications to onboard guides.

- **Role-Based Authentication:**

  - Integrated with NextAuth v5 for robust, secure authentication.
  - Role-based access ensures guides and admins have different levels of permissions.
  - All private routes and API endpoints are fully protected based on user roles.

- **Image Uploads:**
  - Guides can upload their profile pictures using the UploadThing service.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rb-guides.git
   cd rb-guides
   ```

2. Install Dependencies

   ```bash
   npm i
   ```

3. Setup Environment variables . Checkout the .env.example file.
4. Run database migrations to set up your database schema.
   ```bash
   npx prisma migrate dev
   ```
5. Run the application

   ```bash
   npm run dev
   ```
