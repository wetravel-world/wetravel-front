import api from './useApi'

interface TranslateResponse {
  translated_text: string
  detected_source_language: string
  target: string
}

// Proxies through the backend so the Google Translate API key never reaches the
// browser — same server-side-credential pattern as affiliate links.
export async function translateText(text: string, target: string): Promise<string> {
  const { data } = await api.post<TranslateResponse>('/translate/', { text, target })
  return data.translated_text
}
