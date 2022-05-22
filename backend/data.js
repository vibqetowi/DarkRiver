import bcrypt from "bcryptjs";

const data = {
  aisles: [
    {
      slug: "Shirts",
      image: "/images/shirts.jpg",
    },
    {
      slug: "Pants",
      image: "/images/pants.jpg",
    },
  ],

  users: [
    {
      name: "Admin",
      email: "admin@darkriver.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John Doe",
      email: "johndoe@dmail.com",
      password: bcrypt.hashSync("jd123456"),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "White Dress Shirt",
      slug: "B009ESZFFO",
      category: "Shirts",
      image: "/images/white-dress-shirt-main.jpeg",
      image0: "/images/white-dress-shirt-0.jpeg",
      image1: "/images/white-dress-shirt-1.jpeg",
      price: 30.25,
      countInStock: 10,
      brand: "van Heusen",
      rating: 4.5,
      numRatings: 12283,
      description: `-65% Polyester, 35% Cotton Button closure 
      \n- Machine Wash Wrinkle Free: Developed for less wrinkles and easy care
      \n- Regular Fit: A generous cut through the shoulders, chest and waist for total comfort and a classic fit. This fit is similar to a full cut fit.
      \n- Point Collar: Classic collar thought to lengthen the face & allows for tie knot variety; can be worn with or without neckwear.
      \n- Adjustable Cuff: Two button positions allow for a more customized, improved fit.
      \n- Chest Pocket: Classic design holds all your essentials. \n- For big fit, search style number 20F9562. For tall fit, search style number 20F9563.`,
      isBestSeller:true
    },
    {
      name: "Placeholder0",
      slug: "pink-check-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 1.25,
      countInStock: 0,
      brand: "chinaGeneric",
      rating: 4.0,
      numRatings: 12,
      description: "placeholder",
    },
    {
      name: "Placeholder1",
      slug: "khaki-chinos",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 1.25,
      countInStock: 15,
      brand: "chinaGeneric",
      rating: 4.5,
      numRatings: 14,
      description: "placeholder",
    },
    {
      name: "Placeholder2",
      slug: "grey-chino",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 1,
      countInStock: 5,
      brand: "chinaGeneric",
      rating: 4.5,
      numRatings: 7,
      description: "placeholder",
    },
  ],
};
export default data;
