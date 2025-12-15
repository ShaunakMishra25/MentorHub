import { pool } from "../../../lib/db";
import { comparePassword, signToken } from "../../../lib/auth";

export async function POST(req: Request) {
  const {email,password } =await req.json();

  const result=await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount===0) {
    return Response.json({ error:"Invalid credentials"},{status: 401});
  }

  const user=result.rows[0];
  const valid=await comparePassword(password,user.password);

  if (!valid){
    return Response.json({error:"Invalid credentials"},{status:401});
  }
  const token=signToken({id:user.id,role:user.role});

  return Response.json({token,user:{id:user.id,name:user.name,role:user.role}});
}
