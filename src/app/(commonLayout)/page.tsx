"use client";
import { useState } from "react";

import SearchPage from "@/src/components/search/SearchPage";
import UserPost from "@/src/components/post/UserPost";
import { useGetAllPostQuery } from "@/src/redux/features/post";

const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch posts using Redux Toolkit Query with search and sort parameters
  const { data, isLoading } = useGetAllPostQuery({
    search: searchValue,
    sortBy,
  });

  // Handle search input
  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
  };

  // Handle sorting input
  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className='relative'>
      {/* Fixed search bar */}
      <div className='fixed top-0 left-0 w-full z-10 bg-black shadow-md'>
        <SearchPage onSearch={handleSearch} onSort={handleSort} />
      </div>

      {/* Padding-top to prevent content overlap with fixed header */}
      <div className='pt-5'>
        {" "}
        {/* Adjust `pt-20` or `pt-24` to match the height of your fixed header */}
        <UserPost isLoading={isLoading} posts={data?.data} />
      </div>
    </div>
  );
};

export default MainPage;
