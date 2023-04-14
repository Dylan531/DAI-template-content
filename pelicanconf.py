import datetime

# General site information
LAST_BUILT = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
AUTHOR = 'Dylan Cramer'
SITENAME = "Dylan's Tech Blog"
SITEURL = 'https://dylancramer.ai'
TIMEZONE = 'America/Chicago'
DEFAULT_LANG = 'en'

# Paths to hosting location and general content
PATH = 'content'
OUTPUT_PATH = '/var/www/dylancramer/'
STATIC_PATHS = ['images', 'files']
THEME = './graphene-redux-theme'

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Boolean for the special easter egg, no script or area tag if False
EASTER_EGG = True

# Boolean for Google Analytics, switch to False if you're not using it, and change the analytics ID to your domain if you are in base.html
GOOGLE_ANALYTICS = True
ANALYTICS_ID = 'G-FC8K7W5CHP'

# Footer links
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         )

# Boolean for the special easter egg, no script or area tag if False
EASTER_EGG = True

# Boolean for whether you want comments to be enabled or not
COMMENTS = True

# Nav bar menu links
MENU_LINKS = (('Projects', 'pages/projects.html'),
          ('About', 'pages/about.html'),
          #('Archives', 'archives.html'),
          )

# Nav bar social links
MEDIA_LINKS = (('steam', 'http://steamcommunity.com/id/Caelis-'),
          ('git', 'https://github.com/Dylan531'),
          ('twitter', 'https://twitter.com/NCaelis'),)

# Number of articles per page for index
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
# RELATIVE_URLS = True
