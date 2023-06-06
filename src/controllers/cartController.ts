import { cartModel } from "../models/cart";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import { cartService } from "../service/cartService";
import { common } from "../utils/common";
import { response } from "../utils/response";

class CartController {

    getCartItems = async (req, res) => {
        const userId = req.params.id;
        try {
            let cart: any = await cartService.find({ userId });
            if (cart && cart.items.length > 0) {
                res.send(cart);
            }
            else {
                res.send(null);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    updateCartItem = async (req, res) => {
        const userId = req.params.id;
        try {
            let cart: any = await cartService.find({ userId });
            if (cart && cart.items.length > 0) {
                res.send(cart);
            }
            else {
                res.send(null);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    addToCart = async (req, res) => {
        const userId = req.params.id;
        const { productId, quantity } = req.body;

        try {
            let cart: any = await cartService.find({ userId });
            let item: any = await cartService.find({ _id: productId });
            if (!item) {
                res.status(404).send('Item not found!')
            }
            const price = item.price;
            const name = item.title;

            if (cart) {
                // if cart exists for the user
                let itemIndex = cart.items.findIndex(p => p.productId == productId);

                // Check if product exists or not
                if (itemIndex > -1) {
                    let productItem = cart.items[itemIndex];
                    productItem.quantity += quantity;
                    cart.items[itemIndex] = productItem;
                }
                else {
                    cart.items.push({ productId, name, quantity, price });
                }
                cart.bill += quantity * price;
                cart = await cart.save();
                return res.status(201).send(cart);
            }
            else {
                // no cart exists, create one
                const newCart = await cartService.save({
                    userId,
                    items: [{ productId, name, quantity, price }],
                    bill: quantity * price
                });
                return res.status(201).send(newCart);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    removeFromCart = async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.itemId;
        try {
            let cart: any = await cartService.find({ userId });
            let itemIndex = cart.items.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                cart.bill -= productItem.quantity * productItem.price;
                cart.items.splice(itemIndex, 1);
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    // Checkout process
    // checkout = async (req: Request, res: Response) => {
    //     try {
    //         const userId = req.session.userId; // Assuming you have stored the user ID in the session

    //         // Get the user's cart items
    //         const cartItems = await CartItem.find({ userId }).populate('productId');

    //         // Calculate the total price
    //         let totalPrice = 0;
    //         cartItems.forEach((cartItem) => {
    //             totalPrice += cartItem.quantity * cartItem.productId.price;
    //         });

    //         // Create an order
    //         const order = new Order({
    //             userId,
    //             items: cartItems,
    //             totalPrice,
    //         });

    //         // Save the order
    //         await order.save();

    //         // Clear the cart items
    //         await CartItem.deleteMany({ userId });

    //         res.json({ message: 'Order placed successfully' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Server Error' });
    //     }
    // };

}

export const cartController = new CartController();
