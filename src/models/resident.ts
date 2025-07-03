// -----------------------------
// Resident data interface
// โครงสร้างข้อมูลผู้อยู่อาศัย (interface)
// -----------------------------

export interface Resident {
  id: number;           // Resident ID (รหัสผู้อยู่อาศัย)
  name: string;         // Name (ชื่อ)
  house_number: string; // House number (บ้านเลขที่)
}
