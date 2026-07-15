/**
 * Firebase Cloud Function — Secure Gemini API Proxy
 *
 * This function runs entirely on the server.
 * The GEMINI_API_KEY is stored securely using Firebase Secret Manager
 * (set via: firebase functions:secrets:set GEMINI_API_KEY)
 * and is NEVER exposed to the frontend or client-side code.
 *
 * Only authenticated users (verified via Firebase Auth token) can call this function.
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const fetch = require('node-fetch');

// Reference the secret — value only available at runtime on the server
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * callGeminiApi — Callable Cloud Function
 *
 * Expects: { prompt: string }
 * Returns: { text: string }
 *
 * Authentication: Required. If the caller is not authenticated, the function
 * throws an UNAUTHENTICATED error.
 */
exports.callGeminiApi = onCall(
  { secrets: [GEMINI_API_KEY] },
  async (request) => {
    // 1. Verify the user is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'You must be logged in to use this feature.'
      );
    }

    const { prompt } = request.data;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new HttpsError('invalid-argument', 'A valid prompt is required.');
    }

    // 2. Retrieve the secret API key from the server environment
    const apiKey = GEMINI_API_KEY.value();

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message =
          errorData?.error?.message || 'Gemini API request failed.';
        console.error('Gemini API Error:', message);
        throw new HttpsError('internal', message);
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        return { text: data.candidates[0].content.parts[0].text };
      } else {
        throw new HttpsError('internal', 'No response returned from Gemini.');
      }
    } catch (error) {
      if (error instanceof HttpsError) throw error;
      console.error('Unexpected error in callGeminiApi:', error);
      throw new HttpsError('internal', 'An unexpected server error occurred.');
    }
  }
);
