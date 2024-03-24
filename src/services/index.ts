import userController from './users'
import categoryController from './categories'
import productController from './products'
import subcategoriesController from './subcategories'
export const API = {
  users: userController,
  categories: categoryController,
  products: productController,
  stats: subcategoriesController
}
