const url = `https://pomber.github.io/covid19/timeseries.json`;

export default class GetApi {
  data = {json: {}};
  confirmed = new Map();
  deaths = new Map();
  date = new Map();

  async getData() {
    try {
      var response = await fetch(url);
      var json = await response.json();
      this.data = {json: json};
      Object.keys(this.data.json).forEach(i => {
        var tempConf = [];
        var tempDeath = [];
        var tempDate = [];
        Object.values(this.data.json[i]).forEach(j => {
          tempConf.push(j.confirmed);
          tempDeath.push(j.deaths);
          tempDate.push(j.date);
        });
        this.confirmed.set(i, tempConf);
        this.deaths.set(i, tempDeath);
        this.date.set(i, tempDate);
      });
    } catch (error) {
      alert('Error in getData() : ' + error);
    }
  }
}
