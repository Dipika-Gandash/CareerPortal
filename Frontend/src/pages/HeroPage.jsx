import React from 'react'
import Hero from '@/components/layout/Hero';
import SearchBar from '@/components/layout/SearchBar';
import FeaturedJobs from '@/components/layout/FeaturedJobs';
import Categories from '@/components/layout/Categories';

const HeroPage = () => {
  return (
    <div>
        <Hero />
        <SearchBar />
        <FeaturedJobs />
        <Categories />
    </div>
  )
}

export default HeroPage;