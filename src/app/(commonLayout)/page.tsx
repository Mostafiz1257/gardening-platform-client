"use client"
import { useState, useEffect } from "react";

import SearchPage from "@/src/components/search/SearchPage";
import UserPost from "@/src/components/post/UserPost";
import { useGetAllPostQuery } from "@/src/redux/features/post";

const MainPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch posts using Redux Toolkit Query with search and sort parameters
  const { data, isLoading } = useGetAllPostQuery({ search: searchValue, sortBy });

  // Handle search input
  const handleSearch = (searchText) => {
    setSearchValue(searchText); // Update search value
  };

  // Handle sorting input
  const handleSort = (sortOption) => {
    setSortBy(sortOption); // Update sorting option
  };

  return (
    <div>
      {/* Pass search and sort handling to SearchPage */}
      <SearchPage onSearch={handleSearch} onSort={handleSort} />

      {/* Pass fetched posts and loading state to UserPost */}
      <UserPost posts={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default MainPage;
