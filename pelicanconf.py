AUTHOR = 'Dylan Cramer'
SITENAME = "Dylan's Tech Blog"

SITEURL = 'https://dylancramer.ai'

OUTPUT_PATH = '/var/www/dylancramer/'

PATH = 'content'

THEME = './graphene-redux-theme'

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
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'))

MENU_LINKS = (('About', 'pages/about.html'),
          ('Archives', 'archives.html'),
          #('Projects', 'pages/projects.html')
          )

MEDIA_LINKS = (('steam', 'http://steamcommunity.com/id/Caelis-'),
          ('git', 'https://github.com/Dylan531'),
          ('twitter', '/'),)

DEFAULT_PAGINATION = 5

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {
            'linenums': 'TRUE',
            'css_class': 'highlight'
        },
        'markdown.extensions.tables': {
        },
    }
}

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
