// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// export async function openDatabase() {
//   return open({
//     filename: './VisitorManagements',
//     driver: sqlite3.Database,
//   });
// }

// src\util\db.jsx
import sqlite from 'better-sqlite3';

export function openDatabase() {
  const db = sqlite('./VisitorManagements');
  return db;
}