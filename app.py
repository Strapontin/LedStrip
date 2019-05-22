	
# coding: utf-8

from flask import Flask, render_template, redirect, request
from threading import Timer
import serial

# On se connecte à l Arduino
try:
	ser = serial.Serial('/dev/ttyACM0', 9600)
except:
	print("impossible de se connecter au port série");
	
app = Flask(__name__)


@app.route('/')
def index():
    return redirect("/led")
	

@app.route('/led')
def led():
	return render_template('led.html')


@app.route('/rgbValue', methods=['POST'])
def rgbValue():
	data = '<' + request.form['rgbValue'] + ',>'
	ser.write(data.encode())
	#ser.write("<This is a very long string, 124, 19.89> ".encode())
	print(data)
	return data

@app.route('/setLuminosity', methods=['POST'])
def setLuminosity():
	data = '<setLuminosity:' + request.form['setLuminosity'] + '>'
	try:
		ser.write(data.encode())
	except:
		l = 1
	# print(data)
	return data



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

def functionAppeleeEnJSPourLancerLeTimerDExtinctionDesLeds():
	t = Timer(15 * 60, ledStripeTimeout)
	t.start()
	return
	
def cancelExtinction():
	t.cancel() # A tester, peut ne pas fonctionner si t n'est pas dans la même fonction
	return
	
def ledStripeTimeout():
	# stop the leds
	return
