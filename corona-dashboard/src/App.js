import  { Component } from 'react'
import  { Box, Typography, withStyles } from '@material-ui/core';
import logo from './images/COVID19.jpg';
import Cards from './components/Cards';
import Countries from './components/Countries';
import Chart from './components/Chart';
import { fetchData } from './service/api';

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    background: 'Black',
    width: 400,
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: '#787'
  },
  lastUpdated: {
    color: '#787',
    fontSize: 12
  }
}

class App extends Component{

  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data: fetchedData})
    console.log(fetchedData);
  }

  handleCountryChange = async(country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country})
    console.log(fetchedData);
  }


  render(){
    const { data } = this.state;
    return (
      <Box className={this.props.classes.container}> 
        <Box className={this.props.classes.header}>CORONAVIRUS TRACKER</Box>
        <Typography className={this.props.classes.lastUpdated}>Last Updated: {data.lastUpdate && new Date(data.lastUpdate).toDateString()}</Typography>
        <img style={{width:350}} src={logo} alt="covid"/>
        <Cards data={data} />
        <Countries handleCountryChange={this.handleCountryChange} />
        <Chart data={data} />
      </Box>
    )
  }
}

export default withStyles(style)(App);