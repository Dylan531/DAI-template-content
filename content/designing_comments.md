Title: Design Decisions Behind Making a Simple Comments System With Node.js, Sqlite3, and jQuery
Date: 2023-04-13 19:05
Tags: html, web dev, javascript, api
Category: Web Development
Slug: designing-comments
Authors: Dylan

From the start of making this website I wanted to have a comments section, but I didn't want to use gross out-of-the-box solutions like Disqus. I was determined to make something I could host myself, and more importantly, wouldn't require one to create yet another just to post a comment. So, for a fun little project, I built up my own comments system that's now fully implemented, and this article is about all the roadblocks that needed to be passed to get here.

The first thing to address when I sat down and started planning this was the fact that this is a statically generated site, so I was starting from scratch as far as frameworks. I was going to need some sort of framework to help communicate with the server and do things dynamically on the clientside for one. For that, I chose jQuery. 

On the server side, I wanted something equally as lightweight, and a friend of mine had the perfect suggestion of simply using node as the framework and sqlite3 as the database. With all of the tools decided on, it was on to writing the API/App itself and deciding on the database structure. After awhile of deliberating, I came up with this:

    :::javascript
    
    const db = new sqlite3.Database('comments.db');

    // Create tables for both users and the comments made
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    uid TEXT, 
    name TEXT, 
    email TEXT)`);

    db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deletion_uid TEXT,
    date TEXT,
    title TEXT,
    name TEXT,
    comment TEXT)`);

It's not massively complex, but it still took awhile to make a lot of design decisions that I hadn't had to think about until then. I wanted to do this right even if it wasn't going to be super serious, so I couldn't use a UID as a primary key, because that would be very inefficient for queries. Thus it seemed best to have both.

Then comes the big question of authentication. I already knew I didn't want someone to have to make an account or make them sign into their Google account like every site seems to do. But how would you tell who you were talking to? How could someone identify themselves? After consdering it for awhile and coming to terms that there wasn't a perfect solution, I decided that the user could optionally enter in their email to reserve their name. 

Critically though, if the name had already been used without an email, there was no claiming it, since it be pretty annoying if someone came along and used an email so another user couldn't anymore. Lastly, the user can simply leave the fields blank if they want to be anonymous entirely. So, contained within a post request, we end up with this on the server side, simplifying as much as I can:

    :::javascript

    app.post('/comments', (req, res) => {
        var { name, email } = req.body;
        const UID = crypto.createHash('md5').update(user info).digest('hex');

        // check if name is empty, both fields are empty, or only an email is given. 
        // in all cases, add the comment as Anonymous
        if (name === '') {
            // The final variable is a boolean denoting anonymity 
            postComment(req, res, true);
        } else {
            // check if the name already exists in the database
            db.get("SELECT EXISTS(SELECT 1 FROM users WHERE name = ?) AS result", 
            [name], function(err, user) {
                if (user.exists) {
                    // check if the UID matches the one in the database
                    db.get("SELECT EXISTS(SELECT 1 FROM users WHERE UID = ?) AS result", 
                    [UID], function(err, row) {
                        if (UID_matches) {
                        postComment(req, res, false);
                        } // username already exists, 
                          // but UID doesn't match, "authentication" failed!
                        else {
                        // Send JSON error message
                        res.send('Please choose a different username, 
                                    or use the correct email address');
                        }
                    });
                } 
                // username doesn't exist so we need to add it and the comment to the database
                else {
                    db.run("INSERT INTO users (UID, name, email) VALUES (?, ?, ?)", 
                    [UID, name, email], function(err) {
                        if (err) {
                        console.error(err.message);
                        } 
                    });
                    postComment(req, res, false);
                }
            });
        }
    })

This is heavily editorialized and the full code is available on my Github. There is a lot I'm leaving out here, like catching errors, validation, and sanitization of the inputs. We start by checking if the user input is empty, and if it is, we can immediately insert the comment as anonymous. 

Next we check if the user exists (line 12). If the user already exists, we need to check if the UID matches the one in the database, as a rudimentary form of authentication. If that checks out, we're good to go, we can insert the comment. If it doesn't, we send an error response to the user, exiting there.

If it doesn't exist, the only case left to handle is one where the username doesn't already exist in the database. We insert a new user into the database (with the UID already calculated), as well as their comment, and that's that.

On the clientside, the request is structured as such:

    :::javascript

    postButton.addEventListener('click', () => {
        const title = $('meta[property="og:title"]').attr("content");
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const comment = document.getElementById("comment").value;
        
        const result = JSON.stringify({ 
            "title":title, 
            "name":name, 
            "email":email, 
            "comment":comment 
            });
        
        fetch(hostname + '/comments', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
            },
            body: result
        })
        .then(res => {
            // If the result is a bad request
            if (!res.ok) {
            return res.text().then(text => { throw new Error(text) })
            } else {
            return res.text().then(text => { alert(text) })
            }
        })
        .catch(err => {
            alert(err);
        });
    });

I'll preface this by saying this is the messier side of the code, and the part I intend on working out soon the in future. Upon clicking the post button, the fetch request to the /comments url of api is sent. The title is included as the identifier for the comment itself, as each article by design in Pelican has its own meta tags through Jinja's templating. The rest is extracted from its each respective input field. 

After the promise is returned, we're either left with an error which gets logged to the console, or an alert pops up displaying the url the user can navigate to in order to delete their comment. With the lack of an account, this seemed like the most elegant solution, or at least the best one I could think of at the time. The url itself contains the deletion_uid that is generated by a cryptographic function on creation. 

All in all, there are a LOT of usability improvements I want to make to this system. Including the comment IDs as an href for @ing. Including deletion on the web page securely for each unique user. It goes on and on. However overall I think this system turned out well so far. It's completely modular and there was no downtime in deploying the system itself. Both it and the templating for this website is on Github, and it's pretty lightweight to deploy.