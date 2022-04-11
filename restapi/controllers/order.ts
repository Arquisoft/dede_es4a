import { Request, Response } from "express";
import { Shipment } from "shippo";
import Order from "../models/order";

const shippo = require('shippo')('shippo_test_ddb6bf7b099769646168069499c3de5fd5e85507')

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const orders = await Order.find();
    return res.status(200).json({ orders });
};

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.products || !req.body.address || !req.body.user || !req.body.shippingCost || !req.body.totalPrice)
        return res.status(400).json({ msg: "Please, complete all the fields" });

    const newOrder = new Order(req.body);
    newOrder.save();

    return res.status(200).json({ newOrder });
};

export const getShippingDetails = async (req: Request, res: Response)  => {
    const addressFrom = {
        "name": "Tech Zone",
        "street1": "145 W 9th St, Azusa",
        "city": "Azusa",
        "state": "CA",
        "zip": "991702",
        "country": "US"
    };
    const addressTo = {
        "name": req.body.user,
        "street1": req.body.address.street_address,
        "city": req.body.address.locality,
        "state": req.body.address.region,
        "zip": req.body.address.postal_code,
        "country": req.body.address.country_name
    }
    var parcel = {
        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": "2",
        "mass_unit": "lb"
    };
    shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": false
    }, function (err: Error, shipment: Shipment) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send(shipment);
        }
    });
    //return res.status(400).send({msg: 'An unnexpected error has ocurreded'});
}