// ===========================================
// OPENROUTER AI SERVICE
// ===========================================

import { DataRow } from '@/types';

interface AIResponse {
  success: boolean;
  data?: DataRow[];
  error?: string;
}

export async function callAIModel(
  model: string,
  prompt: string,
  dataContext: DataRow[]
): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'OpenRouter API key not configured' };
  }

  // Truncate data for context to avoid token limits
  const dataSnippet = JSON.stringify(dataContext.slice(0, 20));

  const systemPrompt = `You are a specialized Data Cleaning Assistant.
The user will give you a JSON snippet of a dataset and a transformation instruction.
You must output ONLY valid JSON representing the transformed data for these rows.
Do not include markdown formatting, explanations, or code blocks. Just the JSON array.

Current Dataset Schema: ${Object.keys(dataContext[0] || {}).filter(k => k !== 'id').join(', ')}

Important rules:
1. Preserve the 'id' field in each row
2. Only modify fields that are relevant to the instruction
3. Return the same number of rows as provided
4. Ensure all data types remain consistent`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'CleanData AI',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Data: ${dataSnippet}\n\nInstruction: ${prompt}` },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return {
        success: false,
        error: err.error?.message || 'Failed to fetch from AI provider'
      };
    }

    const json = await response.json();
    const content = json.choices[0].message.content;

    // Attempt to parse the AI response
    try {
      const cleanContent = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      const parsedData = JSON.parse(cleanContent);
      return { success: true, data: parsedData };
    } catch {
      console.error('AI Parse Error', content);
      return {
        success: false,
        error: 'AI returned invalid JSON. Try a simpler prompt.'
      };
    }
  } catch (error) {
    console.error('AI Request Error', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Validate if user can use a specific model based on their plan
export function canUseModel(modelId: string, userPlan: 'standard' | 'pro'): boolean {
  const proOnlyModels = [
    'openai/gpt-4',
    'openai/gpt-4-turbo',
    'anthropic/claude-3-opus',
    'anthropic/claude-3-sonnet',
  ];

  if (userPlan === 'pro') {
    return true;
  }

  return !proOnlyModels.includes(modelId);
}
