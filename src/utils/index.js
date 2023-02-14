const Utils = {
    getLineChartData: (countries, startDate, endDate) => {
      return countries
        .filter((countryData) => countryData.isChecked)
        .map((countryData) => {
          const data = countryData.records
            .filter((record) => record.day >= startDate && record.day <= endDate)
            .map((record) => ({ x: record.day, y: record.new }));
          return { id: countryData.country, data };
        });
    },
  
    getMostAffectedCountry: (countries, startDate, endDate) => {
      return countries
      .filter((countryData) => countryData.isChecked)
      .reduce((mostAffectedCountry, countryData) => {
        const currentCountryTotalAffected = countryData.records
          .filter((record) => record.day >= startDate && record.day <= endDate)
          .reduce((sum, record) => sum + record.new, 0);
        if (currentCountryTotalAffected > mostAffectedCountry.totalAffected) {
          return { country: countryData.country, totalAffected: currentCountryTotalAffected };
        } else {
          return mostAffectedCountry;
        }
      }, { country: "", totalAffected: 0 })
      .country;
    },
  
    getPieChartData: (countries, startDate, endDate) => {
  
      if ("" !== Utils.getMostAffectedCountry(countries, startDate, endDate)) {
        let x = 0;
        let y = 0;
        let z = 0;
        let countryData = countries
          .filter(c => c.country === Utils.getMostAffectedCountry(countries, startDate, endDate));
  
        countryData[0].records.forEach(record => {
          if (record.day >= startDate && record.day <= endDate) {
            x += record.new;
            y += record.death;
            z += record.recovered;
          }
        }
        );
  
        return [
          {
            id: "new",
            label: "New Case",
            value: x
          },
          {
            id: "death",
            label: "Deaths",
            value: y
          },
          {
            id: "recovery",
            label: "Recoveries",
            value: z
          }
        ];
      }
      return [];
    }
  }
  
  export default Utils;
  