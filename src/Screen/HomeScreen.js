import React, {Component} from 'react';
import axios from "axios";
import Button from "../Component/Button/Button";
import {v4 as uuidv4} from 'uuid';
import ListItem from "../Component/ListItem/ListItem";
import './Styles.css'

class HomeScreen extends Component {
    state = {
        value: '',
        list: []
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
            console.log(response);
            this.setState({
                list: response.data
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className='container'>
                <h1>To Do List App</h1>
                <section className='input-section'>
                    <div className="input-box">
                        <input
                            className='add-task-input'
                            type="text"
                            placeholder="Enter a Task"
                            onChange={(event) => {
                                this.setState({
                                    value: event.target.value
                                });
                            }}
                            value={this.state.value}
                        />
                        {this.state.error ? <span>{this.state.error}</span> : null}
                    </div>
                    <Button
                        isPurple={true}
                        text='Add'
                        handleClick={() => {
                        if (this.state.value) {
                            const newTask = [{
                                title: this.state.value,
                                id: uuidv4()
                            }, ...this.state.list]
                            this.setState({
                                list: newTask,
                                value: '',
                                error: ''
                            })
                        } else {
                            this.setState({
                                error: "Please Enter a Task"
                            })
                        }
                    }}/>


                </section>

                <section className='items-section'>
                    {this.state.list.length ? (
                        this.state.list.map(item => (
                            <ListItem
                                task={item.title}
                                key={item.id}
                                handleDelete={() => {
                                    const filteredItems = this.state.list.filter(
                                        filterItem => filterItem.id != item.id
                                    );
                                    this.setState({
                                        list: filteredItems
                                    });
                                }}
                            />
                        ))
                    ) : (<span>Loading ...</span>)}
                </section>
            </div>


        );
    }
}

export default HomeScreen;