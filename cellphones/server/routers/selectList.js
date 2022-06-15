import express from 'express';

import {
    updateSelectOption,
    deleteSelectOption,
    getSelectOptionById,
    createOptionByproperty,
    getAllOptionByproperty,
} from '../controllers/selectList.js';

const SelectListrouter = express.Router();

SelectListrouter.get('/', getAllOptionByproperty);
SelectListrouter.put('/update/:id', updateSelectOption);
SelectListrouter.post('/create', createOptionByproperty);
SelectListrouter.get('/detail/:id', getSelectOptionById);
SelectListrouter.delete('/delete/:id', deleteSelectOption);

export default SelectListrouter;
