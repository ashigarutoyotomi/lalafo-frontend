import userController from './users'
import categoryController from './categories'
import productController from './products'
import subcategoriesController from './subcategories'
import favoritesController from './favorites'
import photosController from './photos'
export const API = {
  users: userController,
  categories: categoryController,
  products: productController,
  subcategories: subcategoriesController,
  favorites: favoritesController,
  photos: photosController
}
