onmessage = function (e) {
    var result = 0;
    for(var i = 0; i < e.data[0].length; i++){
        if(e.data[1].get(e.data[0][i][0]) == e.data[0][i][1]){
            result = result + 1;
        }
    }
    this.postMessage(result);
}