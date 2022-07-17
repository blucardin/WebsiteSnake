import flask
import psycopg2
import os
#from dotenv import load_dotenv
import datetime


# load_dotenv()
#print(os.getenv('DATABASE_URL'))

# conn = psycopg2.connect(os.getenv('DATABASE_URL'))
conn = psycopg2.connect("postgresql://noah:FMAxEwUQmrJFUiirBa1izQ@free-tier11.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Doracle-digger-1430")
cur = conn.cursor()


app = flask.Flask(__name__)


@app.route('/game', methods=['POST', 'GET'])
def insert_data():
    if flask.request.method == "POST":
        print("message recived!")
        name = flask.request.form.get('name')
        score = flask.request.form.get('score')
        time = flask.request.form.get('time')
        print(name, score, time)
        cur.execute("INSERT INTO leaderboard (time, name, score) VALUES (%s, %s, %s)", (time, name, score))
        conn.commit()
        return flask.render_template('game.html')
    else: 
        return flask.render_template('game.html')

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    cur.execute("SELECT * FROM leaderboard ORDER BY score DESC")
    data = cur.fetchall()
    for x in range(0, len(data)):
        data[x] = list(data[x])
        print(data[x][2])
        data[x][2] = datetime.datetime.fromtimestamp(int(data[x][2])//1000).strftime('%Y-%m-%d %H:%M:%S')
    #convert the last element in each tuple to date format
    return flask.render_template('leaderboard.html', 
        data=data)


app.run(port = 8080, debug=True)