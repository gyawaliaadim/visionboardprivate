import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET: Retrieve a user by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({message: "User retrieved successfully",user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to retrieve user" }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const validUser = await prisma.user.findUnique({
    where:{email}
  })
  if (validUser){
     return NextResponse.json({message: "Failed to create user. User already exists", validUser }, { status: 409 });
  }
  else{

      try {
          const user = await prisma.user.create({
      data: { email },
    });

    return NextResponse.json({message: "User created successfully", user }, { status: 201 });
} catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }
}
}

// PUT: Update an existing user
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // Filter out any undefined or null values to avoid overwriting with null
  const filteredData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value != null)
  );

  if (Object.keys(filteredData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: filteredData,
    });

    return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "User update failed" }, { status: 500 });
  }
}


// DELETE: Remove a user
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "User deletion failed" }, { status: 500 });
  }
}
