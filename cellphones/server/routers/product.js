import express from 'express';
import {
    addProduct,
    rateProduct,
    blogProduct,
    deleteProduct,
    getAllProduct,
    searchProduct,
    updateProduct,
    commentProduct,
    findProductById,
    paginationProduct,
    pinCommentProduct,
    repCommentProduct,
    filterProductByType,
    filterProductByRandomField,
} from '../controllers/product.js';
import { upload, isAuth, isAdmin } from 'untils';

const ProductRouter = express.Router();

ProductRouter.get('/', getAllProduct);
ProductRouter.get('/:type', filterProductByType);
ProductRouter.get('/detail/:id', findProductById);
ProductRouter.get(`/pagination/:page`, paginationProduct);
ProductRouter.post('/filter/random', filterProductByRandomField);

ProductRouter.post('/rate/:id', rateProduct);
ProductRouter.post('/comment/:id', commentProduct);
ProductRouter.post('/pin/comment/:id', pinCommentProduct);
ProductRouter.post('/rep/comment/:id', repCommentProduct);

ProductRouter.get('/search/product', searchProduct);
ProductRouter.post('/blog/:id', isAuth, isAdmin, blogProduct);
ProductRouter.post('/create', isAuth, isAdmin, upload.single('image'), addProduct);
ProductRouter.put('/update', isAuth, isAdmin, upload.single('image'), updateProduct);
ProductRouter.delete('/delete/:id', isAuth, isAdmin, upload.single('image'), deleteProduct);

export default ProductRouter;
