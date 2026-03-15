import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { firstName, email, phone } = await request.json()

    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'firstName and email are required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('leads').upsert(
      { first_name: firstName, email, phone: phone || null },
      { onConflict: 'email' }
    )

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
