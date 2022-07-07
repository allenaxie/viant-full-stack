import dbConnect from "../../../utilities/dbConnect";
import User from '../../../models/user';

export default async (req,res) => {
  const {method} = req;
  await dbConnect();

  if(method === 'GET') {
    try {
      // find all users
      const users = await User.find({})
      res.status(200).json({message: 'GET request success', data: users})
    } catch (err) {
      console.log(err);
      res.status(400).json({message: 'GET request failed'})
    }
  } else if (method === 'POST') {
    try {
      // create user
      const user = await User.create(req.body)
      res.status(200).json({message: 'User created', data: user})
    } catch (err) {
      console.log(err);
      res.status(400).json({message: 'POST request failed'})
    }
  } else {
    res.status(400).json({message: 'request failed'})
  }
}