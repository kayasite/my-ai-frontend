# routes/schedule.py
from services.scheduler import delete_job
from flask import Blueprint, request, jsonify
from services.scheduler import scheduler, add_daily_job, restore_jobs_from_db


schedule_bp = Blueprint("schedule", __name__)


@schedule_bp.route("/api/schedule_daily", methods=["POST"])
def schedule_daily():


data = request.get_json() or {}
topic = data.get("topic")  # フロントが自由にpromptを作る場合は"prompt"でもOK
hour = data.get("hour")
minute = data.get("minute")
account_id = data.get("account_id")


if not (topic and hour is not None and minute is not None):
return jsonify({"success": False, "message": "topic, hour, minute は必須"}), 400


job = add_daily_job(topic=str(topic), hour=int(
    hour), minute=int(minute), account_id=account_id)
return jsonify({"success": True, "job": job})


@schedule_bp.route("/api/schedules")
def list_schedules():


jobs = restore_jobs_from_db(list_only=True)
return jsonify({"success": True, "schedules": jobs})


@schedule_bp.route("/api/schedule_daily/<int:job_id>", methods=["DELETE"])
def delete_schedule(job_id):

    # services側でDB削除＆APScheduler解除
ok = delete_job(job_id)
return jsonify({"success": ok})


# 起動時復元用


def restore_jobs_on_start():


restore_jobs_from_db()
