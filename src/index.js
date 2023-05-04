import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { tiledata } from './tiledata';

class Square extends React.Component {
  render() {
    const classes = 'square' + (this.props.isBlue ? ' blue' : '');
    return (
      <button className={classes}>
        {this.props.children}
      </button>
    );
  }
}

class TileData extends React.Component {
  render() {
    const { tile } = this.props;
    return (
      <div className="tile-data">
        <img src={tile.image} alt={tile.title} />
        <h2>{tile.title}</h2>
        <p>{tile.text}</p>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerPosition: 5,
      showTileData: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(direction) {
    let newPosition = this.state.playerPosition;
    switch (direction) {
      case "left":
        newPosition = this.state.playerPosition > 0 ? this.state.playerPosition - 1 : 0;
        break;
      case "up":
        newPosition = this.state.playerPosition > 7 ? this.state.playerPosition - 10 : this.state.playerPosition;
        break;
      case "right":
        newPosition = this.state.playerPosition < 95 ? this.state.playerPosition + 1 : 95;
        break;
      case "down":
        newPosition = this.state.playerPosition < 88 ? this.state.playerPosition + 10 : this.state.playerPosition;
        break;
      default:
        break;
    }
    const showTileData = newPosition === 1;
    this.setState({ playerPosition: newPosition, showTileData });
  }

  renderSquare(i) {
    const isBlue = i === this.state.playerPosition;
    return (
      <Square key={i} isBlue={isBlue} />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < 8; i++) {
      const squares = [];
      for (let j = 0; j < 10; j++) {
        const squareIndex = i * 10 + j;
        squares.push(this.renderSquare(squareIndex));
      }
      rows.push(<div key={i} className="board-row">{squares}</div>);
    }
    const { showTileData } = this.state;
    return (
      <div>
        <div className="board-container">
          {rows}
        </div>
        <div className="button-row">
          <button className="button" onClick={() => this.handleButtonClick("left")}>
            Left
          </button>
          <button className="button" onClick={() => this.handleButtonClick("up")}>
            Up
          </button>
          <button className="button" onClick={() => this.handleButtonClick("right")}>
            Right
          </button>
          <button className="button" onClick={() => this.handleButtonClick("down")}>
            Down
          </button>
        </div>
        {showTileData && <TileData tile={tiledata[1]} />}
      </div>
    );
  }
  
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
