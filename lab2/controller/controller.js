export default class controller {
    constructor(view, model) {
        this.model = model;
        this.view = view;

        this.Dictionary = new Map();
        this.Dictionary.set("Hello", "Привіт");
        this.Dictionary.set("Good", "Добре");
        this.Dictionary.set("Bad", "Погано");
        this.Dictionary.set("Play", "Грати");
        this.Dictionary.set("Want", "Хотіти");
        this.Dictionary.set("Get", "Отримати");
        this.Dictionary.set("Have", "Мати");
        this.Dictionary.set("Scream", "Кричати");
        this.Dictionary.set("Cube", "Куб");
        this.Dictionary.set("Ball", "М'яч");
        this.Dictionary.set("Keyboard", "Клавіатура");
        this.Dictionary.set("Mouse", "Миша");



        this.keyToEdit = "";

        this.testSize = 0;
        this.answers = new Array();

        if(window.Worker){
            this.worker = new Worker("./WebWorker/web_worker.js");
            this.worker.onmessage = function(e){
                document.getElementById("resultLabel").value = e.data;
                $("#testResult").modal("show");
            }
        }
        document.querySelector(".tab-content").addEventListener("click", (e) => this.onButtonClick(e));
        document.querySelector("#MyTab li:last-child a").addEventListener("click", (e) => this.onTestClick(e));
        document.querySelector("#MyTab li:first-child a").addEventListener("click", (e) => this.onDictionaryClick(e));
    }

    
    test(){
        if(this.testSize - 1 < 0.5){
            this.view.changeTestButton("Finish");
        }
        this.testSize = this.testSize - 1;
        if(this.testSize > 10){this.testSize = 10;}
        var id = this.model.getRandomId(this.Dictionary);
        var variants = this.model.getVariants(3, this.Dictionary, this.model.getValue(id, this.Dictionary));
        this.view.testOut(this.model.getKey(id, this.Dictionary), variants);
    }

    onDictionaryClick(e){
        this.view.out(this.Dictionary);
    }
    onTestClick(e){
        this.view.changeTestButton("Next")
        this.answers = new Array();
        this.testSize = (this.Dictionary.size / 2);
        if(this.Dictionary.size == 0){
            this.view.showCanNotUseTest();
            return;
        }
        this.test();
    }

    addEditError(word, translate){
        if(word === "" || translate === ""){
            return false;
        }
        return true;
    }
    onButtonClick(e){
        if(e.target.id === "add"){
            this.view.popup();
        }
        else if(e.target.id === "save"){
            if(this.keyToEdit == ""){
                var word = document.getElementById("word").value;
                var translate = document.getElementById("translate").value;
                if(!this.addEditError(word, translate)) {
                    this.view.popupClose();
                    this.view.popup();
                    return;
                }
                this.Dictionary.set(word, translate);
            }
            else{
                var word = document.getElementById("word").value;
                var translate = document.getElementById("translate").value;
                if(!this.addEditError(word, translate)){
                    this.view.popupClose();
                    this.view.popupEdit(word, translate);
                    return;
                }
                this.Dictionary.delete(this.keyToEdit);
                this.Dictionary.set(word, translate);
                this.keyToEdit = "";
            }
            this.view.out(this.Dictionary);
            this.view.popupClose();
        }
        else if(e.target.id === "tsave"){
            if(document.getElementById("radio1").checked){
                this.answers.push([document.getElementById("TestWord").value, document.querySelector("#textradio1").innerHTML]);
            }
            if(document.getElementById("radio2").checked){
                this.answers.push([document.getElementById("TestWord").value, document.querySelector("#textradio2").innerHTML]);
            }
            if(document.getElementById("radio3").checked){
                this.answers.push([document.getElementById("TestWord").value, document.querySelector("#textradio3").innerHTML]);
            }
            if(this.testSize > 0){
                this.test();
            }
            else{
                this.worker.postMessage([this.answers, this.Dictionary])
                this.onTestClick(e);
            }
        }
        else{
            var action = e.target.id.charAt(e.target.id.length - 1);
            var id = e.target.id.substring(0, e.target.id.length - 1);

            var iter = 0;
            for(var [key, value] of this.Dictionary ){
                if(iter === parseInt(id)){
                    break;
                }
                iter++;
            }
            if(action === "E"){
                this.keyToEdit = key;
                this.view.popupEdit(key, value);
            }
            else if(action === "R"){
                this.Dictionary.delete(key);
                this.view.out(this.Dictionary);
            }
        }
    }
}