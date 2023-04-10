const productModel = require('./Model');

//lấy danh sách sản phẩm từ database
const getAllProduct = async () => {
  try {
    // page = 1;
    // size = 10;
    // let skip = (page - 1) * size;
    // let limit = size;

    return await productModel.find();
    // return await productModel
    // .find({},'name price category') //lấy ra tên và giá sản phẩm
    // .populate('category', ' name ') //lấy ra tên danh mục
    // .sort({price:1}) //sắp xếp theo giá tăng dần
    // .skip(0) //bỏ qua 2 sản phẩm đầu tiên
    // .limit(2) //lấy 2 sản phẩm tiếp theo

  } catch (error) {
    console.log('Product service getAllProduct error: ', error);
    throw error;
  }
};
//xóa sản phẩm theo id
const deleteProduct = async (id) => {
  try {
    // const index = data.findIndex(item => item._id.toString() == id.toString());
    // if (index !== -1) {
    //   data.splice(index, 1);
    //   return true;
    // }
    // return false;
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('Product service deleteProduct error: ', error);
  }
  return false;
};
const addProduct = async (name, price, quantity, image, category) => {
  try {
    // const newProduct = {
    //   _id: data.length + 1,
    //   name, price, quantity, image, category
    // };
    // data.push(newProduct);
    // return true;
    const newProduct = new productModel({ name, price, quantity, image, category });
    await newProduct.save();
    return true;
  } catch (error) {
    console.log('Product service addProduct error: ', error);
  }
  return false;
}
const getProductById = async (id) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString());
    // return product;
    let item = await productModel.findById(id);
    console.log(item);
    return item;
  } catch (error) {
    console.log(error);

  }
  return null;
}
const updateProductById = async (id, name, price, quantity, image, category) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString());
    // if (product) {

    //   data = data.map(item => {
    //     if (item._id.toString() == id.toString()) {
    //       item.name = name ? name : item.name;
    //       item.price = price ? price : item.price;
    //       item.quantity = quantity ? quantity : item.quantity;
    //       item.image = image ? image : item.image;
    //       item.category = category ? category : item.category;
    //     }
    //     return item;
    //   });
    //   return true
    const item = await productModel.findById(id);
    if (item) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
      item.quantity = quantity ? quantity : item.quantity;
      item.image = image ? image : item.image;
      item.category = category ? category : item.category;
      await item.save();
      return true;
    }
  }catch (error) {
    console.log(error);    
  }
  return false;
}
const searchProduct = async (keyword) => {
  try { 
    let query = {
      //gt: greater than
      //lt: less than
      //gte: greater than or equal
      //lte: less than or equal
      price : { $gt: 1, $lt: 100 },
      //regex: regular expression
      //options: i: ignore case
      //tìm kiếm theo tên sản phẩm
      // name : { $regex: keyword, $options: 'i' },
      //tìm kiếm chính xác
      name: keyword,
      email: email,
      $or: [{quantity:{$gte:20}}, {quantity:{$lte:5}}]
    };
    let products = await productModel.find(query);
    await productModel.find({}, 'name price');
    return products;

  } catch (error) {
    console.log('Product service searchProduct error: ', error);
  }
  return false;
}

