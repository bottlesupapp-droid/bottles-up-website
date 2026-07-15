import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingCancel = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <XCircle className="mb-6 h-12 w-12 text-gray-500" />
      <h1 className="mb-4 text-3xl font-bold text-white">Checkout cancelled</h1>
      <p className="mb-8 max-w-md text-gray-400">
        No charge was made. You can pick up where you left off any time from the events section.
      </p>
      <Button asChild className="bg-gradient-orange text-black font-bold hover:opacity-90">
        <Link to="/#events">Back to Events</Link>
      </Button>
    </div>
  );
};

export default BookingCancel;
