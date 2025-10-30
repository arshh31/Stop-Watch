import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isStart: false, timeElappedInSeconds: 0, timeElappedInMinutes: 0}

  startTimer = () => {
    const {isStart, timeElappedInSeconds} = this.state

    this.timerId = setInterval(this.startSeconds, 1000)

    this.setState(prevState => ({
      isStart: !prevState.isStart,
    }))
    console.log(isStart)
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
  }

  startSeconds = () => {
    const {isStart} = this.state

    this.setState(prevState => ({
      timeElappedInSeconds: prevState.timeElappedInSeconds + 1,
    }))
  }

  stopTimer = () => {
    const {isStart} = this.state

    if (isStart) {
      this.pauseTimer()
    }
    this.setState(prevState => ({
      isStart: !prevState.isStart,
    }))
  }

  onResetTimer = () => {
    this.pauseTimer()
    this.setState({timeElappedInSeconds: 0})
  }

  elappsedTimeInSeconds = () => {
    const {timeElappedInMinutes, timeElappedInSeconds} = this.state

    const minutes = Math.floor(timeElappedInSeconds / 60)
    const seconds = Math.floor(timeElappedInSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStart, timeElappedInSeconds, timeElappedInMinutes} = this.state
    return (
      <div className="bg-container">
        <h1>Stopwatch</h1>

        <div className="stopwatchContainer">
          <p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png "
              alt="stopwatch"
            />{' '}
            Timer
          </p>
          <h1>{this.elappsedTimeInSeconds()}</h1>
          <div>
            <button
              className="start-btn"
              type="button"
              disabled={isStart}
              onClick={this.startTimer}
            >
              Start
            </button>
            <button className="stop-btn" type="button" onClick={this.stopTimer}>
              Stop
            </button>
            <button
              className="reset-btn"
              type="button"
              onClick={this.onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
