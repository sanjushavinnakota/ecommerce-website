const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marketplace';
const mockProducts = [
  
    {
      id: '1',
      name: 'Bellavita SunScreen',
      category: 'FMCG',
      price: 25,
      para:'SPF 50 PA++++ Sunscreen ,Water Based Hydrating Sunscreen For Women & Men ,Pack of 2',
      location: 'Chennai',
      image: 'https://bellavitaorganic.com/cdn/shop/files/2_0caffd51-7dee-449b-ab16-536322d44d24.jpg?v=1740558398&width=1000',
    },
    {
      id: '2',
      name: 'Nobero Fashion Shirt',
      category: 'Fashion',
      price: 30,
      para:'Men Solid Round Neck Cotton Blend Black T-Shirt',
      location: 'Visakhapatnam',
      image: 'data:image/jpeg;base64,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',
    },
    {
      id: '3',
      name: 'Cedar Wood Organic Soap',
      category: 'FMCG',
      price: 7,
      para:'Cedarwood Handmade Bathing Bar Soap',
      location: 'kolkata',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1VYk81b797SSBcv6JTCQuJ2EQCU7n4hFLg&s',
    },
    {
      id: '4',
      name: 'Beyoung Huddy For Men',
      category: 'Fashion',
      para:"Trendy Classic Women's and Men's Hoodie Latest Trends Best Quality",
      price: 50,
      location: 'Hyderabad',
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcROZNZhMLXMUDBJiQFtjkjWIHrrLvf_04bnyqTnnfWfmnOSvL5jHi-E-j9oWzgptEp4wn2jwXVDr6CpFxRdJp_E85Wtlo5_gJG_RdYXvrONdoXHCq2AfNcCRg',
    },
    {
      id: '5',
      name: 'Lymio CLASSIC SUIT',
      category: 'Fashion',
      para:'Classic Black Slim Fit Suit Blazer ',
      price: 200,
      location: 'Delhi',
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSY2Wpu0Tq392za974lX_0wohNavfd35QGh_NBwvsBlRtN8IXjuMLjYQXSYLyUhH68iI1OI23nr9AuR9dgaGb06SRp_YyOeeYYS4Cyz76la',
    },
    {
      id: '6',
      name: 'Prestige 3-Burner Stove',
      category: 'Home Appliances',
      para:'Lifelong 3 burner stove top for kitchen',
      price: 100,
      location: 'Visakhapatnam',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUSERESEhAWFhgYFxUSFRUXEhYVGhUXGBcTGBcYHykiGRomHRYXITEhJykrLi4uFyIzODMsNyg5LisBCgoKDg0NFRAPFi8dHR0tKy0tLi0uLzctKy03Ky0vOC0tLSsyLysrLTItLSstKy0tLS8rLS02Ny0rLSstLTctLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABAYFBwECAwj/xABAEAACAQIEAgcEBwcCBwAAAAABAgADEQQSITEFQQYHEyJRYXEyQoGRFCNSYpKhsUNTcoKiwdEz4RVjk6Oys/D/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAaEQEBAQEAAwAAAAAAAAAAAAAAEQEhAhIx/9oADAMBAAIRAxEAPwDeMREBERAREQEREBERAREQEREBERAREQEREBERASHj+ICjvTqPe3sKCNTYC5IF78vOTJA4jwijiCDUD3HNKlROd9chF/jM+Wbuc0s7K8jxjR/qmplMv+vamrKw3Ui97G62NtR4EE+dLjPaZlXsla1kJfMpqkGysABpfwOwlc4xhmXG08PSACO2HUs4dyFanjWqNcn2vqKdibgG2hvY+TvSLM2ZaWEo1aqNiGUs1ZqYpAU1ANr9o1ZNBdjSsLEy586LVwHjP0lELUnpO1MMQ1iuYErURWB1KOLG9twecy01TwumThAMhoEoKg7RjTFNzjK5YVHa+VcqBTod9jeW/oBiGqUKmbKStZkzKSVcBEIYEquYd7QhQCAD5mizxEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBE4ZgBcmw85W+LdO+G4a4fEo7j3aN6jX8DkuB8SIFlian4r1xbjC4U+TYhrf0Jf/AMpTuK9POJ4m4bEtTU+7Q+rH4l739UDffE+MYbDC9evSpDlncAn0B1PwlQ4h1scOpm1MV6/iaaBV/wC4VJ+U0e2pLHVjqSdST4k84Ako+i+jvTXA46y0quWr+6q9yp8Bs38pMsU+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slxAREQEREBERAREQEREBNYdaPQHts2NwifXAXrUlH+qOdRQP2niPe9d9nxA+S8PV7PUa0zuOY+8P8SZXRKqWOqnYj9RNldanV+Rmx2CTxavRUb8zWQDnzZee41vfUVLE5Dcaodx4feH+IHdGGHPfNhf2rEo4+8Bcq48QCCN/GS8M9AjNTUG/NVy387kA/JWnOcEX0IPynhUx9NdAb+SyCdc+Q+H9z+oymcFwupNr6anceB+18bzDVuKMdtP1kKpiCdWPzMDO1eJoPZF/wAhINbiLtzsPKZTo/0H4nj7GjhnWmf2tb6qlbxBbVh/CDNndHupGglmx2Ias37ujenS9C/tt6jLKNL0Eeq4Smj1Kh2RFZ3Poq3Jl86P9UfEsTZq2TB0zzq9+r8Kan9WUze3BuB4TBpkwtClRXn2agFvNm3Y+ZJmRgUXo/1U8LwoBqUziqv28RZl+FMd0fInzlsq8GwrqithqDLT1RTTQqhG2UW035SdEDhQALAWA5DacxEBERAREQEREBERAREQEREBERAREQE0t1rdXPZ58bgk+rN2rUUHs8zVpge7zKjbcaXtumIHxlVG1jp+U9uHYCtiaq0aFNqtV/ZRBcmwufQAAm50n0P0h6ouGYur2q9rhmJu4w7KEYnc5XVgh/hsN7gzLdFur3h3Dana4em5r5SvaVKjs2U2vpfKL2GoAgat6O9SGLq2bG10w686dO1St6FvYU+mabR6OdXfC8BZqWHV6o/a1/rKl/EZtEP8IEtcQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/2Q==',
    },
    {
      id: '7',
      name: 'BOSCH Mixer',
      category: 'Electronics',
      para:"TrueMixx Pro 1000 W Mixer Grinder ",
      price: 150,
      location: 'Bangalore',
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSmxvWRZNnXny0ACIFNKtvymWvCsp_gthioT85cR0V7B8EZmHCwEesL2dDE0m3URS1aJ3QWFH-sde6olxALQY0u9GRgw0Z7EB-tiMDL8aJsxQQy2hmNFaWtBw',
    },
    {
      id: '8',
      name: 'Butterfly Home Blender',
      category: 'Electronics',
      para:"Turbo Switch for Fast Blending",
      price: 100,
      location: 'Chennai',
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTRbeibrVujeqc8xzW3E_o_d01Ley1paOsnuS-74A4ngzm_QNU1Hl_Rz5IN-7bIXD0qcNpYEIrQvrAZ8qwBQLAxAlx-twBR83q0W6WhYQMjvfpCINeAFsR3',
    },
    {
      id: '9',
      name: 'Philips Stream Iron Box',
      para:"Stream Iron Box with 1 year warrenty",
      category: 'Electronics',
      price: 49,
      location: 'Delhi',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSkgoI2XbfhXoqIHTD5k4y5Bk_0_gaeoyYmx14mTxMMUQC9y26a1ZWwLCKfkwN57W4w3ytSNgEpqzhjG_VLcdNgtKjQnvRF6fy7SfSJwTYtrZKGxLEXZfVheg',
    },
    {
      id: '10',
      name: 'Ferrero Rochers',
      para:"Rich in chocolate and nuts in every bite",
      category: 'FMCG',
      price: 19,
      location: 'Visakhapatnam',
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQeT2o2emmu6AVsrApcNhwGejpZdCJfKu3H9uGGuSGu16uyI5GXLKoiLaDQgH7Q7IuGF7aaSJO5xt0hJVSeiHbvm6HOcQ6VbLgm2mmgQlbEeLPXUD-8qtUxCe_TqaQ7kYr6WZo5WA&usqp=CAc',
    },
    {
      id: '11',
      name: 'Dr Batra’s-Clear Facewash',
      category: 'FMCG',
      para:"Neem & Tulasi Extract Facewash",
      price: 15,
      location: 'kolkata',
      image: 'https://products.drbatras.com/cdn/shop/products/pro-skin-clear-facewash-with-neem-tulsi-extracts-dr-batras-124408_600x.jpg?v=1701180819',
    },
    {
      id: '12',
      name: 'Vivo Smartphone X',
      category: 'Electronics',
      para:'Features 6.78″ display, Snapdragon 778G 5G chipset, 4600 mAh battery, 512 GB storage, 12 GB RAM.',
      price: 500,
      location: 'Delhi',
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoaDhsWDq7IdAp3v4_6VNHzlpOvoh64kQaKs696-euYCgxDRbpzaqiIkYTZs8rpFt1G-G04wINWp7mVMS89N7ITU-vOt6v_ywklkMDxIGnCBTr5BZ4DeBz',
    }, {
      id: '13',
      name: 'Dot & Key Beauty Cream',
      category: 'FMCG',
      para:"Super Bright Moisturizer",
      price: 16,
      location: 'Banglore',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR3EEIb6b1cGk8muGB0TLweMux7lOgy54R4tZQSUCZqZ4An-OuqzQw8PhOUsyHZH4BwarL2ltxtfvBRG6_Gg2Ci3scKU63qJLnixvg1hwCOfTdEFg-jrCv5',
    },
    {
      id: '14',
      name: "Nike Men's Shoes",
      category: 'Fashion',
      para:"Nike men's court vision night shoes",
      price: 80,
      location: 'Visakhapatnam',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQOL0aribqern4w1S_41598-qyGlBcDoET-prtvN4_cdvdR5niE-DlN7PxScWUbkXFTZGCtDTKB5RBKgqTRNMIJeCpy3kM8_GAjdkwrVjrSdHJP06MJrX2MVw'
    },
    {
      id: '15',
      name: 'Godrej Air Conditioner',
      category: 'Home Appliances',
      para:"Godrej 1.5 tons 3 star rating AC",
      price: 500,
      location: 'kolkata',
      image: 'https://images.samsung.com/is/image/samsung/p6pim/in/feature/165788028/in-feature-split-ac-544679116?$550_N_JPG$',
    },
    {
      id: '16',
      name: 'Phillips Ceiling Fan',
      category: 'Home Appliances',
      para:'Antidust BLDC Ceiling Fan',
      price: 100,
      location: 'Chennai',
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS0X26KG30QdDfFhKLSykUJcyZvNpJmYgHS6px6r82Ip8zmMtkggkmnwgDyIroknV3YlVHuu8BlBTou8tsS_ibBbjGIMurVGfq-ZRBmXczwj0uv7mJA2K3MBg',
    },
  ];
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected. Seeding products...');
    await Product.insertMany(mockProducts);

    console.log('Sample products inserted!');
    process.exit();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
