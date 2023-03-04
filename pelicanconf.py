AUTHOR = 'Dylan Cramer'
SITENAME = "Dylan's Tech Blog"

SITEURL = 'http://dylancramer.ai'

PATH = 'content'

THEME = './graphene-ui'

TIMEZONE = 'America/Chicago'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

MENU_LINKS = (('Home', ''),
          ('About', 'pages/about.html'),
          ('Projects', 'pages/projects.html'),
          ('Archives', 'archives.html'))

MEDIA_LINKS = (('steam', 'http://steamcommunity.com/id/Dylan531'),
          ('git', 'https://gist.github.com/Dylan531'),
          ('twitter', '/'),)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
