import { Resident } from '../models/resident';

export interface IResidentsService {
  getAll(): Promise<Resident[]>;
  create(data: Omit<Resident, 'id'>): Promise<Resident>;
  update(id: number, data: Omit<Resident, 'id'>): Promise<Resident | null>;
  delete(id: number): Promise<Resident | null>;
}
