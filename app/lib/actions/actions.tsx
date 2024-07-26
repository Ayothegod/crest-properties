function filterProperties(properties: Property[], filters: Filters): Property[] {

    return properties.filter(property => {
      const matchesLocation = !filters.location || property.location.includes(filters.location);
      const matchesArea = !filters.area || property.area.includes(filters.area);
      const matchesKeywords = !filters.keywords || filters.keywords.every(keyword => property.keywords.includes(keyword));
      const matchesPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;
      const matchesMinPrice = filters.minPrice === undefined || property.price >= filters.minPrice;
      const matchesMaxPrice = filters.maxPrice === undefined || property.price <= filters.maxPrice;
      const matchesFeatures = !filters.features || filters.features.every(feature => property.features.some(f => f.name === feature));
      const matchesType = !filters.type || property.type === filters.type;
      const matchesPayment = !filters.payment || property.payment === filters.payment;
  
      return matchesLocation && matchesArea && matchesKeywords && matchesPropertyType && matchesMinPrice && matchesMaxPrice && matchesFeatures && matchesType && matchesPayment;
    });
  }
  

