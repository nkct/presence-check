var dateTime = "";
function getTime() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date + ' ' + time;
}

getTime();

function setTime() {
    getTime();
    document.getElementById("timeDisplay").innerHTML = "Button click time: " + dateTime;

}

var callAPI = (dateTime) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ dateTime }),
        redirect: 'follow'
    };
    fetch("https://mjezyvjh5j.execute-api.eu-central-1.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
}