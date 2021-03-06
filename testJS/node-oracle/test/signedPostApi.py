import base64
import requests
import json
import time
import hmac
import hashlib
import random
import urllib.parse

API_ENDPOINT = "http://localhost:3000/api/bot/VerificaBusinessPost"
APP_ID = "f0dd6befc0874b13bafae1edc8b9cc51"
API_KEY = "953f4b42398b110D8446081E34832c6fcc3B2B7b0C841a0A96b46368b2D2Cbb2"
#data = {'codeBus':'81', 'idUser': 'UTECHATBOT', 'isAbil': False, 'cdCanale': '02001', 'cdGruppo': '02001', 'cdIstPropr': '00001'}
data = {'codeBus':'20', 'idUser': 'dirbe', 'isAbil': False, 'cdCanale': 'HTP', 'cdGruppo': '00001', 'cdIstPropr': '00001'}

def generate_str():
    random_uuid = ''
    random_seq = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    uuid_format = 32
    for i in range(0,uuid_format):
        random_uuid += str(random_seq[random.randint(0, len(random_seq) - 1)])
    return random_uuid

def get_ts_unix():
    return int(time.time())

dump_data = json.dumps(data)
hash_data = hashlib.md5(dump_data.encode()).hexdigest()
requestTimeStamp = str(get_ts_unix())
nonce = generate_str()
url_encoded = urllib.parse.quote(API_ENDPOINT, safe='').lower()
signatureData = "{}{}{}{}{}{}".format(APP_ID,"POST",url_encoded, requestTimeStamp, nonce,hash_data)
message = bytes(signatureData, 'utf-8')
secret = bytes(API_KEY, 'utf-8')
signatureBytes = hmac.new(secret, message, digestmod=hashlib.sha256).hexdigest()
amx_token = "amx " + "{0}:{1}:{2}:{3}".format(APP_ID, signatureBytes, nonce, requestTimeStamp)
headers = {'Content-type': 'application/json', 'Accept': 'text/plain', "Authorization": amx_token}
r = requests.post(API_ENDPOINT, data=json.dumps(data), headers=headers)
print("The response:%s"%r)
print("The response:%s"%r.text)
