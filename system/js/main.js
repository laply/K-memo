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

const downloadFile = function(){
    // if (lastChoiceData == ""){
    //     alert("선택된 파일이 없습니다.  할 파일 선택해주세요 "); 
    // } else{
    //     new KPHP().phpData(`system/php/save.php?name=${fileIdList[lastChoiceData].file_name}&data=${fileIdList[lastChoiceData].file_data}`, (returnData2) => {})
    // }
}


const loadFileData = function(){
    let thisData = document.getElementById("main-textboard").value

    if (thisData != ""){
        alert("data가 존재합니다. Load 전에 지워주세요."); 
    } else if (lastChoiceData == ""){
        alert("선택된 파일이 없습니다. Load 할 파일 선택해주세요 "); 
    } else {
        document.getElementById("file-name").value = fileIdList[lastChoiceData].file_name
        document.getElementById("main-textboard").value = fileIdList[lastChoiceData].file_data
    }
}

let newDataId = 0

const savedFile = function(){
    let thisTime = new Date();
    let name = document.getElementById("file-name").value;
    let data = document.getElementById("main-textboard").value;

    if (name == ""){
        alert("저장 파일 이름이 필요합니다");
    } else if (data == ""){
        alert("저장 파일 데이터가 필요합니다"); 
    } else {
        newDataId++
        setData(name, data)
        let p = document.getElementById('data-log-body')

        p.prepend(makeList({
                id : "n" + newDataId, 
                file_name: name, 
                file_data: data,
                saved_time:thisTime.toLocaleString()
            }))
        
        document.getElementById("file-name").value = ""
        document.getElementById("main-textboard").value = ""
    }
}

function setData(filename, filedata) {
    new KPHP().phpData(`system/php/db.php?query=insert into file (file_name, file_data) value ('${filename}', '${filedata}');&do=set`, (returnData2) => {})
}

let lastChoiceData = "";

const dataChoice = function(data){
    for (var id in fileIdList){
        document.getElementById(id).style.backgroundColor = "#ffffff"
    }

    lastChoiceData = data.path[0].id
    document.getElementById(data.path[0].id).style.backgroundColor = "#bdccbd"

}

let fileIdList = {}

function makeList(data){
    fileIdList["file-" + data.id] = data

    var name = document.createElement("div")
    name.setAttribute("class", "file-name-list")
    name.innerHTML = data.file_name;

    var time = document.createElement("div")
    time.setAttribute("class", "file-time-list")
    time.innerHTML = data.saved_time;

    var newDiv = document.createElement("div")
    newDiv.setAttribute("class", "file-list")
    newDiv.setAttribute("id", "file-" + data.id)
    newDiv.onclick = dataChoice
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