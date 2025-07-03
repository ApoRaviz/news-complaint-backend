import { pool } from '../models/db';
import { Resident } from '../models/resident';

export class ResidentsService {
  static async getAll(): Promise<Resident[]> {
    const result = await pool.query('SELECT * FROM residents');
    return result.rows;
  }

  static async create(data: Omit<Resident, 'id'>): Promise<Resident> {
    const result = await pool.query(
      'INSERT INTO residents (name, house_number) VALUES ($1, $2) RETURNING *',
      [data.name, data.house_number]
    );
    return result.rows[0];
  }

  static async update(id: number, data: Omit<Resident, 'id'>): Promise<Resident | null> {
    const result = await pool.query(
      'UPDATE residents SET name = $1, house_number = $2 WHERE id = $3 RETURNING *',
      [data.name, data.house_number, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<Resident | null> {
    const result = await pool.query('DELETE FROM residents WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }
}
