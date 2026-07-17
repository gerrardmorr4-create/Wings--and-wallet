/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TravelPreferences {
  originHub: string;
  destinationCountry: string;
  interests: string[]; // e.g. "baggage-hacks", "flash-sales", "student-promos"
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferences: TravelPreferences;
}

const STORAGE_KEY = 'diaspora_newsletter_subscribers';

// Pre-populate with some realistic mock subscribers for high-quality mock data context
const DEFAULT_SUBSCRIBERS: Subscriber[] = [
  {
    id: 'sub-1',
    email: 'kwame.mensah@london.edu',
    name: 'Kwame',
    subscribedAt: '2026-05-12T10:30:00.000Z',
    status: 'active',
    preferences: {
      originHub: 'London Heathrow (LHR)',
      destinationCountry: 'Ghana',
      interests: ['baggage-hacks', 'student-promos']
    }
  },
  {
    id: 'sub-2',
    email: 'fatoumata.diallo@sorbonne.fr',
    name: 'Fatoumata',
    subscribedAt: '2026-06-20T14:15:00.000Z',
    status: 'active',
    preferences: {
      originHub: 'Paris Charles de Gaulle (CDG)',
      destinationCountry: 'Senegal',
      interests: ['flash-sales', 'baggage-hacks']
    }
  },
  {
    id: 'sub-3',
    email: 'chioma.eze@oxford.ac.uk',
    name: 'Chioma',
    subscribedAt: '2026-07-01T08:45:00.000Z',
    status: 'active',
    preferences: {
      originHub: 'London Gatwick (LGW)',
      destinationCountry: 'Nigeria',
      interests: ['flash-sales', 'student-promos']
    }
  }
];

function getStoredSubscribers(): Subscriber[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBSCRIBERS));
      return DEFAULT_SUBSCRIBERS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers from localStorage', error);
    return DEFAULT_SUBSCRIBERS;
  }
}

function saveStoredSubscribers(subscribers: Subscriber[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
  } catch (error) {
    console.error('Error saving subscribers to localStorage', error);
  }
}

export const newsletterBackend = {
  /**
   * Register a new subscriber or update an existing one if they were unsubscribed
   */
  subscribe: async (
    email: string,
    name?: string,
    preferences?: Partial<TravelPreferences>
  ): Promise<{ success: boolean; message: string; subscriber?: Subscriber }> => {
    // Simulate real network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please provide a valid email address.' };
    }

    const subs = getStoredSubscribers();
    const existingIndex = subs.findIndex((s) => s.email === cleanEmail);

    const defaultPrefs: TravelPreferences = {
      originHub: preferences?.originHub || 'Any European Hub',
      destinationCountry: preferences?.destinationCountry || 'Any African Country',
      interests: preferences?.interests || ['flash-sales', 'baggage-hacks']
    };

    if (existingIndex !== -1) {
      const existing = subs[existingIndex];
      if (existing.status === 'active') {
        return {
          success: false,
          message: 'This email is already registered for monthly diaspora flight deal updates.'
        };
      } else {
        // Reactivate subscriber
        existing.status = 'active';
        existing.name = name || existing.name;
        existing.preferences = defaultPrefs;
        existing.subscribedAt = new Date().toISOString();
        subs[existingIndex] = existing;
        saveStoredSubscribers(subs);
        return {
          success: true,
          message: 'Welcome back! Your diaspora newsletter subscription has been reactivated successfully.',
          subscriber: existing
        };
      }
    }

    // Create brand new subscriber
    const newSubscriber: Subscriber = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: cleanEmail,
      name: name?.trim() || undefined,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      preferences: defaultPrefs
    };

    subs.push(newSubscriber);
    saveStoredSubscribers(subs);

    return {
      success: true,
      message: 'Subscription successful! You have been added to our monthly flight deal tracker.',
      subscriber: newSubscriber
    };
  },

  /**
   * Retrieve all subscribers (useful for internal verification, state monitoring, etc.)
   */
  getSubscribers: (): Subscriber[] => {
    return getStoredSubscribers();
  },

  /**
   * Unsubscribe an email from updates
   */
  unsubscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanEmail = email.trim().toLowerCase();
    const subs = getStoredSubscribers();
    const idx = subs.findIndex((s) => s.email === cleanEmail);

    if (idx === -1) {
      return { success: false, message: 'Subscriber email not found.' };
    }

    if (subs[idx].status === 'unsubscribed') {
      return { success: true, message: 'You have already unsubscribed from these alerts.' };
    }

    subs[idx].status = 'unsubscribed';
    saveStoredSubscribers(subs);

    return {
      success: true,
      message: 'You have been successfully unsubscribed from diaspora flight deal updates.'
    };
  }
};
