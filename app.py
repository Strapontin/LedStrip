from flask import Flask, render_template, redirect
from threading import Timer

app = Flask(__name__)

@app.route('/')
def index():
    return redirect("/led")
	
@app.route('/led')
def led():
	return render_template('led.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

def functionAppeleeEnJSPourLancerLeTimerDExtinctionDesLeds():
	t = Timer(15 * 60, ledStripeTimeout)
	t.start()
	
def cancelExtinction():
	t.cancel() # A tester, peut ne pas fonctionner si t n'est pas dans la même fonction
	
def ledStripeTimeout():
	# stop the leds
	