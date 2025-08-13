import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mailchimp configuration
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

// Subscribe to Mailchimp
app.post('/api/mailchimp/subscribe', async (req, res) => {
  try {
    const { email, firstName = '', lastName = '' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
      console.log('Mailchimp configuration missing, simulating success...');
      return res.status(200).json({ 
        success: true, 
        message: 'Email added to waitlist (demo mode)',
        email 
      });
    }

    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
    
    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Handle existing subscriber
      if (responseData.title === 'Member Exists') {
        return res.status(200).json({ 
          success: true, 
          message: 'You are already subscribed!' 
        });
      }
      
      console.error('Mailchimp error:', responseData);
      return res.status(400).json({ 
        error: responseData.detail || 'Failed to subscribe' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to waitlist!' 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Mailchimp integration: ${MAILCHIMP_API_KEY ? 'Configured' : 'Demo mode'}`);
}); 