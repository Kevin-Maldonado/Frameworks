export type Status = 'PENDING' | 'ACCEPTED' | 'CANCELLED';
export interface Mentorship {
  id: number;
  scheduleAt: string;
  status: Status;
  notes?: string;
  studentId: number;
  mentorId: number;
  categoryId: number;
  isActive: boolean;
}
