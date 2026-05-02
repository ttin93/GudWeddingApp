import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const PROMPTS = {
  message: (input: string, tone: string) =>
    `Write an elegant, heartfelt personal message for a wedding invitation.
Details about the couple: ${input}
Tone: ${tone}
Requirements: Under 80 words, romantic but not cheesy, first-person plural ("We", "Our"), no clichés like "journey" or "fairy tale".
Output: Just the message text, no quotes, no explanation.`,

  schedule: (input: string) =>
    `Format this wedding day schedule as a clean JSON array.
Input: ${input}
Each item must have: { "time": "HH:MM", "title": "Event name", "description": "1 short sentence", "emoji": "relevant emoji" }
Output: Only valid JSON array, no markdown, no explanation.`,

  dresscode: (input: string) =>
    `Write an elegant dress code description for a wedding invitation.
Input: ${input}
Requirements: 1-2 sentences, graceful tone, helpful but not commanding.
Output: Just the description text, no quotes, no explanation.`,
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { type, input, tone = 'warm and romantic' } = await req.json()

    if (!type || !input) {
      return NextResponse.json({ error: 'type and input are required' }, { status: 400 })
    }

    const promptFn = PROMPTS[type as keyof typeof PROMPTS]
    if (!promptFn) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const prompt = type === 'message'
      ? (PROMPTS.message as (i: string, t: string) => string)(input, tone)
      : (PROMPTS[type as 'schedule' | 'dresscode'] as (i: string) => string)(input)

    const client = new Anthropic()
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const result = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse schedule JSON if needed
    if (type === 'schedule') {
      try {
        const parsed = JSON.parse(result)
        return NextResponse.json({ result: parsed })
      } catch {
        return NextResponse.json({ error: 'Could not parse schedule' }, { status: 500 })
      }
    }

    return NextResponse.json({ result })
  } catch (err) {
    console.error('AI generate error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
