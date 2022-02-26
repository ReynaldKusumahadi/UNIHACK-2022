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
        var topicID = stringToHash(title);
        var search = searchTopic(title);
        if(search.error){ // It is a new topic
            gun.get('topics').get(title).put({ // title can be hash too
                a: topicID,
                b: publicAddress,
                c: title,
                d: content
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
        if (properties.length > 3){
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
        if (data.a != null && data.c != null){
            titles.push(data.c);
            descriptions.push(data.d);
        }
    })
    // console.log(array);
    var uniqueTitles = new Set(titles);
    var uniqueDescriptions = new Set(descriptions);

    var uniqueTitlesArray = Array.from(uniqueTitles);
    var uniqueDescriptionsArray = Array.from(uniqueDescriptions);

    if (uniqueTitlesArray.length === 0){
        alert("No topics found!");
    } else {
        for (var i = 0; i < uniqueTitlesArray.length; i++) {
            var title = uniqueTitlesArray[i];
            var description = uniqueDescriptionsArray[i];

            addRow(title, description);

            // var div = document.createElement("div");
            // div.className = "d-grid gap-3";
            // var container = document.createElement("div");
            // container.className = "container bg-light border pt-2 pb-2";
            // var row = document.createElement("div");
            // row.className = "row";
            // var col8 = document.createElement("div");
            // col8.className = "col-8";
            // var h4 = document.createElement("h4");
            // var a = document.createElement("a");
            // a.href = "#";
            // a.innerHTML = title + " | " + description;
            // h4.appendChild(a);
            // col8.appendChild(h4);
            // var col = document.createElement("div");
            // col.className = "col d-flex justify-content-center";
            //
            // row.appendChild(col8);
            // row.appendChild(col);
            // container.appendChild(row);
            // div.appendChild(container);
            // document.getElementById("topics").appendChild(div);

        }
    }

    //
    // uniqueTitles.forEach((num1,index) => {
    //     const num2 = uniqueDescriptions[index];
    //     console.log(num1, num2);
    // })

}

function addRow(title, description){
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
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-success";
    button.innerHTML = "Subscribe";
    col.appendChild(button);
    row.appendChild(col8);
    row.appendChild(col);
    container.appendChild(row);
    div.appendChild(container);
    document.getElementById("topics").appendChild(div);
}

function subscribe(topicTitle) {
    var user = account;
    var topic = topicTitle;

    if (user === null) {
        alert("Please login to subscribe to a topic");
    } else {
        gun.get(user).get('').put({tnodeAddress: "Address2"})
    }

    // Add to user's subscriptions

}

function stringToHash(string) {
    var hash = 0;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

// Comment Structure
// gun.get('comments').get('postID').get("commentID").put({authorOD:"User ID", comment: "Comment", datetime: "Date Time"})
// gun.get('comments').get('post1').map().on(function(data){console.log(data)})
// Returns
//{
//   "_": {
//     "#": "comments/post2/commentID1",
//     ">": {
//       "comment": 1645875622100,
//       "userID": 1645875622100
//     }
//   },
//   "comment": "Comment1",
//   "userID": "User ID1"
// }



// Post Structure
// gun.get('posts').get('post1').put({postID: 'Post ID', targetTopicID:'Topic ID', authorID:'User ID', content:'Sentence', datetime: "Date Time"})
// gun.get('posts').map().on(function(data){console.log(data)})

// Returns
// {
//   "_": {
//     "#": "posts/post1",
//     ">": {
//       "authorID": 1645876067600,
//       "targetTopicID": 1645876067600
//     }
//   },
//   "authorID": "Author ID",
//   "targetTopicID": "topic ID"
// }



// Subscription Structure
// gun.get('sublist-userID').get('topicID').put('topicID')
// gun.get('sublist-userID').map().on(function(data){console.log(data)})

// Returns
// topicID
// topicID2