import userController from './users'
import categoryController from './categories'
import productController from './products'
import subcategoriesController from './subcategories'
import favoritesController from './favorites'
export const API = {
  users: userController,
  categories: categoryController,
  products: productController,
  subcategories: subcategoriesController,
  favorites: favoritesController
}
