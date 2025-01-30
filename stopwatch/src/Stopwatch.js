import React, { Component } from "react";
import { Form, FormGroup, Button, ButtonGroup } from "react-bootstrap";
import "./Stopwatch.css";

const Separator = () => {
  return <span className="Stopwatch-number">:</span>;
};

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: null,
      totalSeconds: 0,
    };
  }

  incrementCount() {
    this.setState({
      totalSeconds: this.state.totalSeconds + 1,
    });
  }

  getHours() {
    return parseInt(this.state.totalSeconds / 60 / 60) % 24;
  }

  getMinutes() {
    return parseInt(this.state.totalSeconds / 60) % 60;
  }

  getSeconds() {
    return this.state.totalSeconds % 60;
  }

  startCounter = () => {
    clearInterval(this.state.tick);
    this.setState({
      tick: setInterval(() => this.incrementCount(), 1000),
    });
  };

  stopCounter = () => {
    clearInterval(this.state.tick);
    this.setState({
      tick: null,
    });
  };

  resetCounter = () => {
    clearInterval(this.state.tick);
    this.setState({
      totalSeconds: 0,
      tick: null,
    });
  };

  resumeCounter = () => {
    clearInterval(this.state.tick);
    this.setState({
      tick: setInterval(() => this.incrementCount(), 1000),
    });
  };

  render() {
    let buttons = null;
    let started =
      this.getHours() > 0 || this.getMinutes() > 0 || this.getSeconds() > 0;

    if (!this.state.tick && !started) {
      buttons = (
        <ButtonGroup className="Stopwatch-button-group">
          <Button
            variant="primary"
            size="lg"
            block
            className="Stopwatch-button"
            onClick={this.startCounter}
          >
            Start
          </Button>
        </ButtonGroup>
      );
    } else if (!this.state.tick && started) {
      buttons = (
        <ButtonGroup className="Stopwatch-button-group">
          <Button
            variant="success"
            size="lg"
            block
            className="Stopwatch-button"
            onClick={this.resumeCounter}
          >
            Resume
          </Button>
          <Button
            variant="warning"
            size="lg"
            block
            className="Stopwatch-button"
            onClick={this.resetCounter}
          >
            Reset
          </Button>
        </ButtonGroup>
      );
    } else {
      buttons = (
        <ButtonGroup className="Stopwatch-button-group">
          <Button
            variant="danger"
            size="lg"
            block
            className="Stopwatch-button"
            onClick={this.stopCounter}
          >
            Stop
          </Button>
          <Button
            variant="warning"
            size="lg"
            block
            className="Stopwatch-button"
            onClick={this.resetCounter}
          >
            Reset
          </Button>
        </ButtonGroup>
      );
    }

    return (
      <div className="Stopwatch">
        <Form className="Stopwatch-display">
          <FormGroup controlId="formStopwatch">
            <div className="Stopwatch-time">
              <span className="Stopwatch-number">
                {this.leadingZero(this.getHours())}
              </span>
              <Separator />
              <span className="Stopwatch-number">
                {this.leadingZero(this.getMinutes())}
              </span>
              <Separator />
              <span className="Stopwatch-number">
                {this.leadingZero(this.getSeconds())}
              </span>
            </div>
          </FormGroup>
          <FormGroup>{buttons}</FormGroup>
        </Form>
      </div>
    );
  }

  leadingZero(num) {
    return num < 10 ? "0" + num : num;
  }
}

export default Stopwatch;
