class generete {
    getHtml(word, translate, id) {
        return  ("<tr>" +  
                "<td><input class=\"form-control\" type=\"text\" placeholder=" + word + " readonly></input></td>" +
                "<td><input class=\"form-control\" type=\"text\" placeholder=" + translate + " readonly></input></td>" +
                "<td><button id=" + id + "R>remove</button>" + 
                "<button id=" + id + "E>edit</button></td>" + "</tr>");
    }
}

export default class view {
    create_list(Dictionary) {
        let Gen = new generete();
        var HTML = "<table class=\"table\"><thead><tr><th>Word</th><th>Translate</th><th>Actions</th></tr></thead><tbody>";
        var id = 0;
        for (var [key, value] of Dictionary) {
            HTML = HTML + Gen.getHtml(key, value, id);
            id = id + 1;
        }
        HTML = HTML + "</tbody></table>"
        return HTML
    }

    out(Dictionary) {
        document.querySelector("#list").innerHTML = this.create_list(Dictionary);
    }

    testOut(word, variants){
        document.getElementById("TestWord").value = word;
        document.querySelector("#textradio1").innerHTML = variants[0];
        document.querySelector("#textradio2").innerHTML = variants[1];
        document.querySelector("#textradio3").innerHTML = variants[2];
    }

    popupEdit(word, translate){
        document.querySelector(".modal-title").innerHTML = "Edit word";
        document.querySelector("#word").value = word;
        document.querySelector("#translate").value = translate;
        $("#PopUp").modal("show");
    }
    popup(){
        document.querySelector(".modal-title").innerHTML = "Add word";
        document.querySelector("#word").value = "";
        document.querySelector("#translate").value = "";
        $("#PopUp").modal("show");
    }

    popupClose(){
        $("#PopUp").modal("hide");
    }

    changeTestButton(text){
        document.querySelector("#tsave").innerHTML = text;
    }
    showCanNotUseTest(){
        document.getElementById("resultLabel").value = "Dictionary hasn`t got any words";
        this.testOut("Dictionary hasn`t got any words", ["Dictionary hasn`t got any words", "Dictionary hasn`t got any words", "Dictionary hasn`t got any words"]);
        $("#testResult").modal("show");
    }
}