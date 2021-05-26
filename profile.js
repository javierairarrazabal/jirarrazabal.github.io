const profile = document.querySelector('main');
const user = {"id":3,"name":"Jose","email":"jfernandez7@uc.cl"}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
    updateProfile();
});

window.addEventListener('online', () => updateProfile());


async function updateProfile() {
  profile.innerHTML = '';
  const response = await fetch(`http://localhost:3000/profile/${user.id}`);
  //const response = await fetch(`https://server-web-avanzado.free.beeceptor.com/profile/id=3`);
  console.log(response)
  const json = await response.json();
  profile.innerHTML =
    createProfile(json)
}

function createProfile(info) {
    const myData = `
    <div class="personalInfo">
        <h2>Name: ${info.name}</h2>
        <h3>Email: ${info.email}</p>
        <h3>Published pweets: </p>

    </div>
    \n`;
    const pweets = info.pweets.map(createPweet).join('\n'); 
    return myData + pweets
}

function createPweet(pweet) {
  return `
    <div class="pweet-card">
        <p>${pweet.body}</p>
    </div>
  `;
}