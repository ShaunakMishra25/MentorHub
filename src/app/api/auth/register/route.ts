import {pool} from "../../../lib/db"
import { hashPassword } from "../../../lib/auth";

export async function POST(req: Request) {
  const { name, email, password, field, bio} = await req.json();

  const hashed = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, field, bio`,
    [name, email, hashed, field, bio]
  );

  return Response.json(result.rows[0], {status: 201});
}
