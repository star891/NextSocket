import { Component } from 'react'
import io from 'socket.io-client'

export default class Index extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            leaders: '',
            plays: '',
            scores: '',
            drives: '',
        }
        
    }
    /*
    /nfl/game/NFL_20190106_LAC@BAL/leaders
    /nfl/game/NFL_20190106_LAC@BAL/plays
    /nfl/game/NFL_20190106_LAC@BAL/scores
    /nfl/game/NFL_20190106_LAC@BAL/drives
    */
    componentDidMount() {
        this.socket = io()
        
        this.socket.on('/nfl/game/NFL_20190106_LAC@BAL/leaders', data => {
            console.log('on emit' + data.message)
            this.setState({
                leaders: data.message
            })

        })
        this.socket.on('/nfl/game/NFL_20190106_LAC@BAL/plays', data => {
            console.log('on emit' + data.message)
            this.setState({
                plays: data.message
            })

        })
        this.socket.on('/nfl/game/NFL_20190106_LAC@BAL/scores', data => {
            console.log('on emit' + data.message)
            this.setState({
                scores: data.message
            })

        })
        this.socket.on('/nfl/game/NFL_20190106_LAC@BAL/drives', data => {
            console.log('on emit' + data.message)
            this.setState({
                drives: data.message
            })

        })

    }

    render() {
        return(
            <div>
                <div>
                    <h3>Leaders</h3>
                    {this.state.leaders}
                </div>
                <div>
                    <h3>Plays</h3>
                    {this.state.plays}
                </div>
                <div>
                    <h3>Scores</h3>
                    {this.state.scores}
                </div>
                <div>
                    <h3>Drives</h3>
                    {this.state.drives}
                </div>
            </div>
        )
    }

}