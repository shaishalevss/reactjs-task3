import * as React from "react";

class TodoComp extends React.Component{

    state = {
        list: [],
        newItem: "",
        counter: 0
    }

    addTask = () => {
        const maxTasks = 5;
        if(this.state.list.length === maxTasks){
            let errorDiv = document.getElementById("errorDisplay");
            errorDiv.hidden = false;
            this.setState({
                newItem: ""
            })
        } else{
             const newListItem = {
                id: 1 + Math.random(),
                newInput: this.state.newItem
            }

            const newList = [...this.state.list];
            newList.push(newListItem);
            this.setState({
                list: newList,
                newItem: ""
            })
        }
    }

    removeTask = (id) => {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        let errorDiv = document.getElementById("errorDisplay");
        if(errorDiv.hidden === false){
            errorDiv.hidden = true;
        }
        this.setState({ list: updatedList
        });
        // const updatedList = this.state.list.filter(item => item.id !== e.target.key);
    }

    removeAllTasks = () => {
        const newList = [];
        let errorDiv = document.getElementById("errorDisplay");
        if(errorDiv.hidden === false){
            errorDiv.hidden = true;
        }
        this.setState({ list: newList,
        newItem: ""});
    }

    changeInput = (e) => {
        this.setState({
            newItem: e.target.value
        })
    }

    render() {
        return(
            <div>
                    <h1>Tasks Left: <span>{this.state.list.length}</span></h1>
                    <div>
                    <ul>
                        {
                    this.state.list.map( (item) => {
                        const listItem = item;
                        return(
                            <li key={item.id} onClick={() => this.removeTask(item.id)}>{item.newInput}</li>
                        )
                    })
                }
                    </ul>
                </div>
                <input value={this.state.newItem} onChange={this.changeInput} type="text" placeholder="Enter your task here..."/>
                <button disabled={!this.state.newItem.length} onClick={this.addTask}>Add</button>
                {this.state.list.length > 0 &&
                <button onClick={this.removeAllTasks} disabled={this.state.list.length === 0}>Remove All</button>
                }
                <div id="errorDisplay" hidden={true}>
                    <h1>You Can't Add Anymore Tasks!</h1>
                </div>
                </div>
        )}
}
export default TodoComp;
