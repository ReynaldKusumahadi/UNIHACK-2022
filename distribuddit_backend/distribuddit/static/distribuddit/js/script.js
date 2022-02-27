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
} else{ alert('Install Metamask First!')};

const ethereumButton = document.getElementById('login-button');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    getAccount();
});
let account;
let address;
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementsByClassName("logged-in")[1].style.display = "block";
    document.getElementsByClassName("logged-in")[0].style.display = "none";
    $.ajax({
                url: "/ajax/update_session/",
                type: "POST",
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                data: {
                    accountID: account,
                },
                success: function(data) {
                    console.log("Account ID set");
                }
            });
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
            window.location.href = "explore";
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
    const topicIDs = [];
    gun.get('topics').map().on(function(data, description) {
        if (data.a != null && data.c != null){
            topicIDs.push(data.a);
            titles.push(data.c);
            descriptions.push(data.d);
        }
    })
    // console.log(array);

    var uniquetopicIDs = new Set(topicIDs);
    var uniqueTitles = new Set(titles);
    var uniqueDescriptions = new Set(descriptions);

    var uniqueTitlesArray = Array.from(uniqueTitles);
    var uniqueDescriptionsArray = Array.from(uniqueDescriptions);
    var uniqueTopicIDsArray = Array.from(uniquetopicIDs);

    if (uniqueTitlesArray.length === 0){
        alert("No topics found!");
    } else {
        for (var i = 0; i < uniqueTitlesArray.length; i++) {
            var title = uniqueTitlesArray[i];
            var description = uniqueDescriptionsArray[i];
            var topicID = uniqueTopicIDsArray[i];

            addRow(title, description, topicID);

        }
    }

}

function addRow(title, description,topicID){
    var div = document.createElement("div");
    div.className = "d-grid gap-3";
    var container = document.createElement("div");
    container.className = "container bg-light border pt-2 pb-2";
    var row = document.createElement("div");
    row.className = "row";
    var col8 = document.createElement("div");
    col8.className = "col-8";
    var h4 = document.createElement("h5");
    var a = document.createElement("a");
    a.innerHTML = title + " | " + description;
    h4.appendChild(a);
    col8.appendChild(h4);
    var col = document.createElement("div");
    col.className = "col d-flex justify-content-center";

    var button2 = document.createElement("button");
    button2.type = "button";
    button2.className = "btn btn-primary";
    button2.value = topicID;
    button2.id = "viewTnode";
    button2.innerHTML = "View";
    button2.onclick = function(){
        viewTnode(this.value);
    };
    col.appendChild(button2);

    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-success";
    button.innerHTML = "Subscribe";
    button.value = topicID;
    button.onclick = function(){
        subscribe(this.value);
    };
    col.appendChild(button);
    row.appendChild(col8);
    row.appendChild(col);
    container.appendChild(row);
    div.appendChild(container);
    document.getElementById("topics").appendChild(div);
}

// function subscribe(topicTitle) {
//     var user = account;
//     var topic = topicTitle;
//
//     if (user === null) {
//         alert("Please login to subscribe to a topic");
//     } else {
//         gun.get(user).get('').put({tnodeAddress: "Address2"})
//     }
//
//     // Add to user's subscriptions
//
// }

function fetchTnode(topicID) {
    var topic = topicID;
    var user = account;

    gun.get('topics').map().on(function (data){
        if (data.a == topic){
            console.log("Match")
            var topicName = data.c;
            var topicDescription = data.d;
            var owner = data.b;

            var htmltitle = document.getElementById("topicTitle");
            htmltitle.innerHTML = topicName;

            var htmldescription = document.getElementById("topicDescription");
            htmldescription.innerHTML = topicDescription;

        }
    });

    // Add to user's subscriptions

}

function newPost(title,description,topicID){
    var user = account;
    var currentDateTime = new Date().toLocaleString();

    var postHash = Math.abs(stringToHash(title+description+currentDateTime));
    console.log(postHash);

    if (user === null) {
        alert("Please login to create a post");
    } else {
        gun.get('posts').get(postHash).put({postID: postHash, targetTopicID:topicID, authorID:account, title:title, content:description, dateTime: currentDateTime})
    }

}

function fetchPosts(mode,topicID) { // If mode = -1, fetch all post, else fetch post from topicID

        if (mode === -1) {

        } else {
            const postID = [];
            const authorID = [];
            const title = [];
            const content = [];
            const dateTime = [];
            const targetTopicID = [];

            gun.get('posts').map().on(function (data){
                if (data.targetTopicID == topicID){

                    postID.push(data.postID);
                    authorID.push(data.authorID);
                    title.push(data.title);
                    content.push(data.content);
                    dateTime.push(data.dateTime);
                    targetTopicID.push(data.targetTopicID);

                }
            })

            var uniquePostID = [...new Set(postID)];
            var uniqueAuthorID = [...new Set(authorID)];
            var uniqueTitle = [...new Set(title)];
            var uniqueContent = [...new Set(content)];
            var uniqueDateTime = [...new Set(dateTime)];
            var uniqueTargetTopicID = [...new Set(targetTopicID)];

            if (uniquePostID.length === 0){
                alert("No posts found");
            }else {
                for (var i = 0; i<uniquePostID.length; i++){
                    addPost(1,uniqueTitle[i],uniqueAuthorID[i],uniqueDateTime[i],uniqueContent[i],uniquePostID[i],uniqueTargetTopicID[i]);
                }
            }

             // addPost(title,authorID,dateTime,content,5,postID);
        }
}

