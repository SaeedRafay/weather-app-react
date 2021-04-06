const KelvinToCelcius = (temp) => {
  const kTemp = parseFloat(temp);
  return Math.round(kTemp - 273.15);
};

export default KelvinToCelcius;
