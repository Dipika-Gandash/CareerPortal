import React from 'react'
import Hero from '@/components/layout/Hero';
import SearchBar from '@/components/layout/SearchBar';
import FeaturedJobs from '@/components/layout/FeaturedJobs';
import Categories from '@/components/layout/Categories';
import WhyChooseUs from '@/components/layout/WhyChooseUs';

const HeroPage = () => {
  return (
    <div>
        <Hero />
        <SearchBar />
        <FeaturedJobs />
        <Categories />
        <WhyChooseUs />
      
    </div>
  )
}

export default HeroPage;