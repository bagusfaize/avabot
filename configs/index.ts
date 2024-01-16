// export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const OPENAI_COMPLETION_API = 'https://api.openai.com/v1/chat/completions';

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`
    }
};