// ===========================================
// AI TRANSFORM API ROUTE
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callAIModel, canUseModel } from '@/lib/openrouter';
import { DataRow } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { prompt, model, data } = await request.json() as {
      prompt: string;
      model: string;
      data: DataRow[];
    };

    if (!prompt || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt and data' },
        { status: 400 }
      );
    }

    // Check user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    const userPlan = (subscription?.plan_id as 'standard' | 'pro') || 'standard';

    // Verify model access
    if (!canUseModel(model, userPlan)) {
      return NextResponse.json(
        { error: 'This model requires a Pro subscription' },
        { status: 403 }
      );
    }

    // Call AI model
    const result = await callAIModel(model, prompt, data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Update usage tracking
    await supabase
      .from('usage_records')
      .upsert({
        user_id: user.id,
        rows_processed: data.length,
        ai_calls_made: 1,
        period_start: new Date().toISOString(),
        period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('AI Transform Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
