import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { db } from '@/server/db';

type Data = {
    message?: string;
    name?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== "POST"){
        return res.status(405).json({message:"method not allowed"})
    }
  try {
    const {email, password} = await req.body;
    // validate inputs in backend
    if (!email || !password){
      return res.status(403).json({message:"Validation Error"})
    }
    // check if email already exist in database
    const existedUser = await db.user.findFirst({
      where :{
        email : email
      }
    })
    if (existedUser) {
      return res.status(403).json({message:"User already Exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await db.user.create({
      data : {
        email,
        password:hashedPassword
      }
    })
    return res.status(201).json({message:"User registered"})
  } catch (error) {
    res.status(500).json({message:"something went wrong"})
  }
}
