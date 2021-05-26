const feed = document.querySelector('main');

const button = document.getElementById('publish')

button.addEventListener("click", publish);


async function publish() {
    // jfernandez7@uc.cl
    console.log("hola publicando")
    const publisher = document.getElementById('publisher').value;
    const message = document.getElementById('message').value;
    console.log(publisher, message);
    firebase.database().ref('pweets').push({
      email: publisher,
      body: message,
  });

//     await fetch("http://localhost:3000/pweets/", {
//     method: "POST",
//     body: JSON.stringify({
//         email: publisher,
//         pweet: message,
//     }),
      
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
// .then(response => response.json())
// .then(json => console.log(json));

  }


if ('serviceWorker' in navigator) {
  caches.keys().then(function(cacheNames) {
    cacheNames.forEach(function(cacheName) {
      caches.delete(cacheName);
    });
  });
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
    updatePweets();
});

window.addEventListener('online', () => updatePweets());


async function updatePweets() {
  feed.innerHTML = '';
  fetch('https://pwitter-19436-default-rtdb.firebaseio.com/pweets.json', {
      'mode': 'cors',
      'headers': {
      'Access-Control-Allow-Origin': '*',
       }
     }).then((res) => res.json().then((data) => {
        console.log(data);
        feed.innerHTML = data.map(createPweet).join('\n');
    }));
}

function createPweet(pweet) {
  return `
    <div class="pweet-card">
        <h2>${pweet.email}</h2>
        <p>${pweet.body}</p>
    </div>
  `;
}