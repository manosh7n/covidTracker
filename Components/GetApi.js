const url = `https://pomber.github.io/covid19/timeseries.json`;

export default class GetApi {
  data = {json: {}};

  async getData() {
    try {
      var response = await fetch(url);
      var json = await response.json();
      this.data = {json: json};
    } catch (error) {
      alert('Error in getData() : ' + error);
    }
  }
}
