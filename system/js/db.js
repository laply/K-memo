class KPHP {
    //phpData(url, function returnf())
    phpData(requestMessage, drawOutput) {
        getRequest(requestMessage, drawOutput, drawError);

        function drawError() {
            console.log('Bummer: there was an error!');
        }

        function getRequest(url, success, error) {
            var req = false;
            try {
                req = new XMLHttpRequest();
            } catch (e) {
                try {
                    req = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (er) {
                    try {
                        req = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (err) {
                        return false;
                    }
                }
            }
            if (!req) return false;
            if (typeof success != 'function') success = function() {};
            if (typeof error != 'function') error = function() {};
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    return req.status === 200 ? success(req.responseText) : error(req.status);
                }
            }
            req.open("GET", url, true);
            req.send(null);
            return req;
        }
    }
}
const phpParse = function(parseList, response) {
    response = response.replace(')' + /\n    /gi, '');
    response = response.replace(/\n    /gi, '');
    response = response.replace(/\n/gi, '');

    var dataList = response.split('Array(');
    for (var j in dataList) {
        if (j == 0) continue;
        if (dataList.length == j) break;
        var parse = {}
        var object = dataList[j].split('[');
        for (var i in object) {
            if (i == 0) continue;
            var objectInfo = object[i].split('] => ');
            if (isNaN(parseInt(objectInfo[0]))) {
                parse[objectInfo[0]] = objectInfo[1].split(')<br>')[0];
            }
        }
        parseList.push(parse);
    }
}