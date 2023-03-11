Title: Small Quotes Project
Date: 2016-01-08 15:14
Tags: python, projects
Category: Python Development
Slug: quotes-project
Authors: Dylan

One day on a whim I decided I wanted to do something with all of the quotes my friends and I had gathered. We have a page we add our
most favorite quotes onto, the page functions much like a Google Doc, where you can see everybody editing the file, as well as editing it
yourself. So what I end up with is a text file with over 500 lines of various quotes and data that cannot be properly formatted. The
first step was developing something to sort through out of it, of which I created this Regex solution:

	:::python linenums="True"
	import re
	import fileinput

	quotes = []

	for line in fileinput.input('quotes'):
		r_unwanted = re.compile("[\n\t\r]")
		line = r_unwanted.sub("", line)
		line = re.sub(r"(^\')",'\"', line)
		line = re.sub(r"(\'\s)",'\" ', line)
		line = re.split(r' ', line)
      		if line[0] == '':
			continue
		if '5' in line[-1] and "\"" in line[0][0]:
			def check(x):
				if x is None:
					return
				elif x:
					return x.group(0)
			string = ' '.join(line)
			match1 = re.search(r'^(\".*\")', string)
			match2 = re.search(r'\"\s(.*)\s\d', string)
			string1 = check(match1)
			if check(match2):
				string2 = check(match2)[2:-2]
			else: 
				continue
			line = [string1, string2, line[-1]]
			quotes.append(line)

Let's start off at the for statement on line number 6. It uses the fileinput module to open the 'quotes' fine to iterate over each line. Each line goes through the series of Regex. Lines 7 and 8 remove all of the special characters, like new lines. Lines 9 and 10 replace single quotes with double quotes. Next, the line is split up at each space, turning it into a list with each word in the array. I was having problems with the first thing in the list being empty, so line number 12 checks if it's empty, and if it is, it passes and iterates over the next line. 

The next if statement does something really hack-y, something I presume is probably bad practice. Basically, the way my friends and I format the dates, they will more than likely be at the end. So, it checks if there is a 5 at the end (for 2015), and assuming that is true, it also checks if the first character in the first word is a double quote. Only because Python treats strings as an array of characters, this is possible. 

After that, the string is joined back together. Then, it takes what's within the double quotes, and defined that as match1. Match2 is then defined as the name of the person that said the quote, basically everything that's between the quote and the date. Lines 23-27 are hack-y checks to make sure the result isn't null, and line 25 also removes some unwanted whitespace and excess quotations. Finally, we arrive at the result, where the quote is placed into a tuple with 3 variables, in this format: [Quote, Name, Date]. The result is then added to the list of the quotes as a whole. Here is an example:

Input: "I'm not mad, YOU'RE MAD~" Colt, 3/19/2015

Output: ['"I\'m not mad, YOU\'RE MAD~"', 'Colt,', '3/19/2015']

There are a lot of loose cases that get through, and I'm not too sure how to fix them, which is part of the reason I'm writing this blog, hopefully to brainstorm some ideas. Here something that should get through, but does not, because of a simple quirk:

Input: "Quote Here",, Name, 3/19/2015

Output: None

The reason that doesn't go through is because there is a comma after the second quotation instead of whitespace. The core algorithms are flawed in that they are too specific, mostly due to the fact I'm not that familiar with Regex yet. With time, I suppose. Until next time.