module.exports = { getAllProduct, deleteProduct, addProduct, getProductById, updateProductById, searchProduct}
var data = [{
  "_id": 1,
  "name": "Shanahan LLC",
  "price": 3,
  "quantity": 42,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 9
}, {
  "_id": 2,
  "name": "Kirlin, Deckow and Medhurst",
  "price": 54,
  "quantity": 52,
  "image": "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/331560853_761779661986868_1288027859074406830_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qHLbYRYxVNEAX9IB-x8&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdQifcHjgIgBUZolLIK55_FfJRhd7RZ3bj6dJ1s8hbt8rA&oe=643FDE08",
  "category": 3
}, {
  "_id": 3,
  "name": "Dicki and Sons",
  "price": 3,
  "quantity": 42,
  "image": "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/336628342_1205582563656903_7446543282746277008_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Xs8xrWbv84QAX_Tp1AV&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdQ0rXyF9c8-zk4iZnUdYQJLuDhy10ieKVoJKfHmNjHaoQ&oe=643FF3B5",
  "category": 6
}, {
  "_id": 4,
  "name": "Grant-Robel",
  "price": 68,
  "quantity": 68,
  "image": "https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.15752-9/336615297_163652539875580_8171816715704974734_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qSDpYpuIBNsAX_MdRB4&_nc_ht=scontent.fsgn5-12.fna&oh=03_AdTjuDNmX0LCmME7rvfxWwFOVqkGQPrOTLv2RL0zX0-IKQ&oe=643FD66F",
  "category": 10
}, {
  "_id": 5,
  "name": "Becker LLC",
  "price": 33,
  "quantity": 50,
  "image": "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/336338028_470801371838797_8577610527604226696_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=XjPWWLPyRf8AX-LSfQm&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTJND3mhuDwnPyn2HCUk9AdnaoNEhIr3zG-8ju-uMEIrg&oe=643FE16C",
  "category": 3
}, {
  "_id": 6,
  "name": "Lueilwitz, Stracke and Schmidt",
  "price": 18,
  "quantity": 46,
  "image": "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/335582478_860073438424353_5678969540532680188_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=70zoiL4Ic_gAX-_yiKD&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdRBdJMVQlVUhPoqdfcoPG2Kd0jYoZkttvd5MhzmwDrr2g&oe=643FF02A",
  "category": 8
}, {
  "_id": 7,
  "name": "Kovacek and Sons",
  "price": 70,
  "quantity": 86,
  "image": "https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.15752-9/335960683_214612311235085_6089726656545949846_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=2fon2atnOi4AX8-mpwa&_nc_ht=scontent.fsgn5-12.fna&oh=03_AdQGq7bZYdDG1uiAQvxgHbLf9hSXDHw500WnEMAB0vFoyA&oe=64400149",
  "category": 10
}, {
  "_id": 8,
  "name": "Flatley Inc",
  "price": 67,
  "quantity": 99,
  "image": "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/335598781_236576955386398_253521368679395412_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xkGrTl40egMAX8vR7iG&_nc_ht=scontent.fsgn5-6.fna&oh=03_AdTLyuWNDRd_hIpDhNxZAqlXZ5E4OwtCa-G68ik6K0JfeQ&oe=643FE66F",
  "category": 9
}, {
  "_id": 9,
  "name": "Bayer and Sons",
  "price": 67,
  "quantity": 4,
  "image": "https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/332790447_604807354416187_862404810834069190_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=VUGGtBlzMEkAX9KgLJk&_nc_ht=scontent.fsgn5-11.fna&oh=03_AdTXWuP4xNXdk7XJQ0oxNGYJQFuBbB5D5jG5Poe4PN9Hog&oe=643FD463",
  "category": 4
}, {
  "_id": 10,
  "name": "Brown LLC",
  "price": 55,
  "quantity": 80,
  "image": "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/331166748_707698350824510_5603439535335006462_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=d67VFy10rbwAX9XH0qO&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdTZWYMJR4gtWa2Lj6eBzDjOvKHxK9ZI-HCioinJP_udog&oe=643FFADA",
  "category": 1
}, {
  "_id": 11,
  "name": "Murray, Gibson and Conroy",
  "price": 8,
  "quantity": 22,
  "image": "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/320386335_663079175498846_1274569753509827054_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=MCV9mxiXgkMAX-1_jD1&_nc_ht=scontent.fsgn5-2.fna&oh=03_AdSUpk66IPGxhSDuFoXpPV6DZmgyzjBUpIL64APEvJM8LQ&oe=643FDD2B",
  "category": 9
}, {
  "_id": 12,
  "name": "Corkery, Beahan and Grady",
  "price": 38,
  "quantity": 54,
  "image": "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/331962236_929337144764879_3400734579716567323_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=6RIFCZ8pymgAX-K9g0z&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdSvdhGdL4lKjFuD5f409NGHaI0Ixj-ayqUxqeaY6DnhgQ&oe=64400156",
  "category": 3
}, {
  "_id": 13,
  "name": "Cole-Leuschke",
  "price": 54,
  "quantity": 16,
  "image": "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/324924233_747621993034969_1497914789611399745_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=m08g4MT05BsAX8lEI1J&_nc_ht=scontent.fsgn5-2.fna&oh=03_AdQzeXyc_1tLwkdOX-1HAp3UymtNQB217l-RagAHH_Setg&oe=64400455",
  "category": 10
}, {
  "_id": 14,
  "name": "O'Hara LLC",
  "price": 2,
  "quantity": 57,
  "image": "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/336254945_595127222282500_3817464521864084833_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=9EXophM3jU4AX8A9hbO&_nc_ht=scontent.fsgn5-6.fna&oh=03_AdQKydpy1XC8pSxw-H6TQfSHZktfMtWn6d7sOknU-QixPw&oe=643FFE2C",
  "category": 2
}, {
  "_id": 15,
  "name": "Wolff Group",
  "price": 34,
  "quantity": 67,
  "image": "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/336200988_943306753332092_6129739316692508434_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=42TGSvnc5xEAX8WTkyK&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdQEO586phSA3d6rvU2gmsbCOlfhPM8hnT9QY8rso6z2EQ&oe=644005C7",
  "category": 5
}, {
  "_id": 16,
  "name": "Hessel-Ullrich",
  "price": 73,
  "quantity": 8,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 1
}, {
  "_id": 17,
  "name": "Lockman Group",
  "price": 95,
  "quantity": 23,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 9
}, {
  "_id": 18,
  "name": "Heaney, Anderson and Torphy",
  "price": 84,
  "quantity": 76,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 9
}, {
  "_id": 19,
  "name": "Rippin, Rosenbaum and Wisozk",
  "price": 43,
  "quantity": 86,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 6
}, {
  "_id": 20,
  "name": "Greenholt, Gusikowski and Frami",
  "price": 24,
  "quantity": 84,
  "image": "https://i.imgur.com/Gm1Obe7.jpg",
  "category": 2
}]