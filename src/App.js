import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
      </ul>
      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/friends' component={Friends} />
    </div>
  </BrowserRouter>
)

const FRIENDS = [
  {
    id: 'serval',
    nameJa: 'サーバル',
    nameEn: 'Serval Cat',
    family: 'ネコ目ネコ科ネコ属'
  },
  {
    id: 'raccoon',
    nameJa: 'アライグマ',
    nameEn: 'Common raccoon',
    family: 'ネコ目アライグマ科アライグマ属'
  },
  {
    id: 'fennec',
    nameJa: 'フェネック',
    nameEn: 'Fennec',
    family: 'ネコ目イヌ科キツネ属'
  }
]

const friendById = id => FRIENDS.find(friend => friend.id === id)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
)
const About = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票するページです</p>
  </div>
)
/* const Friends = () => (
  <div>
    <h2>Friends</h2>
    <Route exact path='/friends' component={FriendList} />
    <Route exact path='/friends/:id' component={Friend} />
  </div>
) */

class Friends extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    FRIENDS.forEach(friend => {
      console.log(friend);
      this.setState({
        ...this.state,
        [friend.id]: 0
      })
    })
  }

  handleVote = (id) => {
    this.setState({
      [id]: this.setState[id] + 1
    })
  }

  render() {
    return (
      <div>
        <h2>Friends</h2>
        <Route exact path='/friends' render={props => <FriendList handleVote={this.handleVote} />} />
        <Route path='/friends/:id' render={props => <Friend match={props.match} votes={this.state} />} />
      </div>
    )
  }
}

const FriendList = props => (
  <div>
    {FRIENDS.map(friend => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
        <button onClick={() => {
          props.handleVote(friend.id)
          console.log(props, friend.id);
        }}>+</button>
      </li>
    ))}
  </div>
)

const Friend = (props) => {
  const { id } = props.match.params
  const friend = friendById(id)
  const vote = props.votes[id]
  if (typeof friend === 'undefined') {
    return (
      <div>
        <p>{id}番のフレンドは見つからなかったよ？？</p>
      </div>
    )
  }
  const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
  const contentStyle = { margin: 0 }
  return (
    <div>
      <div style={containerStyle}>
        <p style={contentStyle}>{friend.family}</p>
        <h1 style={contentStyle}>{friend.nameJa}</h1>
        <p style={contentStyle}>{friend.nameEn}</p>
      </div>
      <h1>投票数：{vote}</h1>
    </div>
  )
}

export default App
