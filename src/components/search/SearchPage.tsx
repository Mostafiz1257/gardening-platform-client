"use client"
import { useState } from 'react';

const SearchPage = ({ onSearch, onSort }) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchValue); // Pass the search value back to MainPage
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        onSort(e.target.value); // Pass the sort option back to MainPage
    };

    return (
        <div className="flex justify-center items-center  bg-black ">
            <form onSubmit={handleSearch} className="w-full max-w-sm  bg-black w-full">
                <div className="flex items-center border-b border-gray-500 py-2">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-full"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Sort dropdown */}
            <select
                value={sortOption}
                onChange={handleSortChange}
                className="ml-4 bg-black p-2 rounded"
            >
                <option value="">Sort By</option>
                <option value="like">Most Liked</option>
                <option value="dislike">Most Disliked</option>
                <option value="comments">Most Comments</option>
            </select>
        </div>
    );
};

export default SearchPage;
