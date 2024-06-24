import { Container, VStack, Heading, SimpleGrid, Box, Image, Text, Button, Input, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    rating: 4.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    rating: 4.7,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stylish smartwatch with health tracking",
    price: 199,
    category: "Wearables",
    rating: 4.2,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    category: "Accessories",
    rating: 4.3,
    image: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleRatingChange = (values) => {
    setSelectedRatings(values);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPriceRange = selectedPriceRange ? (
      (selectedPriceRange === "0-200" && product.price <= 200) ||
      (selectedPriceRange === "201-500" && product.price > 200 && product.price <= 500) ||
      (selectedPriceRange === "501-1000" && product.price > 500 && product.price <= 1000)
    ) : true;
    const matchesRating = selectedRatings.length ? selectedRatings.includes(String(Math.floor(product.rating))) : true;

    return matchesSearchQuery && matchesCategory && matchesPriceRange && matchesRating;
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Electronics Store</Heading>
        <Input
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          mb={8}
        />
        <Select placeholder="Select category" onChange={handleCategoryChange} mb={8}>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Accessories">Accessories</option>
        </Select>
        <Select placeholder="Select price range" onChange={handlePriceRangeChange} mb={8}>
          <option value="0-200">$0 - $200</option>
          <option value="201-500">$201 - $500</option>
          <option value="501-1000">$501 - $1000</option>
        </Select>
        <CheckboxGroup onChange={handleRatingChange} mb={8}>
          <Stack direction="row">
            <Checkbox value="4">4 Stars & Up</Checkbox>
            <Checkbox value="3">3 Stars & Up</Checkbox>
            <Checkbox value="2">2 Stars & Up</Checkbox>
            <Checkbox value="1">1 Star & Up</Checkbox>
          </Stack>
        </CheckboxGroup>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.image} alt={product.name} mb={4} />
              <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>${product.price}</Text>
              <Button colorScheme="teal">Add to Cart</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;