import React from 'react';
import './App.css';
import Tabs from "./Components/Tabs"
import Model from "./Model"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      firstV: "un",
      secondV: "un",
      thirdV: "un",
      tsaveName: "un",
      testWord: "un",
      AEModal: false,
      testModal: false,
      testResult : 0,
      AEModalTitle : "un",
      Dictionary: new Map()
    });
    this.state.Dictionary.set("Hello", "Привіт");
    this.state.Dictionary.set("Good", "Добре");
    this.state.Dictionary.set("Bad", "Погано");
    this.state.Dictionary.set("Play", "Грати");
    this.state.Dictionary.set("Want", "Хотіти");
    this.state.Dictionary.set("Get", "Отримати");
    this.state.Dictionary.set("Have", "Мати");
    this.state.Dictionary.set("Scream", "Кричати");
    this.state.Dictionary.set("Cube", "Куб");
    this.state.Dictionary.set("Ball", "М'яч");
    this.state.Dictionary.set("Keyboard", "Клавіатура");
    this.state.Dictionary.set("Mouse", "Миша");

    this.RE_Click = this.RE_Click.bind(this);
    this.OnTest = this.OnTest.bind(this);
    this.onAddWordClick = this.onAddWordClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onTSaveClick = this.onTSaveClick.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.keyToEdit = "";

    this.Model = new Model();
    this.testSize = 0;
    this.result = 0;
  }

  closeModal(e) {
    this.setState({
      AEModal: false,
      testModal: false
    });
    this.keyToEdit = "";
  }

  onTSaveClick(e) {
    if (document.getElementById("radio1").checked) {
      if(this.state.Dictionary.get(this.state.testWord) === this.state.firstV){
        this.result++;
      }
    }
    if (document.getElementById("radio2").checked) {
      if(this.state.Dictionary.get(this.state.testWord) === this.state.secondV){
        this.result++;
      }
    }
    if (document.getElementById("radio3").checked) {
      if(this.state.Dictionary.get(this.state.testWord) === this.state.thirdV){
        this.result++;
      }
    }
    if (this.testSize > 0) {
      this.test();
    }
    else {
      this.setState({
        testModal : true,
        testResult : this.result
      });
      this.OnTest();
    }
  }
  test() {
    if (this.testSize > 10) { this.testSize = 10; }
    if (this.testSize - 1 < 0.5) {
      document.getElementById("tsave").innerHTML = "Finish";
    }
    this.testSize = this.testSize - 1;
    var id = this.Model.getRandomId(this.state.Dictionary);
    var variants = this.Model.getVariants(3, this.state.Dictionary, this.state.Dictionary.get(this.Model.findByID(id, this.state.Dictionary)));
    this.setState({
      firstV : variants[0],
      secondV : variants[1],
      thirdV : variants[2],
      testWord : this.Model.findByID(id, this.state.Dictionary)
    });
  }
  OnTest() {
    this.result = 0;
    document.getElementById("tsave").innerHTML = "Next";
    if (this.state.Dictionary.size === 0) {
      this.setState({
        testModal: true,
        testResult : "Dictionary size = 0. Test doesn`t work",
        firstV : "un",
        secondV : "un",
        thirdV : "un",
        testWord : "un"
      });
      this.testSize = 0;
      return;
    }
    this.testSize = (this.state.Dictionary.size / 2);
    this.test();
  }

  RE_Click(e) {
    var action = e.target.id.charAt(e.target.id.length - 1);
    var id = e.target.id.substring(0, e.target.id.length - 1);

    var key = this.Model.findByID(parseInt(id), this.state.Dictionary);
    if (action === "R") {
      this.state.Dictionary.delete(key);
      this.setState({
        Dictionary: this.state.Dictionary
      })
    }
    else if (action === "E") {
      this.keyToEdit = key;
      this.setState({
        AEModal: true,
        AEModalTitle : "Edit word " + key
      });
    }
  }

  onAddWordClick(e) {
    this.setState({
      AEModal: true,
      AEModalTitle : "Add word"
    });
  }

  check(word, translate) {
    if (word === "" || translate === "") {
      return false;
    }
    return true;
  }
  onSaveClick(e) {
    var word = document.getElementById("word").value;
    var translate = document.getElementById("translate").value;

    if (this.check(word, translate)) {
      if (this.keyToEdit === "") {
        this.state.Dictionary.set(word, translate);
      }
      else {
        this.state.Dictionary.delete(this.keyToEdit);
        this.state.Dictionary.set(word, translate);
      }
      this.closeModal();
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <Tabs
          Test={this.OnTest}
          Dictionary={this.OnDictionary}
          first={this.state.firstV}
          second={this.state.secondV}
          third={this.state.thirdV}
          testWord={this.state.testWord}
          tsaveName={this.state.tsaveName}
          Dic={this.state.Dictionary}
          click={this.RE_Click}
          add={this.onAddWordClick}
          tsavef={this.onTSaveClick}
          savef={this.onSaveClick}
          testModal={this.state.testModal}
          AEModal={this.state.AEModal}
          closeModal={this.closeModal}
          result={this.state.testResult}
          AEModalTitle={this.state.AEModalTitle}>
        </Tabs>
      </div>
    )

  }
}

export default App;
