import expressAsyncHandler from 'express-async-handler';

import { SelectList } from '../models';

export const createOptionByproperty = expressAsyncHandler(async (req, res) => {
    try {
        const selectList = new SelectList({
            name: req.body.name,
            options: req.body.options,
            property: req.body.property,
        });
        const newSelectList = await selectList.save();

        res.send(newSelectList);
    } catch (error) {
        console.error(error);
    }
});

export const getAllOptionByproperty = expressAsyncHandler(async (req, res) => {
    try {
        const selectList = await SelectList.find();

        res.send(selectList);
    } catch (error) {
        console.error(error);
    }
});

export const updateSelectOption = expressAsyncHandler(async (req, res) => {
    try {
        const selectList = await SelectList.findById({ _id: req.params.id });

        if (selectList) {
            selectList.name = req.body.name;
            selectList.options = req.body.options;
            selectList.property = req.body.property;
        }
        await selectList.save();

        res.send(selectList);
    } catch (error) {
        console.error(error);
    }
});

export const getSelectOptionById = expressAsyncHandler(async (req, res) => {
    const selectList = await SelectList.findById({ _id: req.params.id });

    if (selectList) {
        res.send(selectList);
    } else {
        res.send({ message: 'Select list is not exists' });
    }
});

export const deleteSelectOption = expressAsyncHandler(async (req, res) => {
    try {
        const selectList = await SelectList.findById({ _id: req.params.id });
        await selectList.remove();

        res.send({ message: 'Select list is deleted' });
    } catch (error) {
        console.error(error);
    }
});
