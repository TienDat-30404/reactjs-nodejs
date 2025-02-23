import Review from '../model/ReviewModel.js';
import ResponseReview from '../model/ResponseReview.js';
import mongoose from 'mongoose';

class ReviewController {
    static async getAllReviewOfProduct(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 3;
            const startPage = (page - 1) * limit;
            const idProduct = req.params;
            let [reviews, totalReview] = await Promise.all([
                Review.find({ idProduct: idProduct, deletedAt: null })
                    .skip(startPage)
                    .limit(limit)
                    .populate({
                        path: 'responseReview',
                        match: { deletedAt: null },
                        populate: {
                            path: 'idSupportCustomer',
                            model: 'User',
                            populate: {
                                path: 'idAccount',
                                model: 'Account',
                                populate: {
                                    path: 'idRole',
                                    model: 'Role'
                                }
                            }
                        }
                    })
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
                    }).lean(),
                Review.countDocuments({ idProduct: idProduct })
            ])

            if (reviews?.length > 0) {
                reviews = reviews?.map(review => {
                    let { idUser, idProduct, responseReview, ...rest } = review
                    const { idAccount, ...userRest } = idUser
                    const { idRole, ...accountRest } = idAccount

                    const { idCategory, ...productRest } = idProduct

                    responseReview = responseReview?.map(item => {
                        const { idSupportCustomer, ...replyRest } = item
                        const { idAccount, ...accountRest } = idSupportCustomer
                        const { idRole, ...roleRest } = idAccount

                        item = {
                            ...replyRest,
                            user: {
                                ...accountRest,
                                account: {
                                    ...roleRest,
                                    role: idRole
                                }
                            }
                        }
                        return item
                    })

                    review = {
                        ...rest,
                        user: {
                            ...userRest,
                            account: {
                                ...accountRest,
                                role: idRole
                            }
                        },
                        product: {
                            ...productRest,
                            category: idCategory
                        },
                        response: responseReview
                    }
                    return review
                })
            }

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
                    path: 'responseReview',
                    match: { deletedAt: null },
                    populate: {
                        path: 'idSupportCustomer',
                        model: 'User',
                        populate: {
                            path: 'idAccount',
                            model: 'Account',
                            populate: {
                                path: 'idRole',
                                model: 'Role'
                            }
                        }
                    }
                })
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


            if (review) {

                const { idUser, idProduct, responseReview, ...restReview } = review
                const { idAccount, ...restUser } = idUser
                const { idRole, ...restAccount } = idAccount

                const { idCategory, ...restProduct } = idProduct

                review = {
                    ...restReview,
                    user: {
                        ...restUser,
                        account: {
                            ...restAccount,
                            role: idRole
                        }
                    },
                    product: {
                        ...restProduct,
                        category: idCategory
                    },
                    response: responseReview
                }


            }
            const io = req.app.get('io')
            io.emit('review', review)
            return res.status(201).json({
                review,
                status: 201
            });
        } catch (error) {
            next(error);
        }
    }

    static async replyReview(req, res, next) {
        try {
            const { idReview, idSupportCustomer, reply } = req.body;
            const data = new ResponseReview({ idReview, idSupportCustomer, reply });
            let savedReplyReview = await data.save()
            let replyReview = await ResponseReview.findById({ _id: savedReplyReview._id })
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
                }).lean()
            if (replyReview) {
                const { idSupportCustomer, ...restReplyReview } = replyReview
                const { idAccount, ...restUser } = idSupportCustomer
                const { idRole, ...restAccount } = idAccount

                replyReview = {
                    ...restReplyReview,
                    user: {
                        ...restUser,
                        account: {
                            ...restAccount,
                            role: idRole
                        }
                    }
                }
            }

            const io = req.app.get('io')
            io.emit('replyReview', replyReview)

            return res.status(201).json({
                status: 200,
                replyReview,
                message: 'Reply successfully'

            });
        } catch (error) {
            next(error);
        }
    }

    static async editReplyReview(req, res, next) {
        try {
            const { idReplyReview, reply } = req.body
            let review = await ResponseReview.findByIdAndUpdate(idReplyReview, {
                reply
            }, { new: true }).populate({
                path: 'idSupportCustomer',
                populate: {
                    path: 'idAccount',
                    model: 'Account',
                    populate: {
                        path: 'idRole',
                        model: 'Role'
                    }
                }
            }).lean()
            if (review) {
                const { idSupportCustomer, ...restReview } = review
                const { idAccount, ...restSupportCustomer } = idSupportCustomer
                const { idRole, ...restAccount } = idAccount
                review = {
                    ...restReview,
                    user: {
                        ...restSupportCustomer,
                        account: {
                            ...restAccount,
                            role: idRole
                        }
                    }
                }
            }
            const io = req.app.get('io')
            io.emit('editReplyReview', idReplyReview, review)


            return res.status(200).json({
                message: 'Edit review successfully',
                status: 200,
                review
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: `Fail when edit review : ${error}`
            })
        }
    }

    static async getAllReview(req, res, next) {
        try {

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idReview) {
                if (!mongoose.Types.ObjectId.isValid(req.query.idReview)) {
                    return res.status(200).json({
                        status: 200,
                        page: 1,
                        limit: 0,
                        totalPage: 0,
                        totalReview: 0,
                        reviews: []
                    })
                }
                objectFilter._id = req.query.idReview
            }
            if (req.query.content) {
                objectFilter.content = { $regex: req.query.content, $options: 'i' }
            }
            if (req.query.rating) {
                objectFilter.rating = req.query.rating
            }
            let [reviews, totalReview] = await Promise.all([
                Review.find(objectFilter)
                    .skip(startPage)
                    .limit(limit)
                    .populate({
                        path: 'responseReview',
                        populate: {
                            path: 'idSupportCustomer',
                            model: 'User',
                            populate: {
                                path: 'idAccount',
                                model: 'Account',
                                populate: {
                                    path: 'idRole',
                                    model: 'Role'
                                }
                            }
                        }
                    })
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
                    }).lean(),
                Review.countDocuments(objectFilter)
            ])

            if (reviews?.length > 0) {
                reviews = reviews?.map(review => {
                    let { idUser, idProduct, responseReview, ...rest } = review
                    const { idAccount, ...userRest } = idUser
                    const { idRole, ...accountRest } = idAccount

                    const { idCategory, ...productRest } = idProduct

                    responseReview = responseReview?.map(item => {
                        const { idSupportCustomer, ...replyRest } = item
                        const { idAccount, ...accountRest } = idSupportCustomer
                        const { idRole, ...roleRest } = idAccount

                        item = {
                            ...replyRest,
                            user: {
                                ...accountRest,
                                account: {
                                    ...roleRest,
                                    role: idRole
                                }
                            }
                        }
                        return item
                    })

                    review = {
                        ...rest,
                        user: {
                            ...userRest,
                            account: {
                                ...accountRest,
                                role: idRole
                            }
                        },
                        product: {
                            ...productRest,
                            category: idCategory
                        },
                        response: responseReview
                    }
                    return review
                })
            }

            const totalPage = Math.ceil(totalReview / limit)
            return res.status(200).json({
                status: 200,
                page,
                totalPage,
                totalReview,
                reviews,
                limit
            })
        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when get review : ${err}`
            })
        }

    }

    static deleteReview = async (req, res, next) => {
        try {
            const { id } = req.params
            const [review, responseReview] = await Promise.all([
                Review.updateOne({ _id: id }, { deletedAt: Date.now(), status: 0 }, { new: true }),
                ResponseReview.updateOne({ idReview: id }, { deletedAt: Date.now() })
            ])
            if(review?.modifiedCount > 0 && responseReview?.modifiedCount >= 0)
            {
                const io = req.app.get('io')
                io.emit('deleteReview', id)
            }
            return res.status(200).json({
                status: 200,
                message: 'Delete review successfully',
                review, 
                responseReview
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: `Fail when delete review : ${error.message}`
            })
        }
    }

}

export default ReviewController;
