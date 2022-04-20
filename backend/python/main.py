from flask import Flask, make_response, jsonify
import mysql.connector

app = Flask(__name__)
app.debug = False
app.testing = False

@app.route('/')
def site():
    return jsonify(hello='world') # Returns HTTP Response with {"hello": "world"}

@app.route('/api/data/getItem', methods=['GET'])
def apiDataGetItem():
    mydb = mysql.connector.connect(
    host="192.168.1.103",
    user="dbuser",
    password="dbpass",
    database="fxratedb"
    )
    mycursor = mydb.cursor()
    mycursor.execute("select time,open,high,low,close from fxusdcad limit 1000")
    myresult = mycursor.fetchall()
    rows = []
    for x in myresult:
        # print(x)
        row = {'Time':x[0], 'Open':x[1], 'High':x[2], 'Low':x[3], 'Close':x[4] }
        rows.append(row)

    mycursor.close()
    result = {'Error':0,'Message':'ok','Data':rows}
    response = make_response( jsonify(result) )
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Content-Type'] = 'application/json'
    return response    

if __name__ == '__main__':
    app.run(host='192.168.1.103', port=8080, debug=True)
