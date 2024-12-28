import React, { useEffect, useState } from 'react';
import PostCard from '../../../elements/postCard/PostCard';
import postMiddleware from '../../../redux/middleware/postMiddleware';
import { useDispatch } from 'react-redux';
import PostInput from '../../dashboard/PostInput';

function MyProfile() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const UserID = user._id;        
        const response = await dispatch(postMiddleware.GetPostsByUserID(UserID));        
        if (response.success) {
          setPosts(response.data);
        } else {
          console.error("Error fetching posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : (
        <div className="space-y-4 mt-4">
          <h1 className="font-bold text-xl text-gray-900 dark:text-white">All Posts</h1>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                userName={post.user.name}
                userPhoto={post.user.profilephoto}
                postPhoto={post.postphoto}
                postText={post.posttext}
                initialLikeCount={post.likecount}
                liked={post.liked}
                postdt={String(post.updatedAt)}
                startupName={post.startupName}
                startupID={post.startupID}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MyProfile;
