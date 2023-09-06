const router = require('express').Router();
const { Users, Communities, Reviews, Threads, Posts, CommunityUsers } = require('../../models');
const withAuth = require('../../utils/auth');


//create a thread
router.post('/', withAuth, async (req, res) => {
    try {
      const newReview = await Threads.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newReview);
    } catch (err) {
      res.status(400).json(err);
    }
  });


//delete a thread
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const threadData = await Threads.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      const postData = await Posts.destroy({
        where: {
          thread_id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!threadData) {
        res.status(404).json({ message: 'No thread found with this id!' });
        return;
      }
  
      res.status(200).json(threadData);
    } catch (err) {
      res.status(500).json(err);
    }
  });









module.exports = router;