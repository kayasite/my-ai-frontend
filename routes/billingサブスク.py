# routes/billing.py
import os
import stripe
from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from models.user import User
from models import db


billing_bp = Blueprint("billing", __name__)


stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
PRICE_ID = os.getenv("STRIPE_PRICE_ID", "")


@billing_bp.route("/api/subscription_status")
def subscription_status():


    # 単純化：単一ユーザー運用想定。複数ユーザーはsession["user"]と紐付けて取得
user = User.query.filter_by(username="admin").first()
valid_until = user.subscription_valid_until if user else None
now = datetime.now(timezone.utc)
active = bool(valid_until and valid_until > now)
return jsonify({
    "active": active,
    "valid_until": valid_until.isoformat() if valid_until else None,
})


@billing_bp.route("/api/create_checkout_session", methods=["POST"])
def create_checkout_session():


domain = os.getenv("FRONTEND_DOMAIN", "http://localhost:5173")
try:
session = stripe.checkout.Session.create(
    mode="subscription",
    line_items=[{"price": PRICE_ID, "quantity": 1}],
    success_url=f"{domain}/billing/success",
    cancel_url=f"{domain}/billing/cancel",
    billing_address_collection="auto",
)
return jsonify({"url": session.url})
except Exception as e:
return jsonify({"error": str(e)}), 400


@billing_bp.route("/api/stripe_webhook", methods=["POST"])
def stripe_webhook():


payload = request.data
sig = request.headers.get("stripe-signature")
try:
event = stripe.Webhook.construct_event(payload, sig, WEBHOOK_SECRET)
except Exception as e:
return (str(e), 400)


if event["type"] in ("invoice.payment_succeeded", "checkout.session.completed"):
    # +30日延長
user = User.query.filter_by(username="admin").first()
if not user:
user = User(username="admin")
db.session.add(user)
now = datetime.now(timezone.utc)
base = user.subscription_valid_until if user.subscription_valid_until and user.subscription_valid_until > now else now
user.subscription_valid_until = base + timedelta(days=30)
db.session.commit()
return ("", 200)
