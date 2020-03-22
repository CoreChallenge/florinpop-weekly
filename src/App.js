import React from "react";
import Axios from "axios";
import "./styles.css";

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.getCountryData = this.getCountryData.bind(this);
    }
    
    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        
            const resApi = await Axios.get("https://covid19.mathdro.id/api");
            const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
            const countries = Object.keys(resCountries.data.countries);
            this.setState({
                confirmed: resApi.data.confirmed.value,
                recovered: resApi.data.recovered.value,
                deaths: resApi.data.deaths.value,
                countries
            });
        
    }

    async getCountryData(e){
        
        if (e.target.value === "Worldwide") {
            return this.getData();
        }

        try {
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
            this.setState({
                confirmed: res.data.confirmed.value,
                recovered: res.data.recovered.value,
                deaths: res.data.deaths.value
            });
        }
        catch (err){
            if (err.response.status === 404)
                this.setState({
                    confirmed: "No data available",
                    recovered: "No data available",
                    deaths: "No data available"
                });
        }
    }

    renderCountryOptions(){
        return this.state.countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });
    }

    render() {
        return (
        <div className="main">
            
           <div class="nav">
                <input type="checkbox" id="nav-check"/>
                    <div class="nav-header">
                        <div class="nav-title">
                        CORVID 101
                        </div>
                    </div>
                    <div class="nav-btn">
                        <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                        </label>
                    </div>
          
                <div class="nav-links">
                    <a href="#home-section">Home</a>
                    <a href="#corvid">CORVID-19</a>
                    <a href="#contributor">Contributors</a>
                </div>
            </div>
            
            <header id="home-section">
                <div className="container">
                    <h1>Stats Overview: </h1>
                    <select class="dropdown" onChange={this.getCountryData}>
                        <option>Worldwide</option>
                        {this.renderCountryOptions()}
                    </select>
                    <div className="flex">
                        <div className="box confirmed">
                            <h2>{this.state.confirmed}</h2>
                            <h4>Confirmed</h4>
                        </div>
                        <div className="box recovered">
                            <h2>{this.state.recovered}</h2>
                            <h4>Recovered</h4>
                        </div>
                        <div className="box deaths">
                            <h2>{this.state.deaths}</h2>
                            <h4>Deaths</h4>
                        </div>
                    </div>
                </div>
            </header>

            <section id="corvid">
                <h2>Corona Virus 
                    &nbsp;<span class="gradient-text-blue">Symptoms</span>
                </h2>
                <p>What do you know about the novel Coronavirus that is causing a health emergency? 

Coronaviruses (CoV) are a large family of viruses that cause illness ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS-CoV) and Severe Acute Respiratory Syndrome (SARS-CoV). A novel coronavirus (nCoV) is a new strain that has not been previously identified in humans.  </p>
                <div class="container-section">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/mOV1aBVYKGA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe></div>
            </section>
            <section id="contributor">
                <h2>Contributors</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>
            </section>
            <footer>Made with #l0v3 by Core_2_Duo </footer>
        </div>
        );
    }
}