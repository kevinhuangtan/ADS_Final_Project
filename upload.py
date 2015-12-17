import json,httplib,urllib
import os



PARSE_APP_ID = "p5I9NyojKedE07IADm4FjywrHKBWorN7H3zMfcjC"
PARSE_REST_API_KEY = "9lnS6G72fyFJ72Nm6ThDz2o9Y7CuOY9FtityL8Wh"

def print_json(result):
    print json.dumps(result, indent=4, sort_keys=True)


def retrieve_all():
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('GET', '/1/classes/Item', '', {
           "X-Parse-Application-Id": PARSE_APP_ID,
           "X-Parse-REST-API-Key": PARSE_REST_API_KEY
         })
    result = json.loads(connection.getresponse().read())
    return result

def delete_object(objectId):
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('DELETE', '/1/classes/Item/'+objectId, '', {
           "X-Parse-Application-Id": PARSE_APP_ID,
           "X-Parse-REST-API-Key": PARSE_REST_API_KEY
         })
    result = json.loads(connection.getresponse().read())
    return result

def delete_brand(brand):
    z = retrieve_brand(brand)
    results = z['results']
    for res in results:
        delete_object(res['objectId'])


def retrieve_brand(brand):
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    params = urllib.urlencode({"where":json.dumps({
           "brand": brand,
         })})
    connection.connect()
    connection.request('GET', '/1/classes/Item?%s' % params, '', {
           "X-Parse-Application-Id": PARSE_APP_ID,
           "X-Parse-REST-API-Key": PARSE_REST_API_KEY
         })
    result = json.loads(connection.getresponse().read())
    return result


def create_item(brand, image):
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('POST', '/1/files/'+brand+'.jpg', open(image, 'rb').read(), {
           "X-Parse-Application-Id":  PARSE_APP_ID,
           "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
           "Content-Type": "image/jpeg"
         })
    new_file = json.loads(connection.getresponse().read())
    return new_file

    connection.request('POST', '/1/classes/Item', json.dumps({
           "brand": brand,
           "image": {
             "name": new_file['name'],
                "url" : new_file['url'],
             "__type": "File"
           }
         }), {
           "X-Parse-Application-Id": PARSE_APP_ID,
           "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
           "Content-Type": "application/json"
         })
    result = json.loads(connection.getresponse().read())

def add_images(brand):
    folder = './designers/'+brand+'/'
    for filename in os.listdir(folder):
        print filename
        create_item(brand, folder + filename)
