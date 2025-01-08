import Review from '../model/ReviewModel.js';
import ResponseReview from '../model/ResponseReview.js';

class ReviewController {
    static async reviewProduct(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 3;
            const startPage = (page - 1) * limit;
            const  idProduct  = req.params; // Sử dụng destructuring để lấy idProduct từ params
            const listReview = await Review.find({ idProduct: idProduct })
                .skip(startPage)
                .limit(limit)
                .populate({
                    path: 'idUser',
                    populate: {
                        path: 'idAccount',
                        model: 'Account',
                        populate: {
                            path: 'idRole',
                            model: 'Role'
                        }
                    }
                })
                .populate({
                    path: 'idProduct',
                    populate: {
                        path: 'idCategory'
                    }
                });

            const reviews = await Promise.all(listReview.map(async (review) => {
                let response = await ResponseReview.find({ idReview: review._id })
                    .populate({
                        path: 'idSupportCustomer',
                        populate: {
                            path: 'idAccount',
                            model: 'Account',
                            populate: {
                                path: 'idRole',
                                model: 'Role'
                            }
                        }
                    });

                response = response.map(item => {
                    const { idSupportCustomer, ...rest } = item.toObject();
                    const { idAccount, ...user } = idSupportCustomer;
                    const { idRole, ...account } = idAccount;
                    return {
                        ...rest,
                        user: {
                            ...user,
                            account: {
                                ...account,
                                role: { ...idRole }
                            }
                        }
                    };
                });

                return {
                    ...review.toObject(),
                    response
                };
            }));

            reviews.map(review => {
                review.idUser.idAccount.role = review.idUser.idAccount.idRole;
                review.idUser.account = review.idUser.idAccount;
                review.user = review.idUser;

                review.idProduct.category = review.idProduct.idCategory;
                review.product = review.idProduct;

                delete review.idUser.idAccount.idRole;
                delete review.idUser.idAccount;
                delete review.idUser;

                delete review.idProduct.idCategory;
                delete review.idProduct;
            });

            const totalReview = await Review.countDocuments({ idProduct: idProduct });
            const totalPage = Math.ceil(totalReview / limit);

            return res.status(200).json({
                reviews,
                page,
                limit,
                totalReview: totalReview,
                totalPage: totalPage
            });
        } catch (error) {
            next(error);
        }
    }

    static async addReview(req, res, next) {
        try {
            const { idUser, idProduct, content, rating } = req.body;
            const dataReview = new Review({
                idUser,
                idProduct,
                content,
                rating
            });
            const savedReview = await dataReview.save();
            let review = await Review.findOne({ _id: savedReview._id })
                .populate({
                    path: 'idUser',
                    populate: {
                        path: 'idAccount',
                        model: 'Account',
                        populate: {
                            path: 'idRole',
                            model: 'Role'
                        }
                    }
                })
                .populate({
                    path: 'idProduct',
                    populate: {
                        path: 'idCategory'
                    }
                }).lean();

            if (review.idUser) {
                review.idUser.idAccount.role = review.idUser.idAccount.idRole;
                review.idUser.account = review.idUser.idAccount;
                review.user = review.idUser;

                review.idProduct.category = review.idProduct.idCategory;
                review.product = review.idProduct;

                delete review.idUser.idAccount.idRole;
                delete review.idUser.idAccount;
                delete review.idUser;

                delete review.idProduct.idCategory;
                delete review.idProduct;
            }

            return res.status(201).json({ review, status: 201 });
        } catch (error) {
            next(error);
        }
    }

    static async replyReview(req, res, next) {
        try {
            const { idReview, idSupportCustomer, reply } = req.body;
            const responseReview = new ResponseReview({ idReview, idSupportCustomer, reply });
            await responseReview.save();
            return res.status(201).json({ responseReview });
        } catch (error) {
            next(error);
        }
    }
}

export default ReviewController;
