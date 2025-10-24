# routes/history.py
from flask import Blueprint, jsonify, session
from models.history import History


history_bp = Blueprint("history", __name__)


@history_bp.route("/api/history")
def get_history():


if "user" not in session:
return jsonify({"success": False, "message": "ログインが必要です"}), 403
rows = History.query.filter_by(username=session["user"]).order_by(
    History.id.desc()).limit(100).all()
data = [
    {
        "id": r.id,
        "topic": r.topic,
        "text": r.text,
        "thread_id": r.thread_id,
        "created_at": r.created_at.isoformat() if r.created_at else None,
    }
    for r in rows
]
return jsonify({"success": True, "data": data})
