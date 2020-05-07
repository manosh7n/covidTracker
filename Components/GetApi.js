export default class GetApi {
  url = '';
  state = {};
  flatDate = [];

  constructor() {
    this.url = `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-01-01/${this.getCurrentDate()}`;
  }

  getCurrentDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  async getData() {
    try {
      console.log('getData(0)');
      var response = await fetch(this.url);
      console.log('getData(1)');
      var json = await response.json();
      console.log('getData(2)');
      this.state = {json: json.data};
      console.log('getData(3)');
    } catch (error) {
      alert('Error in getData() : ' + error);
    }
  }

  async flat(country) {
    console.log('flat(init)');
    if (this.state.json !== null) {
      var keys = Object.keys(this.state.json);
      keys.forEach(i => {
        var temp = this.state.json[i][country];
        this.flatDate.push(temp);
      });
      console.log('flat(2)');
    }
  }
}
