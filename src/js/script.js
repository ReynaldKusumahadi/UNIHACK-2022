// gun = Gun(['http://localhost:8765/gun','https://gun-server-unihack.herokuapp.com/gun']);
gun = Gun(['http://localhost:8765/gun']);

// gun = Gun();
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
let account;

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementsByClassName("logged-in")[1].style.display = "block";
    document.getElementsByClassName("logged-in")[0].style.display = "none";
    showAccount.innerHTML = account;
}

async function newTopic(){
    // Collect user input from the form, and put it in gun network
    const title = document.getElementById('tnodeName').value;
    const content = document.getElementById('description').value;
    const publicAddress = account;

    if (publicAddress== null)  {
        alert("Please login to MetaMask first!");
    } else{
        var search = searchTopic(title);
        if(search.error){ // It is a new topic
            gun.get('topics').get(title).put({ // title can be hash too
                a:publicAddress,
                b: title,
                c: content
            });
        }else{
            alert("Topic already exists!");
        }
    }
    // const topic = gun.get('topics').get(title);
    //
    // console.log(title);
    // console.log(content);

    // Put title and content into topic

    // gun.get('topics').put({
    //     title: title,
    //     description: content
    // });
    //



    // gun.get('topics').get(title).map().on(function(data){
    //     console.log(data.title);
    //     console.log(data.description); // description of all topics
    // });


    // gun.get('topics').map().on(function(data, description) {
    //     console.log(data)
    // })

}

function searchTopic(topicTitle){
    const properties = [];
    gun.get('topics').get(topicTitle).map().on(function(data){
        // Store data in array
        if (properties.length > 2){
            return{
                error: "Too many properties"
            }
        }
        properties.push(data);
        // console.log(properties);
    });
    // console.log(properties);
    if (properties.length === 0){
        return{
            error: "Topic not found"
        }
    } else {
        return properties;
    }
}

function test(){
    var temp = searchTopic("test");
    if (temp.error){
        console.log("Error");
    } else {
        console.log(temp)
    }
}

function exploreTopics(){
    const titles = [];
    const descriptions = [];
    gun.get('topics').map().on(function(data, description) {
        titles.push(data.b);
        descriptions.push(data.c);
    })
    // console.log(array);
    var uniqueTitles = new Set(titles);
    var uniqueDescriptions = new Set(descriptions);

    var uniqueTitlesArray = Array.from(uniqueTitles);
    var uniqueDescriptionsArray = Array.from(uniqueDescriptions);

    for (var i = 0; i < uniqueTitlesArray.length; i++) {
        var title = uniqueTitlesArray[i];
        var description = uniqueDescriptionsArray[i];


        // <div className="d-grid gap-3">
        //     <div className="container bg-light border pt-2 pb-2">
        //         <div className="row">
        //             <div className="col-8">
        //                 <h4><a href="">TnodeName | Hash</a></h4>
        //             </div>
        //             <div className="col d-flex justify-content-center">
        //                 <button type="button" className="btn btn-danger">Unsubscribe</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        var div = document.createElement("div");
        div.className = "d-grid gap-3";
        var container = document.createElement("div");
        container.className = "container bg-light border pt-2 pb-2";
        var row = document.createElement("div");
        row.className = "row";
        var col8 = document.createElement("div");
        col8.className = "col-8";
        var h4 = document.createElement("h4");
        var a = document.createElement("a");
        a.href = "#";
        a.innerHTML = title + " | " + description;
        h4.appendChild(a);
        col8.appendChild(h4);
        var col = document.createElement("div");
        col.className = "col d-flex justify-content-center";

        row.appendChild(col8);
        row.appendChild(col);
        container.appendChild(row);
        div.appendChild(container);
        document.getElementById("topics").appendChild(div);

    }

    //
    // uniqueTitles.forEach((num1,index) => {
    //     const num2 = uniqueDescriptions[index];
    //     console.log(num1, num2);
    // })

}