
function getTime(){
    let today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleString();
}

function getData(){
   new KPHP().phpData(`system/php/db.php?query=select * from file;&do=get`, (returnData2) => {
    var dataList = []

    phpParse(dataList, returnData2)
    let p = document.getElementById('data-log-body')

    for(var data of dataList){
        p.prepend(makeList(data))
    }
   })
}

function makeList(data){

    var name = document.createElement("div")
    name.setAttribute("class", "file-name-list")
    name.innerHTML = data.file_name;

    var time = document.createElement("div")
    time.setAttribute("class", "file-time-list")
    time.innerHTML = data.saved_time;

    var newDiv = document.createElement("div")
    newDiv.setAttribute("class", "file-list")
    newDiv.setAttribute("id", data.guid)
    newDiv.appendChild(name)
    newDiv.appendChild(time)

    return newDiv
}

function init(){
    getTime();
    getData();
    setInterval(getTime, 1000);
}


init();