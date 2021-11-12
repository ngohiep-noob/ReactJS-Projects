const modeOne = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
const modeTwo = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

const modeOff = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: '',
      url: '#'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: '',
      url: '#'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: '',
      url: '#'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: '',
      url: '#'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: '',
      url: '#'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: '',
      url: '#'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: '',
      url: '#'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: '',
      url: '#'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: '',
      url: '#'
    }
  ];
var volume = 0.35;
class DrumPad extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    var elem = e.target,
        screen = document.getElementById('display-content');
    elem.classList.add('play');
    elem.children[1].volume = volume;
    elem.children[1].play();
    elem.children[1].currentTime = 0;
    screen.innerHTML = elem.id.split('-').join(' ');
    setTimeout(
      () => elem.classList.remove('play'),
      100
    )
  }
  
  render() {
      return(
          <div className="drum-pad" onClick={this.handleClick} id={this.props.id}>
              <h4>{this.props.keyTrigger}</h4>

              <audio 
              src={this.props.url}
              id={this.props.keyTrigger}
              className="clip"
              ></audio>

          </div>   
      )
  }
}

class FullDrumPad extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var listString = this.props.mode.map(elem => {
      return <DrumPad keyTrigger={elem.keyTrigger} url={elem.url} id={elem.id}/>
    });
    
    return(
      <div id="full-pad"> 
        {listString}
      </div>
    )
  }
}

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      power: true,
      bank: true, 
      lastMode: [...modeOne],
      volume: 0.35
    }
  }
  handleToggle(e) {
    if(e.target.parentElement.id == 'power') {
      this.setState(state => ({
          power: !state.power
      }))
      if(!this.state.power) {
        //Power On
        e.target.style.float = 'right'
        this.props.changeMode(this.state.lastMode)
      } else {
        //Power Off
        e.target.style.float = 'left'
        document.getElementById('display-content').innerHTML = ''
        this.props.changeMode(modeOff)
      }
    } else if(this.state.power) {
      this.setState(state => ({
          bank: !state.bank
      }))
      if(!this.state.bank) {
        e.target.style.float = 'right';
        this.props.changeMode(modeOne);
        this.setState({
          lastMode: [...modeOne]
        })
        document.getElementById('display-content').innerHTML = 'Heater Kit'
      } else {
        e.target.style.float = 'left'   
        this.props.changeMode(modeTwo);
        this.setState({
          lastMode: [...modeTwo]
        })
        document.getElementById('display-content').innerHTML = 'Smooth Piano Kit'
      }   
    }; 
  }
  handleChange(e) {
    this.setState({
      volume: e.target.value
    })
    document.getElementById('display-content').innerHTML = 'Volume: ' + Math.floor(e.target.value * 100);
    setTimeout(
      () => document.getElementById('display-content').innerHTML = '', 1000
    )
    volume = e.target.value;
  }
  render() {
    return(
      <div id="controls-panel">
        <div className='control'>
          <p>Power</p>
          <div className='select' id='power'>
            <div className="inner" onClick={this.handleToggle}></div>
          </div>
        </div>

        <div id='display'>
          <p id='display-content'></p>
        </div>

        <div id="volume">
            <input type='range' max="1" min="0" step="0.01" value={this.state.volume} id="volume-slider" onInput={this.handleChange}></input>
        </div>

        <div className='control'>
            <p>Bank</p>
            <div className='select' id='bank'>
              <div className="inner" onClick={this.handleToggle}></div>
            </div>
        </div>
      </div>
    )
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: [...modeOne]
    }
    this.changeMode = this.changeMode.bind(this)
  }
  changeMode(newMode) {
    this.setState({
      mode: [...newMode]
    })
  }
  render() {
      return(
          <div id="drum-machine">
              <FullDrumPad mode={this.state.mode} />
              <ControlPanel  changeMode={this.changeMode}/>
              <footer>by <a href="https://codepen.io/Ngohiep" target="_blank">NgoHiep</a></footer>
          </div>
      )
  }
}

window.addEventListener('keydown',e => {
    const key = e.key.toUpperCase(),
          audio = document.getElementById(key);
    audio.volume = volume;
    audio.play();
    audio.currentTime = 0;
    document.getElementById('display-content').innerHTML = audio.parentElement.id.split('-').join(' ');
    audio.parentElement.classList.add('play')
    setTimeout(() => {
      audio.parentElement.classList.remove('play')
    }, 100)
})

  
ReactDOM.render(<App />, document.getElementById('root'))