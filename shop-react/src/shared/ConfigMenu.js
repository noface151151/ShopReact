
const MenuItemsConfig = [
  {
    itemName: "Home",
    path: "/",
    isRequiredAuth:false,
    showAuth:true,
    isExact:true,
    style: {}
  },
  {
    itemName: "Shopping Cart",
    path: "/ShoppingCart",
    isRequiredAuth:false,
    showAuth:true,
    isExact:false,
    style: {}
  },
  {
    itemName: "LogIn",
    path: "/LogIn",
    isRequiredAuth:false,
    showAuth:false,
    isExact:false,
    style: {}
  },
  {
    itemName: "Register",
    path: "/Register",
    isRequiredAuth:false,
    showAuth:false,
    isExact:false,
    style: {}
  },
  {
    itemName: "Product Management",
    path: "/ProductAdmin",
    isRequiredAuth:true,
    showAuth:true,
    isExact:false,
    style: {}
  },
  {
    itemName: "Logout",
    path: "/Logout",
    isRequiredAuth:true,
    showAuth:true,
    isExact:false,
    style: {}
  }
];
export default MenuItemsConfig
