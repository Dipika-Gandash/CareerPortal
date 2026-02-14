import React from 'react'
import Hero from '@/components/layout/Hero';
import SearchBar from '@/components/layout/SearchBar';
import FeaturedJobs from '@/components/layout/FeaturedJobs';

const HeroPage = () => {
  return (
    <div>
        <Hero />
        <SearchBar />
        <FeaturedJobs />
    </div>
  )
}

export default HeroPage;