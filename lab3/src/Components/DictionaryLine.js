import React from "react"


class DictionaryLine extends React.Component{
    render(){
        var list = new Array();
        var id = 0;
        for(var [word, translate] of this.props.Dic){
            list.push(
            <tr>  
            <td><input className="form-control" type="text" placeholder={word} readOnly></input></td>
            <td><input className="form-control" type="text" placeholder={translate} readOnly></input></td>
            <td><button id={id.toString() + "R"} onClick={this.props.click}>remove</button> 
            <button id={id.toString() + "E"} onClick={this.props.click}>edit</button></td></tr>);
            id++;
        }
        return(
            <table className="table"><thead><tr><th>Word</th><th>Translate</th><th>Actions</th></tr></thead><tbody>
                {list}
            </tbody></table>
        )
    }
}
export default DictionaryLine;