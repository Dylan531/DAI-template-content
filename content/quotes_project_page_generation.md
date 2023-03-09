Title: Quotes Project Page Generation
Date: 2016-01-14 0:00
Tags: python, projects
Category: Python Development
Slug: quotes-project-pagegen
Authors: Dylan

&emsp;&emsp;This is the other half to complement the parsing of the quotes file itself in the previous article. After that text is fed through the series of regex expression to turn it into properly parsed parsed, the only thing to do is associate it with the correct person. This is nice in painless in Python. We define a function to check which name it is, and then return the key portion of the keypair using that name.
	
&emsp;&emsp;The key itself is simply a text color and a background image, and the page itself is served through Apache's cgi-bin. Every refresh returns a new quote.

	:::python
	import storage
	import random

	reference = {
		'dylan': ('white', 'http://i.imgur.com/4SsKz36.jpg'),
		'colt': ('white', 'http://i.imgur.com/tcMEHMW.jpg'),
		'zipzap': ('purple', 'http://i.imgur.com/SN02gip.jpg'),
		'james': ('orange', 'http://i.imgur.com/lbCHXgU.jpg'),
		'travis': ('#00008B', 'http://i.imgur.com/JWwBlUx.jpg'),
		'none': ['black', '']
	}

	def check(quote):
		for i in reference:
			if i in quote[1].lower() or i in quote[0].lower():
				return reference[i]
			return reference['none']

	phrase = random.choice(storage.quotes)
	info = check(phrase)

	body = """<html>
		<head>
			<link rel="stylesheet" type="text/css" href="quote.css">
			<link rel="shortcut icon" href="favicon.ico">
			<link href="http://fonts.googleapis.com/css?family=Poiret One"; rel="stylesheet"; type="text/css";/>
			<style>
				h1 {
					color:%s;
				}
				body {
					background-image:url(%s);
				}
			</style>
		</head>
		<body>
			<div class="refresh">
				<a href="/cgi-bin/quotes.py">New Quote~</a>
			</div>
			<div class="whole">
				<h1 class="quote">%s</h1>
				<h1 class="name">~%s %s</h1>
			</div>
		</body>
	</html> """ % (info[0], info[1], phrase[0], phrase[1], phrase[2])

	print("Content-type: text/html")
	print
	print body
	
&emsp;&emsp;At the end, all of the information that is needed is essentially embedded using Python's nifty string formatting. I believe this is depreciated after Python 2, however.

