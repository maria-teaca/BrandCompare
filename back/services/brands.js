const express = require('express');
var Request = require("request");


module.exports = {
    getBrands: (req, res) => {
        const { apikey, method, params } = req.body;
        Request.post({
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            },
            "url": "https://app.socialinsider.io/api",
            "body": JSON.stringify({
                "id": 1,
                "method": method,
                "params": params
            })
        }, (error, response, body) => {
            if(error) {
                return res.status(201).json({error: {message: 'bad request'}});
            }
            return res.status(200).json(JSON.parse(body))
        });
    }
}