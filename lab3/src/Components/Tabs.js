import React from "react"
import DictionaryLine from "./DictionaryLine"
import { Modal } from "react-bootstrap"


class Tabs extends React.Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs nav-fill">
                    <li className="nav-item" onClick={this.props.Dictionary}>
                        <a className="nav-link" data-toggle="tab" role="tabpanel" href="#Dictionary">Dictionary</a>
                    </li>
                    <li className="nav-item" onClick={this.props.Test}>
                        <a className="nav-link" data-toggle="tab" role="tabpanel" href="#Test">Test</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade" id="Dictionary">
                        <DictionaryLine
                            Dic={this.props.Dic}
                            click={this.props.click}
                        ></DictionaryLine>
                        <button id="add" type="button" onClick={this.props.add}>Add word</button>

                        <Modal show={this.props.AEModal}>
                            <Modal.Header>
                                {this.props.AEModalTitle}
                            </Modal.Header>
                            <Modal.Body>
                                <p>Word</p><input className="form-control" type="text" id="word"></input>
                                <p>Translate</p><input className="form-control" type="text" id="translate"></input>
                            </Modal.Body>
                            <Modal.Footer>
                                <button id="save" type="button" className="btn btn-primary" onClick={this.props.savef}>Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="tab-pane fade" id="Test">
                        <input className="form-control" type="text" id="TestWord" value={this.props.testWord} readOnly></input>
                        <div className="form-check">
                            <div>
                                <input className="form-check-input" name="testradio" type="radio" id="radio1"></input>{this.props.first}
                            </div>
                            <div>
                                <input className="form-check-input" name="testradio" type="radio" id="radio2"></input>{this.props.second}
                            </div>
                            <div>
                                <input className="form-check-input" name="testradio" type="radio" id="radio3"></input>{this.props.third}
                            </div>
                        </div>
                        <button id="tsave" type="button" className="btn btn-primary" onClick={this.props.tsavef}>{this.props.tsaveName}</button>
                        <Modal show={this.props.testModal}>
                            <Modal.Header>
                                Test result
                            </Modal.Header>
                            <Modal.Body>
                                <p>Your result</p><input className="form-control" type="text" id="resultLabel" value={this.props.result} readOnly></input>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs;