Title: Quotes Project Page Generation
Date: 2016-01-14 0:00
Tags: python, projects
Category: Python Development
Slug: quotes-project-pagegen
Authors: Dylan

While I will certainly update this article soon, I wanted to put out the code used to parse through the quotes themselves, and make them into a web page. I also need to fix code being shown incorrectly by Pagination on the home page of this blog, it's incredibly broken.

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
