Title: Web Development 2016
Date: 2015-12-26 17:36
Tags: html, web dev
Category: Web Development
Slug: in-the-beginning
Authors: Dylan

  The past 2-3 days have been pretty work-heavy to get this website up. I've built it up from scratch, 
using HTML I've written combined with a handy little Python program called Pelican. Pelican uses Jinja along
with what I can only assume is black magic to create static web pages simply from templates and your choice
of either Markdown or ReStructured Text Format. There are undoubtedly other formats that could be used, but 
these are the only two formats that I'm familiar with. I'm also using Pygmants to color blocks of code that
I'll be using in my blog posts. Here's an example:

	:::python
	for i in range(20):
		print "THIS IS %s OF 20 IN A TEST LIST." % i

  In the next few days, there probably won't be many posts, I still have to finish up implementing some of
Pelican's other features, such as the tagging and archiving system. Along with that I still need to figure out
how I want to format my About page and my Projects page. Until next time.
