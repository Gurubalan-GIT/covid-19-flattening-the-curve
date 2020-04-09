// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // })

  api.loadSource(async actions => {
    const { data } = await axios.get('https://corona.lmao.ninja/all')

    const collection = actions.addCollection('GlobalData')

    collection.addNode({
      title: 'This returns global data',
      fullData: data
    })
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('https://pomber.github.io/covid19/timeseries.json')

    const collection = actions.addCollection('CountriesData');

    // let formattedCountryObject = {};
    // (Object.keys(data)).forEach((country) => {
    //   let formattedCountryName = country.replace(/[()',*]/g, " ")
    //   console.log(formattedCountryName)
    //   formattedCountryObject[formattedCountryName] = data[country]
    // })

    collection.addNode({
      title: 'This returns countries data',
      fullData: JSON.stringify(data)
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}