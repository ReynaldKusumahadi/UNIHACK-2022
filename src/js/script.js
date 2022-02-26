gun = Gun(['http://localhost:8765/gun','https://gun-server-unihack.herokuapp.com/gun']);

// copy = gun.get('test').get('paste');
// paste = document.getElementById('paste');
// paste.oninput = () => {
//     copy.put(copy.put(paste.value));
// }
// copy.on((data) => {paste.value = data});

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

const ethereumButton = document.getElementById('login-button');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    getAccount();
});

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.getElementsByClassName("logged-in")[1].style.display = "block";
    document.getElementsByClassName("logged-in")[0].style.display = "none";
    showAccount.innerHTML = account;
}