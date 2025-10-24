# routes/post.py
from flask import Blueprint, request, jsonify, session
from services.openai_client import generate_text
from services.threads_client import post_text_to_threads
from models.history import History
from models.account import Account
from models import db


post_bp = Blueprint("post", __name__)


@post_bp.route("/api/post_to_threads", methods=["POST"])
def post_to_threads_api():


if "user" not in session:
return jsonify({"success": False, "message": "ログインが必要です"}), 403


data = request.get_json() or {}
prompt = data.get("prompt", "")
model = data.get("model", "gpt-4o-mini")
temperature = float(data.get("temperature", 0.7))
max_tokens = int(data.get("max_tokens", 80))
account_id = data.get("account_id")  # どのアカウントへ投稿するか


if not prompt:
return jsonify({"success": False, "message": "prompt が空です"}), 400


# 1) ChatGPTで生成
text = generate_text(model=model, prompt=prompt,
                     temperature=temperature, max_tokens=max_tokens)


# 2) 対象アカウントのtoken, user_id取得
acc = Account.query.get(account_id) if account_id else Account.query.first()
if not acc:
return jsonify({"success": False, "message": "投稿先アカウントがありません"}), 400


# 3) Threads 投稿（create→publish）
post_result = post_text_to_threads(
    text=text, user_id=acc.user_id, access_token=acc.access_token)


# 4) 履歴保存
hist = History(username=session["user"], topic=prompt,
               text=text, thread_id=post_result.get("thread_id"))
db.session.add(hist)
db.session.commit()


return jsonify({
    "success": True,
    "text": text,
    "thread_id": post_result.get("thread_id"),
    "creation_id": post_result.get("creation_id"),
})