function addPost(mode,title,author,time,content, postID, targetTopicID) {
    var post = document.createElement("div");
    post.className = "container bg-light border";
    var row = document.createElement("div");
    row.className = "row";
    var col = document.createElement("div");
    col.className = "col";
    var link = document.createElement("a");
    link.href = "post?postID="+postID;
    link.className = "link-primary";
    link.innerHTML = title;
    col.appendChild(link);
    row.appendChild(col);
    post.appendChild(row);
    row = document.createElement("div");
    row.className = "row";
    col = document.createElement("div");
    col.className = "col";
    var span = document.createElement("span");
    small1 = document.createElement("small");
    small1.innerHTML = "1234 comments";
    span.appendChild(small1);
    col.appendChild(span);
    row.appendChild(col);
    post.appendChild(row);
    row = document.createElement("div");
    row.className = "row";
    col = document.createElement("div");
    col.className = "col";

    span = document.createElement("span");
    small2 = document.createElement("small");
    small2.innerHTML = "Posted by <a className=\"link-secondary\">"+author+"</a> on "+time;
    span.appendChild(small2);
    col.appendChild(span);
    row.appendChild(col);
    post.appendChild(row);
    row = document.createElement("br");
    post.appendChild(row);
    row = document.createElement("div");
    row.className = "row";
    col = document.createElement("div");
    col.className = "col";
    var p = document.createElement("p");
    p.innerHTML = content;
    col.appendChild(p);
    row.appendChild(col);
    post.appendChild(row);
    document.getElementById("posts").appendChild(post);
}

function subscribe(topicID, userID){
    if (userID === null) {
        alert("Please login to subscribe");
    } else {
        var sublist = "sublist-"+userID;
        gun.get(sublist).get(topicID).put({tNode: topicID, status:true});
    }
}

async function fetchSubscriptions() {
    if (account === null) {
        alert("Please login to subscribe");
    } else {
        address = await window.ethereum.enable();
        console.log("Fetching subscriptions");
        var sublist = "sublist-" + account;
        console.log(sublist)

        const tNode = [];
        const status = [];
        gun.get(sublist).map().on(function (data) {
            console.log(data)
            if (data.status != null && data.tNode != null) {
                tNode.push(data.tNode);
                status.push(data.status);
            }
        })

        var uniqueTNode = [...new Set(tNode)];
        var uniqueStatus = [...new Set(status)];

        for (var i = 0; i < uniqueTNode.length; i++) {
            if (uniqueStatus[i] === true) {
                // addSubscription(uniqueTNode[i]);
                // addRow(uniqueTNode[i],"Active",userID);
                console.log("UniqueNode" + uniqueTNode[i]);
                addSubscripion(uniqueTNode[i],address);
            }
        }

    }
}

function addSubscripion(tNode,address){
    var title;
    var description;
    gun.get('topics').map().on(function (data){
         if (data.a == tNode){
             console.log(data.c)
             title = data.c;
             description = data.d;
         }
    })

    // Create div
    var div = document.createElement("div");
    div.className = "container bg-light border pt-2 pb-2";
    var row = document.createElement("div");
    row.className = "row";
    var col = document.createElement("div");
    col.className = "col-8";
    var link = document.createElement("a");
    link.href = "tnode?id="+tNode;
    link.innerHTML = title + " | " + description;
    col.appendChild(link);
    row.appendChild(col);
    col = document.createElement("div");
    col.className = "col d-flex justify-content-center";
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-danger";
    button.innerHTML = "Unsubscribe";
    button.onclick = function(){
        unsubscribe(tNode);
  };
    col.appendChild(button);
    row.appendChild(col);
    div.appendChild(row);
    document.getElementById("subscriptions").appendChild(div);
}

async function unsubscribe(tNode,address) {
    address = await window.ethereum.enable();
    var sublist = "sublist-" + address;
    gun.get(sublist).get(tNode).put({tNode: tNode, status: false});
    console.log(tNode,address)
    console.log("Unsubscribed");
    // Reload page
    // window.location.reload();
}

async function subscribe(tNode) {
    address = await window.ethereum.enable();
    var sublist = "sublist-" + address;
    gun.get(sublist).get(tNode).put({tNode: tNode, status: true});
    console.log(tNode,address)
    console.log("Subscribed");
    // Reload page
    // window.location.reload();
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


// Ajax call when button with id viewTnode is clicked, pass value of the clicked button to the function
function getCookie(name) {
let cookieValue = null;
if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}
const csrftoken = getCookie('csrftoken');



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