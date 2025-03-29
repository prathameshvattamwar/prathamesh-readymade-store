const products = [
    {
      name: "Kids Cotton T-shirt",
      image: "http://localhost:5000/images/kids-cotton-tshirt.jpg",
      description: "Premium quality cotton t-shirt for kids with comfortable fit and vibrant colors that last long. Perfect for daily wear and special occasions.",
      brand: "Prathamesh Kids",
      category: "Kids Clothing",
      price: 499,
      countInStock: 50,
      rating: 4.5,
      numReviews: 24,
      colors: ["Blue", "Red", "Green", "Yellow"],
      sizes: ["XS", "S", "M", "L", "XL"],
      isFeatured: true,
      isNewArrival: true,
      onSale: true,
      salePrice: 399
    },
    {
      name: "Leather Belt for Men",
      image: "http://localhost:5000/images/leather-belt-for-men.jpg",
      description: "Genuine leather belt with classic design. Durable and stylish, perfect for formal and casual wear.",
      brand: "Prathamesh Leather",
      category: "Leather Products",
      price: 699,
      countInStock: 35,
      rating: 4.2,
      numReviews: 18,
      colors: ["Brown", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      isFeatured: true,
      isNewArrival: false,
      onSale: false,
      salePrice: 0
    },
    {
      name: "Cotton Socks (Pack of 3)",
      image: "http://localhost:5000/images/cotton-socks.jpg",
      description: "Comfortable cotton socks for everyday use. Comes in a pack of 3 pairs with assorted colors.",
      brand: "Prathamesh Essentials",
      category: "Socks",
      price: 249,
      countInStock: 100,
      rating: 4.0,
      numReviews: 32,
      colors: ["Assorted"],
      sizes: ["Free Size"],
      isFeatured: false,
      isNewArrival: true,
      onSale: false,
      salePrice: 0
    },
    {
      name: "Sports Cap",
      image: "http://localhost:5000/images/sports-cap.jpg",
      description: "Lightweight and breathable sports cap with adjustable strap. Perfect for outdoor activities and sports.",
      brand: "Prathamesh Sports",
      category: "Caps",
      price: 349,
      countInStock: 45,
      rating: 4.3,
      numReviews: 15,
      colors: ["Black", "Blue", "Red", "White"],
      sizes: ["Free Size"],
      isFeatured: true,
      isNewArrival: false,
      onSale: false,
      salePrice: 0
    },
    {
      name: "Men's Boxer Shorts",
      image: "http://localhost:5000/images/men's-boxer-shorts.jpg",
      description: "Comfortable and breathable boxer shorts for men. Made with high-quality cotton material.",
      brand: "Prathamesh Innerwear",
      category: "Inner Wear",
      price: 399,
      countInStock: 60,
      rating: 4.4,
      numReviews: 27,
      colors: ["Black", "Grey", "Navy Blue"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      isFeatured: false,
      isNewArrival: true,
      onSale: false,
      salePrice: 0
    },
    {
      name: "School Backpack",
      image: "http://localhost:5000/images/school-backpack.jpg",
      description: "Durable and spacious school backpack with multiple compartments. Perfect for students of all ages.",
      brand: "Prathamesh Bags",
      category: "Bags",
      price: 999,
      countInStock: 25,
      rating: 4.7,
      numReviews: 42,
      colors: ["Blue", "Black", "Red"],
      sizes: ["Medium", "Large"],
      isFeatured: true,
      isNewArrival: true,
      onSale: true,
      salePrice: 799
    }
  ];
  
  module.exports = products;