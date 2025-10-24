# routes/accounts.py
from flask import Blueprint, request, jsonify, session
from models.account import Account
from models import db


accounts_bp = Blueprint("accounts", __name__)


@accounts_bp.route("/api/accounts/list")
def list_accounts():


if "user" not in session:
return jsonify({"success": False, "message": "未ログイン"}), 403
accs = Account.query.order_by(Account.id.asc()).all()
data = [{"id": a.id, "name": a.name, "user_id": a.user_id} for a in accs]
return jsonify({"success": True, "accounts": data})


@accounts_bp.route("/api/accounts/add", methods=["POST"])
def add_account():


if "user" not in session:
return jsonify({"success": False, "message": "未ログイン"}), 403
data = request.get_json() or {}
name = data.get("name")
user_id = data.get("user_id")
token = data.get("access_token")
if not (name and user_id and token):
return jsonify({"success": False, "message": "name/user_id/access_token は必須"}), 400
acc = Account(name=name, user_id=user_id, access_token=token)
db.session.add(acc)
db.session.commit()
return jsonify({"success": True, "account": {"id": acc.id, "name": acc.name}})


@accounts_bp.route("/api/accounts/delete/<int:acc_id>", methods=["DELETE"])
def delete_account(acc_id):


if "user" not in session:
return jsonify({"success": False, "message": "未ログイン"}), 403
acc = Account.query.get(acc_id)
if not acc:
return jsonify({"success": False, "message": "not found"}), 404
db.session.delete(acc)
db.session.commit()
return jsonify({"success": True})
