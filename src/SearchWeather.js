function SearchWeather({ searchValue, setSearchValue, fetchWeather }) {
  return (
    <div className="searchWeather">
      <input type="text" id="searchField" placeholder="Search City" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
}

export default SearchWeather;
