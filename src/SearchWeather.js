function SearchWeather(props) {
  const { setSearchBtn } = props;
  return (
    <div className="searchWeather">
      <input type="text" id="searchField" placeholder="Search City" />
      <button onClick={() => setSearchBtn(true)}>Search</button>
    </div>
  );
}

export default SearchWeather;
