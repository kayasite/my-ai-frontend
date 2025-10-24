# routes/auth.py
from flask import Blueprint, request, jsonify, session


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/login", methods=["POST"])
def login():


data = request.get_json() or {}
username = data.get("username")
password = data.get("password")
# 簡易認証（必要ならDB認証に差し替え）
if username == "admin" and password == "MySecurePass2025!":
session["user"] = username
return jsonify({"success": True, "user": username})
return jsonify({"success": False, "message": "認証失敗"}), 401


@auth_bp.route("/api/logout", methods=["POST"])
def logout():


session.clear()
return jsonify({"success": True})


@auth_bp.route("/api/check_login")
def check_login():


if "user" in session:
return jsonify({"logged_in": True, "user": session["user"]})
return jsonify({"logged_in": False}), 401
