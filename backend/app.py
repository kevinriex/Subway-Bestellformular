import time
from urllib import request, parse
from flask import Flask, request as fr
import json
import asyncio

app = Flask(__name__)

async def async_get_data():
    await asyncio.sleep(1)
    return "Done!"

@app.route("/data")
async def get_data():
    data = await async_get_data()
    return data

@app.route("/time")
def get_current_time():
    return {"time": time.time()}

@app.route("/asctime")
def get_current_asctime():
    return {"time": time.asctime()}

@app.route("/send", methods = ['POST'])
async def send_signal():
    content_type = fr.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = fr.get_json()
        print(f"\n\ndatapre: {data}\n\n")
        data = json.dumps(data)
        data = data.encode("utf-8")
        print(f"\n\ndataaft: {data}\n\n")
        req = request.Request("https://signal.kyrtech.net/v2/send", data=data, method="POST")
        resp = await request.urlopen(req)
        print(resp.read())
        return 200
    else:
        return 'Content-Type not supported!', 500
    
@app.route("/pdf", methods = ["POST"])
def pdf():
    if (fr.headers.get('Content-Type') == 'application/json'):
        data = fr.get_json()
        w = open(f"data/{data['timestamp']}.json", "w")
        bestellung = data["message"]
        strb = str(bestellung).replace("'",'"')
        strb = strb.replace("True","true")
        strb = strb.replace("False","false")
        w.write(strb)
        w.close()
        print(strb)
        return "Erfolgreich bestellt!"