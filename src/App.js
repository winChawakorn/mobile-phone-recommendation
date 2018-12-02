import React, { Component } from 'react'
import styled from 'styled-components'
import db from './db'

const Container = styled.div`
  text-align: center;
`

const Title = styled.div`
  text-align: center;
  background: #e5e6e8;
  color: #4b4b4b;
  padding: 20px 0;
`

const Question = styled.div`
  padding: 20px 0;
  border-top: 1px solid #e5e6e8;
`

const Answers = styled.div`
  margin: auto;
  text-align: left;
  max-width: 300px;
  padding-bottom: 20px;

  & > input {
    margin: 10px 0;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  background: #ddeaff;
  font-size: 16px;
  margin-bottom: 20px;
`

class App extends Component {
  state = {
    budget: '',
    purpose: '',
    size: '',
    touchscreen: '',
    submit: false,
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getResult = () => {
    let mobiles = db
    const { budget, purpose, size, touchscreen } = this.state
    mobiles = mobiles.filter(mobile => {
      const { price } = mobile
      if (budget) {
        if (budget === '>30000' && price > 30000)
          return true
        else if (budget === '15,000-30,000' && price >= 15000 && price <= 30000)
          return true
        else if (budget === '<15,000' && price < 15000)
          return true
        else
          return false
      }
      return true
    })
    mobiles = mobiles.filter(mobile => {
      const { suitable } = mobile
      if (purpose) {
        if (purpose === 'call')
          return true
        else if (suitable.includes(purpose))
          return true
        else
          return false
      }
      return true
    })
    mobiles = mobiles.filter(mobile => {
      const { displayDiagonal } = mobile
      if (size) {
        if (size === 'small' && displayDiagonal < 5)
          return true
        else if (size === 'medium' && displayDiagonal >= 5 && displayDiagonal <= 6)
          return true
        else if (size === 'large' && displayDiagonal > 6)
          return true
        else
          return false
      }
      return true
    })
    mobiles = mobiles.filter(mobile => {
      if (touchscreen) {
        if (touchscreen === 'yes' && mobile.touchscreen)
          return true
        else if (touchscreen === 'no' && !mobile.touchscreen)
          return true
        else
          return false
      }
      return true
    })
    return <div style={{ padding: '10px 0' }}> {mobiles.length > 0 ?
      mobiles.map(mobile =>
        <div style={{ padding: '10px 0' }}>
          {mobile.name}
        </div>
      ) : 'No mobiles phone suit for you.'
    }
    </div>
  }

  render() {
    return (
      <Container>
        <Title>
          Mobile phone recommendation
        </Title>
        {!this.state.submit ?
          <div>
            <Question>What's your budget ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="budget" value=">30000" /> More than 30,000 <br />
              <input onChange={this.onChange} type="radio" name="budget" value="15,000-30,000" /> 15,000 - 30,000 <br />
              <input onChange={this.onChange} type="radio" name="budget" value="<15,000" /> Less than 15,000 <br />
            </Answers>
            <Question>What is your main purpose for mobile phone ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="purpose" value="game" /> Play games <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="dev" /> Develop mobile applications <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="movie" /> Watch Movies <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="music" /> Listening to musics <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="design" /> Design <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="social" /> Social network <br />
              <input onChange={this.onChange} type="radio" name="purpose" value="call" /> Call <br />
            </Answers>
            <Question>Which screen size would you like ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="size" value="small" /> small <br />
              <input onChange={this.onChange} type="radio" name="size" value="medium" /> medium <br />
              <input onChange={this.onChange} type="radio" name="size" value="large" /> large <br />
            </Answers>
            <Question>Would you like buttons or touchscreen ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="touchscreen" value="yes" /> Touchscreen <br />
              <input onChange={this.onChange} type="radio" name="touchscreen" value="no" /> Buttons <br />
            </Answers>
          </div> :
          this.getResult()
        }
        <Button
          onClick={() => {
            let state = {}
            if (this.state.submit) {
              state = {
                budget: '',
                purpose: '',
                size: '',
                touchscreen: '',
              }
            }
            this.setState({
              ...state,
              submit: !this.state.submit
            })
          }}
        >{!this.state.submit ? 'Submit' : 'Try again'}
        </Button>
      </Container>
    );
  }
}

export default App;
