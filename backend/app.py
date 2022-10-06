import time
from urllib import request, parse
from flask import Flask, request as fr
import json

app = Flask(__name__)

@app.route("/time")
def get_current_time():
    return {"time": time.time()}

@app.route("/asctime")
def get_current_asctime():
    return {"time": time.asctime()}

@app.route("/send", methods = ['POST'])
def send_signal():
    content_type = fr.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = fr.get_json()
        print(f"\n\ndatapre: {data}\n\n")
        data = json.dumps(data)
        data = data.encode("utf-8")
        print(f"\n\ndataaft: {data}\n\n")
        req = request.Request("https://signal.kyrtech.net/v2/send", data=data, method="POST")
        resp = request.urlopen(req)
        print(resp.read())
        return 200
    else:
        return 'Content-Type not supported!', 500
    
@app.route("/pdf", methods = ["POST"])
def pdf():
    if (fr.headers.get('Content-Type') == 'application/json'):
        data = fr.get_json()
        w = open(f"data/{data['timestamp']}.txt", "w")
        w.write(data["message"])
        w.close()
        print(str(data["message"]))
        return str(data["message"])