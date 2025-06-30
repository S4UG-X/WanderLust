const Joi = require("joi");

listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi().string().required(),
    description: Joi().string().required(),
    image: Joi().string().allow("", null),
    price: Joi().string().required().min(0),
    country: Joi().string().required(),
    location: Joi().string().required(),
  }).required(),
});

module.exports = listingSchema;
