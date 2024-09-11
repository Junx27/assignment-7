const _ = require("lodash"); //menggunakan library lodash
const prompt = require("prompt-sync")(); //menggunakan library prompt

//membuat variabel untuk menampung inventory
const inventory = [];

//membuat notifikasi
function notificationIsEmpty() {
  console.log("data tidak ditemukan");
}
function notificationIsFailed() {
  console.log("proses gagal");
}
function notificationIsSucces() {
  console.log("proses berhasil");
}
//membuat tampilan menu
function viewMenu() {
  console.log("------MENU------");
  console.log("1. Lihat inventori");
  console.log("2. Tambah inventori");
  console.log("3. Ubah inventori");
  console.log("4. Hapus inventori");
  console.log("5. Inventori termahal");
  console.log("6. Total inventori");
  console.log("7. Cari inventori");
  console.log("8. Keluar");
  console.log("----------------");
  console.log("Masukan pilihan menu:");
}

//membuat fungsi membuat produk
function createProduct(name, category, stock, price) {
  return {
    name: name,
    category: category,
    stock: parseInt(stock),
    price: parseInt(price),
  };
}

//membuat fungsi update detail produk
function updateDetail(category, stock, price) {
  return {
    category: category,
    stock: parseInt(stock),
    price: parseInt(price),
  };
}

//membuat fungsi menambahkan produk
function addProduct(inventory, product) {
  inventory.push(product);
}

//membuat fungsi hapus produk
function removeProduct(inventory, productName) {
  let product = _.find(inventory, (i) => i.name === productName);
  if (product) {
    notificationIsSucces();
    return _.remove(inventory, product);
  } else {
    notificationIsFailed();
  }
}

//membuat fungsi update produk
function updateProduct(inventory, productName, newDetails) {
  let product = _.find(inventory, (i) => i.name === productName);
  if (product) {
    notificationIsSucces();
    return _.assign(product, newDetails);
  } else {
    notificationIsFailed();
  }
}

//membuat fungsi mencari nilai termahal
function findMostExpensiveProduct(inventory) {
  let product = 0;
  if (inventory.length === 0) {
    notificationIsEmpty();
    notificationIsFailed();
    return product;
  } else {
    product = _.maxBy(inventory, "price");
  }
  return product;
}

//membuat fungsi total keseluruhan inventory
function calculateTotalInventoryValue(inventory) {
  let total = 0;
  if (inventory.length == 0) {
    notificationIsEmpty();
    notificationIsFailed();
  } else {
    total = _.sumBy(inventory, (i) => i.stock * i.price);
  }
  return total;
}

//membuat fungsi berdasarkan kategori
function filterProductsByCategory(inventory, category) {
  let products = 0;
  if (inventory.length == 0) {
    notificationIsEmpty();
    notificationIsFailed();
    return products;
  } else {
    products = _.filter(inventory, (i) => i.category === category);
  }
  return products;
}

//membuat fungsi menampilkan semua inventory
function getAllInventory() {
  if (inventory.length === 0) {
    console.log("data tidak ada");
    return 0;
  } else {
    console.log("Data inventori:", inventory);
  }
}

//membuat perulangan menampilkan pilihan menu
let isRuning = true;
while (isRuning) {
  viewMenu();
  let inputOption = prompt();
  switch (inputOption) {
    case "1":
      getAllInventory();
      break;
    case "2":
      let name = prompt("Masukan nama produk:");
      let category = prompt("Masukan kategori produk:");
      let stock = prompt("Masukan stok produk:");
      let price = prompt("Masukan harga produk:");
      addProduct(inventory, createProduct(name, category, stock, price));
      break;
    case "3":
      let productName = prompt("Masukan nama produk:");
      let newCategory = prompt("Masukan kategori produk:");
      let newStock = prompt("Masukan stok produk:");
      let newPrice = prompt("Masukan harga produk:");
      updateProduct(
        inventory,
        productName,
        updateDetail(newCategory, newStock, newPrice)
      );
      break;
    case "4":
      let removeProductName = prompt("Masukan nama produk:");
      removeProduct(inventory, removeProductName);
      break;
    case "5":
      console.log("Inventori termahal:", findMostExpensiveProduct(inventory));
      break;
    case "6":
      console.log("Total inventori:", calculateTotalInventoryValue(inventory));
      break;
    case "7":
      let filterCategory = prompt("Masukan kategori produk:");
      console.log(
        filterCategory,
        "=",
        filterProductsByCategory(inventory, filterCategory)
      );
      break;
    case "8":
      console.log("Sistem selesai");
      isRuning = false;
      break;
    default:
      console.log("Salah memasukan pilihan, coba lagi!");
      break;
  }
}
