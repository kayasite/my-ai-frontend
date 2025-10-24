# services/threads_client.py
import os
import requests


PROXY_URL = os.getenv("PROXY_URL") # 例: http://user:pass@host:port


session = requests.Session()
if PROXY_URL:
session.proxies.update({"http": PROXY_URL, "https": PROXY_URL})
session.trust_env = False


THREADS_DEFAULT_USER_ID = os.getenv("THREADS_USER_ID")
THREADS_DEFAULT_TOKEN = os.getenv("THREADS_ACCESS_TOKEN")




def post_text_to_threads(*, text: str, user_id: str = None, access_token: str = None):
user_id = user_id or THREADS_DEFAULT_USER_ID
token = access_token or THREADS_DEFAULT_TOKEN


if not (user_id and token):
raise RuntimeError("ThreadsのUSER_ID/ACCESS_TOKENが未設定です")


# 1) 下書き作成
create_url = f"https://graph.threads.net/v1.0/{user_id}/threads"
payload = {"text": text, "media_type": "TEXT", "access_token": token}
r = session.post(create_url, data=payload, timeout=20)
r.raise_for_status()
creation_id = r.json().get("id")


# 2) 公開
publish_url = f"https://graph.threads.net/v1.0/{user_id}/threads_publish"
r2 = session.post(publish_url, data={"creation_id": creation_id, "access_token": token}, timeout=20)
r2.raise_for_status()


return {"creation_id": creation_id, "thread_id": r2.json().get("id")}