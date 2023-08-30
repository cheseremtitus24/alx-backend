const express = require('express');
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
	{
		itemId: 1,
		itemName: 'Suitcase 250',
		price: 50,
		intitialAvailableQuantity: 4
	},
	{
		itemId: 2,
		itemName: 'Suitcase 450',
		price: 100,
		initialAvailableQuantity: 10
	},
	{
		itemId: 3,
		itemName: 'Suitcase 650',
		price: 350,
		initialAvailableQuantity: 2
	},
	{
		itemId: 4,
		itemName: 'Suitcase 1050',
		price: 550,
		initialAvailableQuantity: 5
	}
];

function getItemById(id){
return listProducts.filter((item) => item.itemId === id)[0];
}

const app = express();
const port = 1245;
const client = redis.createClient();

async function reserveStockById(itemId, stock){
	return promisify(client.set).bind(client)(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId){
	return promisify(client.GET).bind(client)(`item.${itemId}`);
}

app.listen(port);
app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

app.get('/list_products/:itemId', (req, res) => {
	const itemId = Number.parseInt(req.params.itemId);
	const item = getItemById(Number.parseInt(itemId));

	if(!item){
		res.json({ status: 'Product not found'})
		return;
	}

	getCurrentReservedStockById(itemId).
		then((result) => Number.parseInt(result || 0)).
		then((reservedStock) => {
			item.currentQuantity = item.initialAvailableQuatity - reservedStock;
			res.json(item);
		});
});

app.get('/reserve_product/:itemId', (req, res) => {
	const itemId = Number.parseInt(req.params.itemId);
        const item = getItemById(Number.parseInt(itemId));

        if(!item){
                res.json({ status: 'Product not found'})
                return;
        }

	getCurrentReservedStockById(itemId).
                then((result) => Number.parseInt(result || 0)).
                then((reservedStock) => {
                        if(reservedStock >= item.initialAvailableQuantity){
			res.json({ status: 'Not enough stock available', itemId});
			return;
			}
			reserveStockById(itemId, reservedStock + 1).
				then(() => res.json({status: 'Reservation confirmed', itemId}));
                });
});