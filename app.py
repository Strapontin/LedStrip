from flask import Flask, render_template, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return redirect("/led")
	
@app.route('/led')
def led():
	return render_template('led.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
