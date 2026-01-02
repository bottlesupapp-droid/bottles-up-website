# Mailchimp Setup Guide

This guide will walk you through setting up Mailchimp for your email collection feature.

## 🚀 Quick Start

1. **Create a Mailchimp Account**
   - Go to [mailchimp.com](https://mailchimp.com)
   - Sign up for a free account
   - Complete the account verification process

## 📧 Setting Up Your Audience (Email List)

1. **Create an Audience**
   - In your Mailchimp dashboard, click "Audience" in the top menu
   - Click "Create Audience" or "Manage Audience" > "Create Audience"
   - Fill in the required details:
     - **Audience name**: "Bottles Up Waitlist" (or your preferred name)
     - **Default from email**: Your business email
     - **Default subject**: Your default email subject
     - **Description**: "Email list for Bottles Up website waitlist"

2. **Get Your List ID**
   - Go to Audience > Settings > Audience name and defaults
   - Your **Audience ID** will be displayed (something like "a1b2c3d4e5")
   - Copy this ID - you'll need it for `MAILCHIMP_LIST_ID`

## 🔑 Getting Your API Key

1. **Generate API Key**
   - Click your profile icon in the top right
   - Go to "Account & Billing"
   - Click "Extras" > "API keys"
   - Click "Create A Key"
   - Give it a name like "Bottles Up Website"
   - Copy the generated API key (starts with your server prefix, e.g., "abc123def-us1")

2. **Find Your Server Prefix**
   - Look at your Mailchimp dashboard URL
   - Example: if URL is `https://us1.admin.mailchimp.com/`, your prefix is `us1`
   - Or look at the first part of your API key before the dash

## ⚙️ Environment Configuration

1. **Create Environment File**
   ```bash
   # Copy the example file
   cp env.example .env
   ```

2. **Update Your .env File**
   ```env
   MAILCHIMP_API_KEY=your_actual_api_key_here
   MAILCHIMP_SERVER_PREFIX=us1
   MAILCHIMP_LIST_ID=your_actual_list_id_here
   PORT=3001
   ```

## 🏃‍♂️ Running the Application

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Both Frontend and Backend**
   ```bash
   npm run dev:full
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend  
   npm run server
   ```

3. **Test the Integration**
   - Open your website at `http://localhost:5173`
   - Scroll to the email collection section
   - Try subscribing with a test email
   - Check your Mailchimp audience to see if the email was added

## 🔍 Troubleshooting

### Common Issues:

1. **"Demo Mode" Message**
   - This means the backend server isn't running or Mailchimp isn't configured
   - Make sure you've created the `.env` file with correct values
   - Restart the server after updating environment variables

2. **CORS Errors**
   - Make sure both frontend (port 5173) and backend (port 3001) are running
   - Check that the backend URL in `EmailCollection.tsx` matches your server

3. **"Member Exists" Error**
   - This is normal - it means the email is already subscribed
   - The app handles this gracefully and shows a success message

4. **Invalid API Key**
   - Double-check your API key in the .env file
   - Make sure there are no extra spaces or quotes
   - Verify the server prefix matches your account

## 📊 Mailchimp Features You Can Use

### Audience Management
- View all subscribers in your Mailchimp dashboard
- Export subscriber lists
- Create segments based on signup date, source, etc.

### Email Campaigns
- Send welcome emails to new subscribers
- Create announcement campaigns for your app launch
- Set up automated email sequences

### Analytics
- Track signup rates
- Monitor email engagement
- View audience growth over time

## 🔒 Security Best Practices

1. **Never Commit .env Files**
   - The `.env` file is gitignored by default
   - Never share your API keys publicly

2. **Use Environment Variables in Production**
   - Set environment variables directly in your hosting platform
   - Popular platforms: Vercel, Netlify, Heroku all support env vars

3. **Rotate API Keys Regularly**
   - Generate new API keys periodically
   - Delete old unused keys in Mailchimp dashboard

## 🚀 Production Deployment

### Frontend (Vite App)
Deploy to any static hosting service:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop your build folder or connect GitHub
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Backend (Express Server)
Deploy to any Node.js hosting service:
- **Railway**: Simple deployment with automatic HTTPS
- **Heroku**: Classic platform with easy scaling
- **DigitalOcean App Platform**: Affordable with great performance
- **Vercel**: Also supports serverless functions

### Environment Variables in Production
Make sure to set these in your hosting platform:
```
MAILCHIMP_API_KEY=your_production_api_key
MAILCHIMP_SERVER_PREFIX=your_server_prefix
MAILCHIMP_LIST_ID=your_list_id
```

## 📞 Support

If you need help:
1. Check the Mailchimp documentation at [mailchimp.com/developer/](https://mailchimp.com/developer/)
2. Review the error messages in your browser console
3. Check the server logs for detailed error information

Happy collecting emails! 🎉