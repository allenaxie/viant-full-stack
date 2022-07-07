import dbConnect from "../../../utilities/dbConnect";
import User from '../../../models/user';

export default async function handler (req,res) {
    const {
        query: {id},
        method,
    } = req;

    await dbConnect();


    if (method === 'GET') {
        try {
            const user = await User.findById(id);
            res.status(200).json({message: 'GET request succeeded', data: user})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'GET request failed'})
        }
    } else if (method === 'PUT') {
        try {
            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })

            if(!user) {
                return res.status(400).json({message: 'No user found'});
            }
            res.status(200).json({message: 'User updated', data: user})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'PUT request failed'})
        }
    } else if (method === 'DELETE') {
        try {
            const deletedUser = await User.deleteOne({_id : id});
            if (!deletedUser) {
                res.status(400).json({message: 'Unable to find user to delete'});
            }

            res.status(200).json({message: 'User deleted', data: deletedUser})
        } catch(err) {
            console.log(err);
            res.status(400).json({message: 'Delete request failed'})

        }
    }
}