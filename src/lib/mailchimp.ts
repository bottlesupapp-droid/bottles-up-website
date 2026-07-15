// Mailchimp integration utility
// Note: In production, this should be handled by a backend server for security

interface SubscribeEmailProps {
  email: string;
  firstName?: string;
  lastName?: string;
}

export const subscribeToMailchimp = async ({ email, firstName, lastName }: SubscribeEmailProps) => {
  try {
    // For development/demo purposes, we'll simulate the API call
    // In production, you should never expose API keys in frontend code
    
    // This is where you would call your backend API that handles Mailchimp
    const response = await fetch('/api/mailchimp/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    return await response.json();
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    throw error;
  }
};

// Alternative: Direct Mailchimp integration (for backend use only)
export const mailchimpConfig = {
  // These should be environment variables in production
  apiKey: process.env.VITE_MAILCHIMP_API_KEY || '', // Your Mailchimp API key
  serverPrefix: process.env.VITE_MAILCHIMP_SERVER_PREFIX || '', // e.g., 'us1', 'us2', etc.
  listId: process.env.VITE_MAILCHIMP_LIST_ID || '', // Your audience/list ID
};

// Example Mailchimp API call (backend only)
export const addSubscriberToList = async (email: string) => {
  const { apiKey, serverPrefix, listId } = mailchimpConfig;
  
  if (!apiKey || !serverPrefix || !listId) {
    throw new Error('Mailchimp configuration is incomplete');
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
  
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: '',
      LNAME: '',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to subscribe to Mailchimp');
  }

  return await response.json();
}; 