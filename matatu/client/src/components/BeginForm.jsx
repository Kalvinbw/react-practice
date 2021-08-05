import '../styles/App.css';
import React from 'react';

class BeginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username'
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleRoom = this.handleRoom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handleRoom(event) {
        this.setState({room: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.action(this.state.username, this.state.room);
    }

    render() {
        let options = this.props.rooms.map((room) => (
            <option key={room.id} value={room.id}>{room.id}</option>
        ))
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select a room to join
                    <select value='Rooms' onChange={this.handleRoom}>
                        {options}
                    </select>
                </label>
                <label>
                    Enter your Username
                    <input type='text' value={this.state.username} onChange={this.handleUsername}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default BeginForm;