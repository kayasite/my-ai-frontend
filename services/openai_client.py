# services/openai_client.py
import os
from openai import OpenAI


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# フロントのパラメータをそのまま使って生成


def generate_text(model: str, prompt: str, temperature: float = 0.7, max_tokens: int = 80) -> str:
resp = client.chat.completions.create(
model=model,
messages=[{"role": "user", "content": prompt}],
temperature=temperature,
max_completion_tokens=max_tokens,
)
return (resp.choices[0].message.content or "").strip()