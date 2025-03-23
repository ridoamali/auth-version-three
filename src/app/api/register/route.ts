import { registerUser } from "@/lib/auth-service";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validation = registerSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid registration data", issues: validation.error.issues },
        { status: 400 }
      );
    }
    
    const user = await registerUser(validation.data);
    
    return NextResponse.json(
      { 
        message: "User registered successfully", 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        } 
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}