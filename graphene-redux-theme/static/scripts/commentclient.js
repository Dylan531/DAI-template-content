import './jquery-3.6.4.min.js'

const postButton = document.getElementById('postButton');
let hostname = window.location.host;

// Check if hosting is local, since a port has to be appended to point to the server
if (hostname.indexOf('127.0.0.1') !== -1) {
  hostname = window.location.protocol + '//' + window.location.hostname + ':3000'
} else {
  hostname = window.location.protocol + '//' + window.location.hostname
}

/**
 * This function fetches comments for a given article by making a GET request 
 * to the server API with the encoded article title as a query parameter. It 
 * then generates an HTML template for each comment and appends it to a 
 * specified element on the page. 
 */
const getComments = () => {
  // Get the title of the article
  const title = $('meta[property="og:title"]').attr('content');
  
  // Encode the title so that it can be included in the URI
  const queryTitle = Object.entries({ title: title })
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');

  // Fetch the comments of the specified article with the API
  fetch(hostname + `/comments?${queryTitle}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(comment => {
      const commentTemplate = `
        <div class="comment-container">
          <div class="comment-header">${comment.name}</div>
          <div class="comment-body">${comment.comment}</div>
          <div class="comment-footer">${comment.date}</div>
        </div>
      `;
      $('#comments').append(commentTemplate);
    })
  })
  .catch(error => {
    console.error(error);
  });
}

// TODO: add ability to refresh comments
function refreshComments () {
  getComments();
}

//TODO: add admin verification in order to delete comments from the client side
function verifyAdmin () {
}

postButton.addEventListener('click', () => {
  const title = $('meta[property="og:title"]').attr("content");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;
  
  const result = JSON.stringify({ "title":title, "name":name, "email":email, "comment":comment });
  
  fetch(hostname + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: result
  })
  .then(res => {
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

$(function() {
  getComments();
});