Title: In the Future: A Revival
Date: 2023-03-08 19:11
Tags: html, web dev
Category: Web Development
Slug: in-the-future
Authors: Dylan

&emsp;&emsp;With the need for a website, I thought I would revive this little passion project of mine with a brand new spin using all the new tools at my disposal.
Everything from the theme itself to the templates Jinja uses have been completely reimagined to pull it up to the standards of today. With inspiration from Material design I picked up from my Software Development class as well as all the development Pelican has gone through and the development in the space of web development itself, I think I've ended up with something I can be satisfied with. I'm still actively working on it, but it's to the point I can begin writing articles like these. Here's a little snippet of the revamped menu:

	:::html
	<a href="{{ SITEURL }}"><img class="headerstretch" src="{{ SITEURL }}/theme/images/banner.png" alt = "banner"/></a>
		<div id="nav">
			{% if 'index' in output_file %}
					<div class="navb"><p><a href="{{ SITEURL }}/{{ url }}" class="navb navactive">Home</a></p></div>
			{% else %}
					<div class="navb"><p><a href="{{ SITEURL }}/{{ url }}" class="navb">Home</a></p></div>
			{% endif %}
   			{% for item, url in MENU_LINKS %}
				{% if url == output_file %}
					<div class="navb"><p><a href="{{ SITEURL }}/{{ url }}" class="navb navactive">{{ item }}</a></p></div>
				{% else %}
					<div class="navb"><p><a href="{{ SITEURL }}/{{ url }}" class="navb">{{ item }}</a></p></div>
				{% endif %}
    		{% endfor %}
    		{% for item, url in MEDIA_LINKS %}
    			<a class="icon" href="{{ url }}"><img src="{{ SITEURL }}/theme/images/thmb/{{ item }}.png" alt = "{{ item }}"/></a>
    		{% endfor %}
		</div>

&emsp;&emsp;The gist of this is to add a new class element when the user is currently on the page in the menu so it can be highlighted. This ended up being a bit trickier than I thought at first since the index has pagination and thus Home must be highlighted for all of those items. Luckily Jinja is very versatile and you can simply check for string subset in the output_file variable provided by Pelican itself. The index case also has to be outside the for loop that iterates through the MENU_LINKS variable since it doesn't make sense to check for the index page with every iteration. That means it would spawn a new Home link for every iteration of the for loop that it isn't found. It has to fallback onto the item itself if it isn't found to be active.

&emsp;&emsp;This is just a brief snippet of the development of this site. The self hosting itself had a bunch of challenges that had to be overcome, from development choices, to DNS shenanigans. Maybe I'll write more about that in the future, but for now I'm just going to leave it here, it's for another article.