import { create } from 'zustand';

export type TicketStatus = 'waiting' | 'serving' | 'done' | 'cancelled';

export interface Ticket {
  id: string;
  number: string;
  studentName: string;
  studentId: string;
  deptCode: string;
  status: TicketStatus;
  timestamp: number;
}

interface QueueState {
  tickets: Ticket[];
  fetchTickets: () => Promise<void>;
  addTicket: (deptCode: string, studentName: string, studentId: string) => Promise<Ticket>;
  markAsDone: (ticketId: string) => Promise<void>;
  serveNext: (deptCode: string) => Promise<void>;
  getQueueByDept: (deptCode: string) => Ticket[];
  getServingByDept: (deptCode: string) => Ticket | undefined;
}

export const useQueueStore = create<QueueState>((set, get) => ({
  tickets: [],

  fetchTickets: async () => {
    try {
      const response = await fetch('/api/queue');
      const data = await response.json();
      set({ tickets: data });
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  },

  addTicket: async (deptCode, studentName, studentId) => {
    try {
      const response = await fetch('/api/queue/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deptCode, studentName, studentId }),
      });
      const newTicket = await response.json();
      set(state => ({ tickets: [...state.tickets, newTicket] }));
      return newTicket;
    } catch (error) {
      console.error('Failed to add ticket:', error);
      throw error;
    }
  },

  markAsDone: async (ticketId) => {
    try {
      const response = await fetch('/api/queue/done', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });
      const data = await response.json();
      if (data.success) {
        set({ tickets: data.tickets });
      }
    } catch (error) {
      console.error('Failed to mark as done:', error);
    }
  },

  serveNext: async (deptCode) => {
    try {
      const response = await fetch('/api/queue/serve-next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deptCode }),
      });
      const data = await response.json();
      if (data.success) {
        set({ tickets: data.tickets });
      }
    } catch (error) {
      console.error('Failed to serve next:', error);
    }
  },

  getQueueByDept: (deptCode) => {
    return get().tickets.filter(t => t.deptCode === deptCode && t.status === 'waiting');
  },

  getServingByDept: (deptCode) => {
    return get().tickets.find(t => t.deptCode === deptCode && t.status === 'serving');
  }
}));

// Initialize polling
if (typeof window !== 'undefined') {
  setInterval(() => {
    useQueueStore.getState().fetchTickets();
  }, 3000);
}
