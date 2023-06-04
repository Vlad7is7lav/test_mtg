import React from "react"
import s from "./clocks.module.scss"

interface IProps {}

interface IClocksState {
  time: Date | string;
}

export class Clocks extends React.Component<IProps, IClocksState> {
  tick!: ReturnType<typeof setInterval>
  state = {
    time: ""
  }

  refreshClock = () => {
    this.setState({ time: new Date().toLocaleTimeString() })
  }

  componentDidMount() {
    this.tick = setInterval(() => this.refreshClock(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.tick)
  }

  render() {
    return <div className={s.clocks}>{this.state.time}</div>
  }
}
