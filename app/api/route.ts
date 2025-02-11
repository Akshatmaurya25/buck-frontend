import { NextResponse } from 'next/server'
import runagent from '../../game/src/index'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received body:", body)
    const headers = Object.fromEntries(request.headers.entries()); 
  console.log("Request Headers:", headers.address);
    if (!body) {
      throw new Error("Request body is empty or undefined")
    }

    const response = await runagent(body, headers.address)
    console.log("Runagent response:", response)

    if (!response) {
      throw new Error("runagent returned undefined or null")
    }

    return NextResponse.json({
      message: 'Data added successfully',
      data: response,
      success: true
    })
  } catch (error) {
    console.error("API Error:", error) // Logs full error details
    return NextResponse.json(
      { error: 'Failed to add data', details: error },
      { status: 500 }
    )
  }
}
