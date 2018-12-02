import React, { Component } from 'react'
import styled from 'styled-components'
import db from './db'

const Container = styled.div`
  text-align: center;
  margin-top: 60px;
`

const Title = styled.div`
  text-align: center;
  background: #e5e6e8;
  color: #4b4b4b;
  padding: 20px 0;
  position: fixed;
  width: 100vw;
  top: 0;
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
  padding: 20px 40px;
  border-radius: 5px;
  background: #666666;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  border: 0;
  cursor: pointer;
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
    if (budget) {
      mobiles = mobiles.filter(mobile => {
        const { price } = mobile
        if (budget === '>30000' && price > 30000)
          return true
        else if (budget === '15,000-30,000' && price >= 15000 && price <= 30000)
          return true
        else if (budget === '<15,000' && price < 15000)
          return true
        else
          return false
      })
    }
    if (purpose) {
      mobiles = mobiles.filter(mobile => {
        const { suitable } = mobile
        if (purpose === 'call')
          return true
        else if (suitable.includes(purpose))
          return true
        else
          return false
      })
    }
    if (size) {
      mobiles = mobiles.filter(mobile => {
        const { displayDiagonal } = mobile
        if (size === 'small' && displayDiagonal < 5)
          return true
        else if (size === 'medium' && displayDiagonal >= 5 && displayDiagonal <= 6)
          return true
        else if (size === 'large' && displayDiagonal > 6)
          return true
        else
          return false
      })
    }
    if (touchscreen) {
      mobiles = mobiles.filter(mobile => {
        if (touchscreen === 'yes' && mobile.touchscreen)
          return true
        else if (touchscreen === 'no' && !mobile.touchscreen)
          return true
        else
          return false
      })
    }
    return <div style={{ padding: `10px 10%` }}> {mobiles.length > 0 ?
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '18px' }}>There are <b style={{ color: 'red' }}>{mobiles.length}</b> mobile phones that recommended for you.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            mobiles.map(mobile =>
              <div style={{ padding: '20px 40px', margin: 'auto', marginTop: '40px' }}>
                <b>{mobile.name}</b><br /><br />
                <div style={{ textAlign: 'left' }}>
                  <b>Price:</b> {mobile.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Baht<br />
                  <b>Brand:</b> {mobile.brand}<br />
                  <b>Platform:</b> {mobile.platform}<br />
                  <b>Display size:</b> {mobile.displayDiagonal} inches<br />
                  <b>Display resolution:</b> {mobile.displayResolution}<br />
                  <b>Touchscreen:</b> {mobile.touchscreen ? 'Yes' : 'No'}<br />
                  <b>Camera resolution:</b> {mobile.cameraFront ? `${mobile.cameraFront} Million Pixels` : 'No camera'}<br />
                  <b>RAM:</b> {mobile.ram} GB<br />
                  <b>CPU clock speed:</b> {mobile.cpuClockSpeed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MHz<br />
                </div>
              </div>
            )
          }
        </div>
      </div>
      : 'There is no mobile phone suit for you for now.'
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
            <Question>Which screen size would you like ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="size" value="small" /> Small <br />
              <input onChange={this.onChange} type="radio" name="size" value="medium" /> Medium <br />
              <input onChange={this.onChange} type="radio" name="size" value="large" /> Large <br />
            </Answers>
            <Question>What's your budget ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="budget" value=">30000" /> More than 30,000 Baht<br />
              <input onChange={this.onChange} type="radio" name="budget" value="15,000-30,000" /> Between 15,000 to 30,000 Baht<br />
              <input onChange={this.onChange} type="radio" name="budget" value="<15,000" /> Less than 15,000 Baht<br />
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
            <Question>Would you like buttons or touchscreen ?</Question>
            <Answers>
              <input onChange={this.onChange} type="radio" name="touchscreen" value="yes" /> Touchscreen <br />
              <input onChange={this.onChange} type="radio" name="touchscreen" value="no" /> Buttons <br />
            </Answers>
          </div> :
          this.getResult()
        }
        <hr style={{ marginBottom: '20px', borderWidth: `0.5px`, borderColor: '#e5e6e8' }} />
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
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
